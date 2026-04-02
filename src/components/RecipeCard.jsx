import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Flame, 
  Beef,
  ChevronRight,
  TrendingUp,
  ChefHat
} from 'lucide-react';

const RecipeCard = ({ recipe, categoryId, delay = 0 }) => {
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
      className="stagger-item group"
      style={{ '--stagger-delay': `${delay}s` }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open ${recipe.name} recipe`}
    >
      <div className="glass-card rounded-[2rem] overflow-hidden h-full flex flex-col transition-all-smooth border-white/5 hover:border-brand-500/30">
        {/* Visual Header / Placeholder for Image */}
        <div className="relative h-48 bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 via-brand-900/10 to-transparent z-10" />
          <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-500">
            <ChefHat className="w-24 h-24 text-brand-400 rotate-12" />
          </div>
          
          {/* Badge */}
          <div className="absolute top-4 left-4 z-20">
            <div className="px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-brand-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">High Protein</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-grow space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-500 font-bold text-[10px] uppercase tracking-[0.2em]">
              <span>{recipe.categoryTitle || 'Healthy Choice'}</span>
            </div>
            <h3 className="text-2xl font-black text-white font-serif leading-tight group-hover:text-brand-400 transition-colors duration-300">
              {recipe.name}
            </h3>
          </div>

          {/* Key Metadata Row */}
          <div className="flex items-center gap-6 text-slate-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-500/60" />
              <span className="text-xs font-bold">{recipe.cookingTime || '25 min'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-brand-500/60" />
              <span className="text-xs font-bold">{formatMacro(recipe.nutrition?.perServingCalories, ' cal')}</span>
            </div>
          </div>

          {/* Macros Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group-hover:bg-brand-500/5 transition-colors">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Protein</span>
              <span className="text-sm font-black text-white">{formatMacro(recipe.nutrition?.perServingProtein, 'g')}</span>
            </div>
            <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group-hover:bg-brand-500/5 transition-colors">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Carbs</span>
              <span className="text-sm font-black text-white">{formatMacro(recipe.nutrition?.perServingCarbs, 'g')}</span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 mt-auto flex items-center justify-between border-t border-white/5">
            <span className="text-xs font-bold text-slate-500 group-hover:text-brand-400 transition-colors uppercase tracking-widest">View Recipe</span>
            <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center group-hover:bg-brand-600 transition-all-smooth">
              <ChevronRight className="w-5 h-5 text-brand-400 group-hover:text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
