const Artist = require('../models/Artist');
const Review = require('../models/Review');

// Helper to create clean slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

// @desc    Get all artists with advanced filtering, search, pagination, and sorting
// @route   GET /api/artists
const getArtists = async (req, res, next) => {
  try {
    const {
      search,
      category,
      subcategory,
      location,
      minPrice,
      maxPrice,
      featured,
      sort,
      page = 1,
      limit = 12,
    } = req.query;

    const query = {};

    // Keyword search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } },
        { subcategory: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { genres: { $regex: search, $options: 'i' } },
      ];
    }

    // Category filter
    if (category && category !== 'All' && category !== '0') {
      const escapedCat = category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.category = { $regex: new RegExp(`^${escapedCat}$`, 'i') };
    }

    // Subcategory filter
    if (subcategory && subcategory !== 'All') {
      const normalizedSub = subcategory.replace(/s$/i, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.subcategory = { $regex: new RegExp(normalizedSub, 'i') };
    }

    // Location filter
    if (location && location !== 'All' && location !== 'Location') {
      query.location = { $regex: location, $options: 'i' };
    }

    // Featured only
    if (featured === 'true') {
      query.featured = true;
    }

    // Price range
    if (minPrice || maxPrice) {
      query.priceStarting = {};
      if (minPrice) query.priceStarting.$gte = Number(minPrice);
      if (maxPrice) query.priceStarting.$lte = Number(maxPrice);
    }

    // Sorting
    let sortOption = { createdAt: -1 };
    if (sort === 'rating') sortOption = { rating: -1, reviewCount: -1 };
    else if (sort === 'price-low') sortOption = { priceStarting: 1 };
    else if (sort === 'price-high') sortOption = { priceStarting: -1 };
    else if (sort === 'name-asc') sortOption = { name: 1 };
    else if (sort === 'shows') sortOption = { showsCompleted: -1 };

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Artist.countDocuments(query);
    const artists = await Artist.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.json({
      success: true,
      count: artists.length,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      data: artists,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured artists for home carousels
// @route   GET /api/artists/featured
const getFeaturedArtists = async (req, res, next) => {
  try {
    const featured = await Artist.find({ featured: true }).limit(10);
    res.json({
      success: true,
      data: featured,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get artist by slug with reviews and similar artists
// @route   GET /api/artists/:slug
const getArtistBySlug = async (req, res, next) => {
  try {
    const artist = await Artist.findOne({ slug: req.params.slug });

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist listing not found',
      });
    }

    // Fetch reviews for this artist
    const reviews = await Review.find({ artistId: artist._id }).sort({
      createdAt: -1,
    });

    // Fetch similar artists in the same category or location
    const similarArtists = await Artist.find({
      _id: { $ne: artist._id },
      $or: [{ category: artist.category }, { location: artist.location }],
    }).limit(4);

    res.json({
      success: true,
      data: {
        artist,
        reviews,
        similarArtists,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new artist listing (from Add Listing / Artist Portal)
// @route   POST /api/artists
const createArtist = async (req, res, next) => {
  try {
    const {
      name,
      tagline,
      category,
      subcategory,
      location,
      bio,
      priceStarting,
      featuredImage,
      images,
      videos,
      audioSamples,
      genres,
      languages,
      performanceTypes,
      socialLinks,
    } = req.body;

    let baseSlug = slugify(name);
    let slug = baseSlug;
    let count = 1;
    while (await Artist.findOne({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    const newArtist = await Artist.create({
      name,
      slug,
      tagline: tagline || `${subcategory} in ${location}`,
      category,
      subcategory,
      location,
      bio,
      priceStarting: priceStarting ? Number(priceStarting) : 25000,
      priceRange: priceStarting ? `Rs. ${priceStarting}` : 'Rs. 25,000 - 50,000',
      featuredImage:
        featuredImage ||
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      images: images && images.length ? images : [featuredImage],
      videos: videos || [],
      audioSamples: audioSamples || [],
      genres: genres || ['Bollywood', 'Live Band'],
      languages: languages || ['Hindi', 'English'],
      performanceTypes: performanceTypes || ['Weddings', 'Corporate Events'],
      socialLinks: socialLinks || {},
      featured: false,
      verified: true,
    });

    res.status(201).json({
      success: true,
      message: 'Artist profile created successfully and listed in Artist Bank',
      data: newArtist,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add review for an artist
// @route   POST /api/artists/:id/reviews
const addArtistReview = async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found',
      });
    }

    const { reviewerName, reviewerEmail, rating, eventType, comment } = req.body;

    if (!reviewerName || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Reviewer name, rating, and review comments are required',
      });
    }

    const review = await Review.create({
      artistId: artist._id,
      reviewerName,
      reviewerEmail,
      rating: Number(rating),
      eventType: eventType || 'Wedding',
      comment,
    });

    // Recalculate artist rating
    const allReviews = await Review.find({ artistId: artist._id });
    const avgRating =
      allReviews.reduce((sum, item) => sum + item.rating, 0) /
      allReviews.length;

    artist.rating = parseFloat(avgRating.toFixed(1));
    artist.reviewCount = allReviews.length;
    await artist.save();

    res.status(201).json({
      success: true,
      message: 'Thank you! Your review has been published.',
      data: review,
      updatedArtist: {
        rating: artist.rating,
        reviewCount: artist.reviewCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getArtists,
  getFeaturedArtists,
  getArtistBySlug,
  createArtist,
  addArtistReview,
};
