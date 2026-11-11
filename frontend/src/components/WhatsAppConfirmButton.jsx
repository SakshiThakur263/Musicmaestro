import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

/**
 * Green "send details on WhatsApp" button shown on form success screens.
 * Opens WhatsApp with a pre-filled message to the Music Maestro number, so the
 * owner instantly receives the client's details on WhatsApp - free of cost.
 */
const WhatsAppConfirmButton = ({ message, label = 'Send details on WhatsApp', className = '' }) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className={`space-y-1.5 ${className}`}>
      <a
        href={buildWhatsAppLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setOpened(true)}
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-sm shadow-lg transition"
      >
        <MessageCircle className="w-5 h-5" />
        {opened ? 'Open WhatsApp again' : label}
      </a>
      <p className="text-[11px] text-gray-400 text-center">
        {opened
          ? 'Tap Send in WhatsApp to share your details with our team.'
          : 'Get a faster response from our team on WhatsApp (+91 90099 99434).'}
      </p>
    </div>
  );
};

export default WhatsAppConfirmButton;

