import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const TRIBE_MEMBERS = [
  {
    name: 'SHYLENDER JINDAL',
    image: '/about/SJ.png',
    fallbackImage: 'https://worldofmusicians.com/wp-content/uploads/2024/10/SJ.png',
    bio: 'A seasoned business professional with over two decades of experience in the Corporate Travel Industry and the owner and Managing Director at SKIL Events.',
    nameColor: 'text-black',
    hasShadow: true,
  },
  {
    name: 'YOGENDRA JAIN',
    image: '/about/YJ.jpg',
    fallbackImage: 'https://worldofmusicians.com/wp-content/uploads/2024/10/YJ.jpg',
    bio: 'An experienced industry leader with over a decade of expertise in event and entertainment management, coupled with a background as an artist. Passionate about empowering musicians, he spearheads our mission to connect artists with unforgettable events.',
    nameColor: 'text-[#000203]',
    hasShadow: true,
  },
  {
    name: 'DARSHNA JAIN',
    image: '/about/DJ.jpg',
    fallbackImage: 'https://worldofmusicians.com/wp-content/uploads/2024/10/DJ.jpg',
    bio: 'A former Project Manager turned visionary leader, she brings a wealth of strategic insight to Music Maestro. Passionate about blending technology with creativity, she leads our vision to revolutionize the music industry, ensuring every artist finds their spotlight.',
    nameColor: 'text-[#6EC1E4]',
    hasShadow: false,
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

const About = () => {
  const [activeLogoSlide, setActiveLogoSlide] = useState(0);
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

  // Auto-advance partner logo carousel on mobile/desktop
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLogoSlide((prev) => (prev + 1) % INDUSTRY_LOGOS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#707070]">
      {/* =====================================================================
          1. HERO SECTION WITH VIDEO BACKGROUND & GOLD DIVIDER
      ====================================================================== */}
      <section className="relative min-h-[360px] sm:min-h-[420px] flex items-center justify-center pt-28 sm:pt-32 pb-14 px-4 overflow-hidden bg-[#060b26]">
        {/* Background Video (Plays on Mobile & Desktop) */}
        <video
          ref={heroVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none brightness-95"
        >
          <source src="/videos/dj-concert.mp4" type="video/mp4" />
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Deep Concert Stage Overlay (Balanced so video is clearly visible on mobile) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040926]/55 via-[#07113a]/40 to-[#060b26]/75 z-[1]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="font-raleway text-[34px] sm:text-[42px] font-medium text-white leading-[38px] tracking-wide">
            About Us
          </h1>
          <div className="py-4">
            <span className="block w-14 sm:w-16 h-[2px] bg-[#F4A51C] mx-auto" />
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. ORANGE 3-BUTTON ANCHOR BAR (OVERVIEW | OUR STORY | MISSION STATEMENT)
      ====================================================================== */}
      <section className="bg-[#FF983E] w-full shadow-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3">
          <a
            href="#global"
            className="block w-full bg-[#FF983E] hover:bg-white focus:bg-white text-white hover:text-[#2B2C30] focus:text-[#2B2C30] font-raleway text-[15px] sm:text-[18px] font-semibold py-4 px-6 text-center uppercase tracking-wider transition-colors duration-200 border-b border-white/15 md:border-b-0"
          >
            OVERVIEW
          </a>
          <a
            href="#story"
            className="block w-full bg-[#FF983E] hover:bg-white focus:bg-white text-white hover:text-[#2B2C30] focus:text-[#2B2C30] font-raleway text-[15px] sm:text-[18px] font-semibold py-4 px-6 text-center uppercase tracking-wider transition-colors duration-200 border-b border-white/15 md:border-b-0"
          >
            OUR STORY
          </a>
          <a
            href="#mission"
            className="block w-full bg-[#FF983E] hover:bg-white focus:bg-white text-white hover:text-[#2B2C30] focus:text-[#2B2C30] font-raleway text-[15px] sm:text-[18px] font-semibold py-4 px-6 text-center uppercase tracking-wider transition-colors duration-200"
          >
            MISSION STATEMENT
          </a>
        </div>
      </section>

      {/* =====================================================================
          3. MEET OUR TRIBE (WHITE BACKGROUND SECTION MATCHING SCREENSHOT)
      ====================================================================== */}
      <section className="py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="font-raleway text-[28px] sm:text-[32px] font-semibold text-[#6EC1E4] mb-6 sm:mb-10 text-left">
          Meet Our Tribe
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-8 items-start">
          {TRIBE_MEMBERS.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-[300px] sm:w-[320px] max-w-full aspect-square rounded-2xl overflow-hidden shadow-md bg-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  onError={(e) => {
                    if (e.currentTarget.src !== member.fallbackImage) {
                      e.currentTarget.src = member.fallbackImage;
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3
                className={`mt-5 mb-4 text-[28px] sm:text-[32px] font-normal tracking-tight leading-tight ${member.nameColor}`}
                style={{
                  fontFamily: 'Arial, sans-serif',
                  textShadow: member.hasShadow ? '0 0 10px rgba(0, 0, 0, 0.3)' : 'none',
                }}
              >
                {member.name}
              </h3>

              <p className="text-[15px] sm:text-base text-[#7A7A7A] leading-[1.75] max-w-[330px] mx-auto font-normal">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          4. OVERVIEW SECTION (#global)
      ====================================================================== */}
      <section
        id="global"
        className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-28"
      >
        <h2 className="font-raleway text-[22px] sm:text-[25px] font-medium text-[#2B2C30] leading-[34px] sm:leading-[35px] mb-4">
          Unveiling the Soundtrack to Success: Discover Music Maestro - Elevating Events Through Musical Expertise
        </h2>
        <p className="text-[15px] text-[#707070] leading-[1.8] font-normal">
          Welcome to Music Maestro, where passion meets professionalism in the world of entertainment. Founded with a vision to transform events into unforgettable experiences through music, Music Maestro has quickly become a trusted platform for hiring musicians and entertainers across diverse events. Whether you are planning a corporate gathering, a private celebration, wedding celebration, or a grand concert, we are dedicated to connecting you with the finest musical talents.
        </p>
      </section>

      {/* =====================================================================
          5. TOGETHER WITH INDUSTRY LEADERS (#brand)
      ====================================================================== */}
      <section
        id="brand"
        className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <h2 className="font-raleway text-[22px] sm:text-[25px] font-medium text-[#2B2C30] leading-[34px] sm:leading-[35px] mb-8">
          Together with Industry Leaders: Elevating Events Across India
        </h2>

        {/* Desktop 5-Column Logo Row & Mobile Carousel */}
        <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-items-center">
          {INDUSTRY_LOGOS.map((logo) => (
            <div
              key={logo.id}
              className="w-full h-28 flex items-center justify-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                onError={(e) => {
                  if (e.currentTarget.src !== logo.fallback) {
                    e.currentTarget.src = logo.fallback;
                  }
                }}
                className="max-h-20 max-w-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Mobile Single-Slide Logo Carousel with Dots */}
        <div className="sm:hidden">
          <div className="w-full h-36 flex items-center justify-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
            <img
              src={INDUSTRY_LOGOS[activeLogoSlide].src}
              alt={INDUSTRY_LOGOS[activeLogoSlide].alt}
              onError={(e) => {
                if (e.currentTarget.src !== INDUSTRY_LOGOS[activeLogoSlide].fallback) {
                  e.currentTarget.src = INDUSTRY_LOGOS[activeLogoSlide].fallback;
                }
              }}
              className="max-h-24 max-w-full object-contain transition-all duration-300"
            />
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            {INDUSTRY_LOGOS.map((logo, idx) => (
              <button
                key={logo.id}
                type="button"
                onClick={() => setActiveLogoSlide(idx)}
                aria-label={`Show partner ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  activeLogoSlide === idx ? 'bg-[#FF983E] scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. A MELODY UNFOLDING: OUR STORY (#story)
      ====================================================================== */}
      <section
        id="story"
        className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-28"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="font-raleway text-[22px] sm:text-[24px] font-medium text-[#2B2C30] leading-[34px] mb-4">
              A Melody Unfolding: Our Story
            </h2>
            <p className="text-[15px] text-[#707070] leading-[1.8] font-normal mb-5">
              <Link to="/" className="text-[#f4a51c] hover:underline font-medium">
                Music Maestro
              </Link>{' '}
              began with a simple yet powerful idea: to simplify the process of hiring musicians and entertainers while ensuring exceptional quality and service. Founded by a team of music enthusiasts and event management experts, our journey started with the realization that finding the perfect musical accompaniment for any event can be challenging and time-consuming.
            </p>
            <p className="text-[15px] text-[#707070] leading-[1.8] font-normal">
              Driven by our passion for music and commitment to excellence, we set out to create a platform that not only showcases the world’s best artists but also provides a seamless booking experience. From organizing large-scale concerts featuring renowned artists to curating music festivals that attract music enthusiasts from around the globe, Music Maestro supports event organizers in delivering exceptional live music experiences. Over the years, we have built a reputation for reliability, professionalism, and a deep understanding of our clients’ needs. We understand that every event is unique. That’s why we offer customized entertainment packages tailored to your specific requirements. Whether you’re looking for a solo performance, a full band, or a combination of artists and genres, we work closely with you to ensure your vision comes to life.
            </p>
          </div>

          <div className="flex justify-center">
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
              className="w-full max-w-[520px] aspect-square object-cover rounded-xl shadow-md"
            />
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. WEAVING MELODIES, CRAFTING MEMORIES: OUR MISSION (#mission)
      ====================================================================== */}
      <section
        id="mission"
        className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-28"
      >
        <h3 className="font-raleway text-[22px] sm:text-[25px] font-medium text-[#2B2C30] leading-[34px] sm:leading-[35px] mb-4">
          Weaving Melodies, Crafting Memories: Unveiling Our Mission
        </h3>
        <p className="text-[15px] text-[#707070] leading-[1.8] mb-4">
          Our mission is to empower event planners, businesses, and individuals to create memorable experiences through music. We strive to:
        </p>
        <ul className="list-disc pl-6 space-y-2.5 text-[15px] text-[#707070] leading-[1.8]">
          <li>
            <strong className="text-[#2B2C30] font-semibold">Provide Access to Top Talent</strong>: Curate a diverse selection of musicians, including top singers of India, famous Indian musicians, and international superstars.
          </li>
          <li>
            <strong className="text-[#2B2C30] font-semibold">Ensure Seamless Booking</strong>: Streamline the booking process with user-friendly tools and personalized assistance, ensuring every detail is handled with care.
          </li>
          <li>
            <strong className="text-[#2B2C30] font-semibold">Deliver Exceptional Service</strong>: From initial inquiry to event execution, we prioritize customer satisfaction and strive to exceed expectations at every step.
          </li>
          <li>
            <strong className="text-[#2B2C30] font-semibold">Promote Musical Diversity</strong>: Celebrate various genres, from classical music and instrumental performances to pop, rock, and rap, catering to diverse audience preferences.
          </li>
        </ul>
      </section>

      {/* =====================================================================
          8. A WORLD PAINTED IN MUSIC: OUR VISION FOR THE FUTURE
      ====================================================================== */}
      <section className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h3 className="font-raleway text-[22px] sm:text-[25px] font-medium text-[#2B2C30] leading-[34px] sm:leading-[35px] mb-4">
          A World Painted in Music: Our Vision for the Future of Entertainment
        </h3>
        <p className="text-[15px] text-[#707070] leading-[1.8] mb-4">
          Our vision at Music Maestro is to be the leading global platform for connecting event organizers with top-tier musicians and entertainers. We aspire to set new standards in the entertainment industry by offering a diverse roster of artists, innovative booking solutions, and unparalleled customer service. We envision a world where every event is elevated by the power of music, leaving a lasting impact on audiences worldwide.
        </p>
        <p className="text-[15px] text-[#707070] leading-[1.8]">
          Thank you for choosing Music Maestro. Let us help you create unforgettable musical experiences.
        </p>
      </section>

      {/* =====================================================================
          9. EMBRACE THE ARTIST WITHIN: JOIN OUR SUPPORTIVE COMMUNITY
      ====================================================================== */}
      <section className="pt-6 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h3 className="font-raleway text-[22px] sm:text-[25px] font-medium text-[#2B2C30] leading-[34px] sm:leading-[35px] mb-4">
          Embrace the Artist Within: Join Our Supportive Community
        </h3>
        <p className="text-[15px] text-[#707070] leading-[1.8]">
          Become part of our vibrant community of music lovers, event planners, and artists. Follow us on social media to stay updated on the latest artist features, upcoming concerts, and exclusive offers. Join the conversation and discover how Music Maestro can help you elevate your next event with the perfect musical entertainment.
        </p>
      </section>
    </div>
  );
};

export default About;
