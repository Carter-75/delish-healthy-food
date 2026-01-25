import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { loadRecipesByCategory, loadRecipeCategories } from '../utils/recipeLoader';
import RecipeCard from '../components/RecipeCard';
import { ChevronLeft, List, Sparkles } from 'lucide-react';
import Seo from '../components/Seo';
import LoadingState from '../components/LoadingState';

const RecipeCategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [recipeData, setRecipeData] = useState({ base: null, recipes: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTheme(categoryId);
    
    Promise.all([
      loadRecipesByCategory(categoryId),
      loadRecipeCategories()
    ]).then(([data, categories]) => {
      const info = categories.find(c => c.id === categoryId);
      if (info?.comingSoon) {
        navigate('/', { replace: true });
        return;
      }
      setRecipeData(data);
      setCategoryInfo(info);
      setLoading(false);
    }).catch(err => {
      console.error('Failed to load recipes:', err);
      setLoading(false);
    });
  }, [categoryId, setTheme, navigate]);

  if (loading) {
    return <LoadingState label="Loading recipes" />;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Seo
        title={`${categoryInfo?.title || 'Recipes'} - Delish Healthy Food`}
        description={categoryInfo?.description || 'Browse high-protein recipes by category.'}
        canonicalPath={`/category/${categoryId}`}
      />
      <div className="max-w-6xl mx-auto">
        {/* Back Button & Header */}
        <div className="mb-12 animate-fadeInDown">
          <button
            onClick={() => navigate('/')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${theme.highlight || 'bg-blue-900/30'} 
              border ${theme.border || 'border-blue-500/20'} ${theme.text || 'text-blue-400'} 
              hover-lift transition-all-smooth mb-6`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Categories</span>
          </button>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {categoryInfo?.title || 'Recipes'}
          </h1>
          <p className={`text-xl ${theme.text || 'text-blue-400'}`}>
            {categoryInfo?.description}
          </p>
        </div>

        {/* Base Ingredients (if exists) */}
        {recipeData.base && (
          <div className={`glass-effect rounded-2xl p-6 sm:p-8 border ${theme.border || 'border-white/10'} 
            mb-12 animate-fadeInUp`}>
            <div className="flex items-center gap-3 mb-6">
              <List className={`w-6 h-6 ${theme.text || 'text-blue-400'}`} />
              <h2 className="text-2xl font-bold text-white">Base Ingredients</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {recipeData.base.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-lg ${theme.highlight || 'bg-blue-900/20'} 
                    stagger-item`}
                  style={{ '--stagger-delay': `${index * 0.05}s` }}
                >
                  <div className={`w-2 h-2 ${theme.accent || 'bg-blue-500'} rounded-full flex-shrink-0`} />
                  <span className="text-gray-200">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recipe Grid */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8 animate-fadeInUp">
            {recipeData.base ? 'Variations' : 'Recipes'}
          </h2>
          
          {recipeData.recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipeData.recipes.map((recipe, index) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  categoryId={categoryId}
                  delay={index * 0.1}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 animate-fadeInUp">
              <Sparkles className={`w-16 h-16 ${theme.text || 'text-blue-400'} mx-auto mb-4 animate-pulseGlow`} />
              <h3 className="text-2xl font-bold text-white mb-2">No recipes available yet</h3>
              <p className="text-gray-400">Check back soon for delicious new recipes!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCategoryPage;
