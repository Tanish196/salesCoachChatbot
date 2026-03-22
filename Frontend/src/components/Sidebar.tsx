import { useState } from 'react';
import { History, ChevronRight, X } from 'lucide-react';
import { ChevronLeftIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { Chat } from '../types/chat';
import VectorLogo from '../assets/2.1 New Chat/Vector.svg';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  chats: Chat[];
  currentChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
}

function getRelativeTime(date: Date) {
  const now = Date.now();
  const diffMs = now - date.getTime();
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < hour) {
    const minutes = Math.max(1, Math.floor(diffMs / minute));
    return `${minutes}m ago`;
  }

  if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);
    return `${hours}h ago`;
  }

  if (diffMs < day * 2) {
    return 'Yesterday';
  }

  const days = Math.floor(diffMs / day);
  return `${days}d ago`;
}

export default function Sidebar({
  isOpen,
  onToggle,
  chats,
  currentChatId,
  onChatSelect,
  onDeleteChat,
}: SidebarProps) {
  const recentChats = chats.slice(0, 10);
  const [activeNavItem, setActiveNavItem] = useState('Home');

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Expanded Sidebar */}
      <div
        className={`
        fixed left-0 top-0 bg-white border-r border-gray-200 z-50
        transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:-translate-x-full"}
        w-[336px] h-screen
      `}
      >
        {/* sidebar */}
        <div
          className="relative flex flex-col w-[336px] h-full justify-between pt-8 pr-5 pb-[10px] pl-5"
          style={{ background: "rgba(248, 249, 252, 1)" }}
        >
          {/* top-controls */}
          <div className="flex flex-col w-[296px] max-h-[716px] gap-[10px]">
            {/* sidebar-top */}
            <div className="flex gap-[10px] w-[296px] h-[60px]">
              {/* Logo */}

              <div className="w-auto h-[40px] flex items-center gap-2">
                <div className="w-[36px] h-[36px] bg-blue-600 rounded-full flex items-center justify-center">
                  <img
                    src={VectorLogo}
                    alt="Thinkly Labs Logo"
                    className="w-[18.85px] h-[20.9px]"
                  />
                </div>
                <span className="font-bold text-xl text-[rgba(39, 39, 39, 1)]">
                  Thinkly Labs
                </span>
              </div>

              {/* IconBubble */}
              <button
                className={`${isOpen ? 'absolute top-8 right-[-10px] w-8 h-8 flex items-center justify-center rounded cursor-pointer hover:bg-blue-100 transition-all duration-200':''}`}
                style={{ background: "rgba(233, 239, 255, 1)" }}
                onClick={onToggle}
                type="button"
              >
                <ChevronLeftIcon className="w-4 h-4 text-blue-600" />
              </button>


            </div>
            {/* search */}


            {/* itemlist */}
            <div className="flex flex-col gap-1 pb-5 w-full">

              {/* Sidebar / Item */}
              <div
                className={`flex w-full justify-between p-3 rounded-[16px] cursor-pointer transition-all duration-200 ${activeNavItem === 'Home' ? 'bg-white border-[rgba(243, 243, 243, 1)]' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                style={activeNavItem === 'Home' ? {
                  boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.12)'
                } : {}}
                onClick={() => setActiveNavItem('Home')}
              >
                {/* Frame 2 */}
                <div className="flex items-center min-w-16 min-h-6 gap-4">
                  {/* heroicons-solid/chat-bubble-oval-left-ellipsis */}
                  <ChatBubbleOvalLeftEllipsisIcon className={`w-6 h-6 ${activeNavItem === 'Home' ? 'text-blue-600' : ''}`} />
                  {/* Home */}
                  <span className=""
                    style={{
                      fontFamily: 'Bricolage Grotesque',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '16px',
                      lineHeight: '100%',
                      letterSpacing: '-0.8%'
                    }}
                  >
                    Home
                  </span>
                </div>
                {/* Frame 1 */}
                <div>
                  {/* ⌘ H */}
                  <span className="text-xs rounded-[1px] p-[1px] gap-2.5 bg-gray-100 flex w-[33px] h-[20px]">                    <div>⌘</div> <div>H</div></span>
                </div>
              </div>


              {/* Sidebar / Item */}
              <div
                className={`flex w-full justify-between p-3 rounded-[16px] cursor-pointer transition-all duration-200 ${activeNavItem === 'History' ? 'bg-white border-[rgba(243, 243, 243, 1)]' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                style={activeNavItem === 'History' ? {
                  boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.12)'
                } : {}}
                onClick={() => setActiveNavItem('History')}
              >
                {/* Frame 2 */}
                <div className="flex items-center min-w-16 min-h-6 gap-4">
                  <History className={`w-6 h-6 ${activeNavItem === 'History' ? 'text-blue-600' : ''}`} />
                  <span className=""
                    style={{
                      fontFamily: 'Bricolage Grotesque',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '16px',
                      lineHeight: '100%',
                      letterSpacing: '-0.8%'
                    }}
                  >
                    History
                  </span>
                </div>
                {/* Frame 1 */}
                <div>
                  <span className="text-xs rounded-[1px] p-[1px] gap-2.5 bg-gray-100 flex w-[33px] h-[20px]">
                    <div>⌘</div> <div>G</div></span>
                </div>
              </div>
            </div>

            {/* Frame 84 */}
            <div className="flex-1 overflow-y-auto w-[296px] items-center gap-0.5 right-0.5 left-0.5">
              <div className='w-[280px] max-h-[17px] px-1 gap-2.5'>
                <div className='text-black w-[272px] h-[17px]' style={{
                  fontFamily: 'Bricolage Grotesque',
                  fontWeight: 600,
                  fontStyle: 'normal',
                  fontSize: '14px',
                  lineHeight: '100%',
                  letterSpacing: '-0.8%'
                }}>
                  Recent
                </div>
              </div>
              <div className="w-[280px] gap-1  flex flex-col">
                {recentChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`group w-full flex items-center justify-between rounded-lg px-3 py-2 transition-all duration-200 cursor-pointer ${currentChatId === chat.id
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                      }`}
                    onClick={() => onChatSelect(chat.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="truncate text-sm" style={{
                        fontFamily: 'Bricolage Grotesque',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '14px',
                        lineHeight: '120%',
                        letterSpacing: '-0.2%'
                      }}>
                        {chat.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{getRelativeTime(chat.updatedAt)}</div>
                    </div>

                    <button
                      className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-1 rounded hover:bg-gray-200 text-gray-400"
                      type="button"
                      aria-label="Delete chat"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat.id);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Collapsed Sidebar */}
      <div
        className={`
        fixed left-0 top-0 bg-white border-r border-gray-200 z-40
        transform transition-transform duration-300 ease-in-out 
        ${!isOpen ? "lg:translate-x-0" : "lg:-translate-x-full"}
        w-[72px] h-screen hidden lg:block
      `}
        style={{ background: "rgba(248, 249, 252, 1)" }}
      >
        <div className="flex flex-col h-full items-center pt-8 pb-4">
          {/* Logo */}
          <div className="w-[36px] h-[36px] bg-blue-600 rounded-full flex items-center justify-center mb-6">
            <img
              src={VectorLogo}
              alt="Thinkly Labs Logo"
              className="w-[18.85px] h-[20.9px]"
            />
          </div>

          {/* Open Sidebar Button */}
          <button
            className="absolute top-7 right-[-15px] w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer hover:bg-blue-100 transition-all duration-200 mb-6"
            style={{ background: "rgba(233, 239, 255, 1)" }}
            onClick={onToggle}
            type="button"
          >
            <ChevronRight className="w-4 h-4 text-blue-600" />
          </button>

          {/* Navigation Icons */}
          <div className="flex flex-col gap-2 flex-1">
            <button
              className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200 ${
                activeNavItem === 'Home' ? 'bg-white shadow-sm' : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveNavItem('Home')}
              title="Home"
            >
              <ChatBubbleOvalLeftEllipsisIcon className={`w-6 h-6 ${activeNavItem === 'Home' ? 'text-blue-600' : 'text-gray-600'}`} />
            </button>

            <button
              className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200 ${
                activeNavItem === 'History' ? 'bg-white shadow-sm' : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveNavItem('History')}
              title="History"
            >
              <History className={`w-6 h-6 ${activeNavItem === 'History' ? 'text-blue-600' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
