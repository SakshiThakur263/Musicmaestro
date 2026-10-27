import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { submitInquiry } from '../services/api';
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Send,
  HelpCircle,
} from 'lucide-react';

const EventInquiry = () => {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: searchParams.get('eventType') || 'Wedding',
    eventDate: '',
    city: '',
    guestCount: '100-300',
    budget: 'Rs. 1,00,000 - 2,50,000',
    artistName: searchParams.get('artist') || '',
    category: searchParams.get('category') || 'Live Bands',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState(null);
  const [error, setError] = useState('');

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
      const res = await submitInquiry(formData);
      if (res.success) {
        setSuccessResponse(res);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to submit inquiry. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] pt-20 sm:pt-28 pb-16 sm:pb-20 text-white">
      {/* Header Banner */}
      <div className="bg-[#0e121a] border-b border-wom-darkBorder py-9 sm:py-12 px-4 mb-8 sm:mb-10 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-wom-gold/15 text-wom-gold border border-wom-gold/30 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Fast-Track Booking Inquiry
          </div>
          <h1 className="text-2xl sm:text-5xl font-extrabold font-raleway text-white">
            Send an Event Enquiry
          </h1>
          <p className="text-xs sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Tell us about your event vision. Our talent curation team will check artist availability, provide customized quotes, and arrange complete performance coordination.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-start">
          {/* Main Form (2 cols) */}
          <div className="lg:col-span-2">
            <div className="bg-[#121622] border border-wom-darkBorder rounded-2xl p-5 sm:p-10 shadow-2xl">
              {successResponse ? (
                <div className="text-center py-8 sm:py-10 space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto border border-green-500/40">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-xl sm:text-3xl font-bold font-raleway text-white">
                    Inquiry Successfully Received!
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry has been routed to our artist coordination desk.
                  </p>

                  <div className="p-4 bg-[#181f2c] border border-wom-darkBorder rounded-xl max-w-sm mx-auto text-left space-y-1.5 text-xs">
                    <div className="flex justify-between gap-2">
                      <span className="text-gray-400">Reference ID:</span>
                      <span className="font-mono font-bold text-wom-gold">
                        {successResponse.inquiryReference}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-gray-400">Event Type:</span>
                      <span className="text-white font-medium text-right">{formData.eventType}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-gray-400">Event Date:</span>
                      <span className="text-white font-medium">{formData.eventDate}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-gray-400">City / Venue:</span>
                      <span className="text-white font-medium text-right">{formData.city}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 max-w-md mx-auto">
                    We will get in touch with you at <strong className="text-white">{formData.phone}</strong> or{' '}
                    <strong className="text-white break-all">{formData.email}</strong> within 24 hours.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={() => setSuccessResponse(null)}
                      className="w-full sm:w-auto px-6 py-2.5 bg-[#181f2c] border border-wom-darkBorder hover:border-wom-gold text-white text-xs font-semibold rounded-xl transition"
                    >
                      Submit Another Inquiry
                    </button>
                    <Link
                      to="/artists"
                      className="w-full sm:w-auto px-6 py-2.5 bg-wom-gold text-black font-bold text-xs rounded-xl shadow-gold transition text-center"
                    >
                      Browse More Artists
                    </Link>
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

                  {/* Section 1: Event Details */}
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-wom-gold uppercase tracking-wider font-raleway border-b border-wom-darkBorder pb-2">
                      1. Event Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Event Type *
                        </label>
                        <select
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold cursor-pointer"
                        >
                          <option value="Wedding">Wedding / Sangeet / Reception</option>
                          <option value="Corporate">Corporate Conference / Annual Gala</option>
                          <option value="Sangeet / Cocktails">Sangeet / Cocktails Night</option>
                          <option value="Private Party">Private Party / Milestone Birthday</option>
                          <option value="College Fest">College Cultural Fest</option>
                          <option value="Concert / Festival">Public Concert / Music Festival</option>
                          <option value="Other">Other Event</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Date of Event *
                        </label>
                        <input
                          type="date"
                          name="eventDate"
                          required
                          value={formData.eventDate}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          City & Venue *
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          placeholder="e.g. Mumbai, Taj Lands End"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Expected Guest Count
                        </label>
                        <select
                          name="guestCount"
                          value={formData.guestCount}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold cursor-pointer"
                        >
                          <option value="Under 50">Under 50 guests (Intimate)</option>
                          <option value="50-150">50 - 150 guests</option>
                          <option value="150-500">150 - 500 guests (Grand)</option>
                          <option value="500-1500">500 - 1,500 guests (Large)</option>
                          <option value="1500+">1,500+ guests (Mega Event/Concert)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Artist Requirement */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-base font-bold text-wom-gold uppercase tracking-wider font-raleway border-b border-wom-darkBorder pb-2">
                      2. Entertainment Requirement
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Artist Category Preference
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold cursor-pointer"
                        >
                          <option value="Live Bands">Live Bands & Bollywood Ensembles</option>
                          <option value="Solo Performer">Solo Singers / Guitarists / Violinists</option>
                          <option value="DJ Services">DJ & Percussion Services</option>
                          <option value="Sufi & Qawwali">Sufi & Qawwali Troupe</option>
                          <option value="Others">Anchors / Stand Up Comedians</option>
                          <option value="Any">Any / Multiple Acts</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Specific Artist Name (Optional)
                        </label>
                        <input
                          type="text"
                          name="artistName"
                          placeholder="e.g. Manmeet, Sonu Nigam, Ibex..."
                          value={formData.artistName}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Estimated Entertainment Budget (INR)
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold cursor-pointer"
                      >
                        <option value="Rs. 25,000 - 50,000">Rs. 25,000 - 50,000</option>
                        <option value="Rs. 50,000 - 1,00,000">Rs. 50,000 - 1,00,000</option>
                        <option value="Rs. 1,00,000 - 2,50,000">Rs. 1,00,000 - 2,50,000</option>
                        <option value="Rs. 2,50,000 - 5,00,000">Rs. 2,50,000 - 5,00,000</option>
                        <option value="Rs. 5,00,000 - 15,00,000">Rs. 5,00,000 - 15,00,000</option>
                        <option value="Rs. 15,00,000+ (Celebrity Headline)">
                          Rs. 15,00,000+ (Celebrity Headline)
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Section 3: Contact Details */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-base font-bold text-wom-gold uppercase tracking-wider font-raleway border-b border-wom-darkBorder pb-2">
                      3. Organizer Contact Details
                    </h3>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Vikram Mehra"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="vikram@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Additional Notes / Special Instructions
                      </label>
                      <textarea
                        name="notes"
                        rows="3"
                        placeholder="Please share any preferred songs, stage setup details, or specific timeline constraints..."
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                      ></textarea>
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
                        <span>Submit Official Booking Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-gray-400 text-center">
                    By submitting, your details will be safely processed in accordance with our Privacy Policy. No spam guaranteed.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Benefits & FAQ */}
          <div className="space-y-6">
            <div className="bg-[#121622] border border-wom-darkBorder rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white font-raleway flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-wom-gold" />
                The WOM Booking Assurance
              </h3>
              <ul className="space-y-3 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Verified Talent:</strong> All artists on our roster undergo sound checks and professional vetting.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Backup Security:</strong> Guaranteed artist replacement in unprecedented emergency scenarios.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Technical Rider Management:</strong> We coordinate sound, microphones, and stage gear directly with your venue.
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick Contact Box */}
            <div className="bg-[#121622] border border-wom-darkBorder rounded-2xl p-6 space-y-3">
              <h4 className="text-sm font-bold text-white font-raleway">
                Corporate Office
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Lotus Corporate Park, G wing, 801 Off Western Express Highway, Near Jai Coach, Mumbai, MH, 400063
              </p>
              <div className="pt-2 text-xs space-y-1">
                <div>
                  <span className="text-gray-400">Phone / WhatsApp: </span>
                  <a href="https://wa.me/919009999434" target="_blank" rel="noopener noreferrer" className="text-wom-gold font-bold hover:underline">
                    +91 9009999434
                  </a>
                </div>
                <div>
                  <span className="text-gray-400">Email: </span>
                  <a href="mailto:connect@worldofmusicians.com" className="text-wom-gold font-bold hover:underline">
                    connect@worldofmusicians.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInquiry;
