import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { loadRecipesByCategory, loadRecipeCategories } from '../utils/recipeLoader';
import RecipeCard from '../components/RecipeCard';
import { ChevronLeft, List, Sparkles, ChefHat, CheckCircle2 } from 'lucide-react';
import Seo from '../components/Seo';
import LoadingState from '../components/LoadingState';

const RecipeCategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [recipeData, setRecipeData] = useState({ base: null, recipes: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTheme(categoryId);
    window.scrollTo(0, 0);
    
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
    return <LoadingState label="Gathering the collection" />;
  }

  return (
    <div className="pb-32">
      <Seo
        title={`${categoryInfo?.title || 'Recipes'} - Delish Healthy Food`}
        description={categoryInfo?.description || 'Browse high-protein recipes by category.'}
      />

      {/* Hero Header */}
      <div className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 bg-slate-900/50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 blur-[120px] rounded-full" />
        
        <div className="container mx-auto px-4 max-w-7xl space-y-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-400 transition-colors group uppercase text-xs font-black tracking-widest"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Categories
          </Link>

          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              <span>Full Collection</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-white font-serif leading-tight tracking-tight">
              {categoryInfo?.title || 'Recipes'}
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed italic">
              {categoryInfo?.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar / Base Ingredients */}
        <div className="lg:col-span-4 lg:block order-2 lg:order-1">
          {recipeData.base && (
            <div className="glass-card rounded-[2.5rem] p-10 space-y-8 sticky top-24">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-brand-400" />
                </div>
                <h2 className="text-2xl font-black text-white font-serif tracking-tight">Shared <span className="text-brand-500 italic">Base</span></h2>
              </div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Essential foundations for all variations in this category.</p>
              <ul className="space-y-4">
                {recipeData.base.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3 group text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-brand-500/40 group-hover:text-brand-500 mt-0.5 transition-colors" />
                    <span className="leading-relaxed group-hover:text-white transition-colors">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Recipe Grid */}
        <div className="lg:col-span-8 order-1 lg:order-2">
           <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
              <h2 className="text-3xl font-black text-white font-serif tracking-tight">
                {recipeData.base ? 'Available Variations' : 'The Collection'}
              </h2>
              <div className="text-right">
                 <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Total Offering</p>
                 <p className="text-xl font-black text-white font-serif">{recipeData.recipes.length} <span className="text-xs text-brand-500">Dishes</span></p>
              </div>
           </div>

           {recipeData.recipes.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
             <div className="py-20 text-center space-y-6">
               <div className="w-20 h-20 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center mx-auto text-slate-700">
                  <ChefHat className="w-10 h-10" />
               </div>
               <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white font-serif tracking-tight">Collection Coming Soon</h3>
                  <p className="text-slate-500 max-w-sm mx-auto">Our culinary masters are currently perfecting the macros for this collection. Check back soon.</p>
               </div>
               <Link to="/" className="inline-block px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all-smooth">
                  Explore Other Recipes
               </Link>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCategoryPage;
