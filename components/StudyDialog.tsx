import React from 'react';
import { XMarkIcon, LightBulbIcon } from '@heroicons/react/24/outline';

interface StudyDialogProps {
  onConfirm: (action: string) => void;
  onClose: () => void;
}

const TOPICS = ['Ciência', 'História', 'Filosofia', 'Tecnologia'];

interface ActionButtonProps {
    label: string;
    onAction: (action: string) => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, onAction }) => (
    <button
        onClick={() => onAction(`Aprender por conta própria ${label}`)}
        className="w-full text-left bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:translate-x-1"
    >
        {label}
    </button>
);

function StudyDialog({ onConfirm, onClose }: StudyDialogProps): React.ReactElement {
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
            <LightBulbIcon className="w-6 h-6" />
            Estudo Autodidata
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-3">
            <p className="text-sm text-gray-400 mb-4">Escolha um tópico para aprofundar seus conhecimentos. O sucesso depende da sua inteligência atual.</p>
            {TOPICS.map(topic => (
                <ActionButton 
                    key={topic}
                    label={topic}
                    onAction={onConfirm} 
                />
            ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(StudyDialog);
