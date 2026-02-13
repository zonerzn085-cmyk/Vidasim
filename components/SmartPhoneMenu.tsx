
import React, { useState } from 'react';
import { PlayerStats } from '../types';
import { 
    HeartIcon, 
    BriefcaseIcon, 
    ShoppingCartIcon, 
    MapIcon, 
    UserGroupIcon, 
    ShieldExclamationIcon, 
    TrophyIcon,
    BanknotesIcon,
    BuildingOffice2Icon,
    WrenchScrewdriverIcon,
    DevicePhoneMobileIcon,
    ChatBubbleLeftRightIcon,
    ArrowTrendingUpIcon,
    BookOpenIcon,
    HomeIcon,
    ArrowLeftIcon,
    AcademicCapIcon,
    BuildingLibraryIcon,
    MusicalNoteIcon,
    GlobeAltIcon
} from '@heroicons/react/24/outline';
import InputDialog from './InputDialog';
import HobbyActionsModal from './HobbyActionsModal';
import VacationDialog from './VacationDialog';
import StudyDialog from './StudyDialog';
import { useUI } from '../contexts/UIContext';

interface SmartPhoneMenuProps {
  playerStats: PlayerStats;
  onClose: () => void;
  onPlayerAction: (action: string) => void;
  onOpenCompanyManagement: () => void;
  onOpenCompanyRegistry: () => void;
  onOpenJobSearch: () => void;
  onOpenEducation: () => void;
  onOpenShopping: () => void;
  onOpenRelationships: () => void;
  onOpenCityMap: () => void;
  onOpenInvestments: () => void;
}

interface AppIconProps {
    icon: React.ReactNode;
    label: string;
    gradient: string;
    onClick: () => void;
    notification?: number;
    delay?: number;
    isDock?: boolean;
}

interface SubMenuProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

interface ActionRowProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    subtitle?: string;
    delay?: number;
}

const AppIcon: React.FC<AppIconProps> = ({ icon, label, gradient, onClick, notification, delay = 0, isDock = false }) => (
    <button 
        onClick={onClick}
        className={`flex flex-col items-center justify-center gap-1.5 p-2 transition-all active:scale-90 group animate-pop-in opacity-0 ${isDock ? '' : 'hover:-translate-y-1'}`}
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className={`
            ${isDock ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20'} 
            rounded-2xl lg:rounded-[1.2rem] ${gradient} flex items-center justify-center text-white shadow-lg shadow-black/20 relative border border-white/10
        `}>
            <div className={`${isDock ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10'}`}>{icon}</div>
            {notification ? (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold border-2 border-gray-900 shadow-sm animate-bounce">
                    {notification}
                </div>
            ) : null}
        </div>
        {!isDock && <span className="text-[10px] sm:text-xs text-white font-medium drop-shadow-md tracking-tight">{label}</span>}
    </button>
);

const SubMenu: React.FC<SubMenuProps> = ({ title, onClose, children }) => (
    <div className="absolute inset-0 bg-gray-950 z-30 flex flex-col animate-scale-in">
        <div className="flex items-center gap-4 p-4 lg:p-6 border-b border-white/5 bg-gray-900/50 backdrop-blur-md sticky top-0 z-10">
            <button onClick={onClose} className="p-2 -ml-2 text-blue-400 hover:text-white flex items-center gap-1 transition-colors">
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="font-medium text-base">Voltar</span>
            </button>
            <h3 className="text-lg lg:text-xl font-bold text-white truncate">
                {title}
            </h3>
        </div>
        <div className="flex-grow overflow-y-auto p-4 lg:p-6 space-y-3 bg-gray-950 custom-scrollbar">
            {children}
        </div>
        {/* Home Indicator line to close app */}
        <div className="h-6 w-full flex justify-center items-center pb-2 bg-gray-950 flex-shrink-0" onClick={onClose}>
             <div className="w-32 h-1 bg-gray-700 rounded-full"></div>
        </div>
    </div>
);

const ActionRow: React.FC<ActionRowProps> = ({ icon, label, onClick, subtitle, delay = 0 }) => (
    <button 
        onClick={onClick} 
        className="w-full bg-gray-900 p-4 rounded-xl flex items-center gap-4 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 transition-all text-left active:scale-[0.99] group animate-slide-in-right opacity-0"
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors">{icon}</div>
        <div className="min-w-0 flex-grow">
            <div className="font-semibold text-gray-200 text-sm lg:text-base">{label}</div>
            {subtitle && <div className="text-xs text-gray-500 mt-0.5 truncate">{subtitle}</div>}
        </div>
        <div className="text-gray-600">
            <ArrowLeftIcon className="w-4 h-4 rotate-180" />
        </div>
    </button>
);

function SmartPhoneMenu(props: SmartPhoneMenuProps): React.ReactElement {
  const { playerStats, onClose, onPlayerAction } = props;
  const [currentApp, setCurrentApp] = useState<string | null>(null);
  const { openPanel } = useUI();
  
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isVacationModalOpen, setIsVacationModalOpen] = useState(false);
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);

  const handleAction = (action: string) => {
    onPlayerAction(action);
    onClose();
  };

  const handleModalConfirm = (modalType: string) => (inputValue: string) => {
      let action = '';
      if (modalType === 'createCompany') action = `Criar empresa ${inputValue}`;
      else if (modalType === 'createGang') action = `Criar gangue ${inputValue}`;
      
      if (action) onPlayerAction(action);
      setActiveModal(null);
      onClose();
  };

  const activeHobby = activeModal && activeModal.startsWith('hobby:') ? activeModal.split(':')[1] : null;
  const hasBusiness = !!playerStats.business;
  const canCreateGang = playerStats.career.toLowerCase().includes('membro de gangue') && playerStats.notoriety >= 40;

  const renderAppContent = () => {
      let delayCounter = 0;
      const getDelay = () => { delayCounter += 50; return delayCounter; };

      switch(currentApp) {
          case 'Health':
              return (
                  <SubMenu title="Saúde & Bem-Estar" onClose={() => setCurrentApp(null)}>
                      <ActionRow icon={<HeartIcon className="w-5 h-5"/>} label="Treino de Alta Performance" subtitle="Academia Corpo Elite" onClick={() => handleAction("Ir à academia")} delay={getDelay()} />
                      <ActionRow icon={<TrophyIcon className="w-5 h-5"/>} label="Sessão de Biofeedback" subtitle="Paz interior e foco" onClick={() => handleAction("Meditar")} delay={getDelay()} />
                      <ActionRow icon={<WrenchScrewdriverIcon className="w-5 h-5"/>} label="Clínica Renovare" subtitle="Modificação Estética" onClick={() => handleAction("Fazer cirurgia plástica")} delay={getDelay()} />
                  </SubMenu>
              );
          case 'Jobs':
              return (
                  <SubMenu title="Carreira & Negócios" onClose={() => setCurrentApp(null)}>
                      <ActionRow icon={<BriefcaseIcon className="w-5 h-5"/>} label="Vagas.IA" subtitle="Encontrar Emprego" onClick={() => { props.onOpenJobSearch(); onClose(); }} delay={getDelay()} />
                      <ActionRow icon={<AcademicCapIcon className="w-5 h-5"/>} label="Universidade" subtitle="Cursos e Especializações" onClick={() => { props.onOpenEducation(); onClose(); }} delay={getDelay()} />
                      <ActionRow icon={<BriefcaseIcon className="w-5 h-5"/>} label="Hora Extra" subtitle="Trabalhar duro" onClick={() => handleAction("Trabalhar duro")} delay={getDelay()} />
                      {hasBusiness && <ActionRow icon={<BuildingOffice2Icon className="w-5 h-5"/>} label="Gestão Corporativa" subtitle={playerStats.business?.name} onClick={() => { props.onOpenCompanyManagement(); onClose(); }} delay={getDelay()} />}
                  </SubMenu>
              );
          case 'Bank':
              return (
                  <SubMenu title="Nebula Bank" onClose={() => setCurrentApp(null)}>
                       <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 rounded-2xl text-white mb-6 shadow-lg animate-pop-in">
                           <p className="text-xs font-medium opacity-80 uppercase tracking-widest mb-1">Saldo Atual</p>
                           <p className="text-3xl font-black font-mono">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(playerStats.money)}</p>
                       </div>
                       <ActionRow icon={<ArrowTrendingUpIcon className="w-5 h-5"/>} label="Investimentos" subtitle="Ações, Cripto & Fundos" onClick={() => { props.onOpenInvestments(); onClose(); }} delay={getDelay()} />
                       <ActionRow icon={<ShoppingCartIcon className="w-5 h-5"/>} label="ShopZone" subtitle="Marketplace de Luxo" onClick={() => { props.onOpenShopping(); onClose(); }} delay={getDelay()} />
                       <ActionRow icon={<BuildingLibraryIcon className="w-5 h-5"/>} label="Imóveis" subtitle="Minhas Propriedades" onClick={() => handleAction("Ver minhas propriedades")} delay={getDelay()} />
                       <ActionRow icon={<BanknotesIcon className="w-5 h-5"/>} label="Crédito Pessoal" subtitle="Solicitar Empréstimo" onClick={() => handleAction("Ir ao banco pedir empréstimo")} delay={getDelay()} />
                       <ActionRow icon={<TrophyIcon className="w-5 h-5"/>} label="Loteria" subtitle="Tentar a Sorte" onClick={() => handleAction("Jogar na loteria")} delay={getDelay()} />
                  </SubMenu>
              );
          case 'DarkWeb':
              return (
                  <SubMenu title="Tor Browser" onClose={() => setCurrentApp(null)}>
                      <div className="col-span-full p-4 bg-gray-900 border border-red-900/50 rounded-xl mb-4 text-red-500 text-xs font-mono animate-pulse">
                         [ENCRYPTED CONNECTION ESTABLISHED]
                      </div>
                      <ActionRow icon={<ShieldExclamationIcon className="w-5 h-5"/>} label="Serviços Ilícitos" subtitle="Buscar oportunidades" onClick={() => handleAction("Procurar atividades ilegais")} delay={getDelay()} />
                      <ActionRow icon={<UserGroupIcon className="w-5 h-5"/>} label="Sindicato do Crime" subtitle={!canCreateGang ? "Mínimo 40 Notoriedade" : "Fundar Organização"} onClick={() => setActiveModal('createGang')} delay={getDelay()} />
                  </SubMenu>
              );
            case 'Hobbies':
                return (
                    <SubMenu title="Estilo de Vida" onClose={() => setCurrentApp(null)}>
                        {playerStats.hobbies.length > 0 ? (
                            playerStats.hobbies.map(hobby => (
                                <ActionRow key={hobby} icon={<TrophyIcon className="w-5 h-5"/>} label={hobby} onClick={() => setActiveModal(`hobby:${hobby}`)} delay={getDelay()} />
                            ))
                        ) : (
                            <div className="col-span-full py-8 text-center text-gray-500 italic bg-gray-900 rounded-xl">Nenhum hobby ativo.</div>
                        )}
                        <ActionRow icon={<HomeIcon className="w-5 h-5"/>} label="Viajar" subtitle="Férias e Turismo" onClick={() => setIsVacationModalOpen(true)} delay={getDelay()} />
                        <ActionRow icon={<BookOpenIcon className="w-5 h-5"/>} label="Autoestudo" subtitle="Aprender nova habilidade" onClick={() => setIsStudyModalOpen(true)} delay={getDelay()} />
                    </SubMenu>
                );
            case 'Music':
                return (
                    <SubMenu title="Streaming de Música" onClose={() => setCurrentApp(null)}>
                        <div className="bg-gradient-to-br from-red-600 to-black p-5 rounded-2xl mb-4 text-white shadow-lg flex items-center justify-between animate-pop-in border border-red-500/30">
                            <div>
                                <p className="font-black text-xl tracking-tighter">Rádio Nebulosa</p>
                                <p className="text-xs opacity-80">Sintonize no Vibe</p>
                            </div>
                            <MusicalNoteIcon className="w-8 h-8 opacity-80" />
                        </div>
                        <div className="space-y-2 px-2">
                            <p className="text-sm text-gray-400 text-center italic">
                                Use o player na barra superior (YouTube Music) para controlar o áudio do jogo.
                            </p>
                        </div>
                    </SubMenu>
                );
            default:
                return null;
      }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
        <div 
            className="w-full max-w-sm h-[80vh] bg-gray-950 border-4 border-gray-800 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
        >
            
            {/* Notch / Status Bar */}
            <div className="h-8 bg-black w-full flex justify-center items-end pb-1 z-20 absolute top-0 left-0 pointer-events-none">
                <div className="w-24 h-4 bg-black rounded-b-2xl"></div>
            </div>
            
            {/* Screen Content */}
            <div className="flex-grow pt-10 pb-8 px-4 overflow-hidden relative">
                {/* Background Wallpaper */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/50 to-gray-950"></div>

                <div className="relative z-10 h-full flex flex-col">
                    
                    {currentApp ? (
                        renderAppContent()
                    ) : (
                        <div className="grid grid-cols-4 gap-4 mt-4 content-start">
                            <AppIcon icon={<HeartIcon/>} label="Saúde" gradient="bg-gradient-to-br from-red-500 to-pink-600" onClick={() => setCurrentApp('Health')} delay={50} />
                            <AppIcon icon={<BriefcaseIcon/>} label="Trabalho" gradient="bg-gradient-to-br from-blue-500 to-indigo-600" onClick={() => setCurrentApp('Jobs')} delay={100} />
                            <AppIcon icon={<BanknotesIcon/>} label="Banco" gradient="bg-gradient-to-br from-green-500 to-emerald-600" onClick={() => setCurrentApp('Bank')} delay={150} />
                            <AppIcon icon={<ShoppingCartIcon/>} label="Shop" gradient="bg-gradient-to-br from-orange-500 to-amber-600" onClick={() => { props.onOpenShopping(); onClose(); }} delay={200} />
                            
                            <AppIcon icon={<TrophyIcon/>} label="Hobbies" gradient="bg-gradient-to-br from-purple-500 to-violet-600" onClick={() => setCurrentApp('Hobbies')} delay={250} />
                            <AppIcon icon={<MusicalNoteIcon/>} label="Música" gradient="bg-gradient-to-br from-rose-500 to-red-600" onClick={() => setCurrentApp('Music')} delay={300} />
                            
                            {playerStats.hobbies.some(h => h.toLowerCase().includes('hacking') || h.toLowerCase().includes('crime')) && (
                                <AppIcon icon={<GlobeAltIcon/>} label="DarkWeb" gradient="bg-gradient-to-br from-gray-700 to-gray-900 border-red-500/50" onClick={() => setCurrentApp('DarkWeb')} delay={350} />
                            )}
                        </div>
                    )}

                    {/* Dock */}
                    {!currentApp && (
                        <div className="mt-auto bg-white/10 backdrop-blur-md rounded-[1.5rem] p-3 flex justify-around items-center border border-white/5 mx-2">
                            <AppIcon icon={<DevicePhoneMobileIcon/>} label="" gradient="bg-green-500" onClick={() => {}} isDock={true} />
                            <AppIcon icon={<ChatBubbleLeftRightIcon/>} label="" gradient="bg-blue-500" onClick={() => { props.onOpenRelationships(); onClose(); }} isDock={true} />
                            <AppIcon icon={<MapIcon/>} label="" gradient="bg-yellow-500" onClick={() => { props.onOpenCityMap(); onClose(); }} isDock={true} />
                            <AppIcon icon={<GlobeAltIcon/>} label="" gradient="bg-gray-500" onClick={() => {}} isDock={true} />
                        </div>
                    )}
                </div>
            </div>

            {/* Home Bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-20 cursor-pointer" onClick={() => { if (currentApp) setCurrentApp(null); else onClose(); }}></div>
        </div>
        
        {/* Modals triggered from phone */}
        {activeModal === 'createCompany' && <InputDialog title="Fundar Empresa" prompt="Nome da sua nova empresa:" buttonText="Registrar" onConfirm={handleModalConfirm('createCompany')} onClose={() => setActiveModal(null)} />}
        {activeModal === 'createGang' && <InputDialog title="Formar Gangue" prompt="Nome da organização:" buttonText="Criar" onConfirm={handleModalConfirm('createGang')} onClose={() => setActiveModal(null)} />}
        {activeHobby && <HobbyActionsModal hobby={activeHobby} onAction={(act) => { onPlayerAction(act); setActiveModal(null); onClose(); }} onClose={() => setActiveModal(null)} />}
        {isVacationModalOpen && <VacationDialog onConfirm={(weeks) => { handleAction(`Tirar férias de ${weeks} semanas`); setIsVacationModalOpen(false); }} onClose={() => setIsVacationModalOpen(false)} />}
        {isStudyModalOpen && <StudyDialog onConfirm={(act) => { handleAction(act); setIsStudyModalOpen(false); }} onClose={() => setIsStudyModalOpen(false)} />}
    </div>
  );
}

export default React.memo(SmartPhoneMenu);
