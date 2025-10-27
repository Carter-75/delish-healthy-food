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

// Load individual dessert
export const loadDessert = async (dessertId) => {
  try {
    const fileMap = {
      0: 'dessert-0-butternut-brownies.json',
      1: 'dessert-1-oreo-cinnamon-rolls.json',
      2: 'dessert-2-oreo-cinnamon-rolls-cream.json',
      3: 'dessert-3-nutella-pan-brownies.json',
      4: 'dessert-4-reeses-peanut-butter-cookies.json',
      5: 'dessert-5-cookie-dough-cheesecake-pie.json',
      6: 'dessert-6-cottage-cheese-brownies.json',
      7: 'dessert-7-pumpkin-spice-bites.json',
      8: 'dessert-8-toffee-chocolate-chip-cookies.json',
      9: 'dessert-9-fudgy-brownie-cookies.json',
      10: 'dessert-10-crackly-brownie-cookies.json'
    };
    
    const fileName = fileMap[dessertId];
    if (!fileName) throw new Error('Invalid dessert ID');
    
    const response = await fetch(`/data/recipes/desserts-individual/${fileName}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to load dessert:', error);
    return null;
  }
};

// Load all desserts
export const loadDesserts = async () => {
  try {
    const dessertIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const desserts = await Promise.all(
      dessertIds.map(id => loadDessert(id))
    );
    
    const validDesserts = desserts.filter(d => d !== null);
    
    if (validDesserts.length > 0) {
      return validDesserts;
    }
    
    const response = await fetch('/data/recipes/desserts.json');
    return await response.json();
  } catch (error) {
    console.error('Failed to load desserts:', error);
    return [];
  }
};

// Load individual protein snack
export const loadProteinSnack = async (snackId) => {
  try {
    const fileMap = {
      0: 'snack-0-protein-banana-pancake.json',
      1: 'snack-1-brookie-protein-cookie-dough-cup.json',
      2: 'snack-2-high-protein-cinnamon-bites.json'
    };
    
    const fileName = fileMap[snackId];
    if (!fileName) throw new Error('Invalid snack ID');
    
    const response = await fetch(`/data/recipes/protein-snacks-individual/${fileName}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to load protein snack:', error);
    return null;
  }
};

// Load all protein snacks
export const loadProteinSnacks = async () => {
  try {
    const snackIds = [0, 1, 2];
    const snacks = await Promise.all(
      snackIds.map(id => loadProteinSnack(id))
    );
    
    const validSnacks = snacks.filter(s => s !== null);
    
    if (validSnacks.length > 0) {
      return validSnacks;
    }
    
    const response = await fetch('/data/recipes/protein-snacks.json');
    return await response.json();
  } catch (error) {
    console.error('Failed to load protein snacks:', error);
    return [];
  }
};

// Load individual quick lunch
export const loadQuickLunch = async (lunchId) => {
  try {
    const fileMap = {
      0: 'lunch-0-chicken-alfredo-garlic-bread.json'
    };
    
    const fileName = fileMap[lunchId];
    if (!fileName) throw new Error('Invalid lunch ID');
    
    const response = await fetch(`/data/recipes/quick-lunches-individual/${fileName}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to load quick lunch:', error);
    return null;
  }
};

// Load all quick lunches
export const loadQuickLunches = async () => {
  try {
    const lunchIds = [0];
    const lunches = await Promise.all(
      lunchIds.map(id => loadQuickLunch(id))
    );
    
    const validLunches = lunches.filter(l => l !== null);
    
    if (validLunches.length > 0) {
      return validLunches;
    }
    
    const response = await fetch('/data/recipes/quick-lunches.json');
    return await response.json();
  } catch (error) {
    console.error('Failed to load quick lunches:', error);
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
    
    case 'desserts':
      const desserts = await loadDesserts();
      return { base: null, recipes: desserts };
    
    case 'protein-snacks':
      const snacks = await loadProteinSnacks();
      return { base: null, recipes: snacks };
    
    case 'quick-lunches':
      const lunches = await loadQuickLunches();
      return { base: null, recipes: lunches };
    
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
  } else if (categoryId === 'desserts') {
    recipe = await loadDessert(numericId);
  } else if (categoryId === 'protein-snacks') {
    recipe = await loadProteinSnack(numericId);
  } else if (categoryId === 'quick-lunches') {
    recipe = await loadQuickLunch(numericId);
  }
  
  // If individual file loading failed, fall back to loading all recipes
  if (!recipe) {
    const { base: categoryBase, recipes } = await loadRecipesByCategory(categoryId);
    recipe = recipes.find(r => r.id === numericId);
    base = categoryBase;
  }
  
  return { base, recipe };
};
