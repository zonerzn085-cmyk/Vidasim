
import React, { useState, useEffect } from 'react';
import { ShopItem, PlayerStats } from '../types';
import { XMarkIcon, ShoppingCartIcon, TruckIcon, DevicePhoneMobileIcon, StarIcon, ArchiveBoxIcon, TagIcon } from '@heroicons/react/24/outline';
import { fetchShopItems } from '../services/geminiService';
import { Content } from '@google/genai';

interface ShoppingDialogProps {
    playerStats: PlayerStats;
    history: Content[];
    onBuy: (itemName: string, price: number) => void;
    onClose: () => void;
}

const CATEGORIES = ['Todos', 'Veículo', 'Eletrônico', 'Item de Luxo', 'Outro'];

function getIconForCategory(cat: string) {
    if (cat === 'Veículo') return <TruckIcon className="w-8 h-8"/>;
    if (cat === 'Eletrônico') return <DevicePhoneMobileIcon className="w-8 h-8"/>;
    if (cat === 'Item de Luxo') return <StarIcon className="w-8 h-8"/>;
    return <ArchiveBoxIcon className="w-8 h-8"/>;
}

// Skeleton Loader for sleek loading state
const ShopSkeleton = () => (
    <div className="bg-gray-800/40 rounded-2xl p-4 border border-gray-700/50 animate-pulse flex flex-col h-[200px]">
        <div className="w-12 h-12 bg-gray-700 rounded-xl mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-700/50 rounded w-full mb-2"></div>
        <div className="mt-auto h-8 bg-gray-700 rounded w-full"></div>
    </div>
);

function ShoppingDialog({ playerStats, history, onBuy, onClose }: ShoppingDialogProps): React.ReactElement {
    const [items, setItems] = useState<ShopItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Todos');

    useEffect(() => {
        let isMounted = true;
        const loadItems = async () => {
            // Priority: Load from the state populated by Pro Logic
            if (playerStats.currentNeighborhood?.shopItems && playerStats.currentNeighborhood.shopItems.length > 0) {
                 if(isMounted) {
                     setItems(playerStats.currentNeighborhood.shopItems);
                     setIsLoading(false);
                 }
                 return;
            }

            // Fallback: Fetch if empty
            try {
                const fetchedItems = await fetchShopItems(playerStats, history);
                if (isMounted) {
                    setItems(fetchedItems || []);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Failed to load shop items", error);
                if (isMounted) setIsLoading(false);
            }
        };
        loadItems();
        return () => { isMounted = false; };
    }, [playerStats, history]);

    const filteredItems = activeTab === 'Todos' ? items : items.filter(i => i.category === activeTab);

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fade-in-up"
            onClick={onClose}
        >
            <div 
                className="bg-gray-900/95 border border-gray-700/50 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                     <ShoppingCartIcon className="w-64 h-64 text-teal-500" />
                </div>

                <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md z-10">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            <span className="text-teal-400">Shop</span>Zone
                        </h2>
                        <p className="text-sm text-gray-400 font-medium mt-1">Gaste seu dinheiro suado com estilo.</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="bg-gray-800 px-4 py-2 rounded-full border border-gray-700 flex flex-col items-end">
                            <span className="text-[10px] text-gray-400 uppercase font-bold">Saldo</span>
                            <span className="text-green-400 font-mono font-bold">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(playerStats.money)}
                            </span>
                        </div>
                        <button onClick={onClose} className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                
                <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/50 overflow-x-auto no-scrollbar">
                    <div className="flex gap-2">
                        {CATEGORIES.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                                    activeTab === tab
                                    ? 'bg-teal-500 text-white border-teal-400 shadow-lg shadow-teal-500/20'
                                    : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto p-6 bg-gray-950/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {isLoading ? (
                            Array.from({ length: 6 }).map((_, i) => <ShopSkeleton key={i} />)
                        ) : filteredItems.length > 0 ? (
                            filteredItems.map((item, idx) => {
                                const canAfford = playerStats.money >= item.price;
                                return (
                                    <div key={idx} className="bg-gray-800/40 hover:bg-gray-800/60 p-5 rounded-2xl border border-gray-700/50 hover:border-teal-500/30 transition-all flex flex-col group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-500/10 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>
                                        
                                        <div className="flex justify-between items-start mb-4 relative z-10">
                                            <div className="p-3 bg-gray-700/50 rounded-xl text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                                                {getIconForCategory(item.category)}
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-lg font-bold font-mono ${canAfford ? 'text-green-400' : 'text-red-400'}`}>
                                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">{item.name}</h3>
                                        <p className="text-xs text-gray-400 mb-4 line-clamp-2 min-h-[2.5em]">{item.description}</p>
                                        
                                        <div className="mt-auto">
                                            <div className="flex items-center gap-1.5 text-[10px] text-yellow-300 bg-yellow-900/20 px-2 py-1 rounded w-fit mb-3 border border-yellow-500/20">
                                                <TagIcon className="w-3 h-3" />
                                                {item.effect}
                                            </div>
                                            
                                            <button 
                                                onClick={() => onBuy(item.name, item.price)}
                                                disabled={!canAfford}
                                                className={`w-full py-3 rounded-xl font-bold text-sm transition-all transform active:scale-95 shadow-lg
                                                    ${canAfford 
                                                        ? 'bg-white text-black hover:bg-teal-400 hover:text-white shadow-white/5' 
                                                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                                    }`}
                                            >
                                                {canAfford ? 'Comprar Agora' : 'Sem Saldo'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500 opacity-60">
                                <ArchiveBoxIcon className="w-16 h-16 mb-4"/>
                                <p>Nenhum item encontrado.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(ShoppingDialog);
