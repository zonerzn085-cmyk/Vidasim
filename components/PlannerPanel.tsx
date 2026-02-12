
import React, { useState, useMemo } from 'react';
import { Task, PlayerProfile } from '../types';
import { XMarkIcon, CalendarIcon, CheckCircleIcon, TrashIcon, PlusIcon, FlagIcon, ListBulletIcon, EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';
import CreateTaskDialog from './CreateTaskDialog';

interface PlannerPanelProps {
  tasks: Task[];
  playerProfile: PlayerProfile | null;
  onClose: () => void;
  onPlayerAction: (action: string) => void;
}

const TABS = ['Metas', 'Tarefas'];

function PlannerPanel({ tasks, playerProfile, onClose, onPlayerAction }: PlannerPanelProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const filteredTasks = useMemo(() => {
    let currentList = tasks.filter(task => task.category === (activeTab === 'Metas' ? 'Meta' : 'Tarefa'));
    if (!showCompleted) {
        currentList = currentList.filter(task => !task.isComplete);
    }
    // Sort: Incomplete first, then by date roughly (simple string sort for now is enough)
    return currentList.sort((a, b) => (a.isComplete === b.isComplete ? 0 : a.isComplete ? 1 : -1));
  }, [tasks, activeTab, showCompleted]);

  const handleAction = (action: string) => {
    onPlayerAction(action);
  };
  
  const handleCreateTask = (action: string) => {
    onPlayerAction(action);
    setIsCreateDialogOpen(false);
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div 
          className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col animate-fade-in-up"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
            <h2 className="text-2xl font-bold text-teal-300 flex items-center gap-3">
              <CalendarIcon className="w-7 h-7" />
              Seu Planejador
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-shrink-0 border-b border-gray-700 px-2 sm:px-4 flex justify-between items-center">
              <nav className="flex space-x-2 -mb-px" aria-label="Tabs">
                  {TABS.map((tab) => (
                      <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`${
                              activeTab === tab
                              ? 'border-teal-400 text-teal-300'
                              : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                          } whitespace-nowrap py-3 px-3 sm:px-4 border-b-2 font-medium text-sm transition-colors`}
                      >
                          {tab === 'Metas' ? <FlagIcon className="w-5 h-5 mr-2 inline-block"/> : <ListBulletIcon className="w-5 h-5 mr-2 inline-block"/>}
                          {tab}
                      </button>
                  ))}
              </nav>
              <button 
                onClick={() => setShowCompleted(!showCompleted)}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-700"
              >
                  {showCompleted ? <EyeIcon className="w-4 h-4"/> : <EyeSlashIcon className="w-4 h-4"/>}
                  {showCompleted ? 'Ocultar Concluídos' : 'Ver Concluídos'}
              </button>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {playerProfile && (
              <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg mb-4 animate-fade-in-up">
                <h3 className="text-xs font-bold text-teal-500 uppercase tracking-widest mb-1">Perfil Psicológico</h3>
                <p className="text-lg font-black text-white">{playerProfile.playstyle}</p>
                <p className="text-sm text-gray-300 italic mt-2">"{playerProfile.summary}"</p>
              </div>
            )}
            
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div key={task.id} className={`p-3 rounded-lg flex items-center justify-between gap-3 border transition-all ${task.isComplete ? 'bg-gray-800/30 border-gray-700 opacity-60' : 'bg-gray-700/50 border-gray-600 hover:border-teal-500/50'}`}>
                  <div className="flex-grow">
                    <p className={`font-semibold ${task.isComplete ? 'text-gray-500 line-through' : 'text-white'}`}>{task.title}</p>
                    <p className="text-xs text-gray-400">Prazo: {task.dueDate}</p>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2">
                    {!task.isComplete && (
                        <button onClick={() => handleAction(`Concluir tarefa: ${task.title}`)} title="Marcar como Concluído" className="p-2 text-green-400 hover:bg-green-500/20 rounded-full transition-colors"><CheckCircleIcon className="w-5 h-5"/></button>
                    )}
                    <button onClick={() => handleAction(`Remover tarefa: ${task.title}`)} title="Excluir" className="p-2 text-red-400 hover:bg-red-500/20 rounded-full transition-colors"><TrashIcon className="w-5 h-5"/></button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-12 px-4 bg-gray-800/20 rounded-xl border border-dashed border-gray-700">
                <p className="font-semibold text-lg mb-2">Tudo limpo!</p>
                <p>Nenhuma {activeTab.toLowerCase()} pendente.</p>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-700 flex-shrink-0">
            <button 
                onClick={() => setIsCreateDialogOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-teal-900/20"
            >
                <PlusIcon className="w-5 h-5" />
                Nova {activeTab === 'Metas' ? 'Meta' : 'Tarefa'}
            </button>
          </div>
        </div>
      </div>
      {isCreateDialogOpen && (
        <CreateTaskDialog
          onClose={() => setIsCreateDialogOpen(false)}
          onConfirm={handleCreateTask}
        />
      )}
    </>
  );
}

export default React.memo(PlannerPanel);
