import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { submitInquiry } from '../services/api';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const EventInquiry = () => {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    eventType: searchParams.get('eventType') || 'Corporate',
    guestCount: '',
    notes: searchParams.get('artist')
      ? `Enquiry for Artist: ${searchParams.get('artist')}`
      : '',
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

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    try {
      const payload = {
        name: fullName,
        email: formData.email,
        phone: formData.phone,
        eventType: formData.eventType,
        eventDate: 'To Be Decided',
        city: formData.address,
        guestCount: formData.guestCount,
        artistName: searchParams.get('artist') || 'General Entertainment Query',
        category: searchParams.get('category') || 'Any',
        notes: formData.notes,
      };

      const res = await submitInquiry(payload);
      if (res.success) {
        setSuccessResponse({ ...res, fullName });
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
    <div className="min-h-screen bg-[#2b2b2b] pt-16 sm:pt-20 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Heading & Subtitle matching reference screenshot */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold font-raleway text-[#f4a51c] mb-4">
            Start Enquiry
          </h1>
          <p className="text-sm sm:text-base text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Kindly share the specifics of your entertainment request, and we&apos;ll reach out to initiate a more in-depth discussion about your requirements and event.
          </p>
        </div>

        {successResponse ? (
          <div className="bg-[#1e1e1e] border border-white/10 rounded-2xl p-6 sm:p-10 text-center space-y-5 shadow-2xl animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto border border-green-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-xl sm:text-3xl font-bold font-raleway text-white">
              Enquiry Submitted Successfully!
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
              Thank you, <strong className="text-white">{successResponse.fullName}</strong>. Your entertainment request has been received by our team.
            </p>

            <div className="p-4 bg-[#2b2b2b] border border-white/10 rounded-xl max-w-sm mx-auto text-left space-y-1.5 text-xs">
              <div className="flex justify-between gap-2">
                <span className="text-gray-400">Reference ID:</span>
                <span className="font-mono font-bold text-[#f4a51c]">
                  {successResponse.inquiryReference}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-gray-400">Type of Event:</span>
                <span className="text-white font-medium text-right">{formData.eventType}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-gray-400">Location:</span>
                <span className="text-white font-medium text-right">{formData.address}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-gray-400">Number Of Pax:</span>
                <span className="text-white font-medium text-right">{formData.guestCount}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => {
                  setSuccessResponse(null);
                  setFormData({
                    firstName: '',
                    lastName: '',
                    address: '',
                    phone: '',
                    email: '',
                    eventType: 'Corporate',
                    guestCount: '',
                    notes: '',
                  });
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition"
              >
                Submit Another Enquiry
              </button>
              <Link
                to="/artists"
                className="w-full sm:w-auto px-6 py-2.5 bg-[#f4a51c] hover:bg-[#e09414] text-white font-semibold text-xs rounded-lg shadow-md transition text-center"
              >
                Browse Artist Bank
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3.5 bg-red-500/20 border border-red-500/40 text-red-200 text-xs sm:text-sm rounded-md flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Row 1: Name (First & Last) */}
            <div>
              <label className="block text-sm font-medium text-[#f4a51c] mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="First"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f4a51c]"
                />
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Last"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f4a51c]"
                />
              </div>
            </div>

            {/* Row 2: Address */}
            <div>
              <label className="block text-sm font-medium text-[#f4a51c] mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                required
                placeholder="Event Location"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f4a51c]"
              />
            </div>

            {/* Row 3: Phone Number & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-[#f4a51c] mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Eg. +91 9878 756 542"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f4a51c]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#f4a51c] mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f4a51c]"
                />
              </div>
            </div>

            {/* Row 4: Type of Event & Number Of Pax */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-[#f4a51c] mb-2">
                  Type of Event <span className="text-red-500">*</span>
                </label>
                <select
                  name="eventType"
                  required
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white text-gray-800 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f4a51c] cursor-pointer"
                >
                  <option value="Corporate">Corporate</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Private Party">Private Party</option>
                  <option value="Sangeet / Cocktails">Sangeet / Cocktails</option>
                  <option value="College Fest">College Fest</option>
                  <option value="Concert / Festival">Concert / Festival</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#f4a51c] mb-2">
                  Number Of Pax <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="guestCount"
                  required
                  placeholder="Enter the number of guests you have"
                  value={formData.guestCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f4a51c]"
                />
              </div>
            </div>

            {/* Row 5: Additional Details */}
            <div>
              <label className="block text-sm font-medium text-[#f4a51c] mb-2">
                Additional Details <span className="text-red-500">*</span>
              </label>
              <textarea
                name="notes"
                required
                rows="5"
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white text-gray-800 placeholder-gray-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f4a51c]"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-7 py-3 sm:py-2.5 bg-[#f4a51c] hover:bg-[#e09414] text-white font-semibold text-sm rounded-lg transition shadow-md disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EventInquiry;
