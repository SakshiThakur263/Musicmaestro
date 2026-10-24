const express = require('express');
const router = express.Router();
const {
  getArtists,
  getFeaturedArtists,
  getArtistBySlug,
  createArtist,
  addArtistReview,
} = require('../controllers/artistController');
const artistValidator = require('../validators/artistValidator');
const validate = require('../middleware/validate');

router.get('/featured', getFeaturedArtists);
router.get('/', getArtists);
router.get('/:slug', getArtistBySlug);
router.post('/', artistValidator, validate, createArtist);
router.post('/:id/reviews', addArtistReview);

module.exports = router;
