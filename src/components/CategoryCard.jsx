import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { Clock, ChevronRight, Star, UtensilsCrossed } from 'lucide-react';
import * as LucideIcons from 'lucide-react';


const CategoryCard = ({ category, delay = 0 }) => {
  const { setTheme, themes } = useTheme();
  const navigate = useNavigate();

  const Icon = (category.icon && LucideIcons[category.icon]) || UtensilsCrossed;
  const themeConfig = themes[category.id] || themes.default || {};
  const themeClasses = {
    text: themeConfig.text || 'text-blue-400',
    border: themeConfig.border || 'border-white/10',
    highlight: themeConfig.highlight || 'bg-blue-900/20',
    gradient: themeConfig.gradient || 'from-blue-600/20 via-purple-600/20 to-pink-600/20',
    shadow: themeConfig.shadow || 'shadow-lg'
  };
  const recipeCountLabel =
    typeof category.totalRecipes === 'number'
      ? `${category.totalRecipes} Recipes`
      : 'View Recipes';

  const handleClick = () => {
    if (!category.comingSoon) {
      setTheme(category.id);
      navigate(`/category/${category.id}`);
    }
  };

  return (
    <div
      className="stagger-item"
      style={{ '--stagger-delay': `${delay}s` }}
    >
      <div
        onClick={handleClick}
        className={`relative glass-effect rounded-3xl overflow-hidden border ${themeClasses.border}
          ${themeClasses.shadow} transition-all-smooth group
          ${category.comingSoon ? 'opacity-60 cursor-not-allowed' : 'hover-lift cursor-pointer'}
          hover:border-opacity-40`}
      >
        {/* Gradient overlay - more subtle */}
        {!category.comingSoon && (
          <div className={`absolute inset-0 bg-gradient-to-br ${themeClasses.gradient} 
            opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
        )}

        {/* Coming Soon Badge */}
        {category.comingSoon && (
          <div className="absolute top-4 right-4 z-10">
            <div className={`px-3 py-1 rounded-full ${themeClasses.highlight} 
              border ${themeClasses.border} text-xs font-semibold ${themeClasses.text}`}>
              Coming Soon
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative p-8">
          {/* Icon - larger and more modern */}
          <div className={`inline-flex p-5 rounded-3xl ${themeClasses.highlight} 
            border ${themeClasses.border} mb-6 group-hover:scale-110 transition-transform duration-300
            shadow-lg ${themeClasses.shadow}`}>
            <Icon className={`w-10 h-10 ${themeClasses.text}`} />
          </div>

          {/* Title - better spacing */}
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform leading-tight">
            {category.title}
          </h3>

          {/* Description */}
          <p className={`${themeClasses.text} mb-4 flex items-center gap-2`}>
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
              <div className={`flex items-center gap-2 ${themeClasses.text} 
                font-semibold group-hover:gap-3 transition-all`}>
                <span>{recipeCountLabel}</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* Animated border - thicker and more visible */}
          {!category.comingSoon && (
            <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${themeClasses.gradient} 
              transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full`} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
