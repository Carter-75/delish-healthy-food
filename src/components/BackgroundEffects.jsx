import React from 'react';
import { useTheme } from '../hooks/useTheme';

const BackgroundEffects = () => {
  const { theme } = useTheme();
  
  return (
    <>
      {/* Main gradient background */}
      <div 
        className={`fixed inset-0 bg-gradient-to-br ${theme.mainGradient || 'from-slate-900 to-slate-950'} 
        transition-all duration-1000 ease-in-out`}
      />
      
      {/* Animated pulse overlay */}
      <div 
        className={`fixed inset-0 bg-gradient-to-br ${theme.pulseGradient || 'from-blue-500/20 via-purple-500/20 to-pink-500/20'} 
        opacity-40 animate-pulseGlow transition-all duration-1000`}
      />
      
      {/* Moving gradient */}
      <div 
        className={`fixed inset-0 bg-gradient-to-r ${theme.gradient || 'from-blue-600/20 via-purple-600/20 to-pink-600/20'} 
        opacity-50 animate-gradientShift transition-all duration-1000`}
      />
      
      {/* Texture overlay */}
      <div 
        className="fixed inset-0 opacity-[0.03] bg-cover bg-center mix-blend-overlay"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1920)'
        }}
      />
      
      {/* Animated circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 ${theme.accent || 'bg-blue-500'} rounded-full 
          opacity-10 blur-3xl animate-float`} />
        <div className={`absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 ${theme.accent || 'bg-purple-500'} rounded-full 
          opacity-10 blur-3xl animate-float`} style={{ animationDelay: '1s' }} />
      </div>
    </>
  );
};

export default BackgroundEffects;
