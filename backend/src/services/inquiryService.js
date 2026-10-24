const crypto = require('crypto');

/**
 * Generate unique WOM inquiry reference format: WOM-XXXXXX
 */
const generateInquiryReference = () => {
  const code = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `WOM-${code}`;
};

/**
 * Simulate dispatching email notification to WOM operations team
 */
const dispatchInquiryNotification = async (inquiry) => {
  // In production, integrate with nodemailer, SendGrid, or AWS SES
  console.log(`[Notification Service]: New Event Inquiry ${inquiry.referenceId} logged for ${inquiry.artistName || 'General Roster'}`);
  return true;
};

module.exports = {
  generateInquiryReference,
  dispatchInquiryNotification,
};
