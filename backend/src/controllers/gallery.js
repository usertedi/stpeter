const Gallery = require('../models/Gallery');
const { uploadDataUri, deleteImage } = require('../utils/cloudinary');
const { getPagination, getPaginationMeta } = require('../utils/pagination');

const galleryListFields = 'title description album imageUrl cloudinaryId featured createdAt';

/**
 * @desc    Get all gallery items
 * @route   GET /api/gallery
 * @access  Public
 */
exports.getGalleryItems = async (req, res) => {
  try {
    const pagination = getPagination(req.query, { defaultLimit: 60, maxLimit: 120 });
    // Filter by album if provided
    const filter = {};
    if (req.query.album) {
      filter.album = req.query.album;
    }

    const [galleryItems, total] = await Promise.all([
      Gallery.find(filter)
        .select(galleryListFields)
        .sort({ createdAt: -1 })
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean(),
      Gallery.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      count: galleryItems.length,
      pagination: getPaginationMeta({ ...pagination, total }),
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
    const galleryItem = await Gallery.findById(req.params.id).select(galleryListFields).lean();

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

    // Upload image to Cloudinary using data buffer
    const result = await uploadDataUri(
      `data:${file.mimetype};base64,${file.data.toString('base64')}`,
      'stpeter_church/gallery'
    );

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
    await deleteImage(galleryItem.cloudinaryId);

    // Delete gallery item from database
    await galleryItem.deleteOne();

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