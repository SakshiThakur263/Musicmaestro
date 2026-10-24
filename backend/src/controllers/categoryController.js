const Category = require('../models/Category');

// @desc    Get all categories with grouping and counts
// @route   GET /api/categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    // Group categories by parentGroup
    const grouped = {
      'Solo Performer': [],
      'Live Bands': [],
      'DJ Services': [],
      'Others': [],
    };

    categories.forEach((cat) => {
      if (grouped[cat.parentGroup]) {
        grouped[cat.parentGroup].push(cat);
      } else {
        if (!grouped['Others']) grouped['Others'] = [];
        grouped['Others'].push(cat);
      }
    });

    res.json({
      success: true,
      count: categories.length,
      data: categories,
      grouped,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
};
