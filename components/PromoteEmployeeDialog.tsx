import React, { useState, useMemo } from 'react';
import { XMarkIcon, ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { Relationship } from '../types';

interface PromoteEmployeeDialogProps {
  relationships: Relationship[];
  onConfirm: (employeeName: string, newRole: string) => void;
  onClose: () => void;
}

function PromoteEmployeeDialog({ relationships, onConfirm, onClose }: PromoteEmployeeDialogProps): React.ReactElement {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [newRole, setNewRole] = useState('');

  const companyEmployees = useMemo(() => {
    return relationships.filter(r => {
        const type = r.type.toLowerCase();
        return ['colega de trabalho', 'subordinado', 'estagiário', 'programador', 'designer', 'artista', 'gerente'].some(t => type.includes(t));
    });
  }, [relationships]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const employee = companyEmployees.find(emp => emp.id === selectedEmployeeId);
    if (employee && newRole.trim()) {
      onConfirm(employee.name, newRole.trim());
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
            <ArrowUpCircleIcon className="w-6 h-6" />
            Promover Funcionário
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
                <label htmlFor="employee-select" className="block text-sm font-medium text-gray-300 mb-1">Funcionário a ser promovido</label>
                <select 
                    id="employee-select" 
                    value={selectedEmployeeId} 
                    onChange={(e) => setSelectedEmployeeId(e.target.value)} 
                    required 
                    className="w-full input-style"
                >
                    <option value="" disabled>Selecione um funcionário</option>
                    {companyEmployees.map(emp => <option key={emp.id} value={emp.id}>{emp.name} ({emp.type})</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="new-role" className="block text-sm font-medium text-gray-300 mb-1">Novo Cargo</label>
                <input id="new-role" type="text" value={newRole} onChange={(e) => setNewRole(e.target.value)} required className="w-full input-style" placeholder="Ex: Diretor de Arte, Gerente Sênior"/>
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors">Confirmar Promoção</button>
            </div>
        </form>
      </div>
       <style>{`.input-style { background-color: rgb(17 24 39 / 0.5); border: 1px solid rgb(55 65 81); border-radius: 0.5rem; padding: 0.5rem 0.75rem; color: rgb(229 231 235); } .input-style:focus { outline: none; --tw-ring-color: rgb(20 184 166); box-shadow: 0 0 0 2px var(--tw-ring-color); }`}</style>
    </div>
  );
}

export default React.memo(PromoteEmployeeDialog);