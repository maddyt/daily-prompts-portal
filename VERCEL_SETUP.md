# Vercel Deployment Guide

## Quick Start

### 1. Connect Repository to Vercel

```bash
# Option A: Using Vercel CLI
npm i -g vercel
vercel

# Option B: Using Vercel Dashboard
# Go to https://vercel.com/dashboard
# Click "Add New..." > "Project"
# Import your GitHub repository
```

### 2. Set Environment Variables

In Vercel Dashboard:
1. Select your project
2. Go to **Settings > Environment Variables**
3. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Note**: The `NEXT_PUBLIC_` prefix makes these variables accessible in the browser. Only use public/anon keys here, never private keys.

### 3. Configure Build Settings

Vercel should auto-detect Next.js. If not:
- **Framework**: Next.js
- **Build Command**: `cd frontend && npm run build`
- **Output Directory**: `frontend/.next`
- **Root Directory**: `.` (or leave empty)

### 4. Deploy

```bash
# Using CLI
vercel --prod

# Or use GitHub integration (automatic on push)
```

## Accessing Your Portal

After deployment, your portal will be available at:
```
https://your-project-name.vercel.app
```

## Monitoring

In Vercel Dashboard:
- **Deployments**: See all deployments and their status
- **Analytics**: Monitor page performance and usage
- **Logs**: Check for errors in production

## Troubleshooting

### Environment variables not loading?
- Verify they're added to the correct environment (Production, Preview, Development)
- Redeploy after adding new variables
- Check that variable names match exactly (case-sensitive)

### Build failing?
```bash
# Debug locally
cd frontend
npm install
npm run build
npm run start
```

### Page shows "No prompts yet"?
- Verify Supabase connection credentials
- Check browser console for network errors
- Ensure Supabase `daily_prompts` table has data

### Refresh not showing new prompts?
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Check if Supabase query is working (test in browser console)
- Verify no CORS issues between Vercel and Supabase

## Auto-Deployment

Every push to your GitHub main branch automatically triggers a new Vercel deployment. You can:
- Preview branches at `https://branch-name.your-project-name.vercel.app`
- Configure deployment rules in **Settings > Git**

## Performance Optimization

To improve performance:

1. **Enable caching** in Next.js (already configured in `next.config.js`)
2. **Optimize images** using Next.js Image component
3. **Monitor Core Web Vitals** in Vercel Analytics dashboard

## Custom Domain

To add your own domain:
1. Go to **Settings > Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update Supabase CORS settings if needed

## SSL Certificate

Vercel automatically provides free SSL certificates for all deployments.
