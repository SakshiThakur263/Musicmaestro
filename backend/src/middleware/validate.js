const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const list = errors.array();
    return res.status(400).json({
      success: false,
      // Surface the first specific error so the UI can show something actionable
      message: list[0]?.msg || 'Validation failed',
      errors: list.map((err) => ({
        field: err.path || err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = validate;
