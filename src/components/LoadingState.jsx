import React from 'react';

const sizeMap = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16'
};

const LoadingState = ({ label = 'Loading', size = 'md', className = '' }) => {
  const spinnerSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex flex-col items-center justify-center min-h-[40vh] gap-8 ${className}`} role="status" aria-live="polite">
      <div className="relative">
         <div className={`absolute inset-0 bg-brand-500/20 blur-xl rounded-full scale-110 animate-pulse`} />
         <div className={`animate-spin rounded-full border-2 border-transparent border-t-brand-500 border-r-brand-500 ${spinnerSize} relative z-10`} />
      </div>
      <div className="text-center space-y-2">
         <p className="text-white font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">{label}</p>
         <div className="flex items-center justify-center gap-1">
            <div className="w-1 h-1 rounded-full bg-brand-500/40 animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-1 h-1 rounded-full bg-brand-500/40 animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-1 h-1 rounded-full bg-brand-500/40 animate-bounce" style={{ animationDelay: '0.2s' }} />
         </div>
      </div>
    </div>
  );
};

export default LoadingState;
