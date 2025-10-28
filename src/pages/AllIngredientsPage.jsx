import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { 
  loadChickenOmelettesVariations,
  loadProteinBowls,
  loadDesserts,
  loadProteinSnacks,
  loadQuickLunches,
  loadSmoothieBowls,
  loadChickenOmelettesBase
} from '../utils/recipeLoader';
import { ShoppingCart, Sparkles, ChefHat } from 'lucide-react';

const AllIngredientsPage = () => {
  const { setTheme } = useTheme();
  const [allIngredients, setAllIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRecipes, setTotalRecipes] = useState(0);

  useEffect(() => {
    setTheme('default');
    
    const loadAllIngredients = async () => {
      try {
        // Load all recipes from all categories
        const [
          omelettesBase,
          omelettes,
          bowls,
          desserts,
          snacks,
          lunches,
          smoothies
        ] = await Promise.all([
          loadChickenOmelettesBase(),
          loadChickenOmelettesVariations(),
          loadProteinBowls(),
          loadDesserts(),
          loadProteinSnacks(),
          loadQuickLunches(),
          loadSmoothieBowls()
        ]);

        // Collect all recipes
        const allRecipes = [
          ...(omelettes || []),
          ...(bowls || []),
          ...(desserts || []),
          ...(snacks || []),
          ...(lunches || []),
          ...(smoothies || [])
        ];

        // Add base omelette ingredients if exists
        if (omelettesBase && omelettesBase.baseIngredients) {
          allRecipes.push({ ingredients: omelettesBase.baseIngredients });
        }

        setTotalRecipes(allRecipes.length);

        // Extract all ingredients and normalize them
        const ingredientsSet = new Set();
        
        allRecipes.forEach(recipe => {
          if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
            recipe.ingredients.forEach(ingredient => {
              // Remove quantities and normalize
              let normalized = ingredient
                .toLowerCase()
                // Remove unicode fractions (¼, ½, ¾, etc.)
                .replace(/[¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]/g, '')
                // Remove anything in parentheses first
                .replace(/\(.*?\)/g, '')
                // Remove percentages (0%, 2%, etc.)
                .replace(/\d+%\s*/g, '')
                // Remove numbers with or without decimals/fractions
                .replace(/\d+\.?\d*\/?\d*/g, '')
                // Remove measurement units (case insensitive)
                .replace(/\b(cup|cups|tbsp|tsp|teaspoon|teaspoons|tablespoon|tablespoons|oz|ounce|ounces|g|gram|grams|lb|lbs|pound|pounds|packet|packets|scoop|scoops|ml|l|kg)\b/gi, '')
                // Remove "of" 
                .replace(/\bof\b/gi, '')
                // Remove + signs and remaining numbers
                .replace(/\+/g, '')
                // Remove extra spaces
                .replace(/\s+/g, ' ')
                .trim();
              
              // Remove leading dashes or slashes
              normalized = normalized.replace(/^[-\/]+\s*/, '').trim();
              
              if (normalized && normalized.length > 2) {
                ingredientsSet.add(normalized);
              }
            });
          }
        });

        // Convert to array and sort alphabetically
        const ingredientsList = Array.from(ingredientsSet).sort();
        setAllIngredients(ingredientsList);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load ingredients:', error);
        setLoading(false);
      }
    };

    loadAllIngredients();
  }, [setTheme]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">
          <Sparkles className="w-12 h-12 text-emerald-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-12 animate-fadeInUp">
        <div className="inline-block p-4 rounded-2xl glass-effect mb-6">
          <ShoppingCart className="w-16 h-16 text-emerald-400 animate-pulseGlow" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Master Shopping List
        </h1>
        <p className="text-xl text-emerald-300 mb-2">
          Everything You Need for All {totalRecipes} Recipes
        </p>
        <p className="text-gray-400">
          Buy these {allIngredients.length} ingredients and you can make every single recipe on this site!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 animate-fadeInUp">
        <div className="glass-effect rounded-xl p-6 border border-emerald-500/20 text-center">
          <ChefHat className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
          <div className="text-3xl font-bold text-white">{totalRecipes}</div>
          <div className="text-sm text-gray-400">Total Recipes</div>
        </div>
        <div className="glass-effect rounded-xl p-6 border border-blue-500/20 text-center">
          <ShoppingCart className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-3xl font-bold text-white">{allIngredients.length}</div>
          <div className="text-sm text-gray-400">Unique Ingredients</div>
        </div>
        <div className="glass-effect rounded-xl p-6 border border-purple-500/20 text-center">
          <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-3xl font-bold text-white">100%</div>
          <div className="text-sm text-gray-400">Recipe Coverage</div>
        </div>
      </div>

      {/* Ingredients List */}
      <div className="glass-effect rounded-2xl p-8 border border-emerald-500/20 animate-fadeInUp">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <ShoppingCart className="w-6 h-6 text-emerald-400" />
          Complete Ingredient List
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {allIngredients.map((ingredient, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 
                transition-all duration-300 border border-white/10 group"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform" />
              <span className="text-gray-200 capitalize text-sm">
                {ingredient}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-12 glass-effect rounded-2xl p-8 border border-purple-500/20 animate-fadeInUp">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-purple-400" />
          Shopping Tips
        </h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">•</span>
            <span>Many ingredients appear in multiple recipes - you'll get great variety from your shopping trip!</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">•</span>
            <span>Stock up on protein powder, frozen fruits, and shelf-stable items for convenience</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">•</span>
            <span>Check each recipe for specific quantities before shopping</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-400 mt-1">•</span>
            <span>Many recipes have optional ingredients - prioritize the essentials first</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AllIngredientsPage;
