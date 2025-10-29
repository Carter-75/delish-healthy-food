import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Utensils, Sparkles, TrendingUp, Award } from 'lucide-react';

const HeroSection = () => {
  const { theme } = useTheme();

  return (
    <div className="relative py-16 sm:py-24 px-4 overflow-hidden w-full max-w-full">
      {/* Animated accent lines - hidden on mobile/tablet, shown on large screens */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden xl:block">
        <div className={`absolute top-0 left-1/4 w-px h-full ${theme.accent || 'bg-blue-500'} opacity-20 animate-shimmer`} />
        <div className={`absolute top-0 right-1/4 w-px h-full ${theme.accent || 'bg-blue-500'} opacity-20 animate-shimmer`} 
          style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center space-y-8">
          {/* Icon Row - more modern styling */}
          <div className="flex items-center justify-center gap-5 animate-fadeInDown">
            <div className={`p-4 rounded-3xl ${theme.highlight || 'bg-blue-900/30'} 
              border ${theme.border || 'border-blue-500/20'} hover-glow animate-float shadow-xl`}>
              <Utensils className={`w-12 h-12 sm:w-14 sm:h-14 ${theme.text || 'text-blue-400'}`} />
            </div>
            <Sparkles className={`w-10 h-10 sm:w-12 sm:h-12 ${theme.text || 'text-blue-400'} animate-pulseGlow`} />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white animate-fadeInUp text-shadow">
            <span className="block mb-2">High-Protein</span>
            <span className={`block bg-gradient-to-r ${theme.gradient || 'from-blue-400 via-indigo-400 to-violet-400'} 
              bg-clip-text text-transparent animate-gradientShift`}>
              Recipe Collection
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-lg sm:text-xl lg:text-2xl ${theme.text || 'text-amber-400'} max-w-3xl mx-auto 
            leading-relaxed animate-fadeInUp font-medium px-4`} 
            style={{ animationDelay: '0.2s' }}>
            Discover protein-packed recipes crafted for your fitness goals!
          </p>

          {/* Stats - more modern cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 animate-fadeInUp" 
            style={{ animationDelay: '0.4s' }}>
            <div className={`glass-effect rounded-2xl p-8 border ${theme.border || 'border-amber-500/20'} hover-lift shadow-xl transition-all duration-300 group`}>
              <TrendingUp className={`w-10 h-10 ${theme.text || 'text-amber-400'} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
              <p className="text-4xl font-bold text-white mb-2">50+</p>
              <p className="text-gray-400 text-sm font-medium">Recipes</p>
            </div>
            <div className={`glass-effect rounded-2xl p-8 border ${theme.border || 'border-amber-500/20'} hover-lift shadow-xl transition-all duration-300 group`}>
              <Award className={`w-10 h-10 ${theme.text || 'text-amber-400'} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
              <p className="text-4xl font-bold text-white mb-2">40g+</p>
              <p className="text-gray-400 text-sm font-medium">Protein Per Serving</p>
            </div>
            <div className={`glass-effect rounded-2xl p-8 border ${theme.border || 'border-amber-500/20'} hover-lift shadow-xl transition-all duration-300 group`}>
              <Sparkles className={`w-10 h-10 ${theme.text || 'text-amber-400'} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
              <p className="text-4xl font-bold text-white mb-2">100%</p>
              <p className="text-gray-400 text-sm font-medium">Delicious</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
