
import React, { useState } from 'react';
import { Investment, PlayerStats } from '../types';
import { availableAssets, TradableAsset } from '../data/marketData';
import { XMarkIcon, BanknotesIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, PlusIcon, MinusIcon, ChartBarIcon, BuildingLibraryIcon, GlobeAltIcon, LockClosedIcon, BoltIcon } from '@heroicons/react/24/outline';
import InputDialog from './InputDialog';

interface InvestmentsPanelProps {
  playerStats: PlayerStats;
  onClose: () => void;
  onPlayerAction: (action: string) => void;
}

const getRiskColor = (risk: string) => {
    switch (risk) {
        case 'Baixo': return 'text-green-400 bg-green-900/20 border-green-500/30';
        case 'Médio': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
        case 'Alto': return 'text-orange-400 bg-orange-900/20 border-orange-500/30';
        case 'Extremo': return 'text-red-500 bg-red-900/20 border-red-500/30';
        default: return 'text-gray-400';
    }
};

const getAssetIcon = (type: string) => {
    switch (type) {
        case 'Ação': return <ChartBarIcon className="w-5 h-5"/>;
        case 'Cripto': return <BoltIcon className="w-5 h-5"/>;
        case 'Renda Fixa': return <LockClosedIcon className="w-5 h-5"/>;
        case 'Fundo Imobiliário': return <BuildingLibraryIcon className="w-5 h-5"/>;
        default: return <GlobeAltIcon className="w-5 h-5"/>;
    }
};

function formatMoney(amount: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
}

function InvestmentsPanel({ playerStats, onClose, onPlayerAction }: InvestmentsPanelProps): React.ReactElement {
  const [activeModal, setActiveModal] = useState<{ type: 'Buy' | 'Sell', asset?: TradableAsset | Investment } | null>(null);

  const handleTransaction = (amountStr: string) => {
      if (!activeModal) return;
      const amount = parseFloat(amountStr.replace(/[^0-9.]/g, ''));
      if (isNaN(amount) || amount <= 0) {
          alert("Valor inválido.");
          return;
      }

      if (activeModal.type === 'Buy') {
          if (amount > playerStats.money) {
              alert("Saldo insuficiente.");
              return;
          }
          const asset = activeModal.asset as TradableAsset;
          // Format for AI comprehension: "Investir R$ X em [Nome] ([Tipo], Risco: [Risco])"
          onPlayerAction(`Investir R$ ${amount} em ${asset.name} (Tipo: ${asset.type}, Risco: ${asset.risk})`);
      } else {
          const investment = activeModal.asset as Investment;
          if (amount > investment.currentValue) {
              alert("Você não possui esse valor investido para vender.");
              return;
          }
          onPlayerAction(`Vender R$ ${amount} de ${investment.name}`);
      }
      setActiveModal(null);
      onClose();
  };

  const totalInvested = playerStats.investments.reduce((acc, curr) => acc + curr.currentValue, 0);
  const totalCost = playerStats.investments.reduce((acc, curr) => acc + curr.amountInvested, 0);
  const totalProfit = totalInvested - totalCost;
  const totalRoi = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;

  return (
    <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fade-in-up"
        onClick={onClose}
    >
        <div 
            className="bg-gray-900/95 border border-gray-700/50 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md z-10">
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                        <ArrowTrendingUpIcon className="w-8 h-8 text-green-400" />
                        Nebula Financial
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">Gerencie seu portfólio de ativos.</p>
                </div>
                <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-500 uppercase font-bold">Patrimônio Total</p>
                    <p className="text-xl font-mono font-bold text-white">{formatMoney(totalInvested)}</p>
                    <p className={`text-xs font-mono ${totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {totalProfit >= 0 ? '+' : ''}{formatMoney(totalProfit)} ({totalRoi.toFixed(2)}%)
                    </p>
                </div>
                <button onClick={onClose} className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors sm:hidden">
                    <XMarkIcon className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 bg-gray-950/50 space-y-8 custom-scrollbar">
                
                {/* Mobile Stats (Visible only on small screens) */}
                <div className="sm:hidden bg-gray-800 p-4 rounded-xl border border-gray-700 mb-4 text-center">
                     <p className="text-xs text-gray-500 uppercase font-bold">Patrimônio Total</p>
                    <p className="text-2xl font-mono font-bold text-white">{formatMoney(totalInvested)}</p>
                    <p className={`text-sm font-mono ${totalProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {totalProfit >= 0 ? '+' : ''}{formatMoney(totalProfit)} ({totalRoi.toFixed(2)}%)
                    </p>
                </div>

                {/* --- YOUR PORTFOLIO --- */}
                <section>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <BanknotesIcon className="w-4 h-4"/> Sua Carteira
                    </h3>
                    
                    {playerStats.investments.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {playerStats.investments.map((inv) => {
                                const profit = inv.currentValue - inv.amountInvested;
                                const profitPercent = ((profit / inv.amountInvested) * 100).toFixed(1);
                                const isProfitable = profit >= 0;

                                return (
                                    <div key={inv.id} className="bg-gray-800 hover:bg-gray-800/80 p-4 rounded-xl border border-gray-700 transition-all group relative overflow-hidden">
                                        {/* Background Graph Effect */}
                                        <div className={`absolute bottom-0 left-0 w-full h-1 ${isProfitable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        
                                        <div className="flex justify-between items-start mb-2 relative z-10">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="p-1.5 bg-gray-700 rounded-lg text-gray-300">{getAssetIcon(inv.type)}</span>
                                                    <h4 className="font-bold text-white text-lg truncate max-w-[150px]">{inv.name}</h4>
                                                </div>
                                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border mt-1 inline-block ${getRiskColor(inv.risk)}`}>{inv.risk}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-mono font-bold text-white">{formatMoney(inv.currentValue)}</p>
                                                <p className={`text-xs font-mono font-bold flex items-center justify-end gap-1 ${isProfitable ? 'text-green-400' : 'text-red-400'}`}>
                                                    {isProfitable ? <ArrowTrendingUpIcon className="w-3 h-3"/> : <ArrowTrendingDownIcon className="w-3 h-3"/>}
                                                    {profitPercent}%
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-4 flex gap-2 relative z-10">
                                            <button 
                                                onClick={() => setActiveModal({ type: 'Buy', asset: inv as any })} // Type hack as Investment has similar structure to TradableAsset for name/risk
                                                className="flex-1 bg-gray-700 hover:bg-green-600/20 hover:text-green-300 hover:border-green-500/50 text-gray-300 border border-gray-600 px-3 py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1"
                                            >
                                                <PlusIcon className="w-3 h-3"/> Aportar
                                            </button>
                                            <button 
                                                onClick={() => setActiveModal({ type: 'Sell', asset: inv })}
                                                className="flex-1 bg-gray-700 hover:bg-red-600/20 hover:text-red-300 hover:border-red-500/50 text-gray-300 border border-gray-600 px-3 py-2 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1"
                                            >
                                                <MinusIcon className="w-3 h-3"/> Resgatar
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-dashed border-gray-700">
                            <BanknotesIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                            <p className="text-gray-400 font-medium">Você não possui investimentos ativos.</p>
                            <p className="text-sm text-gray-600">Explore o mercado abaixo para começar.</p>
                        </div>
                    )}
                </section>

                {/* --- MARKET OPPORTUNITIES --- */}
                <section>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <GlobeAltIcon className="w-4 h-4"/> Mercado Global
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {availableAssets.map((asset) => (
                            <button 
                                key={asset.id}
                                onClick={() => setActiveModal({ type: 'Buy', asset })}
                                className="text-left bg-gray-800/40 hover:bg-gray-800 border border-gray-700/50 hover:border-teal-500/30 p-4 rounded-xl transition-all group flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start w-full mb-2">
                                    <div className="p-2 bg-gray-700/50 rounded-lg text-gray-300 group-hover:text-teal-300 transition-colors">
                                        {getAssetIcon(asset.type)}
                                    </div>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getRiskColor(asset.risk)}`}>
                                        {asset.risk}
                                    </span>
                                </div>
                                <h4 className="font-bold text-white text-sm mb-1 group-hover:text-teal-200 transition-colors">{asset.name}</h4>
                                <p className="text-xs text-gray-400 leading-relaxed mb-4 flex-grow">{asset.description}</p>
                                
                                <div className="mt-auto flex items-center justify-between w-full border-t border-gray-700/50 pt-3">
                                    <span className="text-[10px] text-gray-500 font-mono">Min: {formatMoney(asset.minEntry)}</span>
                                    <span className="text-teal-500 font-bold text-xs flex items-center gap-1">
                                        Investir <PlusIcon className="w-3 h-3"/>
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

            </div>
        </div>

        {activeModal && (
            <InputDialog 
                title={activeModal.type === 'Buy' ? `Investir em ${activeModal.asset?.name}` : `Vender ${activeModal.asset?.name}`}
                prompt={`Saldo disponível: ${formatMoney(playerStats.money)}\nQuanto deseja ${activeModal.type === 'Buy' ? 'investir' : 'resgatar'}?`}
                buttonText="Confirmar Transação"
                onConfirm={handleTransaction}
                onClose={() => setActiveModal(null)}
            />
        )}
    </div>
  );
}

export default React.memo(InvestmentsPanel);
