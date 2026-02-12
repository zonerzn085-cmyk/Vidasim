
import React, { useState } from 'react';
import { XMarkIcon, ChatBubbleLeftRightIcon, ChatBubbleOvalLeftEllipsisIcon, SparklesIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Relationship, NotableNPC, PlayerStats } from '../types';
import { fetchContextualDialogueOptions } from '../services/geminiService';
import { Content } from '@google/genai';

interface InteractionDialogProps {
  npc: Relationship | NotableNPC;
  playerStats?: PlayerStats; // Added optional stats
  history?: Content[]; // Added optional history
  onConfirm: (action: string) => void;
  onClose: () => void;
  onOpenChat: () => void;
}

const TOPICS = ["Assuntos Pessoais", "Trabalho/Escola", "Fofoca", "Pedir um Favor"];
const TONES = ["Amigável", "Engraçado", "Formal", "Agressivo"];

interface ChoiceButtonProps {
    label: string;
    isSelected?: boolean;
    onClick: () => void;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ label, isSelected, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`p-3 rounded-lg text-center font-bold transition-all duration-200 border-2 text-sm w-full transform active:scale-95 ${
                isSelected
                    ? 'bg-teal-500/20 border-teal-400 text-teal-300 ring-2 ring-teal-400 shadow-lg shadow-teal-500/20'
                    : 'bg-gray-700/50 border-gray-600 text-gray-200 hover:border-teal-500 hover:bg-gray-700'
            }`}
        >
            {label}
        </button>
    );
}

function InteractionDialog({ npc, playerStats, history, onConfirm, onClose, onOpenChat }: InteractionDialogProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState<string | null>(null);
  
  // Advanced State
  const [contextOptions, setContextOptions] = useState<string[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  const handleSubmitBasic = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTopic && selectedTone) {
      const action = `Conversar com ${npc.name} sobre ${selectedTopic} em um tom ${selectedTone}`;
      onConfirm(action);
    }
  };

  const handleFetchOptions = async () => {
      if (!playerStats || !history) return;
      setIsLoadingOptions(true);
      const options = await fetchContextualDialogueOptions(npc, playerStats, history);
      setContextOptions(options);
      setIsLoadingOptions(false);
  };

  // Initial fetch when switching to advanced tab if empty
  const handleTabSwitch = (tab: 'basic' | 'advanced') => {
      setActiveTab(tab);
      if (tab === 'advanced' && contextOptions.length === 0) {
          handleFetchOptions();
      }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md flex flex-col animate-scale-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900/50">
          <h2 className="text-xl font-bold text-teal-300 flex items-center gap-2">
            <ChatBubbleLeftRightIcon className="w-6 h-6" />
            Interagir com {npc.name}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-transform hover:rotate-90">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
            <button 
                onClick={() => handleTabSwitch('basic')}
                className={`flex-1 py-3 text-sm font-bold transition-all ${activeTab === 'basic' ? 'bg-gray-800 text-teal-400 border-b-2 border-teal-400' : 'bg-gray-900/30 text-gray-500 hover:text-gray-300 hover:bg-gray-800'}`}
            >
                Ação Rápida
            </button>
            <button 
                onClick={() => handleTabSwitch('advanced')}
                className={`flex-1 py-3 text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'advanced' ? 'bg-gray-800 text-purple-400 border-b-2 border-purple-400' : 'bg-gray-900/30 text-gray-500 hover:text-gray-300 hover:bg-gray-800'}`}
            >
                <SparklesIcon className="w-4 h-4"/>
                Inteligência Social
            </button>
        </div>
        
        <div className="p-6">
            {/* Free Chat Always Available */}
            <button
                type="button"
                onClick={onOpenChat}
                className="w-full flex items-center justify-center gap-2 p-3 mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-lg transform transition-transform hover:scale-[1.02] active:scale-95 border border-white/10"
            >
                <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
                Conversa Livre (Chat)
            </button>

            {activeTab === 'basic' ? (
                <form onSubmit={handleSubmitBasic} className="space-y-6 animate-fade-in-up">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Tópico da Conversa</label>
                        <div className="grid grid-cols-2 gap-3">
                            {TOPICS.map((topic) => (
                                <ChoiceButton 
                                    key={topic}
                                    label={topic}
                                    isSelected={selectedTopic === topic}
                                    onClick={() => setSelectedTopic(topic)}
                                />
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Tom da Conversa</label>
                        <div className="grid grid-cols-2 gap-3">
                            {TONES.map((tone) => (
                                <ChoiceButton 
                                    key={tone}
                                    label={tone}
                                    isSelected={selectedTone === tone}
                                    onClick={() => setSelectedTone(tone)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors">
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-all transform active:scale-95 disabled:bg-gray-700 disabled:cursor-not-allowed disabled:transform-none"
                            disabled={!selectedTopic || !selectedTone}
                        >
                            Conversar
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-4 animate-fade-in-up">
                    <div className="bg-purple-900/20 border border-purple-500/30 p-3 rounded-lg text-xs text-purple-200 mb-4 flex items-center gap-2">
                        <SparklesIcon className="w-4 h-4 animate-pulse" />
                        A IA analisa a personalidade de {npc.name} para sugerir as melhores abordagens.
                    </div>

                    {isLoadingOptions ? (
                        <div className="space-y-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-12 bg-gray-700/50 rounded-lg animate-shimmer"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {contextOptions.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => onConfirm(`Dizer para ${npc.name}: "${option}"`)}
                                    className="w-full text-left p-3 bg-gray-700/40 hover:bg-gray-700 border border-gray-600 hover:border-purple-400 rounded-lg text-sm text-gray-200 hover:text-white transition-all duration-200 group transform active:scale-[0.99]"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <span className="group-hover:text-purple-300 font-bold mr-2">›</span>
                                    "{option}"
                                </button>
                            ))}
                            {contextOptions.length === 0 && (
                                <div className="text-center text-gray-500 italic">
                                    Nenhuma opção carregada.
                                </div>
                            )}
                        </div>
                    )}

                    <button 
                        onClick={handleFetchOptions}
                        disabled={isLoadingOptions}
                        className="w-full flex items-center justify-center gap-2 mt-4 text-xs text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowPathIcon className={`w-3 h-3 ${isLoadingOptions ? 'animate-spin' : ''}`} />
                        Gerar novas opções
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(InteractionDialog);
