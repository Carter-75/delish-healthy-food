import React from 'react';
import Navigation from './Navigation';
import BackgroundEffects from './BackgroundEffects';
import AdSenseAutoLoader from './AdSenseAutoLoader';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-x-hidden w-full">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-slate-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>
      <AdSenseAutoLoader />
      <BackgroundEffects />
      <Navigation />
      <main id="main-content" role="main" tabIndex={-1} className="relative z-10 pb-20 focus:outline-none">
        {children}
      </main>
      <footer className="relative z-10 py-8 px-4 border-t border-white/10">
        <div className="container mx-auto text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <a className="hover:text-white transition-colors" href="/privacy">Privacy Policy</a>
            <a className="hover:text-white transition-colors" href="/contact">Contact</a>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Delish Healthy Food. Fuel Your Fitness Journey.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
