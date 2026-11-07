const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const Contact = require('../models/Contact');
const { sendContactEmails } = require('../services/emailService');

// Fallback backup directory for offline or disconnected DB states
const BACKUP_FILE = path.join(__dirname, '../../data/contacts.json');

const saveToLocalBackup = (contactData) => {
  try {
    const dir = path.dirname(BACKUP_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let list = [];
    if (fs.existsSync(BACKUP_FILE)) {
      const raw = fs.readFileSync(BACKUP_FILE, 'utf8');
      list = JSON.parse(raw || '[]');
    }

    list.push({
      ...contactData,
      _id: 'local_' + Date.now(),
      createdAt: new Date().toISOString(),
    });

    fs.writeFileSync(BACKUP_FILE, JSON.stringify(list, null, 2));
    console.log('[Contact Controller]: Saved submission to local backup contacts.json');
  } catch (err) {
    console.warn('[Contact Controller]: Backup file write note:', err.message);
  }
};

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

    let contactRecord = null;

    // Check if MongoDB is connected (readyState === 1)
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        // Enforce a 3-second timeout race to prevent hanging
        contactRecord = await Promise.race([
          Contact.create(contactPayload),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('MongoDB operation timeout')), 3000)
          ),
        ]);
      } catch (dbErr) {
        console.warn('[Contact Controller]: DB save issue:', dbErr.message);
        saveToLocalBackup(contactPayload);
      }
    } else {
      // MongoDB is not connected; store locally so data is never lost
      saveToLocalBackup(contactPayload);
    }

    // Dispatch email notifications to both Client (admin) and User
    // Asynchronous dispatch so response returns immediately without timing out
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
