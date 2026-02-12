
import React, { useEffect, useRef } from 'react';
import { BoltIcon, UserGroupIcon, MapPinIcon, CalendarIcon, MapIcon, ChatBubbleLeftEllipsisIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useUI } from '../contexts/UIContext';

interface PlayerHubMenuProps {
    age: number;
    onClose: () => void;
    onOpenActions: () => void;
    onOpenRelationships: () => void;
    onOpenNeighborhood: () => void;
    onOpenPlanner: () => void;
    onOpenCityMap: () => void;
    onOpenChatbot: () => void;
    hasNeighborhood: boolean;
}

const MenuItem = ({ icon, label, onClick, disabled = false, badge }: { icon: React.ReactNode, label: string, onClick: () => void, disabled?: boolean, badge?: string }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="w-full flex items-center justify-between px-4 py-3 text-left text-sm text-gray-200 hover:bg-gray-700/80 transition-colors disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-transparent group"
    >
        <div className="flex items-center gap-3">
            <div className="w-5 h-5 text-gray-400 group-hover:text-teal-400 transition-colors">{icon}</div>
            <span>{label}</span>
        </div>
        {badge && <span className="text-[10px] font-black bg-teal-500/20 text-teal-400 px-1.5 py-0.5 rounded uppercase tracking-tighter">{badge}</span>}
    </button>
);


function PlayerHubMenu({ 
    age, 
    onClose, 
    onOpenActions, 
    onOpenRelationships, 
    onOpenNeighborhood, 
    onOpenPlanner, 
    onOpenCityMap, 
    onOpenChatbot,
    hasNeighborhood 
}: PlayerHubMenuProps): React.ReactElement {
    const menuRef = useRef<HTMLDivElement>(null);
    const { isSummaryMode, toggleSummaryMode } = useUI();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div 
            ref={menuRef} 
            className="absolute top-full left-0 mt-2 w-64 bg-gray-900 rounded-2xl shadow-2xl border border-white/5 z-50 overflow-hidden animate-fade-in-up" 
            style={{ animationDuration: '200ms'}}
        >
            <div className="py-2">
                <div className="px-4 py-2 border-b border-white/5 mb-2">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Navegação Principal</p>
                </div>
                
                <MenuItem
                    icon={<BoltIcon />}
                    label="Ações"
                    onClick={() => { onOpenActions(); onClose(); }}
                />
                 <MenuItem
                    icon={<CalendarIcon />}
                    label="Planejador"
                    onClick={() => { onOpenPlanner(); onClose(); }}
                />
                <MenuItem
                    icon={<UserGroupIcon />}
                    label="Relações"
                    onClick={() => { onOpenRelationships(); onClose(); }}
                />
                {age >= 6 && (
                    <>
                        <MenuItem
                            icon={<MapIcon />}
                            label="Mapa da Cidade"
                            onClick={() => { onOpenCityMap(); onClose(); }}
                        />
                        <MenuItem
                            icon={<MapPinIcon />}
                            label="Bairro Atual"
                            onClick={() => { onOpenNeighborhood(); onClose(); }}
                            disabled={!hasNeighborhood}
                        />
                    </>
                )}

                <div className="h-px bg-white/5 my-2"></div>
                
                <div className="px-4 py-2">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Assistência IA</p>
                    {/* Summary Mode Toggle */}
                    <button 
                        onClick={(e) => { e.stopPropagation(); toggleSummaryMode(); }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl border transition-all duration-300 ${isSummaryMode ? 'bg-teal-500/10 border-teal-500/30' : 'bg-gray-800/50 border-white/5 hover:border-white/10'}`}
                    >
                        <div className="flex items-center gap-2">
                            <SparklesIcon className={`w-4 h-4 ${isSummaryMode ? 'text-teal-400' : 'text-gray-500'}`} />
                            <span className={`text-xs font-bold ${isSummaryMode ? 'text-white' : 'text-gray-400'}`}>Modo Resumo</span>
                        </div>
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${isSummaryMode ? 'bg-teal-500' : 'bg-gray-700'}`}>
                            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isSummaryMode ? 'left-6' : 'left-1'}`}></div>
                        </div>
                    </button>
                    <p className="text-[10px] text-gray-600 mt-2 px-1">Alterna entre a narrativa completa e o resumo essencial do chat.</p>
                </div>

                <div className="h-px bg-white/5 my-2"></div>
                
                <MenuItem
                    icon={<ChatBubbleLeftEllipsisIcon />}
                    label="Assistente IA"
                    onClick={() => { onOpenChatbot(); onClose(); }}
                    badge="HELP"
                />
            </div>
        </div>
    );
}

export default React.memo(PlayerHubMenu);
