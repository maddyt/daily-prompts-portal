# Deployment Checklist

Use this checklist to ensure all components are properly set up before going live.

## Prerequisites
- [ ] GitHub account with Copilot access
- [ ] Supabase account and project created
- [ ] Vercel account created
- [ ] Node.js 18+ installed locally

## GitHub Repository Setup
- [ ] Repository created at `github.com/maddyt/daily-prompts-portal`
- [ ] Code pushed to `main` branch
- [ ] Branch protection rules configured (optional)
- [ ] GitHub Actions workflows enabled
- [ ] Repository description and topics added

## Supabase Configuration
- [ ] Project created and active
- [ ] Run `supabase/migrations.sql` in SQL Editor
- [ ] `daily_prompts` table created with proper schema
- [ ] RLS policies configured and tested
- [ ] Copy `Project URL` from Settings > API
- [ ] Copy `anon public` key from Settings > API
- [ ] Test table access with anon key

## Environment Variables Setup
- [ ] Create `.env.local` in `frontend/` folder
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Test locally: `cd frontend && npm run dev`
- [ ] Verify data loads on `http://localhost:3000`

## Vercel Deployment
- [ ] Connect GitHub repository to Vercel
- [ ] Set build command: `cd frontend && npm run build`
- [ ] Set install command: `cd frontend && npm install`
- [ ] Add environment variables:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Deploy to production
- [ ] Test portal loads correctly
- [ ] Verify no console errors

## Copilot Automation Setup
- [ ] Open repository in GitHub Copilot
- [ ] Create new scheduled automation
- [ ] Set schedule: Daily at 00:00 UTC
- [ ] Add environment variables:
  - [ ] `SUPABASE_URL`
  - [ ] `SUPABASE_KEY`
- [ ] Test automation manually first
- [ ] Monitor first scheduled run
- [ ] Verify data appears in Supabase
- [ ] Verify data appears on portal

## Security Checklist
- [ ] Never commit `.env.local` (check `.gitignore`)
- [ ] Never use service role keys in frontend
- [ ] Only use anon keys in public code
- [ ] Review RLS policies for `daily_prompts` table
- [ ] Configure CORS in Supabase if needed
- [ ] Enable 2FA on Supabase account
- [ ] Enable 2FA on Vercel account
- [ ] Review GitHub Actions secrets

## Monitoring & Maintenance
- [ ] Set up error monitoring (Sentry optional)
- [ ] Check Vercel analytics dashboard
- [ ] Monitor Supabase database usage
- [ ] Set up uptime monitoring (optional)
- [ ] Create backup strategy for database

## Post-Launch
- [ ] Share portal URL with users
- [ ] Update social media links
- [ ] Document API endpoints
- [ ] Create troubleshooting guide
- [ ] Monitor first week of automation runs

## Scaling Considerations (Future)
- [ ] Database query optimization
- [ ] Implement caching strategy
- [ ] Add CDN for static assets
- [ ] Performance monitoring
- [ ] Load testing
