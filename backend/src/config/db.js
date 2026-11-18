const mongoose = require('mongoose');
const dns = require('dns');

// Optional: custom DNS servers for mongodb+srv lookups (e.g. "8.8.8.8,1.1.1.1")
// on networks whose DNS can't resolve SRV records. Not needed on Render.
if (process.env.DNS_SERVERS) {
  try {
    dns.setServers(process.env.DNS_SERVERS.split(',').map((s) => s.trim()));
  } catch (_) {
    // ignore invalid values
  }
}

// Fail fast instead of making visitors wait 10s when the DB is unavailable.
// Requests get an immediate error and the frontend shows its fallback data.
mongoose.set('bufferCommands', false);

const RETRY_DELAY_MS = 15000;
let lastError = null;
let connecting = false;
let retryTimer = null;

/**
 * Hide credentials when logging the connection target.
 */
const describeUri = (uri) => {
  try {
    const u = new URL(uri);
    return `${u.protocol}//${u.hostname}${u.pathname}`;
  } catch {
    return 'invalid MONGODB_URI';
  }
};

const scheduleRetry = (onConnected) => {
  if (retryTimer) return;
  retryTimer = setTimeout(() => {
    retryTimer = null;
    connectDB(onConnected);
  }, RETRY_DELAY_MS);
};

/**
 * Connect to MongoDB and keep retrying every 15s until it succeeds.
 * Mongoose handles reconnects itself after the first successful connection.
 */
const connectDB = async (onConnected) => {
  if (mongoose.connection.readyState === 1 || connecting) return;

  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/world_of_musicians';
  if (!process.env.MONGODB_URI && process.env.NODE_ENV === 'production') {
    console.error('[MongoDB]: MONGODB_URI is NOT set in production - add it in your hosting environment variables.');
  }

  connecting = true;
  try {
    const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    lastError = null;
    console.log(`[MongoDB Connected]: ${conn.connection.host}/${conn.connection.name}`);
    if (onConnected) await onConnected();
  } catch (error) {
    lastError = error.message;
    console.error(`[MongoDB Connection Error] (${describeUri(mongoUri)}): ${error.message}`);
    console.log(`[MongoDB]: Retrying in ${RETRY_DELAY_MS / 1000}s...`);
    scheduleRetry(onConnected);
  } finally {
    connecting = false;
  }
};

mongoose.connection.on('disconnected', () => console.warn('[MongoDB]: Disconnected'));
mongoose.connection.on('reconnected', () => console.log('[MongoDB]: Reconnected'));

const STATES = ['disconnected', 'connected', 'connecting', 'disconnecting'];

/** Database status for the /api/health endpoint (no secrets). */
const getDbStatus = () => ({
  state: STATES[mongoose.connection.readyState] || 'unknown',
  uriConfigured: Boolean(process.env.MONGODB_URI),
  lastError,
});

module.exports = connectDB;
module.exports.getDbStatus = getDbStatus;
