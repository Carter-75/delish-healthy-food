import React, { useMemo } from 'react';
import { Utensils, Sparkles, TrendingUp, Award, Search } from 'lucide-react';

const formatRecipeCount = (count) => {
  if (typeof count !== 'number' || Number.isNaN(count) || count <= 0) {
    return '0';
  }
  if (count < 25) return `${count}`;
  const interval = Math.max(25, Math.floor((count - 1) / 25) * 25);
  return `${interval}+`;
};

const HeroSection = ({ totalRecipes, onSearch }) => {
  const displayRecipeCount = useMemo(() => formatRecipeCount(totalRecipes), [totalRecipes]);

  return (
    <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 overflow-hidden w-full">
      {/* Background shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-forest-900/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-5xl mx-auto text-center space-y-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-bold tracking-widest uppercase animate-fadeInDown">
          <Sparkles className="w-4 h-4" />
          <span>Fuel Your Fitness Journey</span>
        </div>

        {/* Main Title */}
        <div className="space-y-4 animate-fadeInUp">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-tight font-serif tracking-tight">
            High-Protein <br />
            <span className="text-brand-500 italic">Mastery</span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover {displayRecipeCount} chef-crafted, protein-packed recipes designed to fuel your workouts and delight your palate.
          </p>
        </div>

        {/* Search Bar - Prominent & Editorial */}
        <div className="max-w-2xl mx-auto relative group animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-forest-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
          <div className="relative flex items-center bg-slate-900 border border-white/10 rounded-xl overflow-hidden focus-within:border-brand-500/50 transition-all-smooth shadow-2xl">
            <div className="pl-6 text-slate-500">
              <Search className="w-6 h-6" />
            </div>
            <input
              type="text"
              placeholder="Search recipes, ingredients, or cuisines..."
              className="w-full py-5 px-4 bg-transparent text-white placeholder-slate-500 focus:outline-none text-lg"
              onChange={(e) => onSearch?.(e.target.value)}
            />
            <button className="hidden sm:flex items-center gap-2 px-8 py-5 bg-brand-600 hover:bg-brand-500 text-white font-bold transition-all-smooth">
              Search
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          {[
            { icon: TrendingUp, value: displayRecipeCount, label: 'Curated Recipes', color: 'text-brand-400' },
            { icon: Award, value: '40g+', label: 'Protein Avg.', color: 'text-forest-400' },
            { icon: Utensils, value: '100%', label: 'Flavor Guaranteed', color: 'text-brand-400' }
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 flex flex-col items-center text-center">
              <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
              <div className="text-3xl font-black text-white mb-1 font-serif">{stat.value}</div>
              <div className="text-slate-500 text-xs uppercase tracking-widest font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
