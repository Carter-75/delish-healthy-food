# 🚀 Deploying to Vercel

This guide will help you deploy your Delish Protein Dishes website to Vercel.

## Prerequisites

- GitHub account (you already have the repo!)
- Vercel account (free tier is perfect)

## Quick Deploy (Recommended - 2 Minutes!)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Click "Sign Up" or "Login"
   - Choose "Continue with GitHub"

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Find and select: `Carter-75/delish-healthy-food`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - Click "Deploy"

4. **Wait for Build** (30-60 seconds)
   - Vercel will install dependencies
   - Build your React app
   - Deploy automatically

5. **Done! 🎉**
   - You'll get a URL like: `https://delish-healthy-food.vercel.app`
   - Your site is LIVE!

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
cd /home/user/webapp
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? delish-healthy-food
# - Directory? ./ (current directory)
# - Override settings? No

# For production deployment:
vercel --prod
```

## Configuration

The project includes a `vercel.json` file with optimal settings:

- ✅ Automatic SPA routing (handles React Router)
- ✅ Asset caching (1 year for static files)
- ✅ Proper build commands
- ✅ Framework detection

## Custom Domain (Optional)

1. Go to your project dashboard on Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Environment Variables (If Needed Later)

If you need to add API keys or secrets:

1. Go to Project Settings → Environment Variables
2. Add variables like:
   - `VITE_API_KEY=your_key_here`
   - `VITE_CUSTOM_CONFIG=value`
3. Redeploy to apply changes

## Automatic Deployments

Every time you push to GitHub:
- **main branch** → Automatic production deployment
- **Other branches** → Preview deployments

## Build Logs & Monitoring

- View build logs in the Vercel dashboard
- Monitor performance and analytics
- Get automatic HTTPS certificates
- CDN distribution worldwide

## Troubleshooting

### Build Fails
- Check that `package.json` has all dependencies
- Ensure Node version compatibility (18+)
- View detailed logs in Vercel dashboard

### Routes Not Working
- Vercel.json already configured for SPA routing
- All routes redirect to index.html automatically

### Assets Not Loading
- Ensure paths start with `/` (e.g., `/data/recipes/...`)
- Check public assets are in correct locations

## Performance Tips

Your site is already optimized with:
- Code splitting
- Asset compression
- Modern build system (Vite)
- Efficient React components

Vercel adds:
- Global CDN
- Automatic HTTPS
- Image optimization (if you add images)
- Edge caching

## Support

- Vercel Docs: https://vercel.com/docs
- Discord: https://vercel.com/discord
- GitHub Issues: Create issue in your repo

---

**Your site will be live in under 2 minutes! 🚀**

URL Format: `https://[project-name].vercel.app`
Example: `https://delish-healthy-food.vercel.app`
