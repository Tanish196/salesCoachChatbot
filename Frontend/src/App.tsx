import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import WelcomeScreen from './components/WelcomeScreen';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import { useChat } from './hooks/useChat';

const DESKTOP_BREAKPOINT = 1024;

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [draftMessage, setDraftMessage] = useState('');
  const [showOfflineToast, setShowOfflineToast] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const offlineToastTimerRef = useRef<number | null>(null);
  const { 
    chats, 
    currentChat, 
    currentChatId, 
    isLoading, 
    lastUserMessage,
    sendMessage, 
    retryLastMessage,
    selectChat, 
    startNewChat,
    deleteChat,
  } = useChat();

  useEffect(() => {
    const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
    if (isDesktop) {
      setIsSidebarOpen(true);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const showOfflineMessage = () => {
    setShowOfflineToast(true);
    if (offlineToastTimerRef.current) {
      window.clearTimeout(offlineToastTimerRef.current);
    }
    offlineToastTimerRef.current = window.setTimeout(() => {
      setShowOfflineToast(false);
    }, 3000);
  };

  const handleMessageSend = (message: string) => {
    if (!message.trim()) return;

    if (!navigator.onLine) {
      showOfflineMessage();
      return;
    }

    setDraftMessage('');
    void sendMessage(message);
    
    const isMobile = window.innerWidth < DESKTOP_BREAKPOINT;
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const handlePromptSelect = (prompt: string) => {
    setDraftMessage(prompt);
    handleMessageSend(prompt);
  };

  const handleRetryLastMessage = () => {
    if (!lastUserMessage) return;

    if (!navigator.onLine) {
      showOfflineMessage();
      return;
    }

    retryLastMessage();
  };

  const mainContentMargin = isSidebarOpen ? 'lg:ml-[336px]' : 'lg:ml-[72px]';
  const showWelcome = !currentChat || currentChat.messages.length === 0;

  return (
    <div className="flex h-screen relative">
      {showOfflineToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm">
            You're offline. Check your connection and try again.
          </div>
        </div>
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        chats={chats}
        currentChatId={currentChatId}
        onChatSelect={selectChat}
        onDeleteChat={deleteChat}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${mainContentMargin}`}>
        <ChatHeader 
          onToggleSidebar={toggleSidebar} 
          onNewChat={startNewChat}
          onOpenAbout={() => setShowAboutModal(true)}
        />
        
        {showWelcome ? (
          <WelcomeScreen onPromptSelect={handlePromptSelect} />
        ) : (
          <ChatMessages
            messages={currentChat.messages}
            isLoading={isLoading}
            onRetryLastMessage={handleRetryLastMessage}
          />
        )}
        
        <ChatInput 
          onSendMessage={handleMessageSend}
          value={draftMessage}
          onChange={setDraftMessage}
          disabled={isLoading}
          placeholder={isLoading ? "Aria is thinking..." : "Ask me a question..."}
        />
      </div>

      {showAboutModal && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setShowAboutModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-3">About Aria</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Aria is an AI Sales Coach powered by Gemini. She specializes in cold outreach, email
              sequences, and B2B sales strategy. Built for Thinkly Labs.
            </p>
            <button
              type="button"
              onClick={() => setShowAboutModal(false)}
              className="mt-6 w-full rounded-lg bg-indigo-600 text-white py-2.5 hover:bg-indigo-700 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;