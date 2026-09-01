-- Create daily_prompts table
CREATE TABLE IF NOT EXISTS daily_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE DEFAULT CURRENT_DATE,
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on date for faster queries
CREATE INDEX IF NOT EXISTS idx_daily_prompts_date ON daily_prompts(date DESC);

-- Enable Row Level Security
ALTER TABLE daily_prompts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to read
CREATE POLICY "Allow public read access" ON daily_prompts
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert (for automation)
CREATE POLICY "Allow authenticated insert" ON daily_prompts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update their records
CREATE POLICY "Allow authenticated update" ON daily_prompts
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_daily_prompts_updated_at ON daily_prompts;

CREATE TRIGGER update_daily_prompts_updated_at BEFORE UPDATE ON daily_prompts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
