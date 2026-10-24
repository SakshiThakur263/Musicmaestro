const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Artist name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    tagline: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      index: true,
    },
    subcategory: {
      type: String,
      required: [true, 'Subcategory is required'],
      index: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      index: true,
    },
    bio: {
      type: String,
      required: [true, 'Biography is required'],
    },
    priceStarting: {
      type: Number,
      default: 25000,
    },
    priceRange: {
      type: String,
      default: 'Rs. 25,000 - 50,000',
    },
    featuredImage: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    videos: [
      {
        title: String,
        url: String,
        embedUrl: String,
      },
    ],
    audioSamples: [
      {
        title: String,
        url: String,
        duration: String,
      },
    ],
    rating: {
      type: Number,
      default: 4.9,
      min: 1,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 12,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    verified: {
      type: Boolean,
      default: true,
    },
    showsCompleted: {
      type: Number,
      default: 150,
    },
    genres: {
      type: [String],
      default: ['Bollywood', 'Live Band', 'Unplugged'],
    },
    languages: {
      type: [String],
      default: ['Hindi', 'English', 'Punjabi'],
    },
    performanceTypes: {
      type: [String],
      default: ['Weddings', 'Corporate Events', 'Clubs', 'Private Parties'],
    },
    socialLinks: {
      instagram: { type: String, default: '' },
      facebook: { type: String, default: '' },
      youtube: { type: String, default: '' },
      spotify: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

artistSchema.index({ name: 'text', bio: 'text', subcategory: 'text', location: 'text' });

module.exports = mongoose.model('Artist', artistSchema);
