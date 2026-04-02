import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { Clock, ChevronRight, UtensilsCrossed, ArrowRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const CategoryCard = ({ category, delay = 0 }) => {
  const { setTheme } = useTheme();
  const navigate = useNavigate();

  const Icon = (category.icon && LucideIcons[category.icon]) || UtensilsCrossed;

  const handleClick = () => {
    setTheme(category.id);
    navigate(`/category/${category.id}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="stagger-item group block h-full focus:outline-none"
      style={{ '--stagger-delay': `${delay}s` }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View ${category.title} recipes`}
    >
      <div className="glass-card rounded-[2.5rem] p-10 h-full flex flex-col items-center text-center transition-all-smooth border-white/5 hover:border-brand-500/30 hover:bg-brand-500/[0.03]">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-brand-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative w-20 h-20 rounded-[1.5rem] bg-slate-900 border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-600 transition-all-smooth shadow-2xl">
            <Icon className="w-10 h-10 text-brand-400 group-hover:text-white transition-colors" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-brand-500 font-bold text-[10px] uppercase tracking-[0.2em]">
            <Clock className="w-3 h-3" />
            <span>{category.cookingTime || 'Quick'}</span>
          </div>
          <h3 className="text-2xl font-black text-white font-serif tracking-tight group-hover:text-brand-400 transition-colors">
            {category.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[220px] mx-auto">
            {category.description}
          </p>
        </div>

        <div className="mt-auto pt-8 flex items-center gap-2 text-brand-500 font-black text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span>Explore Collection</span>
          <ArrowRight className="w-3 h-3 translate-y-[-1px]" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
