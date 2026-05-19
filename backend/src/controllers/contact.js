const Contact = require('../models/Contact');
const sendEmail = require('../utils/email');
const isEmailConfigured = sendEmail.isEmailConfigured;
const { getPagination, getPaginationMeta } = require('../utils/pagination');

const contactListFields = 'name email phone subject message status createdAt';

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const normalizeContactPayload = ({ name, email, phone, subject, message }) => ({
  name: typeof name === 'string' ? name.trim() : '',
  email: typeof email === 'string' ? email.trim().toLowerCase() : '',
  phone: typeof phone === 'string' ? phone.trim() : '',
  subject: typeof subject === 'string' ? subject.trim() : '',
  message: typeof message === 'string' ? message.trim() : '',
});

/**
 * @desc    Submit contact form
 * @route   POST /api/contact
 * @access  Public
 */
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = normalizeContactPayload(req.body);

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, subject, and message are required'
      });
    }

    // Create contact submission
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message
    });

    // Send email notification
    const notificationSent = await sendEmailNotification(contact);

    res.status(201).json({
      success: true,
      notificationSent,
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
    const pagination = getPagination(req.query, { defaultLimit: 25, maxLimit: 100 });
    const [contacts, total] = await Promise.all([
      Contact.find()
        .select(contactListFields)
        .sort({ createdAt: -1 })
        .skip(pagination.skip)
        .limit(pagination.limit)
        .lean(),
      Contact.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      count: contacts.length,
      pagination: getPaginationMeta({ ...pagination, total }),
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
    const contact = await Contact.findById(req.params.id).select(contactListFields).lean();

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
    if (!isEmailConfigured()) {
      console.warn('Email notification skipped: email environment variables are not configured');
      return false;
    }

    await sendEmail({
      to: process.env.EMAIL_FROM,
      subject: `New Contact Form Submission: ${contact.subject}`,
      text: [
        'New Contact Form Submission',
        `Name: ${contact.name}`,
        `Email: ${contact.email}`,
        `Phone: ${contact.phone || 'Not provided'}`,
        `Subject: ${contact.subject}`,
        '',
        contact.message,
      ].join('\n'),
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${escapeHtml(contact.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(contact.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(contact.phone || 'Not provided')}</p>
        <p><strong>Subject:</strong> ${escapeHtml(contact.subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(contact.message).replace(/\n/g, '<br />')}</p>
      `,
    });
    return true;
  } catch (error) {
    console.error('Email notification error:', error);
    return false;
  }
};