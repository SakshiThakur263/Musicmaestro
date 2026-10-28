import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Lock,
  Mail,
  User as UserIcon,
  Briefcase,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  LogOut,
  PlusCircle,
} from 'lucide-react';

const AuthPage = ({ defaultTab = 'login' }) => {
  const { user, isAuthenticated, login, register, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(
    location.pathname.includes('register') ? 'register' : defaultTab
  );
  const [role, setRole] = useState('client'); // 'client' | 'artist'
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    rememberMe: true,
    agreePrivacy: true,
    agreeTerms: true,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (location.pathname.includes('register')) {
      setActiveTab('register');
    } else if (location.pathname.includes('login')) {
      setActiveTab('login');
    }
  }, [location.pathname]);

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
        setSuccessMsg('Logged in successfully! Redirecting...');
        setTimeout(() => navigate('/'), 900);
      } else {
        if (!formData.agreePrivacy || !formData.agreeTerms) {
          setError('Please agree to the Privacy Policy and Terms & Conditions to register.');
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
        setSuccessMsg('Account registered successfully! Redirecting...');
        setTimeout(() => {
          navigate(role === 'artist' ? '/add-listing' : '/');
        }, 900);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Unable to complete request. Please check your credentials and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#181818] pt-24 sm:pt-28 pb-16 sm:pb-24 px-4 text-white flex items-center justify-center">
      <div className="w-full max-w-lg">
        {/* Page Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-raleway text-[#f4a51c]">
            {isAuthenticated
              ? 'My Profile'
              : activeTab === 'register'
              ? 'Register Now'
              : 'Sign In'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-2">
            {isAuthenticated
              ? 'Manage your Music Maestro account and artist listings'
              : 'Access your Music Maestro account or register as a Client or Artist'}
          </p>
        </div>

        {isAuthenticated ? (
          <div className="bg-[#222222] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#f4a51c] text-black font-extrabold text-2xl flex items-center justify-center mx-auto shadow-lg">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-raleway">
                {user?.firstName
                  ? `${user.firstName} ${user.lastName || ''}`
                  : user?.username}
              </h2>
              <p className="text-xs text-gray-400 mt-1">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#f4a51c]/20 text-[#f4a51c] border border-[#f4a51c]/40 text-xs font-bold uppercase">
                {user?.role || 'Member'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Link
                to="/add-listing"
                className="px-5 py-3 bg-[#f4a51c] hover:bg-[#e09414] text-black font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                Add Artist Listing
              </Link>
              <Link
                to="/event-inquiry"
                className="px-5 py-3 bg-[#181f2c] hover:bg-white/10 text-white border border-white/15 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition"
              >
                Book an Artist
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <button
              onClick={logout}
              className="w-full py-3 bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        ) : (
          <div className="bg-[#222222] border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
            {/* Tabs: Log In | Register */}
            <div className="flex border-b border-white/10 bg-[#1a1a1a]">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setError('');
                }}
                className={`flex-1 py-3.5 text-sm font-bold transition border-b-2 ${
                  activeTab === 'login'
                    ? 'border-[#f4a51c] text-[#f4a51c] bg-[#f4a51c]/5'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('register');
                  setError('');
                }}
                className={`flex-1 py-3.5 text-sm font-bold transition border-b-2 ${
                  activeTab === 'register'
                    ? 'border-[#f4a51c] text-[#f4a51c] bg-[#f4a51c]/5'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {error && (
                <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-2.5 text-red-400 text-xs sm:text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {successMsg && (
                <div className="mb-5 p-3.5 bg-green-500/10 border border-green-500/30 rounded-xl flex items-start gap-2.5 text-green-400 text-xs sm:text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {activeTab === 'register' && (
                  <>
                    {/* Client vs Artist Role Selector matching worldofmusicians.com/register-now/ */}
                    <div className="grid grid-cols-2 gap-3 pb-1">
                      <button
                        type="button"
                        onClick={() => setRole('client')}
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs sm:text-sm font-bold transition ${
                          role === 'client'
                            ? 'border-[#f4a51c] bg-[#f4a51c] text-black shadow-md'
                            : 'border-white/15 bg-[#181818] text-gray-300 hover:border-white/40'
                        }`}
                      >
                        <UserIcon className="w-4 h-4" />
                        <span>Client</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('artist')}
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs sm:text-sm font-bold transition ${
                          role === 'artist'
                            ? 'border-[#f4a51c] bg-[#f4a51c] text-black shadow-md'
                            : 'border-white/15 bg-[#181818] text-gray-300 hover:border-white/40'
                        }`}
                      >
                        <Briefcase className="w-4 h-4" />
                        <span>Artist</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="First Name"
                          className="w-full px-3.5 py-2.5 bg-[#181818] border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-[#f4a51c]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last Name"
                          className="w-full px-3.5 py-2.5 bg-[#181818] border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-[#f4a51c]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Username *
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          name="username"
                          required
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="Choose a username"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-[#181818] border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-[#f4a51c]"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#181818] border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-[#f4a51c]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-gray-300">
                      Password *
                    </label>
                    {activeTab === 'login' && (
                      <button
                        type="button"
                        onClick={() =>
                          alert(
                            'Please contact musicmaestroevent@gmail.com or +91 9009999434 to reset your password.'
                          )
                        }
                        className="text-xs text-[#f4a51c] hover:underline"
                      >
                        Lost Your Password?
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
                      placeholder={
                        activeTab === 'login'
                          ? 'Enter your password'
                          : 'Create a password (min 6 chars)'
                      }
                      className="w-full pl-10 pr-10 py-2.5 bg-[#181818] border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-[#f4a51c]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {activeTab === 'login' ? (
                  <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="w-4 h-4 rounded accent-[#f4a51c]"
                    />
                    <span>Remember Me</span>
                  </label>
                ) : (
                  <div className="space-y-2 pt-1 text-xs text-gray-300">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreePrivacy"
                        checked={formData.agreePrivacy}
                        onChange={handleChange}
                        className="w-4 h-4 rounded accent-[#f4a51c]"
                      />
                      <span>
                        I agree to the{' '}
                        <Link
                          to="/privacy-policy"
                          className="text-[#f4a51c] underline"
                        >
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="w-4 h-4 rounded accent-[#f4a51c]"
                      />
                      <span>
                        I agree to the{' '}
                        <Link
                          to="/terms-conditions"
                          className="text-[#f4a51c] underline"
                        >
                          Terms and Conditions
                        </Link>
                      </span>
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#f4a51c] hover:bg-[#e09414] text-white font-extrabold text-sm rounded-lg shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading
                    ? 'Processing...'
                    : activeTab === 'login'
                    ? 'Sign In'
                    : 'Register'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
