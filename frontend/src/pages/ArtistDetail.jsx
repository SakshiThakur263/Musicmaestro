import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArtistBySlug, submitInquiry, submitArtistReview } from '../services/api';
import ArtistCard from '../components/ArtistCard';
import { ARTISTS_CATALOG, findCatalogArtistBySlug } from '../utils/artistsCatalog';
import {
  Star,
  MapPin,
  Heart,
  Share2,
  CheckCircle2,
  Calendar,
  Clock,
  Music,
  Video,
  Play,
  Volume2,
  MessageSquare,
  Images,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  Send,
  AlertCircle,
} from 'lucide-react';

const ArtistDetail = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'gallery' | 'video' | 'audio' | 'reviews'
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Booking widget form state
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Wedding',
    eventDate: '',
    city: '',
    guestCount: '100-300',
    budget: 'Rs. 50,000 - 1,00,000',
    notes: '',
  });

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [bookingError, setBookingError] = useState('');

  // Review form state
  const [reviewForm, setReviewForm] = useState({
    reviewerName: '',
    reviewerEmail: '',
    rating: 5,
    eventType: 'Wedding',
    comment: '',
  });
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState('');
  const [reviewError, setReviewError] = useState('');

  // Audio playing state
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const buildCatalogFallback = (targetSlug) => {
      const catArtist = findCatalogArtistBySlug(targetSlug);
      if (!catArtist) return null;
      const similar = ARTISTS_CATALOG.filter(
        (a) =>
          a.slug !== catArtist.slug &&
          (a.category === catArtist.category || a.location === catArtist.location)
      ).slice(0, 4);
      return {
        artist: catArtist,
        reviews: [
          {
            _id: 'rev-1',
            reviewerName: 'Aarav Mehta (Corporate Event Head)',
            rating: 5,
            eventType: 'Corporate Gala',
            comment: `${catArtist.name} delivered an electrifying performance! Every guest was thoroughly entertained.`,
          },
          {
            _id: 'rev-2',
            reviewerName: 'Priya & Rohan Singhania',
            rating: 5,
            eventType: 'Destination Wedding',
            comment: 'Superb stage energy, punctual team, and seamless coordination through Music Maestro.',
          },
        ],
        similarArtists: similar,
      };
    };

    const loadArtist = async () => {
      setLoading(true);
      try {
        const res = await fetchArtistBySlug(slug);
        if (res.success && res.data?.artist) {
          setData(res.data);
          setBookingForm((prev) => ({
            ...prev,
            city: res.data.artist.location || '',
          }));
        } else {
          const fallback = buildCatalogFallback(slug);
          if (fallback) {
            setData(fallback);
            setBookingForm((prev) => ({
              ...prev,
              city: fallback.artist.location || '',
            }));
          }
        }
      } catch (err) {
        const fallback = buildCatalogFallback(slug);
        if (fallback) {
          setData(fallback);
          setBookingForm((prev) => ({
            ...prev,
            city: fallback.artist.location || '',
          }));
        } else {
          console.error('Error fetching artist:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    loadArtist();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
    setBookingError('');
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError('');
    setBookingLoading(true);

    try {
      const payload = {
        ...bookingForm,
        artistName: data.artist.name,
        category: data.artist.category,
      };
      if (data.artist._id && !String(data.artist._id).startsWith('cat-')) {
        payload.artistId = data.artist._id;
      }
      const res = await submitInquiry(payload);

      if (res.success) {
        setBookingSuccess(res);
      }
    } catch (err) {
      setBookingError(
        err.response?.data?.message || err.message || 'Failed to submit inquiry. Please try again.'
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError('');
    setReviewLoading(true);

    try {
      const res = await submitArtistReview(data.artist._id, reviewForm);
      if (res.success) {
        setReviewSuccess('Your review has been published. Thank you!');
        // Update local reviews list
        setData((prev) => ({
          ...prev,
          reviews: [res.data, ...(prev.reviews || [])],
          artist: {
            ...prev.artist,
            rating: res.updatedArtist.rating,
            reviewCount: res.updatedArtist.reviewCount,
          },
        }));
        setReviewForm({
          reviewerName: '',
          reviewerEmail: '',
          rating: 5,
          eventType: 'Wedding',
          comment: '',
        });
      }
    } catch (err) {
      setReviewError(
        err.response?.data?.message || err.message || 'Failed to submit review.'
      );
    } finally {
      setReviewLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0e14] pt-32 pb-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-wom-gold border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-gray-400">Loading artist profile...</span>
        </div>
      </div>
    );
  }

  if (!data?.artist) {
    return (
      <div className="min-h-screen bg-[#0b0e14] pt-32 pb-20 text-center px-4">
        <h2 className="text-3xl font-bold text-white mb-4">Artist Not Found</h2>
        <p className="text-gray-400 mb-6">The requested artist profile does not exist or has been removed.</p>
        <Link
          to="/artists"
          className="px-6 py-2.5 bg-wom-gold text-black font-bold text-xs rounded-xl shadow-gold"
        >
          Return to Artist Bank
        </Link>
      </div>
    );
  }

  const { artist, reviews, similarArtists } = data;
  const allImages = artist.images && artist.images.length > 0 ? artist.images : [artist.featuredImage];

  return (
    <div className="min-h-screen bg-[#0b0e14] pt-20 sm:pt-28 pb-16 sm:pb-20 text-white">
      {/* 1. Header Titlebar matching WOM */}
      <div className="bg-[#0e121a] border-b border-wom-darkBorder py-6 sm:py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded bg-wom-gold/15 text-wom-gold border border-wom-gold/30 text-xs font-bold">
                {artist.category}
              </span>
              <span className="text-xs text-gray-400">• {artist.subcategory}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-raleway text-white flex items-center gap-2">
              <span>{artist.name}</span>
              {artist.verified && (
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-wom-gold flex-shrink-0" title="Verified Artist by Music Maestro" />
              )}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-400 mt-2">
              <span className="flex items-center gap-1 text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-wom-gold" />
                {artist.location}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-wom-gold fill-wom-gold" />
                <strong className="text-white font-bold">{artist.rating}</strong> ({artist.reviewCount} reviews)
              </span>
              <span>• {artist.showsCompleted}+ shows completed</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex-1 sm:flex-initial justify-center flex items-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-xl text-xs font-semibold border transition ${
                isBookmarked
                  ? 'bg-red-500/20 text-red-400 border-red-500/40'
                  : 'bg-[#181f2c] text-gray-300 border-wom-darkBorder hover:border-gray-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current text-red-500' : ''}`} />
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>

            <button
              onClick={handleShare}
              className="flex-1 sm:flex-initial justify-center flex items-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-xl text-xs font-semibold bg-[#181f2c] border border-wom-darkBorder hover:border-wom-gold text-gray-300 transition"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink ? 'Link Copied!' : 'Share'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        {/* 2. Photo Gallery Grid matching WOM single listing */}
        <div className="relative rounded-2xl overflow-hidden mb-6 sm:mb-10 bg-[#121622] border border-wom-darkBorder">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[240px] sm:h-[360px] md:h-[440px]">
            {/* Left Big Picture */}
            <div
              className="relative h-full overflow-hidden cursor-pointer group"
              onClick={() => setGalleryModalOpen(true)}
            >
              <img
                src={allImages[0] || artist.featuredImage}
                alt={artist.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>

            {/* Right Two Stacked Pictures */}
            <div className="hidden md:grid grid-rows-2 gap-2 h-full">
              <div
                className="relative h-full overflow-hidden cursor-pointer group"
                onClick={() => setGalleryModalOpen(true)}
              >
                <img
                  src={allImages[1] || allImages[0]}
                  alt={`${artist.name} 2`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div
                className="relative h-full overflow-hidden cursor-pointer group"
                onClick={() => setGalleryModalOpen(true)}
              >
                <img
                  src={allImages[2] || allImages[0]}
                  alt={`${artist.name} 3`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
            </div>
          </div>

          {/* Show All Photos Button on Top of Gallery */}
          <button
            onClick={() => setGalleryModalOpen(true)}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-3.5 py-2 sm:px-4 bg-black/80 hover:bg-black text-white text-xs font-bold rounded-xl backdrop-blur-md border border-white/20 flex items-center gap-2 transition"
          >
            <Images className="w-4 h-4 text-wom-gold" />
            Show All Photos ({allImages.length})
          </button>
        </div>

        {/* Mobile Quick Price & Book CTA Bar */}
        <div className="lg:hidden mb-6 p-4 bg-[#121622] border border-wom-gold/40 rounded-2xl flex items-center justify-between gap-3 shadow-lg">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold block">
              Starting Fee
            </span>
            <span className="text-base font-extrabold text-wom-gold font-raleway">
              Rs. {Number(artist.priceStarting || 25000).toLocaleString('en-IN')}
            </span>
          </div>
          <a
            href="#booking-desk"
            className="px-5 py-2.5 bg-wom-gold hover:bg-wom-goldHover text-black font-extrabold text-xs rounded-xl shadow-gold flex items-center gap-1.5 transition"
          >
            <span>Hire Artist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3. Main Two-Column Layout: Left Content & Right Sticky Booking Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-start">
          {/* Left Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8 min-w-0">
            {/* Interactive Tabs Navigation */}
            <div className="flex items-center gap-1.5 sm:gap-2 border-b border-wom-darkBorder pb-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              {[
                { id: 'overview', label: 'Overview', icon: Music },
                { id: 'video', label: 'Videos', icon: Video },
                { id: 'audio', label: 'Audio Samples', icon: Volume2 },
                { id: 'reviews', label: `Reviews (${reviews?.length || 0})`, icon: MessageSquare },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-wom-gold text-black shadow-gold-sm'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6 sm:space-y-8 animate-fadeIn">
                <div className="bg-[#121622] border border-wom-darkBorder rounded-2xl p-5 sm:p-7 space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white font-raleway">About {artist.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                    {artist.bio}
                  </p>
                </div>

                {/* Performance Specifics Grid */}
                <div className="bg-[#121622] border border-wom-darkBorder rounded-2xl p-5 sm:p-7 space-y-5 sm:space-y-6">
                  <h3 className="text-base sm:text-lg font-bold text-white font-raleway border-b border-wom-darkBorder pb-3">
                    Performance Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                    <div>
                      <span className="text-gray-400 uppercase tracking-wider font-semibold block mb-2">
                        Genres & Styles
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {artist.genres?.map((g, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-[#1a2130] text-gray-200 border border-wom-darkBorder rounded-md"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-gray-400 uppercase tracking-wider font-semibold block mb-2">
                        Languages
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {artist.languages?.map((lang, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-[#1a2130] text-gray-200 border border-wom-darkBorder rounded-md"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-gray-400 uppercase tracking-wider font-semibold block mb-2">
                        Ideal Event Types
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {artist.performanceTypes?.map((ev, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-wom-gold/10 text-wom-gold border border-wom-gold/30 rounded-md font-medium"
                          >
                            {ev}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-gray-400 uppercase tracking-wider font-semibold block mb-2">
                        Verified Booking Guarantee
                      </span>
                      <div className="flex items-center gap-2 text-green-400 font-medium">
                        <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                        <span>Direct Artist Management & Rider Assistance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: VIDEOS */}
            {activeTab === 'video' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-[#121622] border border-wom-darkBorder rounded-2xl p-5 sm:p-7">
                  <h3 className="text-lg sm:text-xl font-bold text-white font-raleway mb-5 sm:mb-6">
                    Live Video Performances
                  </h3>

                  {artist.videos && artist.videos.length > 0 ? (
                    <div className="space-y-6">
                      {artist.videos.map((vid, idx) => (
                        <div key={idx} className="space-y-2">
                          <h4 className="text-sm font-semibold text-gray-200">{vid.title}</h4>
                          <div className="relative aspect-video rounded-xl overflow-hidden border border-wom-darkBorder bg-black">
                            <iframe
                              src={vid.embedUrl || vid.url}
                              title={vid.title}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 text-gray-400 text-xs">
                      No video recordings currently uploaded for this artist.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: AUDIO SAMPLES */}
            {activeTab === 'audio' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-[#121622] border border-wom-darkBorder rounded-2xl p-5 sm:p-7">
                  <h3 className="text-lg sm:text-xl font-bold text-white font-raleway mb-3 sm:mb-4">Audio Tracks & Demos</h3>
                  <p className="text-xs text-gray-400 mb-5 sm:mb-6">
                    Listen to live acoustic clips and studio recordings from {artist.name}.
                  </p>

                  <div className="space-y-3">
                    {artist.audioSamples && artist.audioSamples.length > 0 ? (
                      artist.audioSamples.map((track, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-3 p-3.5 sm:p-4 bg-[#181f2c] border border-wom-darkBorder rounded-xl hover:border-wom-gold transition"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <button
                              onClick={() => {
                                if (currentAudio === track.url && isPlaying) {
                                  setIsPlaying(false);
                                } else {
                                  setCurrentAudio(track.url);
                                  setIsPlaying(true);
                                }
                              }}
                              className="w-10 h-10 flex-shrink-0 rounded-full bg-wom-gold text-black flex items-center justify-center hover:scale-105 transition shadow-gold-sm"
                            >
                              <Play className="w-5 h-5 fill-current ml-0.5" />
                            </button>
                            <div className="min-w-0">
                              <span className="text-xs sm:text-sm font-bold text-white block truncate">{track.title}</span>
                              <span className="text-xs text-gray-400">{track.duration || '3:20'}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-wom-gold font-bold flex-shrink-0">
                            <Volume2 className="w-4 h-4 animate-pulse" />
                            <span className="hidden sm:inline">Preview</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-xs text-gray-400">
                        Audio samples available upon booking request.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-6 sm:space-y-8 animate-fadeIn">
                {/* List Existing Reviews */}
                <div className="bg-[#121622] border border-wom-darkBorder rounded-2xl p-5 sm:p-7 space-y-5 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-wom-darkBorder pb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white font-raleway">
                      Client Reviews ({reviews?.length || 0})
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-wom-gold">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{artist.rating} Average Rating</span>
                    </div>
                  </div>

                  {reviews && reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map((rev) => (
                        <div
                          key={rev._id}
                          className="p-4 bg-[#181f2c] border border-wom-darkBorder rounded-xl space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-white truncate">{rev.reviewerName}</span>
                            <div className="flex items-center gap-1 text-wom-gold flex-shrink-0">
                              {Array.from({ length: rev.rating }).map((_, idx) => (
                                <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                              ))}
                            </div>
                          </div>
                          <span className="text-[11px] text-wom-gold/80 font-semibold block">
                            Event: {rev.eventType}
                          </span>
                          <p className="text-xs text-gray-300 leading-relaxed">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 py-4">
                      No reviews yet for this artist. Booked clients can leave a review below!
                    </p>
                  )}
                </div>

                {/* Add Review Form */}
                <div className="bg-[#121622] border border-wom-darkBorder rounded-2xl p-5 sm:p-7 space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-white font-raleway">Leave a Verified Review</h3>

                  {reviewSuccess && (
                    <div className="p-3 bg-green-500/10 border border-green-500/30 text-green-400 text-xs rounded-lg">
                      {reviewSuccess}
                    </div>
                  )}

                  {reviewError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg">
                      {reviewError}
                    </div>
                  )}

                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={reviewForm.reviewerName}
                          onChange={(e) =>
                            setReviewForm({ ...reviewForm, reviewerName: e.target.value })
                          }
                          placeholder="e.g. Anand Kapoor"
                          className="w-full px-3 py-2.5 sm:py-2 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Rating (1 to 5 Stars)
                        </label>
                        <select
                          value={reviewForm.rating}
                          onChange={(e) =>
                            setReviewForm({ ...reviewForm, rating: Number(e.target.value) })
                          }
                          className="w-full px-3 py-2.5 sm:py-2 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold cursor-pointer"
                        >
                          <option value="5">5 Stars - Outstanding</option>
                          <option value="4">4 Stars - Very Good</option>
                          <option value="3">3 Stars - Good</option>
                          <option value="2">2 Stars - Fair</option>
                          <option value="1">1 Star - Poor</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Event Type</label>
                      <input
                        type="text"
                        value={reviewForm.eventType}
                        onChange={(e) => setReviewForm({ ...reviewForm, eventType: e.target.value })}
                        placeholder="e.g. Wedding Reception, Corporate Annual Meet"
                        className="w-full px-3 py-2.5 sm:py-2 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Your Review</label>
                      <textarea
                        required
                        rows="3"
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        placeholder="Tell others how was the artist's performance, crowd engagement, and punctuality..."
                        className="w-full px-3 py-2.5 sm:py-2 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={reviewLoading}
                      className="w-full sm:w-auto justify-center px-6 py-3 sm:py-2.5 bg-wom-gold hover:bg-wom-goldHover text-black font-bold text-xs rounded-xl shadow-gold flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Submit Review
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Booking Widget matching WOM */}
          <div id="booking-desk" className="lg:sticky lg:top-28 space-y-6 scroll-mt-24">
            <div className="bg-[#121622] border-2 border-wom-gold/40 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5">
              <div className="border-b border-wom-darkBorder pb-4">
                <span className="text-[11px] uppercase font-bold tracking-widest text-wom-gold block">
                  Official Booking Desk
                </span>
                <h3 className="text-xl font-extrabold text-white font-raleway mt-1">
                  Hire {artist.name}
                </h3>
                <div className="mt-2 text-xs text-gray-400">
                  Starting Fee:{' '}
                  <span className="text-wom-gold font-bold text-sm">
                    Rs. {Number(artist.priceStarting || 25000).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {bookingSuccess ? (
                <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Inquiry Received!</h4>
                  <p className="text-xs text-gray-300">
                    Your inquiry reference number is:
                    <strong className="block text-wom-gold text-sm font-mono mt-1">
                      {bookingSuccess.inquiryReference}
                    </strong>
                  </p>
                  <p className="text-[11px] text-gray-400">
                    A Music Maestro artist coordinator will call you back within 24 hours with exact availability and rider details.
                  </p>
                  <button
                    onClick={() => setBookingSuccess(null)}
                    className="text-xs text-wom-gold hover:underline pt-2 block mx-auto"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                  {bookingError && (
                    <div className="p-2.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{bookingError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Event Type *</label>
                    <select
                      name="eventType"
                      value={bookingForm.eventType}
                      onChange={handleBookingChange}
                      className="w-full px-3 py-2.5 sm:py-2 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold cursor-pointer"
                    >
                      <option value="Wedding">Wedding / Sangeet</option>
                      <option value="Corporate">Corporate Annual Meet / Gala</option>
                      <option value="Private Party">Private Party / Birthday</option>
                      <option value="College Fest">College Fest</option>
                      <option value="Concert / Festival">Public Concert / Festival</option>
                      <option value="Other">Other Event</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Event Date *</label>
                      <input
                        type="date"
                        name="eventDate"
                        required
                        value={bookingForm.eventDate}
                        onChange={handleBookingChange}
                        className="w-full px-3 py-2.5 sm:py-2 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">City / Venue *</label>
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="e.g. Mumbai"
                        value={bookingForm.city}
                        onChange={handleBookingChange}
                        className="w-full px-3 py-2.5 sm:py-2 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rahul Singhal"
                      value={bookingForm.name}
                      onChange={handleBookingChange}
                      className="w-full px-3 py-2.5 sm:py-2 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="your@email.com"
                        value={bookingForm.email}
                        onChange={handleBookingChange}
                        className="w-full px-3 py-2.5 sm:py-2 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765..."
                        value={bookingForm.phone}
                        onChange={handleBookingChange}
                        className="w-full px-3 py-2.5 sm:py-2 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Special Requirements / Message
                    </label>
                    <textarea
                      name="notes"
                      rows="2"
                      placeholder="Number of guests, performance duration, setup needs..."
                      value={bookingForm.notes}
                      onChange={handleBookingChange}
                      className="w-full px-3 py-2.5 sm:py-2 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full py-3.5 bg-wom-gold hover:bg-wom-goldHover text-black font-extrabold text-sm rounded-xl transition shadow-gold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {bookingLoading ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Request Availability & Quote</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-gray-400 text-center">
                    Instant confirmation. No upfront charge until the booking contract is signed.
                  </p>
                </form>
              )}
            </div>

            {/* Direct Support Card */}
            <div className="bg-[#121622] border border-wom-darkBorder rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Need Immediate Assistance?
              </h4>
              <p className="text-xs text-gray-400">
                Talk directly to our artist booking desk in Mumbai:
              </p>
              <div className="text-xs font-bold text-wom-gold space-y-1">
                <div>
                  <a
                    href="https://wa.me/919009999434"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Call / WhatsApp: +91 9009999434
                  </a>
                </div>
                <div>
                  <a
                    href="mailto:musicmaestroevent@gmail.com"
                    className="hover:underline break-all"
                  >
                    Email: musicmaestroevent@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Similar Listings Carousel / Grid matching WOM */}
        {similarArtists && similarArtists.length > 0 && (
          <div className="mt-14 sm:mt-20 pt-10 sm:pt-12 border-t border-wom-darkBorder">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold font-raleway text-white">Similar Artists You May Like</h3>
              <Link to="/artists" className="text-xs font-bold text-wom-gold hover:underline flex-shrink-0">
                Browse all &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {similarArtists.map((simArtist) => (
                <ArtistCard key={simArtist._id} artist={simArtist} compact={true} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Gallery Modal Lightbox */}
      {galleryModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-4"
          onClick={() => setGalleryModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90dvh] overflow-y-auto bg-[#131822] border border-wom-darkBorder rounded-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-[#131822]/95 backdrop-blur-md flex items-center justify-between pb-3 sm:pb-4 border-b border-wom-darkBorder mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold text-white truncate pr-2">
                {artist.name} — Photo Gallery
              </h3>
              <button
                onClick={() => setGalleryModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 flex-shrink-0"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {allImages.map((imgUrl, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden aspect-[4/3] bg-black">
                  <img src={imgUrl} alt={`${artist.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistDetail;
