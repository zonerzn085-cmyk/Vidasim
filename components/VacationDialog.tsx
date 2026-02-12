import React, { useState } from 'react';
import { XMarkIcon, SunIcon } from '@heroicons/react/24/outline';

interface VacationDialogProps {
  onConfirm: (duration: number) => void;
  onClose: () => void;
}

const DURATION_OPTIONS = [1, 2, 3, 4];

function VacationDialog({ onConfirm, onClose }: VacationDialogProps): React.ReactElement {
  const [selectedDuration, setSelectedDuration] = useState(DURATION_OPTIONS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(selectedDuration);
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
            <SunIcon className="w-6 h-6" />
            Planejar Férias
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <p className="text-sm text-gray-300">Escolha por quanto tempo você gostaria de relaxar. Férias ajudam a reduzir o estresse e aumentar a felicidade, mas têm um custo.</p>
            
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Duração</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {DURATION_OPTIONS.map((weeks) => (
                        <button
                            key={weeks}
                            type="button"
                            onClick={() => setSelectedDuration(weeks)}
                            className={`p-4 rounded-lg text-center font-bold transition-all duration-200 border-2 ${
                                selectedDuration === weeks
                                ? 'bg-teal-500/20 border-teal-400 text-teal-300 ring-2 ring-teal-400'
                                : 'bg-gray-700/50 border-gray-600 text-gray-200 hover:border-teal-500'
                            }`}
                        >
                            {weeks} {weeks > 1 ? 'Semanas' : 'Semana'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
                 <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors">
                    Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors">
                    Confirmar Férias
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(VacationDialog);