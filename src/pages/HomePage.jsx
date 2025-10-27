import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { loadRecipeCategories } from '../utils/recipeLoader';
import HeroSection from '../components/HeroSection';
import CategoryCard from '../components/CategoryCard';
import { Sparkles } from 'lucide-react';

const HomePage = () => {
  const { setTheme } = useTheme();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset to default theme on home page
    setTheme('default');
    
    // Load categories
    loadRecipeCategories()
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load categories:', err);
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
    <div className="space-y-16">
      <HeroSection />
      
      <div className="container mx-auto px-4">
        {/* Categories Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12 animate-fadeInUp">
            Explore Our
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
              bg-clip-text text-transparent ml-3">
              Recipe Categories
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-4xl mx-auto mt-20 text-center animate-fadeInUp">
          <div className="glass-effect rounded-2xl p-8 border border-white/10">
            <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-pulseGlow" />
            <h3 className="text-2xl font-bold text-white mb-4">
              More Delicious Recipes Coming Soon!
            </h3>
            <p className="text-gray-300 leading-relaxed">
              We're constantly adding new high-protein recipes to help you reach your fitness goals. 
              Stay tuned for smoothie bowls, desserts, protein snacks, and quick lunch options!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
