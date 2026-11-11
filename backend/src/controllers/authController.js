const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { normalizePhone, sendRegistrationWhatsApp } = require('../services/whatsappService');
const { sendRegistrationEmails } = require('../services/emailService');

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'wom_super_secret_jwt_key_2026',
    { expiresIn: '30d' }
  );
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const toPublicUser = (user) => ({
  _id: user._id,
  username: user.username,
  email: user.email,
  phone: user.phone,
  role: user.role,
  firstName: user.firstName,
  lastName: user.lastName,
});

// Accounts need the database; fail fast with a clear message instead of hanging
const ensureDbConnected = (res) => {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({
      success: false,
      message: 'Our servers are busy right now. Please try again in a minute.',
    });
    return false;
  }
  return true;
};

// @desc    Register a new user (Client or Artist)
// @route   POST /api/auth/register
const register = async (req, res, next) => {
  try {
    if (!ensureDbConnected(res)) return;

    const { username, email, password, firstName, lastName, role, phone } = req.body;
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedPhone = normalizePhone(phone);

    // Case-insensitive duplicate check on email and username
    const userExists = await User.findOne({
      $or: [
        { email: normalizedEmail },
        { username: { $regex: `^${escapeRegex(username.trim())}$`, $options: 'i' } },
      ],
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message:
          userExists.email === normalizedEmail
            ? 'An account with this email already exists. Please sign in instead.'
            : 'This username is already taken. Please choose another.',
      });
    }

    const user = await User.create({
      username: username.trim(),
      email: normalizedEmail,
      password,
      phone: normalizedPhone,
      firstName: firstName || '',
      lastName: lastName || '',
      role: role === 'artist' ? 'artist' : 'client',
    });

    // Notifications to the new user + Music Maestro team (fire-and-forget so
    // a slow/failed provider never blocks sign-up):
    //  - Email (free via Gmail SMTP): admin alert + welcome email
    //  - WhatsApp API (optional, paid): only runs when WHATSAPP_PROVIDER is set.
    //    The free WhatsApp confirmation is user-initiated from the frontend.
    sendRegistrationEmails(user).catch((err) =>
      console.error('[Auth]: Registration email error:', err.message)
    );
    if (process.env.WHATSAPP_PROVIDER) {
      sendRegistrationWhatsApp(user).catch((err) =>
        console.error('[Auth]: Registration WhatsApp error:', err.message)
      );
    }

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: { ...toPublicUser(user), token: generateToken(user._id) },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
const login = async (req, res, next) => {
  try {
    if (!ensureDbConnected(res)) return;

    const { email, password } = req.body;
    const identifier = email.trim();

    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: { $regex: `^${escapeRegex(identifier)}$`, $options: 'i' } },
      ],
    });

    if (user && (await user.comparePassword(password))) {
      res.json({
        success: true,
        message: 'Login successful',
        data: { ...toPublicUser(user), token: generateToken(user._id) },
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email/username or password',
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
};
