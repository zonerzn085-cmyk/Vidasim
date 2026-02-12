
import React from 'react';
import { Tombstone } from '../types';

interface GameOverProps {
  tombstone: Tombstone;
  onReset: () => void;
}

function GameOver({ tombstone, onReset }: GameOverProps): React.ReactElement {
  return (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-y-auto max-h-[90vh] text-center transform transition-all animate-fade-in-up relative">
        {/* Top Decoration */}
        <div className="h-2 w-full bg-gradient-to-r from-red-600 via-purple-600 to-red-600"></div>
        
        <div className="p-8">
            <h2 className="text-5xl font-black text-gray-200 mb-6 tracking-tighter">FIM DE JOGO</h2>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-inner mb-8 space-y-4">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-400 font-bold uppercase text-xs tracking-wider">Nome</span>
                    <span className="text-white font-mono">{tombstone.name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-400 font-bold uppercase text-xs tracking-wider">Idade</span>
                    <span className="text-white font-mono">{tombstone.age}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-400 font-bold uppercase text-xs tracking-wider">Causa</span>
                    <span className="text-red-400 font-mono">{tombstone.cause}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400 font-bold uppercase text-xs tracking-wider">Patrimônio</span>
                    <span className="text-green-400 font-mono">{tombstone.wealth}</span>
                </div>
            </div>

            <div className="mb-8">
                <p className="text-teal-500 font-bold mb-2 uppercase text-sm tracking-widest">Epitáfio</p>
                <p className="text-gray-300 italic font-serif text-lg leading-relaxed px-4">"{tombstone.epitaph}"</p>
            </div>

            <button
            onClick={onReset}
            className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition duration-300 ease-in-out transform hover:scale-[1.02] shadow-xl"
            >
            REENCARNAR
            </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(GameOver);
