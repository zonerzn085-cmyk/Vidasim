import React, { useState } from 'react';
import { XMarkIcon, UserPlusIcon } from '@heroicons/react/24/outline';

interface HireExecutiveDialogProps {
  onConfirm: (role: string) => void;
  onClose: () => void;
}

const COMMON_ROLES = ["Presidente", "CEO", "Diretor Criativo", "Diretor de Arte", "Diretor de Marketing", "Chefe de Programação"];

function HireExecutiveDialog({ onConfirm, onClose }: HireExecutiveDialogProps): React.ReactElement {
  const [role, setRole] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role.trim()) {
      onConfirm(role.trim());
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
            <UserPlusIcon className="w-6 h-6" />
            Contratar Executivo
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <label htmlFor="role-name" className="block text-sm font-medium text-gray-300">Qual cargo você deseja preencher?</label>
            <input
                id="role-name"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                autoFocus
            />
             <div className="flex flex-wrap gap-2">
                {COMMON_ROLES.map(r => <button type="button" key={r} onClick={() => setRole(r)} className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded-md">{r}</button>)}
            </div>
            <div className="flex justify-end gap-3 pt-2">
                 <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors">
                    Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors">
                    Buscar Candidato
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(HireExecutiveDialog);