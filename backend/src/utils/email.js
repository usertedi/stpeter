const nodemailer = require('nodemailer');

/**
 * Send an email using Nodemailer
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email HTML content
 * @param {string} options.text - Email text content (fallback for HTML)
 * @returns {Promise} - Nodemailer send result
 */
const sendEmail = async (options) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, '') // Strip HTML tags for text version
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;