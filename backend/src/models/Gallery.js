const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  cloudinaryId: {
    type: String,
    required: [true, 'Please add a Cloudinary ID']
  },
  album: {
    type: String,
    default: 'General'
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Gallery', GallerySchema);