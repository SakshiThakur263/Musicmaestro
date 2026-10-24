const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');

describe('World of Musicians API Tests', () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/world_of_musicians';
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/health', () => {
    it('should return 200 and ok status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });

  describe('GET /api/categories', () => {
    it('should return list of categories and grouped structure', async () => {
      const res = await request(app).get('/api/categories');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.grouped).toHaveProperty('Solo Performer');
      expect(res.body.grouped).toHaveProperty('Live Bands');
    });
  });

  describe('GET /api/artists', () => {
    it('should return artists list with pagination data', async () => {
      const res = await request(app).get('/api/artists');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should filter artists by search keyword', async () => {
      const res = await request(app).get('/api/artists?search=Manmeet');
      expect(res.statusCode).toBe(200);
      expect(res.body.data.some((a) => a.name.includes('Manmeet'))).toBe(true);
    });

    it('should filter artists by category', async () => {
      const res = await request(app).get('/api/artists?category=Live%20Bands');
      expect(res.statusCode).toBe(200);
      expect(res.body.data.every((a) => a.category === 'Live Bands')).toBe(true);
    });
  });

  describe('GET /api/artists/:slug', () => {
    it('should return a single artist by slug with reviews and similar artists', async () => {
      const res = await request(app).get('/api/artists/manmeet');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.artist.slug).toBe('manmeet');
      expect(Array.isArray(res.body.data.reviews)).toBe(true);
    });

    it('should return 404 for non-existent artist slug', async () => {
      const res = await request(app).get('/api/artists/unknown-artist-999');
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/inquiries', () => {
    it('should validate and create a new event booking inquiry', async () => {
      const newInquiry = {
        name: 'Test Client',
        email: 'testclient@example.com',
        phone: '+91 9876543210',
        eventType: 'Corporate',
        eventDate: '2026-12-15',
        city: 'Mumbai',
        guestCount: '250',
        budget: 'Rs. 1,00,000 - 2,00,000',
        artistName: 'Manmeet',
        notes: 'Looking for a 2-hour energetic Bollywood set.',
      };

      const res = await request(app).post('/api/inquiries').send(newInquiry);
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.inquiryReference).toBeDefined();
    });

    it('should fail with 400 when missing required fields', async () => {
      const res = await request(app).post('/api/inquiries').send({ name: 'Incomplete' });
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('POST /api/contact', () => {
    it('should submit a contact message successfully', async () => {
      const contactMsg = {
        name: 'Event Organizer',
        email: 'organizer@example.com',
        subject: 'Partnership Query',
        message: 'We are organizing a music festival in Goa and want to partner.',
      };

      const res = await request(app).post('/api/contact').send(contactMsg);
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
    });
  });
});
