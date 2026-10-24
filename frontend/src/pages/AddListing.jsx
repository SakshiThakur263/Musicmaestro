import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createArtistListing } from '../services/api';
import {
  Music,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Upload,
  Video,
  DollarSign,
  MapPin,
  Mic2,
} from 'lucide-react';

const AddListing = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    category: 'Live Bands',
    subcategory: 'Bollywood',
    location: 'Mumbai',
    bio: '',
    priceStarting: 35000,
    featuredImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    genres: 'Bollywood, Unplugged, Pop',
    languages: 'Hindi, English',
    performanceTypes: 'Weddings, Corporate Events, Cocktails',
    videoUrl: '',
    instagram: '',
  });

  const [loading, setLoading] = useState(false);
  const [successArtist, setSuccessArtist] = useState(null);
  const [error, setError] = useState('');

  const sampleImageOptions = [
    { label: 'Acoustic / Singer', url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80' },
    { label: 'Live Band Stage', url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80' },
    { label: 'DJ Console', url: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=800&q=80' },
    { label: 'Violin / Classical', url: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=800&q=80' },
    { label: 'Anchor / Speaker', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        tagline: formData.tagline || `${formData.subcategory} Performer in ${formData.location}`,
        category: formData.category,
        subcategory: formData.subcategory,
        location: formData.location,
        bio: formData.bio,
        priceStarting: Number(formData.priceStarting),
        featuredImage: formData.featuredImage,
        images: [formData.featuredImage],
        genres: formData.genres.split(',').map((g) => g.trim()),
        languages: formData.languages.split(',').map((l) => l.trim()),
        performanceTypes: formData.performanceTypes.split(',').map((p) => p.trim()),
        videos: formData.videoUrl
          ? [
              {
                title: `${formData.name} Live Demo`,
                url: formData.videoUrl,
                embedUrl: formData.videoUrl.includes('watch?v=')
                  ? formData.videoUrl.replace('watch?v=', 'embed/')
                  : formData.videoUrl,
              },
            ]
          : [],
        socialLinks: {
          instagram: formData.instagram,
        },
      };

      const res = await createArtistListing(payload);
      if (res.success) {
        setSuccessArtist(res.data);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to create listing. Please check inputs.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] pt-28 pb-20 text-white">
      {/* Banner */}
      <div className="bg-[#0e121a] border-b border-wom-darkBorder py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-wom-gold/15 text-wom-gold border border-wom-gold/30 rounded-full text-xs font-bold uppercase tracking-wider">
            <Mic2 className="w-3.5 h-3.5" />
            Artist Onboarding Portal
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-raleway text-white">
            Add Your Artist Listing
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
            Join World of Musicians. Connect with event organizers, luxury wedding planners, and corporate bookers across India.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-[#121622] border border-wom-darkBorder rounded-2xl p-6 sm:p-10 shadow-2xl">
          {successArtist ? (
            <div className="text-center py-10 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto border border-green-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-raleway text-white">
                Congratulations, {successArtist.name}!
              </h2>
              <p className="text-sm text-gray-300 max-w-md mx-auto">
                Your artist profile has been published and is now live in the World of Musicians Artist Bank.
              </p>

              <div className="p-4 bg-[#181f2c] border border-wom-darkBorder rounded-xl max-w-sm mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white font-bold">{successArtist.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span className="text-white font-bold">{successArtist.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Starting Fee:</span>
                  <span className="text-wom-gold font-bold">
                    Rs. {Number(successArtist.priceStarting).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to={`/artist/${successArtist.slug}`}
                  className="px-6 py-3 bg-wom-gold text-black font-extrabold text-xs rounded-xl shadow-gold transition"
                >
                  View Live Profile
                </Link>
                <button
                  onClick={() => {
                    setSuccessArtist(null);
                    setFormData({
                      name: '',
                      tagline: '',
                      category: 'Live Bands',
                      subcategory: 'Bollywood',
                      location: 'Mumbai',
                      bio: '',
                      priceStarting: 35000,
                      featuredImage: sampleImageOptions[0].url,
                      genres: 'Bollywood, Unplugged',
                      languages: 'Hindi, English',
                      performanceTypes: 'Weddings, Corporate Events',
                      videoUrl: '',
                      instagram: '',
                    });
                  }}
                  className="px-6 py-3 bg-[#181f2c] border border-wom-darkBorder hover:border-wom-gold text-white text-xs font-semibold rounded-xl transition"
                >
                  Add Another Profile
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-wom-gold border-b border-wom-darkBorder pb-2">
                  1. Artist Profile Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Artist / Band Stage Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Roohani Fusion Band"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Tagline / Headline
                    </label>
                    <input
                      type="text"
                      name="tagline"
                      placeholder="e.g. High Energy Bollywood & Sufi Fusion Act"
                      value={formData.tagline}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold cursor-pointer"
                    >
                      <option value="Live Bands">Live Bands</option>
                      <option value="Solo Performer">Solo Performer</option>
                      <option value="DJ Services">DJ Services</option>
                      <option value="Others">Others (Anchors / Comedians)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Subcategory *
                    </label>
                    <input
                      type="text"
                      name="subcategory"
                      required
                      placeholder="e.g. Singer Guitarist, Bollywood Band, DJ"
                      value={formData.subcategory}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Base Location (City) *
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      placeholder="e.g. Mumbai"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Bio / Performance Description * (min 20 characters)
                  </label>
                  <textarea
                    name="bio"
                    required
                    rows="4"
                    placeholder="Highlight your musical background, major achievements, set duration, and event specialties..."
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                  ></textarea>
                </div>
              </div>

              {/* Pricing & Media */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-wom-gold border-b border-wom-darkBorder pb-2">
                  2. Pricing & Visual Media
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Starting Performance Fee (INR) *
                    </label>
                    <input
                      type="number"
                      name="priceStarting"
                      required
                      min="5000"
                      step="5000"
                      value={formData.priceStarting}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      YouTube Demo Performance Video Link
                    </label>
                    <input
                      type="url"
                      name="videoUrl"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={formData.videoUrl}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Profile Image URL *
                  </label>
                  <input
                    type="url"
                    name="featuredImage"
                    required
                    value={formData.featuredImage}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                  />
                  <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-gray-400">
                    <span>Or select sample preset:</span>
                    {sampleImageOptions.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormData({ ...formData, featuredImage: opt.url })}
                        className="text-wom-gold underline hover:text-white"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags & Extras */}
              <div className="space-y-4 pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-wom-gold border-b border-wom-darkBorder pb-2">
                  3. Performance Repertoire
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Genres (comma separated)
                    </label>
                    <input
                      type="text"
                      name="genres"
                      value={formData.genres}
                      onChange={handleChange}
                      placeholder="Bollywood, Sufi, Pop"
                      className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Languages (comma separated)
                    </label>
                    <input
                      type="text"
                      name="languages"
                      value={formData.languages}
                      onChange={handleChange}
                      placeholder="Hindi, English, Punjabi"
                      className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Instagram Handle
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="@artist_official"
                      className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-wom-gold hover:bg-wom-goldHover text-black font-extrabold text-sm rounded-xl transition shadow-gold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <PlusCircle className="w-5 h-5" />
                    <span>Publish Artist Profile to Directory</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddListing;
