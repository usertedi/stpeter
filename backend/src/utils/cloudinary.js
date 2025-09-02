const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload an image to Cloudinary
 * @param {string} imagePath - Path to the image file
 * @param {string} folder - Folder in Cloudinary to store the image
 * @returns {Promise} - Cloudinary upload result
 */
exports.uploadImage = async (imagePath, folder = 'stpeter_church') => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder,
      use_filename: true
    });
    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Image upload failed');
  }
};

/**
 * Delete an image from Cloudinary
 * @param {string} publicId - Cloudinary public ID of the image
 * @returns {Promise} - Cloudinary delete result
 */
exports.deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Image deletion failed');
  }
};