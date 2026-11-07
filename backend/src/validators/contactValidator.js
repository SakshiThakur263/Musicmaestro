const { body } = require('express-validator');

const contactValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email address is required'),
  body('phone').optional().trim(),
  body('subject').optional().trim(),
  body('message').optional().trim(),
];

module.exports = contactValidator;
