import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatHeader from './components/ChatHeader';
import WelcomeScreen from './components/WelcomeScreen';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import { useChat } from './hooks/useChat';

const DESKTOP_BREAKPOINT = 1024;

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { 
    chats, 
    currentChat, 
    currentChatId, 
    isAssistantTyping, 
    sendMessage, 
    selectChat, 
    startNewChat 
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

  const handleMessageSend = (message: string) => {
    sendMessage(message);
    
    const isMobile = window.innerWidth < DESKTOP_BREAKPOINT;
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const mainContentMargin = isSidebarOpen ? 'lg:ml-[336px]' : 'lg:ml-[72px]';
  const showWelcome = !currentChat || currentChat.messages.length === 0;

  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        chats={chats}
        currentChatId={currentChatId}
        onChatSelect={selectChat}
        onNewChat={startNewChat}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${mainContentMargin}`}>
        <ChatHeader 
          onToggleSidebar={toggleSidebar} 
          onNewChat={startNewChat} 
        />
        
        {showWelcome ? (
          <WelcomeScreen onPromptSelect={handleMessageSend} />
        ) : (
          <ChatMessages messages={currentChat.messages} />
        )}
        
        <ChatInput 
          onSendMessage={handleMessageSend}
          disabled={isAssistantTyping}
          placeholder={isAssistantTyping ? "Assistant is typing..." : "Ask me a question..."}
        />
      </div>
    </div>
  );
}

export default App;