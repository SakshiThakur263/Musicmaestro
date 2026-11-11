const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');

/**
 * Append a record to backend/data/<name>.json.
 * Used as a safety net when MongoDB is unavailable so that no client
 * submission (contact message, booking inquiry) is ever lost.
 */
const saveToLocalBackup = (name, record) => {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    const file = path.join(DATA_DIR, `${name}.json`);
    const list = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8') || '[]') : [];
    list.push({ ...record, _id: `local_${Date.now()}`, createdAt: new Date().toISOString() });
    fs.writeFileSync(file, JSON.stringify(list, null, 2));
    console.log(`[LocalBackup]: Saved submission to data/${name}.json`);
  } catch (err) {
    console.warn(`[LocalBackup]: Could not write data/${name}.json:`, err.message);
  }
};

/**
 * Save a document to MongoDB if connected (with a 3s timeout), otherwise
 * fall back to the local JSON backup. Never throws.
 */
const saveWithFallback = async (Model, payload, backupName) => {
  const mongoose = require('mongoose');
  if (mongoose.connection.readyState === 1) {
    try {
      return await Promise.race([
        Model.create(payload),
        new Promise((_, reject) => setTimeout(() => reject(new Error('MongoDB timeout')), 3000)),
      ]);
    } catch (err) {
      console.warn(`[DB]: Could not save ${backupName}:`, err.message);
    }
  }
  saveToLocalBackup(backupName, payload);
  return null;
};

module.exports = { saveToLocalBackup, saveWithFallback };

