import { useState, useCallback } from 'react';
import { Chat, Message } from '../types/chat';

const ASSISTANT_RESPONSES = [
  "I'd be happy to help you with that! Let me break this down for you.",
  "Great question! Here's what I think about this topic...",
  "That's an interesting point. Let me provide some insights on this.",
  "I understand what you're looking for. Here's my response:",
  "Excellent! I can definitely assist you with this request.",
  "Thanks for asking! Here's a comprehensive answer to your question:",
];

export function useChat() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);

  const currentChat = chats.find(chat => chat.id === currentChatId);

  const createNewChat = useCallback(() => {
    const newChatId = `chat-${Date.now()}`;
    setCurrentChatId(newChatId);
    return newChatId;
  }, []);

  const sendMessage = useCallback((content: string) => {
    const chatId = currentChatId || createNewChat();
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setChats(prevChats => {
      const existingChatIndex = prevChats.findIndex(chat => chat.id === chatId);
      
      if (existingChatIndex >= 0) {
        const updatedChats = [...prevChats];
        updatedChats[existingChatIndex] = {
          ...updatedChats[existingChatIndex],
          messages: [...updatedChats[existingChatIndex].messages, userMessage],
          updatedAt: new Date(),
        };
        return updatedChats;
      } else {
        const newChat: Chat = {
          id: chatId,
          title: content.slice(0, 50) + (content.length > 50 ? '...' : ''),
          messages: [userMessage],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        return [newChat, ...prevChats];
      }
    });

    // Simulate assistant response
    setIsAssistantTyping(true);
    
    setTimeout(() => {
      const randomResponse = ASSISTANT_RESPONSES[Math.floor(Math.random() * ASSISTANT_RESPONSES.length)];
      const assistantMessage: Message = {
        id: `msg-${Date.now()}-assistant`,
        content: randomResponse,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setChats(prevChats => {
        const chatIndex = prevChats.findIndex(chat => chat.id === chatId);
        if (chatIndex >= 0) {
          const updatedChats = [...prevChats];
          updatedChats[chatIndex] = {
            ...updatedChats[chatIndex],
            messages: [...updatedChats[chatIndex].messages, assistantMessage],
            updatedAt: new Date(),
          };
          return updatedChats;
        }
        return prevChats;
      });

      setIsAssistantTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds

    setCurrentChatId(chatId);
  }, [currentChatId, createNewChat]);

  const selectChat = useCallback((chatId: string) => {
    setCurrentChatId(chatId);
  }, []);

  const startNewChat = useCallback(() => {
    setCurrentChatId(null);
  }, []);

  return {
    chats,
    currentChat,
    currentChatId,
    isAssistantTyping,
    sendMessage,
    selectChat,
    startNewChat,
  };
}