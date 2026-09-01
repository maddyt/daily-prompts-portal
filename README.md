# Daily Prompts Portal

A portal that displays AI-generated daily prompts. Prompts are generated via GitHub Copilot automation at midnight each day and stored in Supabase, then displayed on a beautiful portal hosted on Vercel.

## Architecture

- **GitHub Repository**: Source code and Copilot automation configuration
- **Copilot Automation**: Runs daily at midnight to execute prompts via Copilot's LLM
- **Supabase**: PostgreSQL database storing prompt results
- **Vercel**: Hosts the Next.js frontend portal
- **Next.js Frontend**: React-based portal displaying daily prompts

## Setup

### 1. Prerequisites
- GitHub account with Copilot access
- Supabase project and account
- Vercel account
- Node.js 18+

### 2. Supabase Setup
1. Create a new Supabase project
2. Run the SQL migrations from `supabase/migrations.sql`
3. Create an API key for database access
4. Note your Supabase URL and anon key

### 3. GitHub Setup
1. Fork/clone this repository to your GitHub account: `maddyt/daily-prompts-portal`
2. Add repository secrets:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_KEY`: Your Supabase anon key
   - `COPILOT_API_KEY`: Your GitHub Copilot token (optional, uses env)

### 4. Copilot Automation Setup
1. Open this repository in GitHub Copilot
2. Create a scheduled automation that runs at midnight (00:00 UTC)
3. Set the prompt to: `Run the daily prompt generation script. Execute the script at scripts/generate-daily-prompt.js`
4. The automation will:
   - Generate a new prompt using Copilot's LLM
   - Store the result in Supabase
   - Timestamp it for the current day

### 5. Frontend Deployment
1. Push code to your GitHub repository
2. Connect repository to Vercel
3. Add environment variables to Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
4. Deploy

## File Structure

```
daily-prompts-portal/
├── frontend/               # Next.js portal
│   ├── app/               # Next.js app directory
│   ├── components/        # React components
│   ├── lib/               # Utilities
│   ├── public/            # Static assets
│   └── package.json
├── scripts/               # Automation scripts
│   └── generate-daily-prompt.js
├── supabase/              # Database migrations
│   └── migrations.sql
├── .env.example           # Environment variables template
└── README.md
```

## Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Usage

### Running the Portal Locally
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` to see the portal.

### Testing the Prompt Generation Script
```bash
node scripts/generate-daily-prompt.js
```

## Daily Prompt Generation

The Copilot automation runs at midnight UTC daily and:
1. Generates a unique prompt using Copilot's LLM
2. Executes the prompt (if it's a task) or stores the response (if it's a question)
3. Saves the prompt, response, and timestamp to Supabase
4. The portal automatically fetches and displays it

## Database Schema

### `daily_prompts` Table
- `id`: UUID (Primary Key)
- `date`: Date (unique, indexed)
- `prompt`: Text (the prompt that was generated)
- `response`: Text (the response/output)
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Customization

### Changing Prompt Topics
Edit `scripts/generate-daily-prompt.js` to customize the prompts:
- Modify the `systemPrompt` to change the AI's personality/domain
- Adjust the `userPrompt` to generate different types of content

### Styling the Portal
The frontend uses Tailwind CSS. Modify `frontend/app/globals.css` and component files in `frontend/components/`.

### Changing Automation Time
Edit your Copilot automation settings to run at a different time.

## Troubleshooting

- **Automation not running**: Check Copilot automation logs and ensure the session is enabled
- **Portal not showing data**: Verify Supabase credentials and network connectivity
- **Build errors**: Run `npm install` in both `frontend/` and root directories

## License

MIT
