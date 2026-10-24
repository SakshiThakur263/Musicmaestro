# World of Musicians — Full-Stack Web Platform

> A full-stack music & live entertainment booking platform recreating and modernizing the design, features, and user experience of **[World of Musicians](https://worldofmusicians.com/)**.

---

## 1. Project Overview & Reference Analysis

This project recreates the publicly visible design patterns, user flows, and catalog features of [worldofmusicians.com](https://worldofmusicians.com/). World of Musicians is a premier artist booking and talent management portal based in Mumbai, India, connecting event planners, corporate clients, wedding organizers, and private hosts with verified singers, live bands, DJs, instrumentalists, and celebrity performers.

### Key Verified Features & Design Patterns
* **Brand Aesthetics & Color Palette:**
  * **WOM Gold (`#f4a51c` / `#e59510`):** Signature accent color for badges, CTAs, typewriter text, and active states.
  * **Deep Stage Dark (`#0b0e14` / `#121622`):** Sleek, modern dark mode with subtle glassmorphic panels (`backdrop-blur-md`).
  * **Typography:** Clean editorial pairing of **Raleway** (display & headings) and **Open Sans** (body & metadata).
* **Dynamic Search & Discovery:**
  * Multi-parameter Search Banner filtering by artist/band name, category taxonomy, and performance city.
  * Quick Category Navigation pills for immediate access to trending categories (Live Bands, Bollywood, Sufi, DJs, Classical, Solo Singers).
* **Artist Directory ("Artist Bank"):**
  * Grid and list layouts with responsive breakpoints.
  * Real-time search, category filters, sorting by rating, starting fee, and name.
  * Badges for verified profiles, featured talent, customer ratings, starting performance fees, and direct booking actions.
* **Comprehensive Artist Profiles:**
  * High-resolution hero photo banner with category and location tags.
  * Biography, performance genres, vocal languages, and verified social media handles.
  * Multi-tab interface:
    * **Overview:** Detailed bio, event types handled, audio snippet preview player, and past client feedback.
    * **Videos & Media:** Embedded live performance highlights and stage recordings.
    * **Reviews:** Authentic customer reviews and an interactive review submission form.
  * Sticky Booking Widget with pre-filled artist details and direct link to the event inquiry flow.
* **Full Event Inquiry Engine:**
  * Multi-step booking form capturing event type (Wedding, Corporate, Concert, Private Party), event date, venue location, expected guest count, budget bracket, and special requests.
  * Generates unique tracking reference codes (e.g. `WOM-XXXXXX`) and immediate confirmation receipt states.
* **Artist Onboarding Portal ("List as an Artist"):**
  * Self-service registration form allowing musicians to list their profile, genres, starting price, audio/video links, and bio.
* **Corporate Entertainment & Client Showcase:**
  * Curated entertainment categories, "How It Works" 3-step booking flow, and corporate client proof.
* **Authentication & Floating Concierge:**
  * Client and Artist modal authentication with tabbed login/register.
  * Persistent floating WhatsApp concierge button pre-configured with WOM inquiry templates.
  * Official Mumbai headquarters details, contact form with instant validation, and interactive Google Map embed.

---

## 2. Architecture & Technology Stack

```
world-of-musicians/
├── frontend/                     # React 19 SPA built with Vite
│   ├── public/                   # Static public assets
│   ├── src/
│   │   ├── assets/               # Brand imagery and SVG logos
│   │   ├── components/           # Header, Footer, ArtistCard, SearchBanner, AuthModal, WhatsApp
│   │   ├── context/              # AuthContext (state, JWT token management, modals)
│   │   ├── hooks/                # useArtists custom hook (search, filter, pagination)
│   │   ├── layouts/              # MainLayout wrapper
│   │   ├── pages/                # Home, About, ArtistBank, ArtistDetail, EventInquiry, Contact, AddListing, NotFound
│   │   ├── services/             # Axios API client with interceptors
│   │   ├── styles/               # Custom animations, glassmorphism, scrollbars
│   │   ├── utils/                # Currency (₹ INR), date, and slug formatters
│   │   ├── App.jsx               # Client router and route definitions
│   │   └── main.jsx              # React DOM entry point
│   ├── .env.example              # Frontend environment variables template
│   ├── package.json
│   ├── tailwind.config.js        # Custom WOM color palette and typography
│   └── vite.config.js            # Vite configuration with proxy and dev server settings
├── backend/                      # Node.js + Express REST API
│   ├── src/
│   │   ├── config/               # MongoDB Mongoose connection
│   │   ├── controllers/          # Business logic (artists, categories, inquiries, contact, auth, stats)
│   │   ├── middleware/           # JWT auth guard, error handler, validation responder
│   │   ├── models/               # Mongoose schemas (Artist, Category, Inquiry, Contact, User, Review)
│   │   ├── routes/               # Modular Express API endpoints
│   │   ├── services/             # Business services (reference generator, filter composer)
│   │   ├── utils/                # Database seeder with 28 categories and 12 authentic artists
│   │   ├── validators/           # express-validator schemas for all inputs
│   │   └── server.js             # Express application entry point
│   ├── tests/                    # Jest + Supertest automated API test suite
│   ├── .env.example              # Backend environment variables template
│   └── package.json
├── .gitignore
└── README.md
```

### Technology Matrix
| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v3, React Router v7, Axios, Lucide React |
| **Backend** | Node.js, Express 4, MongoDB, Mongoose 8, express-validator |
| **Security & Auth** | JSON Web Tokens (JWT), bcryptjs, Helmet, CORS |
| **Logging & Testing** | Morgan, Jest, Supertest |

---

## 3. Prerequisites

Make sure the following software is installed on your machine:
* **Node.js**: v18.0.0 or higher ([Download Node.js](https://nodejs.org/))
* **npm**: v9.0.0 or higher (packaged with Node.js)
* **MongoDB**: Local MongoDB instance running on `mongodb://127.0.0.1:27017` or a MongoDB Atlas connection string ([Download MongoDB Community Server](https://www.mongodb.com/try/download/community))

---

## 4. Getting Started: Installation & Running

Follow these step-by-step instructions. Please run commands in their **respective folders** as indicated.

### Step 1: Backend Setup & Execution

Open a terminal window and navigate to the `backend` folder:

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install backend dependencies
npm install

# 3. Create .env from the example file
cp .env.example .env
# On Windows PowerShell:
# Copy-Item .env.example .env

# 4. Seed the database with authentic WOM categories and artist profiles
npm run seed

# 5. Start the backend development server
npm run dev
# Or for standard production start:
# npm start
```

The backend server will start at:
```
[WOM Server]: Running on port 5000 in development mode
[WOM Server]: Ready at http://localhost:5000/api
[MongoDB Connected]: 127.0.0.1/world_of_musicians
```

> **Note on Auto-Seeding**: When the server boots up, if no artists exist in the database, it automatically runs the seed routine to populate initial categories and artists.

---

### Step 2: Frontend Setup & Execution

Open a **separate** terminal window and navigate to the `frontend` directory:

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install frontend dependencies
npm install

# 3. Create .env from the example file
cp .env.example .env
# On Windows PowerShell:
# Copy-Item .env.example .env

# 4. Start the Vite development server
npm run dev
```

The frontend will start and output the local URL:
```
  ➜  Local:   http://localhost:5173/ (or http://localhost:5174/)
```

Open your browser and navigate to `http://localhost:5173` (or the port indicated in your console) to view the application.

---

## 5. Automated Tests

The backend includes a comprehensive automated test suite built with **Jest** and **Supertest** testing health checks, categories, artist search/filtering/retrieval, 404 handling, event inquiry validation, and contact submissions.

In the `backend` folder, run:

```bash
cd backend

# Run the full automated Jest test suite
npm test

# Run the live endpoint smoke test
npm run test:smoke
```

### Test Suite Summary
```text
PASS tests/api.test.js
  World of Musicians API Tests
    GET /api/health
      ✓ should return 200 and ok status
    GET /api/categories
      ✓ should return list of categories and grouped structure
    GET /api/artists
      ✓ should return artists list with pagination data
      ✓ should filter artists by search keyword
      ✓ should filter artists by category
    GET /api/artists/:slug
      ✓ should return a single artist by slug with reviews and similar artists
      ✓ should return 404 for non-existent artist slug
    POST /api/inquiries
      ✓ should validate and create a new event booking inquiry
      ✓ should fail with 400 when missing required fields
    POST /api/contact
      ✓ should submit a contact message successfully

Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
```

---

## 6. REST API Reference

Base URL: `http://localhost:5000/api`

### Health Check
- `GET /health` — Check server status and timestamp.

### Artists Endpoints
- `GET /artists` — Get paginated artists with filters (`search`, `category`, `subcategory`, `location`, `minPrice`, `maxPrice`, `featured`, `sort`, `page`, `limit`).
- `GET /artists/featured` — Get top featured artists for homepage carousel.
- `GET /artists/:slug` — Get artist details by URL slug, including approved reviews and related category talent.
- `POST /artists` — Create new artist profile (used by "List as an Artist").
- `POST /artists/:id/reviews` — Submit a rating and review for an artist.

#### Example Request: Filter Artists by Category
```http
GET /api/artists?category=Live+Bands&limit=6 HTTP/1.1
Host: localhost:5000
```
#### Example Response:
```json
{
  "success": true,
  "count": 4,
  "pagination": {
    "page": 1,
    "limit": 6,
    "total": 4,
    "pages": 1
  },
  "data": [
    {
      "_id": "673f1a...",
      "name": "Manmeet",
      "slug": "manmeet",
      "category": "Live Bands",
      "subcategory": "Sufi Rock Band",
      "startingFee": 75000,
      "location": "Mumbai",
      "rating": 4.9,
      "reviewCount": 18,
      "image": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      "isFeatured": true
    }
  ]
}
```

### Event Inquiries
- `POST /inquiries` — Submit an event booking inquiry.
- `GET /inquiries` — Retrieve inquiries (for administrative coordination).

#### Example Request: Submit Event Inquiry
```http
POST /api/inquiries HTTP/1.1
Host: localhost:5000
Content-Type: application/json

{
  "name": "Siddharth Malhotra",
  "email": "siddharth@example.com",
  "phone": "+919876543210",
  "eventType": "Corporate Event",
  "eventDate": "2026-12-15",
  "city": "Mumbai",
  "guestCount": "300-500",
  "budget": "2 - 5 Lakhs",
  "artistName": "Manmeet",
  "notes": "Looking for a 90-minute live performance at our annual gala."
}
```
#### Example Response:
```json
{
  "success": true,
  "message": "Thank you! Your event inquiry has been submitted successfully. Our talent coordinator will get back to you within 24 hours.",
  "inquiryReference": "WOM-9014FE",
  "data": {
    "_id": "673f2b...",
    "referenceId": "WOM-9014FE",
    "name": "Siddharth Malhotra",
    "status": "pending",
    "createdAt": "2026-10-24T07:15:32.184Z"
  }
}
```

### Contact & Support
- `POST /contact` — Submit general contact message to World of Musicians.

### Authentication Endpoints
- `POST /auth/register` — Register a client or artist account (`username`, `email`, `password`, `role`).
- `POST /auth/login` — Login with email/username and password. Returns JWT bearer token.
- `GET /auth/me` — Retrieve active user session profile (requires `Authorization: Bearer <token>`).

---

## 7. Pages & User Flows

1. **Homepage (`/`):**
   * Dynamic Hero with typewriter effect highlighting multiple music categories.
   * Universal Search Banner with category select, location picker, and keyword query.
   * Quick Category tags for instant filtering.
   * Exclusive & Verified Artists showcase with live ratings and fee previews.
   * 3-Step Booking Process ("Browse & Select", "Request Quote", "Live Event").
   * Corporate entertainment section, client trust badges, and booking guarantee.
2. **Artist Bank (`/artists`):**
   * Filter sidebar with Category and Location selectors.
   * Sort dropdown (Highest Rated, Fee: Low to High, Fee: High to Low, Name A-Z).
   * Responsive Grid / List toggle with active filter chips.
3. **Single Artist Profile (`/artist/:slug`):**
   * Photo gallery, verified badge, performance languages, genre tags, and social handles.
   * Interactive tabs for Overview, Video Showcases, Audio Player preview, and Verified Reviews.
   * Sticky Booking Inquiry widget on the sidebar for instant quote requests.
4. **Event Inquiry Page (`/event-inquiry`):**
   * Comprehensive event booking form with validation.
   * Displays immediate success receipt with tracking code `WOM-XXXXXX`.
5. **Artist Onboarding Portal (`/add-listing`):**
   * Musicians and bands can submit their profiles, audio/video links, and pricing to join the roster.
6. **About Page (`/about`):**
   * Company mission, milestone stats (500+ Artists, 1,200+ Events, 98% Satisfaction), and core values.
7. **Contact Page (`/contact`):**
   * Direct contact form, phone numbers (+91 7710046478), official office address (Lotus Corporate Park, Mumbai), and interactive map.
8. **404 Page (`*`):**
   * Branded musical 404 screen with quick return links.

---

## 8. Troubleshooting & Common Questions

### 1. MongoDB Connection Refused (`ECONNREFUSED 127.0.0.1:27017`)
* Ensure the MongoDB service is running locally:
  * On Windows: Open Services (`services.msc`) and verify `MongoDB Server` is Started. Or run `mongod` in a terminal.
* Alternatively, update `MONGODB_URI` in `backend/.env` to a MongoDB Atlas URI:
  ```env
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/world_of_musicians?retryWrites=true&w=majority
  ```

### 2. Port Collisions
* If port `5000` is in use, modify `PORT=5001` in `backend/.env` and update `VITE_API_BASE_URL=http://localhost:5001/api` in `frontend/.env`.
* If port `5173` is in use, Vite will automatically prompt and bind to `5174` (or configure `server.port` in `frontend/vite.config.js`).

### 3. Cross-Origin Requests (CORS)
* The backend is configured with permissive CORS for development. If deploying to production, specify the allowed domain in `backend/.env`:
  ```env
  FRONTEND_URL=https://your-domain.com
  ```

---

## 9. Legal & Ethical Attribution

This project is an independent educational and technical recreation inspired by the public layout and booking user experience of [World of Musicians](https://worldofmusicians.com/). All imagery uses legal Unsplash high-resolution assets and original implementation code.

World of Musicians is solely a booking platform for paid events and does not claim exclusive management over celebrity performers unless explicitly contracted.
