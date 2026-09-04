'use client';

import { useState, useEffect } from 'react';
import { DailyPrompt } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { PromptCard } from './PromptCard';

export function PromptsList() {
  const [prompts, setPrompts] = useState<DailyPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPrompts();
  }, []);

  async function fetchPrompts() {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('daily_prompts')
        .select('*')
        .order('date', { ascending: false })
        .limit(30);

      if (fetchError) throw fetchError;

      setPrompts(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch prompts';
      setError(message);
      console.error('Error fetching prompts:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error loading prompts: {error}</p>
        <button
          onClick={fetchPrompts}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (prompts.length === 0) {
    return (
      <div className="text-center text-white">
        <h3 className="text-2xl font-bold mb-2">No prompts yet</h3>
        <p className="text-lg">Check back later for daily prompts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {prompts[0] && (
        <div className="prompt-featured">
          <PromptCard prompt={prompts[0]} />
        </div>
      )}

      {prompts.length > 1 && (
        <div className="prompt-archive">
          {prompts.slice(1).map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      )}
    </div>
  );
}
