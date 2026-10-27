import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchArtists, fetchCategories } from '../services/api';
import ArtistCard from '../components/ArtistCard';
import {
  Search,
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  MapPin,
  ChevronDown,
  RotateCcw,
  Music,
} from 'lucide-react';

const ArtistBank = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // State from URL query or defaults
  const [keyword, setKeyword] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [subcategory, setSubcategory] = useState(searchParams.get('subcategory') || 'All');
  const [location, setLocation] = useState(searchParams.get('location') || 'All');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'rating');
  const [featuredOnly, setFeaturedOnly] = useState(searchParams.get('featured') === 'true');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Data & loading states
  const [artists, setArtists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [groupedCategories, setGroupedCategories] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available locations in dataset
  const locationsList = ['All', 'Mumbai', 'Delhi', 'Jaipur', 'Pune', 'Goa', 'Bangalore'];

  // Sync local filter state when URL query params change (e.g., from header/footer links)
  useEffect(() => {
    setKeyword(searchParams.get('search') || '');
    setCategory(searchParams.get('category') || 'All');
    setSubcategory(searchParams.get('subcategory') || 'All');
    setLocation(searchParams.get('location') || 'All');
    setSortBy(searchParams.get('sort') || 'rating');
    setFeaturedOnly(searchParams.get('featured') === 'true');
  }, [searchParams]);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchCategories();
        if (res.success) {
          setCategories(res.data);
          setGroupedCategories(res.grouped || {});
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };
    loadCategories();
  }, []);

  // Fetch artists when filters or page change
  useEffect(() => {
    const loadArtists = async () => {
      setLoading(true);
      try {
        const queryParams = {
          page: currentPage,
          limit: 12,
          sort: sortBy,
        };

        if (keyword.trim()) queryParams.search = keyword.trim();
        if (category && category !== 'All') queryParams.category = category;
        if (subcategory && subcategory !== 'All') queryParams.subcategory = subcategory;
        if (location && location !== 'All') queryParams.location = location;
        if (featuredOnly) queryParams.featured = 'true';

        const res = await fetchArtists(queryParams);
        if (res.success) {
          setArtists(res.data);
          setTotalCount(res.total);
          setTotalPages(res.totalPages);
        }
      } catch (err) {
        console.error('Failed to load artists:', err);
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, [category, subcategory, location, sortBy, featuredOnly, currentPage, searchParams]);

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    updateUrlParams();
  };

  const updateUrlParams = () => {
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('search', keyword.trim());
    if (category && category !== 'All') params.set('category', category);
    if (subcategory && subcategory !== 'All') params.set('subcategory', subcategory);
    if (location && location !== 'All') params.set('location', location);
    if (sortBy) params.set('sort', sortBy);
    if (featuredOnly) params.set('featured', 'true');
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    setKeyword('');
    setCategory('All');
    setSubcategory('All');
    setLocation('All');
    setFeaturedOnly(false);
    setSortBy('rating');
    setCurrentPage(1);
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] pt-20 sm:pt-28 pb-16 sm:pb-20 text-white">
      {/* Top Titlebar matching WOM */}
      <div className="bg-[#0e121a] border-b border-wom-darkBorder py-8 sm:py-10 px-4 mb-6 sm:mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-wom-gold uppercase tracking-wider mb-1">
              <Music className="w-4 h-4" />
              Verified Artists & Entertainers
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-raleway text-white">
              Artist Bank & Directory
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Browse top-rated musicians, celebrity bands, and DJs for weddings, private parties, and corporate events.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/event-inquiry"
              className="w-full sm:w-auto text-center px-5 py-2.5 bg-wom-gold hover:bg-wom-goldHover text-black text-xs font-bold rounded-lg transition shadow-gold-sm"
            >
              Custom Event Inquiry
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block w-72 flex-shrink-0 space-y-6">
            <div className="bg-[#121622] border border-wom-darkBorder rounded-2xl p-6 shadow-xl sticky top-24 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-wom-darkBorder">
                <span className="font-bold text-white text-sm flex items-center gap-2">
                  <Filter className="w-4 h-4 text-wom-gold" />
                  Filter Artists
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-gray-400 hover:text-wom-gold flex items-center gap-1 transition"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Keyword Search */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Keywords
                </label>
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search name, genre..."
                    className="w-full pl-9 pr-3.5 py-2 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold transition"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </form>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Main Category
                </label>
                <div className="space-y-1.5 text-xs">
                  {['All', 'Live Bands', 'Solo Performer', 'DJ Services', 'Others'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setSubcategory('All');
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between ${
                        category === cat
                          ? 'bg-wom-gold text-black font-bold shadow-sm'
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location / Region Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Region / City
                </label>
                <select
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold transition cursor-pointer"
                >
                  {locationsList.map((loc) => (
                    <option key={loc} value={loc} className="bg-[#181f2c] text-white">
                      {loc === 'All' ? 'All Regions in India' : loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Featured Only Toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={featuredOnly}
                    onChange={(e) => {
                      setFeaturedOnly(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="w-4 h-4 rounded text-wom-gold focus:ring-wom-gold bg-[#181f2c] border-gray-600"
                  />
                  <span>Show Featured Talent Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Mobile Quick Search Bar */}
            <form onSubmit={handleSearchSubmit} className="lg:hidden mb-4 flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search artist name, genre, city..."
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#121622] border border-wom-darkBorder rounded-xl text-white text-xs focus:outline-none focus:border-wom-gold transition"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-wom-gold text-black font-bold text-xs rounded-xl shadow-gold-sm flex-shrink-0"
              >
                Search
              </button>
            </form>

            {/* Top Bar with Count, Sort, and View Switcher */}
            <div className="bg-[#121622] border border-wom-darkBorder rounded-2xl p-3.5 sm:p-4 mb-6 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-xs font-bold text-white hover:border-wom-gold transition"
                >
                  <Filter className="w-3.5 h-3.5 text-wom-gold" />
                  <span>Filters</span>
                </button>

                <span className="text-xs text-gray-300">
                  Showing <strong className="text-white font-bold">{artists.length}</strong> of{' '}
                  <strong className="text-wom-gold font-bold">{totalCount}</strong> artists
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* Sort selector */}
                <div className="flex items-center gap-2 text-xs flex-1 sm:flex-initial">
                  <span className="text-gray-400 hidden sm:inline">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full sm:w-auto px-3 py-2 sm:py-1.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold transition cursor-pointer"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="shows">Most Shows Done</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center border border-wom-darkBorder rounded-lg overflow-hidden bg-[#181f2c] flex-shrink-0">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition ${
                      viewMode === 'grid' ? 'bg-wom-gold text-black' : 'text-gray-400 hover:text-white'
                    }`}
                    title="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition ${
                      viewMode === 'list' ? 'bg-wom-gold text-black' : 'text-gray-400 hover:text-white'
                    }`}
                    title="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Pill Bar */}
            {(category !== 'All' || subcategory !== 'All' || location !== 'All' || keyword || featuredOnly) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-gray-400 mr-1">Active filters:</span>
                {category !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-wom-gold/15 text-wom-gold text-xs border border-wom-gold/30">
                    Category: {category}
                    <button onClick={() => setCategory('All')} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {subcategory !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-wom-gold/15 text-wom-gold text-xs border border-wom-gold/30">
                    Style: {subcategory}
                    <button onClick={() => setSubcategory('All')} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {location !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-wom-gold/15 text-wom-gold text-xs border border-wom-gold/30">
                    Location: {location}
                    <button onClick={() => setLocation('All')} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {keyword && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-wom-gold/15 text-wom-gold text-xs border border-wom-gold/30">
                    "{keyword}"
                    <button onClick={() => setKeyword('')} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {featuredOnly && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-wom-gold/15 text-wom-gold text-xs border border-wom-gold/30">
                    Featured Only
                    <button onClick={() => setFeaturedOnly(false)} className="hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-gray-400 hover:text-white underline ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results Grid / List */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-96 bg-[#131822] rounded-2xl animate-pulse border border-wom-darkBorder"
                  ></div>
                ))}
              </div>
            ) : artists.length === 0 ? (
              <div className="bg-[#121622] border border-wom-darkBorder rounded-2xl p-8 sm:p-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-wom-gold/10 flex items-center justify-center text-wom-gold">
                  <Music className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white font-raleway">No artists found</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto">
                  We couldn't find any artists matching your search criteria. Try removing some filters or searching for another term.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-wom-gold text-black font-bold text-xs rounded-xl transition shadow-gold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'
                    : 'flex flex-col space-y-4'
                }
              >
                {artists.map((artist) => (
                  <ArtistCard
                    key={artist._id}
                    artist={artist}
                    compact={viewMode === 'grid'}
                    listView={viewMode === 'list'}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-[#181f2c] border border-wom-darkBorder text-xs text-white disabled:opacity-40 hover:border-wom-gold transition"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                  <button
                    key={pg}
                    onClick={() => setCurrentPage(pg)}
                    className={`w-9 h-9 rounded-lg text-xs font-bold transition ${
                      currentPage === pg
                        ? 'bg-wom-gold text-black shadow-gold'
                        : 'bg-[#181f2c] text-white border border-wom-darkBorder hover:border-wom-gold'
                    }`}
                  >
                    {pg}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-[#181f2c] border border-wom-darkBorder text-xs text-white disabled:opacity-40 hover:border-wom-gold transition"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          ></div>
          <div className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[320px] bg-[#121622] border-l border-wom-darkBorder p-5 sm:p-6 overflow-y-auto flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-wom-darkBorder">
                <span className="font-bold text-white text-base flex items-center gap-2">
                  <Filter className="w-4 h-4 text-wom-gold" />
                  Filter Artists
                </span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Keywords
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search name, genre..."
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Main Category
                </label>
                <div className="space-y-1.5 text-xs">
                  {['All', 'Live Bands', 'Solo Performer', 'DJ Services', 'Others'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setCategory(cat);
                        setSubcategory('All');
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition flex items-center justify-between ${
                        category === cat
                          ? 'bg-wom-gold text-black font-bold shadow-sm'
                          : 'bg-[#181f2c]/60 text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Region / City
                </label>
                <select
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                >
                  {locationsList.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc === 'All' ? 'All Regions in India' : loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={featuredOnly}
                    onChange={(e) => {
                      setFeaturedOnly(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="w-4 h-4 rounded text-wom-gold focus:ring-wom-gold bg-[#181f2c] border-gray-600"
                  />
                  <span>Show Featured Talent Only</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-wom-darkBorder space-y-2.5">
              <button
                onClick={() => {
                  setMobileFilterOpen(false);
                  updateUrlParams();
                }}
                className="w-full py-3 bg-wom-gold text-black font-bold rounded-xl text-xs shadow-gold"
              >
                Apply Filters
              </button>
              <button
                onClick={() => {
                  clearAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2.5 bg-[#181f2c] border border-wom-darkBorder text-gray-300 hover:text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistBank;
