
import React, { useRef, useState, useMemo } from 'react';
import { SaveData } from '../types';
import { UserIcon, BriefcaseIcon, BanknotesIcon, TrashIcon, ArrowRightIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, XMarkIcon, SparklesIcon, TrophyIcon, PlusIcon, BoltIcon, CloudArrowUpIcon, ArrowPathIcon, PlayIcon, ClockIcon } from '@heroicons/react/24/outline';
import { arthurLegendarySave } from '../data/legendarySave';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import GameModeDialog from './GameModeDialog'; // Import new component

interface LivesMenuProps {
  savedLives: SaveData[];
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
  onNewGame: () => void;
  onQuickStart: (mode: 'robust' | 'concise') => void;
  onImport: (saveData: SaveData) => void;
  onInstantPlay: (saveData: SaveData) => void;
  showMigrationNotification: boolean;
  onDismissMigrationNotification: () => void;
}

function formatMoney(amount: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
}

function LivesMenu({ savedLives, onLoad, onDelete, onNewGame, onQuickStart, onImport, onInstantPlay, showMigrationNotification, onDismissMigrationNotification }: LivesMenuProps): React.ReactElement {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, isAuthenticated, logout, syncSaves, uploadSave, isSyncing } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showModeDialog, setShowModeDialog] = useState(false); // State for mode selection
  
  const mostRecentSave = savedLives.length > 0 ? savedLives[savedLives.length - 1] : null;
  const otherSaves = savedLives.length > 0 ? savedLives.slice(0, -1).reverse() : [];

  const handleExport = (e: React.MouseEvent, life: SaveData) => {
    e.stopPropagation();
    try {
      const jsonString = JSON.stringify(life, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `VidaSim_Save_${life.playerStats.name.replace(/\s/g, '_')}_${life.id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting life:", error);
      alert("Ocorreu um erro ao exportar a vida.");
    }
  };

  const handleCloudUpload = async (e: React.MouseEvent, life: SaveData) => {
      e.stopPropagation();
      if (!isAuthenticated) {
          setShowAuthModal(true);
          return;
      }
      await uploadSave(life);
      alert("Save enviado para a nuvem!");
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      if(window.confirm("Tem certeza que deseja apagar esta vida para sempre?")) {
          onDelete(id);
      }
  }

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') throw new Error("File content is not a string");
        const importedData = JSON.parse(text);
        onImport(importedData);
      } catch (error) {
        console.error("Error importing file:", error);
        alert("Ocorreu um erro ao importar o arquivo. Verifique se o arquivo é um save válido do VidaSim.");
      } finally {
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  const handleLoadLegendary = () => {
      const uniqueSave = {
          ...arthurLegendarySave,
          id: `legendary_arthur_${Date.now()}`,
      };
      onInstantPlay(uniqueSave);
  };

  const handleSync = async () => {
      await syncSaves();
      window.location.reload(); 
  };

  // Trigger quick start with mode selection
  const handleQuickStartClick = () => {
      setShowModeDialog(true);
  };

  const handleModeSelected = (mode: 'robust' | 'concise') => {
      setShowModeDialog(false);
      onQuickStart(mode);
  };

  // Performance Optimization: Removed bg-gray-950 to allow LayoutBackground to show through without overdraw
  return (
    <div className="min-h-screen bg-transparent text-gray-100 flex flex-col relative overflow-x-hidden font-sans selection:bg-teal-500/30">
      <input type="file" ref={fileInputRef} className="hidden" accept=".json" onChange={handleFileImport} />

      {/* Top Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-6 py-6 lg:px-12">
          <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                  <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white">Vida<span className="text-teal-400">Sim</span></h1>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
                <div className="flex items-center gap-3 bg-gray-900/80 p-1.5 pl-4 rounded-full border border-gray-800 backdrop-blur-md shadow-xl">
                    <div className="flex flex-col text-right">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Logado como</span>
                        <span className="text-sm font-bold text-white leading-none">{user?.name}</span>
                    </div>
                    <div className="w-px h-8 bg-gray-800 mx-2"></div>
                    <button 
                        onClick={handleSync} 
                        disabled={isSyncing}
                        className="p-2 text-teal-400 hover:bg-teal-500/10 rounded-full transition-colors" 
                        title="Sincronizar Cloud"
                    >
                        <ArrowPathIcon className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
                    </button>
                    <button onClick={logout} className="p-2 text-red-400 hover:bg-red-500/10 rounded-full transition-colors" title="Sair">
                        <ArrowRightIcon className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <button 
                    onClick={() => setShowAuthModal(true)}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-full font-bold transition-all border border-gray-700 shadow-lg text-sm"
                >
                    <UserIcon className="w-4 h-4" />
                    Entrar / Criar Conta
                </button>
            )}
          </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow relative z-10 px-6 lg:px-12 pb-20 max-w-[1600px] mx-auto w-full flex flex-col gap-10">
        
        {/* Notification Banner */}
        {showMigrationNotification && (
            <div className="w-full bg-teal-900/20 border border-teal-500/30 text-teal-200 px-6 py-4 rounded-2xl flex justify-between items-center animate-fade-in-up backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-teal-500/20 rounded-lg">
                        <SparklesIcon className="w-6 h-6 text-teal-400" />
                    </div>
                    <div>
                        <p className="font-bold">Base de dados atualizada</p>
                        <p className="text-sm opacity-80">Seus saves antigos foram migrados para a nova versão com sucesso.</p>
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
                <button onClick={onNewGame} className="group relative h-64 md:h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 flex flex-col justify-between overflow-hidden border border-gray-700 hover:border-teal-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-900/20">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                        <PlusIcon className="w-40 h-40 text-teal-400" />
                    </div>
                    <div className="z-10">
                        <span className="inline-block px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-teal-500/20">Modo Principal</span>
                        <h2 className="text-4xl font-black text-white mb-2 leading-tight">Nova<br/>Simulação</h2>
                        <p className="text-gray-400 max-w-xs">Personalize cada detalhe. Crie sua história do zero.</p>
                    </div>
                    <div className="z-10 flex items-center gap-2 text-teal-400 font-bold group-hover:translate-x-2 transition-transform">
                        Começar Agora <ArrowRightIcon className="w-5 h-5" />
                    </div>
                </button>

                <div className="flex flex-col gap-4 h-64 md:h-80">
                    <button onClick={handleQuickStartClick} className="flex-1 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 hover:border-indigo-400 hover:bg-indigo-900/60 rounded-3xl p-6 flex flex-col justify-center items-start transition-all group relative overflow-hidden">
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-40 transition-opacity">
                            <BoltIcon className="w-24 h-24 text-indigo-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-indigo-100 mb-1">Vida Aleatória</h3>
                        <p className="text-sm text-indigo-300">Deixe o destino (RNG) decidir.</p>
                    </button>
                    
                    <button onClick={handleLoadLegendary} className="flex-1 bg-gradient-to-br from-yellow-900/20 to-amber-900/20 border border-yellow-600/30 hover:border-yellow-500 hover:bg-yellow-900/40 rounded-3xl p-6 flex items-center gap-4 transition-all group">
                        <div className="p-3 bg-yellow-500/20 rounded-xl text-yellow-400">
                            <TrophyIcon className="w-8 h-8" />
                        </div>
                        <div className="text-left">
                            <h3 className="text-xl font-bold text-yellow-100">Cenário: O Prodígio</h3>
                            <p className="text-xs text-yellow-200/60">Comece como um CEO Tech aos 18 anos.</p>
                        </div>
                    </button>
                </div>
            </div>

            {/* Most Recent Save (Resume) */}
            <div className="lg:col-span-4">
                {mostRecentSave ? (
                    <div className="h-full bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Continuar Jornada</h3>
                            <div className="px-2 py-1 bg-gray-900 rounded text-xs font-mono text-gray-300">
                                {new Date().toLocaleDateString()}
                            </div>
                        </div>

                        <div className="flex-grow flex flex-col justify-center items-center text-center mb-6">
                            <div className="w-20 h-20 bg-gray-700 rounded-full mb-4 flex items-center justify-center text-3xl font-bold text-white shadow-xl border-4 border-gray-800">
                                {mostRecentSave.playerStats.name.charAt(0)}
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-1">{mostRecentSave.playerStats.name}</h2>
                            <p className="text-teal-400 font-medium text-sm mb-4">{mostRecentSave.playerStats.career}</p>
                            
                            <div className="flex gap-4 text-sm text-gray-400 bg-gray-900/50 px-4 py-2 rounded-xl">
                                <div className="flex items-center gap-1"><ClockIcon className="w-4 h-4"/> {mostRecentSave.playerStats.age} anos</div>
                                <div className="w-px h-4 bg-gray-700"></div>
                                <div className="flex items-center gap-1"><BanknotesIcon className="w-4 h-4"/> {formatMoney(mostRecentSave.playerStats.money)}</div>
                            </div>
                        </div>

                        <button 
                            onClick={() => onLoad(mostRecentSave.id)}
                            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
                        >
                            <PlayIcon className="w-5 h-5" /> Continuar
                        </button>
                    </div>
                ) : (
                    <div className="h-full bg-gray-800/30 border border-gray-700/30 border-dashed rounded-3xl flex flex-col items-center justify-center text-gray-500 p-8 text-center">
                        <UserIcon className="w-16 h-16 mb-4 opacity-50" />
                        <p>Nenhuma jornada iniciada.</p>
                        <p className="text-sm mt-2">Comece um novo jogo para ver seu progresso aqui.</p>
                    </div>
                )}
            </div>
        </section>

        {/* Load Game Section */}
        {otherSaves.length > 0 && (
            <section className="animate-fade-in-up">
                <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-xl font-bold text-white">Outras Vidas</h2>
                    <div className="h-px flex-grow bg-gray-800"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {otherSaves.map((life) => (
                        <div key={life.id} onClick={() => onLoad(life.id)} className="group bg-gray-900/50 hover:bg-gray-800 border border-gray-800 hover:border-gray-600 p-4 rounded-2xl cursor-pointer transition-all duration-200 flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-800 group-hover:bg-gray-700 rounded-xl flex items-center justify-center text-lg font-bold text-gray-400 group-hover:text-white transition-colors">
                                {life.playerStats.name.charAt(0)}
                            </div>
                            <div className="flex-grow min-w-0">
                                <h4 className="font-bold text-gray-200 group-hover:text-white truncate">{life.playerStats.name}</h4>
                                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                    <span>{life.playerStats.age} anos</span>
                                    <span>•</span>
                                    <span className="truncate max-w-[120px]">{life.playerStats.career}</span>
                                </div>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={(e) => handleCloudUpload(e, life)} className="p-2 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 rounded-lg" title="Backup">
                                    <CloudArrowUpIcon className="w-4 h-4"/>
                                </button>
                                <button onClick={(e) => handleExport(e, life)} className="p-2 hover:bg-gray-600 text-gray-400 hover:text-white rounded-lg" title="Exportar">
                                    <ArrowDownTrayIcon className="w-4 h-4"/>
                                </button>
                                <button onClick={(e) => handleDelete(e, life.id)} className="p-2 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg" title="Apagar">
                                    <TrashIcon className="w-4 h-4"/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )}
      </main>

      {/* Footer Import */}
      <footer className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-gray-950 via-gray-950 to-transparent pointer-events-none z-30 flex justify-center pt-20">
          <button 
            onClick={() => fileInputRef.current?.click()} 
            className="pointer-events-auto bg-gray-900/80 backdrop-blur-xl border border-gray-700 hover:border-gray-500 hover:bg-gray-800 text-gray-400 hover:text-white px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all shadow-xl"
          >
              <ArrowUpTrayIcon className="w-4 h-4" />
              Importar Arquivo de Save
          </button>
      </footer>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showModeDialog && <GameModeDialog onSelect={handleModeSelected} onCancel={() => setShowModeDialog(false)} />}
    </div>
  );
}

export default React.memo(LivesMenu);
