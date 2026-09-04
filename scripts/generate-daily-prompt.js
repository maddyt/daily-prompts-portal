const { createClient } = require('@supabase/supabase-js');
const Anthropic = require('@anthropic-ai/sdk');

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
  const now = new Date().toISOString();

  // Note: We allow multiple prompts per day, each with its own timestamp
  // Remove the check for existing prompts - just generate and insert

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

  // Generate prompt using Anthropic Claude API
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is required');
  }

  const client = new Anthropic({ apiKey: anthropicKey });

  let generatedResponse;
  let generatedMessage;
  try {
    generatedMessage = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        { role: 'user', content: userPrompt },
      ],
    });

    generatedResponse = generatedMessage.content?.[0]?.text || 'Failed to generate response';
    if (!generatedResponse) {
      throw new Error('No text content in Claude response');
    }
  } catch (error) {
    console.error('Error calling Anthropic API:', error.message);
    throw error;
  }

  const generatedPrompt = generatedResponse.trim();
  const generatedResponsePayload = JSON.stringify({
    type: 'anthropic-response',
    model: 'claude-haiku-4-5-20251001',
    generated_at: now,
    raw_text: generatedResponse,
  });
  console.log(`✅ Daily prompt generated for ${today} at ${now}`);
  console.log(`Prompt: ${generatedPrompt}`);

  // Insert into Supabase (allows multiple rows per day, tracked by created_at timestamp)
  const { data: newPrompt, error: insertError } = await supabase
    .from('daily_prompts')
    .insert([
      {
        date: today,
        prompt: generatedPrompt,
        response: generatedResponsePayload,
      },
    ])
    .select()
    .single();

  if (insertError) {
    throw insertError;
  }

  console.log(`✅ Daily prompt saved for ${today} at ${new Date(newPrompt.created_at).toLocaleTimeString()}`);
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
