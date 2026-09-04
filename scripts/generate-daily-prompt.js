const { createClient } = require('@supabase/supabase-js');
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

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
  const promptsPath = path.join(__dirname, '..', 'config', 'daily-prompts.json');
  const promptConfig = JSON.parse(fs.readFileSync(promptsPath, 'utf8'));

  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toISOString();
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is required');
  }

  const client = new Anthropic({ apiKey: anthropicKey });

  const systemPrompt = `You are a polished daily prompt portal assistant.
Create a complete, well-structured response for the supplied user prompt.
Format it so it renders nicely in a web portal:
- begin with a concise title or lead sentence
- use short paragraphs and optional bullet points
- be substantive, specific, and helpful
- if the prompt asks for current events, summarize clearly, note uncertainty, and avoid pretending to know live facts without grounding
- keep the tone intelligent, engaging, and editorial
Return only the final formatted response with no preamble or markdown fence.`;

  const results = [];

  for (const entry of promptConfig) {
    if (!entry?.prompt) {
      throw new Error('Invalid prompt config entry: missing prompt');
    }

    const userPrompt = `User prompt:\n${entry.prompt}\n\nWrite the best possible portal-ready response.`;
    console.log(`Generating response for prompt: ${entry.id || 'unnamed-prompt'}`);

    let generatedMessage;
    try {
      generatedMessage = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2048,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      });
    } catch (error) {
      console.error('Error calling Anthropic API:', error.message);
      throw error;
    }

    const generatedResponse = generatedMessage.content?.[0]?.text?.trim();
    if (!generatedResponse) {
      throw new Error('No text content in Claude response');
    }

    const { data: newPrompt, error: insertError } = await supabase
      .from('daily_prompts')
      .insert([
        {
          date: today,
          prompt: entry.prompt,
          response: generatedResponse,
        },
      ])
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    results.push(newPrompt);
    console.log(`✅ Saved ${entry.id || entry.prompt.slice(0, 40)} at ${new Date(newPrompt.created_at).toLocaleTimeString()}`);
  }

  console.log(`✅ Generated ${results.length} prompt response(s) for ${today} at ${now}`);
  return results;
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
