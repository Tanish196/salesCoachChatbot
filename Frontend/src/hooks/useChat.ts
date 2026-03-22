import { useState, useCallback } from 'react';
import { Chat, Message } from '../types/chat';
import { useLocalStorage } from './useLocalStorage';

const STORAGE_KEY = 'aria_chats';
const MAX_SAVED_CHATS = 10;

type StoredMessage = Omit<Message, 'timestamp'> & { timestamp: string | Date };
type StoredChat = Omit<Chat, 'messages' | 'createdAt' | 'updatedAt'> & {
  messages: StoredMessage[];
  createdAt: string | Date;
  updatedAt: string | Date;
};

function normalizeChats(rawChats: StoredChat[]): Chat[] {
  return rawChats.map((chat) => ({
    ...chat,
    createdAt: new Date(chat.createdAt),
    updatedAt: new Date(chat.updatedAt),
    messages: chat.messages.map((message) => ({
      ...message,
      timestamp: new Date(message.timestamp),
    })),
  }));
}

function limitSavedChats(chats: Chat[]): Chat[] {
  if (chats.length <= MAX_SAVED_CHATS) {
    return chats;
  }

  const oldestIdsToRemove = new Set(
    [...chats]
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      .slice(0, chats.length - MAX_SAVED_CHATS)
      .map((chat) => chat.id),
  );

  return chats.filter((chat) => !oldestIdsToRemove.has(chat.id));
}

function persistableChats(chats: Chat[]): StoredChat[] {
  return chats as StoredChat[];
}

export function useChat() {
  const [storedChats, setStoredChats] = useLocalStorage<StoredChat[]>(STORAGE_KEY, []);
  const [chats, setChats] = useState<Chat[]>(() => normalizeChats(storedChats));
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
        title: content.slice(0, 40) + (content.length > 40 ? '...' : ''),
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

        const dedupedAndLimited = limitSavedChats(updatedChats);
        setStoredChats(persistableChats(dedupedAndLimited));

        return dedupedAndLimited;
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
    setError(null);
    setLastUserMessage(null);
  }, []);

  const deleteChat = useCallback((chatId: string) => {
    setChats((prevChats) => {
      const filteredChats = prevChats.filter((chat) => chat.id !== chatId);
      setStoredChats(persistableChats(filteredChats));
      return filteredChats;
    });

    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  }, [currentChatId, setStoredChats]);

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
    deleteChat,
  };
}