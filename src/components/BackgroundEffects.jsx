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
        aria-hidden="true"
      />
      
      {/* Animated pulse overlay */}
      <div 
        className={`fixed inset-0 bg-gradient-to-br ${theme.pulseGradient || 'from-blue-500/10 via-purple-500/10 to-pink-500/10'} 
        opacity-10 animate-pulseGlow transition-all duration-1000`}
        aria-hidden="true"
      />
      
      {/* Moving gradient */}
      <div 
        className={`fixed inset-0 bg-gradient-to-r ${theme.gradient || 'from-blue-600/10 via-purple-600/10 to-pink-600/10'} 
        opacity-10 animate-gradientShift transition-all duration-1000`}
        aria-hidden="true"
      />
      
      {/* Texture overlay */}
      <div 
        className="fixed inset-0 opacity-[0.03] bg-cover bg-center mix-blend-overlay"
        style={{
          backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='120' height='120' filter='url(%23n)' opacity='0.4'/></svg>\")"
        }}
        aria-hidden="true"
      />
      
      {/* Subtle animated orbs - much more subtle */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30" aria-hidden="true">
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
