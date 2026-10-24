import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor to inject token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('wom_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Artist APIs
export const fetchArtists = async (params = {}) => {
  const response = await api.get('/artists', { params });
  return response.data;
};

export const fetchFeaturedArtists = async () => {
  const response = await api.get('/artists/featured');
  return response.data;
};

export const fetchArtistBySlug = async (slug) => {
  const response = await api.get(`/artists/${slug}`);
  return response.data;
};

export const createArtistListing = async (artistData) => {
  const response = await api.post('/artists', artistData);
  return response.data;
};

export const submitArtistReview = async (artistId, reviewData) => {
  const response = await api.post(`/artists/${artistId}/reviews`, reviewData);
  return response.data;
};

// Category APIs
export const fetchCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

// Inquiry & Booking APIs
export const submitInquiry = async (inquiryData) => {
  const response = await api.post('/inquiries', inquiryData);
  return response.data;
};

// Contact API
export const submitContactMessage = async (contactData) => {
  const response = await api.post('/contact', contactData);
  return response.data;
};

// Auth APIs
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const fetchCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Stats API
export const fetchPlatformStats = async () => {
  const response = await api.get('/stats');
  return response.data;
};

export default api;
