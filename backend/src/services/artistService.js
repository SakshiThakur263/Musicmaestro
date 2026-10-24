const Artist = require('../models/Artist');

/**
 * Build MongoDB query filter from API search & filter criteria
 */
const buildArtistFilter = (query) => {
  const filter = { isActive: true };

  if (query.featured === 'true') {
    filter.isFeatured = true;
  }

  if (query.category) {
    filter.category = new RegExp(`^${query.category.trim()}$`, 'i');
  }

  if (query.subcategory) {
    filter.subcategory = new RegExp(query.subcategory.trim(), 'i');
  }

  if (query.location) {
    filter.location = new RegExp(query.location.trim(), 'i');
  }

  if (query.search) {
    const searchRegex = new RegExp(query.search.trim(), 'i');
    filter.$or = [
      { name: searchRegex },
      { category: searchRegex },
      { subcategory: searchRegex },
      { location: searchRegex },
      { genres: searchRegex },
      { tags: searchRegex },
    ];
  }

  return filter;
};

/**
 * Determine sort specification
 */
const buildArtistSort = (sortBy) => {
  switch (sortBy) {
    case 'price_low':
      return { startingFee: 1 };
    case 'price_high':
      return { startingFee: -1 };
    case 'name':
      return { name: 1 };
    case 'rating':
    default:
      return { rating: -1, reviewCount: -1 };
  }
};

module.exports = {
  buildArtistFilter,
  buildArtistSort,
};
