import React, { useState } from 'react';
import { XMarkIcon, CpuChipIcon } from '@heroicons/react/24/outline';

interface DevelopTechDialogProps {
  onConfirm: (name: string, purpose: string) => void;
  onClose: () => void;
}

function DevelopTechDialog({ onConfirm, onClose }: DevelopTechDialogProps): React.ReactElement {
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && purpose.trim()) {
      onConfirm(name.trim(), purpose.trim());
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
            <CpuChipIcon className="w-6 h-6" />
            Pesquisar Nova Tecnologia
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
                <label htmlFor="tech-name" className="block text-sm font-medium text-gray-300 mb-1">Nome da Tecnologia</label>
                <input id="tech-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full input-style" autoFocus placeholder="Ex: Quantum Engine, AI Narrativa Avançada"/>
            </div>
            <div>
                <label htmlFor="tech-purpose" className="block text-sm font-medium text-gray-300 mb-1">Propósito / Efeito Desejado</label>
                <input id="tech-purpose" type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} required className="w-full input-style" placeholder="Ex: Melhorar gráficos 3D, Criar NPCs mais inteligentes"/>
            </div>
            <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors">Iniciar Pesquisa</button>
            </div>
        </form>
      </div>
      <style>{`.input-style { background-color: rgb(17 24 39 / 0.5); border: 1px solid rgb(55 65 81); border-radius: 0.5rem; padding: 0.5rem 0.75rem; color: rgb(229 231 235); } .input-style:focus { outline: none; --tw-ring-color: rgb(20 184 166); box-shadow: 0 0 0 2px var(--tw-ring-color); }`}</style>
    </div>
  );
}

export default React.memo(DevelopTechDialog);