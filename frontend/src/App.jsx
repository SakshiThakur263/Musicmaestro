import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AuthModal from './components/AuthModal';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import ArtistBank from './pages/ArtistBank';
import ArtistDetail from './pages/ArtistDetail';
import EventInquiry from './pages/EventInquiry';
import Contact from './pages/Contact';
import AddListing from './pages/AddListing';
import NotFound from './pages/NotFound';

// Automatically scroll to top on route change
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search]);

  return null;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-wom-dark text-slate-200 font-sans selection:bg-wom-gold selection:text-black">
          <ScrollToTop />
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/artists" element={<ArtistBank />} />
              <Route path="/artist/:slug" element={<ArtistDetail />} />
              <Route path="/event-inquiry" element={<EventInquiry />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/add-listing" element={<AddListing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
          <AuthModal />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
