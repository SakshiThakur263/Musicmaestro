const { body } = require('express-validator');

const inquiryValidator = [
  body('name').trim().notEmpty().withMessage('Full name is required'),
  body('email').trim().isEmail().withMessage('A valid email address is required'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[0-9+\s-]{8,15}$/)
    .withMessage('Please enter a valid phone number'),
  body('eventType').trim().notEmpty().withMessage('Event type is required'),
  body('eventDate').trim().notEmpty().withMessage('Event date is required'),
  body('city').trim().notEmpty().withMessage('City / Location is required'),
];

module.exports = inquiryValidator;
