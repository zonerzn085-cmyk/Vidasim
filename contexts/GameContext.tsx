
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Content } from '@google/genai';
import { PlayerStats, GameTurn, Tombstone, SaveData, CharacterCreationData, Neighborhood, PlayerProfile } from '../types';
import C from '../constants';
import { sendMessageToGameStream, runAiDirectorAnalysis, fetchNeighborhoodData, fetchBusinessData } from '../services/geminiService';
import { migrate } from '../services/migrationService';
import { storageService } from '../services/storageService';
import { getCityNeighborhoods } from '../data/names'; 
import { baseCityStructure } from '../data/cityData'; 
import { useAuth } from './AuthContext';
import { useUI } from './UIContext';

type GameState = 'loading' | 'menu' | 'creator' | 'playing';
type GenerationMode = 'robust' | 'concise';

interface GameContextType {
    // State
    gameState: GameState;
    setGameState: (state: GameState) => void;
    playerStats: PlayerStats;
    setPlayerStats: React.Dispatch<React.SetStateAction<PlayerStats>>;
    gameLog: GameTurn[];
    history: Content[];
    isLoading: boolean;
    isGameOver: boolean;
    tombstone: Tombstone | null;
    savedLives: SaveData[];
    saveMessage: string;
    currentLifeId: string | null;
    generationMode: GenerationMode;
    setGenerationMode: (mode: GenerationMode) => void;
    
    // Notifications
    ageUpMessage: string | null;
    eventNotification: string | null;
    showMigrationNotification: boolean;
    setShowMigrationNotification: (show: boolean) => void;

    // Actions
    handlePlayerAction: (action: string) => Promise<void>;
    saveGame: (isAutoSave?: boolean, statsOverride?: PlayerStats, logOverride?: GameTurn[], historyOverride?: Content[], lifeIdOverride?: string) => Promise<void>;
    loadGame: (id: string) => void;
    deleteLife: (id: string) => void;
    startCustomGame: (data: CharacterCreationData, mode: GenerationMode) => Promise<void>;
    quickStart: (mode: GenerationMode) => Promise<void>;
    instantPlay: (saveData: SaveData) => void;
    resetGame: () => void;
    goToMenu: () => void;
    
    // Data Fetching Wrappers
    fetchNeighborhoodData: (neighborhoodId: string, category: keyof typeof fetchNeighborhoodData) => Promise<void>;
    fetchBusinessData: (category: keyof typeof fetchBusinessData) => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children?: React.ReactNode }) {
    // --- Core State ---
    const [history, setHistory] = useState<Content[]>([]);
    const [currentLifeId, setCurrentLifeId] = useState<string | null>(null);
    const [playerStats, setPlayerStats] = useState<PlayerStats>(C.INITIAL_PLAYER_STATS);
    const [gameLog, setGameLog] = useState<GameTurn[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [tombstone, setTombstone] = useState<Tombstone | null>(null);
    const [gameState, setGameState] = useState<GameState>('loading');
    const [savedLives, setSavedLives] = useState<SaveData[]>([]);
    const [saveMessage, setSaveMessage] = useState('');
    const [generationMode, setGenerationMode] = useState<GenerationMode>('robust');
    
    // --- UI Notifications ---
    const [ageUpMessage, setAgeUpMessage] = useState<string | null>(null);
    const [eventNotification, setEventNotification] = useState<string | null>(null);
    const [showMigrationNotification, setShowMigrationNotification] = useState(false);

    // --- Hooks ---
    const { uploadSave, isAuthenticated } = useAuth();
    const { toggleSummaryMode, isSummaryMode } = useUI();

    // --- Initialization ---
    useEffect(() => {
        const lives = storageService.getSaves();
        let wereSavesMigrated = false;
        
        if (lives.length > 0) {
            const migratedLives = lives.reduce<SaveData[]>((acc, life) => {
                try {
                    if (life && typeof life === 'object') {
                        if ((life.version || 1) < C.CURRENT_SAVE_VERSION) {
                            wereSavesMigrated = true;
                        }
                        const migratedLife = migrate(life);
                        acc.push(migratedLife);
                    }
                } catch (error) {
                    console.error(`Failed to migrate save file.`, error);
                    acc.push(life);
                }
                return acc;
            }, []);
            
            if (wereSavesMigrated) {
                setShowMigrationNotification(true);
                storageService.saveAll(migratedLives);
                setSavedLives(migratedLives);
            } else {
                setSavedLives(lives);
            }
        } else {
            setSavedLives([]);
        }
        
        setGameState('menu');
    }, []);

    // --- Persistence ---
    const saveGame = useCallback(async (
        isAutoSave = false, 
        statsOverride?: PlayerStats, 
        logOverride?: GameTurn[], 
        historyOverride?: Content[],
        lifeIdOverride?: string
    ) => {
        const targetId = lifeIdOverride || currentLifeId;
        if (!targetId) return;

        const statsToSave = statsOverride || playerStats;
        const logToSave = logOverride || gameLog;
        const historyToSave = historyOverride || history;

        if (!isAutoSave) setSaveMessage('Salvando...');
        else setSaveMessage('Auto-save...');

        const newSaveData: SaveData = {
            id: targetId,
            playerStats: statsToSave,
            gameLog: logToSave,
            history: historyToSave,
            version: C.CURRENT_SAVE_VERSION,
        };
        
        // 1. Local Cache Save (Synchronous-ish) - Kept for speed/offline capability during session
        const success = storageService.saveLife(newSaveData);
        if (success) {
            setSavedLives(storageService.getSaves());
        }

        // 2. Cloud Save (Immediate)
        if (isAuthenticated) {
            // Trim heavy history for cloud to avoid payload limits
            const cloudSave = { ...newSaveData, history: [] }; 
            uploadSave(cloudSave); 
        }
        
        // UI Feedback
        if (success) {
            if (!isAutoSave) {
                setSaveMessage(isAuthenticated ? 'Salvo na Nuvem!' : 'Salvo!');
                setTimeout(() => setSaveMessage(''), 2000);
            } else {
                setTimeout(() => setSaveMessage(''), 1000);
            }
        } else if (!isAutoSave) {
            setSaveMessage('Erro ao salvar!');
            setTimeout(() => setSaveMessage(''), 3000);
        }
    }, [currentLifeId, playerStats, gameLog, history, isAuthenticated, uploadSave]);

    // Auto-save
    useEffect(() => {
        const handleBeforeUnload = () => { if (gameState === 'playing') saveGame(true); };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [saveGame, gameState]);

    useEffect(() => {
        if (gameState !== 'playing') return;
        const interval = setInterval(() => { if (currentLifeId) saveGame(true); }, 30000);
        return () => clearInterval(interval);
    }, [gameState, saveGame, currentLifeId]);

    // --- Game Logic ---

    const handleStreamStart = useCallback(async (initialPrompt: string, baseStats: PlayerStats, lifeId: string, cityName: string = 'São Paulo') => {
        const styleInstruction = generationMode === 'concise' 
            ? "MODO ATIVO: RESUMO. Gere apenas 1 parágrafo curto e direto ao ponto. Preencha 'eventSummary' com uma versão sintetizada." 
            : "MODO ATIVO: ROBUSTO. Gere uma narrativa detalhada e envolvente.";
        
        const finalPrompt = `${initialPrompt}\n\n${styleInstruction}`;

        const stream = sendMessageToGameStream([], finalPrompt, baseStats);
        
        let accumulatedText = "";
        let finalStats = { ...baseStats };
        const newLog: GameTurn[] = [{ speaker: 'system', text: '', date: { day: 1, month: 1, year: 2024 } }]; 
        setGameLog(newLog);
        
        const cityTemplate = getCityNeighborhoods(cityName) || baseCityStructure;
        const initialCity = cityTemplate.map((n, index) => ({
            id: `neighborhood_${index}_${Date.now()}`,
            name: n.name,
            description: n.description || `Um bairro característico de ${cityName}.`,
            safety: n.safety,
            wealthLevel: n.wealthLevel,
            position: (n as any).position || { x: index % 3, y: Math.floor(index / 3) }, 
            buildings: [],
            notableNPCs: [],
            propertiesForSale: [],
            localJobs: [],
            currentEvent: null,
        }));
        
        setPlayerStats({ ...baseStats, city: initialCity, currentNeighborhood: initialCity[0] });

        try {
            for await (const update of stream) {
                if (update.type === 'stats') {
                    const { statChanges, eventSummary } = update.payload;
                    let city = statChanges.city || initialCity;
                    if (!statChanges.city && initialCity.length > 0) city = initialCity;

                    let currentNeighborhood = statChanges.currentNeighborhood;
                    if (!currentNeighborhood) {
                         const currentId = finalStats.currentNeighborhood?.id;
                         currentNeighborhood = city.find((n: Neighborhood) => n.id === currentId) || city[0];
                    }

                    finalStats = { ...baseStats, ...statChanges, city, currentNeighborhood };
                    if (baseStats.name && baseStats.name !== "Ninguém") {
                        finalStats.name = baseStats.name;
                    }

                    setPlayerStats(finalStats);

                    if (eventSummary) {
                        setGameLog(prev => {
                            const updated = [...prev];
                            updated[0] = { ...updated[0], summary: eventSummary };
                            return updated;
                        });
                    }
                }
                if (update.type === 'text') {
                    const cleanChunk = update.payload.replace("|||CHOICES:", "").replace("[", "");
                    accumulatedText += cleanChunk;
                    setGameLog(prev => {
                        const updated = [...prev];
                        updated[0] = { ...updated[0], text: accumulatedText };
                        return updated;
                    });
                }
            }
        } catch (e) {
            console.error("Initialization Stream Error", e);
        }

        const newHistory = [
            { role: 'user', parts: [{ text: finalPrompt }] } as Content, 
            { role: 'model', parts: [{ text: accumulatedText }] } as Content
        ];
        setHistory(newHistory);
        setIsLoading(false);
        
        const firstTurnLog = [{ 
            speaker: 'system' as const, 
            text: accumulatedText, 
            summary: finalStats.currentNeighborhood?.description.slice(0, 50), 
            date: { day: finalStats.day, month: finalStats.month, year: finalStats.year } 
        }];
        
        saveGame(true, finalStats, firstTurnLog, newHistory, lifeId);
    }, [saveGame, generationMode]);

    const handlePlayerAction = useCallback(async (action: string) => {
        if (isLoading) return;
        
        const oldStats = { ...playerStats };
        const oldAge = playerStats.age;
        setIsLoading(true);
        
        const playerTurn: GameTurn = { speaker: 'player', text: action };
        const pendingSystemTurn: GameTurn = { 
            speaker: 'system', text: '', date: { day: playerStats.day, month: playerStats.month, year: playerStats.year } 
        };
        
        setGameLog(prev => [...prev, playerTurn, pendingSystemTurn]);

        let statsForAI = { ...playerStats };
        const chaosRoll = Math.random();
        
        // BUILD PROMPT WITH MODE INSTRUCTION
        let promptAction = action;
        if (chaosRoll < 0.20 && action.length > 5) {
             promptAction += " (Sistema: OBRIGATÓRIO: Gere um evento aleatório inesperado e dramático junto com a consequência desta ação.)";
        }
        
        // INJECT STYLE INSTRUCTION
        const styleInstruction = generationMode === 'concise' 
            ? "\n\n[INSTRUÇÃO: MODO RESUMO ATIVO. Gere um texto curto (1 parágrafo), direto ao ponto. Preencha 'eventSummary' com uma síntese lida do texto gerado.]" 
            : "\n\n[INSTRUÇÃO: MODO ROBUSTO ATIVO. Gere um texto detalhado (3+ parágrafos), imersivo e literário. Preencha 'eventSummary' com uma síntese.]";
        
        const finalPrompt = promptAction + styleInstruction;

        const stream = sendMessageToGameStream(history, finalPrompt, statsForAI);
        
        let accumulatedText = "";
        let accumulatedSummary = "";
        let finalStats = { ...statsForAI };
        let isGameOverResult = false;
        let tombstoneResult = null;

        try {
            for await (const update of stream) {
                if (update.type === 'stats') {
                    const { statChanges, isGameOver, tombstone, eventSummary } = update.payload;
                    if (eventSummary) accumulatedSummary = eventSummary;

                    const previousAge = finalStats.age;
                    const newAge = statChanges.age;
                    let displayYear = statChanges.year;

                    if (newAge !== undefined && newAge > previousAge) {
                        const ageDiff = newAge - previousAge;
                        const currentYear = finalStats.year;
                        
                        if (!statChanges.year || statChanges.year === currentYear) {
                            displayYear = currentYear + ageDiff;
                            statChanges.year = displayYear; 
                        }
                    }

                    setPlayerStats(prev => {
                        const newStats = { ...prev, ...statChanges };
                        if (statChanges.currentNeighborhood) newStats.currentNeighborhood = { ...prev.currentNeighborhood!, ...statChanges.currentNeighborhood };
                        if (statChanges.business) newStats.business = { ...prev.business!, ...statChanges.business };
                        if (statChanges.memories && Array.isArray(statChanges.memories)) {
                            if (prev.memories.length > 5 && statChanges.memories.length === 1) {
                                newStats.memories = [...prev.memories, ...statChanges.memories];
                            } else {
                                newStats.memories = statChanges.memories;
                            }
                        }
                        finalStats = newStats;
                        return newStats;
                    });

                    isGameOverResult = isGameOver;
                    tombstoneResult = tombstone;
                    
                    setGameLog(prev => {
                        const newLog = [...prev];
                        const lastIdx = newLog.length - 1;
                        if (lastIdx >= 0 && newLog[lastIdx].speaker === 'system') {
                             newLog[lastIdx] = { 
                                 ...newLog[lastIdx], 
                                 summary: eventSummary || newLog[lastIdx].summary,
                                 date: { 
                                     day: statChanges.day || prev[lastIdx].date?.day || 1, 
                                     month: statChanges.month || prev[lastIdx].date?.month || 1, 
                                     year: displayYear || prev[lastIdx].date?.year || 2024 
                                 } 
                             };
                        }
                        return newLog;
                    });
                }
                
                if (update.type === 'text') {
                    const cleanChunk = update.payload.replace("|||CHOICES:", "").replace("[", "");
                    accumulatedText += cleanChunk;
                    setGameLog(prev => {
                        const newLog = [...prev];
                        const lastIdx = newLog.length - 1;
                        if (lastIdx >= 0 && newLog[lastIdx].speaker === 'system') {
                            newLog[lastIdx] = { ...newLog[lastIdx], text: accumulatedText };
                        }
                        return newLog;
                    });
                }
            }
        } catch (e) {
            console.error("Stream loop error", e);
             setGameLog(prev => [...prev, { speaker: 'system', text: "Ocorreu um erro na conexão com a realidade. Tente novamente." }]);
        }

        const newHistory = [...history, { role: 'user', parts: [{ text: `Ação: "${promptAction}"\nEstado: ${JSON.stringify(finalStats)}` }] } as Content, { role: 'model', parts: [{ text: accumulatedText }]} as Content];
        setHistory(newHistory);

        if (finalStats.age > oldAge) {
            setAgeUpMessage(`Você fez ${finalStats.age} anos!`);
            setTimeout(() => setAgeUpMessage(null), 2500);
        }

        const oldEventId = oldStats.currentNeighborhood?.currentEvent?.id;
        const newEvent = finalStats.currentNeighborhood?.currentEvent;
        if (newEvent && newEvent.id !== oldEventId) {
            setEventNotification(newEvent.name);
            setTimeout(() => setEventNotification(null), 4000);
        }
        
        if (isGameOverResult && tombstoneResult) {
            setIsGameOver(true);
            setTombstone(tombstoneResult);
            deleteLife(currentLifeId!);
        } else {
            const finalLogForSave = [...gameLog, playerTurn, { speaker: 'system', text: accumulatedText, summary: accumulatedSummary, date: { day: finalStats.day, month: finalStats.month, year: finalStats.year } } as GameTurn];
            saveGame(true, finalStats, finalLogForSave, newHistory);
            
            const currentYear = finalStats.year;
            const lastAnalysisYear = finalStats.playerProfile?.lastUpdatedYear ?? 0;
            if (currentYear > 0 && currentYear > lastAnalysisYear && currentYear % 5 === 0) {
                const analysis = await runAiDirectorAnalysis(newHistory, finalStats);
                if (analysis) {
                    const newProfile: PlayerProfile = { ...analysis, lastUpdatedYear: currentYear };
                    setPlayerStats(prev => ({ ...prev, playerProfile: newProfile }));
                }
            }
        }
        setIsLoading(false);
    }, [gameLog, isLoading, currentLifeId, playerStats, history, saveGame, generationMode]);

    // --- Actions ---

    const startCustomGame = useCallback(async (customData: CharacterCreationData, mode: GenerationMode) => {
        setGenerationMode(mode); 
        const newLifeId = Date.now().toString();
        setCurrentLifeId(newLifeId);
        setGameState('playing');
        setIsLoading(true);
        
        const isMillionaire = customData.socialClass === 'Milionário';
        const startingMoney = isMillionaire ? 10000000 : C.INITIAL_PLAYER_STATS.money;
        const startingNotoriety = isMillionaire ? 25 : 0;
        
        const initialStats = { 
            ...C.INITIAL_PLAYER_STATS, 
            name: customData.name,
            money: startingMoney,
            notoriety: startingNotoriety,
            happiness: isMillionaire ? 90 : C.INITIAL_PLAYER_STATS.happiness
        };

        setPlayerStats(initialStats);
        setIsGameOver(false);
        setTombstone(null);
        setHistory([]);
        
        const initialPrompt = `
        Começar uma nova vida com as seguintes características:
        - Nome: ${customData.name}
        - Gênero: ${customData.gender}
        - País: ${customData.country}
        - Cidade: ${customData.city}
        - Classe Social: ${customData.socialClass}
        - Hobby: ${customData.hobby}
        - Atributos Iniciais: Saúde(${customData.stats.health}), Felicidade(${customData.stats.happiness}), Inteligência(${customData.stats.intelligence}), Aparência(${customData.stats.appearance}).

        Use EXATAMENTE estes dados para iniciar a vida do personagem. A data inicial é 1 de Janeiro de 2024.
        IMPORTANTE: O personagem vive em ${customData.city}, ${customData.country}. 
        ${isMillionaire ? 'NOTA: O personagem é um MILIONÁRIO. Ele deve começar morando em um bairro de luxo, talvez com uma herança ou negócios da família. Descreva este início privilegiado.' : ''}
        OBRIGATÓRIO: Gere no JSON de resposta (em statChanges.relationships) os pais do personagem (Pai e Mãe).
        `;
        
        await handleStreamStart(initialPrompt, initialStats, newLifeId, customData.city);
    }, [handleStreamStart]);

    const quickStart = useCallback(async (mode: GenerationMode) => {
        setGenerationMode(mode);
        const newLifeId = Date.now().toString();
        setCurrentLifeId(newLifeId);
        setGameState('playing');
        setIsLoading(true);
        setPlayerStats(C.INITIAL_PLAYER_STATS);
        setIsGameOver(false);
        setTombstone(null);
        setHistory([]);
    
        const initialPrompt = `Começar uma vida aleatória no Brasil. Gere o personagem e a situação inicial. A data inicial DEVE ser 1 de Janeiro de 2024.
        OBRIGATÓRIO: Gere no JSON de resposta (em statChanges.relationships) os pais do personagem (Pai e Mãe).`;
        
        await handleStreamStart(initialPrompt, C.INITIAL_PLAYER_STATS, newLifeId, 'São Paulo');
    }, [handleStreamStart]);

    const instantPlay = useCallback((saveData: SaveData) => {
        setIsLoading(true);
        const migratedData = migrate(saveData);
        storageService.saveLife(migratedData);
        setSavedLives(storageService.getSaves());

        setCurrentLifeId(migratedData.id);
        setPlayerStats(migratedData.playerStats);
        setGameLog(migratedData.gameLog);
        setHistory(migratedData.history as Content[]);
        setGenerationMode('robust'); 
        
        setGameState('playing');
        setIsGameOver(false);
        setTombstone(null);
        setIsLoading(false);
    }, []);

    const loadGame = useCallback((id: string) => {
        const currentSaves = storageService.getSaves();
        const savedData = currentSaves.find(life => life.id === id);
        if (!savedData) return;

        setIsLoading(true);
        setCurrentLifeId(id);
        setPlayerStats(savedData.playerStats);
        setGameLog(savedData.gameLog);
        setHistory(savedData.history as Content[]);
        setGenerationMode('robust'); // Default on load
        
        setGameState('playing');
        setIsGameOver(false);
        setTombstone(null);
        setIsLoading(false);
    }, []);

    const deleteLife = useCallback((id: string) => {
        const updatedSaves = storageService.deleteLife(id);
        setSavedLives(updatedSaves);
    }, []);

    const goToMenu = useCallback(async () => {
        if (gameState === 'playing') await saveGame();
        setGameState('menu');
        setCurrentLifeId(null);
        setHistory([]);
        setGameLog([]);
    }, [saveGame, gameState]);

    const resetGame = useCallback(() => {
        setIsGameOver(false);
        setTombstone(null);
        setGameState('menu');
        setCurrentLifeId(null);
        setHistory([]);
        setGameLog([]);
    }, []);

    const wrapperFetchNeighborhoodData = useCallback(async (neighborhoodId: string, category: keyof typeof fetchNeighborhoodData) => {
        const targetNeighborhood = playerStats.city.find(n => n.id === neighborhoodId);
        if (!targetNeighborhood) return;
        const data = await fetchNeighborhoodData[category](targetNeighborhood.name, history);

        setPlayerStats(prevStats => {
            const updateNeighborhood = (n: Neighborhood) => {
                if (n.id === neighborhoodId) return { ...n, [category]: data };
                return n;
            };
            const newCity = prevStats.city.map(updateNeighborhood);
            const newCurrentNeighborhood = prevStats.currentNeighborhood?.id === neighborhoodId
                ? updateNeighborhood(prevStats.currentNeighborhood)
                : prevStats.currentNeighborhood;

            return { ...prevStats, city: newCity, currentNeighborhood: newCurrentNeighborhood };
        });
        saveGame(true);
    }, [history, playerStats.city, playerStats.currentNeighborhood?.id, saveGame]);

    const wrapperFetchBusinessData = useCallback(async (category: keyof typeof fetchBusinessData) => {
        if (!playerStats.business) return;
        const data = await fetchBusinessData[category](playerStats.business.name, history);
        setPlayerStats(prevStats => {
            if (!prevStats.business) return prevStats;
            return { ...prevStats, business: { ...prevStats.business, [category]: data } };
        });
    }, [history, playerStats.business]);

    const value = {
        gameState, setGameState,
        playerStats, setPlayerStats,
        gameLog, history, isLoading, isGameOver, tombstone,
        savedLives, saveMessage, currentLifeId,
        generationMode, setGenerationMode,
        ageUpMessage, eventNotification, showMigrationNotification, setShowMigrationNotification,
        handlePlayerAction, saveGame, loadGame, deleteLife, startCustomGame, quickStart, instantPlay, resetGame, goToMenu,
        fetchNeighborhoodData: wrapperFetchNeighborhoodData,
        fetchBusinessData: wrapperFetchBusinessData
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) throw new Error("useGame must be used within a GameProvider");
    return context;
}
