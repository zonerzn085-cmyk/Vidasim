import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { XMarkIcon, PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface ChatbotPanelProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onClose: () => void;
}

const TypingIndicator: React.FC = () => (
    <div className="flex justify-start">
        <div className="max-w-xl p-4 rounded-2xl bg-gray-700 text-gray-200 rounded-bl-none">
            <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            </div>
        </div>
    </div>
);


function ChatbotPanel({ messages, onSendMessage, isLoading, onClose }: ChatbotPanelProps): React.ReactElement {
  const [input, setInput] = useState('');
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
        logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
          <h2 className="text-2xl font-bold text-teal-300 flex items-center gap-3">
            <SparklesIcon className="w-7 h-7" />
            Assistente IA
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div ref={logContainerRef} className="flex-grow p-4 space-y-4 overflow-y-auto">
            {messages.map((msg, index) => (
                 <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xl p-3 rounded-2xl shadow-md text-sm ${msg.role === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                </div>
            ))}
            {isLoading && <TypingIndicator />}
        </div>

        <form onSubmit={handleSend} className="p-4 border-t border-gray-700 flex-shrink-0 flex items-center gap-3">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte algo ao assistente..."
                disabled={isLoading}
                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            />
            <button type="submit" disabled={isLoading || !input.trim()} className="p-3 bg-teal-600 hover:bg-teal-500 text-white rounded-full transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
                <PaperAirplaneIcon className="w-5 h-5" />
            </button>
        </form>
      </div>
    </div>
  );
}

export default React.memo(ChatbotPanel);
