import { useEffect, useRef } from 'react';
import { Message } from '../types/chat';
import ChatMessage from './ChatMessage';

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 pb-28">
      <div className="max-w-3xl mx-auto space-y-5">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.sender}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}