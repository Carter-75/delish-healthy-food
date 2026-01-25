import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { 
  Clock, 
  Flame, 
  Beef,
  ChevronRight,
  Sparkles,
  Wheat,
  Droplet,
  Apple
} from 'lucide-react';

const RecipeCard = ({ recipe, categoryId, delay = 0 }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const formatMacro = (value, suffix) =>
    typeof value === 'number' && !Number.isNaN(value) ? `${value}${suffix}` : 'N/A';

  const handleClick = () => {
    navigate(`/recipe/${categoryId}/${recipe.id}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="stagger-item hover-lift cursor-pointer group"
      style={{ '--stagger-delay': `${delay}s` }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open ${recipe.name} recipe`}
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
              transform group-hover:translate-x-1 transition-transform flex-shrink-0`} aria-hidden="true" />
          </div>

          {/* Nutrition Info - Full Macros */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Calories */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${theme.highlight || 'bg-blue-900/20'}`}>
              <Flame className={`w-4 h-4 ${theme.text || 'text-blue-400'}`} aria-hidden="true" />
              <div>
                <p className="text-xs text-gray-400">Calories</p>
                <p className={`font-bold text-sm ${theme.text || 'text-blue-400'}`}>
                  {formatMacro(recipe.nutrition?.perServingCalories, '')}
                </p>
              </div>
            </div>
            
            {/* Protein */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${theme.highlight || 'bg-blue-900/20'}`}>
              <Beef className={`w-4 h-4 ${theme.text || 'text-red-400'}`} aria-hidden="true" />
              <div>
                <p className="text-xs text-gray-400">Protein</p>
                <p className={`font-bold text-sm ${theme.text || 'text-blue-400'}`}>
                  {formatMacro(recipe.nutrition?.perServingProtein, 'g')}
                </p>
              </div>
            </div>
            
            {/* Carbs */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${theme.highlight || 'bg-blue-900/20'}`}>
              <Wheat className={`w-4 h-4 ${theme.text || 'text-yellow-400'}`} aria-hidden="true" />
              <div>
                <p className="text-xs text-gray-400">Carbs</p>
                <p className={`font-bold text-sm ${theme.text || 'text-blue-400'}`}>
                  {formatMacro(recipe.nutrition?.perServingCarbs, 'g')}
                </p>
              </div>
            </div>
            
            {/* Fat */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${theme.highlight || 'bg-blue-900/20'}`}>
              <Droplet className={`w-4 h-4 ${theme.text || 'text-blue-400'}`} aria-hidden="true" />
              <div>
                <p className="text-xs text-gray-400">Fat</p>
                <p className={`font-bold text-sm ${theme.text || 'text-blue-400'}`}>
                  {formatMacro(recipe.nutrition?.perServingFat, 'g')}
                </p>
              </div>
            </div>
            
            {/* Fiber */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${theme.highlight || 'bg-blue-900/20'} col-span-2`}>
              <Apple className={`w-4 h-4 ${theme.text || 'text-green-400'}`} aria-hidden="true" />
              <div>
                <p className="text-xs text-gray-400">Fiber</p>
                <p className={`font-bold text-sm ${theme.text || 'text-blue-400'}`}>
                  {formatMacro(recipe.nutrition?.perServingFiber, 'g')}
                </p>
              </div>
            </div>
          </div>

          {/* Cooking Time */}
          {recipe.cookingTime && (
            <div className="flex items-center gap-2 text-gray-300 mb-4">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm">{recipe.cookingTime}</span>
            </div>
          )}

          {/* Description / Preview */}
          {recipe.ingredients && (
            <div className={`text-sm text-gray-400 border-t ${theme.border || 'border-white/10'} pt-4`}>
              <p className="flex items-center gap-2 mb-2">
                <Sparkles className={`w-4 h-4 ${theme.text || 'text-blue-400'}`} aria-hidden="true" />
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
