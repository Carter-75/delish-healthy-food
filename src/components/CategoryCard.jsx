import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { 
  Clock, 
  ChevronRight, 
  Star,
  UtensilsCrossed,
  ChefHat,
  Apple,
  IceCream
} from 'lucide-react';

const iconMap = {
  'ChefHat': ChefHat,
  'UtensilsCrossed': UtensilsCrossed,
  'Apple': Apple,
  'IceCream': IceCream,
  'Clock': Clock
};

// Category-specific color themes
const categoryThemes = {
  'chicken-omelettes': {
    text: 'text-orange-400',
    accent: 'bg-orange-500',
    border: 'border-orange-500/20',
    highlight: 'bg-orange-900/20',
    gradient: 'from-orange-600/20 via-amber-600/20 to-red-600/20',
    shadow: 'shadow-orange-500/20'
  },
  'protein-bowls': {
    text: 'text-emerald-400',
    accent: 'bg-emerald-500',
    border: 'border-emerald-500/20',
    highlight: 'bg-emerald-900/20',
    gradient: 'from-emerald-600/20 via-green-600/20 to-teal-600/20',
    shadow: 'shadow-emerald-500/20'
  },
  'quick-lunches': {
    text: 'text-blue-400',
    accent: 'bg-blue-500',
    border: 'border-blue-500/20',
    highlight: 'bg-blue-900/20',
    gradient: 'from-blue-600/20 via-indigo-600/20 to-violet-600/20',
    shadow: 'shadow-blue-500/20'
  },
  'smoothie-bowls': {
    text: 'text-violet-400',
    accent: 'bg-violet-500',
    border: 'border-violet-500/20',
    highlight: 'bg-violet-900/20',
    gradient: 'from-violet-600/20 via-purple-600/20 to-fuchsia-600/20',
    shadow: 'shadow-violet-500/20'
  },
  'desserts': {
    text: 'text-pink-400',
    accent: 'bg-pink-500',
    border: 'border-pink-500/20',
    highlight: 'bg-pink-900/20',
    gradient: 'from-pink-600/20 via-rose-600/20 to-fuchsia-600/20',
    shadow: 'shadow-pink-500/20'
  },
  'protein-snacks': {
    text: 'text-cyan-400',
    accent: 'bg-cyan-500',
    border: 'border-cyan-500/20',
    highlight: 'bg-cyan-900/20',
    gradient: 'from-cyan-600/20 via-sky-600/20 to-blue-600/20',
    shadow: 'shadow-cyan-500/20'
  }
};

const CategoryCard = ({ category, delay = 0 }) => {
  const { setTheme } = useTheme();
  const navigate = useNavigate();

  const Icon = iconMap[category.icon] || UtensilsCrossed;
  
  // Get category-specific theme or fall back to default
  const categoryTheme = categoryThemes[category.id] || {
    text: 'text-blue-400',
    border: 'border-white/10',
    highlight: 'bg-blue-900/20',
    gradient: 'from-blue-600/20 via-purple-600/20 to-pink-600/20',
    shadow: 'shadow-lg'
  };

  const handleClick = () => {
    if (!category.comingSoon) {
      setTheme(category.id);
      navigate(`/category/${category.id}`);
    }
  };

  return (
    <div
      className="stagger-item"
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        onClick={handleClick}
        className={`relative glass-effect rounded-2xl overflow-hidden border ${categoryTheme.border}
          ${categoryTheme.shadow} transition-all-smooth group
          ${category.comingSoon ? 'opacity-60 cursor-not-allowed' : 'hover-lift cursor-pointer'}`}
      >
        {/* Gradient overlay */}
        {!category.comingSoon && (
          <div className={`absolute inset-0 bg-gradient-to-br ${categoryTheme.gradient} 
            opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        )}

        {/* Coming Soon Badge */}
        {category.comingSoon && (
          <div className="absolute top-4 right-4 z-10">
            <div className={`px-3 py-1 rounded-full ${categoryTheme.highlight} 
              border ${categoryTheme.border} text-xs font-semibold ${categoryTheme.text}`}>
              Coming Soon
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative p-8">
          {/* Icon */}
          <div className={`inline-flex p-4 rounded-2xl ${categoryTheme.highlight} 
            border ${categoryTheme.border} mb-6 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-8 h-8 ${categoryTheme.text}`} />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">
            {category.title}
          </h3>

          {/* Description */}
          <p className={`${categoryTheme.text} mb-4 flex items-center gap-2`}>
            <Star className="w-4 h-4" />
            {category.description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-4 h-4" />
              <span>{category.cookingTime}</span>
            </div>
            
            {!category.comingSoon && (
              <div className={`flex items-center gap-2 ${categoryTheme.text} 
                font-semibold group-hover:gap-3 transition-all`}>
                <span>{category.totalRecipes} Recipes</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* Animated border */}
          {!category.comingSoon && (
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryTheme.gradient} 
              transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
