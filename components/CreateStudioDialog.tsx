import React, { useState } from 'react';
import { XMarkIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

interface CreateStudioDialogProps {
  onConfirm: (name: string) => void;
  onClose: () => void;
}

function CreateStudioDialog({ onConfirm, onClose }: CreateStudioDialogProps): React.ReactElement {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onConfirm(name.trim());
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-teal-300 flex items-center gap-2">
            <BuildingOfficeIcon className="w-6 h-6" />
            Fundar Novo Estúdio
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <label htmlFor="studio-name" className="block text-sm font-medium text-gray-300">Qual será o nome do novo estúdio?</label>
            <input
                id="studio-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                autoFocus
            />
            <div className="flex justify-end gap-3 pt-2">
                 <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors">
                    Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors">
                    Fundar Estúdio
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(CreateStudioDialog);