
import React, { useEffect, useState } from 'react';
import { SaveData } from '../types';
import { UserIcon, TrashIcon, ArrowRightIcon, CloudArrowUpIcon, ArrowPathIcon, PlayIcon, ClockIcon, NewspaperIcon, SparklesIcon, TrophyIcon, PlusIcon, BoltIcon, XMarkIcon, BanknotesIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { arthurLegendarySave } from '../data/legendarySave';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import GameModeDialog from './GameModeDialog';
import ChangelogModal from './ChangelogModal';

interface LivesMenuProps {
  savedLives: SaveData[];
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
  onNewGame: () => void;
  onQuickStart: (mode: 'robust' | 'concise') => void;
  onInstantPlay: (saveData: SaveData) => void;
  showMigrationNotification: boolean;
  onDismissMigrationNotification: () => void;
}

function formatMoney(amount: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
}

function LivesMenu({ savedLives, onLoad, onDelete, onNewGame, onQuickStart, onInstantPlay, showMigrationNotification, onDismissMigrationNotification }: LivesMenuProps): React.ReactElement {
  const { user, isAuthenticated, logout, syncSaves, uploadSave, isSyncing } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showModeDialog, setShowModeDialog] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);
  
  // Auto-sync on mount if authenticated to ensure DB consistency
  useEffect(() => {
      if (isAuthenticated) {
          syncSaves();
      }
  }, [isAuthenticated]);

  // Filter saves: If logged in, show all. If not, we don't show the list (per user request for cloud enforcement)
  // However, for UX, we show the active "Resume" card if available locally, but lock the list.
  const mostRecentSave = savedLives.length > 0 ? savedLives[savedLives.length - 1] : null;
  const otherSaves = savedLives.length > 0 ? savedLives.slice(0, -1).reverse() : [];

  const handleCloudUpload = async (e: React.MouseEvent, life: SaveData) => {
      e.stopPropagation();
      if (!isAuthenticated) {
          setShowAuthModal(true);
          return;
      }
      await uploadSave(life);
      alert("Save sincronizado com o banco de dados!");
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      if(window.confirm("Tem certeza que deseja apagar esta vida do banco de dados?")) {
          onDelete(id);
      }
  }

  const handleLoadLegendary = () => {
      const uniqueSave = {
          ...arthurLegendarySave,
          id: `legendary_arthur_${Date.now()}`,
      };
      onInstantPlay(uniqueSave);
  };

  const handleSync = async () => {
      await syncSaves();
  };

  const handleQuickStartClick = () => {
      setShowModeDialog(true);
  };

  const handleModeSelected = (mode: 'robust' | 'concise') => {
      setShowModeDialog(false);
      onQuickStart(mode);
  };

  return (
    <div className="min-h-screen bg-transparent text-gray-100 flex flex-col relative overflow-x-hidden font-sans selection:bg-teal-500/30">
      
      {/* Top Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-4 py-4 sm:px-6 sm:py-6 lg:px-12">
          <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                  <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">Vida<span className="text-teal-400">Sim</span></h1>
              <div className="hidden sm:block ml-2 px-2 py-0.5 bg-white/10 rounded text-[10px] font-mono text-gray-400">v1.3</div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button 
                onClick={() => setShowChangelog(true)}
                className="p-2 sm:p-2.5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                title="Novidades"
            >
                <NewspaperIcon className="w-5 h-5" />
            </button>

            {isAuthenticated ? (
                <div className="flex items-center gap-2 sm:gap-3 bg-gray-900/80 p-1.5 pl-3 sm:pl-4 rounded-full border border-gray-800 backdrop-blur-md shadow-xl">
                    <div className="flex flex-col text-right hidden xs:flex">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Logado</span>
                        <span className="text-xs sm:text-sm font-bold text-white leading-none max-w-[80px] sm:max-w-[120px] truncate">{user?.name}</span>
                    </div>
                    <div className="w-px h-6 sm:h-8 bg-gray-800 mx-1"></div>
                    <button 
                        onClick={handleSync} 
                        disabled={isSyncing}
                        className="p-1.5 sm:p-2 text-teal-400 hover:bg-teal-500/10 rounded-full transition-colors relative" 
                        title="Sincronizar Agora"
                    >
                        <ArrowPathIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isSyncing ? 'animate-spin' : ''}`} />
                    </button>
                    <button onClick={logout} className="p-1.5 sm:p-2 text-red-400 hover:bg-red-500/10 rounded-full transition-colors" title="Sair">
                        <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            ) : (
                <button 
                    onClick={() => setShowAuthModal(true)}
                    className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-bold transition-all shadow-lg shadow-teal-900/20 text-xs sm:text-sm animate-pulse"
                >
                    <UserIcon className="w-4 h-4" />
                    Login Cloud (Obrigatório)
                </button>
            )}
          </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow relative z-10 px-4 sm:px-6 lg:px-12 pb-20 max-w-[1600px] mx-auto w-full flex flex-col gap-6 sm:gap-10">
        
        {/* Notification Banner */}
        {showMigrationNotification && (
            <div className="w-full bg-teal-900/20 border border-teal-500/30 text-teal-200 px-4 py-3 sm:px-6 sm:py-4 rounded-2xl flex justify-between items-center animate-fade-in-up backdrop-blur-md">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 bg-teal-500/20 rounded-lg">
                        <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />
                    </div>
                    <div>
                        <p className="font-bold text-sm sm:text-base">Base de dados atualizada</p>
                        <p className="text-xs sm:text-sm opacity-80">Seus saves antigos foram migrados para a nova versão na nuvem.</p>
                    </div>
                </div>
                <button onClick={onDismissMigrationNotification} className="p-2 hover:bg-teal-500/20 rounded-full transition-colors">
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
        )}

        {/* Hero / Start New */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Create New / Quick Start Block */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <button onClick={onNewGame} className="group relative h-60 sm:h-64 md:h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden border border-gray-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-900/20">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                        <PlusIcon className="w-32 h-32 sm:w-40 sm:h-40 text-teal-400" />
                    </div>
                    <div className="z-10 text-left">
                        <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4 border border-teal-500/20">Modo Principal</span>
                        <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 leading-tight">Nova<br/>Simulação</h2>
                        <p className="text-gray-400 max-w-xs text-sm sm:text-base">Crie uma nova vida no servidor. Todos os dados são persistentes.</p>
                    </div>
                    <div className="z-10 flex items-center gap-2 text-teal-400 font-bold group-hover:translate-x-2 transition-transform text-sm sm:text-base">
                        Começar Agora <ArrowRightIcon className="w-5 h-5" />
                    </div>
                </button>

                <div className="flex flex-col gap-4 h-auto md:h-80">
                    <button onClick={handleQuickStartClick} className="flex-1 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 hover:border-indigo-400 hover:bg-indigo-900/60 rounded-3xl p-6 flex flex-col justify-center items-start transition-all group relative overflow-hidden min-h-[140px]">
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-40 transition-opacity">
                            <BoltIcon className="w-20 h-20 sm:w-24 sm:h-24 text-indigo-400" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-indigo-100 mb-1">Vida Aleatória</h3>
                        <p className="text-xs sm:text-sm text-indigo-300">Geração procedimental rápida.</p>
                    </button>
                    
                    <button onClick={handleLoadLegendary} className="flex-1 bg-gradient-to-br from-yellow-900/20 to-amber-900/20 border border-yellow-600/30 hover:border-yellow-500 hover:bg-yellow-900/40 rounded-3xl p-6 flex items-center gap-4 transition-all group min-h-[100px]">
                        <div className="p-3 bg-yellow-500/20 rounded-xl text-yellow-400">
                            <TrophyIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <div className="text-left">
                            <h3 className="text-lg sm:text-xl font-bold text-yellow-100">Cenário: Prodígio</h3>
                            <p className="text-[10px] sm:text-xs text-yellow-200/60">CEO Tech aos 18 anos.</p>
                        </div>
                    </button>
                </div>
            </div>

            {/* Most Recent Save (Resume) */}
            <div className="lg:col-span-4">
                {mostRecentSave ? (
                    <div className="h-full bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 flex flex-col relative overflow-hidden min-h-[250px]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sessão Atual</h3>
                            <div className="px-2 py-1 bg-gray-900 rounded text-xs font-mono text-gray-300">
                                {new Date().toLocaleDateString()}
                            </div>
                        </div>

                        <div className="flex-grow flex flex-col justify-center items-center text-center mb-6">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-700 rounded-full mb-4 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white shadow-xl border-4 border-gray-800">
                                {mostRecentSave.playerStats.name.charAt(0)}
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 truncate w-full">{mostRecentSave.playerStats.name}</h2>
                            <p className="text-teal-400 font-medium text-sm mb-4 truncate w-full">{mostRecentSave.playerStats.career}</p>
                            
                            <div className="flex gap-4 text-xs sm:text-sm text-gray-400 bg-gray-900/50 px-4 py-2 rounded-xl">
                                <div className="flex items-center gap-1"><ClockIcon className="w-3 h-3 sm:w-4 sm:h-4"/> {mostRecentSave.playerStats.age} anos</div>
                                <div className="w-px h-4 bg-gray-700"></div>
                                <div className="flex items-center gap-1"><BanknotesIcon className="w-3 h-3 sm:w-4 sm:h-4"/> {formatMoney(mostRecentSave.playerStats.money)}</div>
                            </div>
                        </div>

                        <button 
                            onClick={() => onLoad(mostRecentSave.id)}
                            className="w-full bg-white text-black font-bold py-3 sm:py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform text-sm sm:text-base"
                        >
                            <PlayIcon className="w-5 h-5" /> Continuar
                        </button>
                    </div>
                ) : (
                    <div className="h-full bg-gray-800/30 border border-gray-700/30 border-dashed rounded-3xl flex flex-col items-center justify-center text-gray-500 p-8 text-center min-h-[250px]">
                        <UserIcon className="w-16 h-16 mb-4 opacity-50" />
                        <p>Nenhuma jornada iniciada.</p>
                    </div>
                )}
            </div>
        </section>

        {/* Load Game Section - CLOUD GATED */}
        <section className="animate-fade-in-up">
            <div className="flex items-center gap-4 mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <CloudArrowUpIcon className="w-6 h-6 text-teal-500"/>
                    Arquivos de Existência
                </h2>
                <div className="h-px flex-grow bg-gray-800"></div>
                {!isAuthenticated && (
                    <span className="text-xs text-red-400 font-bold flex items-center gap-1">
                        <LockClosedIcon className="w-3 h-3"/> Acesso Restrito
                    </span>
                )}
            </div>
            
            {isAuthenticated ? (
                otherSaves.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {otherSaves.map((life) => (
                            <div key={life.id} onClick={() => onLoad(life.id)} className="group bg-gray-900/50 hover:bg-gray-800 border border-gray-800 hover:border-gray-600 p-4 rounded-2xl cursor-pointer transition-all duration-200 flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-800 group-hover:bg-gray-700 rounded-xl flex items-center justify-center text-lg font-bold text-gray-400 group-hover:text-white transition-colors flex-shrink-0">
                                    {life.playerStats.name.charAt(0)}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <h4 className="font-bold text-gray-200 group-hover:text-white truncate text-sm sm:text-base">{life.playerStats.name}</h4>
                                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                        <span>{life.playerStats.age} anos</span>
                                        <span>•</span>
                                        <span className="truncate max-w-[120px]">{life.playerStats.career}</span>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button onClick={(e) => handleCloudUpload(e, life)} className="p-2 hover:bg-blue-500/20 text-gray-500 hover:text-blue-400 rounded-lg transition-colors" title="Forçar Sync Cloud">
                                        <CloudArrowUpIcon className="w-4 h-4"/>
                                    </button>
                                    <button onClick={(e) => handleDelete(e, life.id)} className="p-2 hover:bg-red-500/20 text-gray-500 hover:text-red-400 rounded-lg transition-colors" title="Apagar da Nuvem">
                                        <TrashIcon className="w-4 h-4"/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 text-gray-500 border border-dashed border-gray-800 rounded-2xl">
                        <p>Nenhum save encontrado na sua nuvem.</p>
                    </div>
                )
            ) : (
                <div className="bg-gray-900/50 border border-red-900/30 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
                    <LockClosedIcon className="w-12 h-12 text-gray-600 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Login Necessário</h3>
                    <p className="text-gray-400 max-w-md mb-6">
                        Para garantir que seu progresso não seja perdido e que você possa jogar em qualquer navegador, 
                        o acesso aos saves é restrito a usuários logados.
                    </p>
                    <button 
                        onClick={() => setShowAuthModal(true)}
                        className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-teal-900/20"
                    >
                        Fazer Login / Criar Conta
                    </button>
                </div>
            )}
        </section>
      </main>

      {/* Footer Text */}
      <footer className="fixed bottom-4 w-full text-center pointer-events-none z-0">
          <p className="text-[10px] text-gray-700">VidaSim &copy; 2024</p>
      </footer>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showModeDialog && <GameModeDialog onSelect={handleModeSelected} onCancel={() => setShowModeDialog(false)} />}
      {showChangelog && <ChangelogModal onClose={() => setShowChangelog(false)} />}
    </div>
  );
}

export default React.memo(LivesMenu);
