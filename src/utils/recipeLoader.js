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
      6: 'variation-6-spicy-mexican.json',
      7: 'variation-7-sun-dried-tomato.json',
      8: 'variation-8-honey-mustard.json',
      9: 'variation-9-spicy-chipotle.json',
      10: 'variation-10-garlic-parmesan.json',
      11: 'variation-11-creamy-basil.json',
      12: 'variation-12-spicy-cajun.json'
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
    const variationIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
      2: 'bowl-2-tex-mex.json',
      3: 'bowl-3-honey-garlic.json',
      4: 'bowl-4-avocado-fiesta.json',
      5: 'bowl-5-mediterranean-chicken.json',
      6: 'bowl-6-creamy-salsa-chicken.json',
      7: 'bowl-7-crispy-chickpea.json',
      8: 'bowl-8-teriyaki-pineapple.json'
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
    const bowlIds = [0, 1, 2, 3, 4, 5, 6, 7, 8];
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
      10: 'dessert-10-crackly-brownie-cookies.json',
      11: 'dessert-11-double-chocolate-brownies.json',
      12: 'dessert-12-cookie-dough-bars.json',
      13: 'dessert-13-chocolate-chip-cookie-dough-cups.json',
      14: 'dessert-14-cherry-brownie-bars.json',
      15: 'dessert-15-birthday-cake-truffles.json',
      16: 'dessert-16-chocolate-pb-brownie-bites.json',
      17: 'dessert-17-protein-cinnamon-rolls.json',
      18: 'dessert-18-oreo-protein-cinnamon-rolls.json',
      19: 'dessert-19-cinnamon-apple-pie-rolls.json',
      20: 'dessert-20-pumpkin-spice-cinnamon-rolls.json',
      21: 'dessert-21-chocolate-chip-cinnamon-rolls.json'
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
    const dessertIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
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
      2: 'snack-2-high-protein-cinnamon-bites.json',
      3: 'snack-3-churro-bites.json',
      4: 'snack-4-lemon-cheesecake-bars.json',
      5: 'snack-5-pizza-bagel-bites.json',
      6: 'snack-6-almond-joy-cups.json',
      7: 'snack-7-pretzel-nuggets.json',
      8: 'snack-8-pb-banana-bars.json',
      9: 'snack-9-brownie-batter-dip.json',
      10: 'snack-10-strawberry-cheesecake-cups.json',
      11: 'snack-11-cottage-cheese-nacho-dip.json',
      12: 'snack-12-salted-pb-fudge.json',
      13: 'snack-13-apple-pie-oats-bars.json',
      14: 'snack-14-chocolate-covered-strawberries.json',
      15: 'snack-15-protein-ranch-pretzel-bites.json',
      16: 'snack-16-cinnamon-swirl-rice-cakes.json',
      17: 'snack-17-mini-pepperoni-pizza.json'
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
    const snackIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
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
      0: 'lunch-0-chicken-alfredo-garlic-bread.json',
      1: 'lunch-1-pesto-quesadilla.json',
      2: 'lunch-2-bbq-ranch-pita.json',
      3: 'lunch-3-mac-cheese-bowl.json',
      4: 'lunch-4-protein-pizza-rollups.json',
      5: 'lunch-5-buffalo-chicken-rice-cakes.json',
      6: 'lunch-6-chicken-taco-flatbread.json',
      7: 'lunch-7-garlic-herb-chicken-melt.json',
      8: 'lunch-8-chicken-alfredo-pizza-toast.json',
      9: 'lunch-9-bbq-chicken-nacho-plate.json',
      10: 'lunch-10-chicken-pesto-stuffed-tortilla.json',
      11: 'lunch-11-chicken-caesar-melt.json'
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
    const lunchIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
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

// Load individual smoothie bowl
export const loadSmoothieBowl = async (bowlId) => {
  try {
    const fileMap = {
      0: 'bowl-0-mint-chocolate.json',
      1: 'bowl-1-mango-cream.json'
    };
    
    const fileName = fileMap[bowlId];
    if (!fileName) throw new Error('Invalid smoothie bowl ID');
    
    const response = await fetch(`/data/recipes/smoothie-bowls-individual/${fileName}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to load smoothie bowl:', error);
    return null;
  }
};

// Load all smoothie bowls
export const loadSmoothieBowls = async () => {
  try {
    const bowlIds = [0, 1];
    const bowls = await Promise.all(
      bowlIds.map(id => loadSmoothieBowl(id))
    );
    
    const validBowls = bowls.filter(b => b !== null);
    
    if (validBowls.length > 0) {
      return validBowls;
    }
    
    return [];
  } catch (error) {
    console.error('Failed to load smoothie bowls:', error);
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
    
    case 'smoothie-bowls':
      const smoothieBowls = await loadSmoothieBowls();
      return { base: null, recipes: smoothieBowls };
    
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
  } else if (categoryId === 'smoothie-bowls') {
    recipe = await loadSmoothieBowl(numericId);
  }
  
  // If individual file loading failed, fall back to loading all recipes
  if (!recipe) {
    const { base: categoryBase, recipes } = await loadRecipesByCategory(categoryId);
    recipe = recipes.find(r => r.id === numericId);
    base = categoryBase;
  }
  
  return { base, recipe };
};
