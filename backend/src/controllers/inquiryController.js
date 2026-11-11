const Inquiry = require('../models/Inquiry');
const { generateInquiryReference } = require('../services/inquiryService');
const { sendInquiryEmails } = require('../services/emailService');
const { normalizePhone, sendInquiryWhatsApp } = require('../services/whatsappService');
const { saveWithFallback } = require('../utils/localBackup');

const EVENT_TYPES = Inquiry.schema.path('eventType').enumValues;

// @desc    Submit new event inquiry / booking request
// @route   POST /api/inquiries
const createInquiry = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      eventType,
      eventDate,
      city,
      guestCount,
      budget,
      artistId,
      artistName,
      category,
      notes,
    } = req.body;

    const payload = {
      referenceId: generateInquiryReference(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      // Unknown values from older forms are stored as "Other" instead of failing
      eventType: EVENT_TYPES.includes(eventType) ? eventType : 'Other',
      eventDate: eventDate || 'To Be Decided',
      city: city.trim(),
      guestCount: guestCount || '100-300',
      budget: budget || 'Under 1 Lakh',
      artistId: artistId || null,
      artistName: artistName || 'General Entertainment Query',
      category: category || 'Any',
      notes: notes || '',
    };

    // Saves to MongoDB, or to backend/data/inquiries.json if the DB is down,
    // so the client never sees a timeout and no lead is lost.
    const saved = await saveWithFallback(Inquiry, payload, 'inquiries');

    // Notify owner + client (fire-and-forget; never blocks the response)
    const notifyData = { ...payload, whatsapp: normalizePhone(payload.phone) };
    sendInquiryEmails(notifyData).catch((err) =>
      console.error('[Inquiry]: Email notification error:', err.message)
    );
    if (process.env.WHATSAPP_PROVIDER) {
      sendInquiryWhatsApp(notifyData).catch((err) =>
        console.error('[Inquiry]: WhatsApp notification error:', err.message)
      );
    }

    res.status(201).json({
      success: true,
      message:
        'Thank you! Your event inquiry has been submitted successfully. Our talent coordinator will get back to you within 24 hours.',
      inquiryReference: payload.referenceId,
      data: saved || payload,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all inquiries (for admin/coordinator)
// @route   GET /api/inquiries
const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInquiry,
  getInquiries,
};
