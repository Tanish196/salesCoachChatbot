import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types/chat';

interface ChatMessageProps {
  role: Message['sender'];
  content: string;
  timestamp?: Date;
}

function formatTimestamp(timestamp?: Date) {
  if (!timestamp) return '';
  return timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export default function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === 'user';
  const timeLabel = formatTimestamp(timestamp);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Ignore clipboard errors silently.
    }
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">A</span>
          </div>
        </div>
      )}

      <div className={`max-w-[75%] ${isUser ? 'order-2' : ''}`}>
        <div
          className={`relative group px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? 'bg-indigo-600 text-white rounded-tr-none ml-auto'
              : 'bg-white text-gray-900 border border-gray-200 rounded-tl-none'
          }`}
        >
          {!isUser && (
            <button
              type="button"
              onClick={handleCopy}
              title="Copy response"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}
          {isUser ? (
            content
          ) : (
            <ReactMarkdown className="prose prose-sm max-w-none text-gray-800">{content}</ReactMarkdown>
          )}
        </div>
        {timeLabel && (
          <div className={`text-xs text-gray-400 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {timeLabel}
          </div>
        )}
      </div>
    </div>
  );
}
