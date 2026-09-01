# Copilot Automation Setup Guide

## Setting Up Daily Midnight Automation with Copilot

Follow these steps to configure the daily prompt generation that runs at midnight:

### Step 1: Prepare Your Supabase

1. Go to [Supabase Console](https://supabase.com)
2. Create a new project or select an existing one
3. Go to **SQL Editor** and run the migration from `supabase/migrations.sql`
4. Navigate to **Settings > API** and copy:
   - `Project URL` → Save as `SUPABASE_URL`
   - `anon public` key → Save as `SUPABASE_KEY`

### Step 2: Create a Copilot Automation Session

1. In GitHub Copilot, create a new session for this repository
2. Go to **Automation > Create New Automation**
3. Configure as follows:
   - **Type**: Scheduled
   - **Schedule**: Daily at 00:00 UTC (midnight)
   - **Timezone**: UTC
   - **Enabled**: Yes

### Step 3: Set Up Environment Variables

In your Copilot session automation, set environment variables:

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

Or add them to GitHub Secrets and reference them in your automation configuration.

### Step 4: Configure the Automation Task

Set the automation to run this prompt at midnight:

```
Run the daily prompt generation and store the result.

1. Generate a unique and interesting prompt for today
2. Execute the script: node scripts/generate-daily-prompt.js
3. The prompt should be thought-provoking, suitable for creative exploration

Make the prompt varied - it could be about:
- Creative writing
- Personal reflection
- Technical challenges
- Philosophy or ethics
- Innovation and ideas
- Daily wellness or habits

Generate something fresh and unique!
```

### Step 5: Test the Setup

Before the automation runs, test it manually:

```bash
cd daily-prompts-portal
SUPABASE_URL="your_url" SUPABASE_KEY="your_key" node scripts/generate-daily-prompt.js
```

You should see output like:
```
✅ Daily prompt saved for 2026-09-01
Prompt: [Your generated prompt]
Response: [Copilot's response]
```

### Step 6: Verify in the Portal

1. Deploy the frontend to Vercel (see VERCEL_SETUP.md)
2. Add your Supabase credentials to Vercel environment variables
3. Visit your Vercel URL to see the prompts appearing

## Troubleshooting

**Automation not running?**
- Check Copilot automation logs
- Verify environment variables are set correctly
- Ensure your Supabase project is active

**Script fails with database error?**
- Verify Supabase credentials
- Check that the `daily_prompts` table was created
- Ensure RLS policies allow inserts

**Portal shows no data?**
- Confirm Supabase credentials in Vercel
- Check browser console for errors
- Manually insert a test record to verify connectivity

## Manual Prompt Insertion (For Testing)

If you want to manually test a prompt, use:

```sql
INSERT INTO daily_prompts (date, prompt, response)
VALUES (CURRENT_DATE, 'Your test prompt', 'Test response');
```

## Advanced Configuration

### Custom Prompt Topics

Edit `scripts/generate-daily-prompt.js` to customize:

```javascript
const systemPrompt = `Your custom instructions for Copilot...`;
```

### Custom Generation Time

Modify the schedule in your Copilot automation settings.

### Multiple Prompts Per Day

Duplicate the automation with different names and schedules.
