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
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
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

  // Close menus on route or query change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileCategoriesOpen(false);
    setArtistBankDropdownOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname, location.search]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const megaMenuCategories = [
    {
      group: 'Solo Performer',
      icon: Mic2,
      items: [
        { label: 'Singer Guitarist', link: '/artists?subcategory=Singer+Guitarist' },
        { label: 'Singer Keyboardist', link: '/artists?subcategory=Singer+Keyboardist' },
        { label: 'Flute', link: '/artists?subcategory=Flute' },
        { label: 'Jal Tarang', link: '/artists?subcategory=Jal+Tarang' },
        { label: 'Saxophone', link: '/artists?subcategory=Saxophone' },
        { label: 'Pianist', link: '/artists?subcategory=Pianist' },
        { label: 'Violinist', link: '/artists?subcategory=Violinist' },
        { label: 'Karaoke', link: '/artists?subcategory=Karaoke' },
      ],
    },
    {
      group: 'Live Bands',
      icon: Music,
      items: [
        { label: 'Celebrity Singer/Bands', link: '/artists?subcategory=Celebrity+Singer%2FBands' },
        { label: 'Bollywood', link: '/artists?subcategory=Bollywood' },
        { label: 'Sufi/Qawwali', link: '/artists?subcategory=Sufi+%26+Qawwali' },
        { label: 'Western', link: '/artists?subcategory=Western' },
        { label: 'Classical', link: '/artists?subcategory=Classical' },
        { label: 'Devotional/Bhajan', link: '/artists?subcategory=Devotional' },
        { label: 'DJ Based', link: '/artists?subcategory=DJ+Based' },
        { label: 'Folk/Regional', link: '/artists?subcategory=Folk%2FRegional' },
        { label: 'Instrumental', link: '/artists?subcategory=Instrumental' },
        { label: 'Musical Pheras/ Divine Chants', link: '/artists?subcategory=Musical+Pheras' },
      ],
    },
    {
      group: 'DJ Services',
      icon: Disc3,
      items: [
        { label: 'DJ', link: '/artists?subcategory=DJ' },
        { label: 'VDJ', link: '/artists?subcategory=VDJ' },
        { label: 'DJ Percussions', link: '/artists?subcategory=DJ+Percussions' },
      ],
    },
    {
      group: 'Others',
      icon: Sparkles,
      items: [
        { label: 'Anchors/Emcee', link: '/artists?subcategory=Anchors%2FEmcee' },
        { label: 'Stand Up Comedians', link: '/artists?subcategory=Stand+Up+Comedians' },
        { label: 'Illusionist/Magicians', link: '/artists?subcategory=Illusionist' },
        { label: 'Motivational Speakers', link: '/artists?subcategory=Motivational+Speakers' },
        { label: 'International Artist', link: '/artists?subcategory=Violinist' },
        { label: 'Special Acts & Dancers', link: '/artists?category=Others' },
      ],
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-16 sm:h-20 flex items-center transition-all duration-300 ${
          isScrolled
            ? 'bg-[#05091e]/98 backdrop-blur-md shadow-2xl border-b border-white/10'
            : 'bg-[#05091e]/90 backdrop-blur-md border-b border-white/10'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            {/* Music Maestro Logo */}
            <Link to="/" className="flex items-center group flex-shrink-0">
              <img
                src="/music-maestro-logo.png"
                alt="Music Maestro — Art of Performance & Celebration"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] group-hover:scale-105 transition-transform duration-200"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'px-3.5 xl:px-5 py-2 text-xs xl:text-sm font-semibold rounded-full bg-[#f4a51c] text-white shadow-md transition whitespace-nowrap'
                    : 'px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium text-gray-200 hover:text-white transition whitespace-nowrap'
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? 'px-3.5 xl:px-5 py-2 text-xs xl:text-sm font-semibold rounded-full bg-[#f4a51c] text-white shadow-md transition whitespace-nowrap'
                    : 'px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium text-gray-200 hover:text-white transition whitespace-nowrap'
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
                    `px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium transition flex items-center gap-1.5 whitespace-nowrap ${
                      isActive
                        ? 'px-3.5 xl:px-5 py-2 font-semibold rounded-full bg-[#f4a51c] text-white shadow-md'
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
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[680px] xl:w-[720px] max-w-[calc(100vw-2rem)] animate-fadeIn">
                    <div className="bg-[#121622]/98 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-2xl">
                      <div className="grid grid-cols-4 gap-6">
                        {megaMenuCategories.map((catGroup, idx) => {
                          const IconComp = catGroup.icon;
                          return (
                            <div key={idx} className="space-y-3">
                              <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                                <IconComp className="w-4 h-4 text-wom-gold flex-shrink-0" />
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
                    ? 'px-3.5 xl:px-5 py-2 text-xs xl:text-sm font-semibold rounded-full bg-[#f4a51c] text-white shadow-md transition whitespace-nowrap'
                    : 'px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium text-gray-200 hover:text-white transition whitespace-nowrap'
                }
              >
                Contact Us
              </NavLink>

              <NavLink
                to="/add-listing"
                className={({ isActive }) =>
                  isActive
                    ? 'px-3.5 xl:px-5 py-2 text-xs xl:text-sm font-semibold rounded-full bg-[#f4a51c] text-white shadow-md transition whitespace-nowrap'
                    : 'px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium text-gray-200 hover:text-white transition whitespace-nowrap'
                }
              >
                I&apos;m an artist
              </NavLink>

              <NavLink
                to="/event-inquiry"
                className={({ isActive }) =>
                  isActive
                    ? 'px-3.5 xl:px-5 py-2 text-xs xl:text-sm font-semibold rounded-full bg-[#f4a51c] text-white shadow-md transition whitespace-nowrap'
                    : 'px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium text-gray-200 hover:text-white transition whitespace-nowrap'
                }
              >
                Event Inquiry
              </NavLink>
            </nav>

            {/* Right Side Desktop: Sign In Pill Button */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 py-1.5 px-3.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-sm text-white transition hover:bg-white/20 whitespace-nowrap"
                  >
                    <div className="w-6 h-6 rounded-full bg-wom-gold text-black flex items-center justify-center font-bold text-xs">
                      {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="font-medium text-xs max-w-[110px] truncate">{user?.username}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#131822] border border-white/10 rounded-2xl shadow-2xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-white/10 text-xs text-gray-400">
                        Signed in as <strong className="text-white block truncate">{user?.email}</strong>
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
                  className="bg-white hover:bg-gray-100 text-gray-900 px-4 xl:px-5 py-2 rounded-full font-medium text-xs xl:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap"
                >
                  <LogIn className="w-4 h-4 text-gray-700" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Right Controls: Single-Row Sign In + Hamburger Trigger (No 2nd row overlap) */}
            <div className="lg:hidden flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
              {!isAuthenticated ? (
                <button
                  onClick={() => openAuthModal('login', 'client')}
                  className="bg-white hover:bg-gray-100 text-gray-900 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition whitespace-nowrap"
                >
                  <LogIn className="w-3.5 h-3.5 text-gray-700" />
                  <span>Sign In</span>
                </button>
              ) : (
                <Link
                  to="/add-listing"
                  className="bg-white hover:bg-gray-100 text-gray-900 px-3 py-1.5 rounded-full font-medium text-xs flex items-center gap-1.5 shadow-md transition max-w-[130px]"
                  title={user?.username}
                >
                  <span className="w-5 h-5 rounded-full bg-wom-gold text-black flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                  <span className="truncate">{user?.username}</span>
                </Link>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#222c4a] hover:bg-[#2c385c] text-white flex items-center justify-center shadow-md transition flex-shrink-0"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/95 backdrop-blur-xl flex flex-col overflow-y-auto animate-fadeIn">
          <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md flex items-center justify-between px-5 py-4 border-b border-white/10">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
              <img
                src="/music-maestro-logo.png"
                alt="Music Maestro"
                className="h-11 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-2 px-5 py-5 text-base font-semibold flex-1">
            <NavLink
              to="/"
              end
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl transition flex items-center justify-between ${
                  isActive
                    ? 'bg-wom-gold text-black font-bold shadow-gold-sm'
                    : 'text-gray-200 hover:bg-white/5'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl transition flex items-center justify-between ${
                  isActive
                    ? 'bg-wom-gold text-black font-bold shadow-gold-sm'
                    : 'text-gray-200 hover:bg-white/5'
                }`
              }
            >
              About Us
            </NavLink>

            {/* Mobile Artist Bank with Expandable Categories */}
            <div className="rounded-xl overflow-hidden border border-transparent">
              <div className="flex items-center">
                <NavLink
                  to="/artists"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex-1 px-4 py-3 rounded-l-xl transition ${
                      isActive
                        ? 'bg-wom-gold text-black font-bold'
                        : 'text-gray-200 hover:bg-white/5'
                    }`
                  }
                >
                  Artist Bank
                </NavLink>
                <button
                  type="button"
                  onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                  className="px-4 py-3 text-gray-300 hover:text-wom-gold hover:bg-white/5 rounded-r-xl transition flex items-center justify-center"
                  aria-label="Toggle Artist Categories"
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      mobileCategoriesOpen ? 'rotate-180 text-wom-gold' : ''
                    }`}
                  />
                </button>
              </div>

              {mobileCategoriesOpen && (
                <div className="mt-1 mb-2 mx-2 p-4 rounded-xl bg-[#121622] border border-white/10 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {megaMenuCategories.map((catGroup, idx) => {
                      const IconComp = catGroup.icon;
                      return (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center gap-1.5 text-wom-gold text-xs font-bold uppercase tracking-wider border-b border-white/10 pb-1.5">
                            <IconComp className="w-3.5 h-3.5" />
                            <span>{catGroup.group}</span>
                          </div>
                          <ul className="grid grid-cols-2 sm:grid-cols-1 gap-1.5 text-xs text-gray-300 font-normal">
                            {catGroup.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <Link
                                  to={item.link}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block py-1 hover:text-wom-gold transition truncate"
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
                  <Link
                    to="/artists"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center py-2 px-3 bg-wom-gold/15 border border-wom-gold/30 rounded-lg text-xs font-bold text-wom-gold"
                  >
                    Browse All 500+ Artists &rarr;
                  </Link>
                </div>
              )}
            </div>

            <NavLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl transition flex items-center justify-between ${
                  isActive
                    ? 'bg-wom-gold text-black font-bold shadow-gold-sm'
                    : 'text-gray-200 hover:bg-white/5'
                }`
              }
            >
              Contact Us
            </NavLink>

            <NavLink
              to="/add-listing"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl transition flex items-center justify-between ${
                  isActive
                    ? 'bg-wom-gold text-black font-bold shadow-gold-sm'
                    : 'text-gray-200 hover:bg-white/5'
                }`
              }
            >
              I'm an artist
            </NavLink>

            <NavLink
              to="/event-inquiry"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl transition flex items-center justify-between ${
                  isActive
                    ? 'bg-wom-gold text-black font-bold shadow-gold-sm'
                    : 'text-gray-200 hover:bg-white/5'
                }`
              }
            >
              Event Inquiry
            </NavLink>
          </div>

          <div className="mt-auto p-5 border-t border-white/10 bg-black/80">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-9 h-9 rounded-full bg-wom-gold text-black flex items-center justify-center font-bold text-sm">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white truncate">{user?.username}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-red-600/20 text-red-400 border border-red-500/30 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login', 'client');
                }}
                className="w-full py-3.5 bg-white text-black rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <LogIn className="w-4 h-4" />
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
