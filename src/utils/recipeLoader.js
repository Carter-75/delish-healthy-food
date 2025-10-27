// Utility to load recipe data dynamically
export const loadRecipeCategories = async () => {
  try {
    const response = await fetch('/data/recipes/recipe-categories.json');
    return await response.json();
  } catch (error) {
    console.error('Failed to load recipe categories:', error);
    return [];
  }
};

export const loadChickenOmelettesBase = async () => {
  try {
    const response = await fetch('/data/recipes/chicken-omelettes-base.json');
    return await response.json();
  } catch (error) {
    console.error('Failed to load chicken omelettes base:', error);
    return null;
  }
};

export const loadChickenOmelettesVariations = async () => {
  try {
    const response = await fetch('/data/recipes/chicken-omelettes-variations.json');
    return await response.json();
  } catch (error) {
    console.error('Failed to load chicken omelettes variations:', error);
    return [];
  }
};

export const loadProteinBowls = async () => {
  try {
    const response = await fetch('/data/recipes/protein-bowls.json');
    return await response.json();
  } catch (error) {
    console.error('Failed to load protein bowls:', error);
    return [];
  }
};

export const loadRecipesByCategory = async (categoryId) => {
  switch (categoryId) {
    case 'chicken-omelettes':
      const [base, variations] = await Promise.all([
        loadChickenOmelettesBase(),
        loadChickenOmelettesVariations()
      ]);
      return { base, recipes: variations };
    
    case 'protein-bowls':
      const bowls = await loadProteinBowls();
      return { base: null, recipes: bowls };
    
    default:
      return { base: null, recipes: [] };
  }
};

export const loadSingleRecipe = async (categoryId, recipeId) => {
  const { base, recipes } = await loadRecipesByCategory(categoryId);
  const recipe = recipes.find(r => r.id === parseInt(recipeId));
  return { base, recipe };
};
