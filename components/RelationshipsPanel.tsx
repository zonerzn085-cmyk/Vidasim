
import React, { useState, useMemo } from 'react';
import { Relationship, NotableNPC } from '../types';
import { 
    XMarkIcon, 
    ChatBubbleLeftRightIcon, 
    AcademicCapIcon, 
    InformationCircleIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    UserCircleIcon,
    HeartIcon
} from '@heroicons/react/24/outline';

interface RelationshipsPanelProps {
  relationships: Relationship[];
  onClose: () => void;
  onInteract: (person: Relationship) => void;
  onViewProfile: (person: Relationship) => void;
  onOpenChat: (person: Relationship) => void;
}

const categories = ['Todos', 'Família', 'Amigos', 'Trabalho', 'Escola', 'Outros'];

function getCategoryForType(type: string): string {
    const lowerType = type.toLowerCase();
    
    if (['colega de trabalho', 'chefe', 'estagiário', 'ceo', 'subordinado', 'presidente', 'diretor', 'diretora'].some(t => lowerType.includes(t))) {
        return 'Trabalho';
    }
    if (['colega de classe', 'professor', 'professora', 'diretor'].some(t => lowerType.includes(t))) {
        return 'Escola';
    }
    if (['mãe', 'pai', 'irmão', 'irmã', 'avô', 'avó', 'tio', 'tia', 'primo', 'prima', 'esposa', 'marido', 'filho', 'filha'].some(t => lowerType.includes(t))) {
        return 'Família';
    }
    if (['amigo', 'amiga'].some(t => lowerType.includes(t))) {
        return 'Amigos';
    }

    return 'Outros';
}

function RelationshipBar({ score }: { score: number }) {
  const width = `${Math.max(0, Math.min(100, score))}%`;
  let colorClass = 'bg-teal-500';
  if (score < 30) colorClass = 'bg-red-500';
  else if (score < 60) colorClass = 'bg-yellow-500';
  else if (score >= 90) colorClass = 'bg-green-400';
  
  return (
    <div className="w-full bg-gray-900 rounded-full h-1.5 mt-2 overflow-hidden border border-gray-700/50">
      <div className={`${colorClass} h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.2)]`} style={{ width }}></div>
    </div>
  );
}

function Avatar({ name, base64 }: { name: string, base64?: string }) {
    if (base64) {
        return <img src={`data:image/png;base64,${base64}`} alt={name} className="w-14 h-14 rounded-full object-cover border-2 border-gray-700 shadow-md" />;
    }
    const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    const colors = ['from-purple-500 to-indigo-600', 'from-pink-500 to-rose-600', 'from-teal-400 to-emerald-600', 'from-blue-400 to-cyan-600', 'from-orange-400 to-amber-600'];
    const color = colors[name.length % colors.length];

    return (
        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-lg shadow-inner border-2 border-gray-800`}>
            {initials}
        </div>
    );
}

function RelationshipsPanel({ relationships, onClose, onInteract, onViewProfile, onOpenChat }: RelationshipsPanelProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState('Todos');

  const filteredRelationships = useMemo(() => {
    if (activeTab === 'Todos') {
      return relationships;
    }
    return relationships.filter(person => getCategoryForType(person.type) === activeTab);
  }, [relationships, activeTab]);

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fade-in-up"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 border border-gray-700/50 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md z-10">
          <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Conexões</h2>
              <p className="text-sm text-gray-400 font-medium">{relationships.length} contatos</p>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="px-6 py-3 border-b border-gray-800 bg-gray-900/50 overflow-x-auto no-scrollbar">
            <div className="flex gap-2">
                {categories.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                            activeTab === tab
                            ? 'bg-teal-500/10 text-teal-400 border-teal-500/50'
                            : 'bg-transparent text-gray-500 border-gray-700 hover:border-gray-500 hover:text-gray-300'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 bg-gray-950">
          <div className="grid grid-cols-1 gap-3">
            {filteredRelationships.length > 0 ? (
                filteredRelationships.map((person) => (
                <div key={person.id} className="group bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 p-4 rounded-2xl transition-all duration-200 shadow-sm flex items-center gap-4">
                    
                    <Avatar name={person.name} base64={person.portraitBase64} />
                    
                    <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-white truncate text-base">{person.name}</h3>
                            <div className="flex gap-1">
                                {person.mentorshipDetails && (
                                    <div className="bg-purple-900/30 text-purple-400 p-1 rounded-md" title="Mentoria">
                                        <AcademicCapIcon className="w-3 h-3" />
                                    </div>
                                )}
                                {person.relationshipScore > 90 && (
                                    <div className="bg-pink-900/30 text-pink-400 p-1 rounded-md" title="Muito Próximo">
                                        <HeartIcon className="w-3 h-3" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className="text-xs text-teal-500 font-bold uppercase tracking-wide truncate mb-1">{person.type}</p>
                        <RelationshipBar score={person.relationshipScore} />
                    </div>

                    <div className="flex gap-2 pl-2 border-l border-gray-800">
                        <button onClick={() => onOpenChat(person)} className="p-2 bg-gray-800 hover:bg-teal-600 hover:text-white text-gray-400 rounded-xl transition-colors" title="Chat">
                            <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5"/>
                        </button>
                        <button onClick={() => onInteract(person)} className="p-2 bg-gray-800 hover:bg-indigo-600 hover:text-white text-gray-400 rounded-xl transition-colors" title="Interagir">
                            <ChatBubbleLeftRightIcon className="w-5 h-5"/>
                        </button>
                         <button onClick={() => onViewProfile(person)} className="p-2 bg-gray-800 hover:bg-gray-700 hover:text-white text-gray-400 rounded-xl transition-colors" title="Perfil">
                            <InformationCircleIcon className="w-5 h-5"/>
                        </button>
                    </div>
                </div>
                ))
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-600">
                    <UserCircleIcon className="w-16 h-16 mb-4 opacity-50"/>
                    <p className="font-medium">Nenhum contato encontrado nesta categoria.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(RelationshipsPanel);
