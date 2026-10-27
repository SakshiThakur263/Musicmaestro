import React, { useState } from 'react';
import { submitContactMessage } from '../services/api';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await submitContactMessage(formData);
      if (res.success) {
        setSuccessMsg(
          'Thank you for reaching out! Your message has been sent successfully. Our team will contact you shortly.'
        );
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to send message. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] pt-20 sm:pt-28 pb-16 sm:pb-20 text-white">
      {/* Header Banner */}
      <div className="bg-[#0e121a] border-b border-wom-darkBorder py-10 sm:py-14 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-wom-gold/15 text-wom-gold border border-wom-gold/30 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Direct Support & Bookings
          </div>
          <h1 className="text-2xl sm:text-5xl font-extrabold font-raleway text-white">
            Contact Us & Book Top Artists
          </h1>
          <p className="text-xs sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Have questions about artist availability, booking terms, or technical riders? We are here to assist you anytime.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 items-start">
          {/* Left 2 Cols: Interactive Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#121622] border border-wom-darkBorder rounded-2xl p-5 sm:p-10 shadow-xl space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-raleway text-white">
                  Send Us a Message
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Fill in your details below and an artist coordinator will get back to you promptly.
                </p>
              </div>

              {successMsg && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{successMsg}</span>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Sameer Kapoor"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="sameer@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      placeholder="e.g. Artist Inquiry for Udaipur Sangeet"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    placeholder="Describe your event details, artist preferences, date, or any specific questions..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-xs focus:outline-none focus:border-wom-gold"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-wom-gold hover:bg-wom-goldHover text-black font-extrabold text-sm rounded-xl transition shadow-gold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right 1 Col: Office Location & Direct Communication */}
          <div className="space-y-6">
            <div className="bg-[#121622] border border-wom-darkBorder rounded-2xl p-5 sm:p-7 space-y-5 sm:space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white font-raleway border-b border-wom-darkBorder pb-3">
                Headquarters
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-wom-gold/10 text-wom-gold flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">Mumbai Office</strong>
                    <p className="text-gray-400 leading-relaxed">
                      Lotus Corporate Park, G wing, 801 Off Western Express Highway, Near Jai Coach, Mumbai, MH, 400063
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-wom-gold/10 text-wom-gold flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">Telephone</strong>
                    <p className="text-gray-300">
                      <a href="tel:+919009999434" className="hover:text-wom-gold transition">
                        +91 9009999434
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-wom-gold/10 text-wom-gold flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <strong className="text-white block mb-0.5">Email Support</strong>
                    <p className="text-gray-300 break-all">
                      <a
                        href="mailto:connect@worldofmusicians.com"
                        className="hover:text-wom-gold transition"
                      >
                        connect@worldofmusicians.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-wom-gold/10 text-wom-gold flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-white block mb-0.5">Working Hours</strong>
                    <p className="text-gray-400">Monday – Saturday: 10:00 AM – 8:00 PM IST</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="pt-4 border-t border-wom-darkBorder">
                <a
                  href="https://wa.me/919009999434"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25d366] hover:bg-[#20ba59] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Instant WhatsApp Chat (+91 9009999434)
                </a>
              </div>
            </div>

            {/* Google Map Mock/Embed representation matching WOM */}
            <div className="bg-[#121622] border border-wom-darkBorder rounded-2xl p-4 overflow-hidden">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Map Location
              </span>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-wom-darkBorder">
                <iframe
                  title="Lotus Corporate Park Mumbai Location"
                  src="https://maps.google.com/maps?q=Lotus%20Corporate%20Park,%20Goregaon,%20Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-300"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
