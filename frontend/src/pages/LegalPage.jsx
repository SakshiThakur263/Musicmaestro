import React from 'react';
import { Link } from 'react-router-dom';

const LegalPage = ({ type = 'privacy' }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="min-h-screen bg-[#181818] pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 text-white">
      <div className="max-w-4xl mx-auto bg-[#222222] border border-white/10 rounded-2xl p-6 sm:p-10 space-y-6 shadow-2xl">
        <h1 className="text-2xl sm:text-4xl font-extrabold font-raleway text-[#f4a51c]">
          {isPrivacy ? 'Privacy Policy' : 'Terms and Conditions'}
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          Welcome to Music Maestro. Having a listing or profile on this website does not mean the talent is affiliated with or endorsed by us. We are not the exclusive agency or management for any celebrity or artist featured here. Music Maestro is solely a booking agency for paid events. We do not process requests for donations of time, media interviews, or provide celebrity contact information.
        </p>
        <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
          <h2 className="text-lg font-bold text-white">1. Event Enquiries &amp; Bookings</h2>
          <p>
            When you submit an enquiry or register as a client or artist on Music Maestro, we collect your name, phone number, email address, and event details strictly for coordinating artist availability, technical riders, and performance contracts.
          </p>
          <h2 className="text-lg font-bold text-white">2. Contact &amp; Support</h2>
          <p>
            For any questions regarding bookings, artist listings, or privacy terms, contact our Mumbai office at <strong>202/19, Oshiwara Andheri West, Mumbai</strong>, call <a href="tel:+919009999434" className="text-[#f4a51c] underline">+91 9009999434</a>, or email <a href="mailto:musicmaestroevent@gmail.com" className="text-[#f4a51c] underline">musicmaestroevent@gmail.com</a>.
          </p>
        </div>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-block px-6 py-2.5 bg-[#f4a51c] hover:bg-[#e09414] text-white font-bold text-xs rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
