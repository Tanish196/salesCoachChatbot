export default function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <div className="flex-shrink-0">
        <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-semibold">A</span>
        </div>
      </div>

      <div className="max-w-[75%]">
        <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-white text-gray-900 border border-gray-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <span
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: '0.15s' }}
            />
            <span
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: '0.3s' }}
            />
          </div>
          <div className="text-xs text-gray-400 mt-2">Aria is thinking...</div>
        </div>
      </div>
    </div>
  );
}
