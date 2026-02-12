
import React, { useState } from 'react';
import { XMarkIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

interface DevelopGameDialogProps {
  studios: string[];
  onConfirm: (name: string, genre: string, studio: string, scale: string, audience: string) => void;
  onClose: () => void;
}

const COMMON_GENRES = ["RPG", "Ação", "Aventura", "Estratégia", "Simulação", "Esportes", "Puzzle", "Terror", "FPS", "Battle Royale"];
const SCALES = [
    { id: 'Indie', label: 'Indie (Baixo Custo)', desc: 'Risco baixo, retorno moderado.' },
    { id: 'AA', label: 'AA (Médio Porte)', desc: 'Equilíbrio entre custo e qualidade.' },
    { id: 'AAA', label: 'AAA (Alto Risco)', desc: 'Custo altíssimo, chance de sucesso massivo ou falha catastrófica.' }
];
const AUDIENCES = ["Infantil", "Jovem", "Adulto", "Geral"];

function DevelopGameDialog({ studios, onConfirm, onClose }: DevelopGameDialogProps): React.ReactElement {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [selectedStudio, setSelectedStudio] = useState(studios[0] || '');
  const [selectedScale, setSelectedScale] = useState('Indie');
  const [selectedAudience, setSelectedAudience] = useState('Geral');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && genre.trim() && selectedStudio) {
      onConfirm(name.trim(), genre.trim(), selectedStudio, selectedScale, selectedAudience);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-teal-300 flex items-center gap-2">
            <RocketLaunchIcon className="w-6 h-6" />
            Desenvolver Novo Jogo
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div>
                <label htmlFor="game-name" className="block text-sm font-medium text-gray-300 mb-1">Nome do Jogo</label>
                <input id="game-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full input-style" autoFocus />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="game-studio" className="block text-sm font-medium text-gray-300 mb-1">Estúdio</label>
                    <select id="game-studio" value={selectedStudio} onChange={(e) => setSelectedStudio(e.target.value)} required className="w-full input-style">
                        {studios.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="game-audience" className="block text-sm font-medium text-gray-300 mb-1">Público-Alvo</label>
                    <select id="game-audience" value={selectedAudience} onChange={(e) => setSelectedAudience(e.target.value)} required className="w-full input-style">
                        {AUDIENCES.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Escopo do Projeto</label>
                <div className="grid grid-cols-1 gap-2">
                    {SCALES.map(scale => (
                        <button
                            key={scale.id}
                            type="button"
                            onClick={() => setSelectedScale(scale.id)}
                            className={`flex items-center justify-between p-3 rounded-lg border transition-all text-left
                                ${selectedScale === scale.id 
                                    ? 'bg-teal-600/20 border-teal-500 text-teal-100' 
                                    : 'bg-gray-700/50 border-gray-600 text-gray-400 hover:bg-gray-700'
                                }
                            `}
                        >
                            <span className="font-bold">{scale.label}</span>
                            <span className="text-xs opacity-70">{scale.desc}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="game-genre" className="block text-sm font-medium text-gray-300 mb-1">Gênero Principal</label>
                <input id="game-genre" type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required className="w-full input-style" placeholder="Ex: RPG, Aventura..." />
                <div className="flex flex-wrap gap-2 mt-2">
                    {COMMON_GENRES.map(g => (
                        <button 
                            type="button" 
                            key={g} 
                            onClick={() => setGenre(g)} 
                            className={`px-2 py-1 text-xs rounded-md transition-colors ${genre === g ? 'bg-teal-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
                        >
                            {g}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors">Iniciar Desenvolvimento</button>
            </div>
        </form>
      </div>
       <style>{`.input-style { background-color: rgb(17 24 39 / 0.5); border: 1px solid rgb(55 65 81); border-radius: 0.5rem; padding: 0.5rem 0.75rem; color: rgb(229 231 235); } .input-style:focus { outline: none; --tw-ring-color: rgb(20 184 166); box-shadow: 0 0 0 2px var(--tw-ring-color); }`}</style>
    </div>
  );
}

export default React.memo(DevelopGameDialog);
