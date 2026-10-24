const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Artist = require('../models/Artist');
const Category = require('../models/Category');
const Review = require('../models/Review');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const categoriesData = [
  // Solo Performer
  { name: 'Singer Guitarist', slug: 'singer-guitarist', parentGroup: 'Solo Performer', icon: 'Guitar', isFeatured: true },
  { name: 'Singer Keyboardist', slug: 'singer-keyboardist', parentGroup: 'Solo Performer', icon: 'Piano', isFeatured: false },
  { name: 'Flute', slug: 'flute', parentGroup: 'Solo Performer', icon: 'Wind', isFeatured: false },
  { name: 'Jal Tarang', slug: 'jal-tarang', parentGroup: 'Solo Performer', icon: 'Waves', isFeatured: false },
  { name: 'Saxophone', slug: 'saxophone', parentGroup: 'Solo Performer', icon: 'Music', isFeatured: true },
  { name: 'Pianist', slug: 'pianist', parentGroup: 'Solo Performer', icon: 'Piano', isFeatured: false },
  { name: 'Violinist', slug: 'violinist', parentGroup: 'Solo Performer', icon: 'Music', isFeatured: true },
  { name: 'Karaoke', slug: 'karaoke', parentGroup: 'Solo Performer', icon: 'Mic', isFeatured: false },

  // Live Bands
  { name: 'Celebrity Singer/Bands', slug: 'celebrity-singer-bands', parentGroup: 'Live Bands', icon: 'Star', isFeatured: true },
  { name: 'Bollywood', slug: 'bollywood', parentGroup: 'Live Bands', icon: 'Film', isFeatured: true },
  { name: 'Sufi & Qawwali', slug: 'sufi-and-qawwali', parentGroup: 'Live Bands', icon: 'Heart', isFeatured: true },
  { name: 'Western', slug: 'western', parentGroup: 'Live Bands', icon: 'Radio', isFeatured: false },
  { name: 'Classical', slug: 'classical', parentGroup: 'Live Bands', icon: 'Disc', isFeatured: false },
  { name: 'Devotional/Bhajan', slug: 'devotional-bhajan', parentGroup: 'Live Bands', icon: 'Sparkles', isFeatured: false },
  { name: 'DJ Based', slug: 'dj-based', parentGroup: 'Live Bands', icon: 'Speaker', isFeatured: true },
  { name: 'Folk/Regional', slug: 'folk-regional', parentGroup: 'Live Bands', icon: 'Globe', isFeatured: false },
  { name: 'Instrumental', slug: 'instrumental-live-bands', parentGroup: 'Live Bands', icon: 'Music2', isFeatured: false },
  { name: 'Musical Pheras/ Divine Chants', slug: 'musical-pheras-and-divine-chants', parentGroup: 'Live Bands', icon: 'Flame', isFeatured: true },

  // DJ Services
  { name: 'DJ', slug: 'dj', parentGroup: 'DJ Services', icon: 'Disc3', isFeatured: true },
  { name: 'VDJ', slug: 'vdj', parentGroup: 'DJ Services', icon: 'Video', isFeatured: false },
  { name: 'DJ Percussions', slug: 'dj-percussions', parentGroup: 'DJ Services', icon: 'Drum', isFeatured: true },
  { name: 'Wedding DJ', slug: 'wedding-dj', parentGroup: 'DJ Services', icon: 'HeartHandshake', isFeatured: true },

  // Others
  { name: 'Anchors/Emcee', slug: 'anchors-emcee', parentGroup: 'Others', icon: 'Mic2', isFeatured: true },
  { name: 'Stand Up Comedians', slug: 'stand-up-comedians', parentGroup: 'Others', icon: 'Smile', isFeatured: true },
  { name: 'Illusionist/Magicians', slug: 'illusionist-magicians', parentGroup: 'Others', icon: 'Wand2', isFeatured: false },
  { name: 'Motivational Speakers', slug: 'motivational-speakers', parentGroup: 'Others', icon: 'Volume2', isFeatured: false },
  { name: 'Special Acts', slug: 'special-acts', parentGroup: 'Others', icon: 'Zap', isFeatured: false },
  { name: 'Dancer & Choreographer', slug: 'dancers-and-choreographer', parentGroup: 'Others', icon: 'Footprints', isFeatured: false },
];

const artistsData = [
  {
    name: 'Manmeet',
    slug: 'manmeet',
    tagline: 'Versatile Bollywood & Sufi Performer for High-Energy Shows',
    category: 'Live Bands',
    subcategory: 'Bollywood',
    location: 'Mumbai',
    bio: 'Manmeet is a versatile and renowned Bollywood Singer. He is celebrated for his electrifying, high-energy setlists crafted especially for luxury weddings, corporate galas, and premier club events across India and worldwide. With over 2,000 live shows delivered with stellar acclaim, Manmeet brings timeless Bollywood classics, groovy Punjabi anthems, and modern party mashups to life.',
    priceStarting: 75000,
    priceRange: 'Rs. 75,000 - 1,50,000',
    featuredImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    ],
    videos: [
      {
        title: 'Manmeet Live at Grand Wedding Showcase',
        url: 'https://www.youtube.com/watch?v=GqkMjSBppiQ',
        embedUrl: 'https://www.youtube.com/embed/GqkMjSBppiQ',
      },
      {
        title: 'High Voltage Punjabi & Bollywood Mashup',
        url: 'https://www.youtube.com/watch?v=TstpVkI5lOE',
        embedUrl: 'https://www.youtube.com/embed/TstpVkI5lOE',
      },
    ],
    audioSamples: [
      { title: 'Channa Mereya x Kabira (Unplugged)', url: 'https://actions.google.com/sounds/v1/ambiences/outdoor_celebration.ogg', duration: '3:45' },
      { title: 'Bulleya (Sufi Rock Live)', url: 'https://actions.google.com/sounds/v1/music/acoustic_guitar_medley.ogg', duration: '4:12' },
    ],
    rating: 4.9,
    reviewCount: 38,
    featured: true,
    verified: true,
    showsCompleted: 2100,
    genres: ['Bollywood', 'Punjabi', 'Sufi Rock', 'Retro Mashup'],
    languages: ['Hindi', 'Punjabi', 'English'],
    performanceTypes: ['Weddings', 'Corporate Galas', 'Cocktail Nights', 'Concerts'],
    socialLinks: {
      instagram: 'https://instagram.com/manmeetsinghlive',
      youtube: 'https://youtube.com',
      spotify: 'https://spotify.com',
    },
  },
  {
    name: 'Palchang',
    slug: 'palchang',
    tagline: 'Soulful Live Band bringing mesmerizing indie & commercial melodies',
    category: 'Live Bands',
    subcategory: 'Live Bands',
    location: 'Mumbai',
    bio: 'Palchang is an extraordinary ensemble blending acoustic textures, modern percussions, and heartwarming vocals. Known for their seamless ability to adapt from cozy intimate gatherings to grand stage concerts, Palchang elevates any event into an unforgettable musical retreat.',
    priceStarting: 60000,
    priceRange: 'Rs. 60,000 - 1,20,000',
    featuredImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    ],
    videos: [
      {
        title: 'Palchang Live Concert Montage',
        url: 'https://www.youtube.com/watch?v=3jhVnOmybEg',
        embedUrl: 'https://www.youtube.com/embed/3jhVnOmybEg',
      },
    ],
    audioSamples: [
      { title: 'Ilahi Unplugged', url: 'https://actions.google.com/sounds/v1/music/acoustic_guitar_medley.ogg', duration: '3:20' },
    ],
    rating: 4.8,
    reviewCount: 22,
    featured: true,
    verified: true,
    showsCompleted: 450,
    genres: ['Indie Fusion', 'Bollywood Pop', 'Acoustic'],
    languages: ['Hindi', 'English'],
    performanceTypes: ['Weddings', 'Corporate Events', 'College Fests'],
  },
  {
    name: 'Ibex',
    slug: 'ibex',
    tagline: 'Dynamic Singer-Guitarist & Acoustic Maestro',
    category: 'Solo Performer',
    subcategory: 'Singer Guitarist',
    location: 'Mumbai',
    bio: 'Ibex is a powerhouse singer and multi-instrumentalist whose warm voice and nimble guitar chords captivate audiences from the first strum. From Ed Sheeran and Coldplay acoustic covers to modern Bollywood love songs, Ibex sets the ideal mood for cocktail parties, sundowners, and receptions.',
    priceStarting: 35000,
    priceRange: 'Rs. 35,000 - 65,000',
    featuredImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1445985543470-41fdd6ce388d?auto=format&fit=crop&w=1200&q=80',
    ],
    videos: [
      {
        title: 'Ibex Acoustic Sundowner Session',
        url: 'https://www.youtube.com/watch?v=HqJzui2afNw',
        embedUrl: 'https://www.youtube.com/embed/HqJzui2afNw',
      },
    ],
    rating: 4.9,
    reviewCount: 19,
    featured: true,
    verified: true,
    showsCompleted: 600,
    genres: ['Pop', 'Acoustic Rock', 'Bollywood Unplugged'],
    languages: ['English', 'Hindi'],
    performanceTypes: ['Cocktails', 'Sundowners', 'Private Dinners', 'Weddings'],
  },
  {
    name: 'Hiroko Sarah',
    slug: 'hiroko-sarah',
    tagline: 'World-Renowned International Violin Virtuoso',
    category: 'Solo Performer',
    subcategory: 'Violinist',
    location: 'Mumbai',
    bio: 'Hiroko Sarah brings an ethereal grace and dramatic energy with her electric and acoustic violin. Trained at world-class music academies, Hiroko merges classical finesse with pulsing modern EDM and cinematic scores, creating breathtaking bridal entry moments and high-profile corporate openings.',
    priceStarting: 50000,
    priceRange: 'Rs. 50,000 - 1,00,000',
    featuredImage: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=1200&q=80',
    ],
    videos: [
      {
        title: 'Hiroko Sarah Live Electric Violin Performance',
        url: 'https://www.youtube.com/watch?v=jeUZm0jnKOs',
        embedUrl: 'https://www.youtube.com/embed/jeUZm0jnKOs',
      },
    ],
    rating: 5.0,
    reviewCount: 31,
    featured: true,
    verified: true,
    showsCompleted: 800,
    genres: ['Classical Crossover', 'Electric Violin', 'Cinematic EDM'],
    languages: ['Instrumental'],
    performanceTypes: ['Bridal Entries', 'Luxury Corporate Galas', 'Product Launches'],
  },
  {
    name: 'DJ Saggy',
    slug: 'dj-saggy',
    tagline: 'Club-Tested High Voltage Beats & Global EDM Maestro',
    category: 'DJ Services',
    subcategory: 'DJ',
    location: 'Delhi',
    bio: 'DJ Saggy is known for driving dance floors into a frenzy with irresistible Bollywood dance mixes, commercial deep house, UK Punjabi, and festival-grade EDM drops. Resident at elite nightclubs and a favorite at big-fat Indian sangeets across Delhi, Goa, and Dubai.',
    priceStarting: 45000,
    priceRange: 'Rs. 45,000 - 90,000',
    featuredImage: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    ],
    videos: [
      {
        title: 'DJ Saggy Sangeet Live Madness',
        url: 'https://www.youtube.com/watch?v=2KhCzhCWtB0',
        embedUrl: 'https://www.youtube.com/embed/2KhCzhCWtB0',
      },
    ],
    rating: 4.9,
    reviewCount: 45,
    featured: true,
    verified: true,
    showsCompleted: 1400,
    genres: ['Bollywood Commercial', 'EDM', 'Punjabi Club', 'Tech House'],
    languages: ['Hindi', 'English', 'Punjabi'],
    performanceTypes: ['Sangeet Afterparties', 'Club Nights', 'Destination Weddings'],
  },
  {
    name: 'Jaipur Beats Fusion Band',
    slug: 'jaipur-beats-fusion-band',
    tagline: 'Rajasthani Folk Meets Modern Rock & Global Fusion',
    category: 'Live Bands',
    subcategory: 'Folk/Regional',
    location: 'Jaipur',
    bio: 'Jaipur Beats combines authentic Rajasthani folk instruments like the Khartal, Morchang, and Sarangi with heavy electric guitars, driving drums, and transcendent Sufi chants. Their electrifying sound has enthralled royal palace weddings and international cultural fests alike.',
    priceStarting: 80000,
    priceRange: 'Rs. 80,000 - 1,75,000',
    featuredImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 4.9,
    reviewCount: 29,
    featured: true,
    verified: true,
    showsCompleted: 950,
    genres: ['Rajasthani Folk', 'Folk Rock', 'Sufi Fusion'],
    languages: ['Rajasthani', 'Hindi'],
    performanceTypes: ['Palace Weddings', 'Cultural Festivals', 'Corporate Gatherings'],
  },
  {
    name: 'Saloni Karn',
    slug: 'saloni-karn',
    tagline: 'Charismatic Celebrity Anchor, Emcee & Corporate Host',
    category: 'Others',
    subcategory: 'Anchors/Emcee',
    location: 'Delhi',
    bio: 'Saloni Karn is one of India’s most in-demand corporate and wedding emcees. Known for her spontaneous wit, radiant stage presence, and bilingual finesse, Saloni anchors high-stakes annual business awards, lavish destination sangeets, and celebrity talk shows with poise and charm.',
    priceStarting: 40000,
    priceRange: 'Rs. 40,000 - 80,000',
    featuredImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 4.9,
    reviewCount: 34,
    featured: true,
    verified: true,
    showsCompleted: 700,
    genres: ['Corporate Emcee', 'Wedding Anchor', 'Celebrity Interviews'],
    languages: ['English', 'Hindi'],
    performanceTypes: ['Corporate Summits', 'Award Ceremonies', 'Wedding Sangeets'],
  },
  {
    name: 'The Taqdeer Collective',
    slug: 'the-taqdeer-collective',
    tagline: 'Authentic Sufi, Qawwali & Soulful Ghazal Orchestra',
    category: 'Live Bands',
    subcategory: 'Sufi & Qawwali',
    location: 'Delhi',
    bio: 'Rooted in timeless heritage, The Taqdeer Collective delivers intoxicating qawwali recitals and soulful Sufi melodies. Captivating lyrics from Amir Khusro, Bulleh Shah, and Nusrat Fateh Ali Khan resonate through their harmonium, dholak, and harmonized choruses.',
    priceStarting: 85000,
    priceRange: 'Rs. 85,000 - 2,00,000',
    featuredImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 4.8,
    reviewCount: 27,
    featured: true,
    verified: true,
    showsCompleted: 620,
    genres: ['Sufi', 'Qawwali', 'Ghazal', 'Devotional'],
    languages: ['Urdu', 'Hindi', 'Punjabi'],
    performanceTypes: ['Sufi Nights', 'Mehndi Ceremonies', 'Cultural Evenings'],
  },
  {
    name: 'Sonu Nigam',
    slug: 'sonu-nigam',
    tagline: 'Iconic Bollywood Playback Legend & Global Maestro',
    category: 'Live Bands',
    subcategory: 'Celebrity Singer/Bands',
    location: 'Mumbai',
    bio: 'Sonu Nigam is a legendary icon of Indian music whose voice defines decades of beloved cinema hits. Available for headline corporate celebrations, grand arena concerts, and premier destination wedding celebrations, Sonu Nigam creates an unforgettable musical milestone for every attendee.',
    priceStarting: 2500000,
    priceRange: 'Rs. 25,00,000+',
    featuredImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 5.0,
    reviewCount: 120,
    featured: true,
    verified: true,
    showsCompleted: 3500,
    genres: ['Bollywood Playback', 'Romantic Classics', 'Ghazal', 'Pop'],
    languages: ['Hindi', 'English', 'Bengali', 'Kannada', 'Marathi'],
    performanceTypes: ['Mega Arena Concerts', 'Grand Royal Weddings', 'Corporate Milestones'],
  },
  {
    name: 'Reon',
    slug: 'reon',
    tagline: 'Sensational Saxophone Soloist & Jazz Fusion Artist',
    category: 'Solo Performer',
    subcategory: 'Saxophone',
    location: 'Goa',
    bio: 'Reon crafts smooth jazz, beachside sunset lounge grooves, and energetic pop-sax hooks. Perfect for luxury cocktail hours, beach weddings, and high-fashion galas across Goa, Mumbai, and Bangalore.',
    priceStarting: 40000,
    priceRange: 'Rs. 40,000 - 75,000',
    featuredImage: 'https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 4.9,
    reviewCount: 16,
    featured: false,
    verified: true,
    showsCompleted: 380,
    genres: ['Smooth Jazz', 'Sunset Lounge', 'Pop Sax'],
    languages: ['Instrumental'],
    performanceTypes: ['Cocktail Hours', 'Receptions', 'Sundowners'],
  },
  {
    name: 'Puneet Kushwaha',
    slug: 'puneet-kushwaha',
    tagline: 'Spiritual Musical Pheras & Divine Vedic Chants',
    category: 'Live Bands',
    subcategory: 'Musical Pheras/ Divine Chants',
    location: 'Pune',
    bio: 'Specializing in transformative Vedic wedding ceremonies, Puneet Kushwaha and his troupe bring emotional depth, explain sacred wedding vows with soulful chants, and enrich the matrimonial bond with sublime musical accompaniment.',
    priceStarting: 55000,
    priceRange: 'Rs. 55,000 - 1,10,000',
    featuredImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 4.9,
    reviewCount: 24,
    featured: false,
    verified: true,
    showsCompleted: 520,
    genres: ['Vedic Chants', 'Devotional Bhajan', 'Musical Pheras'],
    languages: ['Sanskrit', 'Hindi'],
    performanceTypes: ['Wedding Pheras', 'Spiritual Gatherings'],
  },
  {
    name: 'Ishita',
    slug: 'ishita',
    tagline: 'Enchanting Classical & Contemporary Flutist',
    category: 'Solo Performer',
    subcategory: 'Flute',
    location: 'Mumbai',
    bio: 'Ishita produces heavenly flute melodies combining Hindustani ragas with contemporary world ambient tones. Ideal for peaceful wedding welcome rituals, introspective corporate ceremonies, and cultural exhibits.',
    priceStarting: 30000,
    priceRange: 'Rs. 30,000 - 55,000',
    featuredImage: 'https://images.unsplash.com/photo-1519744346361-8b2737675549?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1519744346361-8b2737675549?auto=format&fit=crop&w=1200&q=80',
    ],
    rating: 4.8,
    reviewCount: 14,
    featured: false,
    verified: true,
    showsCompleted: 290,
    genres: ['Hindustani Classical', 'Ambient World', 'Fusion'],
    languages: ['Instrumental'],
    performanceTypes: ['Guest Welcome', 'Dinner Music', 'Exhibitions'],
  },
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/world_of_musicians';
    await mongoose.connect(mongoUri);
    console.log('[Seed]: Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Artist.deleteMany({});
    await Review.deleteMany({});
    console.log('[Seed]: Cleared existing Categories, Artists, and Reviews');

    // Insert categories
    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`[Seed]: Inserted ${createdCategories.length} categories`);

    // Insert artists
    const createdArtists = await Artist.insertMany(artistsData);
    console.log(`[Seed]: Inserted ${createdArtists.length} artists`);

    // Insert initial reviews for Manmeet
    const manmeet = createdArtists.find((a) => a.slug === 'manmeet');
    if (manmeet) {
      await Review.create([
        {
          artistId: manmeet._id,
          reviewerName: 'Aarav Mehta (SKIL Events)',
          reviewerEmail: 'aarav@skilevents.com',
          rating: 5,
          eventType: 'Corporate Gala',
          comment: 'Manmeet had all 700 delegates on their feet in Goa! Truly world-class energy and professionalism. Will book him again.',
        },
        {
          artistId: manmeet._id,
          reviewerName: 'Priya & Rohan Singhania',
          reviewerEmail: 'priya@gmail.com',
          rating: 5,
          eventType: 'Wedding Sangeet',
          comment: 'Our sangeet in Udaipur became the talk of the family. The Bollywood mashups and Punjabi sets were beyond incredible!',
        },
      ]);
      console.log('[Seed]: Seeded reviews for Manmeet');
    }

    console.log('[Seed]: Database seeding completed successfully!');
    if (require.main === module) {
      process.exit(0);
    }
  } catch (error) {
    console.error('[Seed Error]:', error.message);
    if (require.main === module) {
      process.exit(1);
    }
  }
};

if (require.main === module) {
  seedDB();
}

module.exports = seedDB;
