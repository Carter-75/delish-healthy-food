import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { 
  Clock, 
  Flame, 
  Beef,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const RecipeCard = ({ recipe, categoryId, delay = 0 }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${categoryId}/${recipe.id}`);
  };

  return (
    <div
      className="stagger-item hover-lift cursor-pointer group"
      style={{ animationDelay: `${delay}s` }}
      onClick={handleClick}
    >
      <div className={`relative glass-effect rounded-2xl overflow-hidden border ${theme.border || 'border-white/10'}
        ${theme.shadow || 'shadow-lg'} transition-all-smooth h-full`}>
        
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient || 'from-blue-600/10 via-purple-600/10 to-pink-600/10'} 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Content */}
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <h3 className={`text-xl font-bold ${theme.text || 'text-blue-400'} 
              group-hover:text-white transition-colors-smooth pr-8`}>
              {recipe.name}
            </h3>
            <ChevronRight className={`w-6 h-6 ${theme.text || 'text-blue-400'} 
              transform group-hover:translate-x-1 transition-transform flex-shrink-0`} />
          </div>

          {/* Nutrition Info */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${theme.highlight || 'bg-blue-900/20'}`}>
              <Flame className={`w-5 h-5 ${theme.text || 'text-orange-400'}`} />
              <div>
                <p className="text-xs text-gray-400">Calories</p>
                <p className={`font-bold ${theme.text || 'text-blue-400'}`}>
                  {recipe.nutrition?.perServingCalories || 'N/A'}
                </p>
              </div>
            </div>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${theme.highlight || 'bg-blue-900/20'}`}>
              <Beef className={`w-5 h-5 ${theme.text || 'text-red-400'}`} />
              <div>
                <p className="text-xs text-gray-400">Protein</p>
                <p className={`font-bold ${theme.text || 'text-blue-400'}`}>
                  {recipe.nutrition?.perServingProtein || 'N/A'}g
                </p>
              </div>
            </div>
          </div>

          {/* Cooking Time */}
          {recipe.cookingTime && (
            <div className="flex items-center gap-2 text-gray-300 mb-4">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{recipe.cookingTime}</span>
            </div>
          )}

          {/* Description / Preview */}
          {recipe.ingredients && (
            <div className={`text-sm text-gray-400 border-t ${theme.border || 'border-white/10'} pt-4`}>
              <p className="flex items-center gap-2 mb-2">
                <Sparkles className={`w-4 h-4 ${theme.text || 'text-blue-400'}`} />
                <span className="font-semibold">Key Ingredients:</span>
              </p>
              <p className="line-clamp-2">
                {recipe.ingredients.slice(0, 3).join(', ')}
                {recipe.ingredients.length > 3 && '...'}
              </p>
            </div>
          )}

          {/* Hover indicator */}
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.gradient || 'from-blue-500 via-purple-500 to-pink-500'} 
            transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
