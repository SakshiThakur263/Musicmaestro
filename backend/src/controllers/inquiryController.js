const Inquiry = require('../models/Inquiry');

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

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      eventType,
      eventDate,
      city,
      guestCount: guestCount || '100-300',
      budget: budget || 'Under 1 Lakh',
      artistId: artistId || null,
      artistName: artistName || 'General Entertainment Query',
      category: category || 'Any',
      notes: notes || '',
    });

    res.status(201).json({
      success: true,
      message:
        'Thank you! Your event inquiry has been submitted successfully. Our talent coordinator will get back to you within 24 hours.',
      inquiryReference: `WOM-${inquiry._id.toString().slice(-6).toUpperCase()}`,
      data: inquiry,
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
