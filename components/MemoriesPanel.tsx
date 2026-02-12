
import React from 'react';
import { Memory } from '../types';
import { XMarkIcon, BookOpenIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface MemoriesPanelProps {
  memories: Memory[];
  onClose: () => void;
}

const EmotionBadge = ({ emotion }: { emotion: string }) => {
    const colors: Record<string, string> = {
        'Alegria': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        'Tristeza': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        'Raiva': 'bg-red-500/20 text-red-300 border-red-500/30',
        'Medo': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        'Orgulho': 'bg-green-500/20 text-green-300 border-green-500/30',
        'Arrependimento': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    };
    return (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${colors[emotion] || 'bg-gray-700 text-gray-400'}`}>
            {emotion}
        </span>
    );
};

function MemoriesPanel({ memories, onClose }: MemoriesPanelProps): React.ReactElement {
  // Sort memories by year descending
  const sortedMemories = [...memories].sort((a, b) => b.year - a.year);

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fade-in-up"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900/95 border border-gray-700/50 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md z-10">
          <div>
              <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                  <BookOpenIcon className="w-8 h-8 text-indigo-400" />
                  Diário de Vida
              </h2>
              <p className="text-sm text-gray-400 font-medium mt-1">Os momentos que definiram quem você é.</p>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6 bg-gray-950/50 custom-scrollbar relative">
            <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-gray-800 pointer-events-none"></div>
            
            {sortedMemories.length > 0 ? (
                <div className="space-y-8">
                    {sortedMemories.map((mem, idx) => (
                        <div key={idx} className="relative pl-10 group">
                            {/* Year Marker */}
                            <div className="absolute left-[26px] top-0 w-3 h-3 bg-gray-600 rounded-full border-2 border-gray-900 group-hover:bg-indigo-500 transition-colors transform -translate-x-1/2 mt-1.5 z-10"></div>
                            
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl font-black text-gray-500 group-hover:text-indigo-400 transition-colors font-mono">{mem.year}</span>
                                    {(mem.significance === 'Alta' || mem.significance === 'Lendária') && (
                                        <div className="flex items-center gap-1">
                                            {mem.significance === 'Lendária' ? (
                                                <StarIconSolid className="w-4 h-4 text-yellow-500 animate-pulse" />
                                            ) : (
                                                <StarIcon className="w-4 h-4 text-indigo-400" />
                                            )}
                                        </div>
                                    )}
                                    <EmotionBadge emotion={mem.emotion} />
                                </div>
                                <p className={`text-lg leading-relaxed ${mem.significance === 'Lendária' ? 'text-yellow-100 font-medium' : 'text-gray-300'}`}>
                                    {mem.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-60">
                    <BookOpenIcon className="w-16 h-16 mb-4"/>
                    <p>Sua história ainda está sendo escrita...</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(MemoriesPanel);
