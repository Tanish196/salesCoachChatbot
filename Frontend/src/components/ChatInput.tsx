import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

function ChatInput({
  onSendMessage,
  value,
  onChange,
  disabled = false,
  placeholder = "Ask me a question...",
}: ChatInputProps) {
  const submitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!value.trim() || disabled) return;
    
    onSendMessage(value.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitMessage(e);
    }
  };

  const addFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = '';
  };

  return (
    <div className='w-full flex justify-center bg-white'>

      <div className="bg-white border-t border-gray-200 rounded-tr-[16px] rounded-tl-[16px] border-2">
        <div className="">
          <form onSubmit={submitMessage} className="relative">
            {/* Chatbox Container */}
            <div className="w-[692px] py-3 px-2 gap-2">
              
              {/* TextArea Section */}
              <div className="">
                <textarea
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={placeholder}
                  disabled={disabled}
                  rows={1}
                  className="w-[676px] h-[92px] bg-transparent p-2 rounded-md border-2 border-gray-200 outline-none resize-none text-gray-900 placeholder-gray-500 text-sm leading-6"
                  style={{
                    minHeight: '24px',
                    maxHeight: '120px',
                    overflowY: value.length > 100 ? 'auto' : 'hidden'
                  }}
                />
              </div>

              {/* Controls Section */}
              <div className="gap-1.5">
                <div className="flex items-center justify-between">
                  {/* Controls-Left */}
                  <div className="flex items-center gap-2 relative">
                    <div className="relative">
                      {/* Hidden file input for first-time selection */}
                      <input
                        id="file-input"
                        type="file"
                        multiple
                        onChange={addFiles}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif"
                      />
                    </div>
                  </div>

                  {/* Controls-Right */}
                  <div className="flex items-center gap-2">
                    {/* Character Count */}
                    {value.length > 0 && (
                      <span className="text-xs text-gray-500">{value.length}/1000</span>
                    )}
                    
                    {/* Send Button */}
                    <button
                      type="submit"
                      disabled={!value.trim() || disabled}
                      className={`flex-shrink-0 p-2 rounded-full transition-all ${
                        value.trim() && !disabled
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                          : 'bg-blue-200 text-gray-400 cursor-not-allowed'
                      }`}
                      title="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;