import React, { useState } from 'react';
import { XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Relationship, NotableNPC } from '../types';

interface NpcProfileDialogProps {
  npc: Relationship | NotableNPC;
  onClose: () => void;
  onUpdateNpc: (updatedNpc: Relationship | NotableNPC) => void;
}

const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h4 className="text-sm font-semibold text-teal-300 uppercase tracking-wider mb-2">{title}</h4>
        <div className="bg-gray-900/50 p-3 rounded-lg text-gray-300 text-sm space-y-1">
            {children}
        </div>
    </div>
);

const TraitPill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-block bg-gray-700 text-gray-200 px-2 py-1 rounded-md text-xs font-medium">
        {children}
    </span>
);

function NpcProfileDialog({ npc, onClose, onUpdateNpc }: NpcProfileDialogProps): React.ReactElement {
  const portraitUrl = npc.portraitBase64 ? `data:image/png;base64,${npc.portraitBase64}` : null;
  
  // Type guard to check if npc is a Relationship
  const isRelationship = (p: Relationship | NotableNPC): p is Relationship => {
    return (p as Relationship).type !== undefined;
  };

  const hasCompetencies = npc.competencies && Object.keys(npc.competencies).length > 0;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md flex flex-col animate-fade-in-up max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
            <div className="flex items-center gap-3">
                <UserCircleIcon className="w-8 h-8 text-teal-300" />
                <div>
                    <h2 className="text-xl font-bold text-white">{npc.name}</h2>
                    <p className="text-sm text-gray-400">{isRelationship(npc) ? npc.type : npc.description}</p>
                </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
                <XMarkIcon className="w-6 h-6" />
            </button>
        </div>
        
        <div className="flex-grow overflow-y-auto">
          {/* Portrait Section */}
          <div className="p-4 sm:p-6">
              {portraitUrl ? (
                  <img src={portraitUrl} alt={`Retrato de ${npc.name}`} className="w-full h-auto rounded-lg object-cover aspect-square" />
              ) : (
                  <div className="aspect-square bg-gray-900/50 rounded-lg flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-gray-700">
                      <UserCircleIcon className="w-24 h-24 text-gray-600 mb-2"/>
                      <h3 className="font-semibold text-gray-300">Sem Retrato</h3>
                  </div>
              )}
          </div>

          {/* Details Section */}
          <div className="p-4 sm:p-6 pt-0 space-y-4">
              <DetailSection title="Histórico">
                  <p className="italic">"{npc.background}"</p>
              </DetailSection>

              <DetailSection title="Traços de Personalidade">
                  <div className="flex flex-wrap gap-2">
                      {npc.personalityTraits.map(trait => <TraitPill key={trait}>{trait}</TraitPill>)}
                  </div>
              </DetailSection>

              <DetailSection title="Motivações">
                  {npc.motivations.map(motivation => <p key={motivation}>- {motivation}</p>)}
              </DetailSection>

              {hasCompetencies && (
                  <DetailSection title="Competências">
                      <div className="space-y-3 pt-1">
                          {Object.entries(npc.competencies!).map(([skill, value]) => (
                              <div key={skill}>
                                  <div className="flex justify-between items-center mb-1">
                                      <span className="text-sm font-medium text-gray-300">{skill}</span>
                                      <span className="text-xs font-bold text-gray-400">{value} / 100</span>
                                  </div>
                                  <div className="w-full bg-gray-700 rounded-full h-2">
                                      <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${value}%` }}></div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </DetailSection>
              )}

              <DetailSection title="Manias e Detalhes">
                  <div className="flex flex-wrap gap-2">
                      {npc.quirks.map(quirk => <TraitPill key={quirk}>{quirk}</TraitPill>)}
                  </div>
              </DetailSection>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(NpcProfileDialog);