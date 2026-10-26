import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPlatformStats } from '../services/api';
import {
  Music,
  Award,
  Users,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Heart,
  Globe2,
} from 'lucide-react';

const About = () => {
  const [stats, setStats] = useState({
    totalArtists: 500,
    showsCompleted: '2,000+',
    citiesCovered: 35,
    satisfiedClients: '99%',
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetchPlatformStats();
        if (res.success && res.data) {
          setStats(res.data);
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    loadStats();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0e14] pt-28 pb-20 text-white">
      {/* Hero Header Banner */}
      <div className="bg-[#0e121a] border-b border-wom-darkBorder py-14 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-wom-gold/15 text-wom-gold border border-wom-gold/30 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Our Story & Vision
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-raleway text-white">
            About Music Maestro
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Music Maestro is India’s premier artist booking platform, curating unforgettable live music experiences for corporate galas, royal weddings, and major festivals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-20">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block w-12 h-1 bg-wom-gold rounded-full"></div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-raleway text-white leading-tight">
              Bridging the Stage Between Extraordinary Talent and Unforgettable Audiences
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Founded in Mumbai, World of Musicians (WOM) was born out of a profound passion for live music and a recognition that event organizers needed a reliable, transparent way to book world-class artists.
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Whether you are organizing a 700-delegate corporate retreat in Goa, an intimate Sufi sangeet in Udaipur, or a massive college cultural festival, our platform takes the guesswork out of entertainment. We handle everything from artist curation and contract negotiations to technical rider coordination and soundcheck verification.
            </p>
            <div className="pt-2">
              <Link
                to="/artists"
                className="px-6 py-3 bg-wom-gold hover:bg-wom-goldHover text-black font-extrabold text-xs rounded-xl shadow-gold inline-flex items-center gap-2"
              >
                Browse Our Artist Roster
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-wom-darkBorder shadow-2xl aspect-[4/3] bg-[#121622]">
            <img
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80"
              alt="Live concert production"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
              <span className="text-xs font-bold text-wom-gold">2,000+ Shows Delivered</span>
              <p className="text-xs text-gray-300 mt-0.5">
                From high-energy Bollywood bands to intimate jazz saxophonists.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-[#121622] border border-wom-darkBorder p-8 rounded-2xl text-center space-y-2">
            <span className="text-4xl font-extrabold text-wom-gold font-raleway block">
              {stats.showsCompleted}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
              Live Performances
            </span>
          </div>

          <div className="bg-[#121622] border border-wom-darkBorder p-8 rounded-2xl text-center space-y-2">
            <span className="text-4xl font-extrabold text-wom-gold font-raleway block">
              {stats.totalArtists}+
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
              Vetted Artists
            </span>
          </div>

          <div className="bg-[#121622] border border-wom-darkBorder p-8 rounded-2xl text-center space-y-2">
            <span className="text-4xl font-extrabold text-wom-gold font-raleway block">
              {stats.citiesCovered}+
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
              Cities Across India
            </span>
          </div>

          <div className="bg-[#121622] border border-wom-darkBorder p-8 rounded-2xl text-center space-y-2">
            <span className="text-4xl font-extrabold text-wom-gold font-raleway block">
              {stats.satisfiedClients}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
              Client Satisfaction
            </span>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold font-raleway text-white mb-3">
              Why Event Planners Trust WOM
            </h2>
            <p className="text-sm text-gray-400">
              Our standard of excellence ensures your audience is thoroughly entertained with zero stress on the host.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#121622] border border-wom-darkBorder p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-wom-gold/10 text-wom-gold flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-raleway">Direct Booking & Verification</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Every artist in our database has undergone audio checks, professional reliability reviews, and performance audits so you never have to worry about quality on show day.
              </p>
            </div>

            <div className="bg-[#121622] border border-wom-darkBorder p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-wom-gold/10 text-wom-gold flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-raleway">Technical Rider Support</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Sound engineering matters. Our team liaises directly with your sound and light vendor to verify microphones, in-ear monitors, channel inputs, and stage specifications.
              </p>
            </div>

            <div className="bg-[#121622] border border-wom-darkBorder p-8 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-wom-gold/10 text-wom-gold flex items-center justify-center">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-raleway">Pan-India & International Reach</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Whether you need a Rajasthani folk fusion band in Jaipur or an electric violinist in Goa, we mobilize top performers wherever your event takes place.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#121622] via-[#1a2130] to-[#121622] border border-wom-darkBorder rounded-3xl p-10 sm:p-14 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-raleway text-white">
            Ready to Plan an Unforgettable Musical Experience?
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto">
            Contact our talent coordinators today for artist recommendations tailored to your event theme and budget.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/event-inquiry"
              className="px-8 py-3.5 bg-wom-gold hover:bg-wom-goldHover text-black font-extrabold text-sm rounded-xl transition shadow-gold"
            >
              Send Event Enquiry
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-[#181f2c] hover:bg-white/10 text-white border border-wom-darkBorder font-bold text-sm rounded-xl transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
