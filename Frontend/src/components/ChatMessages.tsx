import { Message } from '../types/chat';

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.sender === 'assistant' && (
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">AI</span>
                </div>
              </div>
            )}
            
            <div className={`max-w-2xl ${message.sender === 'user' ? 'order-2' : ''}`}>
              <div className={`p-4 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white ml-auto'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
              <div className={`text-xs text-gray-500 mt-2 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {message.sender === 'user' && (
              <div className="flex-shrink-0 order-3">
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">L</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}