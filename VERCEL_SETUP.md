# Vercel Deployment Guide

## Step-by-Step Setup (Required)

### 1. Connect Repository to Vercel

Go to [vercel.com/dashboard](https://vercel.com/dashboard):
1. Click **"Add New"** > **"Project"**
2. Click **"Import"** next to `daily-prompts-portal` from GitHub
3. Click **"Import"**

### 2. **IMPORTANT: Configure Root Directory**

⚠️ **This step is crucial!** The repository has a monorepo structure with `frontend/` as a subdirectory.

In the import dialog, before clicking "Deploy":
1. Look for **"Root Directory"** option
2. Change it from `.` to `frontend`
3. Click **"Save"** and then **"Deploy"**

**If you already imported**, no problem:
1. Go to **Settings > General**
2. Scroll down to **"Root Directory"**
3. Change from `.` to `frontend`
4. Save

### 3. Set Environment Variables

1. Go to **Settings > Environment Variables**
2. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL = your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key_here
```

**Note**: The `NEXT_PUBLIC_` prefix makes these variables accessible in the browser. Only use public/anon keys here, never private keys.

### 4. Trigger Build

Once Root Directory is set to `frontend`:
1. Go to **Deployments** tab
2. Click the three dots on any deployment
3. Click **"Redeploy"**

The build should now succeed! ✅

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
