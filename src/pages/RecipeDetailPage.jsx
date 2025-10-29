import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { loadSingleRecipe } from '../utils/recipeLoader';
import NutritionCard from '../components/NutritionCard';
import { 
  ChevronLeft, 
  List, 
  ChefHat, 
  Flame,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';

const RecipeDetailPage = () => {
  const { categoryId, recipeId } = useParams();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [recipeData, setRecipeData] = useState({ base: null, recipe: null });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTheme(categoryId);
    
    loadSingleRecipe(categoryId, recipeId)
      .then(data => {
        setRecipeData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load recipe:', err);
        setLoading(false);
      });
  }, [categoryId, recipeId, setTheme]);

  const handleCopyRecipe = () => {
    const { base, recipe } = recipeData;
    let text = `${recipe.name}\n\n`;
    
    if (base) {
      text += `BASE INGREDIENTS:\n${base.ingredients.join('\n')}\n\n`;
    }
    
    text += `RECIPE INGREDIENTS:\n${recipe.ingredients.join('\n')}\n\n`;
    text += `INSTRUCTIONS:\n${recipe.instructions.map((step, i) => `${i + 1}. ${step}`).join('\n')}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <Sparkles className="w-12 h-12 text-blue-400" />
        </div>
      </div>
    );
  }

  if (!recipeData.recipe) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-white text-xl">Recipe not found</p>
        <button
          onClick={() => navigate(`/category/${categoryId}`)}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover-lift"
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  const { base, recipe } = recipeData;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Back Button & Header */}
        <div className="mb-12 animate-fadeInDown">
          <button
            onClick={() => navigate(`/category/${categoryId}`)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${theme.highlight || 'bg-blue-900/30'} 
              border ${theme.border || 'border-blue-500/20'} ${theme.text || 'text-blue-400'} 
              hover-lift transition-all-smooth mb-6`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Recipes</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              {recipe.name}
            </h1>
            <button
              onClick={handleCopyRecipe}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${theme.highlight || 'bg-blue-900/30'} 
                border ${theme.border || 'border-blue-500/20'} ${theme.text || 'text-blue-400'} 
                hover-lift transition-all-smooth`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Copy Recipe</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Nutrition Card */}
        <div className="mb-8">
          <NutritionCard nutrition={recipe.nutrition} servings={recipe.servings || base?.servings || 4} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Ingredients Column */}
          <div className="space-y-8">
            {/* Base Ingredients */}
            {base && (
              <div className={`glass-effect rounded-2xl p-6 border ${theme.border || 'border-white/10'} 
                animate-fadeInUp`}>
                <div className="flex items-center gap-3 mb-6">
                  <List className={`w-6 h-6 ${theme.text || 'text-blue-400'}`} />
                  <h2 className="text-2xl font-bold text-white">Base Ingredients</h2>
                </div>
                <ul className="space-y-3">
                  {base.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg ${theme.highlight || 'bg-blue-900/20'} 
                        stagger-item`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className={`w-2 h-2 mt-2 ${theme.accent || 'bg-blue-500'} rounded-full flex-shrink-0`} />
                      <span className="text-gray-200">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recipe Ingredients */}
            <div className={`glass-effect rounded-2xl p-6 border ${theme.border || 'border-white/10'} 
              animate-fadeInUp`} style={{ animationDelay: base ? '0.2s' : '0s' }}>
              <div className="flex items-center gap-3 mb-6">
                <ChefHat className={`w-6 h-6 ${theme.text || 'text-blue-400'}`} />
                <h2 className="text-2xl font-bold text-white">Recipe Ingredients</h2>
              </div>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg ${theme.highlight || 'bg-blue-900/20'} 
                      stagger-item`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className={`w-2 h-2 mt-2 ${theme.accent || 'bg-blue-500'} rounded-full flex-shrink-0`} />
                    <span className="text-gray-200">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions Column */}
          <div className={`glass-effect rounded-2xl p-6 border ${theme.border || 'border-white/10'} 
            animate-fadeInUp h-fit`} style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-6">
              <Flame className={`w-6 h-6 ${theme.text || 'text-blue-400'}`} />
              <h2 className="text-2xl font-bold text-white">Instructions</h2>
            </div>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className={`flex gap-4 stagger-item`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full ${theme.highlight || 'bg-blue-900/30'} 
                    border ${theme.border || 'border-blue-500/20'} flex items-center justify-center`}>
                    <span className={`font-bold ${theme.text || 'text-blue-400'}`}>{index + 1}</span>
                  </div>
                  <p className="text-gray-200 leading-relaxed pt-1">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
