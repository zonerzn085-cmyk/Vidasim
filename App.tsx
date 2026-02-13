
import React, { useState, useRef, useEffect } from 'react';
import { Chat } from '@google/genai';
import { GameProvider, useGame } from './contexts/GameContext';
import { UIProvider, useUI } from './contexts/UIContext';
import { AuthProvider } from './contexts/AuthContext';
import { createChatSession, createNpcChatSession } from './services/geminiService';
import { Relationship, NotableNPC, ChatMessage, NpcChatMessage, PlayerStats } from './types';

// Components
import Header from './components/Header';
import BottomBar from './components/BottomBar';
import LivesMenu from './components/LivesMenu';
import CharacterCreator from './components/CharacterCreator';
import RelationshipsPanel from './components/RelationshipsPanel';
import NeighborhoodPanel from './components/NeighborhoodPanel';
import SmartPhoneMenu from './components/SmartPhoneMenu';
import InteractionDialog from './components/InteractionDialog';
import PlannerPanel from './components/PlannerPanel';
import NpcProfileDialog from './components/NpcProfileDialog';
import CityMapPanel from './components/CityMapPanel';
import GameTurnComponent from './components/GameTurnComponent';
import CompanyManagementPanel from './components/CompanyManagementPanel';
import CompanyRegistryPanel from './components/CompanyRegistryPanel';
import ChatbotPanel from './components/ChatbotPanel';
import PlayerStatsModal from './components/PlayerStatsModal';
import NpcChatDialog from './components/NpcChatDialog';
import JobSearchDialog from './components/JobSearchDialog';
import EducationDialog from './components/EducationDialog';
import ShoppingDialog from './components/ShoppingDialog';
import InvestmentsPanel from './components/InvestmentsPanel';
import ImageStudioPanel from './components/ImageStudioPanel';
import MemoriesPanel from './components/MemoriesPanel';
import ActionFeedbackToast from './components/ActionFeedbackToast';
import GameOver from './components/GameOver';
import LayoutBackground from './components/LayoutBackground';

import { 
    HeartIcon, SparklesIcon, LightBulbIcon, UserIcon as UserIconSolid, 
    FireIcon, StarIcon, ShieldExclamationIcon, BanknotesIcon as BanknotesIconSolid, 
    MegaphoneIcon
} from '@heroicons/react/24/solid';

function GameContent(): React.ReactElement {
    const {
        gameState, setGameState,
        playerStats, setPlayerStats,
        gameLog, history, isLoading,
        savedLives, saveMessage, tombstone, isGameOver,
        ageUpMessage, eventNotification, showMigrationNotification, setShowMigrationNotification,
        handlePlayerAction, saveGame, loadGame, deleteLife, startCustomGame, quickStart, instantPlay, importLife, goToMenu, resetGame,
        fetchNeighborhoodData, fetchBusinessData
    } = useGame();

    const { 
        activePanel, openPanel, closePanel, 
        activeModal, modalData, openModal, closeModal, 
        actionFeedback, showFeedback 
    } = useUI();

    const [playerInput, setPlayerInput] = useState('');
    
    // Chat State (Still local as it involves non-serializable objects)
    const [npcChatSession, setNpcChatSession] = useState<Chat | null>(null);
    const [npcChatMessages, setNpcChatMessages] = useState<NpcChatMessage[]>([]);
    const [isNpcChatLoading, setIsNpcChatLoading] = useState(false);
    const [activeNpcChat, setActiveNpcChat] = useState<Relationship | NotableNPC | null>(null);

    const [chatSession, setChatSession] = useState<Chat | null>(null);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [isChatbotLoading, setIsChatbotLoading] = useState(false);

    const logContainerRef = useRef<HTMLDivElement>(null);
    const shouldAutoScrollRef = useRef(true);
    const prevStatsRef = useRef(playerStats);

    // Auto-Scroll Logic
    const handleScroll = () => {
        if (!logContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = logContainerRef.current;
        shouldAutoScrollRef.current = scrollTop + clientHeight >= scrollHeight - 50;
    };

    useEffect(() => {
        if (shouldAutoScrollRef.current && logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [gameLog, isLoading]);

    // Stat Change Detection
    useEffect(() => {
        const oldStats = prevStatsRef.current;
        const STAT_ICON_MAP: Record<string, React.ReactNode> = {
            health: <HeartIcon className="w-5 h-5 text-white" />,
            happiness: <SparklesIcon className="w-5 h-5 text-white" />,
            intelligence: <LightBulbIcon className="w-5 h-5 text-white" />,
            appearance: <UserIconSolid className="w-5 h-5 text-white" />,
            money: <BanknotesIconSolid className="w-5 h-5 text-white" />,
            stress: <FireIcon className="w-5 h-5 text-white" />,
            notoriety: <StarIcon className="w-5 h-5 text-white" />,
            criminality: <ShieldExclamationIcon className="w-5 h-5 text-white" />,
        };
        
        Object.keys(STAT_ICON_MAP).forEach((key) => {
            const statKey = key as keyof PlayerStats;
            const oldValue = oldStats[statKey];
            const newValue = playerStats[statKey];
            
            if (typeof oldValue === 'number' && typeof newValue === 'number' && oldValue !== newValue) {
                // We could show feedback here, but maybe too noisy. 
                // Currently just tracking changes.
            }
        });
        prevStatsRef.current = playerStats;
    }, [playerStats]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (playerInput.trim()) {
            handlePlayerAction(playerInput.trim());
            setPlayerInput('');
        }
    };

    // --- Chat & NPC Interaction Logic ---
    
    // Updates NPC data in global state if modified in dialogs
    const handleUpdateNpc = (updatedNpc: Relationship | NotableNPC) => {
        setPlayerStats(prevStats => {
            const isRelationship = (p: any): p is Relationship => 'relationshipScore' in p;
            if (isRelationship(updatedNpc)) {
                return {
                    ...prevStats,
                    relationships: prevStats.relationships.map(r => r.id === updatedNpc.id ? updatedNpc as Relationship : r)
                };
            } else {
                // Complex update for nested neighborhood NPCs
                const newCity = prevStats.city.map(neighborhood => {
                    const npcIndex = neighborhood.notableNPCs.findIndex(n => n.id === updatedNpc.id);
                    if (npcIndex > -1) {
                        const newNpcs = [...neighborhood.notableNPCs];
                        newNpcs[npcIndex] = updatedNpc as NotableNPC;
                        return { ...neighborhood, notableNPCs: newNpcs };
                    }
                    return neighborhood;
                });
                const updatedNeighborhoodInCity = newCity.find(n => n.notableNPCs.some(npc => npc.id === updatedNpc.id));
                const newCurrentNeighborhood = (prevStats.currentNeighborhood && updatedNeighborhoodInCity && prevStats.currentNeighborhood.id === updatedNeighborhoodInCity.id)
                    ? updatedNeighborhoodInCity
                    : prevStats.currentNeighborhood;
                return { ...prevStats, city: newCity, currentNeighborhood: newCurrentNeighborhood };
            }
        });
    };

    const handleOpenNpcChat = (npc: Relationship | NotableNPC) => {
        const session = createNpcChatSession(npc, playerStats);
        setNpcChatSession(session);
        setActiveNpcChat(npc);
        setNpcChatMessages([]);
        openModal('npc_chat');
        closePanel(); // Close underlying panels
    };

    const handleSendNpcMessage = async (text: string) => {
        if (!npcChatSession) return;
        setNpcChatMessages(prev => [...prev, { role: 'user', text, timestamp: Date.now() }]);
        setIsNpcChatLoading(true);
        try {
            const response = await npcChatSession.sendMessage({ message: text });
            setNpcChatMessages(prev => [...prev, { role: 'npc', text: response.text, timestamp: Date.now() }]);
        } catch (error) {
            setNpcChatMessages(prev => [...prev, { role: 'npc', text: "...", timestamp: Date.now() }]);
        } finally {
            setIsNpcChatLoading(false);
        }
    };

    const openChatbotPanel = () => {
        if (!chatSession) {
            setChatSession(createChatSession());
            setChatMessages([{ role: 'model', text: 'Olá! Como posso ajudar?' }]);
        }
        openPanel('chatbot');
    };

    const handleSendChatMessage = async (message: string) => {
        if (!chatSession || isChatbotLoading) return;
        setChatMessages(prev => [...prev, { role: 'user', text: message }]);
        setIsChatbotLoading(true);
        try {
            const responseText = await chatSession.sendMessage({ message });
            setChatMessages(prev => [...prev, { role: 'model', text: responseText.text }]);
        } catch (error) {
            setChatMessages(prev => [...prev, { role: 'model', text: "Erro ao conectar." }]);
        } finally {
            setIsChatbotLoading(false);
        }
    };

    // --- Render Logic ---

    if (gameState === 'loading') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-transparent gap-4">
                <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white text-xl font-light tracking-wide animate-pulse">Carregando...</p>
            </div>
        );
    }

    if (gameState === 'menu') {
        return <LivesMenu 
            savedLives={savedLives} 
            onLoad={loadGame} 
            onDelete={deleteLife} 
            onNewGame={() => setGameState('creator')}
            onQuickStart={quickStart}
            onImport={importLife}
            onInstantPlay={instantPlay}
            showMigrationNotification={showMigrationNotification}
            onDismissMigrationNotification={() => setShowMigrationNotification(false)}
        />;
    }
    
    if (gameState === 'creator') {
        return <CharacterCreator onStart={startCustomGame} onBack={() => setGameState('menu')} />;
    }

    return (
        <div className="h-dvh w-full flex flex-col overflow-hidden font-sans relative">
            {/* Overlays */}
            {actionFeedback && <ActionFeedbackToast icon={actionFeedback.icon} text={actionFeedback.text} />}
            {ageUpMessage && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-xl text-white px-8 py-4 rounded-2xl text-3xl font-bold z-50 animate-fade-in-out shadow-2xl border border-teal-500/50 text-center">
                    {ageUpMessage}
                </div>
            )}
            {eventNotification && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-teal-900/90 backdrop-blur-md text-teal-100 px-6 py-4 rounded-xl text-lg font-bold z-[55] animate-fade-in-out shadow-2xl border border-teal-500/50 flex items-center gap-3 w-[90%] max-w-md">
                    <MegaphoneIcon className="w-8 h-8 text-yellow-300 animate-bounce flex-shrink-0" />
                    <div className="min-w-0">
                        <p className="text-xs text-teal-400 uppercase tracking-wide">Evento no Bairro</p>
                        <p className="truncate">{eventNotification}</p>
                    </div>
                </div>
            )}
            
            {/* Main Interface */}
            <Header 
                onSave={() => saveGame(false)} 
                onGoToMenu={goToMenu} 
                saveMessage={saveMessage}
                onOpenActions={() => openPanel('phone')}
                onOpenRelationships={() => openPanel('relationships')}
                onOpenNeighborhood={() => openPanel('neighborhood')}
                onOpenPlanner={() => openPanel('planner')}
                onOpenCityMap={() => openPanel('map')}
                onOpenChatbot={openChatbotPanel}
                hasNeighborhood={!!playerStats.currentNeighborhood}
            />

            <main className="flex-grow flex flex-col overflow-hidden p-4 relative z-0 pb-[140px] sm:pb-[160px] pt-28 sm:pt-32"> 
                <div ref={logContainerRef} className="flex-grow space-y-4 overflow-y-auto pr-1 custom-scrollbar" onScroll={handleScroll}>
                    {gameLog.map((turn, index) => (
                       <GameTurnComponent key={index} turn={turn} isLatest={index === gameLog.length - 1} />
                    ))}
                    {isLoading && (
                        <div className="flex justify-start animate-fade-in-up mb-2">
                            <div className="bg-gray-800/90 text-gray-100 rounded-2xl rounded-bl-none border border-gray-700/50 shadow-black/20 p-3 sm:p-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={handleFormSubmit} className="mt-4 relative z-20">
                    <div className="relative">
                        <input
                            type="text"
                            value={playerInput}
                            onChange={(e) => setPlayerInput(e.target.value)}
                            placeholder="O que você vai fazer?"
                            disabled={isLoading || isGameOver}
                            className="w-full bg-gray-800/90 backdrop-blur-md text-white border border-gray-600 rounded-2xl py-4 pl-6 pr-14 shadow-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                        />
                        <button 
                            type="submit" 
                            disabled={!playerInput.trim() || isLoading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-teal-600 hover:bg-teal-500 rounded-xl text-white transition-all disabled:opacity-0 disabled:scale-75 shadow-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                            </svg>
                        </button>
                    </div>
                </form>
            </main>

            <BottomBar 
                onOpenActions={() => openPanel('phone')}
                onOpenNeighborhood={() => openPanel('neighborhood')}
                onOpenCityMap={() => openPanel('map')}
                onOpenRelationships={() => openPanel('relationships')}
                onOpenStats={() => openPanel('stats')}
            />

            {/* Panels via Context */}
            {activePanel === 'phone' && (
                <SmartPhoneMenu 
                    playerStats={playerStats} 
                    onClose={closePanel} 
                    onPlayerAction={handlePlayerAction}
                    onOpenCompanyManagement={() => openPanel('company_management')}
                    onOpenCompanyRegistry={() => openPanel('company_registry')}
                    onOpenJobSearch={() => openPanel('job_search')}
                    onOpenEducation={() => openPanel('education')}
                    onOpenShopping={() => openPanel('shopping')}
                    onOpenRelationships={() => openPanel('relationships')}
                    onOpenCityMap={() => openPanel('map')}
                    onOpenInvestments={() => openPanel('investments')}
                />
            )}
            
            {activePanel === 'relationships' && (
                <RelationshipsPanel 
                    relationships={playerStats.relationships} 
                    onClose={closePanel} 
                    onInteract={(npc) => openModal('npc_interaction', npc)}
                    onViewProfile={(npc) => openModal('npc_profile', npc)}
                    onOpenChat={(npc) => handleOpenNpcChat(npc)}
                />
            )}

            {activePanel === 'neighborhood' && playerStats.currentNeighborhood && (
                <NeighborhoodPanel 
                    neighborhood={playerStats.currentNeighborhood} 
                    playerStats={playerStats}
                    onClose={closePanel} 
                    onPlayerAction={handlePlayerAction}
                    onViewProfile={(npc) => openModal('npc_profile', npc)}
                    onFetchData={fetchNeighborhoodData}
                />
            )}

            {activePanel === 'map' && (
                <CityMapPanel 
                    city={playerStats.city} 
                    currentNeighborhoodId={playerStats.currentNeighborhood?.id || ''} 
                    onClose={closePanel} 
                    onPlayerAction={handlePlayerAction} 
                />
            )}

            {activePanel === 'planner' && (
                <PlannerPanel 
                    tasks={playerStats.tasks} 
                    playerProfile={playerStats.playerProfile} 
                    onClose={closePanel} 
                    onPlayerAction={handlePlayerAction} 
                />
            )}

            {activePanel === 'company_management' && playerStats.business && (
                <CompanyManagementPanel 
                    business={playerStats.business} 
                    playerStats={playerStats} 
                    onClose={closePanel} 
                    onPlayerAction={handlePlayerAction}
                    onFetchData={fetchBusinessData} 
                />
            )}

            {activePanel === 'company_registry' && playerStats.business && (
                <CompanyRegistryPanel 
                    business={playerStats.business} 
                    playerStats={playerStats} 
                    onClose={closePanel} 
                />
            )}

            {activePanel === 'chatbot' && (
                <ChatbotPanel 
                    messages={chatMessages} 
                    onSendMessage={handleSendChatMessage} 
                    isLoading={isChatbotLoading} 
                    onClose={closePanel} 
                />
            )}

            {activePanel === 'stats' && (
                <PlayerStatsModal stats={playerStats} onClose={closePanel} />
            )}

            {activePanel === 'job_search' && (
                <JobSearchDialog 
                    playerStats={playerStats} 
                    history={history} 
                    onApply={(title, company) => { handlePlayerAction(`Aplicar para vaga de ${title} na ${company}`); closePanel(); }} 
                    onClose={closePanel} 
                />
            )}

            {activePanel === 'education' && (
                <EducationDialog 
                    playerStats={playerStats} 
                    history={history} 
                    onEnroll={(course, type) => { handlePlayerAction(`Matricular-se em ${course} (${type})`); closePanel(); }} 
                    onClose={closePanel} 
                />
            )}

            {activePanel === 'shopping' && (
                <ShoppingDialog 
                    playerStats={playerStats} 
                    history={history} 
                    onBuy={(item, price) => { handlePlayerAction(`Comprar ${item} por ${price}`); closePanel(); }} 
                    onClose={closePanel} 
                />
            )}

            {activePanel === 'investments' && (
                <InvestmentsPanel 
                    playerStats={playerStats} 
                    onClose={closePanel} 
                    onPlayerAction={(act) => { handlePlayerAction(act); }} 
                />
            )}

            {activePanel === 'image_studio' && (
                <ImageStudioPanel onClose={closePanel} />
            )}

            {activePanel === 'memories' && (
                <MemoriesPanel memories={playerStats.memories} onClose={closePanel} />
            )}

            {/* Modals via Context */}
            {activeModal === 'npc_interaction' && modalData && (
                <InteractionDialog 
                    npc={modalData} 
                    onConfirm={(act) => { handlePlayerAction(act); closeModal(); }} 
                    onClose={closeModal}
                    onOpenChat={() => handleOpenNpcChat(modalData)}
                />
            )}

            {activeModal === 'npc_profile' && modalData && (
                <NpcProfileDialog 
                    npc={modalData} 
                    onClose={closeModal} 
                    onUpdateNpc={handleUpdateNpc} 
                />
            )}

            {activeModal === 'npc_chat' && activeNpcChat && (
                <NpcChatDialog 
                    npc={activeNpcChat} 
                    messages={npcChatMessages} 
                    onSendMessage={handleSendNpcMessage} 
                    onClose={closeModal} 
                    isLoading={isNpcChatLoading} 
                />
            )}

            {/* Game Over is special, renders on top of everything if active */}
            {isGameOver && tombstone && (
                <GameOver tombstone={tombstone} onReset={resetGame} />
            )}
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <UIProvider>
                <GameProvider>
                    <LayoutBackground />
                    <GameContent />
                </GameProvider>
            </UIProvider>
        </AuthProvider>
    );
}
