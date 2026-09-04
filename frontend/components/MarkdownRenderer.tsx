'use client';

interface MarkdownRendererProps {
  content: string;
}

function renderInline(text: string) {
  const parts: React.ReactNode[] = [];
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <a
        key={`link-${key++}`}
        href={match[2]}
        target="_blank"
        rel="noreferrer"
        className="md-link"
      >
        {match[1]}
      </a>
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split('\n');

  return (
    <div className="newsletter-body">
      {lines.map((line, index) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={index} className="newsletter-spacer" />;
        }

        if (trimmed.startsWith('# ')) {
          return <h2 key={index} className="newsletter-title">{renderInline(trimmed.slice(2))}</h2>;
        }

        if (trimmed.startsWith('## ')) {
          return <h3 key={index} className="newsletter-section">{renderInline(trimmed.slice(3))}</h3>;
        }

        if (trimmed.startsWith('### ')) {
          return <h4 key={index} className="newsletter-subsection">{renderInline(trimmed.slice(4))}</h4>;
        }

        if (trimmed.startsWith('- ')) {
          return (
            <div key={index} className="newsletter-bullet">
              <span className="newsletter-bullet-dot">•</span>
              <span>{renderInline(trimmed.slice(2))}</span>
            </div>
          );
        }

        return <p key={index} className="newsletter-paragraph">{renderInline(trimmed)}</p>;
      })}
    </div>
  );
}
