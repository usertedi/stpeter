const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

/**
 * @desc    Submit contact form
 * @route   POST /api/contact
 * @access  Public
 */
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Create contact submission
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message
    });

    // Send email notification
    await sendEmailNotification(contact);

    res.status(201).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Get all contact submissions
 * @route   GET /api/contact
 * @access  Private/Admin
 */
exports.getContactSubmissions = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Get single contact submission
 * @route   GET /api/contact/:id
 * @access  Private/Admin
 */
exports.getContactSubmission = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact submission not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Update contact status
 * @route   PUT /api/contact/:id
 * @access  Private/Admin
 */
exports.updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact submission not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @desc    Delete contact submission
 * @route   DELETE /api/contact/:id
 * @access  Private/Admin
 */
exports.deleteContactSubmission = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact submission not found'
      });
    }

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

/**
 * Helper function to send email notification
 */
const sendEmailNotification = async (contact) => {
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
      to: process.env.EMAIL_FROM, // Send to church email
      subject: `New Contact Form Submission: ${contact.subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${contact.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${contact.message}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email notification error:', error);
    // Don't throw error, just log it
  }
};