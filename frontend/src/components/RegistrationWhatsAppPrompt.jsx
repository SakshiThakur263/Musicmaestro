import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, MessageCircle, X } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

/**
 * Free WhatsApp confirmation (no Meta API / no cost):
 * After registration the user taps one button which opens WhatsApp with a
 * pre-filled message to the Music Maestro number. The team instantly gets the
 * new member's details, and the WhatsApp Business app's free "Greeting
 * message" auto-replies to the user with a welcome.
 */
const RegistrationWhatsAppPrompt = () => {
  const { welcomeUser, dismissWelcome } = useAuth();
  const [opened, setOpened] = useState(false);

  if (!welcomeUser) return null;

  const isArtist = welcomeUser.role === 'artist';
  const roleLabel = isArtist ? 'Artist' : 'Client';
  const fullName =
    [welcomeUser.firstName, welcomeUser.lastName].filter(Boolean).join(' ') || welcomeUser.username;

  const whatsappUrl = buildWhatsAppLink([
    `Hi Music Maestro! 👋`,
    `I just registered as ${isArtist ? 'an' : 'a'} *${roleLabel}* on musicmaestro.in.`,
    ``,
    `Name: ${fullName}`,
    `Username: ${welcomeUser.username}`,
    `Email: ${welcomeUser.email}`,
    welcomeUser.phone ? `Phone: +${welcomeUser.phone}` : null,
    ``,
    isArtist
      ? `Please help me set up my artist profile.`
      : `I'd like help booking artists for my event.`,
  ]);

  const handleClose = () => {
    setOpened(false);
    dismissWelcome();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wa-confirm-title"
    >
      <div className="relative w-full max-w-md bg-[#131822] border border-wom-darkBorder rounded-2xl shadow-2xl p-6 sm:p-8 text-center">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-3 right-3 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto rounded-full bg-green-500/15 border border-green-500/40 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-9 h-9 text-green-400" />
        </div>

        <h2 id="wa-confirm-title" className="text-xl sm:text-2xl font-bold font-raleway text-white">
          Welcome, {welcomeUser.firstName || welcomeUser.username}!
        </h2>
        <p className="mt-2 text-sm text-gray-300 leading-relaxed">
          Your <span className="text-wom-gold font-semibold">{roleLabel}</span> account is ready.
          {opened
            ? ' Just tap Send in WhatsApp to complete your confirmation.'
            : ' Confirm on WhatsApp to get your welcome message and talk directly with our team.'}
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpened(true)}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-sm shadow-lg transition"
        >
          <MessageCircle className="w-5 h-5" />
          {opened ? 'Open WhatsApp again' : 'Confirm on WhatsApp'}
        </a>

        <button
          type="button"
          onClick={handleClose}
          className="mt-3 w-full py-2.5 text-xs font-semibold text-gray-400 hover:text-white transition"
        >
          {opened ? 'Done' : 'Skip for now'}
        </button>

        <p className="mt-2 text-[11px] text-gray-500">
          Opens WhatsApp chat with Music Maestro (+91 90099 99434)
        </p>
      </div>
    </div>
  );
};

export default RegistrationWhatsAppPrompt;

