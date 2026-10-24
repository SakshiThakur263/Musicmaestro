const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      required: true,
      index: true,
    },
    reviewerName: {
      type: String,
      required: [true, 'Reviewer name is required'],
      trim: true,
    },
    reviewerEmail: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    eventType: {
      type: String,
      default: 'Wedding',
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true,
    },
    verifiedBooking: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
