const nodemailer = require('nodemailer');

const isEmailConfigured = () => {
  if (process.env.RESEND_API_KEY && process.env.EMAIL_FROM) {
    return true;
  }

  return Boolean(
    process.env.EMAIL_SERVICE &&
      process.env.EMAIL_USERNAME &&
      process.env.EMAIL_PASSWORD &&
      process.env.EMAIL_FROM
  );
};

const stripHtml = (html) => html.replace(/<[^>]*>/g, '');

/**
 * Send via Resend HTTP API (required on hosts like Render that block SMTP ports).
 */
const sendViaResend = async (options) => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: [options.to],
      ...(options.replyTo ? { reply_to: options.replyTo } : {}),
      subject: options.subject,
      html: options.html,
      text: options.text || stripHtml(options.html),
    }),
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Resend API error (${response.status}): ${body}`);
  }

  return body ? JSON.parse(body) : {};
};

/**
 * Send via SMTP (works locally; blocked on Render and similar platforms).
 */
const sendViaSmtp = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: options.to,
    ...(options.replyTo ? { replyTo: options.replyTo } : {}),
    subject: options.subject,
    html: options.html,
    text: options.text || stripHtml(options.html),
  });
};

/**
 * Send an email using Resend (production) or Nodemailer SMTP (local dev).
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email HTML content
 * @param {string} [options.text] - Plain-text fallback
 * @returns {Promise<Object>}
 */
const sendEmail = async (options) => {
  try {
    if (process.env.RESEND_API_KEY) {
      return await sendViaResend(options);
    }

    if (
      process.env.EMAIL_SERVICE &&
      process.env.EMAIL_USERNAME &&
      process.env.EMAIL_PASSWORD &&
      process.env.EMAIL_FROM
    ) {
      return await sendViaSmtp(options);
    }

    throw new Error(
      'Email is not configured. Set RESEND_API_KEY + EMAIL_FROM (recommended on Render), or SMTP variables for local dev.'
    );
  } catch (error) {
    console.error('Email sending error:', error);
    if (error instanceof Error && error.message !== 'Email could not be sent') {
      throw error;
    }
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;
module.exports.isEmailConfigured = isEmailConfigured;
