import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Home, Search, Disc } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0b0e14] pt-28 pb-20 flex items-center justify-center text-white px-4">
      <div className="max-w-md w-full bg-[#121622] border border-wom-darkBorder rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-wom-gold/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="w-20 h-20 mx-auto rounded-full bg-wom-gold/10 border border-wom-gold/30 flex items-center justify-center text-wom-gold animate-bounce">
          <Disc className="w-10 h-10 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        <div className="space-y-2">
          <span className="text-5xl sm:text-6xl font-extrabold text-wom-gold font-raleway block">
            404
          </span>
          <h1 className="text-xl sm:text-2xl font-bold font-raleway text-white">
            Lost in the Music?
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            The track or page you are looking for seems to have ended its set or moved to another stage.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2.5 bg-wom-gold hover:bg-wom-goldHover text-black font-extrabold text-xs rounded-xl shadow-gold transition flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            to="/artists"
            className="w-full sm:w-auto px-6 py-2.5 bg-[#181f2c] hover:bg-white/10 text-white border border-wom-darkBorder text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 text-wom-gold" />
            Explore Artists
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
