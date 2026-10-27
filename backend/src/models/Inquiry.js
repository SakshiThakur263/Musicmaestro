const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    eventType: {
      type: String,
      required: [true, 'Event type is required'],
      enum: ['Wedding', 'Corporate', 'Sangeet / Cocktails', 'Private Party', 'College Fest', 'Concert / Festival', 'Other'],
      default: 'Wedding',
    },
    eventDate: {
      type: String,
      default: 'To Be Decided',
    },
    city: {
      type: String,
      required: [true, 'City/Venue is required'],
      trim: true,
    },
    guestCount: {
      type: String,
      default: '100-300',
    },
    budget: {
      type: String,
      default: 'Under 1 Lakh',
    },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      default: null,
    },
    artistName: {
      type: String,
      default: 'General Artist Requirement',
    },
    category: {
      type: String,
      default: 'Any / Multiple',
    },
    notes: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Contacted', 'Booked', 'Archived'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
