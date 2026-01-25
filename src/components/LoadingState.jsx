import React from 'react';
import { useTheme } from '../hooks/useTheme';

const sizeMap = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-14 h-14'
};

const LoadingState = ({ label = 'Loading', size = 'md', className = '' }) => {
  const { theme } = useTheme();
  const spinnerSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex flex-col items-center justify-center min-h-[50vh] gap-4 ${className}`} role="status" aria-live="polite">
      <div
        className={`animate-spin rounded-full border-2 border-transparent border-t-current border-r-current ${spinnerSize} ${theme.text || 'text-blue-400'}`}
      />
      <p className="text-gray-300 text-sm uppercase tracking-[0.2em]">{label}</p>
    </div>
  );
};

export default LoadingState;
