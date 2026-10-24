const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    parentGroup: {
      type: String,
      enum: ['Solo Performer', 'Live Bands', 'DJ Services', 'Others'],
      default: 'Live Bands',
    },
    description: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'Music',
    },
    artistCount: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
