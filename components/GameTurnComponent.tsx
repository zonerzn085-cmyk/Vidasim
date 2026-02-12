
import React from 'react';
import { GameTurn } from '../types';
import { useUI } from '../contexts/UIContext';
import { SparklesIcon } from '@heroicons/react/24/solid';

interface GameTurnProps {
  turn: GameTurn;
  isLatest?: boolean;
}

const parseText = (text: string) => {
    // Regex matches **bold**, *italic*, or normal text
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="text-teal-200 font-bold">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={index} className="text-gray-300">{part.slice(1, -1)}</em>;
        }
        return part;
    });
};

const getSmartSummary = (text: string) => {
    if (!text) return "";
    // Try to get the first paragraph
    const firstParagraph = text.split('\n')[0];
    if (firstParagraph.length > 20 && firstParagraph.length < 250) return firstParagraph;
    
    // If first paragraph is huge or tiny, try first 2 sentences
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    if (sentences.length > 0) {
        const twoSentences = sentences.slice(0, 2).join(' ');
        if (twoSentences.length < 250) return twoSentences;
        return sentences[0]; // Just first sentence
    }
    
    // Fallback: Smart slice
    if (text.length > 150) return text.slice(0, 150).trim() + "...";
    return text;
};

const GameTurnComponent: React.FC<GameTurnProps> = ({ turn }) => {
    const { isSummaryMode } = useUI();
    
    // Ensure turn.text is a valid string
    const safeText = typeof turn.text === 'string' ? turn.text : JSON.stringify(turn.text || "");
    
    const isPlayer = turn.speaker === 'player';

    // Format Date: DD/MM/YYYY
    const formattedDate = turn.speaker === 'system' && turn.date 
        ? `${String(turn.date.day).padStart(2, '0')}/${String(turn.date.month).padStart(2, '0')}/${turn.date.year}`
        : null;

    // Summary Logic
    const shouldShowSummary = !isPlayer && isSummaryMode;
    
    // If explicit summary exists and is not empty/too short, use it. 
    // Otherwise derive a smart summary from the full text.
    const displayText = shouldShowSummary 
        ? (turn.summary && turn.summary.length > 10 ? turn.summary : getSmartSummary(safeText))
        : safeText;

    return (
        <div className={`flex ${isPlayer ? 'justify-end' : 'justify-start'} animate-fade-in-up mb-2 group`}>
            <div className={`
                max-w-[85%] sm:max-w-xl 
                p-3 sm:p-4 
                rounded-2xl 
                shadow-md 
                border 
                backdrop-blur-sm 
                transition-all
                text-sm sm:text-base
                ${isPlayer 
                    ? 'bg-teal-600/90 text-white rounded-br-none border-teal-500/30 shadow-teal-900/20' 
                    : shouldShowSummary
                        ? 'bg-gray-900/80 text-teal-100/90 rounded-bl-none border-teal-500/20 shadow-black/20' // Removed italic to improve readability
                        : 'bg-gray-800/90 text-gray-100 rounded-bl-none border-gray-700/50 shadow-black/20'
                }
            `}>
                {formattedDate && !shouldShowSummary && (
                    <div className="flex items-center gap-2 text-[10px] text-teal-300/70 pb-2 mb-2 border-b border-white/5 font-mono uppercase tracking-widest">
                        <span>{formattedDate}</span>
                    </div>
                )}

                {shouldShowSummary && (
                    <div className="flex items-center gap-1.5 text-[10px] text-teal-500 font-black uppercase tracking-tighter mb-1 animate-pulse">
                        <SparklesIcon className="w-3 h-3" />
                        Resumo IA
                    </div>
                )}

                <p className="whitespace-pre-wrap leading-relaxed">
                    {parseText(displayText)}
                    {turn.speaker === 'system' && !turn.text && !turn.summary && (
                        <span className="inline-block w-1.5 h-4 ml-0.5 bg-teal-400 animate-pulse align-middle opacity-70 rounded-full"></span>
                    )}
                </p>
            </div>
        </div>
    );
};

export default React.memo(GameTurnComponent);
