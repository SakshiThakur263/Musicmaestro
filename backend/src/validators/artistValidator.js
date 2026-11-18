const { body } = require('express-validator');
const { normalizePhone } = require('../services/whatsappService');

const artistValidator = [
  body('name').trim().notEmpty().withMessage('Artist/Band name is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('subcategory').trim().notEmpty().withMessage('Subcategory is required'),
  body('location').trim().notEmpty().withMessage('City/Location is required'),
  body('bio')
    .trim()
    .isLength({ min: 20 })
    .withMessage('Bio must be at least 20 characters long'),
  body('featuredImage')
    .trim()
    .notEmpty()
    .withMessage('Profile image URL is required'),
  body('contactEmail').trim().isEmail().withMessage('A valid email address is required'),
  body('contactPhone')
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
];

module.exports = artistValidator;
