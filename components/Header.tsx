
import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { BanknotesIcon, CakeIcon, ArrowLeftOnRectangleIcon, ArchiveBoxIcon, Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';
import PlayerHubMenu from './PlayerHubMenu';
import RadioPlayer from './RadioPlayer';

interface HeaderProps {
    onSave: (isAutoSave?: boolean) => void;
    onGoToMenu: () => void;
    saveMessage: string;
    onOpenActions: () => void;
    onOpenRelationships: () => void;
    onOpenNeighborhood: () => void;
    onOpenPlanner: () => void;
    onOpenCityMap: () => void;
    onOpenChatbot: () => void;
    hasNeighborhood: boolean;
}

function formatMoney(amount: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
}

function Header({ 
    onSave, 
    onGoToMenu, 
    saveMessage,
    onOpenActions,
    onOpenRelationships,
    onOpenNeighborhood,
    onOpenPlanner,
    onOpenCityMap,
    onOpenChatbot,
    hasNeighborhood
}: HeaderProps): React.ReactElement {
    const { playerStats } = useGame();
    const [isHubMenuOpen, setIsHubMenuOpen] = useState(false);
    
    const isRich = playerStats.money > 1000000;

    return (
        <header className="fixed top-0 left-0 w-full z-40 bg-gradient-to-b from-gray-950 via-gray-950/90 to-transparent pb-6 pt-safe-top px-2 sm:px-4 pointer-events-none transition-all duration-300">
            <div className={`pointer-events-auto max-w-[1600px] mx-auto flex items-center justify-between bg-gray-900/80 backdrop-blur-xl rounded-full border p-1.5 sm:p-2 shadow-2xl transition-all ${isRich ? 'border-yellow-500/30 shadow-yellow-900/10' : 'border-gray-800'}`}>
                
                {/* Left: Menu & Identity */}
                <div className="flex items-center gap-2 pl-1">
                    <div className="relative">
                        <button 
                            onClick={() => setIsHubMenuOpen(prev => !prev)} 
                            className={`p-2 sm:p-3 rounded-full transition-all border text-gray-300 shadow-lg group ${isHubMenuOpen ? 'bg-teal-500 text-white border-teal-400' : 'bg-gray-800 border-gray-700 hover:border-gray-600 hover:text-white'}`}
                        >
                             <Bars3Icon className="w-5 h-5" />
                        </button>
                         {isHubMenuOpen && (
                            <PlayerHubMenu 
                                age={playerStats.age}
                                onClose={() => setIsHubMenuOpen(false)}
                                onOpenActions={onOpenActions}
                                onOpenRelationships={onOpenRelationships}
                                onOpenNeighborhood={onOpenNeighborhood}
                                onOpenPlanner={onOpenPlanner}
                                onOpenCityMap={onOpenCityMap}
                                onOpenChatbot={onOpenChatbot}
                                hasNeighborhood={hasNeighborhood}
                            />
                        )}
                    </div>
                    
                    <div className="hidden sm:flex flex-col ml-2">
                        <span className="text-sm font-bold text-white leading-none truncate max-w-[150px]">{playerStats.name}</span>
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{playerStats.career}</span>
                    </div>
                </div>

                {/* Center: Stats (Mobile & Desktop mixed) */}
                <div className="flex items-center gap-3 sm:gap-6 px-2 sm:px-4">
                     {/* Money Display */}
                    <div className="flex items-center gap-1.5 sm:gap-2" title="Dinheiro">
                        <BanknotesIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isRich ? 'text-yellow-400' : 'text-emerald-400'}`} />
                        <span className={`text-xs sm:text-sm font-black font-mono tracking-tight ${isRich ? 'text-yellow-100' : 'text-emerald-100'}`}>
                            {formatMoney(playerStats.money)}
                        </span>
                    </div>
                    
                    {/* Age Display - Hidden on very tiny screens */}
                    <div className="hidden xs:flex items-center gap-1.5 bg-gray-800/50 px-2 sm:px-3 py-1 rounded-full border border-gray-700/50" title="Idade">
                        <CakeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400" />
                        <span className="text-[10px] sm:text-xs font-bold text-gray-200">{playerStats.age}</span>
                    </div>
                </div>

                {/* Right: Controls */}
                <div className="flex items-center gap-1 sm:gap-2 pr-1">
                    {/* Radio is now visible on mobile */}
                    <div className="block">
                        <RadioPlayer />
                    </div>

                    <div className="w-px h-6 bg-gray-800 mx-1 hidden sm:block"></div>

                    <button
                        onClick={() => onSave(false)}
                        className="p-2 sm:p-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all relative group border border-transparent hover:border-gray-700 hidden sm:block"
                        title="Salvar Jogo"
                    >
                        <ArchiveBoxIcon className="w-5 h-5" />
                        {saveMessage && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-teal-500 rounded-full animate-ping"></span>
                        )}
                    </button>
                    <button
                        onClick={onGoToMenu}
                        className="p-2 sm:p-3 text-gray-400 hover:text-red-400 hover:bg-red-900/10 rounded-full transition-all border border-transparent hover:border-red-900/30"
                        title="Sair para Menu"
                    >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default React.memo(Header);
