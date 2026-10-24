const Contact = require('../models/Contact');

// @desc    Submit a message via Contact Us form
// @route   POST /api/contact
const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone: phone || '',
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. We will contact you soon.',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
};
