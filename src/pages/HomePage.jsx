import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { loadRecipeCategories } from '../utils/recipeLoader';
import HeroSection from '../components/HeroSection';
import CategoryCard from '../components/CategoryCard';
import { Sparkles } from 'lucide-react';

const HomePage = () => {
  const { setTheme } = useTheme();
  const [categories, setCategories] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset to default theme on home page
    setTheme('default');
    
    // Load categories
    loadRecipeCategories()
      .then(data => {
        const resolvedCategories = Array.isArray(data) ? data : [];
        const visibleCategories = resolvedCategories.filter((category) => !category?.comingSoon);
        console.log('Loaded categories:', visibleCategories);
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
        setCategories([]);
        setTotalRecipes(null);
        setLoading(false);
      });
  }, [setTheme]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <Sparkles className="w-12 h-12 text-blue-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-20">
      {/* Hero Section - Amber/Orange Theme */}
      <HeroSection totalRecipes={totalRecipes} />
      
      <div className="container mx-auto px-4">
        {/* Categories Section - Green/Emerald Theme */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12 animate-fadeInUp">
            Explore Our
            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 
              bg-clip-text text-transparent ml-3">
              Recipe Categories
            </span>
          </h2>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  delay={index * 0.1}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                Loading recipe categories...
              </p>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto mt-24 text-center animate-fadeInUp">
          <div className="glass-effect rounded-3xl p-10 border border-violet-500/20 bg-gradient-to-br from-violet-900/20 via-purple-900/20 to-fuchsia-900/20 shadow-2xl">
            <Sparkles className="w-12 h-12 text-violet-400 mx-auto mb-4 animate-pulseGlow" />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 
              bg-clip-text text-transparent mb-4">
              Explore Fresh, Balanced Ideas
            </h3>
            <p className="text-violet-200 leading-relaxed">
              Discover protein-forward meals curated to support your training, recovery, and daily routine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
