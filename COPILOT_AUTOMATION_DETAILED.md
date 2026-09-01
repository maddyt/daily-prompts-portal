# Copilot Automation Setup - Step by Step

## 🎯 What We're Setting Up

A **scheduled GitHub Copilot automation** that runs **every day at midnight UTC** to:
1. Generate a unique daily prompt using Copilot's LLM
2. Store it in your Supabase database
3. Make it appear on your portal automatically

## ✅ Prerequisites (You have these!)

- ✅ Supabase project with `daily_prompts` table created
- ✅ SUPABASE_URL (your project URL)
- ✅ SUPABASE_KEY (your anon public key)
- ✅ GitHub Copilot access
- ✅ Daily Prompts Portal repository

---

## 📝 PART 1: Open Your Repository in GitHub Copilot

### Step 1.1: Open the Repository

1. Go to your repository: **https://github.com/maddyt/daily-prompts-portal**
2. In the **GitHub Copilot app** on your desktop:
   - Click the **"Repository"** button in the top left
   - Select **"maddyt/daily-prompts-portal"**
   - Or click **"Open"** to browse for your repository

### Step 1.2: Wait for Repository to Load

- The app will clone and index your repository
- This might take 30-60 seconds
- You'll see the file explorer on the left showing your project structure

---

## ⚙️ PART 2: Create the Automation

### Step 2.1: Access Automation Settings

1. In GitHub Copilot app, look for the **menu** (≡) in the top right
2. Click **"Automation"** or **"Settings"**
3. Look for **"Scheduled Automations"** or **"Create Automation"**

### Step 2.2: Create New Automation

Click **"Create New Automation"** or **"+ Add Automation"**

You should see a form with these fields:
- **Name**: Name for your automation
- **Type**: Select **"Scheduled"**
- **Schedule**: Daily or Custom
- **Time**: Set the time
- **Timezone**: Select timezone
- **Enabled**: Toggle on

### Step 2.3: Fill in the Configuration

| Field | Value |
|-------|-------|
| **Name** | `Daily Prompt Generation` |
| **Type** | `Scheduled` |
| **Schedule** | `Daily` |
| **Time** | `00:00` (midnight) |
| **Timezone** | `UTC` |
| **Enabled** | Toggle **ON** ✅ |

---

## 🔐 PART 3: Set Environment Variables

### Step 3.1: Environment Variables Section

Look for an **"Environment Variables"** or **"Secrets"** section in the automation settings.

### Step 3.2: Add Your Supabase Credentials

Add TWO environment variables:

**Variable 1:**
```
Name:  SUPABASE_URL
Value: [Paste your Supabase Project URL here]
```

**Variable 2:**
```
Name:  SUPABASE_KEY
Value: [Paste your Supabase anon public key here]
```

**Example:**
```
SUPABASE_URL = https://xxxxxx.supabase.co
SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 💬 PART 4: Set the Automation Prompt

### Step 4.1: Find the Prompt/Instructions Field

Look for a text area labeled:
- **"Prompt"**
- **"Instructions"**
- **"What should this automation do?"**

### Step 4.2: Copy and Paste This Prompt

Paste this exact prompt into that field:

```
Generate today's daily prompt and save it to Supabase.

Your task:
1. Think of a creative, unique, and thought-provoking prompt for today
2. The prompt should inspire thinking, creativity, or reflection
3. Make sure it's different from any previous prompts
4. Then run the script to save it

Script to execute:
node scripts/generate-daily-prompt.js

Context:
- Today's date: [Current date will be filled by the automation]
- The script will receive the generated prompt and save it to Supabase automatically
- Each prompt should be unique and engaging

Prompt topics can include:
- Creative writing challenges
- Personal reflection questions
- Technical challenges or learning opportunities
- Philosophical questions
- Daily wellness or habit-building ideas
- Innovation or problem-solving challenges

Generate something fresh, unique, and interesting!
```

### Step 4.3: Verify the Setup

Before saving, make sure you see:
- ✅ Automation name filled
- ✅ Type set to "Scheduled"
- ✅ Schedule set to "Daily"
- ✅ Time set to "00:00" (midnight UTC)
- ✅ Timezone set to "UTC"
- ✅ Environment variables added (SUPABASE_URL, SUPABASE_KEY)
- ✅ Prompt/instructions pasted
- ✅ Automation is ENABLED

---

## 🧪 PART 5: Test the Automation

### Step 5.1: Find the Test Button

Look for:
- **"Test"** button
- **"Run Now"** button
- **"Test Automation"** option
- Right-click context menu with "Run" option

### Step 5.2: Run the Test

Click the test button. The automation will:
1. Run immediately (not wait until midnight)
2. Execute your prompt
3. Run the script to save to Supabase
4. Show you logs of what happened

### Step 5.3: Check the Logs

Look for output like:
```
✅ Daily prompt saved for 2026-09-01
Prompt: [Your generated prompt]
Response: [Copilot's response]
```

### Step 5.4: Verify in Supabase

1. Go to your Supabase dashboard
2. Go to **Table Editor**
3. Open the **daily_prompts** table
4. You should see a new row with today's date!

### Step 5.5: Verify in Your Portal

1. Go to your Vercel portal URL
2. Refresh the page (Ctrl+R or Cmd+R)
3. You should see your new prompt displayed!

---

## ✨ Success Indicators

When everything is working, you should see:

**In Copilot Automation:**
- ✅ Automation shows "Next run: [Tomorrow at 00:00 UTC]"
- ✅ Status shows "Enabled"
- ✅ Last run shows success logs

**In Supabase:**
- ✅ New rows appear in `daily_prompts` table daily
- ✅ Each row has today's date
- ✅ Columns: id, date, prompt, response, created_at, updated_at

**In Your Portal:**
- ✅ New prompts appear at the top of the list
- ✅ No error messages in browser console
- ✅ Cards display with prompt text and response

---

## 🐛 Troubleshooting

### "Script fails with database error"

**Check:**
- [ ] SUPABASE_URL is correct (no typos)
- [ ] SUPABASE_KEY is the correct anon key (not service role key)
- [ ] The `daily_prompts` table exists in Supabase
- [ ] RLS policies are configured (check SQL Editor)

**Fix:**
Go to Supabase > SQL Editor > Run `supabase/migrations.sql` again

---

### "Automation not running at midnight"

**Check:**
- [ ] Automation is ENABLED (toggle is ON)
- [ ] Time is set to 00:00
- [ ] Timezone is UTC
- [ ] Schedule is "Daily"

**Fix:**
1. Disable the automation
2. Wait 10 seconds
3. Re-enable it
4. Save

---

### "Portal shows 'No prompts yet'"

**Check:**
- [ ] Portal Vercel environment variables are correct
- [ ] Supabase table has data (check Supabase Table Editor)
- [ ] No errors in browser console (F12)

**Fix:**
1. Go to Vercel > Project > Environment Variables
2. Verify NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
3. Redeploy the project

---

### "Automation runs but no data appears"

**Check:**
- [ ] Run the test manually and check logs
- [ ] Look for error messages in Copilot automation logs
- [ ] Verify the script path: `scripts/generate-daily-prompt.js`

**Debug:**
1. Click the automation > View Logs
2. Look for error messages
3. Take a screenshot of the error
4. Check if permissions are set correctly in Supabase

---

## 📅 What Happens Next

Once your automation is working:

1. **Every day at 00:00 UTC**, the automation runs
2. **Copilot generates** a new unique prompt
3. **Script saves it** to your Supabase database
4. **Your portal automatically displays** the new prompt
5. **Users see** a fresh prompt every morning!

---

## 🎯 Next Steps

1. ✅ Complete this setup
2. ✅ Test the automation (run manually first)
3. ✅ Verify data appears in Supabase and portal
4. ✅ Leave it enabled to run at midnight daily
5. ✅ Customize prompt topics if desired (edit the prompt field)

---

## 📞 Need Help?

If something isn't working:
1. Check the logs in Copilot Automation
2. Check the error messages in Supabase Table Editor
3. Verify all credentials are correct (copy-paste again)
4. Run a manual test to see real-time output
5. Check browser console (F12) for frontend errors

---

**You're all set! Your daily prompts portal will be generating unique content every day! 🚀**
