// Utility to load recipe data dynamically

const CATEGORY_DATA_PATH = '/data/recipes/recipe-categories.json';
let categoriesCache = null;
const jsonCache = new Map();

// All recipe locations come from recipe-categories.json; no hardcoded paths below

const fetchJSONWithCache = async (path) => {
  if (!path) {
    return null;
  }

  if (!jsonCache.has(path)) {
    const promise = (async () => {
      const base = (import.meta && import.meta.env && import.meta.env.BASE_URL) || '/';
      const candidates = [];
      // original path
      candidates.push(path);
      // base + path (for apps deployed under a subpath)
      if (path.startsWith('/')) {
        candidates.push(base.replace(/\/$/, '') + path);
      } else {
        candidates.push(base.replace(/\/$/, '') + '/' + path);
        candidates.push('/' + path);
      }

      let lastError;
      for (const url of candidates) {
        try {
          const response = await fetch(url, { cache: 'no-store' });
          if (!response.ok) {
            lastError = new Error(`Request failed with status ${response.status}`);
            continue;
          }
          return await response.json();
        } catch (err) {
          lastError = err;
        }
      }
      throw lastError || new Error(`Failed to load ${path}`);
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

const loadCollection = async (categoryIdOrPath) => {
  try {
    // If this looks like a path, fetch it directly
    if (typeof categoryIdOrPath === 'string' && (categoryIdOrPath.startsWith('/') || categoryIdOrPath.endsWith('.json'))) {
      const direct = await fetchJSONWithCache(categoryIdOrPath);
      return Array.isArray(direct) ? direct : [];
    }

    // Otherwise treat as category id and resolve via recipe-categories.json
    const category = await findCategoryById(categoryIdOrPath);
    if (category?.data?.itemsPath) {
      const items = await fetchJSONWithCache(category.data.itemsPath);
      return Array.isArray(items) ? items : [];
    }
  } catch (error) {
    // error already logged by fetchJSONWithCache
  }
  return [];
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
    const category = await findCategoryById('chicken-omelettes');
    if (category?.data?.basePath) {
      return await fetchJSONWithCache(category.data.basePath);
    }
  } catch (error) {
    console.error('Failed to load chicken omelettes base:', error);
  }
  return null;
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
  const category = await findCategoryById(categoryId);
  if (!category || !category.data) {
    return { base: null, recipes: [] };
  }

  try {
    const [baseData, items] = await Promise.all([
      category.data.basePath ? fetchJSONWithCache(category.data.basePath) : Promise.resolve(null),
      category.data.itemsPath ? fetchJSONWithCache(category.data.itemsPath) : Promise.resolve([])
    ]);

    return {
      base: baseData,
      recipes: Array.isArray(items) ? items : []
    };
  } catch (error) {
    // errors are already logged inside fetchJSONWithCache
    return { base: null, recipes: [] };
  }
};

export const loadSingleRecipe = async (categoryId, recipeId) => {
  const numericId = Number(recipeId);
  const { base, recipes } = await loadRecipesByCategory(categoryId);
  const recipe = (recipes || []).find(r => Number(r.id) === numericId) || null;
  return { base, recipe };
};
