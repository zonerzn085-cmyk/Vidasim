import React, { useState, useEffect, useRef } from 'react';
import { Relationship, NotableNPC, NpcChatMessage } from '../types';
import { XMarkIcon, PaperAirplaneIcon, UserCircleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface NpcChatDialogProps {
  npc: Relationship | NotableNPC;
  messages: NpcChatMessage[];
  onSendMessage: (text: string) => void;
  onClose: () => void;
  isLoading: boolean;
}

function NpcChatDialog({ npc, messages, onSendMessage, onClose, isLoading }: NpcChatDialogProps): React.ReactElement {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const isRelationship = (p: any): p is Relationship => 'relationshipScore' in p;
  const score = isRelationship(npc) ? npc.relationshipScore : null;

  // Find top skills for header context
  const topSkills = npc.competencies 
    ? Object.entries(npc.competencies)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([key]) => key) 
    : [];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md h-[80vh] flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0 bg-gray-900/50 rounded-t-2xl">
          <div className="flex items-center gap-3">
             <div className="relative">
                {npc.portraitBase64 ? (
                     <img src={`data:image/png;base64,${npc.portraitBase64}`} alt={npc.name} className="w-10 h-10 rounded-full object-cover border-2 border-teal-500" />
                ) : (
                    <UserCircleIcon className="w-10 h-10 text-teal-400" />
                )}
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-gray-800"></div>
             </div>
             <div>
                 <h2 className="text-lg font-bold text-white leading-tight">{npc.name}</h2>
                 <p className="text-xs text-gray-400">
                    {isRelationship(npc) ? npc.type : npc.description}
                    {score !== null && <span className={`ml-2 font-bold ${score > 60 ? 'text-green-400' : score < 30 ? 'text-red-400' : 'text-yellow-400'}`}>({score}%)</span>}
                 </p>
                 {topSkills.length > 0 && (
                     <p className="text-[10px] text-teal-500/80 truncate max-w-[150px]">
                        Conhece: {topSkills.join(', ')}
                     </p>
                 )}
             </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        {/* Chat Body */}
        <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-900/20">
            {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-10 opacity-70">
                    <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto mb-2 text-gray-600"/>
                    <p className="text-sm">Inicie uma conversa com {npc.name}.</p>
                    <p className="text-xs mt-1">Lembre-se: {npc.name} só sabe o que sua profissão permite.</p>
                </div>
            )}

            {messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                return (
                    <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                            isUser 
                                ? 'bg-teal-600 text-white rounded-br-none' 
                                : 'bg-gray-700 text-gray-200 rounded-bl-none'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                );
            })}
            
            {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-gray-700 p-3 rounded-2xl rounded-bl-none flex space-x-1 items-center h-10 w-16 justify-center">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-gray-700 bg-gray-800 rounded-b-2xl">
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Mensagem para ${npc.name}...`}
                    disabled={isLoading}
                    className="flex-grow bg-gray-900/50 border border-gray-600 rounded-full py-2.5 px-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                />
                <button 
                    type="submit" 
                    disabled={isLoading || !inputText.trim()} 
                    className="p-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-full transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed shadow-lg"
                >
                    <PaperAirplaneIcon className="w-5 h-5" />
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(NpcChatDialog);