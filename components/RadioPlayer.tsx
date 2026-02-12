
import React, { useState, useRef, useEffect } from 'react';
import { tracks } from '../data/music';
import {
    PlayIcon,
    PauseIcon,
    ForwardIcon,
    BackwardIcon,
    SpeakerWaveIcon,
    SpeakerXMarkIcon,
    MusicalNoteIcon
} from '@heroicons/react/24/solid';

function RadioPlayer(): React.ReactElement {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [showVolumeControl, setShowVolumeControl] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);
    
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const playNextTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
        setIsPlaying(true); 
    };

    const playPrevTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
        setIsPlaying(true);
    };
    
    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;
        
        if (audio.paused) {
            audio.play().catch(e => {
                console.error("User-initiated play failed.", e);
                setIsPlaying(false);
            });
        } else {
            audio.pause();
        }
    };
    
    const handleEnded = () => {
        playNextTrack();
    };

    const handleError = () => {
        console.warn("Audio source failed for track:", tracks[currentTrackIndex].name);
        setIsPlaying(false);
    };

    const updatePlayState = () => {
        if (audioRef.current) {
            setIsPlaying(!audioRef.current.paused);
        }
    };

    return (
        <div className="flex items-center bg-gray-900/80 backdrop-blur-md p-1.5 rounded-full border border-gray-700/50 shadow-sm transition-all duration-300">
            <audio 
                ref={audioRef} 
                key={currentTrackIndex}
                src={tracks[currentTrackIndex].url}
                onEnded={handleEnded} 
                onPlay={updatePlayState}
                onPause={updatePlayState}
                onError={handleError}
                preload="auto"
                autoPlay={isPlaying}
            />
            
            <div className="flex items-center gap-1">
                {/* Mobile: Compact View */}
                <button onClick={togglePlayPause} className="p-1.5 text-teal-400 hover:text-teal-300 transition-colors bg-gray-800 rounded-full shadow-sm sm:hidden">
                    {isPlaying ? <PauseIcon className="w-4 h-4" /> : <MusicalNoteIcon className="w-4 h-4" />}
                </button>

                {/* Desktop: Full Controls */}
                <button onClick={playPrevTrack} className="hidden sm:block p-1 text-gray-400 hover:text-white transition-colors"><BackwardIcon className="w-4 h-4" /></button>
                <button onClick={togglePlayPause} className="hidden sm:block p-1 text-teal-400 hover:text-teal-300 transition-colors bg-gray-800 rounded-full shadow-sm">
                    {isPlaying ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
                </button>
                <button onClick={playNextTrack} className="hidden sm:block p-1 text-gray-400 hover:text-white transition-colors"><ForwardIcon className="w-4 h-4" /></button>
            </div>
            
            <div className="hidden sm:block w-px h-4 bg-gray-700 mx-2"></div>
            
            <div className="relative flex items-center ml-1 sm:ml-0 hidden sm:flex" onMouseEnter={() => setShowVolumeControl(true)} onMouseLeave={() => setShowVolumeControl(false)}>
                <button 
                    onClick={() => setVolume(v => v === 0 ? 0.5 : 0)} 
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                    {volume > 0 ? <SpeakerWaveIcon className="w-4 h-4" /> : <SpeakerXMarkIcon className="w-4 h-4" />}
                </button>
                
                {showVolumeControl && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-gray-800 p-2 rounded-lg shadow-xl border border-gray-700 z-50">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer custom-slider accent-teal-500"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default React.memo(RadioPlayer);
