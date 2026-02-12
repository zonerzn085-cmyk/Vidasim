import React from 'react';
import { Business, PlayerStats } from '../types';
import {
    XMarkIcon,
    BuildingOffice2Icon,
    BanknotesIcon,
    ChartBarIcon,
    ArrowTrendingDownIcon,
    ArrowTrendingUpIcon,
    BeakerIcon,
    MegaphoneIcon,
    UserGroupIcon,
    ShieldExclamationIcon
} from '@heroicons/react/24/outline';

interface CompanyRegistryPanelProps {
  business: Business;
  playerStats: PlayerStats;
  onClose: () => void;
}

function formatMoney(amount: number) {
  if (Math.abs(amount) < 1000) return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
  if (Math.abs(amount) < 1000000) return `R$ ${(amount / 1000).toFixed(1)}k`;
  return `R$ ${(amount / 1000000).toFixed(2)}M`;
}

const InfoCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; colorClass?: string }> = ({ icon, label, value, colorClass = 'text-teal-300' }) => (
    <div className="bg-gray-900/50 p-3 rounded-lg text-center flex-1">
        <div className={`w-8 h-8 mx-auto mb-2 ${colorClass}`}>{icon}</div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-lg font-bold text-white">{value}</p>
    </div>
);

function CompanyRegistryPanel({ business, playerStats, onClose }: CompanyRegistryPanelProps): React.ReactElement {
    const profit = business.annualRevenue - business.annualExpenses;
    const profitColor = profit >= 0 ? 'text-green-400' : 'text-red-400';

    const executivesWithDetails = React.useMemo(() => {
        return business.executives?.map(exec => {
            const person = playerStats.relationships.find(r => r.id === exec.personId);
            return { ...exec, details: person };
        }).filter(e => e.details) ?? [];
    }, [business.executives, playerStats.relationships]);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-teal-300 flex items-center gap-3">
                        <BuildingOffice2Icon className="w-7 h-7" />
                        Registro: {business.name}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="flex-grow overflow-y-auto p-4 space-y-6">
                    {/* Financial Overview */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Visão Geral Financeira</h3>
                        <div className="flex flex-wrap gap-3">
                            <InfoCard icon={<BanknotesIcon/>} label="Valor da Empresa" value={formatMoney(business.value)} />
                            <InfoCard icon={<ArrowTrendingUpIcon/>} label="Receita Anual" value={formatMoney(business.annualRevenue)} colorClass="text-green-400" />
                            <InfoCard icon={<ArrowTrendingDownIcon/>} label="Despesas Anuais" value={formatMoney(business.annualExpenses)} colorClass="text-red-400" />
                            <InfoCard icon={<ChartBarIcon/>} label="Lucro Anual" value={formatMoney(profit)} colorClass={profitColor} />
                        </div>
                    </div>
                    
                    {/* Operational Stats */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Operações</h3>
                         <div className="flex flex-wrap gap-3">
                             <InfoCard icon={<BeakerIcon/>} label="Qualidade" value={`${business.quality}/100`} colorClass="text-purple-400" />
                             <InfoCard icon={<MegaphoneIcon/>} label="Marketing" value={`${business.marketing}/100`} colorClass="text-blue-400" />
                             <InfoCard icon={<UserGroupIcon/>} label="Funcionários" value={business.staffCount} colorClass="text-yellow-400" />
                        </div>
                    </div>
                    
                    {/* Executives */}
                    {executivesWithDetails.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Executivos</h3>
                            <div className="space-y-2">
                                {executivesWithDetails.map(({ role, details }) => (
                                    <div key={details!.id} className="bg-gray-700/50 p-3 rounded-lg">
                                        <p className="font-bold text-white">{details!.name}</p>
                                        <p className="text-sm text-teal-300">{role}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Illegal Enterprises */}
                    {business.type !== 'Legal' && business.enterprises && business.enterprises.length > 0 && (
                         <div>
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2"><ShieldExclamationIcon className="w-5 h-5 text-red-400" /> Empreendimentos Ilegais</h3>
                            <div className="space-y-2">
                                {business.enterprises.map((enterprise) => (
                                    <div key={enterprise} className="bg-red-900/30 border border-red-700/50 p-3 rounded-lg">
                                        <p className="font-bold text-red-200">{enterprise}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default React.memo(CompanyRegistryPanel);
