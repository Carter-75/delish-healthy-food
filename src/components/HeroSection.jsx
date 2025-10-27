import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Utensils, Sparkles, TrendingUp, Award } from 'lucide-react';

const HeroSection = () => {
  const { theme } = useTheme();

  return (
    <div className="relative py-16 sm:py-24 px-4 overflow-hidden w-full max-w-full">
      {/* Animated accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-px h-full ${theme.accent || 'bg-blue-500'} opacity-20 animate-shimmer`} />
        <div className={`absolute top-0 right-1/4 w-px h-full ${theme.accent || 'bg-purple-500'} opacity-20 animate-shimmer`} 
          style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center space-y-8">
          {/* Icon Row */}
          <div className="flex items-center justify-center gap-4 animate-fadeInDown">
            <div className={`p-3 rounded-2xl ${theme.highlight || 'bg-blue-900/30'} 
              border ${theme.border || 'border-blue-500/20'} hover-glow animate-float`}>
              <Utensils className={`w-10 h-10 sm:w-12 sm:h-12 ${theme.text || 'text-blue-400'}`} />
            </div>
            <Sparkles className={`w-8 h-8 sm:w-10 sm:h-10 ${theme.text || 'text-blue-400'} animate-pulseGlow`} />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white animate-fadeInUp text-shadow">
            <span className="block mb-2">High-Protein</span>
            <span className={`block bg-gradient-to-r ${theme.gradient || 'from-blue-400 via-purple-400 to-pink-400'} 
              bg-clip-text text-transparent animate-gradientShift`}>
              Recipe Collection
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-lg sm:text-xl lg:text-2xl ${theme.text || 'text-blue-400'} max-w-3xl mx-auto 
            leading-relaxed animate-fadeInUp font-medium px-4`} 
            style={{ animationDelay: '0.2s' }}>
            Discover protein-packed recipes crafted for your fitness goals!
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 animate-fadeInUp" 
            style={{ animationDelay: '0.4s' }}>
            <div className={`glass-effect rounded-xl p-6 border ${theme.border || 'border-white/10'} hover-lift`}>
              <TrendingUp className={`w-8 h-8 ${theme.text || 'text-green-400'} mx-auto mb-3`} />
              <p className="text-3xl font-bold text-white mb-1">25+</p>
              <p className="text-gray-400 text-sm">Recipes</p>
            </div>
            <div className={`glass-effect rounded-xl p-6 border ${theme.border || 'border-white/10'} hover-lift`}>
              <Award className={`w-8 h-8 ${theme.text || 'text-yellow-400'} mx-auto mb-3`} />
              <p className="text-3xl font-bold text-white mb-1">40g+</p>
              <p className="text-gray-400 text-sm">Protein Per Serving</p>
            </div>
            <div className={`glass-effect rounded-xl p-6 border ${theme.border || 'border-white/10'} hover-lift`}>
              <Sparkles className={`w-8 h-8 ${theme.text || 'text-purple-400'} mx-auto mb-3`} />
              <p className="text-3xl font-bold text-white mb-1">100%</p>
              <p className="text-gray-400 text-sm">Delicious</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
