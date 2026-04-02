import React from 'react';
import { Activity, Flame, Beef, Wheat, Droplet, Apple } from 'lucide-react';

const MacroItem = ({ icon: Icon, label, value, unit, color }) => (
  <div className="flex flex-col items-center p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-brand-500/5 transition-all-smooth">
    <Icon className={`w-6 h-6 ${color} mb-3 group-hover:scale-110 transition-transform`} aria-hidden="true" />
    <div className="text-2xl font-black text-white font-serif">{value}<span className="text-xs text-slate-500 ml-0.5">{unit}</span></div>
    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">{label}</div>
  </div>
);

const NutritionCard = ({ nutrition }) => {
  if (!nutrition) return null;

  return (
    <div className="glass-card rounded-[2.5rem] p-10 space-y-10 border-brand-500/10 h-full">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center">
            <Activity className="w-6 h-6 text-brand-400" />
          </div>
          <h2 className="text-2xl font-black text-white font-serif tracking-tight">Nutrition <span className="text-brand-500 italic">Facts</span></h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Per Serving</p>
          <p className="text-xl font-black text-white font-serif">{nutrition.perServingCalories || 0} <span className="text-xs text-brand-500">cal</span></p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MacroItem 
          icon={Beef} 
          label="Protein" 
          value={Math.round(nutrition.perServingProtein || 0)} 
          unit="g" 
          color="text-brand-400" 
        />
        <MacroItem 
          icon={Wheat} 
          label="Carbs" 
          value={Math.round(nutrition.perServingCarbs || 0)} 
          unit="g" 
          color="text-brand-400" 
        />
        <MacroItem 
          icon={Droplet} 
          label="Fats" 
          value={Math.round(nutrition.perServingFat || 0)} 
          unit="g" 
          color="text-brand-400" 
        />
        <MacroItem 
          icon={Apple} 
          label="Fiber" 
          value={Math.round(nutrition.perServingFiber || 0)} 
          unit="g" 
          color="text-brand-400" 
        />
      </div>

      <div className="p-6 rounded-2xl bg-brand-500/5 border border-brand-500/10 flex items-center gap-4">
        <Flame className="w-6 h-6 text-brand-500" aria-hidden="true" />
        <p className="text-sm text-slate-300 leading-relaxed italic">
          High-protein balance optimized for muscle recovery and sustained energy levels throughout your fitness journey.
        </p>
      </div>
    </div>
  );
};

export default NutritionCard;
