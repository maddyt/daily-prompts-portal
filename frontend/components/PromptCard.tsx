'use client';

import { DailyPrompt } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface PromptCardProps {
  prompt: DailyPrompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  return (
    <div className="prompt-card">
      <div className="prompt-date">{formatDate(prompt.date)}</div>
      <h3 className="prompt-text">{prompt.prompt}</h3>
      <p className="prompt-response">{prompt.response}</p>
      <div className="text-xs text-gray-500 mt-6">
        Generated on {new Date(prompt.created_at).toLocaleString()}
      </div>
    </div>
  );
}
