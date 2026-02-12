
import React, { useState } from 'react';
import { PlayerStats } from '../types';
import { 
    XMarkIcon, 
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
    BuildingLibraryIcon
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
            ${isDock ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20'} 
            rounded-2xl lg:rounded-[1.2rem] ${gradient} flex items-center justify-center text-white shadow-lg shadow-black/20 relative border border-white/10
        `}>
            <div className={`${isDock ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10'}`}>{icon}</div>
            {notification ? (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold border-2 border-gray-900 shadow-sm animate-bounce">
                    {notification}
                </div>
            ) : null}
        </div>
        {!isDock && <span className="text-[11px] sm:text-xs text-white font-medium drop-shadow-md tracking-tight">{label}</span>}
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
        <div className="flex-grow overflow-y-auto p-4 lg:p-6 space-y-3 bg-gray-950">
            {children}
        </div>
        {/* Home Indicator line to close app */}
        <div className="h-6 w-full flex justify-center items-center pb-2 bg-gray-950" onClick={onClose}>
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
          default:
              return null;
      }
  };

  const mainApps = [
      { label: "Diário", gradient: "bg-amber-500", icon: <BookOpenIcon/>, onClick: () => { openPanel('memories'); onClose(); } },
      { label: "Saúde", gradient: "bg-red-500", icon: <HeartIcon/>, onClick: () => setCurrentApp('Health') },
      { label: "Carreira", gradient: "bg-blue-500", icon: <BriefcaseIcon/>, onClick: () => setCurrentApp('Jobs') },
      { label: "Banco", gradient: "bg-purple-600", icon: <BanknotesIcon/>, onClick: () => setCurrentApp('Bank') },
      { label: "Lazer", gradient: "bg-orange-500", icon: <TrophyIcon/>, onClick: () => setCurrentApp('Hobbies') },
      { label: "Mapa", gradient: "bg-emerald-500", icon: <MapIcon/>, onClick: () => { props.onOpenCityMap(); onClose(); } },
  ];

  const dockApps = [
      { label: "Telefone", gradient: "bg-green-500", icon: <DevicePhoneMobileIcon/>, onClick: () => { props.onOpenRelationships(); onClose(); } },
      { label: "Chat", gradient: "bg-teal-500", icon: <ChatBubbleLeftRightIcon/>, onClick: () => { props.onOpenRelationships(); onClose(); }, notification: 1 },
      { label: "Contatos", gradient: "bg-gray-500", icon: <UserGroupIcon/>, onClick: () => { props.onOpenRelationships(); onClose(); } },
      ...(playerStats.criminality > 10 ? [{ label: "Onion", gradient: "bg-gray-800 border-red-500", icon: <ShieldExclamationIcon className="text-red-500"/>, onClick: () => setCurrentApp('DarkWeb') }] : []),
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-0 sm:p-4">
        {/* Device Frame */}
        <div className="w-full h-full sm:w-[380px] sm:h-[750px] bg-black sm:rounded-[3rem] sm:border-[8px] sm:border-gray-800 shadow-2xl relative overflow-hidden flex flex-col ring-1 ring-white/10">
            
            {/* Wallpaper */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-purple-900/40 to-black"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
            </div>
            
            {/* Notch/Status Bar Area */}
            <div className="pt-2 px-6 flex justify-between items-center text-xs font-bold text-white relative z-20 h-8 sm:mt-2">
                <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                <div className="flex gap-1.5 items-center">
                    <span className="text-[10px] text-gray-300">5G</span>
                    <div className="flex gap-0.5 items-end h-2.5">
                        <div className="w-1 h-1.5 bg-white rounded-sm"></div>
                        <div className="w-1 h-2 bg-white rounded-sm"></div>
                        <div className="w-1 h-2.5 bg-white rounded-sm"></div>
                    </div>
                    <div className="w-5 h-2.5 border border-white/50 rounded-sm ml-1 relative">
                        <div className="absolute inset-0.5 bg-white rounded-sm w-[70%]"></div>
                    </div>
                </div>
            </div>

            {/* Main Screen Content */}
            <div className="flex-grow flex flex-col relative z-10 px-5 pb-6 pt-8">
                {currentApp ? (
                    renderAppContent()
                ) : (
                    <>
                        {/* Clock Widget */}
                        <div className="mb-8 text-center animate-fade-in-up">
                            <div className="text-6xl font-thin text-white drop-shadow-lg tracking-tighter">
                                {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                            <div className="text-sm font-medium text-gray-200 mt-1 drop-shadow-md">
                                {["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"][new Date().getDay()]}, {new Date().getDate()} de {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][new Date().getMonth()]}
                            </div>
                            <div className="mt-2 text-xs bg-black/20 inline-block px-3 py-1 rounded-full backdrop-blur-sm text-gray-300 border border-white/5">
                                {playerStats.currentWeather} • {playerStats.city[0]?.name || "Cidade"}
                            </div>
                        </div>

                        {/* App Grid */}
                        <div className="grid grid-cols-4 gap-x-2 gap-y-6 mb-auto">
                            {mainApps.map((app, index) => (
                                <AppIcon 
                                    key={index} 
                                    {...app} 
                                    delay={index * 50} 
                                />
                            ))}
                        </div>

                        {/* Dock (Glassmorphism) */}
                        <div className="mt-4 bg-white/10 backdrop-blur-xl rounded-[2rem] p-3 flex justify-around items-center border border-white/5 mx-1">
                            {dockApps.map((app, index) => (
                                <AppIcon 
                                    key={index} 
                                    {...app} 
                                    delay={300 + (index * 50)} 
                                    isDock={true}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Home Indicator */}
            <div className="h-1.5 w-32 bg-white/80 rounded-full mx-auto mb-2 absolute bottom-2 left-1/2 -translate-x-1/2 z-20 shadow-sm"></div>
        </div>

        {/* Modals Logic */}
        {activeModal === 'createCompany' && <InputDialog title="Fundar Empresa" prompt="Nome da sua nova empresa:" buttonText="Registrar" onConfirm={handleModalConfirm('createCompany')} onClose={() => setActiveModal(null)} />}
        {activeModal === 'createGang' && <InputDialog title="Formar Gangue" prompt="Nome da organização:" buttonText="Criar" onConfirm={handleModalConfirm('createGang')} onClose={() => setActiveModal(null)} />}
        {activeHobby && <HobbyActionsModal hobby={activeHobby} onAction={(act) => { onPlayerAction(act); setActiveModal(null); onClose(); }} onClose={() => setActiveModal(null)} />}
        {isVacationModalOpen && <VacationDialog onConfirm={(weeks) => { handleAction(`Tirar férias de ${weeks} semanas`); setIsVacationModalOpen(false); }} onClose={() => setIsVacationModalOpen(false)} />}
        {isStudyModalOpen && <StudyDialog onConfirm={(act) => { handleAction(act); setIsStudyModalOpen(false); }} onClose={() => setIsStudyModalOpen(false)} />}
    </div>
  );
}

export default React.memo(SmartPhoneMenu);
