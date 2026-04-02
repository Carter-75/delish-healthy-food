import React from 'react';
import { useTheme } from '../hooks/useTheme';

const BackgroundEffects = () => {
  const { theme } = useTheme();
  
  return (
    <>
      <div 
        className="fixed inset-0 bg-[#020617] transition-colors duration-1000 ease-in-out -z-50"
        aria-hidden="true"
      />
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-40" aria-hidden="true">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-500/5 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-forest-500/5 blur-[140px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[20%] w-[400px] h-[400px] bg-brand-400/3 blur-[100px] rounded-full animate-float-slow" />
      </div>
      
      <div 
        className="fixed inset-0 opacity-[0.02] bg-cover bg-center mix-blend-overlay -z-30 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='120' height='120' filter='url(%23n)' opacity='0.4'/></svg>\")"
        }}
        aria-hidden="true"
      />

      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/50 -z-20 pointer-events-none" aria-hidden="true" />
    </>
  );
};

export default BackgroundEffects;
