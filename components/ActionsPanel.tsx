
import React, { useState } from 'react';
import { PlayerStats } from '../types';
import { 
    XMarkIcon, 
    HeartIcon, 
    SparklesIcon, 
    LightBulbIcon, 
    AcademicCapIcon, 
    BriefcaseIcon, 
    BuildingOffice2Icon,
    BanknotesIcon,
    ShieldExclamationIcon,
    PaintBrushIcon,
    HomeModernIcon,
    UserGroupIcon,
    ClockIcon,
    SunIcon,
    CalendarDaysIcon,
    ForwardIcon,
    CalendarIcon,
    MegaphoneIcon,
    BeakerIcon,
    UserPlusIcon,
    BookOpenIcon,
    UserIcon,
    ShoppingCartIcon,
    WrenchScrewdriverIcon,
    TicketIcon,
    PresentationChartLineIcon,
    GlobeAltIcon,
    ComputerDesktopIcon,
    FingerPrintIcon
} from '@heroicons/react/24/outline';
import InputDialog from './InputDialog';
import HobbyActionsModal from './HobbyActionsModal';
import VacationDialog from './VacationDialog';
import StudyDialog from './StudyDialog';


interface ActionsPanelProps {
  playerStats: PlayerStats;
  onClose: () => void;
  onPlayerAction: (action: string) => void;
  onOpenCompanyManagement: () => void;
  onOpenCompanyRegistry: () => void;
  onOpenJobSearch: () => void;
  onOpenEducation: () => void;
  onOpenShopping: () => void;
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
    action: string;
    onAction: (action: string) => void;
    disabled?: boolean;
    title?: string;
    variant?: 'default' | 'primary' | 'danger' | 'success';
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, action, onAction, disabled = false, title, variant = 'default' }) => {
    let baseClass = "w-full flex items-center gap-4 p-4 text-left rounded-xl transition-all border shadow-sm group relative overflow-hidden";
    let colorClass = "bg-gray-800 border-gray-700 hover:border-gray-500 hover:bg-gray-750 text-gray-200";
    let iconClass = "text-gray-400 group-hover:text-white";

    if (variant === 'primary') {
        colorClass = "bg-teal-900/30 border-teal-500/50 hover:bg-teal-900/50 hover:border-teal-400 text-teal-100";
        iconClass = "text-teal-400";
    }
    if (variant === 'danger') {
        colorClass = "bg-red-900/20 border-red-500/30 hover:bg-red-900/40 hover:border-red-400 text-red-100";
        iconClass = "text-red-400";
    }
    if (variant === 'success') {
        colorClass = "bg-green-900/20 border-green-500/30 hover:bg-green-900/40 hover:border-green-400 text-green-100";
        iconClass = "text-green-400";
    }

    if (disabled) {
        baseClass += " opacity-50 cursor-not-allowed grayscale";
        colorClass = "bg-gray-800 border-gray-800 text-gray-500";
    } else {
        baseClass += " hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]";
    }

    return (
        <button
            onClick={() => !disabled && onAction(action)}
            disabled={disabled}
            title={title}
            className={`${baseClass} ${colorClass}`}
        >
            <div className={`w-6 h-6 flex-shrink-0 transition-colors ${iconClass}`}>{icon}</div>
            <span className="font-semibold text-sm sm:text-base">{label}</span>
            {!disabled && variant === 'primary' && (
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/5 to-teal-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
            )}
        </button>
    );
};

interface TabButtonProps {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex-shrink-0 sm:w-full flex items-center gap-3 p-3 sm:px-4 sm:py-3 text-left rounded-lg transition-all text-sm font-bold border ${
            isActive
                ? 'bg-teal-500/10 border-teal-500/50 text-teal-400'
                : 'bg-transparent border-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-200'
        }`}
    >
        <div className="w-5 h-5 flex-shrink-0">{icon}</div>
        <span className="whitespace-nowrap">{label}</span>
    </button>
);


function ActionsPanel({ playerStats, onClose, onPlayerAction, onOpenCompanyManagement, onOpenCompanyRegistry, onOpenJobSearch, onOpenEducation, onOpenShopping }: ActionsPanelProps): React.ReactElement {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isVacationModalOpen, setIsVacationModalOpen] = useState(false);
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Principal');
  
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

  // Context Checks
  const careerLower = playerStats.career.toLowerCase();
  const isCEO = ['ceo', 'presidente', 'fundador', 'diretor', 'executivo'].some(role => careerLower.includes(role));
  const isDev = ['programador', 'desenvolvedor', 'engenheiro de software', 'hacker', 'dev'].some(role => careerLower.includes(role)) || playerStats.hobbies.some(h => h.toLowerCase().includes('programação') || h.toLowerCase().includes('python'));
  const hasJob = playerStats.career !== 'Desempregado' && !careerLower.includes('estudante');
  const hasBusiness = !!playerStats.business;
  const canCreateGang = careerLower.includes('membro de gangue') && playerStats.notoriety >= 40;
  const hasHobbies = playerStats.hobbies.length > 0;
  const hasCriminality = playerStats.criminality > 0 || careerLower.includes('gangue') || careerLower.includes('ladrão');
  const isTooYoungForTimeSkips = playerStats.age < 6;

  const tabs = [
      { name: 'Principal', icon: <UserIcon />, condition: true },
      { name: 'Carreira', icon: <BriefcaseIcon />, condition: true },
      { name: 'Vida', icon: <ShoppingCartIcon />, condition: true },
      { name: 'Crime', icon: <ShieldExclamationIcon />, condition: hasCriminality },
      { name: 'Tempo', icon: <ClockIcon />, condition: true },
  ].filter(tab => tab.condition);
  
  const renderContent = () => {
      switch (activeTab) {
          case 'Principal':
              return (
                  <div className="space-y-8 animate-fade-in-up">
                      {/* Priority Actions based on Role */}
                      {isCEO && (
                          <div>
                              <h3 className="text-xs font-bold text-teal-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                  <BuildingOffice2Icon className="w-4 h-4"/> Executivo
                              </h3>
                              <div className="grid grid-cols-1 gap-3">
                                  <ActionButton icon={<PresentationChartLineIcon/>} label="Revisar Estratégia" action="Revisar estratégia corporativa e KPIs" onAction={handleAction} variant="primary" />
                                  <ActionButton icon={<UserGroupIcon/>} label="Networking de Elite" action="Participar de evento de networking exclusivo para executivos" onAction={handleAction} />
                              </div>
                          </div>
                      )}

                      {/* General Personal Growth */}
                      <div>
                          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Bem-Estar</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <ActionButton icon={<HeartIcon/>} label="Ir à Academia" action="Ir à academia treinar pesado" onAction={handleAction} />
                              <ActionButton icon={<SparklesIcon/>} label="Meditar" action="Meditar para clareza mental" onAction={handleAction} />
                              <ActionButton icon={<LightBulbIcon/>} label="Autoestudo" action="" onAction={() => setIsStudyModalOpen(true)} />
                              <ActionButton icon={<SunIcon/>} label="Planejar Férias" action="" onAction={() => setIsVacationModalOpen(true)} />
                          </div>
                      </div>

                      {hasHobbies && (
                          <div>
                              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Hobbies</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {playerStats.hobbies.map(hobby => (
                                      <ActionButton 
                                          key={hobby}
                                          icon={<PaintBrushIcon/>} 
                                          label={hobby} 
                                          action=""
                                          onAction={(_) => setActiveModal(`hobby:${hobby}`)} 
                                      />
                                  ))}
                              </div>
                          </div>
                      )}
                  </div>
              );
          case 'Carreira':
              return (
                  <div className="space-y-6 animate-fade-in-up">
                      <div className="grid grid-cols-1 gap-3">
                        {hasBusiness ? (
                            <>
                                <ActionButton icon={<BuildingOffice2Icon/>} label={playerStats.business?.industry === 'Jogos' ? `Gerenciar ${playerStats.business?.name}` : `Painel: ${playerStats.business?.name}`} action="" onAction={() => { if(playerStats.business?.industry === 'Jogos') onOpenCompanyManagement(); else onOpenCompanyRegistry(); onClose(); }} variant="primary" />
                                <div className="grid grid-cols-2 gap-3">
                                    <ActionButton icon={<MegaphoneIcon/>} label="Marketing" action="Investir pesado em Marketing" onAction={handleAction} />
                                    <ActionButton icon={<UserPlusIcon/>} label="Contratar" action="Contratar novo funcionário" onAction={handleAction} />
                                </div>
                            </>
                        ) : (
                            <ActionButton icon={<BriefcaseIcon/>} label="Procurar Emprego" action="" onAction={() => { onOpenJobSearch(); onClose(); }} variant="primary" />
                        )}
                        
                        <ActionButton icon={<AcademicCapIcon/>} label="Universidade & Cursos" action="" onAction={() => { onOpenEducation(); onClose(); }} />
                        
                        {hasJob && (
                             <ActionButton icon={<BriefcaseIcon/>} label="Trabalhar Duro" action="Trabalhar duro e fazer horas extras" onAction={handleAction} />
                        )}
                        
                        {!hasBusiness && (
                            <ActionButton icon={<BanknotesIcon/>} label="Fundar Startup" action="" onAction={(_) => setActiveModal('createCompany')} title="Inicie seu império." variant="success"/>
                        )}
                      </div>
                  </div>
              );
          case 'Vida':
              return (
                  <div className="space-y-6 animate-fade-in-up">
                       <div className="grid grid-cols-1 gap-3">
                           <ActionButton icon={<ShoppingCartIcon/>} label="Shopping Online" action="" onAction={() => { onOpenShopping(); onClose(); }} variant="primary" />
                           <ActionButton icon={<HomeModernIcon/>} label="Imóveis" action="Ver e gerenciar minhas propriedades" onAction={handleAction} />
                       </div>
                       
                       <div>
                           <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Serviços</h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <ActionButton icon={<HeartIcon/>} label="Cirurgia Plástica" action="Fazer cirurgia plástica" onAction={handleAction} />
                                <ActionButton icon={<TicketIcon/>} label="Loteria" action="Jogar na loteria" onAction={handleAction} />
                                <ActionButton icon={<BanknotesIcon/>} label="Empréstimo" action="Ir ao banco pedir empréstimo" onAction={handleAction} />
                                <ActionButton icon={<ShieldExclamationIcon/>} label="Advogado" action="Consultar um advogado" onAction={handleAction} />
                           </div>
                       </div>
                  </div>
              );
          case 'Crime':
              return (
                  <div className="space-y-4 animate-fade-in-up">
                      <div className="bg-red-950/30 border border-red-500/20 p-4 rounded-xl mb-2">
                          <p className="text-xs text-red-400 font-bold flex items-center gap-2 mb-1"><ShieldExclamationIcon className="w-4 h-4"/> Zona de Risco</p>
                          <p className="text-xs text-red-200/60">Ações ilegais podem resultar em prisão ou morte permanente.</p>
                      </div>
                      
                      <ActionButton icon={<FingerPrintIcon/>} label="Cometer Crime" action="Procurar oportunidades de crime nas ruas" onAction={handleAction} variant="danger" />
                      
                      {playerStats.hobbies.some(h => h.toLowerCase().includes('hacking') || h.toLowerCase().includes('programação')) && (
                          <ActionButton icon={<ComputerDesktopIcon/>} label="DarkWeb" action="Navegar na DarkWeb em busca de serviços ilícitos" onAction={handleAction} />
                      )}

                      <ActionButton icon={<UserGroupIcon/>} label="Formar Gangue" action="" onAction={(_) => setActiveModal('createGang')} disabled={!canCreateGang} title={!canCreateGang ? "Requer notoriedade alta e carreira criminosa." : "Forme sua própria gangue."} />
                  </div>
              );
          case 'Tempo':
              return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fade-in-up">
                      <ActionButton icon={<SunIcon/>} label="Passar o Dia" action="Passar o dia relaxando" onAction={handleAction} />
                      <ActionButton icon={<CalendarDaysIcon/>} label="Pular Semana" action="Avançar uma semana" onAction={handleAction} disabled={isTooYoungForTimeSkips} />
                      <ActionButton icon={<CalendarIcon/>} label="Pular Mês" action="Avançar um mês" onAction={handleAction} disabled={isTooYoungForTimeSkips} />
                      <div className="md:col-span-2 mt-4 pt-4 border-t border-gray-700">
                        <ActionButton icon={<ForwardIcon/>} label="Avançar Ano (+1)" action="Passar o tempo: Avançar 1 ano." onAction={handleAction} variant="primary" />
                      </div>
                  </div>
              );
          default:
              return null;
      }
  }


  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl w-full max-w-4xl h-full sm:h-[70vh] flex flex-col sm:flex-row overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar Navigation */}
        <div className="sm:w-64 bg-gray-950 sm:border-r border-b sm:border-b-0 border-gray-800 flex flex-col flex-shrink-0">
            <div className="p-6 hidden sm:block border-b border-gray-800">
                <h2 className="text-2xl font-black text-white tracking-tighter">Ações</h2>
                <p className="text-xs text-gray-500 mt-1">Escolha seu caminho.</p>
            </div>
            
            <nav className="flex sm:flex-col gap-2 p-3 sm:p-4 overflow-x-auto sm:overflow-visible no-scrollbar">
                {tabs.map(tab => (
                    <TabButton 
                        key={tab.name}
                        icon={tab.icon}
                        label={tab.name}
                        isActive={activeTab === tab.name}
                        onClick={() => setActiveTab(tab.name)}
                    />
                ))}
            </nav>
        </div>

        {/* Content Area */}
        <div className="flex-grow flex flex-col overflow-hidden bg-gray-900 relative">
            <div className="sm:hidden p-4 border-b border-gray-800 flex justify-between items-center bg-gray-950 flex-shrink-0">
                 <span className="font-bold text-white text-lg">{activeTab}</span>
                 <button onClick={onClose}><XMarkIcon className="w-6 h-6 text-gray-400"/></button>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white hidden sm:block z-10 bg-gray-800/80 rounded-full p-2 hover:bg-gray-700 transition-colors"><XMarkIcon className="w-5 h-5"/></button>
            
            <main className="flex-grow p-4 sm:p-8 overflow-y-auto custom-scrollbar">
                {renderContent()}
            </main>
        </div>
      </div>
      
      {/* Modals */}
      {activeModal === 'createCompany' && <InputDialog title="Fundar Empresa" prompt="Nome da sua nova empresa:" buttonText="Registrar" onConfirm={handleModalConfirm('createCompany')} onClose={() => setActiveModal(null)} />}
      {activeModal === 'createGang' && <InputDialog title="Formar Gangue" prompt="Nome da organização:" buttonText="Criar" onConfirm={handleModalConfirm('createGang')} onClose={() => setActiveModal(null)} />}
      {activeHobby && <HobbyActionsModal hobby={activeHobby} onAction={(act) => { onPlayerAction(act); setActiveModal(null); onClose(); }} onClose={() => setActiveModal(null)} />}
      {isVacationModalOpen && <VacationDialog onConfirm={(weeks) => { handleAction(`Tirar férias de ${weeks} semanas`); setIsVacationModalOpen(false); }} onClose={() => setIsVacationModalOpen(false)} />}
      {isStudyModalOpen && <StudyDialog onConfirm={(act) => { handleAction(act); setIsStudyModalOpen(false); }} onClose={() => setIsStudyModalOpen(false)} />}
    </div>
  );
}

export default React.memo(ActionsPanel);
