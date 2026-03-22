import { useEffect, useRef } from 'react';
import { Message } from '../types/chat';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

interface ChatMessagesProps {
  messages: Message[];
  isLoading?: boolean;
  onRetryLastMessage?: () => void;
}

export default function ChatMessages({
  messages,
  isLoading = false,
  onRetryLastMessage,
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 pb-28">
      <div className="max-w-3xl mx-auto space-y-5">
        {messages.map((message) => (
          message.isError ? (
            <div key={message.id} className="flex gap-3 justify-start">
              <div className="flex-shrink-0">
                <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">A</span>
                </div>
              </div>

              <div className="max-w-[75%]">
                <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-red-50 border border-red-200 text-red-700">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <button
                    type="button"
                    onClick={onRetryLastMessage}
                    className="mt-2 text-sm underline text-red-600"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <ChatMessage
              key={message.id}
              role={message.sender}
              content={message.content}
              timestamp={message.timestamp}
            />
          )
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}