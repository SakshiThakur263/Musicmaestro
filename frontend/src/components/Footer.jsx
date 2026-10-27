import React from 'react';
import { Link } from 'react-router-dom';

const SocialIcon = ({ path, label, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 rounded-full bg-[#f4a51c] hover:bg-[#e09414] text-white flex items-center justify-center transition shadow-md hover:scale-105"
    aria-label={label}
  >
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      {path}
    </svg>
  </a>
);

const Footer = () => {
  return (
    <footer className="relative bg-[#0b0e1a] border-t border-white/20 text-white text-sm overflow-hidden">
      {/* Glowing Neon Wave & Bokeh Background */}
      <div className="relative overflow-hidden">
        {/* Dark base + glowing radial bokeh spots */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 18% 28%, rgba(59, 130, 246, 0.28) 0%, transparent 18%), ' +
              'radial-gradient(circle at 33% 18%, rgba(96, 165, 250, 0.35) 0%, transparent 8%), ' +
              'radial-gradient(circle at 51% 22%, rgba(59, 130, 246, 0.3) 0%, transparent 7%), ' +
              'radial-gradient(circle at 65% 16%, rgba(96, 165, 250, 0.32) 0%, transparent 8%), ' +
              'radial-gradient(circle at 82% 65%, rgba(59, 130, 246, 0.25) 0%, transparent 15%), ' +
              'linear-gradient(180deg, #0d101d 0%, #101528 55%, #12132a 100%)',
          }}
        />

        {/* Neon Ribbon Waves SVG at Bottom of Main Footer */}
        <svg
          className="absolute bottom-0 left-0 w-full h-48 sm:h-64 pointer-events-none opacity-90"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveMagenta" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#a855f7" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="wavePurple" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.65" />
              <stop offset="45%" stopColor="#7e22ce" stopOpacity="0.85" />
              <stop offset="80%" stopColor="#06b6d4" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#db2777" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="waveCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#2563eb" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#0ea5e9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.75" />
            </linearGradient>
          </defs>

          {/* Back glowing wave */}
          <path
            fill="url(#waveCyan)"
            d="M0,192 C220,90 420,280 680,160 C940,40 1120,260 1440,120 L1440,320 L0,320 Z"
          />
          {/* Mid purple/magenta wave */}
          <path
            fill="url(#wavePurple)"
            d="M0,128 C180,260 390,40 640,190 C890,340 1140,80 1440,220 L1440,320 L0,320 Z"
          />
          {/* Front bright ribbon wave */}
          <path
            fill="url(#waveMagenta)"
            d="M0,240 C160,120 340,300 560,210 C780,120 1050,310 1440,160 L1440,320 L0,320 Z"
          />
        </svg>

        {/* Main 4-Column Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
            {/* Col 1: Logo & Legal Disclaimer (5 cols on desktop) */}
            <div className="lg:col-span-5 space-y-4">
              <Link to="/" className="inline-block">
                <img
                  src="/music-maestro-logo.png"
                  alt="Music Maestro — Art of Performance & Celebration"
                  className="h-14 w-auto object-contain rounded-lg"
                />
              </Link>
              <p className="text-xs sm:text-[13px] leading-relaxed text-gray-100 font-normal pr-0 lg:pr-6">
                Having a listing or profile on this website does not mean the talent is affiliated with or endorsed by us. We are not the agency or management for any celebrity or artist featured here. Music Maestro is solely a booking agency for paid events. We do not process requests for donations of time, media interviews, or provide celebrity contact information.
              </p>
            </div>

            {/* Col 2: Home Menu (2 cols on desktop) */}
            <div className="lg:col-span-2">
              <h4 className="text-base sm:text-lg font-medium text-white mb-4">
                Home Menu
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-gray-200">
                <li>
                  <Link to="/" className="hover:text-[#f4a51c] transition block">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[#f4a51c] transition block">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/artists" className="hover:text-[#f4a51c] transition block">
                    Artist Bank
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-[#f4a51c] transition block">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/add-listing" className="hover:text-[#f4a51c] transition block">
                    I'm an artist
                  </Link>
                </li>
                <li>
                  <Link to="/event-inquiry" className="hover:text-[#f4a51c] transition block">
                    Event Inquiry
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Hire Artists (2 cols on desktop) */}
            <div className="lg:col-span-2">
              <h4 className="text-base sm:text-lg font-medium text-white mb-4">
                Hire Artists
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-gray-200">
                <li>
                  <Link to="/artists?category=Live+Bands" className="hover:text-[#f4a51c] transition block">
                    Live Bands
                  </Link>
                </li>
                <li>
                  <Link to="/artists?category=Solo+Performer" className="hover:text-[#f4a51c] transition block">
                    Solo Performers
                  </Link>
                </li>
                <li>
                  <Link to="/artists?category=DJ+Services" className="hover:text-[#f4a51c] transition block">
                    DJ Services
                  </Link>
                </li>
                <li>
                  <Link to="/artists?subcategory=Sufi+%26+Qawwali" className="hover:text-[#f4a51c] transition block">
                    Sufi & Qawwali
                  </Link>
                </li>
                <li>
                  <Link to="/artists?subcategory=Instrumentalists" className="hover:text-[#f4a51c] transition block">
                    Instrumentalists
                  </Link>
                </li>
                <li>
                  <Link to="/artists?subcategory=Anchors%2FEmcee" className="hover:text-[#f4a51c] transition block">
                    Anchors / Emcee
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact Us (3 cols on desktop) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-base sm:text-lg font-medium text-white mb-4">
                Contact Us
              </h4>
              <p className="text-xs sm:text-[13px] leading-relaxed text-white">
                202/19, Oshiwara Andheri West, Mumbai
              </p>
              <div className="pt-1">
                <a
                  href="tel:+919009999434"
                  className="text-xs sm:text-[13px] text-[#f4a51c] hover:underline block"
                >
                  +91 9009999434
                </a>
              </div>
              <div>
                <a
                  href="mailto:musicmaestroevent@gmail.com"
                  className="text-xs sm:text-[13px] text-[#f4a51c] hover:underline block break-all"
                >
                  musicmaestroevent@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Gold Social Icons Bar */}
      <div className="relative z-10 bg-[#0b0e1a] border-t border-white/25 py-5 pb-20 sm:pb-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] text-white text-center sm:text-left">
          <p>
            Copyright © 2026 Music Maestro | Website Designed by{' '}
            <span className="text-[#f4a51c]">Music Maestro Media</span>
          </p>

          <div className="flex items-center gap-2.5 sm:pr-12">
            <SocialIcon
              href="https://www.facebook.com/people/World-Of-Musicians/61553074793621/"
              label="Facebook"
              path={
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              }
            />
            <SocialIcon
              href="https://www.instagram.com/connectworldofmusicians/"
              label="Instagram"
              path={
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              }
            />
            <SocialIcon
              href="https://x.com/worldofmusicias"
              label="X"
              path={
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              }
            />
            <SocialIcon
              href="https://www.youtube.com/@WorldofMusicians1903"
              label="YouTube"
              path={
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              }
            />
            <SocialIcon
              href="https://www.linkedin.com/company/world-of-musicians/"
              label="LinkedIn"
              path={
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              }
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
