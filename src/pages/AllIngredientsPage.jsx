import React, { useDeferredValue, useMemo, useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { loadRecipeCategories, loadRecipesByCategory } from '../utils/recipeLoader';
import { ShoppingCart, Sparkles, ChefHat, Search, X, Zap } from 'lucide-react';
import Seo from '../components/Seo';
import LoadingState from '../components/LoadingState';

const AllIngredientsPage = () => {
  const { setTheme } = useTheme();
  const [allIngredients, setAllIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const deferredQuery = useDeferredValue(searchQuery);

  const filteredIngredients = useMemo(() => {
    const query = deferredQuery.trim().toLowerCase();
    if (!query) {
      return allIngredients;
    }
    return allIngredients.filter((ingredient) => ingredient.toLowerCase().includes(query));
  }, [allIngredients, deferredQuery]);

  useEffect(() => {
    setTheme('default');
    window.scrollTo(0, 0);
    
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

        const ingredientsSet = new Set();
        
        aggregatedRecipes.forEach(recipe => {
          if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
            recipe.ingredients.forEach(ingredient => {
              let normalized = ingredient
                .toLowerCase()
                .replace(/^optional:\s*/i, '')
                .replace(/\s*(for topping|for garnish|for serving).*$/i, '')
                .replace(/\s+to\s+taste\s*$/i, '')
                .replace(/[¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]/g, '')
                .replace(/\([^)]*\)?/g, '')
                .replace(/\d+%\s*/g, '')
                .replace(/\d+\.?\d*\/?\d*/g, '')
                .replace(/\b(cup|cups|tbsp|tsp|teaspoon|teaspoons|tablespoon|tablespoons|oz|ounce|ounces|g|gram|grams|lb|lbs|pound|pounds|packet|packets|scoop|scoops|ml|l|kg)\b/gi, '')
                .replace(/\bof\b/gi, '')
                .replace(/\+/g, '')
                .replace(/\b(handful|splash|pinch|dash|drizzle|sprinkle|bunch|clove|cloves|can|pack|package|loaf|slices?)\s+/gi, '')
                .replace(/\b(large|small|medium|mini|extra)\s+/gi, '')
                .replace(/\b(fresh|frozen|raw|ripe)\s+/gi, '')
                .replace(/\b(chopped|diced|sliced|minced|crushed|melted|softened|cooked|baked|roasted|steamed|grilled|sauteed|peeled|halved|quartered)\s+/gi, '')
                .replace(/\b(room\s+temp|warm|cold|hot|chilled)\s*/gi, '')
                .replace(/[,;.]+$/g, '')
                .replace(/\s+/g, ' ')
                .trim();
              
              normalized = normalized.replace(/^[-\/]+\s*/, '').trim();
              
              const parts = normalized.split(/\s*(?:,|and|&|or)\s+/i);
              
              parts.forEach(part => {
                part = part.trim();
                
                if (part && part.length > 2) {
                  let singularized = part
                    .replace(/\b(egg|chip|bean|pepper|onion|tomato|carrot|mushroom|olive|strawberr|blueberr|raspberr|blackberr|banana)s\b/gi, '$1')
                    .replace(/\bstrawberr\b/gi, 'strawberry')
                    .replace(/\bblueberr\b/gi, 'blueberry')
                    .replace(/\braspberr\b/gi, 'raspberry')
                    .replace(/\bblackberr\b/gi, 'blackberry')
                    .replace(/\bcherries\b/gi, 'cherry')
                    .replace(/\bwedges\b/gi, 'wedge')
                    .replace(/\begg\s+yolks?\b/gi, 'egg yolk')
                    .replace(/\beggs?\s+yolks?\b/gi, 'egg yolk')
                    .replace(/\begg\s+whites?\b/gi, 'egg white')
                    .replace(/\beggs?\s+whites?\b/gi, 'egg white')
                    .replace(/\bwhey\s+(vanilla|chocolate|strawberry|banana|cinnamon)\s+protein\b/gi, '$1 whey protein')
                    .replace(/\bprotein\s+(vanilla|chocolate|strawberry|banana|cinnamon)\s+whey\b/gi, '$1 whey protein')
                    .replace(/\b(vanilla|chocolate|strawberry|banana|cinnamon)\s+protein\s+powder\b/gi, '$1 whey protein')
                    .replace(/\bunflavored\s+whey\s+protein\b/gi, 'whey protein')
                    .replace(/\bprotein\s+powder\b/gi, 'whey protein')
                    .trim();
                  
                  if (/\s+[a-z]$/.test(singularized)) return;
                  if (/^(ing|ed|en|chopped|dusting|melting|split|flat)$/i.test(singularized)) return;
                  if (/^(to|for|with|the|a|an)$/i.test(singularized)) return;
                  if (!/[aeiou]/.test(singularized)) return;
                  if (singularized.length < 3) return;
                  
                  const singleVerbs = /^(taste|wash|spray|temp|water|dusting|melting|split)$/i;
                  if (singleVerbs.test(singularized)) return;
                  
                  singularized = singularized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                  
                  ingredientsSet.add(singularized);
                }
              });
            });
          }
        });

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
    return <LoadingState label="Indexing the ultimate pantry" />;
  }

  return (
    <div className="pb-32">
      <Seo 
        title="Master Shopping List - Delish Healthy Food"
        description="A complete ingredient list covering every recipe on Delish Healthy Food."
      />

      {/* Hero Header */}
      <div className="relative pt-24 pb-20 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 bg-slate-900/50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 blur-[120px] rounded-full" />
        
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-widest animate-fadeInDown">
            <ShoppingCart className="w-3 h-3" />
            <span>Pantry Optimization</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white font-serif leading-tight tracking-tight animate-fadeInUp">
            The Master <br /><span className="text-brand-500 italic">Ingredient List</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            A comprehensive index of every ingredient used across our entire collection. Stock your kitchen with these {allIngredients.length} essentials to master all {totalRecipes} recipes.
          </p>
        </div>
      </div>

       {/* Stats Cards */}
       <div className="container mx-auto px-4 max-w-7xl -mt-8 flex flex-wrap justify-center gap-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="glass-card rounded-2xl px-10 py-6 border-white/5 flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-brand-400" />
             </div>
             <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold leading-none mb-1">Recipes</p>
                <p className="text-xl font-black text-white leading-none">{totalRecipes}</p>
             </div>
          </div>
          <div className="glass-card rounded-2xl px-10 py-6 border-white/5 flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-brand-400" />
             </div>
             <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold leading-none mb-1">Unique Items</p>
                <p className="text-xl font-black text-white leading-none">{allIngredients.length}</p>
             </div>
          </div>
          <div className="glass-card rounded-2xl px-10 py-6 border-white/5 flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-brand-400" />
             </div>
             <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold leading-none mb-1">Coverage</p>
                <p className="text-xl font-black text-white leading-none">100%</p>
             </div>
          </div>
       </div>

      {/* Search & List */}
      <div className="container mx-auto px-4 max-w-7xl mt-24 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex-grow max-w-2xl space-y-4">
            <h2 className="text-3xl font-black text-white font-serif tracking-tight">Explore the Pantry</h2>
             <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by ingredient name..."
                  className="w-full pl-16 pr-16 py-6 bg-slate-900 border border-white/5 rounded-[2rem] focus:border-brand-500/30 outline-none text-white transition-all-smooth"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-white" />
                  </button>
                )}
             </div>
          </div>
          <div className="text-right pb-2">
             <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black">Showing Result</p>
             <p className="text-2xl font-black text-white font-serif">{filteredIngredients.length} <span className="text-sm text-brand-500">Items</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fadeIn">
          {filteredIngredients.length > 0 ? (
            filteredIngredients.map((ingredient, index) => (
              <div 
                key={`${ingredient}-${index}`}
                className="glass-card rounded-2xl p-6 flex items-center gap-4 border-white/5 hover:border-brand-500/20 group transition-all-smooth"
              >
                <div className="w-2 h-2 rounded-full bg-brand-500/30 group-hover:bg-brand-500 group-hover:scale-150 transition-all-smooth" />
                <span className="text-slate-300 group-hover:text-white transition-colors font-bold capitalize text-sm tracking-tight">
                  {ingredient}
                </span>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
               <div className="w-16 h-16 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center mx-auto text-slate-500">
                  <X className="w-8 h-8" />
               </div>
               <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No matching ingredients found</p>
            </div>
          )}
        </div>
      </div>

       {/* Tips Footer */}
       <div className="container mx-auto px-4 max-w-7xl mt-32">
          <div className="glass-card rounded-[3rem] p-12 lg:p-20 border-brand-500/10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="space-y-8">
                <div className="space-y-4">
                   <h3 className="text-3xl font-black text-white font-serif tracking-tight">Expert <span className="text-brand-500 italic">Shopping Tips</span></h3>
                   <p className="text-slate-400 leading-relaxed italic">Optimize your grocery runs with these precision strategies for fitness-focused nutrition.</p>
                </div>
                <ul className="space-y-6">
                   <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-black text-[10px] flex-shrink-0 mt-1">01</div>
                      <p className="text-white font-bold leading-snug">Stock bulk essentials like whey protein, oats, and frozen berries to reduce weekly costs.</p>
                   </li>
                   <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-black text-[10px] flex-shrink-0 mt-1">02</div>
                      <p className="text-white font-bold leading-snug">Many ingredients overlap; one multi-bag of spinach can fuel three different protein bowl variations.</p>
                   </li>
                   <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-black text-[10px] flex-shrink-0 mt-1">03</div>
                      <p className="text-white font-bold leading-snug">Prioritize "Hero" ingredients first—protein sources—before rounding out with optional garnishes.</p>
                   </li>
                </ul>
             </div>
             <div className="relative">
                <div className="absolute inset-0 bg-brand-500/10 blur-[80px] rounded-full" />
                <div className="relative glass-card rounded-[2.5rem] p-10 border-brand-500/20 text-center space-y-6">
                   <Sparkles className="w-12 h-12 text-brand-400 mx-auto" />
                   <h4 className="text-xl font-black text-white font-serif">Ready to Begin?</h4>
                   <p className="text-slate-400 text-sm leading-relaxed">Select a category from the home screen to start building your first performance-driven meal.</p>
                   <button 
                     onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                     className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all-smooth"
                   >
                      Back to Top
                   </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default AllIngredientsPage;
