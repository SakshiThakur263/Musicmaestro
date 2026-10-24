const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactController');
const contactValidator = require('../validators/contactValidator');
const validate = require('../middleware/validate');

router.post('/', contactValidator, validate, submitContact);

module.exports = router;
