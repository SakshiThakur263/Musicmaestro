import React from 'react';
import { Link } from 'react-router-dom';
import { Music, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

const SocialIcon = ({ path, label, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 rounded-full bg-[#181f2c] hover:bg-wom-gold hover:text-black text-gray-300 flex items-center justify-center transition"
    aria-label={label}
  >
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      {path}
    </svg>
  </a>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07090e] border-t border-wom-darkBorder text-gray-400 text-sm">
      {/* Top Banner / Newsletter or Quick CTA */}
      <div className="border-b border-wom-darkBorder/60 bg-gradient-to-r from-black via-[#111622] to-black py-7 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">Elevate Your Vision With Music Maestro</h3>
            <p className="text-xs text-gray-400 mt-1">Book world-class artists, live bands, and DJs for your next landmark event.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto">
            <Link
              to="/event-inquiry"
              className="w-full sm:w-auto text-center px-6 py-2.5 bg-wom-gold hover:bg-wom-goldHover text-black font-bold text-xs rounded-lg transition shadow-gold"
            >
              Send Event Enquiry
            </Link>
            <Link
              to="/add-listing"
              className="w-full sm:w-auto text-center px-6 py-2.5 bg-[#181f2c] hover:bg-white/10 text-white border border-wom-darkBorder font-semibold text-xs rounded-lg transition"
            >
              List As An Artist
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Col 1: About & Legal Disclaimer from reference site */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/music-maestro-logo.png"
                alt="Music Maestro — Art of Performance & Celebration"
                className="h-14 w-auto object-contain rounded-lg border border-wom-gold/30 shadow-md"
              />
            </Link>
            <p className="text-xs leading-relaxed text-gray-400">
              Having a listing or profile on this website does not mean the talent is affiliated with or endorsed by us. We are not the exclusive agency or management for any celebrity or artist featured here. Music Maestro is solely a booking agency for paid events. We do not process requests for donations of time, media interviews, or provide celebrity contact information.
            </p>
          </div>

          {/* Col 2: Home Menu */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-wom-gold rounded-full"></span>
              Home Menu
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-wom-gold transition block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-wom-gold transition block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/artists" className="hover:text-wom-gold transition block">
                  Artist Bank & Directory
                </Link>
              </li>
              <li>
                <Link to="/add-listing" className="hover:text-wom-gold transition block">
                  I'm an Artist / Add Listing
                </Link>
              </li>
              <li>
                <Link to="/event-inquiry" className="hover:text-wom-gold transition block">
                  Corporate & Wedding Inquiry
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-wom-gold transition block">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hire Artists */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-wom-gold rounded-full"></span>
              Hire Artists
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/artists?category=Live+Bands" className="hover:text-wom-gold transition block">
                  Bollywood & Celebrity Live Bands
                </Link>
              </li>
              <li>
                <Link to="/artists?category=Solo+Performer" className="hover:text-wom-gold transition block">
                  Solo Singers & Acoustic Performers
                </Link>
              </li>
              <li>
                <Link to="/artists?category=DJ+Services" className="hover:text-wom-gold transition block">
                  Wedding & Club DJ Services
                </Link>
              </li>
              <li>
                <Link to="/artists?subcategory=Sufi+%26+Qawwali" className="hover:text-wom-gold transition block">
                  Sufi & Qawwali Nights
                </Link>
              </li>
              <li>
                <Link to="/artists?subcategory=Violinist" className="hover:text-wom-gold transition block">
                  Violinists & Instrumentalists
                </Link>
              </li>
              <li>
                <Link to="/artists?subcategory=Anchors%2FEmcee" className="hover:text-wom-gold transition block">
                  Celebrity Anchors & Corporate Emcees
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-wom-gold rounded-full"></span>
              Contact Us
            </h4>
            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-wom-gold flex-shrink-0 mt-0.5" />
              <span>Lotus Corporate Park, G wing, 801 Off Western Express Highway, Near Jai Coach, Mumbai, MH, 400063</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <Phone className="w-4 h-4 text-wom-gold flex-shrink-0" />
              <a href="tel:+919009999434" className="hover:text-white transition">
                +91 9009999434
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <Mail className="w-4 h-4 text-wom-gold flex-shrink-0" />
              <a href="mailto:musicmaestroevent@gmail.com" className="hover:text-white transition">
                musicmaestroevent@gmail.com
              </a>
            </div>

            <div className="pt-3">
              <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold block mb-2">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                <SocialIcon
                  href="https://www.facebook.com/people/World-Of-Musicians/61553074793621/"
                  label="Facebook"
                  path={<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>}
                />
                <SocialIcon
                  href="https://www.instagram.com/connectworldofmusicians/"
                  label="Instagram"
                  path={<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>}
                />
                <SocialIcon
                  href="https://x.com/worldofmusicias"
                  label="Twitter"
                  path={<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>}
                />
                <SocialIcon
                  href="https://www.youtube.com/@WorldofMusicians1903"
                  label="YouTube"
                  path={<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>}
                />
                <SocialIcon
                  href="https://www.linkedin.com/company/world-of-musicians/"
                  label="LinkedIn"
                  path={<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-12 pt-6 pb-12 sm:pb-0 border-t border-wom-darkBorder flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4 text-center md:text-left">
          <p>
            Copyright © 2026 Music Maestro | Art of Performance & Celebration
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-gray-400 hover:text-wom-gold transition"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
