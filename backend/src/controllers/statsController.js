const Artist = require('../models/Artist');
const Inquiry = require('../models/Inquiry');

// @desc    Get website statistics for counter banner
// @route   GET /api/stats
const getStats = async (req, res, next) => {
  try {
    const artistCount = await Artist.countDocuments();
    const inquiryCount = await Inquiry.countDocuments();

    res.json({
      success: true,
      data: {
        totalArtists: artistCount > 0 ? artistCount + 480 : 500,
        showsCompleted: '2,000+',
        citiesCovered: 35,
        totalInquiries: inquiryCount > 0 ? inquiryCount + 1240 : 1250,
        satisfiedClients: '99%',
        rating: 4.9,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
};
