import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchBanner from '../components/SearchBanner';
import { fetchFeaturedArtists, fetchArtists } from '../services/api';
import {
  Star,
  MapPin,
  Heart,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  UserPlus,
  CalendarPlus,
  Award,
  Quote,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

// Static fallback & enrichment data matching worldofmusicians.com
const EXCLUSIVE_TALENT_FALLBACK = [
  {
    _id: 'ex-1',
    name: 'Palchang',
    slug: 'palchang',
    category: 'Live Bands',
    subcategory: 'Folk & Fusion Band',
    location: 'Mumbai',
    priceStarting: 75000,
    featured: true,
    featuredImage:
      'https://worldofmusicians.com/wp-content/uploads/2024/10/0f8b421d-19e5-46a2-8e24-564a349b6e81-520x397.jpg',
  },
  {
    _id: 'ex-2',
    name: 'Manmeet',
    slug: 'manmeet',
    category: 'Solo Performer',
    subcategory: 'Bollywood Singer',
    location: 'Mumbai',
    priceStarting: 85000,
    featured: true,
    featuredImage:
      'https://worldofmusicians.com/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-07-at-4.28.14-PM-520x397.jpeg',
  },
  {
    _id: 'ex-3',
    name: 'Ibex',
    slug: 'ibex',
    category: 'Live Bands',
    subcategory: 'Rock & Pop Band',
    location: 'Delhi',
    priceStarting: 90000,
    featured: true,
    featuredImage:
      'https://worldofmusicians.com/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-24-at-4.57.13-PM-520x397.jpeg',
  },
  {
    _id: 'ex-4',
    name: 'Soham',
    slug: 'soham',
    category: 'Solo Performer',
    subcategory: 'Playback & Live Vocalist',
    location: 'Mumbai',
    priceStarting: 65000,
    featured: true,
    featuredImage:
      'https://worldofmusicians.com/wp-content/uploads/2025/11/IMG_20251108_165952810_HDR2-1-520x397.jpg',
  },
  {
    _id: 'ex-5',
    name: 'Hiroko Sarah',
    slug: 'hiroko-sarah',
    category: 'Solo Performer',
    subcategory: 'International Violinist',
    location: 'Mumbai',
    priceStarting: 110000,
    featured: true,
    featuredImage:
      'https://worldofmusicians.com/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-31-at-4.15.35-PM-520x397.jpeg',
  },
  {
    _id: 'ex-6',
    name: 'Ishita',
    slug: 'ishita',
    category: 'Solo Performer',
    subcategory: 'Indie & Bollywood Singer',
    location: 'Bangalore',
    priceStarting: 60000,
    featured: true,
    featuredImage:
      'https://worldofmusicians.com/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-24-at-3.12.18-PM-520x397.jpeg',
  },
];

const WIDE_SHOWCASE_ITEMS = [
  {
    name: 'Blessing Celestial',
    category: 'Live Bands',
    location: 'Mumbai',
    slug: 'blessing-celestial',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-23-at-3.41.56-PM-1024x518.jpeg',
  },
  {
    name: 'Taj Sufi Night – Sufi & Qawwali Band',
    category: 'Sufi & Qawwali',
    location: 'Delhi',
    slug: 'taj-sufi-night',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2026/10/1002534641-1200x1591.jpg',
  },
  {
    name: 'Palak B',
    category: 'Solo Performer',
    location: 'Mumbai',
    slug: 'palak-b',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-05-at-4.30.53-PM-1-768x622.jpeg',
  },
  {
    name: 'Singer Diamond',
    category: 'Solo Performer',
    location: 'Mumbai',
    slug: 'singer-diamond',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2026/07/diamond-1-600x600.png',
  },
  {
    name: 'DJ Saggy',
    category: 'DJ Services',
    location: 'Mumbai',
    slug: 'dj-saggy',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2026/04/dj-saggy-1.png',
  },
  {
    name: 'Jaipur Beats Fusion Band',
    category: 'Live Bands',
    location: 'Jaipur',
    slug: 'jaipur-beats-fusion-band',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2026/04/jaipur-1.png',
  },
  {
    name: 'Beats of Music – Sufi Bollywood Fusion',
    category: 'Live Bands',
    location: 'Mumbai',
    slug: 'beats-of-music',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2026/04/b-of-mu-1.png',
  },
  {
    name: 'OORJA THE BAND',
    category: 'Live Bands',
    location: 'Delhi',
    slug: 'oorja-the-band',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2026/04/orja-11.png',
  },
  {
    name: 'Roohani Live Band',
    category: 'Live Bands',
    location: 'Mumbai',
    slug: 'roohani-live-band',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2026/04/rohani-1.png',
  },
  {
    name: 'The Taqdeer Collective',
    category: 'Live Bands',
    location: 'Mumbai',
    slug: 'the-taqdeer-collective',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2026/04/taqdeer-1.png',
  },
  {
    name: 'Papon',
    category: 'Celebrity Singer',
    location: 'Mumbai',
    slug: 'papon',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-21-at-1.25.08-PM-1.jpeg',
  },
  {
    name: 'VDJ SOUL | DJ Sourabh',
    category: 'DJ Services',
    location: 'Mumbai',
    slug: 'vdj-soul',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2026/04/dj-soul-1.png',
  },
];

const SPEAKERS_ANCHORS_ITEMS = [
  {
    name: 'Saloni Karn',
    slug: 'saloni-karn',
    role: 'Celebrity Anchor & Emcee',
    location: 'Mumbai',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2026/04/saloni-2-520x397.png',
  },
  {
    name: 'Emcee Shaina Khan',
    slug: 'emcee-shaina-khan',
    role: 'Corporate & Wedding Host',
    location: 'Mumbai',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2026/04/saina-khan-1-520x397.png',
  },
  {
    name: 'Ajay Dhol',
    slug: 'ajay-dhol',
    role: 'Percussion & Wedding Dhol',
    location: 'Delhi',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-10-at-1.07.47-PM-520x397.jpeg',
  },
  {
    name: 'Arush',
    slug: 'arush',
    role: 'Live Entertainer & Host',
    location: 'Mumbai',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-10-at-12.45.49-PM-520x397.jpeg',
  },
  {
    name: 'Kapil',
    slug: 'kapil',
    role: 'Standup Comedian & Anchor',
    location: 'Bangalore',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-10-at-12.16.39-PM-520x397.jpeg',
  },
  {
    name: 'Karan',
    slug: 'karan',
    role: 'Stage Host & Performer',
    location: 'Jaipur',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-02-at-2.27.02-PM-2-520x397.jpeg',
  },
];

const CITY_REGIONS = [
  {
    name: 'Mumbai',
    icon: 'https://worldofmusicians.com/wp-content/uploads/2023/11/mumbai-1.png',
  },
  {
    name: 'Delhi',
    icon: 'https://worldofmusicians.com/wp-content/uploads/2023/11/new-delhi.png',
  },
  {
    name: 'Amritsar',
    icon: 'https://worldofmusicians.com/wp-content/uploads/2023/11/Untitled-design-53.png',
  },
  {
    name: 'Bangalore',
    icon: 'https://worldofmusicians.com/wp-content/uploads/2023/11/bangalore.png',
  },
  {
    name: 'Jaipur',
    icon: 'https://worldofmusicians.com/wp-content/uploads/2023/10/Untitled-design-41.png',
  },
  {
    name: 'Agra',
    icon: 'https://worldofmusicians.com/wp-content/uploads/2023/11/taj-mahal.png',
  },
];

const POPULAR_VIDEOS = [
  {
    id: 'HqJzui2afNw',
    title: 'Do Dil x Ek Ladki Ko – Live Unplugged Bollywood Mashup',
    mp4Url: '/videos/live-band.mp4',
    fallbackMp4: 'https://worldofmusicians.com/wp-content/uploads/2024/04/dance-YJLive.mp4',
    poster: 'https://i.ytimg.com/vi/HqJzui2afNw/hqdefault.jpg',
  },
  {
    id: 'jeUZm0jnKOs',
    title: 'Anup Jalota Live Concert – Soulful Ghazal & Bhajan Evening',
    mp4Url: 'https://worldofmusicians.com/wp-content/uploads/2024/04/Kartik.mp4',
    fallbackMp4: '/videos/live-band.mp4',
    poster: 'https://i.ytimg.com/vi/jeUZm0jnKOs/hqdefault.jpg',
  },
  {
    id: 'OLQ9bBcydLs',
    title: 'Shankar Mahadevan Classical Fusion Live Performance',
    mp4Url: 'https://worldofmusicians.com/wp-content/uploads/2024/04/Rohan.mp4',
    fallbackMp4: '/videos/live-band.mp4',
    poster: 'https://i.ytimg.com/vi/OLQ9bBcydLs/hqdefault.jpg',
  },
  {
    id: 'doi_Ss4WaT0',
    title: 'Pratibha Singh Baghel Live at Jazbaat – Soulful Ghazals & Music',
    mp4Url: 'https://worldofmusicians.com/wp-content/uploads/2024/04/Soham.mp4',
    fallbackMp4: '/videos/live-band.mp4',
    poster: 'https://i.ytimg.com/vi/doi_Ss4WaT0/hqdefault.jpg',
  },
  {
    id: 'P-Ay-ThLric',
    title: 'Jazbaat Live Musical Concert – Classical & Bollywood Symphony',
    mp4Url: '/videos/dj-concert.mp4',
    fallbackMp4: 'https://worldofmusicians.com/wp-content/uploads/2024/06/dj-concert-hd-no-copyright-video.mp4',
    poster: 'https://i.ytimg.com/vi/P-Ay-ThLric/hqdefault.jpg',
  },
  {
    id: '_dgNRR8Tpew',
    title: 'Madhur Live Band – High-Energy Bollywood & Sufi Medley',
    mp4Url: 'https://worldofmusicians.com/wp-content/uploads/2024/04/dance-YJLive.mp4',
    fallbackMp4: '/videos/dj-concert.mp4',
    poster: 'https://i.ytimg.com/vi/_dgNRR8Tpew/hqdefault.jpg',
  },
];

const ENTERTAINMENT_NEWS = [
  {
    title:
      'Make Your Wedding Sparkle: Seamless Booking for Elite Musicians and Entertainers with Music Maestro',
    date: 'August 17, 2024',
    category: 'Wedding Entertainment',
    excerpt:
      'Your wedding day is one of the most special occasions in your life, and it deserves to be nothing short of extraordinary. Discover how to curate the perfect sangeet, cocktail, and reception lineup.',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2024/08/Untitled-design-2024-08-17T133522.328-577x321.png',
  },
  {
    title: 'Make Your Corporate Event Shine with Music Maestro',
    date: 'August 12, 2024',
    category: 'Corporate Events',
    excerpt:
      'When it comes to organizing a corporate event that leaves a lasting impression, the right live band, emcee, or celebrity performer elevates networking and brand celebration.',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2024/08/Add-a-heading-8-577x321.png',
  },
  {
    title:
      'From Poetry to Screen: How Manoj Muntashir Shukla is Shaping Indian Cinema',
    date: 'August 5, 2024',
    category: 'Artist Spotlight',
    excerpt:
      'In the vibrant tapestry of Indian cinema, where tradition meets innovation, one name that resonates with audiences across generations is lyricist and storyteller Manoj Muntashir.',
    image:
      'https://worldofmusicians.com/wp-content/uploads/2024/08/images-1.jpeg',
  },
];

const CLIENT_TESTIMONIALS = [
  {
    quote:
      'Music Maestro made our annual Goa corporate retreat truly electric! From artist curation to stage sound check, everything was handled with world-class professionalism.',
    name: 'Rohit Sharma',
    role: 'VP Events, Corporate Retreat Goa',
    rating: 5,
  },
  {
    quote:
      'We booked a Sufi & Bollywood live band along with a wedding DJ for our Udaipur destination wedding. Every single guest was on the dance floor till 3 AM!',
    name: 'Ananya & Karan Malhotra',
    role: 'Luxury Destination Wedding',
    rating: 5,
  },
  {
    quote:
      'Seamless communication, transparent pricing, and incredible artist options. Their team helped us lock in an unforgettable celebrity singer for our gala night.',
    name: 'Vikramaditya Singh',
    role: 'Director, Brand Conferences India',
    rating: 5,
  },
];

const BRAND_LOGOS = [
  {
    name: 'Partner Brand 1',
    logo: 'https://worldofmusicians.com/wp-content/uploads/2024/02/unnamed-1.webp',
  },
  {
    name: 'Partner Brand 2',
    logo: 'https://worldofmusicians.com/wp-content/uploads/2024/08/Untitled-design-2024-08-12T133414.281.png',
  },
  {
    name: 'Partner Brand 3',
    logo: 'https://worldofmusicians.com/wp-content/uploads/2024/02/OIP.webp',
  },
  {
    name: 'Partner Brand 4',
    logo: 'https://worldofmusicians.com/wp-content/uploads/2024/02/Gal.webp',
  },
];

const Home = () => {
  // Video control states
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activePopularVideo, setActivePopularVideo] = useState(null);

  // Carousel refs
  const exclusiveCarouselRef = useRef(null);
  const wideCarouselRef = useRef(null);
  const speakersCarouselRef = useRef(null);

  // Ensure Hero background video autoplays reliably on mobile browsers & WebViews
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.defaultMuted = true;
    videoEl.muted = true;
    videoEl.setAttribute('muted', '');
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('webkit-playsinline', '');

    const attemptPlay = () => {
      if (videoEl.paused) {
        videoEl
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const scrollCarousel = (ref, direction) => {
    if (!ref.current) return;
    const scrollAmount = ref.current.clientWidth * 0.8;
    ref.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Exact Typed.js strings from worldofmusicians.com Hero
  const typewriterPhrases = [
    "LET'S",
    'EXPERIENCE',
    'EXTRAORDINARY',
    'ENTERTAINMENT',
    'EXPERIENCES',
    'TOGETHER',
    'CUSTOM CREATIONS',
    'WE ARE HERE TO MAKE YOUR VISION COME TO LIFE',
    'FROM INITIAL CONCEPT...',
    'TO CREATION...',
    'TO SHOWTIME',
    'OUR ENTERTAINMENT CONNECTS AUDIENCE AND BRANDS',
    'OUR ENTERTAINMENT CREATES MEMORIES',
    'A WORLD OF ENTERTAINMENT AWAITS',
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  // Data states
  const [featuredArtists, setFeaturedArtists] = useState([]);

  // Typewriter ticker
  useEffect(() => {
    const handleTyping = () => {
      const fullText = typewriterPhrases[phraseIndex];

      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(70);

        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(40);

        if (currentText === '') {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, typingSpeed]);

  // Fetch initial artists from backend and merge with WOM showcase talent
  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [featRes, allRes] = await Promise.all([
          fetchFeaturedArtists(),
          fetchArtists({ limit: 8 }),
        ]);

        const apiArtists =
          featRes?.data?.length > 0
            ? featRes.data
            : allRes?.data?.length > 0
            ? allRes.data
            : [];

        if (apiArtists.length > 0) {
          setFeaturedArtists([...EXCLUSIVE_TALENT_FALLBACK, ...apiArtists]);
        } else {
          setFeaturedArtists(EXCLUSIVE_TALENT_FALLBACK);
        }
      } catch {
        setFeaturedArtists(EXCLUSIVE_TALENT_FALLBACK);
      }
    };

    loadHomeData();
  }, []);

  const displayExclusive =
    featuredArtists.length > 0 ? featuredArtists : EXCLUSIVE_TALENT_FALLBACK;

  return (
    <div className="min-h-screen bg-[#121212] text-white overflow-x-hidden">
      {/* =====================================================================
          1. HERO SECTION WITH FULLSCREEN VIDEO & LIVE TYPED HEADLINE
      ====================================================================== */}
      <section className="relative min-h-[92svh] sm:min-h-[100svh] flex items-center justify-center pt-24 sm:pt-28 lg:pt-28 pb-16 sm:pb-24 px-4 overflow-hidden bg-[#050b24]">
        {/* Fullscreen Video Background (Works on Mobile & Desktop with Audio on Unmute) */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none brightness-95 scale-105"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/videos/dj-concert.mp4" type="video/mp4" />
        </video>

        {/* Deep Royal Concert Blue Stage Vignette Overlay (Balanced so video shines through on mobile) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040928]/60 via-[#071344]/40 to-[#121212]/90 z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(29,78,216,0.28)_0%,transparent_60%)] z-[1]" />

        <div className="relative max-w-5xl mx-auto text-center z-10 w-full mt-1 sm:mt-4">
          {/* Dynamic Typed Headline matching Screenshot 1 */}
          <div className="min-h-[64px] sm:min-h-[92px] md:min-h-[108px] flex items-center justify-center px-2">
            <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-normal sm:font-medium font-raleway tracking-[0.04em] text-white uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] leading-tight break-words">
              <span>{currentText}</span>
              <span className="inline-block w-0.5 sm:w-1 h-6 sm:h-10 md:h-12 bg-white/80 ml-1 align-middle animate-pulse" />
            </h1>
          </div>

          {/* Subtitle matching Screenshot 1 */}
          <h4 className="text-[17px] sm:text-2xl md:text-[26px] font-light tracking-[0.12em] sm:tracking-[0.2em] text-gray-300/95 uppercase mt-1 mb-6 sm:mb-8 drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)] font-raleway">
            MUSIC MAESTRO!
          </h4>

          {/* Search Banner + Featured Category Pills */}
          <SearchBanner />
        </div>

        {/* Bottom-Left Video Audio & Play/Pause Controls */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 flex items-center gap-1.5 sm:gap-2 bg-black/70 backdrop-blur-md border border-white/20 rounded-full p-1 sm:p-1.5 shadow-2xl">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-white/20 text-gray-200 hover:text-white transition"
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            title={isMuted ? 'Unmute background music' : 'Mute background music'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#f4a51c]" />
            )}
          </button>
          <button
            onClick={togglePlay}
            className="p-2 rounded-full hover:bg-white/20 text-gray-200 hover:text-white transition"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            title={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4 text-[#f4a51c]" />
            )}
          </button>
        </div>
      </section>

      {/* =====================================================================
          2. WELCOME 3-COLUMN SPLIT SECTION (IMAGE | TEXT + CTA | IMAGE)
      ====================================================================== */}
      <section className="w-full bg-[#181818] border-y border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
          {/* Left Stage Image Column */}
          <div
            className="hidden lg:block lg:col-span-4 bg-cover bg-center relative min-h-[420px]"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=85")',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-[#181818]" />
          </div>

          {/* Center Welcome Copy & Enquire Button */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center px-6 sm:px-10 py-14 sm:py-20">
            <div className="w-14 h-1 bg-[#f4a51c] rounded-full mb-5" />
            <h2 className="text-xl sm:text-2xl md:text-[26px] font-extrabold font-raleway text-white leading-snug mb-5">
              Welcome to Music Maestro – Your Premier Destination to Hire Artists for Events, Musicians and Entertainers
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
              Welcome to Music Maestro, where your quest to hire artists for events, musicians, and entertainers comes to a fulfilling end. Whether you are planning a corporate event, a private party, a wedding, or a grand concert, we provide a seamless and exhilarating musician booking experience.
            </p>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-8">
              Our extensive network features the world’s best artists, from renowned music bands to versatile DJs, ensuring that every event is an unforgettable musical journey.
            </p>
            <Link
              to="/event-inquiry"
              className="px-8 py-3.5 bg-[#f4a51c] hover:bg-[#e09414] text-white font-bold text-sm rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
            >
              Enquire Now
            </Link>
          </div>

          {/* Right Stage Image Column */}
          <div
            className="hidden lg:block lg:col-span-4 bg-cover bg-center relative min-h-[420px]"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1000&q=85")',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-[#181818]" />
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. CURATE YOUR EXPERIENCE & EXCLUSIVE TALENT CAROUSEL
      ====================================================================== */}
      <section className="py-14 sm:py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold font-raleway text-white mb-3">
            Curate Your Experience: Book the World&apos;s Top Artists
          </h2>
          <div className="w-16 h-1 bg-[#f4a51c] mx-auto rounded-full mb-5" />
          <h3 className="text-lg sm:text-2xl font-bold text-[#f4a51c] uppercase tracking-wider font-raleway">
            Exclusive Talent
          </h3>
        </div>

        <div className="relative group">
          {/* Left / Right Carousel Arrows */}
          <button
            type="button"
            onClick={() => scrollCarousel(exclusiveCarouselRef, 'left')}
            className="flex absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/80 hover:bg-[#f4a51c] text-white hover:text-black border border-white/20 items-center justify-center shadow-xl transition"
            aria-label="Previous artists"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel(exclusiveCarouselRef, 'right')}
            className="flex absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/80 hover:bg-[#f4a51c] text-white hover:text-black border border-white/20 items-center justify-center shadow-xl transition"
            aria-label="Next artists"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Horizontal Snap Carousel */}
          <div
            ref={exclusiveCarouselRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayExclusive.map((artist, idx) => (
              <Link
                key={artist._id || idx}
                to={artist.slug ? `/artist/${artist.slug}` : `/event-inquiry?artist=${encodeURIComponent(artist.name)}`}
                className="snap-start flex-shrink-0 w-[285px] sm:w-[330px] md:w-[360px] group/card relative rounded-2xl overflow-hidden bg-[#1b1b1b] border border-white/10 hover:border-[#f4a51c] transition-all duration-300 shadow-xl"
              >
                <div className="aspect-[520/397] w-full overflow-hidden relative bg-black">
                  <img
                    src={artist.featuredImage}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />

                  {/* Top-Left Badges */}
                  <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#f4a51c] text-black text-[11px] font-extrabold uppercase tracking-wider shadow">
                      <Star className="w-3 h-3 fill-current" /> Featured
                    </span>
                    <span className="inline-block px-2.5 py-1 rounded bg-black/75 text-white text-[11px] font-semibold backdrop-blur-sm">
                      Starting from Rs.{' '}
                      {artist.priceStarting
                        ? Number(artist.priceStarting).toLocaleString('en-IN')
                        : '50,000'}
                    </span>
                  </div>

                  {/* Top-Right Heart Icon */}
                  <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/60 text-white group-hover/card:bg-[#f4a51c] group-hover/card:text-black flex items-center justify-center transition">
                    <Heart className="w-4 h-4" />
                  </div>

                  {/* Bottom Title & Location Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-[#f82246] text-white text-[10px] font-bold uppercase tracking-wider mb-1.5">
                      {artist.subcategory || artist.category}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover/card:text-[#f4a51c] transition font-raleway">
                      {artist.name}
                    </h3>
                    <p className="text-xs text-gray-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#f4a51c]" />
                      {artist.location || 'Mumbai'}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. FROM SINGERS, BANDS TO DJS AND MORE WE HAVE GOT THEM ALL
      ====================================================================== */}
      <section className="py-14 sm:py-20 bg-[#181818] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-raleway text-white mb-3">
              From Singers, Bands to DJs and more we have got them all
            </h2>
            <div className="w-16 h-1 bg-[#f4a51c] mx-auto rounded-full" />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => scrollCarousel(wideCarouselRef, 'left')}
              className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/80 hover:bg-[#f4a51c] text-white hover:text-black border border-white/20 items-center justify-center shadow-xl transition"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollCarousel(wideCarouselRef, 'right')}
              className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/80 hover:bg-[#f4a51c] text-white hover:text-black border border-white/20 items-center justify-center shadow-xl transition"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div
              ref={wideCarouselRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {WIDE_SHOWCASE_ITEMS.map((item, index) => (
                <Link
                  key={index}
                  to={`/artist/${item.slug}`}
                  className="group relative rounded-2xl overflow-hidden bg-[#222222] aspect-[4/4] flex flex-col justify-end p-5 border border-white/10 hover:border-[#f4a51c] transition-all duration-300 shadow-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                  <div className="relative z-10">
                    <span className="inline-block px-2.5 py-0.5 bg-[#f4a51c] text-black text-[10px] font-extrabold uppercase tracking-wider rounded mb-2">
                      {item.category}
                    </span>
                    <h4 className="text-lg font-bold text-white group-hover:text-[#f4a51c] transition font-raleway line-clamp-2">
                      {item.name}
                    </h4>
                    <span className="text-xs text-gray-300 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-[#f4a51c]" />
                      {item.location}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/artists"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#f4a51c] hover:bg-[#e09414] text-white font-bold text-sm rounded-full shadow-lg transition"
            >
              Explore Full Artist Bank
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. BOOK BEST SPEAKERS, STANDUP COMEDIANS, ANCHORS & MORE
      ====================================================================== */}
      <section className="py-14 sm:py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-raleway text-white mb-3">
            Book Best Speakers, Standup Comedians, Anchors &amp; more
          </h2>
          <div className="w-16 h-1 bg-[#f4a51c] mx-auto rounded-full" />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollCarousel(speakersCarouselRef, 'left')}
            className="flex absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/80 hover:bg-[#f4a51c] text-white hover:text-black border border-white/20 items-center justify-center shadow-xl transition"
            aria-label="Scroll speakers left"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel(speakersCarouselRef, 'right')}
            className="flex absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/80 hover:bg-[#f4a51c] text-white hover:text-black border border-white/20 items-center justify-center shadow-xl transition"
            aria-label="Scroll speakers right"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div
            ref={speakersCarouselRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {SPEAKERS_ANCHORS_ITEMS.map((item, idx) => (
              <Link
                key={idx}
                to={`/artist/${item.slug}`}
                className="snap-start flex-shrink-0 w-[270px] sm:w-[310px] group relative rounded-2xl overflow-hidden bg-[#1c1c1c] border border-white/10 hover:border-[#f4a51c] transition-all duration-300 shadow-lg"
              >
                <div className="aspect-[520/397] w-full overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white group-hover:bg-[#f4a51c] group-hover:text-black flex items-center justify-center transition">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-2 py-0.5 rounded bg-[#f4a51c] text-black text-[10px] font-bold uppercase mb-1">
                      {item.role}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#f4a51c] transition font-raleway">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-300 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#f4a51c]" />
                      {item.location}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. UNEARTH THE MASTERS: HIRE PERFORMERS ANYWHERE IN INDIA (6 CITIES)
      ====================================================================== */}
      <section className="py-14 sm:py-20 px-4 bg-[#181818] border-y border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-16 h-1 bg-[#f4a51c] mx-auto rounded-full mb-4" />
          <h3 className="text-xl sm:text-2xl font-bold text-[#f4a51c] font-raleway mb-2">
            Unearth the Masters: Book Extraordinary Artists for Your Event
          </h3>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-raleway text-white mb-5">
            Hire performers and entertainers for your event anywhere in India
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            At Music Maestro, we take pride in connecting you with the crème de la crème of the music industry. Our platform offers an impressive roster of artists for booking, including the top singers of India, famous Indian musicians, and international superstars. You can book an artist like a flute player, solo performer, solo singer, guitarist for live bands (Corporate, Instrumental, Karaoke, Private Event, Wedding), or DJ Services (Club DJ, VDJ, Wedding DJ) and be assured of a performance that resonates with your audience&apos;s tastes.
          </p>

          {/* 6 City Landmark Icon Cards matching worldofmusicians.com */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {CITY_REGIONS.map((city) => (
              <Link
                key={city.name}
                to={`/artists?location=${encodeURIComponent(city.name)}`}
                className="group bg-[#222222] hover:bg-[#2a2a2a] border border-white/10 hover:border-[#f4a51c] rounded-2xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1.5 shadow-lg"
              >
                <div className="w-20 h-20 rounded-full bg-white/95 p-3.5 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <img
                    src={city.icon}
                    alt={city.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#f4a51c] transition font-raleway">
                  {city.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. POPULAR VIDEOS (6 YOUTUBE LIVE PERFORMANCE EMBEDS)
      ====================================================================== */}
      <section className="py-14 sm:py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-raleway text-white mb-3">
            Popular videos
          </h2>
          <div className="w-16 h-1 bg-[#f4a51c] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_VIDEOS.map((vid) => {
            const isActive = activePopularVideo === vid.id;
            return (
              <div
                key={vid.id}
                className="rounded-2xl overflow-hidden bg-[#1b1b1b] border border-white/10 hover:border-[#f4a51c] transition shadow-xl group"
              >
                <div className="aspect-video w-full bg-black relative overflow-hidden">
                  {isActive ? (
                    <video
                      controls
                      autoPlay
                      playsInline
                      poster={vid.poster}
                      className="w-full h-full object-cover bg-black"
                    >
                      <source src={vid.mp4Url} type="video/mp4" />
                      <source src={vid.fallbackMp4} type="video/mp4" />
                    </video>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActivePopularVideo(vid.id)}
                      className="w-full h-full relative block text-left group/vid focus:outline-none"
                      aria-label={`Play ${vid.title}`}
                    >
                      <img
                        src={vid.poster}
                        alt={vid.title}
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80';
                        }}
                        className="w-full h-full object-cover group-hover/vid:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/60" />

                      {/* Top YouTube-style Title Bar */}
                      <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-7 h-7 rounded-full bg-[#f4a51c] text-black font-extrabold text-xs flex items-center justify-center flex-shrink-0 shadow">
                            MM
                          </span>
                          <span className="text-xs text-white font-medium truncate drop-shadow">
                            {vid.title}
                          </span>
                        </div>
                      </div>

                      {/* Center Iconic Red YouTube Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-11 rounded-xl bg-[#FF0000] group-hover/vid:bg-[#e60000] group-hover/vid:scale-110 transition-all duration-200 flex items-center justify-center shadow-[0_6px_24px_rgba(0,0,0,0.75)]">
                          <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                        </div>
                      </div>

                      {/* Bottom-Left Watch Badge */}
                      <div className="absolute bottom-2.5 left-3 px-2.5 py-1 rounded bg-black/80 text-white text-[11px] font-medium flex items-center gap-1.5 backdrop-blur-sm">
                        <Play className="w-3 h-3 text-[#FF0000] fill-[#FF0000]" />
                        <span>Tap to Play Musical Video</span>
                      </div>
                    </button>
                  )}
                </div>
                <div className="p-4 flex items-center justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-200 group-hover:text-[#f4a51c] transition line-clamp-1">
                    {vid.title}
                  </h4>
                  <a
                    href={`https://www.youtube.com/watch?v=${vid.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#f4a51c] hover:underline flex-shrink-0 font-semibold"
                  >
                    YouTube &rarr;
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          8. ENTERTAINMENT NEWS (3 EDITORIAL BLOG CARDS)
      ====================================================================== */}
      <section className="py-14 sm:py-20 px-4 bg-[#181818] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <div className="w-16 h-1 bg-[#f4a51c] mx-auto rounded-full mb-4" />
            <h2 className="text-2xl sm:text-4xl font-extrabold font-raleway text-white">
              Entertainment News
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {ENTERTAINMENT_NEWS.map((post, idx) => (
              <div
                key={idx}
                className="bg-[#202020] rounded-2xl overflow-hidden border border-white/10 hover:border-[#f4a51c]/70 transition-all duration-300 flex flex-col shadow-lg group"
              >
                <div className="aspect-[16/9] w-full overflow-hidden relative bg-black">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded bg-[#f4a51c] text-black text-[11px] font-bold uppercase">
                    {post.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-gray-400 block mb-2">
                      {post.date}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#f4a51c] transition font-raleway mb-3 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <Link
                      to="/event-inquiry"
                      className="text-xs font-bold text-[#f4a51c] hover:underline inline-flex items-center gap-1"
                    >
                      Read More &amp; Book Talent <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. OUR CLIENTS SAY (TESTIMONIALS)
      ====================================================================== */}
      <section className="py-14 sm:py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <div className="w-16 h-1 bg-[#f4a51c] mx-auto rounded-full mb-4" />
          <h2 className="text-2xl sm:text-4xl font-extrabold font-raleway text-white">
            Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLIENT_TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1b1b1b] border border-white/10 hover:border-[#f4a51c]/60 p-6 sm:p-8 rounded-2xl relative shadow-xl transition"
            >
              <Quote className="w-9 h-9 text-[#f4a51c]/30 mb-4" />
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed italic mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <h4 className="text-sm font-bold text-white font-raleway">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-[#f4a51c]">{item.role}</span>
                </div>
                <div className="flex items-center gap-0.5 text-[#f4a51c]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          10. A WORLD OF CREATIVITY & WHERE PRODUCTIVITY MEETS PLAY
      ====================================================================== */}
      <section className="py-14 sm:py-20 px-4 bg-[#181818] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="w-16 h-1 bg-[#f4a51c] mx-auto rounded-full mb-4" />
            <h2 className="text-2xl sm:text-4xl font-extrabold font-raleway text-white mb-4">
              A World of Creativity: Artists for Every Mood and Milestone
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Our artist portfolio includes a diverse array of musical talents. Whether you are looking for a soulful love song performance, an energetic karaoke session, or a classical music recital, we have got you covered. You can hire the best musicians who specialize in various genres, including:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            <div className="bg-[#222222] border border-white/10 hover:border-[#f4a51c] rounded-2xl p-7 text-center transition hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#f4a51c]/15 border border-[#f4a51c]/40 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-[#f4a51c]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-raleway mb-3">
                Love Songs &amp; Karaoke
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Sing along with renowned artists like Javed Ali and Shankar Mahadevan, and enjoy a night of nostalgic melodies.
              </p>
            </div>

            <div className="bg-[#222222] border border-white/10 hover:border-[#f4a51c] rounded-2xl p-7 text-center transition hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#f4a51c]/15 border border-[#f4a51c]/40 flex items-center justify-center">
                <Award className="w-8 h-8 text-[#f4a51c]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-raleway mb-3">
                Classical Music &amp; Instrumental
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Experience the timeless beauty of classical music and instrumental performances by India&apos;s famous musicians.
              </p>
            </div>

            <div className="bg-[#222222] border border-white/10 hover:border-[#f4a51c] rounded-2xl p-7 text-center transition hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#f4a51c]/15 border border-[#f4a51c]/40 flex items-center justify-center">
                <Volume2 className="w-8 h-8 text-[#f4a51c]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-raleway mb-3">
                Rappers &amp; DJs
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Groove to the beats of top rappers in India and international DJs like Badshah and Asees Kaur.
              </p>
            </div>
          </div>

          {/* Where Productivity Meets Play Corporate Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-[#1f1a12] via-[#251f15] to-[#1a1c24] border border-[#f4a51c]/30 p-7 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="lg:w-2/3 space-y-4 text-center lg:text-left">
              <h4 className="text-xl sm:text-3xl font-extrabold font-raleway text-white leading-tight">
                Where Productivity Meets Play: Crafting the Ideal Entertainment for Your Corporate Event
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Planning a corporate event for team building or a grand product launch? Music Maestro offers a plethora of options to make your event memorable. Hire entertainers and musicians who can provide the perfect backdrop for networking, team bonding, and celebration. Our artists are seasoned professionals who understand the nuances of corporate entertainment and are adept at engaging diverse audiences.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                to="/event-inquiry"
                className="inline-block px-9 py-4 bg-[#f4a51c] hover:bg-[#e09414] text-white font-extrabold text-sm rounded-full shadow-lg transition transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          11. HOW IT WORKS? (LEFT 3 ICON BOXES + RIGHT STAGE VISUAL)
      ====================================================================== */}
      <section className="py-14 sm:py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="w-14 h-1 bg-[#f82246] rounded-full mb-3" />
              <h3 className="text-2xl sm:text-4xl font-extrabold font-raleway text-white">
                How It Works?
              </h3>
            </div>

            <div className="space-y-4">
              <Link
                to="/login"
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#1b1b1b] border border-white/10 hover:border-[#f82246] transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f82246]/15 text-[#f82246] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#f4a51c] transition font-raleway">
                    Register yourself
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
                    Register now to connect with top-tier entertainment opportunities and elevate your musical career!
                  </p>
                </div>
              </Link>

              <Link
                to="/add-listing"
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#1b1b1b] border border-white/10 hover:border-[#f82246] transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f82246]/15 text-[#f82246] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                  <CalendarPlus className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#f4a51c] transition font-raleway">
                    Add Yourself as an Artist
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
                    Add yourself as an artist today and reach event planners, venues, and fans looking for exceptional musical talent!
                  </p>
                </div>
              </Link>

              <Link
                to="/event-inquiry"
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#1b1b1b] border border-white/10 hover:border-[#f82246] transition group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f82246]/15 text-[#f82246] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-[#f4a51c] transition font-raleway">
                    Get Bookings
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
                    Expand your reach and secure more gigs by getting bookings through our trusted network of event organizers!
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#1a1a1a] p-6">
              <img
                src="https://worldofmusicians.com/wp-content/uploads/2021/09/web-search-svg.svg"
                alt="How Music Maestro Works"
                className="w-full max-w-md mx-auto h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          12. WHY CHOOSE MUSIC MAESTRO? (3 FEATURE IMAGE BOXES)
      ====================================================================== */}
      <section className="py-14 sm:py-20 px-4 bg-[#181818] border-y border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-raleway text-white mb-3">
            Why Choose Music Maestro?
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto mb-12">
            Choosing the right entertainment for your event can be daunting, but Music Maestro simplifies the process with a few clicks. Here&apos;s why we stand out:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-[#222222] border border-white/10 hover:border-[#f4a51c] p-7 rounded-2xl flex flex-col items-center text-center transition">
              <img
                src="https://worldofmusicians.com/wp-content/uploads/2024/07/Untitled-design-2024-07-22T010902.314.png"
                alt="Extensive Network of Artists"
                className="w-20 h-20 object-contain mb-5"
                loading="lazy"
              />
              <h3 className="text-lg font-bold text-white font-raleway mb-2.5">
                Extensive Network of Artists
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Sing along with renowned artists like Javed Ali, Badshah, Shankar Mahadevan, and enjoy a night of nostalgic melodies.
              </p>
            </div>

            <div className="bg-[#222222] border border-white/10 hover:border-[#f4a51c] p-7 rounded-2xl flex flex-col items-center text-center transition">
              <img
                src="https://worldofmusicians.com/wp-content/uploads/2024/07/Untitled-design-2024-07-22T011248.570.png"
                alt="Easy Booking Process"
                className="w-20 h-20 object-contain mb-5"
                loading="lazy"
              />
              <h3 className="text-lg font-bold text-white font-raleway mb-2.5">
                Easy Booking Process
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Our platform is designed to make the musician booking process as simple and efficient as possible. With detailed artist profiles, performance samples, and customer reviews, you can make informed decisions.
              </p>
            </div>

            <div className="bg-[#222222] border border-white/10 hover:border-[#f4a51c] p-7 rounded-2xl flex flex-col items-center text-center transition">
              <img
                src="https://worldofmusicians.com/wp-content/uploads/2024/07/Untitled-design-2024-07-22T011608.211.png"
                alt="Tailored Entertainment Solutions"
                className="w-20 h-20 object-contain mb-5"
                loading="lazy"
              />
              <h3 className="text-lg font-bold text-white font-raleway mb-2.5">
                Tailored Entertainment Solutions
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                We understand that every event is unique. Our team works closely with you to understand your requirements and tailor the entertainment accordingly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          13. BRAND COLLABORATIONS + ELEVATE YOUR VISION + COMMUNITY
      ====================================================================== */}
      <section className="py-14 sm:py-20 px-4 max-w-6xl mx-auto text-center space-y-16">
        {/* Collaborating with India's Finest Brands */}
        <div>
          <div className="w-16 h-1 bg-[#f4a51c] mx-auto rounded-full mb-4" />
          <h3 className="text-xl sm:text-3xl font-extrabold font-raleway text-white mb-8">
            Elevating Excellence, Collaborating with India&apos;s Finest Brands
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 items-center justify-items-center">
            {BRAND_LOGOS.map((brand, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-3 sm:p-4 w-full max-w-[190px] h-20 sm:h-24 flex items-center justify-center shadow-md hover:scale-105 transition"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-14 sm:max-h-16 max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Elevate Your Vision */}
        <div className="bg-[#1b1b1b] border border-white/10 rounded-3xl p-8 sm:p-12 space-y-5 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-raleway text-[#f4a51c]">
            Elevate Your Vision: Book Now and Transform Your Event
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to make your event unforgettable? Hire musicians and entertainers from Music Maestro today. Our platform is your gateway to a world of musical excellence, where every performance is crafted to leave a lasting impression.
            <br />
            <br />
            Explore our artist profiles, read reviews, and make your booking with confidence. For any inquiries or personalized assistance, feel free to contact our dedicated support team. We are here to ensure that your event is a resounding success with the perfect musical entertainment.
          </p>
          <div className="pt-2">
            <Link
              to="/event-inquiry"
              className="inline-flex items-center gap-2 px-9 py-4 bg-[#f4a51c] hover:bg-[#e09414] text-white font-extrabold text-sm rounded-full shadow-lg transition transform hover:scale-105"
            >
              Send Event Enquiry
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Embrace the Artist Within */}
        <div className="max-w-3xl mx-auto space-y-3 pb-4">
          <div className="w-16 h-1 bg-[#f4a51c] mx-auto rounded-full mb-3" />
          <h3 className="text-xl sm:text-2xl font-extrabold font-raleway text-white">
            Embrace the Artist Within: Join Our Supportive Community
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Follow us on social media to stay updated with the latest news, artist features, and exclusive offers. Join the Music Maestro community and be part of a vibrant network of music lovers and event planners. Thank you for choosing Music Maestro. We look forward to helping you create unforgettable musical experiences.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
