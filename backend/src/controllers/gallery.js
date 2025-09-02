const Gallery = require('../models/Gallery');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * @desc    Get all gallery items
 * @route   GET /api/gallery
 * @access  Public
 */
exports.getGalleryItems = async (req, res) => {
  try {
    // Filter by album if provided
    const filter = {};
    if (req.query.album) {
      filter.album = req.query.album;
    }

    const galleryItems = await Gallery.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: galleryItems.length,
      data: galleryItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Get all albums
 * @route   GET /api/gallery/albums
 * @access  Public
 */
exports.getAlbums = async (req, res) => {
  try {
    const albums = await Gallery.distinct('album');

    res.status(200).json({
      success: true,
      count: albums.length,
      data: albums
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Get single gallery item
 * @route   GET /api/gallery/:id
 * @access  Public
 */
exports.getGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        error: 'Gallery item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: galleryItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Upload image to Cloudinary
 * @route   Used as middleware for POST /api/gallery
 * @access  Private/Admin
 */
exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
      return res.status(400).json({
        success: false,
        error: 'Please upload an image'
      });
    }

    const file = req.files.image;

    // Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
      return res.status(400).json({
        success: false,
        error: 'Please upload an image file'
      });
    }

    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD || file.size > 10000000) {
      return res.status(400).json({
        success: false,
        error: 'Please upload an image less than 10MB'
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'stpeter_church/gallery',
      use_filename: true
    });

    // Add Cloudinary data to request body
    req.body.imageUrl = result.secure_url;
    req.body.cloudinaryId = result.public_id;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Create new gallery item
 * @route   POST /api/gallery
 * @access  Private/Admin
 */
exports.createGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.create(req.body);

    res.status(201).json({
      success: true,
      data: galleryItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Update gallery item
 * @route   PUT /api/gallery/:id
 * @access  Private/Admin
 */
exports.updateGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        error: 'Gallery item not found'
      });
    }

    res.status(200).json({
      success: true,
      data: galleryItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Delete gallery item
 * @route   DELETE /api/gallery/:id
 * @access  Private/Admin
 */
exports.deleteGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        error: 'Gallery item not found'
      });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(galleryItem.cloudinaryId);

    // Delete gallery item from database
    await galleryItem.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};