# Delish Protein Dishes

A web application for healthy protein recipes and meal planning.

## Project Structure

```
delish-healthy-food/
├── index.html                          # Main HTML file
├── assets/                             # Static assets directory
│   ├── main.js                        # Main JavaScript bundle (React app)
│   └── styles.css                     # Main stylesheet (Tailwind CSS)
├── data/                              # JSON data files
│   ├── recipes/                       # Recipe data
│   │   ├── chicken-omelettes-base.json
│   │   ├── chicken-omelettes-variations.json
│   │   ├── protein-bowls.json
│   │   └── recipe-categories.json
│   └── themes/                        # Theme configurations
│       └── color-themes.json
└── README.md                          # This file
```

## Data Structure

### Recipe Categories (`recipe-categories.json`)
Contains all available recipe categories with metadata:
- ID and title
- Description and cooking time
- Icon reference
- Base/variation flags
- Total recipe count

### Chicken Omelettes
- **Base Recipe** (`chicken-omelettes-base.json`): Shared base ingredients for all variations
- **Variations** (`chicken-omelettes-variations.json`): 7 different sauce/flavor variations
  - Original Creamy Sauce
  - Marinara Style
  - Light Alfredo
  - Fresh Herb
  - BBQ Style
  - Sharp Cheddar
  - Spicy Mexican

### Protein Bowls (`protein-bowls.json`)
3 globally-inspired protein bowl recipes:
- Asian Fusion Bowl
- Mediterranean Bowl
- Tex-Mex Bowl

### Themes (`color-themes.json`)
Color themes for different recipe categories including:
- Text colors
- Accent colors
- Border styles
- Gradients
- Hover effects

## Features

- 🍳 High-protein recipe collection
- 📊 Detailed nutrition information (calories, protein per serving)
- 🎨 Dynamic color themes per category
- 📱 Responsive design (mobile-friendly)
- 🔥 Step-by-step cooking instructions
- 💪 Fitness-focused meal planning

## Technology Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State Management**: Zustand
- **Build Tool**: Vite

## Usage

Open `index.html` in a web browser to view the application.

For development:
```bash
npm install
npm run dev
```

## Nutrition Information

All recipes include:
- Total calories (for 4 servings)
- Per-serving calories
- Total protein content
- Per-serving protein content

## Coming Soon

- Smoothie Bowls
- Simple Delicious Desserts
- Protein-Rich Snacks
- 3-Minute Protein Lunches
- Chinese Dishes

## License

Copyright © 2024 Delish Protein Dishes
