
import React from 'react';
import { BookOpenIcon, BoltIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface GameModeDialogProps {
  onSelect: (mode: 'robust' | 'concise') => void;
  onCancel: () => void;
}

function GameModeDialog({ onSelect, onCancel }: GameModeDialogProps): React.ReactElement {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-scale-in">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-2xl overflow-hidden relative shadow-2xl">
        
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Escolha seu Estilo de Jogo</h2>
                <p className="text-gray-400 text-sm mt-1">Como você quer viver essa história?</p>
            </div>
            <button onClick={onCancel} className="p-2 hover:bg-gray-800 rounded-full text-gray-500 transition-colors">
                <XMarkIcon className="w-6 h-6" />
            </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Modo Robusto */}
            <button 
                onClick={() => onSelect('robust')}
                className="group relative bg-gray-800 hover:bg-gray-750 border-2 border-gray-700 hover:border-indigo-500 rounded-2xl p-6 text-left transition-all duration-300 hover:shadow-lg hover:shadow-indigo-900/20"
            >
                <div className="bg-indigo-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BookOpenIcon className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300">Modo Robusto</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    A experiência completa. Narrativas detalhadas, descrições imersivas e diálogos profundos. Ideal para quem gosta de ler e se sentir dentro de um livro interativo.
                </p>
                <div className="mt-4 text-xs font-mono text-indigo-400/60 uppercase tracking-widest">Texto Completo</div>
            </button>

            {/* Modo Resumo */}
            <button 
                onClick={() => onSelect('concise')}
                className="group relative bg-gray-800 hover:bg-gray-750 border-2 border-gray-700 hover:border-teal-500 rounded-2xl p-6 text-left transition-all duration-300 hover:shadow-lg hover:shadow-teal-900/20"
            >
                <div className="bg-teal-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BoltIcon className="w-8 h-8 text-teal-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300">Modo Resumo</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Direto ao ponto. A IA gera textos curtos e foca na ação e consequência imediata. Perfeito para jogar rápido e focar na estratégia e nos números.
                </p>
                <div className="mt-4 text-xs font-mono text-teal-400/60 uppercase tracking-widest">Texto Ágil</div>
            </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(GameModeDialog);
