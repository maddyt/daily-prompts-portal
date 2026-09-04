'use client';

import { DailyPrompt } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { MarkdownRenderer } from './MarkdownRenderer';

interface PromptCardProps {
  prompt: DailyPrompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  return (
    <div className="prompt-card">
      <div className="prompt-card-header">
        <div className="prompt-date">{formatDate(prompt.date)}</div>
        <h3 className="prompt-text">{prompt.prompt}</h3>
      </div>

      <div className="prompt-meta">
        <span className="prompt-meta-pill">Newsletter briefing</span>
        <span className="prompt-meta-pill prompt-meta-pill-muted">
          Generated on {new Date(prompt.created_at).toLocaleString()}
        </span>
      </div>

      <div className="prompt-response-shell">
        <MarkdownRenderer content={prompt.response} />
      </div>
    </div>
  );
}
