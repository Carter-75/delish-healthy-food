// Utility to load recipe data dynamically

const CATEGORY_DATA_PATH = '/data/recipes/recipe-categories.json';
let categoriesCache = null;
const jsonCache = new Map();

const COLLECTION_PATHS = {
  'chicken-omelettes-variations': '/data/recipes/chicken-omelettes-variations.json',
  'protein-bowls': '/data/recipes/protein-bowls.json',
  'desserts': '/data/recipes/desserts.json',
  'protein-snacks': '/data/recipes/protein-snacks.json',
  'quick-lunches': '/data/recipes/quick-lunches.json',
  'smoothie-bowls': '/data/recipes/smoothie-bowls.json'
};

const fetchJSONWithCache = async (path) => {
  if (!path) {
    return null;
  }

  if (!jsonCache.has(path)) {
    const promise = (async () => {
      const response = await fetch(path, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return await response.json();
    })().catch((error) => {
      console.error(`Failed to load data from ${path}:`, error);
      jsonCache.delete(path);
      throw error;
    });

    jsonCache.set(path, promise);
  }

  return jsonCache.get(path);
};

const fetchCategories = async () => {
  if (categoriesCache) {
    return categoriesCache;
  }

  try {
    const data = await fetchJSONWithCache(CATEGORY_DATA_PATH);
    categoriesCache = Array.isArray(data) ? data : [];
  } catch (error) {
    categoriesCache = [];
  }

  return categoriesCache;
};

const findCategoryById = async (categoryId) => {
  const categories = await fetchCategories();
  return categories.find((category) => category.id === categoryId) || null;
};

const loadCollection = async (pathKeyOrPath) => {
  const path = COLLECTION_PATHS[pathKeyOrPath] || pathKeyOrPath;
  if (!path) {
    return [];
  }

  try {
    const data = await fetchJSONWithCache(path);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    // fetchJSONWithCache already logs the error
    return [];
  }
};

const replaceCountInDescription = (description, total) => {
  if (!description || typeof total !== 'number' || Number.isNaN(total)) {
    return description;
  }

  return /\d+/.test(description)
    ? description.replace(/\d+/, total.toString())
    : description;
};

const getRecipeCountByCategory = () => null;

export const loadRecipeCategories = async () => {
  try {
    const categories = await fetchCategories();

    if (!Array.isArray(categories) || categories.length === 0) {
      return [];
    }

    const enrichedCategories = await Promise.all(
      categories.map(async (category) => {
        if (category.comingSoon) {
          return category;
        }

        let computedTotal = getRecipeCountByCategory(category.id);

        if ((typeof computedTotal !== 'number' || computedTotal < 0) && category?.data?.itemsPath) {
          try {
            const items = await fetchJSONWithCache(category.data.itemsPath);
            if (Array.isArray(items)) {
              computedTotal = items.length;
            }
          } catch (error) {
            // Error already logged inside fetchJSONWithCache
          }
        }

        if (typeof computedTotal === 'number' && computedTotal >= 0) {
          return {
            ...category,
            totalRecipes: computedTotal,
            description: replaceCountInDescription(category.description, computedTotal)
          };
        }

        return category;
      })
    );

    return enrichedCategories;
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
    const variations = await loadChickenOmelettesVariations();
    const numericId = Number(variationId);
    return variations.find(v => Number(v.id) === numericId) || null;
  } catch (error) {
    console.error('Failed to load chicken omelette variation:', error);
    return null;
  }
};

// Load all chicken omelette variations (from individual files)
export const loadChickenOmelettesVariations = async () => {
  try {
    return await loadCollection('chicken-omelettes-variations');
  } catch (error) {
    console.error('Failed to load chicken omelettes variations:', error);
    return [];
  }
};

// Load individual protein bowl
export const loadProteinBowl = async (bowlId) => {
  try {
    const bowls = await loadProteinBowls();
    const numericId = Number(bowlId);
    return bowls.find(b => Number(b.id) === numericId) || null;
  } catch (error) {
    console.error('Failed to load protein bowl:', error);
    return null;
  }
};

// Load all protein bowls (from individual files)
export const loadProteinBowls = async () => {
  try {
    return await loadCollection('protein-bowls');
  } catch (error) {
    console.error('Failed to load protein bowls:', error);
    return [];
  }
};

// Load individual dessert
export const loadDessert = async (dessertId) => {
  try {
    const desserts = await loadDesserts();
    const numericId = Number(dessertId);
    return desserts.find(d => Number(d.id) === numericId) || null;
  } catch (error) {
    console.error('Failed to load dessert:', error);
    return null;
  }
};

// Load all desserts
export const loadDesserts = async () => {
  try {
    return await loadCollection('desserts');
  } catch (error) {
    console.error('Failed to load desserts:', error);
    return [];
  }
};

// Load individual protein snack
export const loadProteinSnack = async (snackId) => {
  try {
    const snacks = await loadProteinSnacks();
    const numericId = Number(snackId);
    return snacks.find(s => Number(s.id) === numericId) || null;
  } catch (error) {
    console.error('Failed to load protein snack:', error);
    return null;
  }
};

// Load all protein snacks
export const loadProteinSnacks = async () => {
  try {
    return await loadCollection('protein-snacks');
  } catch (error) {
    console.error('Failed to load protein snacks:', error);
    return [];
  }
};

// Load individual quick lunch
export const loadQuickLunch = async (lunchId) => {
  try {
    const lunches = await loadQuickLunches();
    const numericId = Number(lunchId);
    return lunches.find(l => Number(l.id) === numericId) || null;
  } catch (error) {
    console.error('Failed to load quick lunch:', error);
    return null;
  }
};

// Load all quick lunches
export const loadQuickLunches = async () => {
  try {
    return await loadCollection('quick-lunches');
  } catch (error) {
    console.error('Failed to load quick lunches:', error);
    return [];
  }
};

// Load individual smoothie bowl
export const loadSmoothieBowl = async (bowlId) => {
  try {
    const bowls = await loadSmoothieBowls();
    const numericId = Number(bowlId);
    return bowls.find(b => Number(b.id) === numericId) || null;
  } catch (error) {
    console.error('Failed to load smoothie bowl:', error);
    return null;
  }
};

// Load all smoothie bowls
export const loadSmoothieBowls = async () => {
  try {
    return await loadCollection('smoothie-bowls');
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
    
    default: {
      const category = await findCategoryById(categoryId);
      if (category?.data?.itemsPath) {
        try {
          const [baseData, items] = await Promise.all([
            category.data.basePath ? fetchJSONWithCache(category.data.basePath) : Promise.resolve(null),
            fetchJSONWithCache(category.data.itemsPath)
          ]);

          return {
            base: baseData,
            recipes: Array.isArray(items) ? items : []
          };
        } catch (error) {
          // Errors already logged by fetchJSONWithCache
        }
      }

      return { base: null, recipes: [] };
    }
  }
};

export const loadSingleRecipe = async (categoryId, recipeId) => {
  const numericId = Number(recipeId);
  
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
    recipe = recipes.find(r => Number(r.id) === numericId);
    base = categoryBase;
  }
  
  return { base, recipe };
};
