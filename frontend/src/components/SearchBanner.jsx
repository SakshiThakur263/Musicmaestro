import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown, Music, Disc3, Headphones } from 'lucide-react';

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
    { name: 'Musicians/Artists', category: 'Solo Performer', icon: Headphones },
    { name: 'Live Bands', category: 'Live Bands', icon: Music },
    { name: 'DJ Services', category: 'DJ Services', icon: Disc3 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Input Box matching WOM Screenshot */}
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-full p-2 shadow-[0_15px_45px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center transition-all duration-300 hover:shadow-[0_20px_50px_rgba(244,165,28,0.25)] border border-white/30"
      >
        {/* 1. Keyword Input */}
        <div className="flex-1 w-full md:w-auto px-5 py-2">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="What are you looking for?"
            className="w-full bg-transparent text-gray-800 placeholder-gray-400 text-sm focus:outline-none font-medium"
          />
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-gray-200 my-auto"></div>

        {/* 2. Location Input with Pin Icon */}
        <div className="flex-1 w-full md:w-auto flex items-center justify-between px-5 py-2">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full bg-transparent text-gray-800 placeholder-gray-400 text-sm focus:outline-none font-medium"
          />
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-gray-200 my-auto"></div>

        {/* 3. Category Dropdown with Chevron */}
        <div className="flex-1 w-full md:w-auto relative flex items-center px-4 py-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-transparent text-gray-700 text-sm focus:outline-none cursor-pointer appearance-none pr-8 font-medium"
          >
            <option value="" className="text-gray-800">
              All Categories
            </option>
            <option value="Live Bands" className="text-gray-800">
              Live Bands
            </option>
            <option value="Solo Performer" className="text-gray-800">
              Solo Performer / Instrumental
            </option>
            <option value="DJ Services" className="text-gray-800">
              DJ Services
            </option>
            <option value="Others" className="text-gray-800">
              Anchors & Entertainers
            </option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-6 pointer-events-none" />
        </div>

        {/* 4. Orange Search Button */}
        <button
          type="submit"
          className="w-full md:w-auto bg-[#f4a51c] hover:bg-[#e09414] text-white font-semibold text-base px-9 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:scale-102 active:scale-98 flex-shrink-0"
        >
          Search
        </button>
      </form>

      {/* Featured Category Pills below search */}
      <div className="mt-8 text-center">
        <p className="text-sm font-medium text-gray-300 drop-shadow mb-3.5 tracking-wide">
          Or browse featured categories:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {featuredPills.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => navigate(`/artists?category=${encodeURIComponent(pill.category)}`)}
                className="flex items-center gap-2 px-5 py-2.5 bg-black/60 hover:bg-black/90 backdrop-blur-md text-white border border-white/20 hover:border-wom-gold rounded-full text-xs font-semibold transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 group"
              >
                <Icon className="w-4 h-4 text-gray-300 group-hover:text-wom-gold transition-colors" />
                <span>{pill.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchBanner;
