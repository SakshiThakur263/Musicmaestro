import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User as UserIcon, Briefcase, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

const AuthModal = () => {
  const { isAuthModalOpen, authModalConfig, closeAuthModal, login, register } = useAuth();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [role, setRole] = useState('client'); // 'client' | 'artist'
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    agreeTerms: true,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (authModalConfig) {
      setActiveTab(authModalConfig.defaultTab || 'login');
      setRole(authModalConfig.defaultRole || 'client');
      setError('');
      setSuccessMsg('');
    }
  }, [authModalConfig, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (activeTab === 'login') {
        await login({
          email: formData.email,
          password: formData.password,
        });
        setSuccessMsg('Logged in successfully!');
      } else {
        if (!formData.agreeTerms) {
          setError('You must accept the terms and privacy policy to register.');
          setLoading(false);
          return;
        }

        await register({
          username: formData.username || formData.email.split('@')[0],
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role,
        });
        setSuccessMsg('Account registered successfully!');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-[#131822] border border-wom-darkBorder rounded-2xl shadow-2xl overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title and Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-wom-darkBorder bg-[#0f131c]">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-wom-gold inline-block animate-pulse"></span>
            {activeTab === 'login' ? 'Sign In to World of Musicians' : 'Create an Account'}
          </h3>
          <button
            onClick={closeAuthModal}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-wom-darkBorder bg-[#0e1219]">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setError('');
            }}
            className={`flex-1 py-3 text-sm font-semibold transition border-b-2 ${
              activeTab === 'login'
                ? 'border-wom-gold text-wom-gold bg-wom-gold/5'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setError('');
            }}
            className={`flex-1 py-3 text-sm font-semibold transition border-b-2 ${
              activeTab === 'register'
                ? 'border-wom-gold text-wom-gold bg-wom-gold/5'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Register
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2.5 text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-2.5 text-green-400 text-sm">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'register' && (
              <>
                {/* Role Switcher: Client vs Artist matching reference */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    I want to register as:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole('client')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-sm font-medium transition ${
                        role === 'client'
                          ? 'border-wom-gold bg-wom-gold text-black font-semibold shadow-gold-sm'
                          : 'border-wom-darkBorder bg-[#181f2c] text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <UserIcon className="w-4 h-4" />
                      Client / Host
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('artist')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border text-sm font-medium transition ${
                        role === 'artist'
                          ? 'border-wom-gold bg-wom-gold text-black font-semibold shadow-gold-sm'
                          : 'border-wom-darkBorder bg-[#181f2c] text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <Briefcase className="w-4 h-4" />
                      Musician / Artist
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul"
                      className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-sm focus:outline-none focus:border-wom-gold transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="e.g. Sharma"
                      className="w-full px-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-sm focus:outline-none focus:border-wom-gold transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Username</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Choose a username"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-sm focus:outline-none focus:border-wom-gold transition"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-sm focus:outline-none focus:border-wom-gold transition"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-medium text-gray-300">Password</label>
                {activeTab === 'login' && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset link will be sent to your email.')}
                    className="text-xs text-wom-gold hover:underline"
                  >
                    Lost your password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={activeTab === 'login' ? 'Enter password' : 'Create a secure password (6+ chars)'}
                  className="w-full pl-10 pr-10 py-2.5 bg-[#181f2c] border border-wom-darkBorder rounded-lg text-white text-sm focus:outline-none focus:border-wom-gold transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {activeTab === 'register' && (
              <div className="space-y-2 pt-1 text-xs text-gray-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-wom-gold focus:ring-wom-gold bg-[#181f2c] border-gray-600"
                  />
                  <span>
                    I agree to the <span className="text-wom-gold underline">Privacy Policy</span> and{' '}
                    <span className="text-wom-gold underline">Terms & Conditions</span>
                  </span>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 bg-wom-gold hover:bg-wom-goldHover text-black font-bold rounded-lg shadow-gold transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : activeTab === 'login' ? (
                'Login'
              ) : (
                'Complete Registration'
              )}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-wom-darkBorder text-center text-xs text-gray-400">
            {activeTab === 'login' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  onClick={() => setActiveTab('register')}
                  className="text-wom-gold font-semibold hover:underline"
                >
                  Register here
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setActiveTab('login')}
                  className="text-wom-gold font-semibold hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
