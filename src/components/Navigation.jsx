import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { 
  Home, 
  Info, 
  Mail, 
  Menu, 
  X,
  Utensils,
  Sparkles,
  ShoppingCart
} from 'lucide-react';

const Navigation = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/all-ingredients', label: 'All Ingredients', icon: ShoppingCart },
    { path: '/about', label: 'About', icon: Info },
    { path: '/contact', label: 'Contact', icon: Mail }
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <nav className="relative z-50 border-b border-white/10 glass-effect" aria-label="Primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group animate-fadeInDown"
            aria-label="Delish Healthy Food home"
          >
            <div className={`p-2 rounded-xl ${theme.highlight || 'bg-blue-900/20'} 
              border ${theme.border || 'border-blue-500/20'} hover-glow transition-all-smooth`}>
              <Utensils className={`w-6 h-6 ${theme.text || 'text-blue-400'}`} aria-hidden="true" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                Delish Healthy Food
                <Sparkles className={`w-5 h-5 ${theme.text || 'text-blue-400'} animate-pulseGlow`} aria-hidden="true" />
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 animate-fadeInDown" style={{ animationDelay: '0.2s' }}>
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                aria-current={isActive(path) ? 'page' : undefined}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all-smooth hover-lift
                  ${isActive(path) 
                    ? `${theme.highlight || 'bg-blue-900/40'} ${theme.text || 'text-blue-400'} border ${theme.border || 'border-blue-500/20'}` 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className={`md:hidden p-2 rounded-lg ${theme.highlight || 'bg-blue-900/20'} 
              border ${theme.border || 'border-blue-500/20'} hover-glow transition-all-smooth`}
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${theme.text || 'text-blue-400'}`} aria-hidden="true" />
            ) : (
              <Menu className={`w-6 h-6 ${theme.text || 'text-blue-400'}`} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div id="mobile-navigation" className="md:hidden pb-4 animate-fadeInDown">
            <div className="flex flex-col gap-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive(path) ? 'page' : undefined}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all-smooth
                    ${isActive(path) 
                      ? `${theme.highlight || 'bg-blue-900/40'} ${theme.text || 'text-blue-400'} border ${theme.border || 'border-blue-500/20'}` 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
