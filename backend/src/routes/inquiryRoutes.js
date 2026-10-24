const express = require('express');
const router = express.Router();
const {
  createInquiry,
  getInquiries,
} = require('../controllers/inquiryController');
const inquiryValidator = require('../validators/inquiryValidator');
const validate = require('../middleware/validate');

router.post('/', inquiryValidator, validate, createInquiry);
router.get('/', getInquiries);

module.exports = router;
