const Contact = require('../models/Contact');
const { sendContactEmails } = require('../services/emailService');
const { saveWithFallback } = require('../utils/localBackup');

// @desc    Submit a message via Contact Us form
// @route   POST /api/contact
const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const contactPayload = {
      name: name ? name.trim() : '',
      email: email ? email.trim() : '',
      phone: phone ? phone.trim() : '',
      subject: subject ? subject.trim() : '',
      message: message ? message.trim() : '',
    };

    // Saves to MongoDB, or to backend/data/contacts.json if the DB is down
    const contactRecord = await saveWithFallback(Contact, contactPayload, 'contacts');

    // Email owner + client in the background so the response returns immediately
    sendContactEmails(contactPayload).catch((mailErr) => {
      console.error('[Contact Controller]: Background mail error:', mailErr.message);
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will contact you soon.',
      data: contactRecord || contactPayload,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
};
