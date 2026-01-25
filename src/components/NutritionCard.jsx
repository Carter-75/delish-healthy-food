import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Flame, Beef, Users, TrendingUp, Wheat, Droplet, Apple } from 'lucide-react';

const NutritionCard = ({ nutrition, servings = 4 }) => {
  const { theme } = useTheme();

  const formatValue = (value, suffix) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      return { display: 'N/A', suffix: '' };
    }
    return { display: value, suffix };
  };

  const nutritionItems = [
    {
      icon: Flame,
      label: 'Calories',
      ...formatValue(nutrition?.perServingCalories, 'cal'),
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    },
    {
      icon: Beef,
      label: 'Protein',
      ...formatValue(nutrition?.perServingProtein, 'g'),
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    {
      icon: Wheat,
      label: 'Carbs',
      ...formatValue(nutrition?.perServingCarbs, 'g'),
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20'
    },
    {
      icon: Droplet,
      label: 'Fat',
      ...formatValue(nutrition?.perServingFat, 'g'),
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      icon: Apple,
      label: 'Fiber',
      ...formatValue(nutrition?.perServingFiber, 'g'),
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      icon: TrendingUp,
      label: 'Total Calories',
      ...formatValue(nutrition?.totalCalories, 'cal'),
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    }
  ];

  return (
    <div className={`glass-effect rounded-2xl p-6 border ${theme.border || 'border-white/10'} 
      ${theme.shadow || 'shadow-lg'} animate-fadeInUp`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Users className={`w-5 h-5 ${theme.text || 'text-blue-400'}`} />
          Nutrition Facts
        </h3>
        <div className={`px-3 py-1 rounded-full ${theme.highlight || 'bg-blue-900/30'} 
          border ${theme.border || 'border-blue-500/20'}`}>
          <span className={`text-sm font-semibold ${theme.text || 'text-blue-400'}`}>
            {servings} Servings
          </span>
        </div>
      </div>

      {/* Nutrition Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {nutritionItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`${item.bgColor} rounded-xl p-4 border border-white/10 
                hover-lift transition-all-smooth stagger-item`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Icon className={`w-6 h-6 ${item.color} mb-2`} />
              <p className="text-sm text-gray-400 mb-1">{item.label}</p>
              <p className="text-2xl font-bold text-white">
                {item.display}
                {item.suffix && item.display !== 'N/A' && (
                  <span className="text-lg ml-1">{item.suffix}</span>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NutritionCard;
