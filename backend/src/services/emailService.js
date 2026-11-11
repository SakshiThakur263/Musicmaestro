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
  const { normalizePhone } = require('./whatsappService');
  const clientWa = normalizePhone(phone);
  const replyOnWhatsApp = clientWa
    ? `<p style="text-align: center; margin: 0 0 20px;"><a href="https://wa.me/${clientWa}?text=${encodeURIComponent(
        `Hi ${name}, this is Music Maestro 🎵 Thank you for your message about "${cleanSubject}". How can we help you?`
      )}" style="display: inline-block; background: #25D366; color: #fff; padding: 12px 22px; border-radius: 8px; text-decoration: none; font-weight: bold;">Reply to ${name} on WhatsApp</a></p>`
    : '';
  const chatOnWhatsApp = `<p style="text-align: center; margin: 0 0 20px;"><a href="https://wa.me/919009999434?text=${encodeURIComponent(
    `Hi Music Maestro! I just sent a message on your website about "${cleanSubject}".`
  )}" style="display: inline-block; background: #25D366; color: #fff; padding: 12px 22px; border-radius: 8px; text-decoration: none; font-weight: bold;">Chat with us on WhatsApp</a></p>`;

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

      ${replyOnWhatsApp}
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

      ${chatOnWhatsApp}
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

/**
 * Free registration emails (Gmail SMTP via nodemailer):
 *  1. Admin alert to the Music Maestro team with the new member's details
 *  2. Welcome email to the newly registered artist / client
 * Never throws - failures are only logged so sign-up is never blocked.
 */
const sendRegistrationEmails = async (user) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'musicmaestroevent@gmail.com';
  const senderEmail = process.env.EMAIL_USER || adminEmail;
  const isArtist = user.role === 'artist';
  const roleLabel = isArtist ? 'Artist' : 'Client';
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username;
  const phone = user.phone ? `+${user.phone}` : 'Not provided';
  const waLink = user.phone ? `https://wa.me/${user.phone}` : null;
  const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const shell = (inner) => `
    <div style="font-family: Arial, sans-serif; background-color: #0b0e14; color: #f1f5f9; padding: 24px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(244,165,28,0.25);">
      <div style="text-align: center; border-bottom: 1px solid #1f2633; padding-bottom: 16px; margin-bottom: 20px;">
        <h1 style="color: #f4a51c; margin: 0; font-size: 24px; letter-spacing: 1px;">MUSIC MAESTRO</h1>
        <p style="color: #94a3b8; font-size: 13px; margin: 4px 0 0;">Art of Performance &amp; Celebration</p>
      </div>
      ${inner}
    </div>`;

  const adminHtml = shell(`
    <h2 style="color: #f4a51c; font-size: 18px; margin: 0 0 14px;">🔔 New ${roleLabel} Registration</h2>
    <div style="background-color: #121622; padding: 18px; border-radius: 8px; border: 1px solid #1f2633;">
      <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #94a3b8;">Name:</strong> ${fullName}</p>
      <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #94a3b8;">Username:</strong> ${user.username}</p>
      <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #94a3b8;">Email:</strong> <a href="mailto:${user.email}" style="color: #f4a51c;">${user.email}</a></p>
      <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #94a3b8;">WhatsApp:</strong> ${
        waLink ? `<a href="${waLink}" style="color: #25D366;">${phone}</a>` : phone
      }</p>
      <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #94a3b8;">Role:</strong> ${roleLabel}</p>
      <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #94a3b8;">Registered:</strong> ${time} IST</p>
    </div>
    ${
      waLink
        ? `<p style="text-align: center; margin: 20px 0 0;"><a href="${waLink}" style="display: inline-block; background: #25D366; color: #fff; padding: 12px 22px; border-radius: 8px; text-decoration: none; font-weight: bold;">Chat with ${fullName} on WhatsApp</a></p>`
        : ''
    }`);

  const userHtml = shell(`
    <p style="font-size: 15px; color: #ffffff;">Dear <strong>${user.firstName || user.username}</strong>,</p>
    <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
      Welcome to <strong>Music Maestro</strong>! Your <strong style="color: #f4a51c;">${roleLabel}</strong> account has been created successfully.
    </p>
    <div style="background-color: #121622; padding: 16px 18px; border-radius: 8px; border: 1px solid #1f2633; margin: 16px 0;">
      <p style="margin: 0 0 8px; color: #f4a51c; font-weight: bold;">${isArtist ? 'Your next steps' : 'What you can do now'}</p>
      ${
        isArtist
          ? `<p style="margin: 4px 0; font-size: 13px; color: #e2e8f0;">1. Complete your artist profile &amp; add performance videos</p>
             <p style="margin: 4px 0; font-size: 13px; color: #e2e8f0;">2. Set your starting fee and the cities you perform in</p>
             <p style="margin: 4px 0; font-size: 13px; color: #e2e8f0;">3. Start receiving event booking inquiries</p>`
          : `<p style="margin: 4px 0; font-size: 13px; color: #e2e8f0;">✓ Browse verified singers, bands &amp; DJs</p>
             <p style="margin: 4px 0; font-size: 13px; color: #e2e8f0;">✓ Send booking inquiries for your events</p>
             <p style="margin: 4px 0; font-size: 13px; color: #e2e8f0;">✓ Get expert help from our artist coordinators</p>`
      }
    </div>
    <p style="text-align: center; margin: 20px 0;">
      <a href="https://wa.me/919009999434?text=${encodeURIComponent(`Hi Music Maestro! I just registered as ${isArtist ? 'an' : 'a'} ${roleLabel}. Username: ${user.username}`)}" style="display: inline-block; background: #25D366; color: #fff; padding: 12px 22px; border-radius: 8px; text-decoration: none; font-weight: bold;">Chat with us on WhatsApp</a>
    </p>
    <p style="font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #1f2633; padding-top: 12px;">
      📞 +91 9009999434 • ✉️ musicmaestroevent@gmail.com<br>Warm regards, <strong>Team Music Maestro</strong>
    </p>`);

  const transporter = getTransporter();
  if (!transporter) {
    console.log('[EmailService]: SMTP not configured. Registration email simulation:');
    console.log(`  -> Admin (${adminEmail}): "New ${roleLabel} Registration: ${fullName}"`);
    console.log(`  -> User (${user.email}): "Welcome to Music Maestro, ${user.firstName || user.username}!"`);
    return { simulated: true };
  }

  const results = await Promise.allSettled([
    transporter.sendMail({
      from: `"Music Maestro Platform" <${senderEmail}>`,
      to: adminEmail,
      replyTo: user.email,
      subject: `New ${roleLabel} Registration: ${fullName}`,
      text: `New ${roleLabel} registration\nName: ${fullName}\nUsername: ${user.username}\nEmail: ${user.email}\nWhatsApp: ${phone}\nTime: ${time} IST`,
      html: adminHtml,
    }),
    transporter.sendMail({
      from: `"Music Maestro" <${senderEmail}>`,
      to: user.email,
      subject: `Welcome to Music Maestro, ${user.firstName || user.username}!`,
      text: `Dear ${user.firstName || user.username},\n\nWelcome to Music Maestro! Your ${roleLabel} account has been created successfully.\n\nChat with us on WhatsApp: https://wa.me/919009999434\n\nTeam Music Maestro`,
      html: userHtml,
    }),
  ]);

  results.forEach((r, i) => {
    const who = i === 0 ? `admin (${adminEmail})` : `user (${user.email})`;
    if (r.status === 'fulfilled') console.log(`[EmailService]: Registration email sent to ${who}`);
    else console.error(`[EmailService]: Registration email to ${who} failed:`, r.reason?.message);
  });
  return { success: results.some((r) => r.status === 'fulfilled') };
};

// ---------------------------------------------------------------------------
// Booking / event inquiry emails
// ---------------------------------------------------------------------------
const OWNER_WHATSAPP = process.env.OWNER_WHATSAPP_NUMBER || '919009999434';

const escapeHtml = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const emailShell = (subtitle, inner) => `
  <div style="font-family: Arial, sans-serif; background-color: #0b0e14; color: #f1f5f9; padding: 24px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(244,165,28,0.25);">
    <div style="text-align: center; border-bottom: 1px solid #1f2633; padding-bottom: 16px; margin-bottom: 20px;">
      <h1 style="color: #f4a51c; margin: 0; font-size: 24px; letter-spacing: 1px;">MUSIC MAESTRO</h1>
      <p style="color: #94a3b8; font-size: 13px; margin: 4px 0 0;">${subtitle}</p>
    </div>
    ${inner}
    <div style="text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #1f2633; padding-top: 12px; margin-top: 20px;">
      📞 +91 9009999434 • ✉️ musicmaestroevent@gmail.com<br>Music Maestro • Mumbai, India
    </div>
  </div>`;

const detailRows = (rows) =>
  `<div style="background-color: #121622; padding: 16px 18px; border-radius: 8px; border: 1px solid #1f2633;">${rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<p style="margin: 6px 0; font-size: 14px;"><strong style="color: #94a3b8;">${k}:</strong> <span style="color: #ffffff;">${v}</span></p>`
    )
    .join('')}</div>`;

const waButton = (url, label) =>
  `<p style="text-align: center; margin: 20px 0 0;"><a href="${url}" style="display: inline-block; background: #25D366; color: #fff; padding: 12px 22px; border-radius: 8px; text-decoration: none; font-weight: bold;">${label}</a></p>`;

/**
 * Event inquiry / artist booking emails:
 *  1. Owner alert (musicmaestroevent@gmail.com) with all event details and a
 *     one-tap "Reply on WhatsApp" link that opens a pre-written confirmation
 *     to the client's number (free - sent from the owner's WhatsApp app).
 *  2. Client confirmation with reference number + WhatsApp button to the owner.
 * Never throws.
 */
const sendInquiryEmails = async (inquiry) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'musicmaestroevent@gmail.com';
  const senderEmail = process.env.EMAIL_USER || adminEmail;
  const ref = inquiry.referenceId;
  const artist = inquiry.artistName || 'General Entertainment Query';
  const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const e = escapeHtml;

  const rows = [
    ['Reference', `<strong style="color:#f4a51c;">${e(ref)}</strong>`],
    ['Artist', e(artist)],
    ['Category', inquiry.category && inquiry.category !== 'Any' ? e(inquiry.category) : ''],
    ['Event Type', e(inquiry.eventType)],
    ['Event Date', e(inquiry.eventDate)],
    ['Location', e(inquiry.city)],
    ['Guests', e(inquiry.guestCount)],
    ['Budget', e(inquiry.budget)],
  ];

  const clientWaText =
    `Hi ${inquiry.name}, this is Music Maestro 🎵\n` +
    `We have received your booking inquiry (Ref: ${ref}) for ${artist}` +
    ` - ${inquiry.eventType} in ${inquiry.city}.\n` +
    `Our artist coordinator will share availability and pricing shortly.`;
  const clientWaLink = inquiry.whatsapp ? `https://wa.me/${inquiry.whatsapp}?text=${encodeURIComponent(clientWaText)}` : null;
  const ownerWaLink = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(
    `Hi Music Maestro! Regarding my booking inquiry ${ref} for ${artist}.`
  )}`;

  const adminHtml = emailShell(
    'New Booking Inquiry',
    `<h2 style="color: #f4a51c; font-size: 18px; margin: 0 0 14px;">🎤 New inquiry from ${e(inquiry.name)}</h2>
     ${detailRows([
       ['Client', e(inquiry.name)],
       ['Email', `<a href="mailto:${e(inquiry.email)}" style="color:#f4a51c;">${e(inquiry.email)}</a>`],
       ['Phone', `<a href="tel:${e(inquiry.phone)}" style="color:#f4a51c;">${e(inquiry.phone)}</a>`],
       ...rows,
       ['Submitted', `${time} IST`],
     ])}
     ${
       inquiry.notes
         ? `<div style="background-color: #121622; padding: 14px 18px; border-radius: 8px; border: 1px solid #1f2633; margin-top: 14px;"><p style="margin: 0 0 6px; color: #f4a51c; font-weight: bold;">Client notes</p><p style="margin: 0; white-space: pre-wrap; color: #e2e8f0; font-size: 14px;">${e(inquiry.notes)}</p></div>`
         : ''
     }
     ${clientWaLink ? waButton(clientWaLink, `Reply to ${e(inquiry.name)} on WhatsApp`) : ''}`
  );

  const clientHtml = emailShell(
    'Booking Inquiry Received',
    `<p style="font-size: 15px; color: #ffffff;">Dear <strong>${e(inquiry.name)}</strong>,</p>
     <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
       Thank you for choosing <strong>Music Maestro</strong>! We have received your booking inquiry.
       Our artist coordinator will contact you within <strong>24 hours</strong> with availability, pricing and technical rider details.
     </p>
     ${detailRows(rows)}
     ${waButton(ownerWaLink, 'Chat with us on WhatsApp')}`
  );

  const transporter = getTransporter();
  if (!transporter) {
    console.log('[EmailService]: SMTP not configured. Inquiry email simulation:');
    console.log(`  -> Owner (${adminEmail}): "New Booking Inquiry ${ref}: ${inquiry.name} - ${artist}"`);
    console.log(`  -> Client (${inquiry.email}): "We received your booking inquiry (${ref})"`);
    return { simulated: true };
  }

  const results = await Promise.allSettled([
    transporter.sendMail({
      from: `"Music Maestro Platform" <${senderEmail}>`,
      to: adminEmail,
      replyTo: inquiry.email,
      subject: `New Booking Inquiry ${ref}: ${inquiry.name} - ${artist}`,
      text: `New booking inquiry ${ref}\nClient: ${inquiry.name}\nEmail: ${inquiry.email}\nPhone: ${inquiry.phone}\nArtist: ${artist}\nEvent: ${inquiry.eventType} on ${inquiry.eventDate}\nLocation: ${inquiry.city}\nGuests: ${inquiry.guestCount}\nNotes: ${inquiry.notes || '-'}`,
      html: adminHtml,
    }),
    transporter.sendMail({
      from: `"Music Maestro" <${senderEmail}>`,
      to: inquiry.email,
      subject: `We received your booking inquiry (${ref})`,
      text: `Dear ${inquiry.name},\n\nThank you for your inquiry (Ref: ${ref}) for ${artist}. Our coordinator will contact you within 24 hours.\n\nWhatsApp us: https://wa.me/${OWNER_WHATSAPP}\n\nTeam Music Maestro`,
      html: clientHtml,
    }),
  ]);

  results.forEach((r, i) => {
    const who = i === 0 ? `owner (${adminEmail})` : `client (${inquiry.email})`;
    if (r.status === 'fulfilled') console.log(`[EmailService]: Inquiry ${ref} email sent to ${who}`);
    else console.error(`[EmailService]: Inquiry ${ref} email to ${who} failed:`, r.reason?.message);
  });
  return { success: results.some((r) => r.status === 'fulfilled') };
};

module.exports = {
  sendContactEmails,
  sendRegistrationEmails,
  sendInquiryEmails,
};

