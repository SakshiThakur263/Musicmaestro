const nodemailer = require('nodemailer');

/**
 * Configure nodemailer transporter from environment variables.
 * Supports standard SMTP (e.g., Gmail, Outlook, AWS SES, or custom SMTP).
 */
const getTransporter = () => {
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.EMAIL_PORT, 10) || 587;
  const secure = process.env.EMAIL_SECURE === 'true' || port === 465;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

/**
 * Send contact form emails to both:
 * 1. The client / company admin (musicmaestroevent@gmail.com)
 * 2. The user who submitted the form (confirmation receipt)
 */
const sendContactEmails = async ({ name, email, phone, subject, message }) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'musicmaestroevent@gmail.com';
  const senderEmail = process.env.EMAIL_USER || adminEmail;
  const cleanSubject = subject && subject.trim() ? subject.trim() : 'General Inquiry';
  const cleanMessage = message && message.trim() ? message.trim() : 'No additional message provided.';
  const cleanPhone = phone && phone.trim() ? phone.trim() : 'Not provided';
  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const transporter = getTransporter();

  // HTML template for company/client admin
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0b0e14; color: #f1f5f9; padding: 24px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(244,165,28,0.25);">
      <div style="text-align: center; border-bottom: 1px solid #1f2633; padding-bottom: 16px; margin-bottom: 20px;">
        <h1 style="color: #f4a51c; margin: 0; font-size: 24px; letter-spacing: 1px;">MUSIC MAESTRO</h1>
        <p style="color: #94a3b8; font-size: 13px; margin: 4px 0 0;">New Contact Form Submission</p>
      </div>

      <div style="background-color: #121622; padding: 18px; border-radius: 8px; border: 1px solid #1f2633; margin-bottom: 20px;">
        <h2 style="color: #f4a51c; font-size: 16px; margin-top: 0; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px;">Inquiry Details</h2>
        <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #94a3b8;">Client Name:</strong> <span style="color: #ffffff;">${name}</span></p>
        <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #94a3b8;">Email Address:</strong> <a href="mailto:${email}" style="color: #f4a51c; text-decoration: none;">${email}</a></p>
        <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #94a3b8;">Phone Number:</strong> <a href="tel:${cleanPhone}" style="color: #f4a51c; text-decoration: none;">${cleanPhone}</a></p>
        <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #94a3b8;">Subject:</strong> <span style="color: #ffffff;">${cleanSubject}</span></p>
        <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #94a3b8;">Submitted At:</strong> <span style="color: #ffffff;">${submittedAt} IST</span></p>
      </div>

      <div style="background-color: #121622; padding: 18px; border-radius: 8px; border: 1px solid #1f2633; margin-bottom: 20px;">
        <h3 style="color: #f4a51c; font-size: 14px; margin-top: 0; margin-bottom: 8px;">Message Content:</h3>
        <p style="color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin: 0; background-color: #0b0e14; padding: 12px; border-radius: 6px;">${cleanMessage}</p>
      </div>

      <div style="text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #1f2633; padding-top: 12px;">
        Music Maestro Event Management Platform • Mumbai, India
      </div>
    </div>
  `;

  // HTML template for customer/user confirmation receipt
  const userHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0b0e14; color: #f1f5f9; padding: 24px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(244,165,28,0.25);">
      <div style="text-align: center; border-bottom: 1px solid #1f2633; padding-bottom: 16px; margin-bottom: 20px;">
        <h1 style="color: #f4a51c; margin: 0; font-size: 24px; letter-spacing: 1px;">MUSIC MAESTRO</h1>
        <p style="color: #94a3b8; font-size: 13px; margin: 4px 0 0;">Art of Performance &amp; Celebration</p>
      </div>

      <p style="font-size: 15px; color: #ffffff; margin-bottom: 16px;">Dear <strong>${name}</strong>,</p>
      <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6; margin-bottom: 20px;">
        Thank you for reaching out to <strong>Music Maestro</strong>! We have received your inquiry and one of our dedicated artist coordinators will connect with you promptly.
      </p>

      <div style="background-color: #121622; padding: 18px; border-radius: 8px; border: 1px solid #1f2633; margin-bottom: 20px;">
        <h3 style="color: #f4a51c; font-size: 14px; margin-top: 0; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 6px;">Summary of Your Submission</h3>
        <p style="margin: 6px 0; font-size: 13px;"><strong style="color: #94a3b8;">Subject:</strong> <span style="color: #ffffff;">${cleanSubject}</span></p>
        <p style="margin: 6px 0; font-size: 13px;"><strong style="color: #94a3b8;">Phone:</strong> <span style="color: #ffffff;">${cleanPhone}</span></p>
        ${cleanMessage ? `<p style="margin: 6px 0; font-size: 13px;"><strong style="color: #94a3b8;">Message:</strong> <span style="color: #ffffff;">${cleanMessage}</span></p>` : ''}
      </div>

      <div style="background-color: #121622; padding: 14px; border-radius: 8px; border-left: 3px solid #f4a51c; margin-bottom: 20px;">
        <p style="margin: 0; font-size: 13px; color: #cbd5e1;">
          <strong>Need immediate assistance?</strong><br>
          📞 Call us: <a href="tel:+919009999434" style="color: #f4a51c; text-decoration: none;">+91 9009999434</a><br>
          ✉️ Email: <a href="mailto:musicmaestroevent@gmail.com" style="color: #f4a51c; text-decoration: none;">musicmaestroevent@gmail.com</a><br>
          📍 Mumbai Office: 202/19, Oshiwara Andheri West, Mumbai
        </p>
      </div>

      <div style="text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #1f2633; padding-top: 12px;">
        Warm regards,<br>
        <strong>Music Maestro Team</strong>
      </div>
    </div>
  `;

  if (!transporter) {
    console.log('[EmailService]: SMTP not configured (EMAIL_USER / EMAIL_PASS missing). Notification simulation:');
    console.log(`  -> Sent to Admin (${adminEmail}): Subject "[Inquiry] ${cleanSubject} - ${name}"`);
    console.log(`  -> Sent to User (${email}): Subject "Thank you for contacting Music Maestro! We received your message"`);
    return {
      success: true,
      simulated: true,
      message: 'SMTP credentials not configured; emails successfully simulated and logged.',
    };
  }

  try {
    const adminMailOptions = {
      from: `"Music Maestro Platform" <${senderEmail}>`,
      to: adminEmail,
      replyTo: email,
      subject: `New Inquiry: ${cleanSubject} - ${name}`,
      text: `New contact submission from ${name} (${email}, ${cleanPhone}):\nSubject: ${cleanSubject}\nMessage: ${cleanMessage}`,
      html: adminHtml,
    };

    const userMailOptions = {
      from: `"Music Maestro" <${senderEmail}>`,
      to: email,
      subject: `Thank you for contacting Music Maestro! We received your message`,
      text: `Dear ${name},\n\nThank you for contacting Music Maestro! We have received your inquiry regarding "${cleanSubject}" and our team will get back to you shortly.\n\nWarm regards,\nMusic Maestro Team`,
      html: userHtml,
    };

    // Send both in parallel with error isolation
    const results = await Promise.allSettled([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    const adminResult = results[0];
    const userResult = results[1];

    if (adminResult.status === 'fulfilled') {
      console.log(`[EmailService]: Admin email delivered successfully to ${adminEmail}`);
    } else {
      console.error(`[EmailService]: Failed to send admin email:`, adminResult.reason?.message);
    }

    if (userResult.status === 'fulfilled') {
      console.log(`[EmailService]: User confirmation email delivered successfully to ${email}`);
    } else {
      console.error(`[EmailService]: Failed to send user confirmation email:`, userResult.reason?.message);
    }

    return {
      success: adminResult.status === 'fulfilled' || userResult.status === 'fulfilled',
      adminStatus: adminResult.status,
      userStatus: userResult.status,
    };
  } catch (err) {
    console.error('[EmailService]: Error during mail dispatch:', err.message);
    return { success: false, error: err.message };
  }
};

module.exports = {
  sendContactEmails,
};

