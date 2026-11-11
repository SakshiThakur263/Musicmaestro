/**
 * WhatsApp notification service.
 *
 * Supported providers (set WHATSAPP_PROVIDER in .env):
 *   - "meta"   : Official WhatsApp Business Cloud API (graph.facebook.com)
 *   - "twilio" : Twilio WhatsApp API
 *   - (unset)  : Simulation mode - messages are only logged to the console
 *
 * IMPORTANT (WhatsApp policy): businesses can only send free-form text to a
 * user within 24h of that user messaging the business. Registration messages
 * are business-initiated, so in production they MUST use pre-approved
 * message templates. Configure WHATSAPP_TEMPLATE_* for Meta (or Content SIDs
 * for Twilio). Free-form text is used only as a fallback (works in Meta test
 * numbers / Twilio sandbox).
 */

const DEFAULT_COUNTRY_CODE = process.env.WHATSAPP_DEFAULT_COUNTRY_CODE || '91';

/**
 * Normalise a phone number to E.164 digits without "+", e.g. "919876543210".
 * Accepts "+91 98765 43210", "098765 43210", "9876543210", "919876543210".
 * Returns null if the number is not plausible.
 */
const normalizePhone = (raw) => {
  if (!raw) return null;
  let digits = String(raw).replace(/[^\d+]/g, '');
  const hadPlus = digits.startsWith('+');
  digits = digits.replace(/\+/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2); // 0091...
  else if (!hadPlus && digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1); // 098...

  if (!hadPlus && digits.length === 10) digits = DEFAULT_COUNTRY_CODE + digits;
  if (digits.length < 11 || digits.length > 15) return null;
  return digits;
};

const roleLabel = (role) => (role === 'artist' ? 'Artist' : 'Client');

// ---------------------------------------------------------------------------
// Message content
// ---------------------------------------------------------------------------
const buildUserMessage = (user) => {
  const name = user.firstName || user.username;
  if (user.role === 'artist') {
    return (
      `🎵 Welcome to Music Maestro, ${name}!\n\n` +
      `Your *Artist* account has been created successfully.\n\n` +
      `Next steps:\n` +
      `1️⃣ Complete your artist profile & add performance videos\n` +
      `2️⃣ Set your starting fee and cities you perform in\n` +
      `3️⃣ Start receiving event booking inquiries\n\n` +
      `Need help? Reply here or call +91 9009999434.\n— Team Music Maestro`
    );
  }
  return (
    `🎉 Welcome to Music Maestro, ${name}!\n\n` +
    `Your *Client* account has been created successfully.\n\n` +
    `You can now:\n` +
    `✅ Browse verified singers, bands & DJs\n` +
    `✅ Send booking inquiries for your events\n` +
    `✅ Get expert help from our artist coordinators\n\n` +
    `Need help? Reply here or call +91 9009999434.\n— Team Music Maestro`
  );
};

const buildAdminMessage = (user) => {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username;
  const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  return (
    `🔔 *New ${roleLabel(user.role)} Registration*\n\n` +
    `Name: ${fullName}\n` +
    `Username: ${user.username}\n` +
    `Email: ${user.email}\n` +
    `Phone: +${user.phone}\n` +
    `Role: ${roleLabel(user.role)}\n` +
    `Registered: ${time} IST`
  );
};

// Template parameters (order must match the approved template's {{1}}, {{2}}...)
const userTemplateParams = (user) => [user.firstName || user.username, roleLabel(user.role)];
const adminTemplateParams = (user) => [
  roleLabel(user.role),
  [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username,
  user.email,
  `+${user.phone}`,
];

// ---------------------------------------------------------------------------
// Providers
// ---------------------------------------------------------------------------
const sendViaMeta = async ({ to, text, templateName, templateParams }) => {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const version = process.env.WHATSAPP_API_VERSION || 'v21.0';
  if (!token || !phoneNumberId) throw new Error('WHATSAPP_TOKEN / WHATSAPP_PHONE_NUMBER_ID not set');

  const payload = templateName
    ? {
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: templateName,
          language: { code: process.env.WHATSAPP_TEMPLATE_LANG || 'en' },
          components: [
            {
              type: 'body',
              parameters: templateParams.map((value) => ({ type: 'text', text: String(value) })),
            },
          ],
        },
      }
    : { messaging_product: 'whatsapp', to, type: 'text', text: { body: text } };

  const res = await fetch(`https://graph.facebook.com/${version}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error?.message || `Meta API HTTP ${res.status}`);
  return data?.messages?.[0]?.id;
};

const sendViaTwilio = async ({ to, text, contentSid, templateParams }) => {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM; // e.g. +14155238886
  if (!sid || !authToken || !from) {
    throw new Error('TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_WHATSAPP_FROM not set');
  }

  const body = new URLSearchParams({
    From: `whatsapp:${from.startsWith('+') ? from : `+${from}`}`,
    To: `whatsapp:+${to}`,
  });
  if (contentSid) {
    body.set('ContentSid', contentSid);
    body.set(
      'ContentVariables',
      JSON.stringify(Object.fromEntries(templateParams.map((v, i) => [String(i + 1), String(v)])))
    );
  } else {
    body.set('Body', text);
  }

  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${sid}:${authToken}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    signal: AbortSignal.timeout(10000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || `Twilio HTTP ${res.status}`);
  return data?.sid;
};

const sendWhatsApp = async ({ to, text, templateName, contentSid, templateParams = [], label }) => {
  const provider = (process.env.WHATSAPP_PROVIDER || '').toLowerCase();

  if (!provider) {
    console.log(`[WhatsApp:simulated] -> ${label} (+${to})\n${text}\n`);
    return { simulated: true };
  }

  try {
    const id =
      provider === 'twilio'
        ? await sendViaTwilio({ to, text, contentSid, templateParams })
        : await sendViaMeta({ to, text, templateName, templateParams });
    console.log(`[WhatsApp:${provider}] Sent to ${label} (+${to}) id=${id}`);
    return { success: true, id };
  } catch (err) {
    console.error(`[WhatsApp:${provider}] Failed to send to ${label} (+${to}):`, err.message);
    return { success: false, error: err.message };
  }
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Send registration WhatsApp messages to:
 *   1. The newly registered user (artist or client)
 *   2. The Music Maestro team / platform admin (the "bridge")
 * Never throws - failures are logged so registration is never blocked.
 */
const sendRegistrationWhatsApp = async (user) => {
  const tasks = [];

  if (user.phone) {
    tasks.push(
      sendWhatsApp({
        to: user.phone,
        label: `new ${user.role}`,
        text: buildUserMessage(user),
        templateName:
          user.role === 'artist'
            ? process.env.WHATSAPP_TEMPLATE_ARTIST_WELCOME
            : process.env.WHATSAPP_TEMPLATE_CLIENT_WELCOME,
        contentSid:
          user.role === 'artist'
            ? process.env.TWILIO_CONTENT_SID_ARTIST_WELCOME
            : process.env.TWILIO_CONTENT_SID_CLIENT_WELCOME,
        templateParams: userTemplateParams(user),
      })
    );
  }

  const adminNumbers = (process.env.ADMIN_WHATSAPP_NUMBERS || '')
    .split(',')
    .map(normalizePhone)
    .filter(Boolean);

  for (const adminPhone of adminNumbers) {
    tasks.push(
      sendWhatsApp({
        to: adminPhone,
        label: 'Music Maestro admin',
        text: buildAdminMessage(user),
        templateName: process.env.WHATSAPP_TEMPLATE_ADMIN_ALERT,
        contentSid: process.env.TWILIO_CONTENT_SID_ADMIN_ALERT,
        templateParams: adminTemplateParams(user),
      })
    );
  }

  const results = await Promise.allSettled(tasks);
  return results.map((r) => (r.status === 'fulfilled' ? r.value : { success: false }));
};

/**
 * Booking / event inquiry WhatsApp messages (only used when WHATSAPP_PROVIDER
 * is configured - the default free flow uses wa.me links instead).
 */
const sendInquiryWhatsApp = async (inquiry) => {
  const artist = inquiry.artistName || 'General Entertainment Query';
  const tasks = [];

  if (inquiry.whatsapp) {
    tasks.push(
      sendWhatsApp({
        to: inquiry.whatsapp,
        label: 'client',
        text:
          `🎵 Hi ${inquiry.name}, thank you for contacting Music Maestro!\n\n` +
          `We received your booking inquiry *${inquiry.referenceId}*\n` +
          `Artist: ${artist}\nEvent: ${inquiry.eventType}\nLocation: ${inquiry.city}\n\n` +
          `Our artist coordinator will contact you within 24 hours.\n— Team Music Maestro`,
        templateName: process.env.WHATSAPP_TEMPLATE_INQUIRY_CLIENT,
        contentSid: process.env.TWILIO_CONTENT_SID_INQUIRY_CLIENT,
        templateParams: [inquiry.name, inquiry.referenceId, artist],
      })
    );
  }

  const adminNumbers = (process.env.ADMIN_WHATSAPP_NUMBERS || '')
    .split(',')
    .map(normalizePhone)
    .filter(Boolean);
  for (const adminPhone of adminNumbers) {
    tasks.push(
      sendWhatsApp({
        to: adminPhone,
        label: 'Music Maestro admin',
        text:
          `🔔 *New Booking Inquiry ${inquiry.referenceId}*\n\n` +
          `Client: ${inquiry.name}\nPhone: ${inquiry.phone}\nEmail: ${inquiry.email}\n` +
          `Artist: ${artist}\nEvent: ${inquiry.eventType} (${inquiry.eventDate})\n` +
          `Location: ${inquiry.city}\nGuests: ${inquiry.guestCount}\nNotes: ${inquiry.notes || '-'}`,
        templateName: process.env.WHATSAPP_TEMPLATE_INQUIRY_ADMIN,
        contentSid: process.env.TWILIO_CONTENT_SID_INQUIRY_ADMIN,
        templateParams: [inquiry.referenceId, inquiry.name, inquiry.phone, artist],
      })
    );
  }

  return Promise.allSettled(tasks);
};

module.exports = {
  normalizePhone,
  sendRegistrationWhatsApp,
  sendInquiryWhatsApp,
  buildUserMessage,
  buildAdminMessage,
};

