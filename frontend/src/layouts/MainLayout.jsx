import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import AuthModal from '../components/AuthModal';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-wom-dark text-slate-200 font-sans selection:bg-wom-gold selection:text-black">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsAppButton />
      <AuthModal />
    </div>
  );
};

export default MainLayout;
