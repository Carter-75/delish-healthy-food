import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import BackgroundEffects from './BackgroundEffects';
import AdSenseAutoLoader from './AdSenseAutoLoader';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-x-hidden w-full bg-slate-950 flex flex-col font-sans">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-brand-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>
      <AdSenseAutoLoader />
      <BackgroundEffects />
      <Navigation />
      <main id="main-content" role="main" tabIndex={-1} className="relative z-10 flex-grow focus:outline-none">
        {children}
      </main>
      <footer className="relative z-10 py-16 px-4 border-t border-white/5 bg-slate-950/50 backdrop-blur-md">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white font-serif tracking-tight">
                Delish <span className="text-brand-400">Healthy</span> Food
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                Premium high-protein recipes crafted for your fitness journey. Fuel your body with the best ingredients.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-brand-400">Quick Links</h4>
              <nav className="flex flex-col gap-2 text-sm text-slate-400">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <Link to="/all-ingredients" className="hover:text-white transition-colors">Ingredients</Link>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-brand-400">Legal</h4>
              <nav className="flex flex-col gap-2 text-sm text-slate-400">
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </nav>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Delish Healthy Food. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {/* Social placeholders could go here */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
