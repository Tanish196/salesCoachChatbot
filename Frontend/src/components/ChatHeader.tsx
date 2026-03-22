import { Menu, Share, Info, Plus } from 'lucide-react';

interface ChatHeaderProps {
  onToggleSidebar: () => void;
  onNewChat: () => void;
  onOpenAbout: () => void;
}

export default function ChatHeader({ onToggleSidebar, onNewChat, onOpenAbout }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
            <Share className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={onOpenAbout}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <Info className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={onNewChat}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">New Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
}