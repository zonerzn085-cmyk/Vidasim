
import React, { useState, useMemo, useCallback } from 'react';
import { Business, PlayerStats, GameProject, Technology } from '../types';
import { 
    XMarkIcon, 
    BuildingOffice2Icon, 
    UserGroupIcon, 
    CpuChipIcon, 
    BuildingOfficeIcon,
    PlusIcon,
    MegaphoneIcon,
    BeakerIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    UserPlusIcon,
    ChevronDownIcon,
    ArrowDownCircleIcon,
    CommandLineIcon,
    RocketLaunchIcon,
    FaceSmileIcon,
    FireIcon,
    GlobeAmericasIcon,
    TrophyIcon,
    ArrowUpCircleIcon
} from '@heroicons/react/24/outline';
import CreateStudioDialog from './CreateStudioDialog';
import DevelopGameDialog from './DevelopGameDialog';
import DevelopTechDialog from './DevelopTechDialog';
import HireExecutiveDialog from './HireExecutiveDialog';
import PromoteEmployeeDialog from './PromoteEmployeeDialog';
import { fetchBusinessData } from '../services/geminiService';

interface CompanyManagementPanelProps {
  business: Business;
  playerStats: PlayerStats;
  onClose: () => void;
  onPlayerAction: (action: string) => void;
  onFetchData: (category: keyof typeof fetchBusinessData) => Promise<void>;
}

const TABS = ['Dashboard', 'Projetos', 'Equipe', 'Tecnologia', 'Estúdios'];

function formatCurrency(amount: number, currency: string = 'BRL') {
  if (amount === 0) return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(0);
  const absAmount = Math.abs(amount);
  let suffix = '';
  let displayAmount = absAmount;

  if (absAmount >= 1000000) {
    displayAmount = absAmount / 1000000;
    suffix = 'M';
  } else if (absAmount >= 1000) {
    displayAmount = absAmount / 1000;
    suffix = 'k';
  }

  const symbolMap: {[key: string]: string} = { 'USD': 'US$', 'EUR': '€', 'BRL': 'R$' };
  const symbol = symbolMap[currency] || currency;
  
  return `${symbol} ${displayAmount.toFixed(1)}${suffix}`;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const colorMap: { [key: string]: string } = {
    'Lançado': 'bg-green-500/20 text-green-300 border-green-500/30',
    'Concluído': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'Em Desenvolvimento': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Cancelado': 'bg-red-500/20 text-red-300 border-red-500/30',
    'Arquivado': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  };
  return (
    <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-full border ${colorMap[status] || 'bg-gray-600 border-gray-500'}`}>
      {status}
    </span>
  );
};

const InfoCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; color?: string; subValue?: string }> = ({ icon, label, value, color = "text-white", subValue }) => (
    <div className="bg-gray-800/40 p-4 rounded-xl border border-gray-700/50 flex flex-col items-center justify-center shadow-lg backdrop-blur-sm">
        <div className={`w-8 h-8 mb-2 opacity-80 ${color.replace('text-', 'text-')}`}>{icon}</div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
        <p className={`text-xl font-black mt-1 ${color}`}>{value}</p>
        {subValue && <p className="text-[10px] text-gray-500 mt-1">{subValue}</p>}
    </div>
);

const ProgressBar: React.FC<{ label: string; value: number; colorClass?: string; icon?: React.ReactNode }> = ({ label, value, colorClass = "bg-teal-500", icon }) => (
    <div className="w-full">
        <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-gray-300 font-bold flex items-center gap-1.5 uppercase tracking-wide">
                {icon}
                {label}
            </span>
            <span className="text-white font-mono font-bold">{Math.round(value)}%</span>
        </div>
        <div className="w-full bg-gray-900/80 rounded-full h-3 overflow-hidden border border-gray-700/50">
            <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass} relative`} 
                style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
            >
                 <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
        </div>
    </div>
);

const ActionButton = ({ onClick, icon, label, colorClass = "bg-gray-700 hover:bg-gray-600" }: { onClick: () => void, icon: React.ReactNode, label: string, colorClass?: string }) => (
    <button 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold text-white transition-all transform hover:scale-[1.02] shadow-lg ${colorClass}`}
    >
        {icon}
        {label}
    </button>
);

function CompanyManagementPanel({ business, playerStats, onClose, onPlayerAction, onFetchData }: CompanyManagementPanelProps) {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [fetchedTabs, setFetchedTabs] = useState<Set<string>>(new Set(['Dashboard', 'Equipe']));
  const [isLoading, setIsLoading] = useState(false);

  const handleTabClick = useCallback(async (tab: string) => {
    setActiveTab(tab);
    if (fetchedTabs.has(tab)) return;

    let fetchCategory: keyof typeof fetchBusinessData | null = null;
    if (tab === 'Projetos') fetchCategory = 'gameProjects';
    if (tab === 'Tecnologia') fetchCategory = 'technologies';
    
    if (fetchCategory) {
        setIsLoading(true);
        await onFetchData(fetchCategory);
        setFetchedTabs(prev => new Set(prev).add(tab));
        setIsLoading(false);
    }
  }, [fetchedTabs, onFetchData]);

  const handleActionAndClose = (action: string) => {
    onPlayerAction(action);
    if (!action.startsWith('Ver painel') && !action.includes('cultura')) {
        // Optional: Close panel or keep open for flow
    }
  };
  
  // ... Handlers for Dialogs (Hire, Promote, Studio, Game, Tech) ...
  const handleHireConfirm = (role: string) => { onPlayerAction(`Contratar ${role}`); setActiveDialog(null); };
  const handlePromoteConfirm = (name: string, role: string) => { onPlayerAction(`Promover ${name} para ${role}`); setActiveDialog(null); };
  const handleStudioConfirm = (name: string) => { onPlayerAction(`Criar novo estúdio ${name}`); setActiveDialog(null); };
  const handleGameConfirm = (name: string, genre: string, studio: string, scale: string, audience: string) => { onPlayerAction(`Desenvolver jogo ${name} (${genre}, ${scale})`); setActiveDialog(null); };
  const handleTechConfirm = (name: string, purpose: string) => { onPlayerAction(`Desenvolver tecnologia ${name}`); setActiveDialog(null); };
  const handleWorkStyleChange = (style: string) => { onPlayerAction(`Alterar política de trabalho para: ${style}`); }

  const executivesWithDetails = useMemo(() => {
    return business.executives?.map(exec => {
      const person = playerStats.relationships.find(r => r.id === exec.personId);
      return { ...exec, details: person };
    }).filter(e => e.details) ?? [];
  }, [business.executives, playerStats.relationships]);

  // Find the most relevant project for the Dashboard
  const activeProject = business.gameProjects?.find(p => p.status === 'Em Desenvolvimento' || p.status === 'Concluído') 
                     || business.gameProjects?.[0];

  const renderDashboard = () => {
    const morale = business.morale ?? 70;
    const profit = business.annualRevenue - business.annualExpenses;

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Financial Header */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <InfoCard icon={<CurrencyDollarIcon/>} label="Valor" value={formatCurrency(business.value, 'BRL')} color="text-teal-300" />
                <InfoCard icon={<ChartBarIcon/>} label="Caixa" value={formatCurrency(playerStats.money, 'BRL')} color="text-white" subValue="Pessoal + Empresa" />
                <InfoCard icon={<MegaphoneIcon/>} label="Marketing" value={`${business.marketing}/100`} color="text-blue-300" />
                <InfoCard 
                    icon={profit >= 0 ? <ArrowUpCircleIcon/> : <ArrowDownCircleIcon/>} 
                    label="Lucro/Ano" 
                    value={formatCurrency(profit, 'BRL')} 
                    color={profit >= 0 ? "text-green-400" : "text-red-400"} 
                />
            </div>

            {/* Active Project Spotlight */}
            {activeProject ? (
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-teal-500/30 p-5 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <RocketLaunchIcon className="w-32 h-32 text-teal-400" />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-1 block">Projeto Principal</span>
                                <h3 className="text-2xl font-black text-white">{activeProject.name}</h3>
                                <p className="text-sm text-gray-400">{activeProject.genre} • {activeProject.scale || 'Indie'}</p>
                            </div>
                            <StatusBadge status={activeProject.status} />
                        </div>

                        {activeProject.status === 'Em Desenvolvimento' ? (
                            <div className="space-y-4">
                                <ProgressBar 
                                    label="Progresso de Desenvolvimento" 
                                    value={activeProject.completionPercentage || 0} 
                                    colorClass="bg-blue-500" 
                                    icon={<CommandLineIcon className="w-4 h-4"/>}
                                />
                                <div className="flex gap-3">
                                    <ActionButton 
                                        onClick={() => handleActionAndClose(`Continuar desenvolvimento de ${activeProject.name}`)}
                                        icon={<CommandLineIcon className="w-5 h-5"/>}
                                        label="Codar / Gerenciar"
                                        colorClass="bg-blue-600 hover:bg-blue-500 flex-1"
                                    />
                                    {activeProject.completionPercentage === 100 && (
                                         <ActionButton 
                                            onClick={() => handleActionAndClose(`Lançar o jogo completo '${activeProject.name}'`)}
                                            icon={<RocketLaunchIcon className="w-5 h-5"/>}
                                            label="LANÇAR AGORA"
                                            colorClass="bg-green-600 hover:bg-green-500 flex-1 animate-pulse"
                                        />
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 bg-black/30 p-3 rounded-lg">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Vendas Totais</p>
                                        <p className="text-lg font-bold text-white">{activeProject.unitsSold?.toLocaleString() || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase">Receita</p>
                                        <p className="text-lg font-bold text-green-400">{formatCurrency(activeProject.revenueGenerated || 0, activeProject.currency)}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <ActionButton 
                                        onClick={() => handleActionAndClose(`Fazer marketing para ${activeProject.name}`)}
                                        icon={<MegaphoneIcon className="w-5 h-5"/>}
                                        label="Campanha de Marketing"
                                        colorClass="bg-indigo-600 hover:bg-indigo-500 flex-1"
                                    />
                                    <ActionButton 
                                        onClick={() => handleActionAndClose(`Criar DLC para ${activeProject.name}`)}
                                        icon={<PlusIcon className="w-5 h-5"/>}
                                        label="Criar DLC"
                                        colorClass="bg-gray-700 hover:bg-gray-600 flex-1"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-gray-800/50 p-8 rounded-xl border border-dashed border-gray-600 text-center">
                    <p className="text-gray-400 mb-4">Nenhum projeto ativo. O mercado espera por algo novo!</p>
                    <button onClick={() => setActiveDialog('developGame')} className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg transition-transform hover:scale-105">
                        Iniciar Novo Projeto
                    </button>
                </div>
            )}

            {/* Quick Actions Row */}
            <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Ações Rápidas</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button onClick={() => handleActionAndClose('Investir em Marketing')} className="p-3 bg-gray-700 hover:bg-blue-600/20 hover:border-blue-500/50 border border-transparent rounded-lg transition-all text-xs font-bold text-gray-300 hover:text-blue-300 flex flex-col items-center gap-2">
                        <MegaphoneIcon className="w-6 h-6"/> Marketing Geral
                    </button>
                    <button onClick={() => handleActionAndClose('Investir em Qualidade')} className="p-3 bg-gray-700 hover:bg-purple-600/20 hover:border-purple-500/50 border border-transparent rounded-lg transition-all text-xs font-bold text-gray-300 hover:text-purple-300 flex flex-col items-center gap-2">
                        <BeakerIcon className="w-6 h-6"/> P&D Qualidade
                    </button>
                    <button onClick={() => setActiveDialog('developTech')} className="p-3 bg-gray-700 hover:bg-cyan-600/20 hover:border-cyan-500/50 border border-transparent rounded-lg transition-all text-xs font-bold text-gray-300 hover:text-cyan-300 flex flex-col items-center gap-2">
                        <CpuChipIcon className="w-6 h-6"/> Nova Tech
                    </button>
                     <button onClick={() => handleActionAndClose('Organizar festa da empresa')} className="p-3 bg-gray-700 hover:bg-yellow-600/20 hover:border-yellow-500/50 border border-transparent rounded-lg transition-all text-xs font-bold text-gray-300 hover:text-yellow-300 flex flex-col items-center gap-2">
                        <FaceSmileIcon className="w-6 h-6"/> Festa (+Moral)
                    </button>
                </div>
            </div>
        </div>
    );
  };

  const renderEmployees = () => (
    <div className="space-y-4 animate-fade-in-up">
       <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 flex items-center justify-between">
             <div>
                 <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2 mb-2">
                    <UserGroupIcon className="w-4 h-4"/> Cultura & Moral
                 </h4>
                 <div className="w-48">
                    <ProgressBar label="" value={business.morale || 50} colorClass={business.morale && business.morale < 40 ? 'bg-red-500' : 'bg-green-500'} />
                 </div>
             </div>
             <div className="flex gap-2">
                {['Relaxado', 'Equilibrado', 'Crunch'].map(style => (
                    <button
                        key={style}
                        onClick={() => handleWorkStyleChange(style)}
                        className={`px-3 py-1 rounded text-xs font-bold border transition-all ${business.workStyle === style ? 'bg-teal-600 text-white border-teal-500' : 'bg-gray-800 text-gray-500 border-gray-700'}`}
                    >
                        {style}
                    </button>
                ))}
             </div>
       </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {executivesWithDetails.map(({ role, details }) => (
            <div key={details!.id} className="bg-gray-700/40 p-4 rounded-xl border border-gray-600/30 flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-xl font-bold text-gray-400">
                    {details!.name.charAt(0)}
                </div>
                <div>
                    <p className="font-bold text-white">{details!.name}</p>
                    <p className="text-xs text-teal-400 uppercase font-bold tracking-wide">{role}</p>
                    {details!.relationshipScore < 40 && <span className="text-[10px] text-red-400 font-bold flex items-center gap-1 mt-1"><FireIcon className="w-3 h-3"/> Insatisfeito</span>}
                </div>
            </div>
        ))}
        
        <button onClick={() => setActiveDialog('hireExecutive')} className="bg-gray-800/30 p-4 rounded-xl border border-dashed border-gray-600 flex flex-col items-center justify-center text-gray-500 hover:text-white hover:bg-gray-800/50 transition-all cursor-pointer min-h-[80px]">
            <UserPlusIcon className="w-6 h-6 mb-1"/>
            <span className="text-sm font-bold">Contratar Executivo</span>
        </button>
      </div>
    </div>
  );

  const renderTech = () => (
    <div className="space-y-4 animate-fade-in-up">
        <div className="bg-cyan-900/20 p-4 rounded-xl border border-cyan-500/30 flex items-start gap-4">
            <div className="p-3 bg-cyan-500/20 rounded-lg text-cyan-400">
                <CpuChipIcon className="w-8 h-8" />
            </div>
            <div>
                <h3 className="text-lg font-bold text-white">P&D Tecnológico</h3>
                <p className="text-sm text-gray-400">Desenvolva tecnologias proprietárias para ganhar vantagem competitiva e reduzir custos de produção.</p>
                <button onClick={() => setActiveDialog('developTech')} className="mt-3 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-cyan-900/20">
                    + Nova Pesquisa
                </button>
            </div>
        </div>

        <div className="space-y-3">
            {business.technologies?.map(tech => (
                <div key={tech.id} className="bg-gray-800/60 p-4 rounded-xl border border-gray-700 flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-3">
                            <h4 className="font-bold text-white">{tech.name}</h4>
                            <StatusBadge status={tech.status} />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{tech.description}</p>
                        <div className="mt-2 flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-900/20 px-2 py-1 rounded inline-block">
                            <CpuChipIcon className="w-3 h-3"/> {tech.bonusEffect}
                        </div>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                        {tech.yearCreated}
                    </div>
                </div>
            ))}
             {(!business.technologies || business.technologies.length === 0) && (
                <p className="text-center text-gray-500 py-8">Nenhuma tecnologia desenvolvida ainda.</p>
            )}
        </div>
    </div>
  );
  
  const renderProjects = () => (
    <div className="space-y-4 animate-fade-in-up">
         <button onClick={() => setActiveDialog('developGame')} className="w-full py-4 bg-teal-600 hover:bg-teal-500 rounded-xl font-bold text-white shadow-lg shadow-teal-900/40 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]">
            <PlusIcon className="w-5 h-5"/> Iniciar Novo Projeto
         </button>
         
         <div className="space-y-3">
            {business.gameProjects?.map((game) => (
                <div key={game.id} onClick={() => setExpandedProjectId(game.id === expandedProjectId ? null : game.id)} className="bg-gray-800/60 hover:bg-gray-700/60 border border-gray-700 rounded-xl overflow-hidden cursor-pointer transition-all">
                    <div className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${game.status === 'Em Desenvolvimento' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                                {game.status === 'Em Desenvolvimento' ? <CommandLineIcon className="w-6 h-6"/> : <TrophyIcon className="w-6 h-6"/>}
                            </div>
                            <div>
                                <h4 className="font-bold text-white">{game.name}</h4>
                                <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                                    <span className="border border-gray-600 px-1.5 rounded">{game.genre}</span>
                                    <span className="border border-gray-600 px-1.5 rounded">{game.scale || 'Indie'}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`font-mono font-bold ${game.status === 'Em Desenvolvimento' ? 'text-blue-300' : 'text-green-400'}`}>
                                {game.status === 'Em Desenvolvimento' ? `${game.completionPercentage}%` : formatCurrency(game.revenueGenerated || 0, game.currency)}
                            </p>
                            <StatusBadge status={game.status} />
                        </div>
                    </div>
                    
                    {/* Expanded View */}
                    {expandedProjectId === game.id && (
                        <div className="bg-gray-900/50 p-4 border-t border-gray-700/50 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500 text-xs uppercase">Detalhes</p>
                                <ul className="mt-2 space-y-1 text-gray-300">
                                    <li>Plataforma: PC/Console</li>
                                    <li>Público: {game.targetAudience}</li>
                                    <li>Tecnologia: {game.technologiesUsed?.join(', ') || 'Padrão'}</li>
                                </ul>
                            </div>
                            <div className="flex flex-col justify-end gap-2">
                                {game.status === 'Em Desenvolvimento' ? (
                                    <button onClick={(e) => {e.stopPropagation(); handleActionAndClose(`Continuar desenvolvimento de ${game.name}`)}} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded font-bold">Gerenciar Dev</button>
                                ) : (
                                    <button onClick={(e) => {e.stopPropagation(); handleActionAndClose(`Fazer marketing para ${game.name}`)}} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded font-bold">Marketing</button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            ))}
         </div>
    </div>
  );

  const renderStudios = () => (
    <div className="space-y-4 animate-fade-in-up">
        <div className="bg-gray-700/50 p-4 rounded-xl flex items-center justify-between border border-teal-500/20">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-500/20 rounded-lg text-teal-400"><BuildingOfficeIcon className="w-6 h-6"/></div>
                <div>
                    <p className="font-bold text-white">Sede Principal</p>
                    <p className="text-xs text-gray-400">HQ Operacional</p>
                </div>
             </div>
             <span className="text-xs font-bold bg-gray-800 px-2 py-1 rounded text-gray-300">Ativo</span>
        </div>
        {business.subsidiaries?.map(studio => (
             <div key={studio} className="bg-gray-700/30 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><BuildingOffice2Icon className="w-6 h-6"/></div>
                   <div>
                       <p className="font-bold text-white">{studio}</p>
                       <p className="text-xs text-gray-400">Subsidiária</p>
                   </div>
                </div>
           </div>
        ))}
        <button onClick={() => setActiveDialog('createStudio')} className="w-full py-3 border-2 border-dashed border-gray-600 rounded-xl text-gray-400 hover:text-white hover:border-gray-500 hover:bg-gray-800 transition-all flex items-center justify-center gap-2 font-bold">
            <PlusIcon className="w-5 h-5"/> Fundar Nova Subsidiária
        </button>
    </div>
  );

  const renderContent = () => {
    if (isLoading) return <div className="flex items-center justify-center h-64 text-gray-500">Carregando dados...</div>;
    switch (activeTab) {
        case 'Projetos': return renderProjects();
        case 'Equipe': return renderEmployees();
        case 'Tecnologia': return renderTech();
        case 'Estúdios': return renderStudios();
        default: return renderDashboard();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-900/50">
             <div>
                 <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                    <div className="bg-teal-500 p-1.5 rounded-lg"><BuildingOffice2Icon className="w-6 h-6 text-white" /></div>
                    {business.name}
                 </h2>
                 <p className="text-xs text-gray-500 mt-1 font-mono uppercase tracking-widest ml-1">Painel Corporativo v2.0</p>
             </div>
             <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors"><XMarkIcon className="w-8 h-8" /></button>
          </div>
          
          {/* Tabs */}
          <div className="px-6 border-b border-gray-800 bg-gray-900/30 overflow-x-auto no-scrollbar">
              <div className="flex space-x-6">
                  {TABS.map(tab => (
                      <button
                          key={tab}
                          onClick={() => handleTabClick(tab)}
                          className={`py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-teal-500 text-teal-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                      >
                          {tab}
                      </button>
                  ))}
              </div>
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto p-6 bg-gray-900">
              {renderContent()}
          </div>
        </div>
      </div>

      {/* Dialogs injection */}
      {activeDialog === 'hireExecutive' && <HireExecutiveDialog onConfirm={handleHireConfirm} onClose={() => setActiveDialog(null)} />}
      {activeDialog === 'promoteEmployee' && <PromoteEmployeeDialog relationships={playerStats.relationships} onConfirm={handlePromoteConfirm} onClose={() => setActiveDialog(null)} />}
      {activeDialog === 'createStudio' && <CreateStudioDialog onConfirm={handleStudioConfirm} onClose={() => setActiveDialog(null)} />}
      {activeDialog === 'developGame' && <DevelopGameDialog studios={['Sede Principal', ...(business.subsidiaries || [])]} onConfirm={handleGameConfirm} onClose={() => setActiveDialog(null)} />}
      {activeDialog === 'developTech' && <DevelopTechDialog onConfirm={handleTechConfirm} onClose={() => setActiveDialog(null)} />}
    </>
  );
}

export default React.memo(CompanyManagementPanel);
