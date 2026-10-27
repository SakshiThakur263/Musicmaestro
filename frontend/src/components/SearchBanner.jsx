import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown, Music, Disc3, Mic2 } from 'lucide-react';

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

  const featuredPills = [
    { name: 'Musicians/Artists', category: 'Solo Performer', icon: Mic2 },
    { name: 'Live Bands', category: 'Live Bands', icon: Music },
    { name: 'DJ Services', category: 'DJ Services', icon: Disc3 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* White Pill Search Bar matching worldofmusicians.com */}
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl md:rounded-full p-2.5 md:p-2 shadow-[0_18px_50px_rgba(0,0,0,0.75)] flex flex-col md:flex-row items-stretch md:items-center transition-all duration-300 border border-white/40"
      >
        {/* 1. Keyword Input */}
        <div className="flex-1 w-full md:w-auto flex items-center justify-between px-4 md:px-6 py-3 md:py-2.5 border-b border-gray-200 md:border-b-0">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="What are you looking for?"
            className="w-full bg-transparent text-gray-800 placeholder-gray-500 text-sm focus:outline-none font-medium"
          />
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2 md:hidden" />
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-8 bg-gray-200 my-auto"></div>

        {/* 2. Location Input with Pin Icon */}
        <div className="flex-1 w-full md:w-auto flex items-center justify-between px-4 md:px-6 py-3 md:py-2.5 border-b border-gray-200 md:border-b-0">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full bg-transparent text-gray-800 placeholder-gray-500 text-sm focus:outline-none font-medium"
          />
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-8 bg-gray-200 my-auto"></div>

        {/* 3. Category Dropdown with Chevron */}
        <div className="flex-1 w-full md:w-auto relative flex items-center px-4 md:px-6 py-3 md:py-2.5">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-transparent text-gray-600 text-sm focus:outline-none cursor-pointer appearance-none pr-8 font-medium"
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
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 md:right-6 pointer-events-none" />
        </div>

        {/* 4. Gold/Orange Search Button */}
        <button
          type="submit"
          className="w-full md:w-auto mt-2 md:mt-0 bg-[#f4a51c] hover:bg-[#e09414] text-white font-bold text-sm sm:text-base px-10 py-3.5 rounded-xl md:rounded-full transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 flex-shrink-0"
        >
          Search
        </button>
      </form>

      {/* Highlighted Category Boxes below search matching worldofmusicians.com */}
      <div className="mt-7 sm:mt-9 text-center">
        <h5 className="text-xs sm:text-sm font-medium text-white/90 drop-shadow mb-4 tracking-wide">
          Or browse featured categories:
        </h5>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {featuredPills.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => navigate(`/artists?category=${encodeURIComponent(pill.category)}`)}
                className="w-32 sm:w-40 py-3.5 sm:py-4 px-3 bg-black/65 hover:bg-[#f4a51c] backdrop-blur-md text-white hover:text-black border border-white/15 hover:border-[#f4a51c] rounded-xl transition-all duration-300 shadow-xl hover:-translate-y-1 flex flex-col items-center justify-center gap-2 group"
              >
                <Icon className="w-6 h-6 text-[#f4a51c] group-hover:text-black transition-colors" />
                <h4 className="text-xs sm:text-[13px] font-semibold tracking-wide">
                  {pill.name}
                </h4>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchBanner;
