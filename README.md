# Delish Protein Dishes 🍳✨

A **beautiful, modern, and fully responsive** React web application for high-protein recipes designed for fitness enthusiasts and health-conscious individuals.

## ✨ Features

- 🎨 **Stunning UI/UX** - Modern gradient backgrounds, smooth animations, and glassmorphism effects
- 📱 **Fully Responsive** - Perfect experience on mobile, tablet, and desktop
- 🎭 **Dynamic Theming** - Color-coded categories with smooth theme transitions
- ⚡ **Fast & Modern** - Built with React 18, Vite, and Tailwind CSS
- 🎬 **Beautiful Animations** - Professional fade-in, slide, and hover effects
- 📊 **Detailed Nutrition** - Complete macros for every recipe
- 🔍 **Easy Navigation** - Intuitive routing with React Router
- 💾 **JSON Data Structure** - Organized, maintainable recipe data

## 🏗️ Project Structure

```
delish-healthy-food/
├── index.html                      # Entry HTML file
├── package.json                    # Dependencies
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── src/                            # Source code
│   ├── main.jsx                   # App entry point
│   ├── App.jsx                    # Main App component
│   ├── index.css                  # Global styles
│   ├── components/                # Reusable components
│   │   ├── Layout.jsx
│   │   ├── Navigation.jsx
│   │   ├── BackgroundEffects.jsx
│   │   ├── HeroSection.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── RecipeCard.jsx
│   │   └── NutritionCard.jsx
│   ├── pages/                     # Page components
│   │   ├── HomePage.jsx
│   │   ├── RecipeCategoryPage.jsx
│   │   ├── RecipeDetailPage.jsx
│   │   ├── AboutPage.jsx
│   │   └── ContactPage.jsx
│   ├── hooks/                     # Custom hooks
│   │   └── useTheme.jsx
│   ├── utils/                     # Utility functions
│   │   └── recipeLoader.js
│   └── styles/                    # Style files
│       └── animations.css
├── data/                          # JSON data files
│   ├── recipes/
│   │   ├── chicken-omelettes-base.json
│   │   ├── chicken-omelettes-variations.json
│   │   ├── protein-bowls.json
│   │   └── recipe-categories.json
│   └── themes/
│       └── color-themes.json
└── assets/                        # Legacy compiled assets
    ├── main.js
    └── styles.css
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Color Themes

Each recipe category has its own beautiful color theme:

- **Default**: Amber/Orange gradient
- **Chicken Omelettes**: Orange/Amber
- **Protein Bowls**: Emerald/Green
- **Quick Lunches**: Blue/Indigo
- **Smoothie Bowls**: Violet/Purple
- **Desserts**: Pink/Rose
- **Protein Snacks**: Cyan/Sky
- **Chinese Dishes**: Red/Rose

## 📊 Recipe Data

### Current Recipes

#### Chicken Egg Omelettes (7 Variations)
1. Original Creamy Sauce
2. Marinara Style
3. Light Alfredo
4. Fresh Herb
5. BBQ Style
6. Sharp Cheddar
7. Spicy Mexican

#### Protein Power Bowls (3 Recipes)
1. Asian Fusion Bowl
2. Mediterranean Bowl
3. Tex-Mex Bowl

### Coming Soon
- Smoothie Bowls
- Simple Delicious Desserts
- Protein-Rich Snacks
- 3-Minute Protein Lunches

## 🎬 Animations

Professional animations include:
- Fade in/out effects
- Slide transitions
- Scale animations
- Hover effects with lift
- Gradient shifting backgrounds
- Staggered list animations
- Pulsing glow effects
- Floating elements

## 🧩 Components

### Layout Components
- **Layout**: Main app layout with background effects
- **Navigation**: Responsive nav with mobile menu
- **BackgroundEffects**: Dynamic gradient backgrounds

### Feature Components
- **HeroSection**: Animated hero with stats
- **CategoryCard**: Recipe category cards
- **RecipeCard**: Individual recipe cards
- **NutritionCard**: Nutrition information display

### Pages
- **HomePage**: Landing page with categories
- **RecipeCategoryPage**: Category recipe list
- **RecipeDetailPage**: Full recipe details
- **AboutPage**: About the project
- **ContactPage**: Contact form

## 🛠️ Technologies

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS
- **React Router v6** - Client-side routing
- **Lucide React** - Beautiful icon library
- **PostCSS** - CSS processing
- **Terser** - JS minification

## 📱 Responsive Design

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

Optimized breakpoints and fluid typography ensure perfect viewing on all devices.

## 🎯 Features Breakdown

### User Experience
- Smooth page transitions
- Loading states with spinners
- Copy recipe functionality
- Hover effects on interactive elements
- Mobile-first design approach

### Performance
- Code splitting
- Lazy loading
- Optimized bundle size
- Fast page loads
- Efficient re-renders

### Accessibility
- Semantic HTML
- ARIA labels (where needed)
- Keyboard navigation support
- Color contrast compliance

## 📄 License

Copyright © 2024 Delish Protein Dishes. All rights reserved.

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📧 Contact

For questions or feedback, visit the Contact page in the application.

---

**Built with ❤️ for fitness enthusiasts and food lovers**
