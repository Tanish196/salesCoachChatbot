import { useState, useCallback } from 'react';
import { Chat, Message } from '../types/chat';

export function useChat() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);

  const currentChat = chats.find(chat => chat.id === currentChatId);

const sendMessage = useCallback(async (content: string) => {
  let chatId = currentChatId;
  if (!chatId) {
    chatId = `chat-${Date.now()}`;
    setCurrentChatId(chatId);
  }

  const userMessage: Message = {
    id: `msg-${Date.now()}`,
    content,
    sender: 'user',
    timestamp: new Date(),
  };

  setError(null);
  setLastUserMessage(content);

  // Capture history BEFORE updating state (stale closure safe)
  const historyBeforeSend = (currentChat?.messages || [])
    .filter((m) => !m.isError)
    .map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.content,
    }));

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
        id: chatId!,
        title: content.slice(0, 50) + (content.length > 50 ? '...' : ''),
        messages: [userMessage],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return [newChat, ...prevChats];
    }
  });

  setIsLoading(true);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: content,             
        history: historyBeforeSend,   
      }),
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => null);
      throw new Error(errorPayload?.error || 'Chat request failed');
    }

    const data = await response.json();
    const reply = data?.reply?.trim();

    if (!reply) throw new Error('Empty response from API');

    const assistantMessage: Message = {
      id: `msg-${Date.now()}-assistant`,
      content: reply,
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

  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error';
    setError(message);

    const errorMessage: Message = {
      id: `msg-${Date.now()}-error`,
      content: "Something went wrong. Aria couldn't respond.",
      sender: 'assistant',
      timestamp: new Date(),
      isError: true,
    };

    setChats(prevChats => {
      const chatIndex = prevChats.findIndex(chat => chat.id === chatId);
      if (chatIndex >= 0) {
        const updatedChats = [...prevChats];
        updatedChats[chatIndex] = {
          ...updatedChats[chatIndex],
          messages: [...updatedChats[chatIndex].messages, errorMessage],
          updatedAt: new Date(),
        };
        return updatedChats;
      }
      return prevChats;
    });
  } finally {
    setIsLoading(false);
  }
}, [currentChat, currentChatId]);

  const retryLastMessage = useCallback(() => {
    if (!lastUserMessage || isLoading) return;
    void sendMessage(lastUserMessage);
  }, [isLoading, lastUserMessage, sendMessage]);
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
    isLoading,
    error,
    lastUserMessage,
    sendMessage,
    retryLastMessage,
    selectChat,
    startNewChat,
  };
}