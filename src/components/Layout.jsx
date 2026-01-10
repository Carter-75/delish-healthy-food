import React from 'react';
import Navigation from './Navigation';
import BackgroundEffects from './BackgroundEffects';
import AdBanner from './AdBanner';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-x-hidden w-full">
      <BackgroundEffects />
      <Navigation />
      <main className="relative z-10 pb-20">
        {children}
      </main>
      <AdBanner className="mt-16" />
      <footer className="relative z-10 py-8 px-4 border-t border-white/10">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Delish Healthy Food. Fuel Your Fitness Journey.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
