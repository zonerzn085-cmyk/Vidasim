
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { playlists } from '../data/music';
import {
    MusicalNoteIcon,
    ChevronDownIcon,
    XMarkIcon,
    SignalIcon,
    PlayCircleIcon
} from '@heroicons/react/24/solid';

function RadioPlayer(): React.ReactElement {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPlaylistId, setCurrentPlaylistId] = useState(playlists[0].id);
    const [currentPlaylistName, setCurrentPlaylistName] = useState(playlists[0].name);
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

    const handlePlaylistChange = (id: string, name: string) => {
        setCurrentPlaylistId(id);
        setCurrentPlaylistName(name);
    };

    return (
        <div className="relative" ref={menuRef}>
            {/* Botão Principal no Header */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-full border transition-all duration-300 shadow-lg ${
                    isOpen 
                    ? 'bg-green-600 border-green-500 text-white' 
                    : 'bg-gray-900/80 border-gray-700/50 text-green-400 hover:bg-gray-800'
                }`}
            >
                {isOpen ? <SignalIcon className="w-4 h-4 animate-pulse" /> : <MusicalNoteIcon className="w-4 h-4" />}
                <span className="text-xs font-bold hidden md:block">Spotify Rádio</span>
                <span className="text-[10px] opacity-70 max-w-[80px] truncate hidden lg:block">
                    {currentPlaylistName}
                </span>
                <ChevronDownIcon className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Painel Flutuante do Spotify */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-3 w-[300px] sm:w-[380px] bg-black border border-gray-700 rounded-2xl shadow-2xl overflow-hidden z-[60] animate-fade-in-up flex flex-col max-h-[500px]">
                    {/* Header do Player */}
                    <div className="bg-gradient-to-r from-green-900 to-black p-3 flex justify-between items-center border-b border-gray-800 flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="Spotify" className="h-5" />
                            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Estação</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Iframe do Spotify Embed */}
                    <div className="bg-black relative z-10 flex-shrink-0">
                        <iframe 
                            src={`https://open.spotify.com/embed/playlist/${currentPlaylistId}?utm_source=generator&theme=0`} 
                            width="100%" 
                            height="152" 
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                            loading="lazy"
                            className="border-0 block"
                            title="Spotify Player"
                        ></iframe>
                    </div>

                    {/* Filtros de Categoria */}
                    <div className="px-3 py-2 bg-gray-900 border-b border-gray-800 overflow-x-auto custom-scrollbar flex gap-2 flex-shrink-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                                    selectedCategory === cat 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Seletor de Estação */}
                    <div className="p-2 bg-gray-900 overflow-y-auto custom-scrollbar flex-grow max-h-[200px]">
                        <div className="space-y-1">
                            {filteredPlaylists.map((playlist) => (
                                <button
                                    key={playlist.id}
                                    onClick={() => handlePlaylistChange(playlist.id, playlist.name)}
                                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between group ${
                                        currentPlaylistId === playlist.id 
                                        ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <PlayCircleIcon className={`w-5 h-5 ${currentPlaylistId === playlist.id ? 'text-green-500' : 'text-gray-600 group-hover:text-white'}`} />
                                        <div className="flex flex-col">
                                            <span className="font-bold">{playlist.name}</span>
                                            {selectedCategory === 'Todos' && <span className="text-[9px] opacity-60 font-normal uppercase">{playlist.category}</span>}
                                        </div>
                                    </div>
                                    {currentPlaylistId === playlist.id && (
                                        <span className="flex h-2 w-2 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default React.memo(RadioPlayer);
