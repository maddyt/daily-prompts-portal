const { createClient } = require('@supabase/supabase-js');

/**
 * Generate a daily prompt using Copilot automation and store in Supabase
 * This script is designed to be run by GitHub Copilot scheduled automation at midnight
 */

async function generateDailyPrompt() {
  // Initialize Supabase client
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('SUPABASE_URL and SUPABASE_KEY environment variables are required');
  }

  // Provide a WebSocket transport for Realtime when running Node < 22
  let createOptions = {};
  try {
    const nodeMajor = parseInt(process.versions.node.split('.')[0], 10);
    if (!isNaN(nodeMajor) && nodeMajor < 22) {
      // ws provides WebSocket support for Node.js environments < 22
      const ws = require('ws');
      createOptions = { realtime: { transport: ws } };
    }
  } catch (e) {
    // ignore and proceed without custom transport
  }

  const supabase = createClient(supabaseUrl, supabaseKey, createOptions);

  // Define today's date
  const today = new Date().toISOString().split('T')[0];

  // Check if prompt already exists for today
  const { data: existingPrompt, error: checkError } = await supabase
    .from('daily_prompts')
    .select('id')
    .eq('date', today)
    .single();

  if (checkError && checkError.code !== 'PGRST116') {
    // PGRST116 = no rows found, which is expected
    throw checkError;
  }

  if (existingPrompt) {
    console.log(`Prompt already exists for ${today}. Skipping.`);
    return existingPrompt;
  }

  // Generate prompt using Copilot (This would be handled by Copilot automation context)
  // For now, we'll create a template that Copilot will fill
  const systemPrompt = `You are a creative daily prompt generator. Generate an interesting, unique, and thought-provoking prompt for the day. 
The prompt should be something a user can think about, explore, or use for creative writing, coding, or personal reflection.
Keep it concise but engaging (1-2 sentences).
Make sure it's different and unique each day.`;

  const userPrompt = `Generate today's unique daily prompt for ${new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}. Respond with just the prompt, no explanation.`;

  // NOTE: In the actual Copilot automation, the LLM response will be passed as an environment variable
  // or captured from the Copilot session output
  const generatedPrompt = process.env.COPILOT_PROMPT || userPrompt;
  const generatedResponse = process.env.COPILOT_RESPONSE || 'Waiting for Copilot to generate the response...';

  // Insert into Supabase
  const { data: newPrompt, error: insertError } = await supabase
    .from('daily_prompts')
    .insert([
      {
        date: today,
        prompt: generatedPrompt,
        response: generatedResponse,
      },
    ])
    .select()
    .single();

  if (insertError) {
    throw insertError;
  }

  console.log(`✅ Daily prompt saved for ${today}`);
  console.log(`Prompt: ${newPrompt.prompt}`);
  console.log(`Response: ${newPrompt.response}`);

  return newPrompt;
}

// Run the function
generateDailyPrompt()
  .then((result) => {
    console.log('Daily prompt generation successful!', result);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error generating daily prompt:', error.message);
    process.exit(1);
  });

module.exports = { generateDailyPrompt };
