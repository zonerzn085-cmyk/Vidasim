
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { playlists, RadioStation } from '../data/music';
import {
    ChevronDownIcon,
    XMarkIcon,
    PlayCircleIcon,
    SignalIcon
} from '@heroicons/react/24/solid';

function RadioPlayer(): React.ReactElement {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStation, setCurrentStation] = useState<RadioStation>(playlists[0]);
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
    const menuRef = useRef<HTMLDivElement>(null);

    const categories = useMemo(() => ['Todos', ...Array.from(new Set(playlists.map(p => p.category)))], []);

    const filteredPlaylists = useMemo(() => {
        if (selectedCategory === 'Todos') return playlists;
        return playlists.filter(p => p.category === selectedCategory);
    }, [selectedCategory]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleStationChange = (station: RadioStation) => {
        setCurrentStation(station);
    };

    // Helper para gerar URL do YouTube Embed otimizada
    const getYouTubeUrl = (station: RadioStation) => {
        const origin = window.location.origin;
        // Parâmetros cruciais para evitar bloqueios e limpar a interface
        const params = `autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1&origin=${origin}`;
        
        if (station.id.startsWith('PL')) {
            return `https://www.youtube.com/embed/videoseries?list=${station.id}&${params}`;
        }
        return `https://www.youtube.com/embed/${station.id}?${params}`;
    };

    return (
        <div className="relative" ref={menuRef}>
            {/* Botão Principal no Header */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-full border transition-all duration-300 shadow-lg group ${
                    isOpen 
                    ? `bg-red-600 border-red-500 text-white` 
                    : `bg-black/40 border-gray-700/50 text-gray-300 hover:bg-black/60 hover:text-white`
                }`}
            >
                {/* Ícone Animado */}
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isOpen ? 'border-white animate-spin' : 'border-red-500'}`}>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
                
                <span className="text-xs font-bold hidden md:block tracking-wide">YT Music</span>
                <span className="text-[10px] opacity-70 max-w-[80px] truncate hidden lg:block group-hover:opacity-100 transition-opacity">
                    {currentStation.name}
                </span>
                <ChevronDownIcon className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Painel Flutuante */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-3 w-[300px] sm:w-[380px] bg-black border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-[60] animate-fade-in-up flex flex-col max-h-[500px] ring-1 ring-white/10">
                    {/* Header do Player */}
                    <div className="bg-gradient-to-r from-gray-900 to-black p-4 flex justify-between items-center border-b border-gray-800 flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-900/50">
                                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[6px] border-l-white border-b-[3px] border-b-transparent ml-0.5"></div>
                            </div>
                            <span className="text-sm font-black text-white tracking-tighter">Music</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-800 rounded-full">
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Área do Player (Iframe do YouTube) */}
                    <div className="bg-black relative z-10 flex-shrink-0 aspect-video border-b border-gray-800">
                        <iframe 
                            src={getYouTubeUrl(currentStation)}
                            width="100%" 
                            height="100%" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="border-0 block"
                            title="YouTube Player"
                        ></iframe>
                    </div>

                    {/* Filtros de Categoria */}
                    <div className="px-4 py-3 bg-gray-950 border-b border-gray-800 overflow-x-auto custom-scrollbar flex gap-2 flex-shrink-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                                    selectedCategory === cat 
                                    ? `bg-white text-black shadow-md` 
                                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Seletor de Estação */}
                    <div className="p-2 bg-black overflow-y-auto custom-scrollbar flex-grow max-h-[220px]">
                        <div className="space-y-1">
                            {filteredPlaylists.map((station) => {
                                const isStationActive = currentStation.id === station.id;
                                
                                return (
                                    <button
                                        key={station.id}
                                        onClick={() => handleStationChange(station)}
                                        className={`w-full text-left px-3 py-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between group ${
                                            isStationActive
                                            ? `bg-gray-900 text-white` 
                                            : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {isStationActive ? (
                                                <div className="w-5 h-5 flex items-center justify-center">
                                                    <div className="flex gap-0.5 items-end h-3">
                                                        <div className="w-0.5 h-1.5 bg-red-500 animate-pulse"></div>
                                                        <div className="w-0.5 h-3 bg-red-500 animate-pulse [animation-delay:0.1s]"></div>
                                                        <div className="w-0.5 h-2 bg-red-500 animate-pulse [animation-delay:0.2s]"></div>
                                                    </div>
                                                </div>
                                            ) : (
                                                station.isLive ? 
                                                <SignalIcon className="w-5 h-5 text-red-500 group-hover:text-red-400" /> :
                                                <PlayCircleIcon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                                            )}
                                            
                                            <div className="flex flex-col">
                                                <span className={`font-bold ${isStationActive ? 'text-red-500' : 'text-gray-200'}`}>
                                                    {station.name}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    {station.isLive && <span className="text-[8px] uppercase font-bold bg-red-900/50 text-red-400 px-1 rounded">AO VIVO</span>}
                                                    {selectedCategory === 'Todos' && (
                                                        <span className="text-[9px] opacity-50 font-normal uppercase tracking-wide">
                                                            {station.category}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default React.memo(RadioPlayer);
