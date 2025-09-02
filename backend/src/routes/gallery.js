const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  getGalleryItems,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getAlbums,
  uploadImage
} = require('../controllers/gallery');

// Public routes
router.get('/', getGalleryItems);
router.get('/albums', getAlbums);
router.get('/:id', getGalleryItem);

// Protected admin routes
router.post('/', protect, admin, uploadImage, createGalleryItem);
router.put('/:id', protect, admin, updateGalleryItem);
router.delete('/:id', protect, admin, deleteGalleryItem);

module.exports = router;