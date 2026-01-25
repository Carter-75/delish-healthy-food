import React from 'react';
import Navigation from './Navigation';
import BackgroundEffects from './BackgroundEffects';
import AdSenseAutoLoader from './AdSenseAutoLoader';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-x-hidden w-full">
      <AdSenseAutoLoader />
      <BackgroundEffects />
      <Navigation />
      <main className="relative z-10 pb-20">
        {children}
      </main>
      <footer className="relative z-10 py-8 px-4 border-t border-white/10">
        <div className="container mx-auto text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <a className="hover:text-white transition-colors" href="/privacy">Privacy Policy</a>
            <a className="hover:text-white transition-colors" href="/contact">Contact</a>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 Delish Healthy Food. Fuel Your Fitness Journey.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
