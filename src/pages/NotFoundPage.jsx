import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { SearchX } from 'lucide-react';
import Seo from '../components/Seo';

const NotFoundPage = () => {
  const { theme } = useTheme();

  return (
    <div className="container mx-auto px-4 py-16">
      <Seo
        title="Page Not Found - Delish Healthy Food"
        description="The page you are looking for does not exist."
        canonicalPath="/404"
        noIndex
      />
      <div className={`max-w-2xl mx-auto glass-effect rounded-2xl p-10 border ${theme.border || 'border-white/10'} text-center`}>
        <SearchX className={`w-14 h-14 ${theme.text || 'text-blue-400'} mx-auto mb-6`} aria-hidden="true" />
        <h1 className="text-4xl font-bold text-white mb-4">Page not found</h1>
        <p className="text-gray-300 mb-8">
          The page you are looking for might have been moved or removed.
        </p>
        <Link
          to="/"
          className={`inline-flex items-center justify-center px-6 py-3 rounded-lg ${theme.highlight || 'bg-blue-900/40'} border ${theme.border || 'border-blue-500/20'} ${theme.text || 'text-blue-400'} font-semibold hover-lift transition-all-smooth`}
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
