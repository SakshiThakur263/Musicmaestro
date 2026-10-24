const { body } = require('express-validator');

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
];

module.exports = artistValidator;
