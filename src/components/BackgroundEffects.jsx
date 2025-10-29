import React from 'react';
import { useTheme } from '../hooks/useTheme';

const BackgroundEffects = () => {
  const { theme } = useTheme();
  
  return (
    <>
      {/* Main gradient background (theme-controlled) */}
      <div 
        className={`fixed inset-0 bg-gradient-to-br ${theme.mainGradient || 'from-slate-900 to-slate-950'} 
        transition-all duration-1000 ease-in-out`}
      />
      
      {/* Animated pulse overlay */}
      <div 
        className={`fixed inset-0 bg-gradient-to-br ${theme.pulseGradient || 'from-blue-500/10 via-purple-500/10 to-pink-500/10'} 
        opacity-12 animate-pulseGlow transition-all duration-1000`}
      />
      
      {/* Moving gradient */}
      <div 
        className={`fixed inset-0 bg-gradient-to-r ${theme.gradient || 'from-blue-600/10 via-purple-600/10 to-pink-600/10'} 
        opacity-10 animate-gradientShift transition-all duration-1000`}
      />
      
      {/* Texture overlay */}
      <div 
        className="fixed inset-0 opacity-[0.03] bg-cover bg-center mix-blend-overlay"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1920)'
        }}
      />
      
      {/* Subtle animated orbs - much more subtle */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className={`absolute top-1/4 -left-24 w-96 h-96 ${theme.accent || 'bg-blue-500'} rounded-full 
          opacity-5 blur-[100px] animate-float`} />
        <div className={`absolute bottom-1/3 -right-32 w-[500px] h-[500px] ${theme.accent || 'bg-purple-500'} rounded-full 
          opacity-5 blur-[120px] animate-float`} style={{ animationDelay: '2s' }} />
        <div className={`absolute top-2/3 left-1/2 w-72 h-72 bg-pink-500 rounded-full 
          opacity-5 blur-[100px] animate-float`} style={{ animationDelay: '1s' }} />
      </div>
    </>
  );
};

export default BackgroundEffects;
