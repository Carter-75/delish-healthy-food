import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { loadRecipeCategories, loadRecipesByCategory } from '../utils/recipeLoader';
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
        const categories = await loadRecipeCategories();
        const activeCategories = categories.filter(category => !category.comingSoon);

        const categoryData = await Promise.all(
          activeCategories.map(async (category) => {
            try {
              const data = await loadRecipesByCategory(category.id);
              const recipes = Array.isArray(data.recipes) ? data.recipes : [];
              return {
                categoryId: category.id,
                base: data.base,
                recipes
              };
            } catch (error) {
              console.error(`Failed to load recipes for category ${category.id}:`, error);
              return {
                categoryId: category.id,
                base: null,
                recipes: []
              };
            }
          })
        );

        const totalRecipeCount = categoryData.reduce(
          (total, entry) => total + (entry.recipes?.length || 0),
          0
        );

        const aggregatedRecipes = categoryData.flatMap((entry) => {
          const collection = Array.isArray(entry.recipes) ? [...entry.recipes] : [];
          if (entry.base && Array.isArray(entry.base.ingredients)) {
            collection.push({ ingredients: entry.base.ingredients });
          }
          return collection;
        });

        setTotalRecipes(totalRecipeCount);

        // Extract all ingredients and normalize them
        const ingredientsSet = new Set();
        
        aggregatedRecipes.forEach(recipe => {
          if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
            recipe.ingredients.forEach(ingredient => {
              // Remove quantities and normalize
              let normalized = ingredient
                .toLowerCase()
                // Remove "optional:" prefix
                .replace(/^optional:\s*/i, '')
                // Remove "for topping" or "for garnish" suffixes
                .replace(/\s*(for topping|for garnish|for serving).*$/i, '')
                // Remove "to taste" suffix
                .replace(/\s+to\s+taste\s*$/i, '')
                // Remove unicode fractions (¼, ½, ¾, etc.)
                .replace(/[¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]/g, '')
                // Remove anything in parentheses AND the opening parenthesis
                .replace(/\([^)]*\)?/g, '')
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
                // Remove quantity descriptors
                .replace(/\b(handful|splash|pinch|dash|drizzle|sprinkle|bunch|clove|cloves|can|pack|package|loaf|slices?)\s+/gi, '')
                // Remove size descriptors
                .replace(/\b(large|small|medium|mini|extra)\s+/gi, '')
                // Remove state/preparation descriptors
                .replace(/\b(fresh|frozen|raw|ripe)\s+/gi, '')
                // Remove cooking action words
                .replace(/\b(chopped|diced|sliced|minced|crushed|melted|softened|cooked|baked|roasted|steamed|grilled|sauteed|peeled|halved|quartered)\s+/gi, '')
                // Remove common temperature/state descriptors
                .replace(/\b(room\s+temp|warm|cold|hot|chilled)\s*/gi, '')
                // Remove trailing commas/punctuation
                .replace(/[,;.]+$/g, '')
                // Remove extra spaces
                .replace(/\s+/g, ' ')
                .trim();
              
              // Remove leading dashes or slashes
              normalized = normalized.replace(/^[-\/]+\s*/, '').trim();
              
              // Split on commas, "and", "&", "or" to separate compound ingredients
              const parts = normalized.split(/\s*(?:,|and|&|or)\s+/i);
              
              parts.forEach(part => {
                part = part.trim();
                
                if (part && part.length > 2) {
                  // Normalize common variations to singular form
                  let singularized = part
                    // Convert common plurals to singular
                    .replace(/\b(egg|chip|bean|pepper|onion|tomato|carrot|mushroom|olive|strawberr|blueberr|raspberr|blackberr|banana)s\b/gi, '$1')
                    .replace(/\bstrawberr\b/gi, 'strawberry')
                    .replace(/\bblueberr\b/gi, 'blueberry')
                    .replace(/\braspberr\b/gi, 'raspberry')
                    .replace(/\bblackberr\b/gi, 'blackberry')
                    .replace(/\bcherries\b/gi, 'cherry')
                    .replace(/\bwedges\b/gi, 'wedge')
                    // Normalize yolk variations
                    .replace(/\begg\s+yolks?\b/gi, 'egg yolk')
                    .replace(/\beggs?\s+yolks?\b/gi, 'egg yolk')
                    // Normalize white variations
                    .replace(/\begg\s+whites?\b/gi, 'egg white')
                    .replace(/\beggs?\s+whites?\b/gi, 'egg white')
                    // Standardize protein powder word order: "flavor whey protein"
                    .replace(/\bwhey\s+(vanilla|chocolate|strawberry|banana|cinnamon)\s+protein\b/gi, '$1 whey protein')
                    .replace(/\bprotein\s+(vanilla|chocolate|strawberry|banana|cinnamon)\s+whey\b/gi, '$1 whey protein')
                    .replace(/\b(vanilla|chocolate|strawberry|banana|cinnamon)\s+protein\s+powder\b/gi, '$1 whey protein')
                    .replace(/\bunflavored\s+whey\s+protein\b/gi, 'whey protein')
                    .replace(/\bprotein\s+powder\b/gi, 'whey protein')
                    .trim();
                  
                  // Smart filtering using patterns instead of word lists
                  
                  // Filter 1: Remove if ends with space + single letter (incomplete fragment)
                  if (/\s+[a-z]$/.test(singularized)) return;
                  
                  // Filter 2: Remove if it's ONLY an -ing/-ed word without a noun
                  if (/^(ing|ed|en|chopped|dusting|melting|split|flat)$/i.test(singularized)) return;
                  
                  // Filter 3: Remove if it's a standalone preposition/article
                  if (/^(to|for|with|the|a|an)$/i.test(singularized)) return;
                  
                  // Filter 4: Must contain at least one vowel (real words have vowels)
                  if (!/[aeiou]/.test(singularized)) return;
                  
                  // Filter 5: Must be at least 3 characters
                  if (singularized.length < 3) return;
                  
                  // Filter 6: Remove if it's ONLY a single common verb/action
                  const singleVerbs = /^(taste|wash|spray|temp|water|dusting|melting|split)$/i;
                  if (singleVerbs.test(singularized)) return;
                  
                  // Filter 7: Normalize unicode variations (é → e, etc.)
                  singularized = singularized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                  
                  // If it passes all filters, it's likely a real ingredient
                  ingredientsSet.add(singularized);
                }
              });
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
