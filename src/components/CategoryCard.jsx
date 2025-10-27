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

const CategoryCard = ({ category, delay = 0 }) => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const Icon = iconMap[category.icon] || UtensilsCrossed;

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
        className={`relative glass-effect rounded-2xl overflow-hidden border ${theme.border || 'border-white/10'}
          ${theme.shadow || 'shadow-lg'} transition-all-smooth group
          ${category.comingSoon ? 'opacity-60 cursor-not-allowed' : 'hover-lift cursor-pointer'}`}
      >
        {/* Gradient overlay */}
        {!category.comingSoon && (
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient || 'from-blue-600/20 via-purple-600/20 to-pink-600/20'} 
            opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        )}

        {/* Coming Soon Badge */}
        {category.comingSoon && (
          <div className="absolute top-4 right-4 z-10">
            <div className={`px-3 py-1 rounded-full ${theme.highlight || 'bg-blue-900/40'} 
              border ${theme.border || 'border-blue-500/20'} text-xs font-semibold ${theme.text || 'text-blue-400'}`}>
              Coming Soon
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative p-8">
          {/* Icon */}
          <div className={`inline-flex p-4 rounded-2xl ${theme.highlight || 'bg-blue-900/30'} 
            border ${theme.border || 'border-blue-500/20'} mb-6 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-8 h-8 ${theme.text || 'text-blue-400'}`} />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform">
            {category.title}
          </h3>

          {/* Description */}
          <p className={`${theme.text || 'text-blue-400'} mb-4 flex items-center gap-2`}>
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
              <div className={`flex items-center gap-2 ${theme.text || 'text-blue-400'} 
                font-semibold group-hover:gap-3 transition-all`}>
                <span>{category.totalRecipes} Recipes</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* Animated border */}
          {!category.comingSoon && (
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.gradient || 'from-blue-500 via-purple-500 to-pink-500'} 
              transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
