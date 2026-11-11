// Music Maestro business WhatsApp number (E.164 digits, no "+")
export const BUSINESS_WHATSAPP = '919009999434';

/**
 * Build a free WhatsApp click-to-chat link (https://wa.me) that opens a chat
 * with the Music Maestro number and a pre-filled message. No API / no cost.
 */
export const buildWhatsAppLink = (lines, number = BUSINESS_WHATSAPP) => {
  const text = (Array.isArray(lines) ? lines : [lines])
    .filter((line) => line !== null && line !== undefined && line !== false)
    .join('\n');
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};

/** Pre-filled message for an event inquiry / artist booking. */
export const inquiryWhatsAppMessage = ({
  reference,
  name,
  phone,
  email,
  artistName,
  eventType,
  eventDate,
  city,
  guestCount,
  budget,
  notes,
}) => [
  `Hi Music Maestro! 👋`,
  `I just submitted a booking inquiry on musicmaestro.in.`,
  ``,
  reference ? `Reference: ${reference}` : null,
  `Name: ${name}`,
  phone ? `Phone: ${phone}` : null,
  email ? `Email: ${email}` : null,
  artistName ? `Artist: ${artistName}` : null,
  eventType ? `Event: ${eventType}` : null,
  eventDate ? `Date: ${eventDate}` : null,
  city ? `Location: ${city}` : null,
  guestCount ? `Guests: ${guestCount}` : null,
  budget ? `Budget: ${budget}` : null,
  notes ? `Notes: ${notes}` : null,
  ``,
  `Please share availability and pricing.`,
];

