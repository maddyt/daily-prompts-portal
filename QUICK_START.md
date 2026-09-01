# Quick Start Guide

Get your Daily Prompts Portal up and running in 30 minutes!

## ⚡ 5-Minute GitHub Setup

✅ **Already done!** Your repository is at:
```
https://github.com/maddyt/daily-prompts-portal
```

## 🗄️ 10-Minute Supabase Setup

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"** and create a project
3. Go to **SQL Editor** in the dashboard
4. Copy the entire contents of `supabase/migrations.sql` from your repo
5. Paste it into the SQL Editor and click **"Run"**
6. Wait for success notification
7. Go to **Settings > API** (bottom left)
8. Copy these values and save them:
   - `Project URL` → `SUPABASE_URL`
   - `anon public` → `SUPABASE_KEY`

**Testing**: Go to **Table Editor** and verify `daily_prompts` table exists

## 🚀 10-Minute Vercel Deployment

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New"** > **"Project"**
3. Click **"Import"** next to your `daily-prompts-portal` repository
4. **IMPORTANT**: Before clicking "Deploy", set **Root Directory** to `frontend`
5. Click **"Deploy"**
6. Under **"Environment Variables"**, add:
   ```
   NEXT_PUBLIC_SUPABASE_URL = [paste your SUPABASE_URL here]
   NEXT_PUBLIC_SUPABASE_ANON_KEY = [paste your SUPABASE_KEY here]
   ```
7. Click **"Save"** and **"Redeploy"**
8. Wait for deployment to complete (2-3 minutes)
9. Click **"Visit"** to see your live portal!

**Your portal is now live at**: `https://your-project.vercel.app`

## ⏰ 5-Minute Copilot Automation Setup

1. Open this repository in **GitHub Copilot**
2. Go to **Automation** (top menu)
3. Click **"Create New Automation"**
4. Set:
   - **Type**: Scheduled
   - **Name**: Daily Prompt Generation
   - **Schedule**: Daily at 00:00 UTC
   - **Enabled**: Toggle ON
5. Click **"Next"**
6. Paste this prompt:
   ```
   Generate today's unique daily prompt and save it to Supabase.
   
   1. Create a fresh, thought-provoking prompt for today
   2. Run: node scripts/generate-daily-prompt.js
   3. Make it creative and unique - not similar to previous prompts
   
   The prompt should inspire creative thinking, reflection, or exploration.
   ```
7. Click **"Environment Variables"** and add:
   ```
   SUPABASE_URL = [your SUPABASE_URL]
   SUPABASE_KEY = [your SUPABASE_KEY]
   ```
8. Click **"Save"** and **"Test"** to run it manually first

**Verify it worked**: Check your portal and refresh - you should see a new prompt!

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] `daily_prompts` table exists in Supabase
- [ ] Vercel deployment is live
- [ ] Portal loads without errors
- [ ] Copilot automation created and tested
- [ ] Manual test ran successfully

## 🎉 You're Done!

Your daily prompts portal is now live and ready to:
- Generate unique prompts every day at midnight UTC
- Display them beautifully in your portal
- Store all data securely in Supabase

### Next Steps (Optional)
- [ ] Add custom domain to Vercel
- [ ] Set up monitoring/alerting
- [ ] Share portal with friends
- [ ] Customize prompt topics in Copilot automation
- [ ] Add more features (see `docs/ARCHITECTURE.md`)

### Need Help?
- Check `COPILOT_AUTOMATION.md` for automation details
- Check `VERCEL_SETUP.md` for deployment details
- See `README.md` for full documentation
- Open an issue on GitHub

---

**Happy prompting!** 🚀
