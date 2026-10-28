import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Award,
  Users,
  Music,
  CheckCircle2,
  Globe2,
  HeartHandshake,
  ShieldCheck,
  ArrowRight,
  Compass,
  Target,
  Eye,
} from 'lucide-react';

const TRIBE_MEMBERS = [
  {
    name: 'Shylender Jindal',
    role: 'Managing Director & Co-Founder',
    image: '/about/SJ.png',
    fallbackImage: 'https://worldofmusicians.com/wp-content/uploads/2024/10/SJ.png',
    bio: 'A seasoned business professional with over two decades of experience in the Corporate Travel Industry and the owner and Managing Director at SKIL Events.',
  },
  {
    name: 'Yogendra Jain',
    role: 'Co-Founder & Head of Entertainment',
    image: '/about/YJ.jpg',
    fallbackImage: 'https://worldofmusicians.com/wp-content/uploads/2024/10/YJ.jpg',
    bio: 'An experienced industry leader with over a decade of expertise in event and entertainment management, coupled with a background as an artist. Passionate about empowering musicians, he spearheads our mission to connect artists with unforgettable events.',
  },
  {
    name: 'Darshna Jain',
    role: 'Co-Founder & Strategy Lead',
    image: '/about/DJ.jpg',
    fallbackImage: 'https://worldofmusicians.com/wp-content/uploads/2024/10/DJ.jpg',
    bio: 'A former Project Manager turned visionary leader, she brings a wealth of strategic insight to Music Maestro. Passionate about blending technology with creativity, she leads our vision to revolutionize the music industry, ensuring every artist finds their spotlight.',
  },
];

const INDUSTRY_LOGOS = [
  {
    id: 1,
    src: '/about/brand-1.png',
    fallback: 'https://worldofmusicians.com/wp-content/uploads/2024/07/1.png',
    alt: 'Industry Partner 1',
  },
  {
    id: 2,
    src: '/about/brand-2.png',
    fallback: 'https://worldofmusicians.com/wp-content/uploads/2024/07/2.png',
    alt: 'Industry Partner 2',
  },
  {
    id: 3,
    src: '/about/brand-3.png',
    fallback: 'https://worldofmusicians.com/wp-content/uploads/2024/07/3.png',
    alt: 'Industry Partner 3',
  },
  {
    id: 4,
    src: '/about/brand-4.png',
    fallback: 'https://worldofmusicians.com/wp-content/uploads/2024/07/4.png',
    alt: 'Industry Partner 4',
  },
  {
    id: 5,
    src: '/about/brand-5.png',
    fallback: 'https://worldofmusicians.com/wp-content/uploads/2024/07/5.png',
    alt: 'Industry Partner 5',
  },
];

const MISSION_PILLARS = [
  {
    title: 'Provide Access to Top Talent',
    description:
      'Curate a diverse selection of musicians, including top singers of India, famous Indian musicians, and international superstars.',
    icon: Music,
  },
  {
    title: 'Ensure Seamless Booking',
    description:
      'Streamline the booking process with user-friendly tools and personalized assistance, ensuring every detail is handled with care.',
    icon: ShieldCheck,
  },
  {
    title: 'Deliver Exceptional Service',
    description:
      'From initial inquiry to event execution, we prioritize customer satisfaction and strive to exceed expectations at every step.',
    icon: HeartHandshake,
  },
  {
    title: 'Promote Musical Diversity',
    description:
      'Celebrate various genres, from classical music and instrumental performances to pop, rock, and rap, catering to diverse audience preferences.',
    icon: Globe2,
  },
];

const NAV_TABS = [
  { id: 'global', label: 'Overview' },
  { id: 'tribe', label: 'Leadership' },
  { id: 'story', label: 'Our Story' },
  { id: 'mission', label: 'Mission & Vision' },
];

const About = () => {
  const [activeLogoSlide, setActiveLogoSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('global');
  const heroVideoRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Ensure About Us Hero background video autoplays on mobile browsers & WebViews
  useEffect(() => {
    const videoEl = heroVideoRef.current;
    if (!videoEl) return;

    videoEl.defaultMuted = true;
    videoEl.muted = true;
    videoEl.setAttribute('muted', '');
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('webkit-playsinline', '');

    const attemptPlay = () => {
      if (videoEl.paused) {
        videoEl.play().catch(() => {});
      }
    };

    attemptPlay();
    videoEl.addEventListener('loadeddata', attemptPlay);
    document.addEventListener('touchstart', attemptPlay, { once: true, passive: true });

    return () => {
      videoEl.removeEventListener('loadeddata', attemptPlay);
      document.removeEventListener('touchstart', attemptPlay);
    };
  }, []);

  // Auto-advance partner logo carousel on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLogoSlide((prev) => (prev + 1) % INDUSTRY_LOGOS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleTabClick = (e, id) => {
    e.preventDefault();
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-700">
      {/* =====================================================================
          1. PROFESSIONAL HERO BANNER WITH STAGE VIDEO & KEY HIGHLIGHTS
      ====================================================================== */}
      <section className="relative pt-24 sm:pt-32 lg:pt-32 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#05091e]">
        {/* Background Video */}
        <video
          ref={heroVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none brightness-90"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/videos/dj-concert.mp4" type="video/mp4" />
        </video>

        {/* Rich Multi-Layer Stage Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#04081e]/85 via-[#060f30]/70 to-[#05091e]/95 z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,165,28,0.16)_0%,transparent_55%)] z-[1]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4a51c]/15 border border-[#f4a51c]/40 text-[#f4a51c] text-xs font-semibold uppercase tracking-widest mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Art of Performance &amp; Celebration</span>
            </div>

            <h1 className="font-raleway text-3xl sm:text-5xl lg:text-[54px] font-bold text-white leading-tight tracking-tight">
              About <span className="text-[#f4a51c]">Music Maestro</span>
            </h1>

            <div className="w-16 h-1 bg-gradient-to-r from-[#f4a51c] to-[#FF983E] rounded-full mx-auto my-5" />

            <p className="text-sm sm:text-base lg:text-lg text-gray-200/90 leading-relaxed max-w-2xl mx-auto font-normal">
              India&apos;s premier live entertainment &amp; artist booking platform — connecting visionary event organizers with extraordinary musicians, bands, and performers.
            </p>
          </div>

          {/* Executive Key Metrics Strip */}
          <div className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 max-w-4xl mx-auto">
            {[
              { value: '500+', label: 'Verified Artists' },
              { value: '2,000+', label: 'Events Curated' },
              { value: '35+', label: 'Cities Covered' },
              { value: '99%', label: 'Client Satisfaction' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/[0.07] backdrop-blur-md border border-white/15 rounded-2xl py-3.5 px-4 text-center shadow-lg"
              >
                <div className="font-raleway text-xl sm:text-2xl font-bold text-[#f4a51c]">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs text-gray-300 uppercase tracking-wider font-medium mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. SLEEK HORIZONTAL SECTION NAVIGATION BAR (STICKY & MOBILE-FRIENDLY)
      ====================================================================== */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <nav
            aria-label="About Us sections"
            className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-3 overflow-x-auto no-scrollbar py-2.5"
          >
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <a
                  key={tab.id}
                  href={`#${tab.id}`}
                  onClick={(e) => handleTabClick(e, tab.id)}
                  className={`flex-shrink-0 px-4 sm:px-6 py-2 rounded-full font-raleway text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-[#f4a51c] text-slate-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* =====================================================================
          3. OVERVIEW SECTION (#global)
      ====================================================================== */}
      <section
        id="global"
        className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-32"
      >
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d98a0b] mb-2">
              <Compass className="w-4 h-4" />
              Overview
            </span>
            <h2 className="font-raleway text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-4">
              Unveiling the Soundtrack to Success: Elevating Events Through Musical Expertise
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Welcome to <strong className="text-slate-900 font-semibold">Music Maestro</strong>, where passion meets professionalism in the world of entertainment. Founded with a vision to transform events into unforgettable experiences through music, Music Maestro has quickly become a trusted platform for hiring musicians and entertainers across diverse events. Whether you are planning a corporate gathering, a private celebration, a wedding celebration, or a grand concert, we are dedicated to connecting you with the finest musical talents.
          </p>
        </div>
      </section>

      {/* =====================================================================
          4. MEET OUR TRIBE — EXECUTIVE LEADERSHIP CARDS (#tribe)
      ====================================================================== */}
      <section
        id="tribe"
        className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-32"
      >
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4a51c]/15 text-[#b87405] text-xs font-bold uppercase tracking-widest mb-3">
            <Users className="w-3.5 h-3.5" />
            Leadership Team
          </span>
          <h2 className="font-raleway text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Meet Our Tribe
          </h2>
          <div className="w-12 h-1 bg-[#f4a51c] rounded-full mx-auto mt-3 mb-3" />
          <p className="text-sm sm:text-base text-slate-500">
            Guided by industry veterans in corporate events, artist management, and creative technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {TRIBE_MEMBERS.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Portrait Image Container */}
              <div className="relative aspect-[4/4] w-full overflow-hidden bg-slate-100">
                <img
                  src={member.image}
                  alt={member.name}
                  onError={(e) => {
                    if (e.currentTarget.src !== member.fallbackImage) {
                      e.currentTarget.src = member.fallbackImage;
                    }
                  }}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/60 to-transparent" />
                <span className="absolute bottom-3 left-4 right-4 inline-block text-[11px] font-semibold uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full w-fit border border-white/15">
                  {member.role}
                </span>
              </div>

              {/* Bio Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                <h3 className="font-raleway text-xl sm:text-2xl font-bold text-slate-900 mb-2.5 group-hover:text-[#d98a0b] transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          5. TOGETHER WITH INDUSTRY LEADERS (#brand)
      ====================================================================== */}
      <section
        id="brand"
        className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d98a0b] block mb-1.5">
              Trusted Network
            </span>
            <h2 className="font-raleway text-xl sm:text-2xl font-bold text-slate-900">
              Together with Industry Leaders: Elevating Events Across India
            </h2>
          </div>

          {/* Desktop 5-Column Logo Row */}
          <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-5 gap-5 items-center justify-items-center">
            {INDUSTRY_LOGOS.map((logo) => (
              <div
                key={logo.id}
                className="w-full h-24 flex items-center justify-center p-4 bg-slate-50/80 rounded-2xl border border-slate-200/60 hover:border-[#f4a51c]/50 hover:bg-white hover:shadow-md transition-all"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  onError={(e) => {
                    if (e.currentTarget.src !== logo.fallback) {
                      e.currentTarget.src = logo.fallback;
                    }
                  }}
                  className="max-h-16 max-w-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Mobile Single-Slide Logo Carousel with Dots */}
          <div className="sm:hidden">
            <div className="w-full h-32 flex items-center justify-center p-5 bg-slate-50 rounded-2xl border border-slate-200/70">
              <img
                src={INDUSTRY_LOGOS[activeLogoSlide].src}
                alt={INDUSTRY_LOGOS[activeLogoSlide].alt}
                onError={(e) => {
                  if (e.currentTarget.src !== INDUSTRY_LOGOS[activeLogoSlide].fallback) {
                    e.currentTarget.src = INDUSTRY_LOGOS[activeLogoSlide].fallback;
                  }
                }}
                className="max-h-20 max-w-full object-contain transition-all duration-300"
              />
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              {INDUSTRY_LOGOS.map((logo, idx) => (
                <button
                  key={logo.id}
                  type="button"
                  onClick={() => setActiveLogoSlide(idx)}
                  aria-label={`Show partner ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    activeLogoSlide === idx ? 'w-6 bg-[#f4a51c]' : 'w-2 bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. A MELODY UNFOLDING: OUR STORY (#story)
      ====================================================================== */}
      <section
        id="story"
        className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-32"
      >
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d98a0b]">
                <Award className="w-4 h-4" />
                Our Journey
              </span>

              <h2 className="font-raleway text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                A Melody Unfolding: Our Story
              </h2>

              <div className="w-12 h-1 bg-[#f4a51c] rounded-full" />

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-1">
                <Link to="/" className="text-[#d98a0b] hover:underline font-semibold">
                  Music Maestro
                </Link>{' '}
                began with a simple yet powerful idea: to simplify the process of hiring musicians and entertainers while ensuring exceptional quality and service. Founded by a team of music enthusiasts and event management experts, our journey started with the realization that finding the perfect musical accompaniment for any event can be challenging and time-consuming.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Driven by our passion for music and commitment to excellence, we set out to create a platform that not only showcases the world&apos;s best artists but also provides a seamless booking experience. From organizing large-scale concerts featuring renowned artists to curating music festivals that attract music enthusiasts from around the globe, Music Maestro supports event organizers in delivering exceptional live music experiences.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Over the years, we have built a reputation for reliability, professionalism, and a deep understanding of our clients&apos; needs. We understand that every event is unique — that&apos;s why we offer customized entertainment packages tailored to your specific requirements, whether you&apos;re looking for a solo performance, a full band, or a bespoke fusion act.
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[440px]">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#f4a51c]/25 to-[#FF983E]/10 blur-md -z-10" />
                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg bg-slate-900 aspect-square">
                  <img
                    src="/about/story-violin.jpeg"
                    alt="Music Maestro Live Performance"
                    onError={(e) => {
                      const fallback =
                        'https://worldofmusicians.com/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-31-at-4.15.35-PM-1024x1019.jpeg';
                      if (e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. MISSION & VISION (#mission)
      ====================================================================== */}
      <section
        id="mission"
        className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-32 space-y-10"
      >
        {/* Mission Statement & 4 Pillars */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 lg:p-12">
          <div className="max-w-3xl mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d98a0b] mb-2">
              <Target className="w-4 h-4" />
              Mission Statement
            </span>
            <h3 className="font-raleway text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3">
              Weaving Melodies, Crafting Memories: Unveiling Our Mission
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Our mission is to empower event planners, businesses, and individuals to create memorable experiences through music. We strive to:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {MISSION_PILLARS.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-50/90 border border-slate-200/80 hover:border-[#f4a51c]/60 hover:bg-white hover:shadow-md transition-all flex gap-4 items-start"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#f4a51c]/15 text-[#d98a0b] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-raleway text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vision & Community Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-9 flex flex-col justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d98a0b] mb-2">
                <Eye className="w-4 h-4" />
                Our Vision
              </span>
              <h3 className="font-raleway text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-3">
                A World Painted in Music: Our Vision for the Future of Entertainment
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                Our vision at Music Maestro is to be the leading global platform for connecting event organizers with top-tier musicians and entertainers. We aspire to set new standards in the entertainment industry by offering a diverse roster of artists, innovative booking solutions, and unparalleled customer service.
              </p>
            </div>
            <p className="text-sm font-medium text-slate-800 pt-3 border-t border-slate-100">
              We envision a world where every event is elevated by the power of music, leaving a lasting impact on audiences worldwide.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#060b26] via-[#0a1338] to-[#05091e] text-white rounded-3xl p-6 sm:p-9 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-[#f4a51c]/15 blur-2xl pointer-events-none" />
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#f4a51c] mb-2">
                <Sparkles className="w-4 h-4" />
                Join Our Community
              </span>
              <h3 className="font-raleway text-xl sm:text-2xl font-bold text-white leading-snug mb-3">
                Embrace the Artist Within: Join Our Supportive Community
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                Become part of our vibrant community of music lovers, event planners, and artists. Discover how Music Maestro can help you elevate your next event with the perfect live musical entertainment.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/event-inquiry"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#f4a51c] hover:bg-[#e09414] text-slate-950 font-bold text-xs sm:text-sm transition shadow-md"
              >
                <span>Book Entertainment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/artists"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm transition"
              >
                <span>Explore Artist Bank</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
