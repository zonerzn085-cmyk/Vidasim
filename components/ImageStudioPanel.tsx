import React, { useState } from 'react';
import { generateImageWithImagen } from '../services/geminiService';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface ImageStudioPanelProps {
  onClose: () => void;
}

const ASPECT_RATIOS = ["1:1", "16:9", "9:16", "4:3", "3:4"];
const ASPECT_RATIO_LABELS: { [key: string]: string } = {
    "1:1": "Quadrado",
    "16:9": "Paisagem",
    "9:16": "Retrato",
    "4:3": "Padrão",
    "3:4": "Vertical"
};


function ImageStudioPanel({ onClose }: ImageStudioPanelProps): React.ReactElement {
    const [prompt, setPrompt] = useState('');
    const [aspectRatio, setAspectRatio] = useState('1:1');
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setError("Por favor, insira uma descrição para a imagem.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        const imageB64 = await generateImageWithImagen(prompt, aspectRatio);

        if (imageB64) {
            setGeneratedImage(imageB64);
        } else {
            setError("Falha ao gerar a imagem. Verifique o console para mais detalhes e tente novamente.");
        }
        setIsLoading(false);
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-teal-300 flex items-center gap-3">
                        <PhotoIcon className="w-7 h-7" />
                        Estúdio de Imagem IA
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
                    <div className="w-full md:w-1/2 p-4 space-y-4 border-b md:border-b-0 md:border-r border-gray-700 flex flex-col">
                        <div>
                            <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">Descrição da Imagem</label>
                            <textarea
                                id="prompt"
                                rows={5}
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Ex: Um gato astronauta flutuando no espaço, com nebulosas coloridas ao fundo, estilo arte digital."
                                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                            />
                        </div>
                        <div>
                            <label htmlFor="aspect-ratio" className="block text-sm font-medium text-gray-300 mb-2">Proporção da Imagem</label>
                            <select
                                id="aspect-ratio"
                                value={aspectRatio}
                                onChange={(e) => setAspectRatio(e.target.value)}
                                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                {ASPECT_RATIOS.map(ratio => (
                                    <option key={ratio} value={ratio}>{ASPECT_RATIO_LABELS[ratio]} ({ratio})</option>
                                ))}
                            </select>
                        </div>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <div className="mt-auto pt-4">
                            <button
                                onClick={handleGenerate}
                                disabled={isLoading}
                                className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 disabled:bg-gray-600 disabled:cursor-wait"
                            >
                                {isLoading ? 'Gerando...' : 'Gerar Imagem'}
                            </button>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 p-4 flex items-center justify-center bg-gray-900/30 overflow-auto">
                        {isLoading && (
                             <div className="flex flex-col items-center justify-center text-gray-400">
                                <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                                <p>Criando sua obra-prima...</p>
                            </div>
                        )}
                        {!isLoading && generatedImage && (
                            <img 
                                src={`data:image/jpeg;base64,${generatedImage}`} 
                                alt="Imagem gerada por IA" 
                                className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                            />
                        )}
                         {!isLoading && !generatedImage && (
                            <div className="text-center text-gray-500">
                                <PhotoIcon className="w-16 h-16 mx-auto mb-2"/>
                                <p>Sua imagem aparecerá aqui.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(ImageStudioPanel);
