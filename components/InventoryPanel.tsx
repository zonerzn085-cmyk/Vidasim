
import React from 'react';
import { ShopItem } from '../types';
import { 
    XMarkIcon, 
    ArchiveBoxIcon, 
    TruckIcon, 
    DevicePhoneMobileIcon, 
    StarIcon, 
    TagIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

interface InventoryPanelProps {
  inventory: ShopItem[];
  onClose: () => void;
  onUseItem: (item: ShopItem) => void;
}

function getIconForCategory(cat: string) {
    if (cat === 'Veículo') return <TruckIcon className="w-6 h-6"/>;
    if (cat === 'Eletrônico') return <DevicePhoneMobileIcon className="w-6 h-6"/>;
    if (cat === 'Item de Luxo') return <StarIcon className="w-6 h-6"/>;
    return <ArchiveBoxIcon className="w-6 h-6"/>;
}

function InventoryPanel({ inventory, onClose, onUseItem }: InventoryPanelProps): React.ReactElement {
  
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fade-in-up"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900/95 border border-gray-700/50 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md z-10">
          <div>
              <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                  <ArchiveBoxIcon className="w-8 h-8 text-amber-400" />
                  Mochila
              </h2>
              <p className="text-sm text-gray-400 font-medium mt-1">Seus pertences e equipamentos.</p>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6 bg-gray-950/50 custom-scrollbar">
            {inventory.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {inventory.map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="bg-gray-800/40 border border-gray-700/50 p-4 rounded-xl flex flex-col group hover:bg-gray-800/60 hover:border-amber-500/30 transition-all relative overflow-hidden">
                            <div className="flex justify-between items-start mb-3 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-700 rounded-lg text-amber-400 group-hover:text-amber-300 group-hover:bg-gray-600 transition-colors">
                                        {getIconForCategory(item.category)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">{item.name}</h3>
                                        <span className="text-[10px] text-gray-500 uppercase tracking-wide">{item.category}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-gray-400 mb-3 flex-grow leading-relaxed">
                                {item.description}
                            </p>

                            <div className="mt-auto space-y-3 relative z-10">
                                <div className="flex items-center gap-1.5 text-[10px] text-amber-200/80 bg-amber-900/20 px-2 py-1 rounded w-fit border border-amber-500/10">
                                    <TagIcon className="w-3 h-3" />
                                    {item.effect}
                                </div>

                                <button 
                                    onClick={() => onUseItem(item)}
                                    className="w-full py-2 bg-gray-700 hover:bg-amber-600 text-gray-200 hover:text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
                                >
                                    <SparklesIcon className="w-3 h-3" />
                                    Usar / Interagir
                                </button>
                            </div>
                            
                            {/* Decorative BG */}
                            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-60">
                    <ArchiveBoxIcon className="w-16 h-16 mb-4 text-gray-600"/>
                    <p className="font-medium">Sua mochila está vazia.</p>
                    <p className="text-xs mt-1">Visite o ShopZone para comprar itens.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(InventoryPanel);
