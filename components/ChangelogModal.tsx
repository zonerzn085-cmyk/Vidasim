
import React from 'react';
import { XMarkIcon, NewspaperIcon, FireIcon } from '@heroicons/react/24/outline';
import { changelogData } from '../data/changelog';

interface ChangelogModalProps {
  onClose: () => void;
}

function ChangelogModal({ onClose }: ChangelogModalProps): React.ReactElement {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-scale-in">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-950/50">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-500/20 rounded-xl text-teal-400">
                    <NewspaperIcon className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">Notas de Atualização</h2>
                    <p className="text-gray-400 text-sm">O que há de novo no VidaSim</p>
                </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full text-gray-500 transition-colors">
                <XMarkIcon className="w-6 h-6" />
            </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 space-y-8 custom-scrollbar">
            {changelogData.map((log, index) => (
                <div key={log.version} className="relative pl-4 border-l-2 border-gray-800 hover:border-teal-500/50 transition-colors">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-teal-500"></div>
                    
                    <div className="flex items-baseline justify-between mb-2">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            v{log.version}
                            {index === 0 && <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full uppercase tracking-wide font-black flex items-center gap-1"><FireIcon className="w-3 h-3"/> Novo</span>}
                        </h3>
                        <span className="text-xs text-gray-500 font-mono">{log.date}</span>
                    </div>
                    
                    <h4 className="text-teal-400 text-sm font-bold uppercase tracking-wider mb-3">{log.title}</h4>
                    
                    <ul className="space-y-2">
                        {log.changes.map((change, idx) => (
                            <li key={idx} className="text-gray-300 text-sm leading-relaxed flex items-start gap-2">
                                <span className="text-gray-600 mt-1.5 w-1.5 h-1.5 bg-gray-600 rounded-full flex-shrink-0"></span>
                                {change}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-gray-950/50 text-center text-xs text-gray-500">
            VidaSim &copy; 2024 - Powered by Gemini AI
        </div>
      </div>
    </div>
  );
}

export default React.memo(ChangelogModal);
