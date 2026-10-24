import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  Music,
  Mic2,
  Disc3,
  Sparkles,
  LogIn,
} from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [artistBankDropdownOpen, setArtistBankDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setArtistBankDropdownOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const megaMenuCategories = [
    {
      group: 'Solo Performer',
      icon: Mic2,
      items: [
        { label: 'Singer Guitarist', link: '/artists?subcategory=Singer+Guitarist' },
        { label: 'Singer Keyboardist', link: '/artists?subcategory=Singer+Keyboardist' },
        { label: 'Flute', link: '/artists?subcategory=Flute' },
        { label: 'Saxophone', link: '/artists?subcategory=Saxophone' },
        { label: 'Violinist', link: '/artists?subcategory=Violinist' },
        { label: 'Pianist', link: '/artists?subcategory=Pianist' },
      ],
    },
    {
      group: 'Live Bands',
      icon: Music,
      items: [
        { label: 'Celebrity Singer/Bands', link: '/artists?subcategory=Celebrity+Singer%2FBands' },
        { label: 'Bollywood', link: '/artists?subcategory=Bollywood' },
        { label: 'Sufi & Qawwali', link: '/artists?subcategory=Sufi+%26+Qawwali' },
        { label: 'Western Rock/Pop', link: '/artists?subcategory=Western' },
        { label: 'Folk & Regional', link: '/artists?subcategory=Folk%2FRegional' },
        { label: 'Musical Pheras', link: '/artists?subcategory=Musical+Pheras%2F+Divine+Chants' },
      ],
    },
    {
      group: 'DJ Services',
      icon: Disc3,
      items: [
        { label: 'Club & Wedding DJ', link: '/artists?category=DJ+Services' },
        { label: 'DJ Percussions', link: '/artists?subcategory=DJ+Percussions' },
        { label: 'VDJ Visuals', link: '/artists?subcategory=VDJ' },
      ],
    },
    {
      group: 'Others / Hosts',
      icon: Sparkles,
      items: [
        { label: 'Anchors / Emcee', link: '/artists?subcategory=Anchors%2FEmcee' },
        { label: 'Stand Up Comedians', link: '/artists?subcategory=Stand+Up+Comedians' },
        { label: 'Illusionist & Magicians', link: '/artists?subcategory=Illusionist%2FMagicians' },
        { label: 'Motivational Speakers', link: '/artists?subcategory=Motivational+Speakers' },
      ],
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md shadow-2xl border-b border-white/10 py-3'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo matching WOM Reference Screenshot */}
            <Link to="/" className="flex flex-col items-center group -space-y-1">
              <div className="flex items-center tracking-tight font-black select-none font-raleway text-3xl md:text-4xl">
                {/* W in Golden Yellow */}
                <span className="text-[#f4a51c] drop-shadow-[0_2px_8px_rgba(244,165,28,0.6)] group-hover:scale-105 transition-transform">
                  W
                </span>

                {/* O as Artistic Treble Clef in Cyan with musical notes */}
                <span className="relative mx-1 inline-flex items-center justify-center">
                  <svg
                    className="w-8 h-8 md:w-9 md:h-9 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C11.4 2 11 2.5 11 3.2V13.1C10.4 12.7 9.7 12.5 9 12.5C7.3 12.5 6 13.8 6 15.5C6 17.2 7.3 18.5 9 18.5C10.7 18.5 12 17.2 12 15.5V6.5L18 5V11.1C17.4 10.7 16.7 10.5 16 10.5C14.3 10.5 13 11.8 13 13.5C13 15.2 14.3 16.5 16 16.5C17.7 16.5 19 15.2 19 13.5V3.5C19 2.7 18.3 2.1 17.5 2.2L12 3.2V2Z" />
                  </svg>
                </span>

                {/* M in Magenta/Pink */}
                <span className="text-[#ec4899] drop-shadow-[0_2px_8px_rgba(236,72,153,0.6)] group-hover:scale-105 transition-transform">
                  M
                </span>
              </div>

              {/* Subtext: WORLD OF MUSICIANS */}
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300 drop-shadow-sm font-raleway">
                WORLD OF MUSICIANS
              </span>
            </Link>

            {/* Desktop Navigation matching Screenshot */}
            <nav className="hidden lg:flex items-center gap-1.5">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'px-5 py-2 text-sm font-semibold rounded-full bg-[#f4a51c] text-white shadow-md transition'
                    : 'px-4 py-2 text-sm font-medium text-gray-200 hover:text-white transition'
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? 'px-5 py-2 text-sm font-semibold rounded-full bg-[#f4a51c] text-white shadow-md transition'
                    : 'px-4 py-2 text-sm font-medium text-gray-200 hover:text-white transition'
                }
              >
                About Us
              </NavLink>

              {/* Artist Bank with Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setArtistBankDropdownOpen(true)}
                onMouseLeave={() => setArtistBankDropdownOpen(false)}
              >
                <NavLink
                  to="/artists"
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium transition flex items-center gap-1.5 ${
                      isActive
                        ? 'px-5 py-2 font-semibold rounded-full bg-[#f4a51c] text-white shadow-md'
                        : 'text-gray-200 hover:text-white'
                    }`
                  }
                >
                  Artist Bank
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      artistBankDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </NavLink>

                {/* Mega Menu Overlay */}
                {artistBankDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[720px] animate-fadeIn">
                    <div className="bg-[#121622]/98 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-2xl">
                      <div className="grid grid-cols-4 gap-6">
                        {megaMenuCategories.map((catGroup, idx) => {
                          const IconComp = catGroup.icon;
                          return (
                            <div key={idx} className="space-y-3">
                              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                                <IconComp className="w-4 h-4 text-wom-gold" />
                                <h4 className="text-xs font-bold uppercase tracking-wider text-wom-gold">
                                  {catGroup.group}
                                </h4>
                              </div>
                              <ul className="space-y-1.5 text-xs text-gray-300">
                                {catGroup.items.map((item, itemIdx) => (
                                  <li key={itemIdx}>
                                    <Link
                                      to={item.link}
                                      className="hover:text-wom-gold transition block py-1 hover:translate-x-1 duration-150"
                                      onClick={() => setArtistBankDropdownOpen(false)}
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between bg-black/40 -mx-6 -mb-6 p-4 rounded-b-2xl">
                        <span className="text-xs text-gray-400">
                          Looking for a custom celebrity or live fusion band?
                        </span>
                        <Link
                          to="/artists"
                          className="text-xs font-bold text-wom-gold hover:underline flex items-center gap-1"
                        >
                          Browse All 500+ Artists &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? 'px-5 py-2 text-sm font-semibold rounded-full bg-[#f4a51c] text-white shadow-md transition'
                    : 'px-4 py-2 text-sm font-medium text-gray-200 hover:text-white transition'
                }
              >
                Contact Us
              </NavLink>

              <NavLink
                to="/add-listing"
                className={({ isActive }) =>
                  isActive
                    ? 'px-5 py-2 text-sm font-semibold rounded-full bg-[#f4a51c] text-white shadow-md transition'
                    : 'px-4 py-2 text-sm font-medium text-gray-200 hover:text-white transition'
                }
              >
                I'm an artist
              </NavLink>

              <NavLink
                to="/event-inquiry"
                className={({ isActive }) =>
                  isActive
                    ? 'px-5 py-2 text-sm font-semibold rounded-full bg-[#f4a51c] text-white shadow-md transition'
                    : 'px-4 py-2 text-sm font-medium text-gray-200 hover:text-white transition'
                }
              >
                Event Inquiry
              </NavLink>
            </nav>

            {/* Right Side: Sign In Pill Button matching Screenshot */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 py-1.5 px-3.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-sm text-white transition hover:bg-white/20"
                  >
                    <div className="w-6 h-6 rounded-full bg-wom-gold text-black flex items-center justify-center font-bold text-xs">
                      {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="font-medium text-xs">{user?.username}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#131822] border border-white/10 rounded-2xl shadow-2xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-white/10 text-xs text-gray-400">
                        Signed in as <strong className="text-white block">{user?.email}</strong>
                      </div>
                      <Link
                        to="/add-listing"
                        className="block px-4 py-2 text-xs text-gray-300 hover:bg-white/5 hover:text-wom-gold transition"
                      >
                        Artist Dashboard
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal('login', 'client')}
                  className="bg-white hover:bg-gray-100 text-gray-900 px-5 py-2 rounded-full font-medium text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-102 active:scale-98"
                >
                  <LogIn className="w-4 h-4 text-gray-700" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Trigger */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-200 hover:text-white rounded-lg hover:bg-white/10 transition"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/95 backdrop-blur-xl flex flex-col p-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Link to="/" className="flex items-center gap-1 font-bold text-2xl text-white font-raleway">
              <span className="text-[#f4a51c]">W</span>
              <span className="text-cyan-400">O</span>
              <span className="text-[#ec4899]">M</span>
              <span className="text-[10px] text-cyan-300 tracking-wider ml-1">WORLD OF MUSICIANS</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-3 py-6 text-base font-semibold">
            <Link to="/" className="px-4 py-2 rounded-lg bg-wom-gold text-black font-bold">
              Home
            </Link>
            <Link to="/about" className="px-4 py-2 rounded-lg text-gray-200 hover:bg-white/5">
              About Us
            </Link>
            <Link to="/artists" className="px-4 py-2 rounded-lg text-gray-200 hover:bg-white/5">
              Artist Bank
            </Link>
            <Link to="/contact" className="px-4 py-2 rounded-lg text-gray-200 hover:bg-white/5">
              Contact Us
            </Link>
            <Link to="/add-listing" className="px-4 py-2 rounded-lg text-gray-200 hover:bg-white/5">
              I'm an artist
            </Link>
            <Link to="/event-inquiry" className="px-4 py-2 rounded-lg text-gray-200 hover:bg-white/5">
              Event Inquiry
            </Link>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10">
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="w-full py-3 bg-red-600/20 text-red-400 border border-red-500/30 rounded-xl font-bold text-sm"
              >
                Sign Out ({user?.username})
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login', 'client');
                }}
                className="w-full py-3 bg-white text-black rounded-full font-bold text-sm flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
