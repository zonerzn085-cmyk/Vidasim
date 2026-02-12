
import React, { useState, useEffect, useCallback } from 'react';
import { Neighborhood, PlayerStats, NotableNPC, Building } from '../types';
import { 
    XMarkIcon, 
    MapPinIcon, 
    BuildingOfficeIcon, 
    UserGroupIcon, 
    BuildingLibraryIcon, 
    ArrowTopRightOnSquareIcon, 
    ChatBubbleLeftEllipsisIcon, 
    CurrencyDollarIcon,
    ArrowLeftIcon,
    BriefcaseIcon,
    MegaphoneIcon,
    CheckCircleIcon,
    AcademicCapIcon,
    InformationCircleIcon,
    ShieldCheckIcon,
    EyeIcon,
    ShoppingCartIcon,
    MusicalNoteIcon,
    HeartIcon,
    BookOpenIcon,
    DevicePhoneMobileIcon,
    SparklesIcon,
    ShoppingBagIcon
} from '@heroicons/react/24/outline';
import { fetchNeighborhoodData } from '../services/geminiService';

interface NeighborhoodPanelProps {
  neighborhood: Neighborhood;
  playerStats: PlayerStats;
  onClose: () => void;
  onPlayerAction: (action: string) => void;
  onViewProfile: (npc: NotableNPC) => void;
  onFetchData: (neighborhoodId: string, category: keyof typeof fetchNeighborhoodData) => Promise<void>;
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
}

type Category = 'main' | 'buildings' | 'notableNPCs' | 'propertiesForSale' | 'localJobs' | 'event';

const CategoryMenuButton = ({ icon, label, onClick, count, isEvent = false }: { icon: React.ReactNode, label: string, onClick: () => void, count: number, isEvent?: boolean }) => (
    <button
        onClick={onClick}
        className={`bg-gray-700/60 p-4 rounded-lg text-left transition-all duration-300 border border-gray-600/50 flex flex-col justify-between hover:bg-gray-700 transform hover:-translate-y-1 active:scale-95 ${isEvent ? 'border-teal-500/50 shadow-lg shadow-teal-900/50' : ''}`}
    >
        <div className="flex items-center gap-4">
            <div className={isEvent ? "text-teal-300" : "text-teal-400"}>{icon}</div>
            <h3 className={`text-lg font-bold ${isEvent ? "text-teal-200" : "text-white"}`}>{label}</h3>
        </div>
        <p className="text-sm text-gray-400 mt-2">{isEvent ? 'Evento em andamento!' : `${count} ${label === 'Mercado Imobiliário' ? 'imóveis disponíveis' : (count === 1 ? 'item' : 'itens')}`}</p>
    </button>
);

// Helper to determine actions based on building type
const getBuildingActions = (building: Building) => {
    const type = (building.businessType || building.serviceType || building.type || "").toLowerCase();
    const name = building.name.toLowerCase();
    const actions = [];

    // Default Action
    actions.push({ label: "Visitar", icon: <ArrowTopRightOnSquareIcon className="w-4 h-4"/>, action: `Visitar ${building.name}` });

    // Contextual Actions based on keywords
    if (type.includes('bar') || type.includes('pub') || type.includes('boate') || name.includes('bar')) {
        actions.push({ label: "Happy Hour", icon: <MusicalNoteIcon className="w-4 h-4 text-purple-400"/>, action: `Beber e socializar no ${building.name}` });
        actions.push({ label: "Bebida Solitária", icon: <CurrencyDollarIcon className="w-4 h-4 text-yellow-400"/>, action: `Tomar um drink sozinho no ${building.name}` });
    
    } else if (type.includes('mercado') || type.includes('supermercado') || type.includes('mercearia')) {
        actions.push({ label: "Fazer a Feira", icon: <ShoppingCartIcon className="w-4 h-4 text-green-400"/>, action: `Fazer compras de mantimentos no ${building.name}` });
        actions.push({ label: "Comprar Snacks", icon: <HeartIcon className="w-4 h-4 text-red-400"/>, action: `Comprar besteiras para comer no ${building.name}` });
    
    } else if (type.includes('roupa') || type.includes('moda') || type.includes('boutique') || type.includes('loja')) {
        actions.push({ label: "Renovar Look", icon: <SparklesIcon className="w-4 h-4 text-pink-400"/>, action: `Comprar roupas novas em ${building.name}` });
        actions.push({ label: "Ver Vitrines", icon: <EyeIcon className="w-4 h-4 text-blue-400"/>, action: `Ver vitrines em ${building.name}` });
    
    } else if (type.includes('livraria') || type.includes('sebo') || type.includes('banca')) {
        actions.push({ label: "Comprar Livro", icon: <BookOpenIcon className="w-4 h-4 text-amber-400"/>, action: `Comprar um livro interessante na ${building.name}` });
        actions.push({ label: "Ler Capas", icon: <EyeIcon className="w-4 h-4 text-gray-400"/>, action: `Folhear revistas na ${building.name}` });

    } else if (type.includes('eletrônico') || type.includes('celular') || type.includes('tech') || type.includes('informatica')) {
        actions.push({ label: "Comprar Gadget", icon: <DevicePhoneMobileIcon className="w-4 h-4 text-cyan-400"/>, action: `Comprar um novo eletrônico na ${building.name}` });
        actions.push({ label: "Ver Novidades", icon: <EyeIcon className="w-4 h-4 text-gray-400"/>, action: `Ver as novidades tecnológicas na ${building.name}` });

    } else if (type.includes('farmácia') || type.includes('drogaria')) {
        actions.push({ label: "Comprar Remédios", icon: <ShoppingCartIcon className="w-4 h-4 text-red-400"/>, action: `Comprar itens de saúde na ${building.name}` });
        actions.push({ label: "Cosméticos", icon: <SparklesIcon className="w-4 h-4 text-pink-400"/>, action: `Comprar produtos de higiene na ${building.name}` });

    } else if (type.includes('restaurante') || type.includes('lanchonete') || type.includes('café') || type.includes('padaria')) {
        actions.push({ label: "Refeição Completa", icon: <HeartIcon className="w-4 h-4 text-red-400"/>, action: `Fazer uma refeição completa no ${building.name}` });
        actions.push({ label: "Café/Lanche", icon: <ShoppingCartIcon className="w-4 h-4 text-amber-400"/>, action: `Tomar um café ou lanche no ${building.name}` });
    
    } else if (type.includes('academia') || type.includes('esporte') || type.includes('crossfit')) {
        actions.push({ label: "Treino Pesado", icon: <ArrowTopRightOnSquareIcon className="w-4 h-4 text-red-400"/>, action: `Treino intenso na ${building.name}` });
        actions.push({ label: "Cardio Leve", icon: <HeartIcon className="w-4 h-4 text-blue-400"/>, action: `Exercício leve na ${building.name}` });
    
    } else if (type.includes('escola') || type.includes('biblioteca') || type.includes('universidade')) {
        actions.push({ label: "Estudar", icon: <AcademicCapIcon className="w-4 h-4 text-indigo-400"/>, action: `Estudar na ${building.name}` });
    
    } else if (type.includes('hospital') || type.includes('clínica')) {
        actions.push({ label: "Check-up", icon: <HeartIcon className="w-4 h-4 text-green-400"/>, action: `Fazer um check-up médico na ${building.name}` });
    }

    return actions;
};


const CategoryDetailView: React.FC<{ title: string; onBack: () => void; isLoading: boolean; children: React.ReactNode }> = ({ title, onBack, isLoading, children }) => {
  return (
    <div className="flex flex-col h-full p-4 sm:p-6 animate-slide-in-right">
      <div className="flex items-center mb-4 flex-shrink-0">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-700 transition-colors mr-3 -ml-2">
          <ArrowLeftIcon className="w-6 h-6 text-gray-300" />
        </button>
        <h3 className="text-2xl font-semibold text-teal-300">{title}</h3>
      </div>
      <div className="flex-grow overflow-y-auto pr-2 space-y-3">
        {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p>Gerando locais únicos...</p>
            </div>
        ) : children}
      </div>
    </div>
  );
};


function NeighborhoodPanel({ neighborhood, playerStats, onClose, onPlayerAction, onViewProfile, onFetchData }: NeighborhoodPanelProps): React.ReactElement {
  const [activeCategory, setActiveCategory] = useState<Category>('main');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedBuildingId, setExpandedBuildingId] = useState<string | null>(null);

  // Styling based on Safety/Wealth
  const isDangerous = neighborhood.safety < 40;
  const isRich = neighborhood.wealthLevel === 'Rica';
  
  let themeBorder = "border-gray-700";
  let themeGlow = "";
  if (isDangerous) {
      themeBorder = "border-red-900/50";
      themeGlow = "shadow-red-900/20";
  } else if (isRich) {
      themeBorder = "border-yellow-700/50";
      themeGlow = "shadow-yellow-900/20";
  }

  // Auto-fetch data if array is empty when category is selected
  const handleCategorySelect = useCallback(async (category: Category) => {
    setActiveCategory(category);
    if (category === 'main' || category === 'event') return;

    const categoryData = neighborhood[category as keyof Neighborhood];
    // Check if data is missing or empty array, triggering lazy generation
    if (!categoryData || (Array.isArray(categoryData) && categoryData.length === 0)) {
        setIsLoading(true);
        try {
            await onFetchData(neighborhood.id, category as keyof typeof fetchNeighborhoodData);
        } catch (e) {
            console.error("Failed to lazy load neighborhood data", e);
        } finally {
            setIsLoading(false);
        }
    }
  }, [neighborhood, onFetchData]);


  const handleAction = (action: string) => {
    onPlayerAction(action);
    onClose(); 
  }
  
  const renderContent = () => {
    switch (activeCategory) {
        case 'buildings':
            return (
                <CategoryDetailView title="Edifícios" onBack={() => setActiveCategory('main')} isLoading={isLoading}>
                    {neighborhood.buildings && neighborhood.buildings.length > 0 ? (
                        neighborhood.buildings.map((building) => {
                            const isExpanded = expandedBuildingId === building.id;
                            const actions = getBuildingActions(building);

                            return (
                                <div key={building.id} className="bg-gray-700/60 rounded-lg overflow-hidden transition-all duration-300">
                                    <div 
                                        className="p-3 flex justify-between items-center cursor-pointer hover:bg-gray-700"
                                        onClick={() => setExpandedBuildingId(isExpanded ? null : building.id)}
                                    >
                                        <div className="truncate">
                                            <p className="font-semibold text-white">{building.name}</p>
                                            <p className="text-xs text-gray-400">{building.businessType || building.serviceType || building.type}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {building.quality && <span className={`text-xs font-bold px-2 py-1 rounded-full ${building.quality === 'Alta' ? 'bg-green-500/20 text-green-300' : building.quality === 'Média' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'}`}>{building.quality}</span>}
                                        </div>
                                    </div>
                                    
                                    {isExpanded && (
                                        <div className="bg-gray-800/50 p-3 border-t border-gray-600/50 animate-fade-in-up">
                                            <p className="text-sm text-gray-300 mb-3 italic">"{building.description}"</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {actions.map((act, idx) => (
                                                    <button 
                                                        key={idx}
                                                        onClick={() => handleAction(act.action)}
                                                        className="flex items-center gap-2 px-3 py-2 bg-gray-600 hover:bg-teal-600 rounded-md transition-colors text-sm text-white"
                                                    >
                                                        {act.icon}
                                                        {act.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center text-gray-500 h-full flex items-center justify-center"><p>Não há edifícios notáveis neste bairro.</p></div>
                    )}
                </CategoryDetailView>
            );
        case 'notableNPCs':
             return (
                <CategoryDetailView title="Pessoas Notáveis" onBack={() => setActiveCategory('main')} isLoading={isLoading}>
                    {neighborhood.notableNPCs && neighborhood.notableNPCs.length > 0 ? (
                        neighborhood.notableNPCs.map((npc) => (
                            <div key={npc.id} className="bg-gray-700/60 p-3 rounded-lg" title={`${npc.name} - ${npc.description}`}>
                                <div className="flex justify-between items-center">
                                  <div className="flex-grow truncate">
                                      <div className="flex items-center gap-2 flex-wrap">
                                          <p className="font-semibold text-white">{npc.name}</p>
                                          {npc.isPotentialMentor && (
                                              <div title={`Pode ser mentor em ${npc.mentorArea}`} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                                              <AcademicCapIcon className="w-4 h-4" />
                                              <span>Mentor</span>
                                              </div>
                                          )}
                                      </div>
                                      <p className="text-xs text-gray-400 italic truncate">"{npc.description}"</p>
                                  </div>
                                  <div className="flex-shrink-0 flex items-center gap-2 ml-2">
                                      <button onClick={() => onViewProfile(npc)} title={`Ver perfil de ${npc.name}`} className="p-2 bg-gray-600 hover:bg-indigo-600 rounded-md transition-all transform hover:scale-110">
                                          <InformationCircleIcon className="w-4 h-4 text-gray-200"/>
                                      </button>
                                      <button onClick={() => handleAction(`Interagir com ${npc.name}`)} title={`Interagir com ${npc.name}`} className="p-2 bg-gray-600 hover:bg-teal-600 rounded-md transition-all transform hover:scale-110">
                                          <ChatBubbleLeftEllipsisIcon className="w-4 h-4 text-gray-200"/>
                                      </button>
                                  </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 h-full flex items-center justify-center"><p>Não há pessoas notáveis por aqui.</p></div>
                    )}
                </CategoryDetailView>
             );
        case 'propertiesForSale':
            return (
                <CategoryDetailView title="Mercado Imobiliário" onBack={() => setActiveCategory('main')} isLoading={isLoading}>
                    {neighborhood.propertiesForSale && neighborhood.propertiesForSale.length > 0 ? (
                        neighborhood.propertiesForSale.map((prop) => (
                            <div key={prop.id} className="bg-gray-700/60 p-3 rounded-lg" title={`${prop.name} (${prop.type})`}>
                                <div className="flex justify-between items-center">
                                <div>
                                        <p className="font-semibold text-white truncate">{prop.name}</p>
                                        <p className="text-xs text-gray-400 font-mono">{formatMoney(prop.value)}</p>
                                </div>
                                <button onClick={() => handleAction(`Comprar imóvel ${prop.id}`)} title={`Comprar por ${formatMoney(prop.value)}`} className="ml-2 flex-shrink-0 p-2 bg-green-600/50 hover:bg-green-600 rounded-md transition-all transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none" disabled={playerStats.money < prop.value}>
                                        <CurrencyDollarIcon className="w-4 h-4 text-gray-200"/>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 h-full flex items-center justify-center"><p>Nenhum imóvel à venda no momento.</p></div>
                    )}
                </CategoryDetailView>
            );
        case 'localJobs':
            return (
                <CategoryDetailView title="Empregos Locais" onBack={() => setActiveCategory('main')} isLoading={isLoading}>
                     {neighborhood.localJobs && neighborhood.localJobs.length > 0 ? (
                        neighborhood.localJobs.map((job) => (
                            <div key={job.id} className="bg-gray-700/60 p-3 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <div>
                                          <p className="font-semibold text-white truncate">{job.title}</p>
                                          <p className="text-xs text-green-400 font-mono">{formatMoney(job.salary)}/ano</p>
                                  </div>
                                  <button onClick={() => handleAction(`Candidatar-se ao emprego de ${job.title} no bairro`)} title={`Candidatar-se`} className="ml-2 flex-shrink-0 p-2 bg-blue-600/50 hover:bg-blue-600 rounded-md transition-all transform hover:scale-105">
                                      <CheckCircleIcon className="w-4 h-4 text-gray-200"/>
                                  </button>
                                </div>
                                <p className="text-xs text-gray-400 mt-2 border-t border-gray-600 pt-2">Req: {job.requiredEducation}, 💡{job.requiredIntelligence}+</p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 h-full flex items-center justify-center"><p>Nenhuma vaga de emprego disponível aqui.</p></div>
                    )}
                </CategoryDetailView>
            );
        case 'event':
            if (!neighborhood.currentEvent) return null;
            return (
                 <CategoryDetailView title={neighborhood.currentEvent.name} onBack={() => setActiveCategory('main')} isLoading={isLoading}>
                    <div className="bg-gray-700/60 p-4 rounded-lg flex flex-col items-center text-center">
                        <MegaphoneIcon className="w-16 h-16 text-teal-300 mb-4" />
                        <p className="text-gray-300 mb-2">{neighborhood.currentEvent.description}</p>
                        <p className="text-sm italic text-yellow-300 mb-6">Efeitos: {neighborhood.currentEvent.effects}</p>
                        <button onClick={() => handleAction(`Participar do evento ${neighborhood.currentEvent?.name}`)} className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105">
                            Participar
                        </button>
                    </div>
                </CategoryDetailView>
            );
        case 'main':
        default:
            return (
                <div className="flex flex-col h-full animate-fade-in-up">
                     {/* Explorer Button */}
                     <div className="p-4 flex-shrink-0">
                        <button 
                            onClick={() => handleAction(`Explorar arredores de ${neighborhood.name}`)}
                            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3
                                ${isDangerous ? 'bg-gradient-to-r from-red-900 to-red-700 hover:from-red-800 hover:to-red-600' : 
                                  isRich ? 'bg-gradient-to-r from-yellow-700 to-yellow-600 hover:from-yellow-600 hover:to-yellow-500' :
                                  'bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-600 hover:to-teal-500'
                                }
                            `}
                        >
                            <EyeIcon className="w-6 h-6" />
                            Explorar Arredores
                        </button>
                        <p className="text-xs text-center text-gray-400 mt-2">
                            {isDangerous ? "Cuidado: Área perigosa. Riscos de assalto." : 
                             isRich ? "Área nobre. Oportunidades de networking." : 
                             "Passeie pelo bairro e veja o que acontece."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 overflow-y-auto">
                        {neighborhood.currentEvent && <div className="md:col-span-2"><CategoryMenuButton icon={<MegaphoneIcon className="w-8 h-8"/>} label={neighborhood.currentEvent.name} onClick={() => handleCategorySelect('event')} count={1} isEvent={true}/></div>}
                        <CategoryMenuButton icon={<BuildingOfficeIcon className="w-8 h-8"/>} label="Edifícios" onClick={() => handleCategorySelect('buildings')} count={neighborhood.buildings?.length ?? 0} />
                        <CategoryMenuButton icon={<UserGroupIcon className="w-8 h-8"/>} label="Pessoas Notáveis" onClick={() => handleCategorySelect('notableNPCs')} count={neighborhood.notableNPCs?.length ?? 0} />
                        <CategoryMenuButton icon={<BuildingLibraryIcon className="w-8 h-8"/>} label="Mercado Imobiliário" onClick={() => handleCategorySelect('propertiesForSale')} count={neighborhood.propertiesForSale?.length ?? 0} />
                        <CategoryMenuButton icon={<BriefcaseIcon className="w-8 h-8"/>} label="Empregos Locais" onClick={() => handleCategorySelect('localJobs')} count={neighborhood.localJobs?.length ?? 0} />
                    </div>
                </div>
            );
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-40 flex flex-col p-4 sm:p-6 lg:p-8 animate-scale-in">
      <div className="flex justify-between items-center mb-6 flex-shrink-0">
        <div className="flex items-center gap-4">
            <MapPinIcon className={`w-10 h-10 ${isDangerous ? 'text-red-500' : isRich ? 'text-yellow-400' : 'text-teal-400'}`} />
            <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">{neighborhood.name}</h2>
                <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-400 italic">"{neighborhood.description}"</span>
                </div>
            </div>
        </div>
        <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
          <XMarkIcon className="w-8 h-8" />
        </button>
      </div>

      <div className={`flex-grow bg-gray-800/50 rounded-2xl border ${themeBorder} ${themeGlow} shadow-xl overflow-hidden flex flex-col`}>
        {/* Safety Meter Header */}
        <div className="bg-gray-900/60 p-3 flex items-center justify-between border-b border-gray-700/50">
            <div className="flex items-center gap-2">
                <ShieldCheckIcon className={`w-5 h-5 ${neighborhood.safety > 80 ? 'text-green-400' : neighborhood.safety > 40 ? 'text-yellow-400' : 'text-red-500'}`} />
                <span className="text-sm text-gray-300">Segurança:</span>
                <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                        className={`h-full ${neighborhood.safety > 80 ? 'bg-green-500' : neighborhood.safety > 40 ? 'bg-yellow-500' : 'bg-red-600'}`} 
                        style={{ width: `${neighborhood.safety}%` }}
                    ></div>
                </div>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full border ${isRich ? 'border-yellow-500 text-yellow-400 bg-yellow-900/20' : 'border-gray-600 text-gray-400 bg-gray-800'}`}>
                {neighborhood.wealthLevel}
            </span>
        </div>

        {/* Content Wrapper with Key for Animation Reset */}
        <div className="flex-grow overflow-hidden relative" key={activeCategory}>
            {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default React.memo(NeighborhoodPanel);
