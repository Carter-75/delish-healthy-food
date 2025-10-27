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

// Load individual chicken omelette variation
export const loadChickenOmeletteVariation = async (variationId) => {
  try {
    const fileMap = {
      0: 'variation-0-original-creamy.json',
      1: 'variation-1-marinara.json',
      2: 'variation-2-light-alfredo.json',
      3: 'variation-3-fresh-herb.json',
      4: 'variation-4-bbq.json',
      5: 'variation-5-sharp-cheddar.json',
      6: 'variation-6-spicy-mexican.json'
    };
    
    const fileName = fileMap[variationId];
    if (!fileName) throw new Error('Invalid variation ID');
    
    const response = await fetch(`/data/recipes/chicken-omelettes/${fileName}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to load chicken omelette variation:', error);
    return null;
  }
};

// Load all chicken omelette variations (from individual files)
export const loadChickenOmelettesVariations = async () => {
  try {
    // Try loading from individual files first
    const variationIds = [0, 1, 2, 3, 4, 5, 6];
    const variations = await Promise.all(
      variationIds.map(id => loadChickenOmeletteVariation(id))
    );
    
    // Filter out any null values
    const validVariations = variations.filter(v => v !== null);
    
    if (validVariations.length > 0) {
      return validVariations;
    }
    
    // Fallback to combined file
    const response = await fetch('/data/recipes/chicken-omelettes-variations.json');
    return await response.json();
  } catch (error) {
    console.error('Failed to load chicken omelettes variations:', error);
    return [];
  }
};

// Load individual protein bowl
export const loadProteinBowl = async (bowlId) => {
  try {
    const fileMap = {
      0: 'bowl-0-asian-fusion.json',
      1: 'bowl-1-mediterranean.json',
      2: 'bowl-2-tex-mex.json'
    };
    
    const fileName = fileMap[bowlId];
    if (!fileName) throw new Error('Invalid bowl ID');
    
    const response = await fetch(`/data/recipes/protein-bowls-individual/${fileName}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to load protein bowl:', error);
    return null;
  }
};

// Load all protein bowls (from individual files)
export const loadProteinBowls = async () => {
  try {
    // Try loading from individual files first
    const bowlIds = [0, 1, 2];
    const bowls = await Promise.all(
      bowlIds.map(id => loadProteinBowl(id))
    );
    
    // Filter out any null values
    const validBowls = bowls.filter(b => b !== null);
    
    if (validBowls.length > 0) {
      return validBowls;
    }
    
    // Fallback to combined file
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
  const numericId = parseInt(recipeId);
  
  // Try loading individual files first for better performance
  let recipe = null;
  let base = null;
  
  if (categoryId === 'chicken-omelettes') {
    [recipe, base] = await Promise.all([
      loadChickenOmeletteVariation(numericId),
      loadChickenOmelettesBase()
    ]);
  } else if (categoryId === 'protein-bowls') {
    recipe = await loadProteinBowl(numericId);
  }
  
  // If individual file loading failed, fall back to loading all recipes
  if (!recipe) {
    const { base: categoryBase, recipes } = await loadRecipesByCategory(categoryId);
    recipe = recipes.find(r => r.id === numericId);
    base = categoryBase;
  }
  
  return { base, recipe };
};
