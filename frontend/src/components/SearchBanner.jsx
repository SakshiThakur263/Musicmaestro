import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronDown, Music, AudioWaveform } from 'lucide-react';

const SearchBanner = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.append('search', keyword.trim());
    if (location.trim()) params.append('location', location.trim());
    if (selectedCategory && selectedCategory !== 'All' && selectedCategory !== '') {
      params.append('category', selectedCategory);
    }

    navigate(`/artists?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-1 sm:px-0">
      {/* Search Form:
          - Mobile (< md): 3 separate white rounded-[6px] rectangular boxes + pill Search button (matching Screenshot 1)
          - Desktop (md+): Single horizontal white pill bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-3.5 md:gap-0 md:flex-row md:items-center md:bg-white md:rounded-full md:p-2 md:shadow-[0_18px_50px_rgba(0,0,0,0.75)] md:border md:border-white/40 transition-all duration-300"
      >
        {/* 1. Keyword Input */}
        <div className="flex-1 w-full md:w-auto flex items-center justify-between bg-white md:bg-transparent rounded-[6px] md:rounded-none px-4 md:px-6 py-3.5 md:py-2.5 shadow-md md:shadow-none">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="What are you looking for?"
            className="w-full bg-transparent text-gray-800 placeholder-gray-500 text-[15px] md:text-sm focus:outline-none font-normal"
          />
        </div>

        {/* Vertical Divider (Desktop only) */}
        <div className="hidden md:block w-px h-8 bg-gray-200 my-auto" />

        {/* 2. Location Input with Pin Icon */}
        <div className="flex-1 w-full md:w-auto flex items-center justify-between bg-white md:bg-transparent rounded-[6px] md:rounded-none px-4 md:px-6 py-3.5 md:py-2.5 shadow-md md:shadow-none">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full bg-transparent text-gray-800 placeholder-gray-500 text-[15px] md:text-sm focus:outline-none font-normal"
          />
          <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0 ml-2 fill-gray-500/20" />
        </div>

        {/* Vertical Divider (Desktop only) */}
        <div className="hidden md:block w-px h-8 bg-gray-200 my-auto" />

        {/* 3. Category Dropdown with Chevron */}
        <div className="flex-1 w-full md:w-auto relative flex items-center bg-white md:bg-transparent rounded-[6px] md:rounded-none px-4 md:px-6 py-3.5 md:py-2.5 shadow-md md:shadow-none">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-transparent text-gray-500 text-[15px] md:text-sm focus:outline-none cursor-pointer appearance-none pr-8 font-normal"
          >
            <option value="" className="text-gray-800">
              All Categories
            </option>
            <option value="Solo Performer" className="text-gray-800">
              Solo Performer
            </option>
            <option value="Live Bands" className="text-gray-800">
              Live Bands
            </option>
            <option value="DJ Services" className="text-gray-800">
              DJ Services
            </option>
            <option value="Others" className="text-gray-800">
              Others / Anchors &amp; Comedians
            </option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 md:right-6 pointer-events-none" />
        </div>

        {/* 4. Gold/Orange Pill Search Button */}
        <button
          type="submit"
          className="w-full md:w-auto mt-1 md:mt-0 bg-[#f4a51c] hover:bg-[#e09414] text-white font-medium text-base md:text-sm px-10 py-3.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 flex-shrink-0"
        >
          Search
        </button>
      </form>

      {/* Featured Categories Horizontal Dark Pills matching Screenshot 1 */}
      <div className="mt-8 sm:mt-9 text-center">
        <h5 className="text-sm sm:text-[15px] font-normal text-white drop-shadow mb-4 tracking-wide">
          Or browse featured categories:
        </h5>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5 max-w-[360px] sm:max-w-2xl mx-auto">
          {/* Pill 1: Musicians/Artists */}
          <button
            type="button"
            onClick={() => navigate('/artists?category=Solo+Performer')}
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#2a2d3d]/85 hover:bg-[#f4a51c] backdrop-blur-md text-white hover:text-black border border-white/10 hover:border-[#f4a51c] rounded-full transition-all duration-300 shadow-lg flex items-center gap-2.5 group"
          >
            <span className="w-5 h-5 rounded-full bg-white text-[#1a1c29] flex items-center justify-center flex-shrink-0">
              <AudioWaveform className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
            <span className="text-xs sm:text-sm font-normal tracking-wide whitespace-nowrap">
              Musicians/Artists
            </span>
          </button>

          {/* Pill 2: Live Bands */}
          <button
            type="button"
            onClick={() => navigate('/artists?category=Live+Bands')}
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#2a2d3d]/85 hover:bg-[#f4a51c] backdrop-blur-md text-white hover:text-black border border-white/10 hover:border-[#f4a51c] rounded-full transition-all duration-300 shadow-lg flex items-center gap-2.5 group"
          >
            <Music className="w-4 h-4 text-white group-hover:text-black transition-colors flex-shrink-0" />
            <span className="text-xs sm:text-sm font-normal tracking-wide whitespace-nowrap">
              Live Bands
            </span>
          </button>

          {/* Pill 3: DJ Services */}
          <button
            type="button"
            onClick={() => navigate('/artists?category=DJ+Services')}
            className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#2a2d3d]/85 hover:bg-[#f4a51c] backdrop-blur-md text-white hover:text-black border border-white/10 hover:border-[#f4a51c] rounded-full transition-all duration-300 shadow-lg flex items-center gap-2.5 group"
          >
            <span className="w-4 h-4 rounded-[3px] bg-white text-[#1a1c29] flex items-center justify-center flex-shrink-0">
              <Music className="w-3 h-3 stroke-[2.5]" />
            </span>
            <span className="text-xs sm:text-sm font-normal tracking-wide whitespace-nowrap">
              DJ Services
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBanner;
