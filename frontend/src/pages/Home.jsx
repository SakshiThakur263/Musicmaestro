import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchBanner from '../components/SearchBanner';
import ArtistCard from '../components/ArtistCard';
import { fetchFeaturedArtists, fetchArtists } from '../services/api';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  CalendarCheck,
  Music2,
  Mic,
  Disc,
  Headphones,
  ShieldCheck,
  Star,
  Award,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from 'lucide-react';

const Home = () => {
  // Video control states
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

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

  // Typewriter effect phrases
  const typewriterPhrases = [
    "EXPERIENCE EXTRAORDINARY ENTERTAINMENT TOGETHER",
    "CUSTOM CREATIONS TO BRING YOUR VISION TO LIFE",
    "FROM INITIAL CONCEPT... TO CREATION... TO SHOWTIME",
    "CREATING TIMELESS MEMORIES THROUGH MUSIC",
    "HIRE WORLD-CLASS MUSICIANS, BANDS & DJS",
    "A WORLD OF ENTERTAINMENT AWAITS YOU",
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  // Data states
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [topTalent, setTopTalent] = useState([]);
  const [loading, setLoading] = useState(true);

  // Typewriter ticker
  useEffect(() => {
    const handleTyping = () => {
      const fullText = typewriterPhrases[phraseIndex];

      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(60);

        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(30);

        if (currentText === '') {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, typingSpeed]);

  // Fetch initial artists
  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [featRes, allRes] = await Promise.all([
          fetchFeaturedArtists(),
          fetchArtists({ limit: 8 }),
        ]);

        if (featRes?.data) setFeaturedArtists(featRes.data);
        if (allRes?.data) setTopTalent(allRes.data);
      } catch (err) {
        console.error('Failed to load home page artists:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white">
      {/* 1. HERO SECTION WITH FULL BACKGROUND VIDEO & MOTION */}
      <section className="relative min-h-[100svh] flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 overflow-hidden">
        {/* Fullscreen Video Background from User Asset */}
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none brightness-75 scale-105 transition-all duration-1000"
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-[#0b0e14] z-[1]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)] z-[1]"></div>

        {/* Ambient Pulsing Glow Orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[650px] h-[250px] sm:h-[450px] bg-[#f4a51c]/15 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none z-[2] animate-pulse"></div>

        <div className="relative max-w-5xl mx-auto text-center z-10 w-full mt-2 sm:mt-4">
          {/* Main Hero Title from Reference Screenshot */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-raleway tracking-tight text-white mb-2 uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
            EXPERIENCE
          </h1>

          {/* Subtitle from Reference Screenshot */}
          <h2 className="text-sm sm:text-2xl md:text-3xl font-bold tracking-[0.15em] sm:tracking-[0.25em] text-gray-200 uppercase mb-6 sm:mb-8 drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)] font-raleway">
            MUSIC MAESTRO!
          </h2>

          {/* Search Box Component */}
          <div className="w-full">
            <SearchBanner />
          </div>

          {/* Slogan Ticker Badge */}
          <div className="mt-6 sm:mt-8 max-w-full min-h-[36px] sm:min-h-[40px] inline-flex items-center gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] sm:text-sm font-medium text-gray-300 shadow-xl">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f4a51c] animate-spin flex-shrink-0" />
            <span className="text-gray-300 truncate">
              {currentText}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f4a51c] animate-ping flex-shrink-0"></span>
          </div>
        </div>

        {/* Bottom Video Sound & Playback Controls */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 flex items-center gap-1.5 sm:gap-2 bg-black/70 backdrop-blur-md border border-white/20 rounded-full p-1 sm:p-1.5 shadow-2xl">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-white/20 text-gray-200 hover:text-white transition"
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            title={isMuted ? 'Unmute background music' : 'Mute background music'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#f4a51c]" />}
          </button>
          <button
            onClick={togglePlay}
            className="p-2 rounded-full hover:bg-white/20 text-gray-200 hover:text-white transition"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            title={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#f4a51c]" />}
          </button>
        </div>
      </section>

      {/* 2. WELCOME TO MUSIC MAESTRO SECTION */}
      <section className="py-14 sm:py-20 px-4 border-y border-wom-darkBorder bg-[#0e1219]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block w-12 h-1 bg-wom-gold mb-5 sm:mb-6 rounded-full"></div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-raleway text-white mb-5 sm:mb-6 leading-tight">
            Welcome to Music Maestro – Your Premier Destination to Hire Artists for Events
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            Welcome to Music Maestro, where your quest to hire artists for events, musicians, and top entertainers comes to a fulfilling end. Whether you are planning a corporate event, a private party, a wedding, or a grand concert, we provide a seamless and exhilarating musician booking experience.
            <br className="hidden sm:inline" />
            Our extensive network features the world’s best artists, from renowned music bands to versatile DJs, ensuring that every event is an unforgettable musical journey.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/event-inquiry"
              className="w-full sm:w-auto px-8 py-3.5 bg-wom-gold hover:bg-wom-goldHover text-black font-extrabold text-sm rounded-xl transition shadow-gold flex items-center justify-center gap-2"
            >
              Enquire Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/artists"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#181f2c] hover:bg-white/10 text-white border border-wom-darkBorder text-sm font-bold rounded-xl transition text-center"
            >
              Explore Artist Bank
            </Link>
          </div>
        </div>
      </section>

      {/* 3. EXCLUSIVE TALENT / FEATURED ARTISTS CAROUSEL */}
      <section className="py-14 sm:py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 text-wom-gold text-xs font-bold uppercase tracking-widest mb-2">
              <Star className="w-4 h-4 fill-current" />
              Curate Your Experience
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-raleway text-white">
              Exclusive Talent & Top Performers
            </h2>
          </div>
          <Link
            to="/artists?featured=true"
            className="mt-3 md:mt-0 text-sm font-bold text-wom-gold hover:underline flex items-center gap-1 group"
          >
            <span>View all featured artists</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 bg-[#131822] rounded-2xl animate-pulse border border-wom-darkBorder"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(featuredArtists.length > 0 ? featuredArtists.slice(0, 4) : topTalent.slice(0, 4)).map((artist) => (
              <ArtistCard key={artist._id} artist={artist} />
            ))}
          </div>
        )}
      </section>

      {/* 4. SPLIT COLLAGE SHOWCASE: FROM SINGERS, BANDS TO DJS */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-[#0c1017] via-[#111622] to-[#0c1017] border-y border-wom-darkBorder px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-raleway text-white mb-3 sm:mb-4">
              From Singers, Bands to DJs and more — we have got them all
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Browse through our hand-picked repertoire of verified musical icons, Sufi vocalists, and high-energy club acts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Spotlight Card 1 */}
            <div className="group relative rounded-2xl overflow-hidden bg-[#181f2c] border border-wom-darkBorder aspect-[4/4] sm:aspect-[4/5] flex flex-col justify-end p-5 sm:p-6">
              <img
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80"
                alt="Manmeet Live"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="relative z-10">
                <span className="px-2.5 py-1 bg-wom-gold text-black text-xs font-bold rounded mb-2 inline-block">
                  Bollywood Sensation
                </span>
                <h3 className="text-2xl font-bold text-white font-raleway">Manmeet</h3>
                <p className="text-xs text-gray-300 mt-1 mb-4">
                  Over 2,000+ explosive shows for high-profile weddings and concerts.
                </p>
                <Link
                  to="/artist/manmeet"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-wom-gold hover:text-white transition"
                >
                  View Profile & Performances &rarr;
                </Link>
              </div>
            </div>

            {/* Spotlight Card 2 */}
            <div className="group relative rounded-2xl overflow-hidden bg-[#181f2c] border border-wom-darkBorder aspect-[4/4] sm:aspect-[4/5] flex flex-col justify-end p-5 sm:p-6">
              <img
                src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80"
                alt="Celebrity Playback"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="relative z-10">
                <span className="px-2.5 py-1 bg-wom-gold text-black text-xs font-bold rounded mb-2 inline-block">
                  Celebrity Headline
                </span>
                <h3 className="text-2xl font-bold text-white font-raleway">Sonu Nigam</h3>
                <p className="text-xs text-gray-300 mt-1 mb-4">
                  Legendary playback voice for arena concerts & royal milestones.
                </p>
                <Link
                  to="/artist/sonu-nigam"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-wom-gold hover:text-white transition"
                >
                  View Profile & Enquire &rarr;
                </Link>
              </div>
            </div>

            {/* Spotlight Card 3 */}
            <div className="group relative rounded-2xl overflow-hidden bg-[#181f2c] border border-wom-darkBorder aspect-[4/4] sm:aspect-[4/5] flex flex-col justify-end p-5 sm:p-6">
              <img
                src="https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=1200&q=80"
                alt="DJ Saggy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="relative z-10">
                <span className="px-2.5 py-1 bg-wom-gold text-black text-xs font-bold rounded mb-2 inline-block">
                  DJ Services
                </span>
                <h3 className="text-2xl font-bold text-white font-raleway">DJ Saggy</h3>
                <p className="text-xs text-gray-300 mt-1 mb-4">
                  Club-tested festival beats and Punjabi-Bollywood dance drops.
                </p>
                <Link
                  to="/artist/dj-saggy"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-wom-gold hover:text-white transition"
                >
                  View DJ Sets & Availability &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. A WORLD OF CREATIVITY: 3-COLUMN THEMATIC CARDS */}
      <section className="py-14 sm:py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-block w-12 h-1 bg-wom-gold mb-4 rounded-full"></div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-raleway text-white mb-3 sm:mb-4">
            A World of Creativity: Artists for Every Mood and Milestone
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Our artist portfolio spans across diverse genres to create the exact mood and atmosphere your event demands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          <div className="p-6 sm:p-8 bg-[#131822] border border-wom-darkBorder rounded-2xl hover:border-wom-gold/50 transition duration-300 group hover:-translate-y-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-wom-gold/10 border border-wom-gold/30 flex items-center justify-center text-wom-gold mb-5 sm:mb-6 group-hover:scale-110 transition">
              <Mic className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-raleway mb-2.5 sm:mb-3">
              Love Songs & Karaoke
            </h3>
            <p className="text-xs leading-relaxed text-gray-400">
              Sing along with renowned artists like Javed Ali, Shankar Mahadevan, and versatile unplugged performers. Enjoy a night of nostalgic melodies, acoustic intimate dinners, and heartfelt wedding songs.
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-[#131822] border border-wom-darkBorder rounded-2xl hover:border-wom-gold/50 transition duration-300 group hover:-translate-y-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-wom-gold/10 border border-wom-gold/30 flex items-center justify-center text-wom-gold mb-5 sm:mb-6 group-hover:scale-110 transition">
              <Music2 className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-raleway mb-2.5 sm:mb-3">
              Classical Music & Instrumental
            </h3>
            <p className="text-xs leading-relaxed text-gray-400">
              Experience the timeless beauty of classical Indian ragas and world-class instrumental performances by famous flutists, electric violinists, jal tarang masters, and jazz saxophonists.
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-[#131822] border border-wom-darkBorder rounded-2xl hover:border-wom-gold/50 transition duration-300 group hover:-translate-y-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-wom-gold/10 border border-wom-gold/30 flex items-center justify-center text-wom-gold mb-5 sm:mb-6 group-hover:scale-110 transition">
              <Disc className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-raleway mb-2.5 sm:mb-3">
              Rappers & Club DJs
            </h3>
            <p className="text-xs leading-relaxed text-gray-400">
              Groove to the beats of top rappers in India, EDM producers, and international club DJs like Badshah, Asees Kaur, and wedding party mixmasters who keep the energy soaring all night long.
            </p>
          </div>
        </div>
      </section>

      {/* 6. WHERE PRODUCTIVITY MEETS PLAY - CORPORATE ENTERTAINMENT */}
      <section className="py-14 sm:py-20 px-4 bg-gradient-to-r from-[#111622] via-[#161c2b] to-[#111622] border-y border-wom-darkBorder">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
          <div className="lg:w-1/2 space-y-5 sm:space-y-6">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-wom-gold bg-wom-gold/10 px-3 py-1 rounded-md border border-wom-gold/30">
              Corporate Entertainment Specialist
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-raleway text-white leading-tight">
              Where Productivity Meets Play: Crafting the Ideal Corporate Entertainment
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Planning a corporate event for team building, an annual conference, or a grand product launch? Music Maestro offers an extensive roster of artists who provide the perfect backdrop for networking, client appreciation, and high-impact celebration.
            </p>
            <p className="text-xs text-gray-400">
              Trusted by corporate clients such as Junglee Games (Goa Retreat), Bajaj IBU Business Conference, and SKIL Events for unforgettable entertainment production.
            </p>

            <div className="pt-2">
              <Link
                to="/event-inquiry?eventType=Corporate"
                className="w-full sm:w-auto px-8 py-3.5 bg-wom-gold hover:bg-wom-goldHover text-black font-extrabold text-sm rounded-xl transition shadow-gold inline-flex items-center justify-center gap-2"
              >
                Plan Corporate Event
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 w-full grid grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-[#121622] border border-wom-darkBorder p-4 sm:p-6 rounded-2xl text-center">
              <span className="text-2xl sm:text-4xl font-extrabold text-wom-gold font-raleway block">
                2,000+
              </span>
              <span className="text-[11px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1 block">
                Shows Delivered
              </span>
            </div>
            <div className="bg-[#121622] border border-wom-darkBorder p-4 sm:p-6 rounded-2xl text-center">
              <span className="text-2xl sm:text-4xl font-extrabold text-wom-gold font-raleway block">
                500+
              </span>
              <span className="text-[11px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1 block">
                Vetted Artists
              </span>
            </div>
            <div className="bg-[#121622] border border-wom-darkBorder p-4 sm:p-6 rounded-2xl text-center">
              <span className="text-2xl sm:text-4xl font-extrabold text-wom-gold font-raleway block">
                35+
              </span>
              <span className="text-[11px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1 block">
                Cities Across India
              </span>
            </div>
            <div className="bg-[#121622] border border-wom-darkBorder p-4 sm:p-6 rounded-2xl text-center">
              <span className="text-2xl sm:text-4xl font-extrabold text-wom-gold font-raleway block">
                99%
              </span>
              <span className="text-[11px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider mt-1 block">
                Client Satisfaction
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS 3-STEP TIMELINE */}
      <section className="py-14 sm:py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-block w-12 h-1 bg-wom-gold mb-4 rounded-full"></div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-raleway text-white mb-3">
            How It Works?
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Booking your dream artist or getting booked as a performer takes just three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 relative">
          {/* Step 1 */}
          <div className="bg-[#131822] border border-wom-darkBorder p-6 sm:p-8 rounded-2xl relative text-center group hover:border-wom-gold/60 transition">
            <div className="w-12 h-12 mx-auto rounded-full bg-wom-gold text-black font-extrabold text-lg flex items-center justify-center mb-5 sm:mb-6 shadow-gold">
              1
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-raleway">
              Register Yourself
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Create an account as a client looking to hire talent, or as an artist ready to showcase your musical craft to event planners.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#131822] border border-wom-darkBorder p-6 sm:p-8 rounded-2xl relative text-center group hover:border-wom-gold/60 transition">
            <div className="w-12 h-12 mx-auto rounded-full bg-wom-gold text-black font-extrabold text-lg flex items-center justify-center mb-5 sm:mb-6 shadow-gold">
              2
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-raleway">
              Browse or Add Listing
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Explore 500+ curated artist profiles with video clips, audio demos, and real pricing, or submit your own artist portfolio to the Music Maestro directory.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#131822] border border-wom-darkBorder p-6 sm:p-8 rounded-2xl relative text-center group hover:border-wom-gold/60 transition">
            <div className="w-12 h-12 mx-auto rounded-full bg-wom-gold text-black font-extrabold text-lg flex items-center justify-center mb-5 sm:mb-6 shadow-gold">
              3
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-raleway">
              Get Bookings & Celebrate
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Receive tailored quotes, finalize performance requirements, and enjoy an electrifying show backed by our dedicated support team.
            </p>
          </div>
        </div>
      </section>

      {/* 8. WHY CHOOSE MUSIC MAESTRO */}
      <section className="py-14 sm:py-20 px-4 bg-[#0e1219] border-y border-wom-darkBorder">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-raleway text-white mb-3">
              Why Choose Music Maestro?
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Choosing the right entertainment for your event can be daunting, but Music Maestro simplifies the entire process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            <div className="bg-[#131822] p-6 sm:p-8 rounded-2xl border border-wom-darkBorder space-y-3">
              <div className="w-10 h-10 rounded-xl bg-wom-gold/10 text-wom-gold flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-raleway">
                Extensive Network of Artists
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                From celebrity headline acts like Sonu Nigam and Javed Ali to underground indie bands and classical soloists, our directory spans every region and budget in India.
              </p>
            </div>

            <div className="bg-[#131822] p-6 sm:p-8 rounded-2xl border border-wom-darkBorder space-y-3">
              <div className="w-10 h-10 rounded-xl bg-wom-gold/10 text-wom-gold flex items-center justify-center mb-4">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-raleway">
                Easy & Transparent Booking
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Transparent starting fees, verified video recordings, customer feedback, and instant response coordinators make booking seamless and risk-free.
              </p>
            </div>

            <div className="bg-[#131822] p-6 sm:p-8 rounded-2xl border border-wom-darkBorder space-y-3">
              <div className="w-10 h-10 rounded-xl bg-wom-gold/10 text-wom-gold flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-raleway">
                Tailored Solutions
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                No two events are alike. Our seasoned artist managers consult with you on technical riders, set durations, and repertoire to create custom-tailored entertainment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BRAND COLLABORATIONS & TRUST */}
      <section className="py-12 sm:py-20 px-4 max-w-7xl mx-auto text-center">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 sm:mb-8">
          Elevating Excellence, Collaborating with India's Finest Event Brands
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
          <div className="font-extrabold text-base sm:text-xl tracking-wider text-gray-300 hover:text-wom-gold transition font-raleway">
            SKIL EVENTS
          </div>
          <div className="font-extrabold text-base sm:text-xl tracking-wider text-gray-300 hover:text-wom-gold transition font-raleway">
            JUNGLEE GAMES
          </div>
          <div className="font-extrabold text-base sm:text-xl tracking-wider text-gray-300 hover:text-wom-gold transition font-raleway">
            BAJAJ IBU
          </div>
          <div className="font-extrabold text-base sm:text-xl tracking-wider text-gray-300 hover:text-wom-gold transition font-raleway">
            THE LALIT GOA
          </div>
          <div className="font-extrabold text-base sm:text-xl tracking-wider text-gray-300 hover:text-wom-gold transition font-raleway">
            TAJ HOTELS
          </div>
        </div>
      </section>

      {/* 10. FINAL CALL TO ACTION BANNER */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-t from-black via-[#0f1420] to-[#0b0e14] border-t border-wom-darkBorder text-center">
        <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6">
          <h2 className="text-2xl sm:text-5xl font-extrabold font-raleway text-white leading-tight">
            Elevate Your Vision: Book Now and Transform Your Event
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Ready to make your event unforgettable? Hire musicians and top entertainers from Music Maestro today. Explore artist profiles, listen to audio samples, and submit your inquiry with confidence.
          </p>
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/artists"
              className="w-full sm:w-auto px-8 py-4 bg-wom-gold hover:bg-wom-goldHover text-black font-extrabold text-sm rounded-xl transition shadow-gold flex items-center justify-center gap-2"
            >
              Book Your Artist Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-[#181f2c] hover:bg-white/10 text-white border border-wom-darkBorder text-sm font-bold rounded-xl transition text-center"
            >
              Contact Our Coordinators
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
