import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { loadSingleRecipe } from '../utils/recipeLoader';
import NutritionCard from '../components/NutritionCard';
import { 
  ChevronLeft, 
  ChefHat, 
  Flame,
  Copy,
  Check,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  ListTodo
} from 'lucide-react';
import Seo from '../components/Seo';
import LoadingState from '../components/LoadingState';

const RecipeDetailPage = () => {
  const { categoryId, recipeId } = useParams();
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const [recipeData, setRecipeData] = useState({ base: null, recipe: null });
  const [loading, setLoading] = useState(true);
  const [copyState, setCopyState] = useState('idle');

  useEffect(() => {
    setTheme(categoryId);
    window.scrollTo(0, 0);
    
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

  const handleCopyRecipe = async () => {
    const { base, recipe } = recipeData;
    let text = `${recipe.name}\n\n`;
    
    if (base) {
      text += `BASE INGREDIENTS:\n${base.ingredients.join('\n')}\n\n`;
    }
    
    text += `RECIPE INGREDIENTS:\n${recipe.ingredients.join('\n')}\n\n`;
    text += `INSTRUCTIONS:\n${recipe.instructions.map((step, i) => `${i + 1}. ${step}`).join('\n')}`;
    
    const fallbackCopy = () => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    };

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopyState('success');
      } else if (fallbackCopy()) {
        setCopyState('success');
      } else {
        setCopyState('error');
      }
    } catch (error) {
      const success = fallbackCopy();
      setCopyState(success ? 'success' : 'error');
    }

    setTimeout(() => setCopyState('idle'), 2500);
  };

  if (loading) {
    return <LoadingState label="Preparing your healthy masterpiece" />;
  }

  if (!recipeData.recipe) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-black text-white font-serif mb-4">Recipe Not Found</h2>
        <Link to="/" className="text-brand-400 font-bold hover:underline">Return Home</Link>
      </div>
    );
  }

  const { base, recipe } = recipeData;

  return (
    <div className="pb-32">
      <Seo 
        title={`${recipe.name} - Delish Healthy Food`}
        description={`Healthy ${recipe.name} recipe. High-protein and delicious fitness-focused meal.`}
      />

      {/* Hero Header */}
      <div className="relative pt-12 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/50 -z-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/5 blur-[120px] rounded-full" />
        
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <button 
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-400 transition-colors group uppercase text-xs font-black tracking-widest"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>

             <button
              onClick={handleCopyRecipe}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-brand-500/30 text-white font-bold text-xs uppercase tracking-widest transition-all-smooth"
            >
              {copyState === 'success' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-brand-400" />
                  <span>Copy Full Recipe</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8 animate-fadeInLeft">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-widest">
                  <Sparkles className="w-3 h-3" />
                  <span>Premium High Protein</span>
                </div>
                <h1 className="text-5xl sm:text-7xl font-black text-white font-serif leading-tight tracking-tight">
                  {recipe.name}
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed max-w-xl italic">
                   {base?.description ? `"${base.description}"` : "A nutritionally optimized meal designed for peak performance and exceptional taste."}
                </p>
              </div>

              <div className="flex flex-wrap gap-8 text-white pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Time</p>
                    <p className="font-bold">{recipe.cookingTime || '25 min'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Servings</p>
                    <p className="font-bold">{recipe.servings || base?.servings || 1} { (recipe.servings || base?.servings) === 1 ? 'Person' : 'People'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fadeInRight">
              <NutritionCard nutrition={recipe.nutrition} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl relative -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Ingredients */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card rounded-[2.5rem] p-10 space-y-8 sticky top-24">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-brand-400" />
                </div>
                <h2 className="text-2xl font-black text-white font-serif tracking-tight">Ingredients</h2>
              </div>
              
              <div className="space-y-10">
                {base && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-brand-500">Base Components</h3>
                    <ul className="space-y-3">
                      {base.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-start gap-3 group text-slate-300">
                          <CheckCircle2 className="w-5 h-5 text-brand-500/40 group-hover:text-brand-500 mt-0.5 transition-colors" />
                          <span className="leading-relaxed group-hover:text-white transition-colors">{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-brand-500">Variation specifics</h3>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-start gap-3 group text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-brand-400/40 group-hover:text-brand-400 mt-0.5 transition-colors" />
                        <span className="leading-relaxed group-hover:text-white transition-colors">{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-[2.5rem] p-10 lg:p-16 space-y-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center">
                  <ListTodo className="w-6 h-6 text-brand-400" />
                </div>
                <h2 className="text-2xl font-black text-white font-serif tracking-tight">Preparation</h2>
              </div>
              <div className="space-y-12">
                {recipe.instructions.map((step, index) => (
                  <div key={index} className="flex gap-8 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center text-brand-400 font-serif font-black text-xl group-hover:bg-brand-600 group-hover:text-white transition-all-smooth">
                      {index + 1}
                    </div>
                    <div className="pt-2">
                       <p className="text-lg text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                        {step}
                       </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
