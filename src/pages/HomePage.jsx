import React, { useState, useEffect, useDeferredValue } from 'react';
import { useTheme } from '../hooks/useTheme';
import { loadRecipeCategories, searchAllRecipes } from '../utils/recipeLoader';
import HeroSection from '../components/HeroSection';
import CategoryCard from '../components/CategoryCard';
import RecipeCard from '../components/RecipeCard';
import { Sparkles, SearchX, ChefHat } from 'lucide-react';
import Seo from '../components/Seo';
import LoadingState from '../components/LoadingState';

const HomePage = () => {
  const { setTheme } = useTheme();
  const [categories, setCategories] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const deferredQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    setTheme('default');
    
    loadRecipeCategories()
      .then(data => {
        const resolvedCategories = Array.isArray(data) ? data : [];
        const visibleCategories = resolvedCategories.filter((category) => !category?.comingSoon);
        setCategories(visibleCategories);

        const computedTotal = visibleCategories.reduce((sum, category) => {
          return typeof category?.totalRecipes === 'number' && !Number.isNaN(category.totalRecipes)
            ? sum + category.totalRecipes
            : sum;
        }, 0);
        setTotalRecipes(computedTotal > 0 ? computedTotal : null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load categories:', err);
        setLoading(false);
      });
  }, [setTheme]);

  useEffect(() => {
    if (deferredQuery.length >= 2) {
      setSearching(true);
      searchAllRecipes(deferredQuery).then(results => {
        setSearchResults(results);
        setSearching(false);
      });
    } else {
      setSearchResults([]);
    }
  }, [deferredQuery]);

  if (loading) {
    return <LoadingState label="Loading healthy eats" />;
  }

  const isSearching = deferredQuery.length >= 2;

  return (
    <div className="space-y-12 pb-24">
      <Seo
        title="Delish Healthy Food - High-Protein Recipe Collection"
        description="Discover high-protein recipes for your fitness goals. Delicious, nutritious meals crafted for athletes and fitness enthusiasts."
        canonicalPath="/"
      />
      
      <HeroSection 
        totalRecipes={totalRecipes} 
        onSearch={setSearchQuery}
      />
      
      <div className="container mx-auto px-4 max-w-7xl">
        {isSearching ? (
          <div className="max-w-6xl mx-auto space-y-12 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-white font-serif tracking-tight">
                  Search Results for <span className="text-brand-500 italic">"{deferredQuery}"</span>
                </h2>
                <p className="text-slate-400 mt-2">
                  Found {searchResults.length} {searchResults.length === 1 ? 'recipe' : 'recipes'} matching your criteria.
                </p>
              </div>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-brand-400 hover:text-brand-300 font-bold text-sm uppercase tracking-widest border-b border-brand-500/0 hover:border-brand-500/40 transition-all-smooth"
              >
                Clear Search
              </button>
            </div>

            {searching ? (
              <div className="py-20 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500 mx-auto mb-4"></div>
                <p className="text-slate-400 tracking-widest uppercase text-xs font-bold">Scanning Recipe Vault...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResults.map((recipe, index) => (
                  <RecipeCard 
                    key={`${recipe.categoryId}-${recipe.id}`} 
                    recipe={recipe} 
                    categoryId={recipe.categoryId} 
                    delay={index * 0.05}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 glass-card rounded-3xl border-white/5">
                <SearchX className="w-20 h-20 text-slate-700 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white font-serif mb-2">No Recipes Found</h3>
                <p className="text-slate-400 max-w-sm mx-auto">
                  We couldn't find any recipes matching your search. Try searching for "chicken," "bowl," or "dessert."
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight">
                Explore <span className="text-brand-500 italic">Categories</span>
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                Carefully selected collections focused on high-protein, nutritionally balanced ingredients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  delay={index * 0.1}
                />
              ))}
            </div>

            {/* Featured Quote/Section */}
            <div className="relative mt-32 p-12 glass-card rounded-[3rem] overflow-hidden border-brand-500/10 bg-brand-500/[0.02]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[100px] -z-10" />
              <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
                <ChefHat className="w-12 h-12 text-brand-500 mx-auto" />
                <blockquote className="text-2xl sm:text-3xl font-serif italic text-white leading-relaxed">
                  "Eating well is a form of self-respect. Our recipes are designed to prove that high-protein, goal-focused nutrition can be the highlight of your day."
                </blockquote>
                <div className="flex items-center justify-center gap-3 text-brand-400 font-bold uppercase tracking-widest text-xs">
                  <div className="h-px w-8 bg-brand-500/40" />
                  <span>The Delish Mastery Team</span>
                  <div className="h-px w-8 bg-brand-500/40" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
