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
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? 'bg-indigo-600 text-white rounded-tr-none ml-auto'
              : 'bg-white text-gray-900 border border-gray-200 rounded-tl-none'
          }`}
        >
          {content}
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
