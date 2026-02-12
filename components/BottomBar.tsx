
import React from 'react';
import { useGame } from '../contexts/GameContext';
import { 
    UserIcon, 
    MapPinIcon, 
    MapIcon, 
    UserGroupIcon, 
    DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

interface BottomBarProps {
    onOpenActions: () => void;
    onOpenNeighborhood: () => void;
    onOpenCityMap: () => void;
    onOpenRelationships: () => void;
    onOpenStats: () => void;
}

const DockItem = ({ icon, label, onClick, highlight = false, main = false }: { icon: React.ReactNode, label: string, onClick: () => void, highlight?: boolean, main?: boolean }) => (
    <button 
        onClick={onClick}
        className={`group relative flex items-center justify-center transition-all duration-300 ${main ? '-mt-6 sm:-mt-8' : ''}`}
    >
        <div className={`
            flex items-center justify-center rounded-[1.25rem] lg:rounded-[1.5rem] shadow-xl transition-all duration-300 border border-white/10
            ${main 
                ? 'w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-125' 
                : 'w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gray-800/60 backdrop-blur-xl text-gray-400 hover:bg-gray-700 hover:text-white hover:scale-110'
            }
            ${highlight ? 'ring-2 ring-teal-500 animate-pulse' : ''}
        `}>
            <div className={`${main ? 'w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10' : 'w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7'}`}>{icon}</div>
        </div>
        
        {/* Hover Label (Tooltip for Desktop) */}
        <span className="absolute -top-12 lg:-top-14 scale-0 group-hover:scale-100 transition-all bg-gray-900/90 backdrop-blur text-white text-[10px] lg:text-xs font-black py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap border border-white/5 shadow-2xl tracking-widest uppercase">
            {label}
        </span>
    </button>
);

function BottomBar({ 
    onOpenActions,
    onOpenNeighborhood,
    onOpenCityMap,
    onOpenRelationships,
    onOpenStats
}: BottomBarProps): React.ReactElement {
    const { playerStats } = useGame();
    
    const highlightExplore = playerStats.currentNeighborhood && playerStats.currentNeighborhood.currentEvent !== null;

    return (
        <div className="fixed bottom-0 left-0 w-full flex justify-center pb-4 lg:pb-8 pointer-events-none z-40">
            <nav className="pointer-events-auto flex items-end gap-3 sm:gap-4 lg:gap-6 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gray-950/40 backdrop-blur-3xl rounded-[2.5rem] lg:rounded-[3rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all">
                
                <DockItem 
                    icon={<UserIcon />} 
                    label="Status" 
                    onClick={onOpenStats} 
                />
                
                <DockItem 
                    icon={<UserGroupIcon />} 
                    label="Contatos" 
                    onClick={onOpenRelationships} 
                />

                <DockItem 
                    icon={<DevicePhoneMobileIcon />} 
                    label="Ações" 
                    onClick={onOpenActions} 
                    main={true}
                />

                <DockItem 
                    icon={<MapPinIcon />} 
                    label="Bairro" 
                    onClick={onOpenNeighborhood} 
                    highlight={!!highlightExplore}
                />

                <DockItem 
                    icon={<MapIcon />} 
                    label="Mundo" 
                    onClick={onOpenCityMap} 
                />
                
            </nav>
        </div>
    );
}

export default React.memo(BottomBar);
