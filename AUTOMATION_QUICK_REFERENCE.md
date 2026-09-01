# Copilot Automation - Quick Reference Card

## Configuration Summary

```
┌─────────────────────────────────────────────────────────┐
│ GITHUB COPILOT AUTOMATION SETTINGS                      │
├─────────────────────────────────────────────────────────┤
│ Name:                Daily Prompt Generation            │
│ Type:                Scheduled                          │
│ Schedule:            Daily                              │
│ Time:                00:00 (midnight)                   │
│ Timezone:            UTC                                │
│ Status:              ✅ ENABLED                         │
└─────────────────────────────────────────────────────────┘
```

## Environment Variables to Add

```
SUPABASE_URL = https://your-project.supabase.co
SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Important**: 
- Get these from Supabase > Settings > API
- SUPABASE_KEY should be the PUBLIC "anon" key, NOT the service role key

## Automation Prompt (Copy & Paste)

```
Generate today's daily prompt and save it to Supabase.

Your task:
1. Think of a creative, unique, and thought-provoking prompt for today
2. The prompt should inspire thinking, creativity, or reflection
3. Make sure it's different from any previous prompts
4. Then run the script to save it

Script to execute:
node scripts/generate-daily-prompt.js

Prompt topics can include:
- Creative writing challenges
- Personal reflection questions
- Technical challenges or learning opportunities
- Philosophical questions
- Daily wellness or habit-building ideas
- Innovation or problem-solving challenges

Generate something fresh, unique, and interesting!
```

## Testing Checklist

- [ ] Automation is created and ENABLED
- [ ] Environment variables are set correctly
- [ ] Click "Test" or "Run Now" to test immediately
- [ ] Check Copilot logs for success message
- [ ] Go to Supabase > Table Editor > daily_prompts
- [ ] Verify new row appears with today's date
- [ ] Go to your portal URL
- [ ] Refresh page - new prompt should appear!

## Daily Check Points

After automation is live, each morning:

**Check 1: Supabase Table**
- New row added to `daily_prompts` table?
- Today's date showing in `date` column?
- Prompt and response filled in?

**Check 2: Portal**
- New prompt showing at top of list?
- Displaying correctly on the page?
- No errors in browser console (F12)?

**Check 3: Copilot Logs**
- Last run succeeded?
- No error messages?
- "Next run" shows tomorrow at 00:00 UTC?

## Common Issues

| Issue | Fix |
|-------|-----|
| "No Output Directory" error | Set Vercel Root Directory to `frontend` |
| Database connection fails | Verify SUPABASE_URL and SUPABASE_KEY |
| Portal shows "No prompts" | Clear browser cache, refresh page |
| Automation doesn't run | Check if ENABLED toggle is ON |
| Wrong timezone | Change to UTC in automation settings |

## File References

From your repository, these files are important:

```
daily-prompts-portal/
├── scripts/
│   └── generate-daily-prompt.js    ← Script automation runs
├── supabase/
│   └── migrations.sql              ← Database schema
├── frontend/
│   └── app/page.tsx                ← Portal displays data
└── COPILOT_AUTOMATION_DETAILED.md  ← Full setup guide
```

## Success Indicators

✅ Everything is working when:
- Automation runs daily at midnight UTC
- Supabase table gets new row each day
- Portal displays new prompt immediately
- No errors in any logs

## Quick Commands (if needed)

Test script locally:
```bash
cd daily-prompts-portal
SUPABASE_URL="your_url" SUPABASE_KEY="your_key" node scripts/generate-daily-prompt.js
```

View database:
```
Supabase Dashboard → Table Editor → daily_prompts
```

View portal:
```
https://your-project.vercel.app
```

View automation logs:
```
GitHub Copilot → Automation → Daily Prompt Generation → View Logs
```

---

**Need detailed help? See COPILOT_AUTOMATION_DETAILED.md**
