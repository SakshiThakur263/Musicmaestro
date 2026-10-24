import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Heart, ArrowUpRight, Music2, CheckCircle2 } from 'lucide-react';

const ArtistCard = ({ artist, compact = false }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="group relative bg-[#131822] border border-wom-darkBorder rounded-2xl overflow-hidden hover:border-wom-gold/60 transition-all duration-300 hover:shadow-card-dark flex flex-col h-full">
      {/* Image Thumbnail */}
      <Link to={`/artist/${artist.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-slate-900">
        <img
          src={artist.featuredImage}
          alt={artist.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

        {/* Badges on Top */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            {artist.featured && (
              <span className="flex items-center gap-1 px-2.5 py-1 bg-wom-gold text-black text-[11px] font-extrabold uppercase tracking-wider rounded-md shadow-md">
                <Star className="w-3 h-3 fill-current" />
                Featured
              </span>
            )}
            <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium rounded-md border border-white/10">
              {artist.category}
            </span>
          </div>

          <button
            onClick={toggleBookmark}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-90 ${
              isBookmarked
                ? 'bg-red-500 text-white'
                : 'bg-black/60 text-white hover:bg-black/90'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Bookmark this artist'}
          >
            <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Subcategory Pill bottom left on image */}
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-semibold px-2 py-1 bg-wom-gold/90 text-black rounded font-raleway">
            {artist.subcategory}
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link to={`/artist/${artist.slug}`}>
                <h3 className="text-lg font-bold text-white group-hover:text-wom-gold transition font-raleway flex items-center gap-1.5">
                  {artist.name}
                  {artist.verified && (
                    <CheckCircle2 className="w-4 h-4 text-wom-gold inline-block flex-shrink-0" />
                  )}
                </h3>
              </Link>

              <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-wom-gold" />
                <span>{artist.location}</span>
                {artist.showsCompleted && (
                  <span className="text-gray-500">• {artist.showsCompleted}+ shows</span>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 bg-[#1a2130] px-2 py-1 rounded-lg border border-wom-darkBorder text-xs">
              <Star className="w-3.5 h-3.5 text-wom-gold fill-wom-gold" />
              <span className="font-bold text-white">{artist.rating || 4.9}</span>
            </div>
          </div>

          {!compact && (
            <p className="mt-3 text-xs text-gray-400 line-clamp-2 leading-relaxed">
              {artist.bio}
            </p>
          )}
        </div>

        {/* Price & CTA Footer */}
        <div className="mt-4 pt-4 border-t border-wom-darkBorder flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-gray-400 block font-semibold">
              Starting from
            </span>
            <span className="text-sm font-bold text-wom-gold font-raleway">
              Rs. {artist.priceStarting ? Number(artist.priceStarting).toLocaleString('en-IN') : '25,000'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/event-inquiry?artist=${encodeURIComponent(artist.name)}&category=${encodeURIComponent(artist.category)}`}
              className="px-3 py-1.5 bg-[#1f2737] hover:bg-wom-gold hover:text-black text-gray-200 text-xs font-semibold rounded-lg border border-wom-darkBorder transition"
            >
              Enquire
            </Link>
            <Link
              to={`/artist/${artist.slug}`}
              className="p-1.5 bg-wom-gold hover:bg-wom-goldHover text-black rounded-lg transition"
              title="View full profile"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
