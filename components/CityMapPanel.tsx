
import React, { useState, useMemo } from 'react';
import { Neighborhood } from '../types';
import { XMarkIcon, MapIcon, ShieldCheckIcon, BanknotesIcon, ArrowRightCircleIcon, MegaphoneIcon, UserIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { MegaphoneIcon as MegaphoneIconSolid, MapPinIcon as MapPinIconSolid } from '@heroicons/react/24/solid';

interface CityMapPanelProps {
  city: Neighborhood[];
  currentNeighborhoodId: string;
  onClose: () => void;
  onPlayerAction: (action: string) => void;
}

const InfoPill: React.FC<{ icon: React.ReactNode; label: string; value: string | number; colorClass: string }> = ({ icon, label, value, colorClass }) => (
    <div className="flex items-center gap-2 bg-gray-900/50 p-2 rounded-md flex-1 min-w-[100px]">
        <div className={`w-5 h-5 ${colorClass}`}>{icon}</div>
        <div>
            <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">{label}</div>
            <div className="text-sm font-bold text-white truncate">{value}</div>
        </div>
    </div>
);

function CityMapPanel({ city, currentNeighborhoodId, onClose, onPlayerAction }: CityMapPanelProps): React.ReactElement {
  // Inicialmente null em mobile para mostrar o mapa. Em desktop, pode pré-selecionar o atual.
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<Neighborhood | null>(
    window.innerWidth >= 768 ? (city || []).find(n => n.id === currentNeighborhoodId) || null : null
  );

  const gridSize = useMemo(() => {
    if (!city || city.length === 0) return { cols: 1, rows: 1 };
    
    const xPositions = city.map(n => n.position.x);
    const yPositions = city.map(n => n.position.y);
    
    if (xPositions.some(x => x === undefined) || yPositions.some(y => y === undefined)) return { cols: 3, rows: 3 };

    return {
      cols: Math.max(...xPositions, 0) + 1,
      rows: Math.max(...yPositions, 0) + 1,
    };
  }, [city]);

  const handleSelectNeighborhood = (n: Neighborhood) => {
      setSelectedNeighborhood(n);
  };

  const handleBackToMap = () => {
      setSelectedNeighborhood(null);
  };

  const showMap = !selectedNeighborhood || window.innerWidth >= 768; 
  
  return (
    <div 
        className="fixed inset-0 bg-gray-950/95 backdrop-blur-md z-40 flex flex-col animate-fade-in-up sm:p-6 lg:p-8"
        onClick={onClose}
    >
        {/* Header Responsivo */}
        <div className="flex justify-between items-center p-4 sm:p-0 mb-2 sm:mb-4 flex-shrink-0 bg-gray-950 sm:bg-transparent z-50 border-b border-gray-800 sm:border-none" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 bg-teal-500/10 rounded-2xl border border-teal-500/20 hidden sm:block">
                    <MapIcon className="w-6 h-6 sm:w-8 sm:h-8 text-teal-400" />
                </div>
                <div>
                    <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
                        {selectedNeighborhood && window.innerWidth < 768 ? (
                            <button onClick={handleBackToMap} className="mr-2 text-gray-400 hover:text-white">
                                <ArrowLeftIcon className="w-6 h-6" />
                            </button>
                        ) : (
                            <MapIcon className="w-6 h-6 text-teal-400 sm:hidden" />
                        )}
                        {selectedNeighborhood && window.innerWidth < 768 ? selectedNeighborhood.name : "Mapa Urbano"}
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">Navegue pelos distritos da cidade.</p>
                </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-700">
                <XMarkIcon className="w-8 h-8" />
            </button>
        </div>

        <div 
            className="flex-grow bg-gray-800/30 sm:rounded-3xl border-t sm:border border-gray-700/50 overflow-hidden flex flex-col md:flex-row shadow-2xl relative w-full h-full"
            onClick={(e) => e.stopPropagation()}
        >
            {/* --- MAPA (Grid) --- */}
            {/* Hidden on mobile if a neighborhood is selected */}
            <div className={`flex-grow relative bg-gray-900/40 overflow-hidden transition-all duration-300 ${selectedNeighborhood ? 'hidden md:block' : 'block'} md:w-auto`}>
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(#4fd1c5 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                </div>

                <div className="absolute inset-0 overflow-auto flex items-center justify-center p-4 sm:p-12 custom-scrollbar touch-pan-x touch-pan-y">
                    <div 
                        className="grid gap-4 sm:gap-8 lg:gap-10 transition-all"
                        style={{ 
                            gridTemplateColumns: `repeat(${gridSize.cols}, minmax(85px, 140px))`, 
                            gridTemplateRows: `repeat(${gridSize.rows}, minmax(85px, 140px))` 
                        }}
                    >
                        {(city || []).map(n => {
                            const isCurrent = n.id === currentNeighborhoodId;
                            const isSelected = n.id === selectedNeighborhood?.id;
                            const hasEvent = !!n.currentEvent;

                            return (
                                <div 
                                    key={n.id} 
                                    className="flex items-center justify-center relative group z-10"
                                    style={{ gridColumn: n.position.x + 1, gridRow: n.position.y + 1 }}
                                >
                                    {/* Connection Lines */}
                                    <div className="absolute w-[140%] h-[2px] bg-gray-800/50 -z-10 pointer-events-none"></div>
                                    <div className="absolute h-[140%] w-[2px] bg-gray-800/50 -z-10 pointer-events-none"></div>

                                    <button
                                        onClick={() => handleSelectNeighborhood(n)}
                                        className={`relative w-full h-full flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl sm:rounded-2xl transition-all duration-300 ease-out transform shadow-lg border-2
                                            ${isCurrent 
                                                ? 'bg-teal-600 border-teal-400 scale-105 sm:scale-110 shadow-teal-900/50 z-20' 
                                                : isSelected
                                                    ? 'bg-gray-700 border-white scale-105 z-20'
                                                    : 'bg-gray-800 border-gray-700 hover:border-gray-500 hover:bg-gray-750 hover:scale-105 hover:z-20'
                                            }
                                            ${hasEvent && !isCurrent ? 'border-yellow-500/50 shadow-yellow-900/20' : ''}
                                        `}
                                    >
                                         {hasEvent && (
                                             <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-30">
                                                <span className="relative flex h-4 w-4 sm:h-6 sm:w-6">
                                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                                  <span className="relative inline-flex rounded-full h-4 w-4 sm:h-6 sm:w-6 bg-yellow-500 items-center justify-center border-2 border-gray-900 text-gray-900 shadow-sm">
                                                      <MegaphoneIconSolid className="w-2 h-2 sm:w-3 sm:h-3" />
                                                  </span>
                                                </span>
                                             </div>
                                         )}

                                         {isCurrent && (
                                             <div className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 z-30 bg-white text-teal-600 rounded-full p-1 shadow-lg border-2 border-gray-900 animate-bounce">
                                                 <UserIcon className="w-3 h-3 sm:w-4 sm:h-4 stroke-[3]" />
                                             </div>
                                         )}

                                         <div className={`mb-1 sm:mb-2 p-1.5 sm:p-2 rounded-full ${isCurrent ? 'bg-white/20' : 'bg-black/20'}`}>
                                            <MapIcon className={`w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${isCurrent ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`} />
                                         </div>

                                         <span className={`text-[10px] sm:text-xs lg:text-sm font-bold text-center leading-tight line-clamp-2 ${isCurrent ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                             {n.name}
                                         </span>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                {/* Mobile Hint Overlay */}
                <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none md:hidden opacity-50">
                    <span className="bg-black/60 text-white text-[10px] px-3 py-1 rounded-full backdrop-blur-sm">Toque para ver detalhes</span>
                </div>
            </div>

            {/* --- DETALHES (Sidebar/Overlay) --- */}
            {/* Visible on mobile if selected. Always visible on desktop if selected or placeholder */}
            <div className={`
                w-full md:w-96 lg:w-[28rem] flex-shrink-0 bg-gray-900/95 md:bg-gray-900/90 md:border-l border-t md:border-t-0 border-gray-700/50 p-6 flex flex-col shadow-2xl backdrop-blur-xl z-30
                absolute md:relative inset-0 md:inset-auto h-full overflow-y-auto transition-all duration-300
                ${selectedNeighborhood ? 'flex' : 'hidden md:flex'}
            `}>
                {selectedNeighborhood ? (
                    <>
                        <button 
                            onClick={handleBackToMap}
                            className="md:hidden mb-6 flex items-center gap-2 text-gray-400 hover:text-white self-start"
                        >
                            <ArrowLeftIcon className="w-4 h-4" /> Voltar ao Mapa
                        </button>

                        <div className="mb-6">
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="text-3xl font-black text-white leading-tight tracking-tight">{selectedNeighborhood.name}</h3>
                                {selectedNeighborhood.currentEvent && (
                                    <div className="animate-pulse bg-yellow-500/20 p-2 rounded-lg border border-yellow-500/30" title="Evento Ativo">
                                        <MegaphoneIcon className="w-6 h-6 text-yellow-400" />
                                    </div>
                                )}
                            </div>
                            <div className="h-1 w-20 bg-teal-500 rounded-full my-3"></div>
                            <p className="text-sm text-gray-300 italic leading-relaxed">"{selectedNeighborhood.description}"</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-3 mb-6">
                            <InfoPill icon={<BanknotesIcon/>} label="Riqueza" value={selectedNeighborhood.wealthLevel} colorClass="text-green-400"/>
                            <InfoPill icon={<ShieldCheckIcon/>} label="Segurança" value={`${selectedNeighborhood.safety}/100`} colorClass="text-blue-400"/>
                        </div>

                        {selectedNeighborhood.currentEvent && (
                            <div className="mb-6 bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
                                <p className="text-xs font-bold text-yellow-500 uppercase mb-1 tracking-wider flex items-center gap-2">
                                    <MegaphoneIconSolid className="w-3 h-3"/> Evento em Andamento
                                </p>
                                <p className="text-sm font-bold text-yellow-100">{selectedNeighborhood.currentEvent.name}</p>
                                <p className="text-xs text-yellow-200/70 mt-1 line-clamp-2">{selectedNeighborhood.currentEvent.description}</p>
                            </div>
                        )}

                        <div className="mt-auto pt-6 border-t border-gray-800">
                            <button 
                                onClick={() => {
                                    onPlayerAction(`Viajar para ${selectedNeighborhood.name}`);
                                    onClose(); // Fecha o mapa após viajar
                                }}
                                disabled={selectedNeighborhood.id === currentNeighborhoodId}
                                className={`w-full flex items-center justify-center gap-3 font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-xl text-sm uppercase tracking-wider
                                    ${selectedNeighborhood.id === currentNeighborhoodId 
                                        ? 'bg-gray-800 text-gray-400 cursor-default border border-gray-700' 
                                        : 'bg-teal-600 hover:bg-teal-500 text-white shadow-teal-900/30 ring-1 ring-teal-500/50'
                                    }
                                `}
                            >
                                {selectedNeighborhood.id === currentNeighborhoodId ? (
                                    <>
                                        <MapPinIconSolid className="w-5 h-5"/>
                                        Local Atual
                                    </>
                                ) : (
                                    <>
                                        Viajar para cá
                                        <ArrowRightCircleIcon className="w-6 h-6"/>
                                    </>
                                )}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-center text-gray-500 space-y-6 opacity-60">
                        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center border-2 border-dashed border-gray-700">
                            <MapIcon className="w-10 h-10" />
                        </div>
                        <p className="font-medium max-w-[200px]">Selecione um distrito no mapa para visualizar os detalhes.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

export default React.memo(CityMapPanel);
