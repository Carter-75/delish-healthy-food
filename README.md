# Delish Healthy Food 🍳

A modern, responsive recipe website featuring high-protein meals for fitness enthusiasts.

## About

This is a beautiful React-based recipe website showcasing delicious protein-rich dishes with complete nutrition information. The site features smooth animations, dynamic color themes, and a mobile-friendly design.

## Features

- 🎨 Beautiful gradient backgrounds and glassmorphism effects
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🌈 Color-coded recipe categories with dynamic themes
- 📊 Detailed nutrition information for every recipe
- ⚡ Fast performance with modern React and Vite
- 🍽️ 89 high-protein recipes across 6 categories
- 📋 Easy-to-follow instructions with cooking times
- 📱 Mobile-friendly navigation with smooth animations

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Environment Configuration

Copy `.env.example` to `.env` and provide your AdSense values when you are ready to enable auto ads:

- `VITE_ADSENSE_CLIENT_ID` - your AdSense client identifier (for example `ca-pub-xxxxxxxxxxxxxxxx`)
- `VITE_ADSENSE_TEST_MODE` - optional; leave as `on` for safe local testing or remove for production

If the variables are missing or the script fails to load, auto ads remain disabled and a descriptive error appears in the browser console to help with setup.

## Privacy Policy

This site includes a dedicated privacy policy page at `/privacy` covering data collection, cookies, and AdSense disclosures.

## AdSense Policy Notes

- Keep `public/ads.txt` updated with your AdSense publisher ID.
- Auto ads are disabled on localhost unless `VITE_ADSENSE_TEST_MODE` is set.

## Deployment

This site is ready to deploy to Vercel:
1. Visit [vercel.com](https://vercel.com)
2. Import this repository
3. Click Deploy

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router
- Lucide Icons

---


How to add content
- **New recipe:** append the recipe object to the relevant aggregated file (e.g. `public/data/recipes/desserts.json`, `smoothie-bowls.json`, etc.). No JS updates needed—the loader and counts pick it up automatically.
- **New category:** add one entry to `public/data/recipes/recipe-categories.json` defining its `data` paths and icon, drop the recipes JSON it references, and add a matching theme key to `public/data/themes/color-themes.json` for colors. The UI, counts, and ingredient list will all wire themselves up.

Next step: run `npm run dev` and click through each category—including the shopping list—to confirm everything renders with the refreshed counts and data.

---

Built with ❤️ for healthy eating
 