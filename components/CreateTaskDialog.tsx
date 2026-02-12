import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CreateTaskDialogProps {
  onConfirm: (action: string) => void;
  onClose: () => void;
}

function CreateTaskDialog({ onConfirm, onClose }: CreateTaskDialogProps): React.ReactElement {
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState<'Meta' | 'Tarefa'>('Tarefa');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const command = category === 'Meta' ? 'Criar meta' : 'Adicionar tarefa';
      onConfirm(`${command}: ${inputValue.trim()}`);
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
          <h2 className="text-xl font-bold text-teal-300">Nova Meta ou Tarefa</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">O que você quer fazer?</label>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
                placeholder="Ex: Ler um livro, aprender a programar..."
                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Isto é uma:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                  type="button"
                  onClick={() => setCategory('Tarefa')}
                  className={`p-3 rounded-lg text-center font-bold transition-all duration-200 border-2 ${
                      category === 'Tarefa'
                      ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                      : 'bg-gray-700/50 border-gray-600 text-gray-200 hover:border-teal-500'
                  }`}
              >
                  Tarefa
              </button>
              <button
                  type="button"
                  onClick={() => setCategory('Meta')}
                  className={`p-3 rounded-lg text-center font-bold transition-all duration-200 border-2 ${
                      category === 'Meta'
                      ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                      : 'bg-gray-700/50 border-gray-600 text-gray-200 hover:border-teal-500'
                  }`}
              >
                  Meta
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
               <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors">
                  Cancelar
              </button>
              <button type="submit" className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors">
                  Adicionar
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(CreateTaskDialog);