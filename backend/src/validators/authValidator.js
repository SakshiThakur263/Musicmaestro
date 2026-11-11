const { body } = require('express-validator');
const { normalizePhone } = require('../services/whatsappService');

const registerValidator = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('WhatsApp mobile number is required')
    .bail()
    .custom((value) => {
      if (!normalizePhone(value)) {
        throw new Error('Enter a valid mobile number (e.g. 98765 43210 or +91 98765 43210)');
      }
      return true;
    }),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['client', 'artist'])
    .withMessage('Role must be either client or artist'),
];

const loginValidator = [
  body('email').trim().notEmpty().withMessage('Email or username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

module.exports = {
  registerValidator,
  loginValidator,
};
