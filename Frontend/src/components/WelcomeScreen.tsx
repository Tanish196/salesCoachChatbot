import { Sparkles } from 'lucide-react';
import { SuggestedPrompt } from '../types/chat';

interface WelcomeScreenProps {
  onPromptSelect: (prompt: string) => void;
}

const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    id: '1',
    text: 'Write a cold email for a SaaS product targeting startup founders',
  },
  {
    id: '2', 
    text: 'How do I improve my email reply rate from 3% to 10%?',
  },
  {
    id: '3',
    text: 'What\'s the best follow-up sequence after no response?',
  }
];

const titleStyle = {
  fontFamily: 'Bricolage Grotesque',
  fontWeight: 800,
  fontSize: '28px',
  lineHeight: '100%',
  letterSpacing: '-0.8%'
};

const subtitleStyle = {
  fontFamily: 'Bricolage Grotesque',
  fontWeight: 500,
  fontSize: '40px',
  lineHeight: '100%',
  letterSpacing: '-0.8%'
};

const promptTextStyle = {
  fontFamily: 'Bricolage Grotesque',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '100%',
  letterSpacing: '-0.8%'
};

const gradientBackground = {
  background: 'conic-gradient(from 154.61deg at 80.43% -12.04%, #D9E4FF -93.6deg, #F8F9FC 42.55deg, #FFDDF8 157.8deg, #D9E4FF 266.4deg, #F8F9FC 402.55deg)'
};

function WelcomeScreen({ onPromptSelect }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white">
      <div className="max-w-2xl">
        <div className="mb-8 w-[456px]">
          <h1 className="text-2xl font-bold text-gray-900 mb-2" style={titleStyle}>
            <span className="wave">👋</span> Hey there!
          </h1>
          <h2 className="text-5xl text-gray-700" style={subtitleStyle}>
            I'm Aria, your AI Sales Coach.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt.id}
              onClick={() => onPromptSelect(prompt.text)}
              className="group p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md hover:-translate-y-[2px] transition-all duration-200 text-left" 
              style={gradientBackground}
            >
              <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-200">
                <Sparkles className="text-blue-600 bg-white rounded-full w-10 h-10 p-2" />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed" style={promptTextStyle}>
                {prompt.text}
              </p>
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center">✦ Trained on sales best practices · Powered by AI</p>
      </div>
    </div>
  );
}

export default WelcomeScreen;