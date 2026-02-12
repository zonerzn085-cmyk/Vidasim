
import React from 'react';
import { PlayerStats } from '../types';
import { XMarkIcon, HeartIcon, SparklesIcon, LightBulbIcon, UserIcon, FireIcon, StarIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import StatPill from './StatPill';

interface PlayerStatsModalProps {
  stats: PlayerStats;
  onClose: () => void;
}

function PlayerStatsModal({ stats, onClose }: PlayerStatsModalProps): React.ReactElement {
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900/90 border border-gray-700/50 rounded-3xl shadow-2xl w-full max-w-sm animate-fade-in-up overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative holographic gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-purple-500 to-teal-400"></div>

        <div className="flex justify-between items-start p-6 pb-2">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center shadow-inner">
                    <UserIcon className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white leading-tight">{stats.name}</h2>
                    <p className="text-sm text-teal-400 font-medium mt-1">{stats.age} anos • {stats.career}</p>
                </div>
            </div>
            <button onClick={onClose} className="p-1 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                <XMarkIcon className="w-5 h-5" />
            </button>
        </div>
        
        <div className="p-6 pt-4 space-y-6">
            
            <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Saldo Atual</span>
                 </div>
                 <div className="text-3xl font-mono font-bold text-white tracking-tight">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stats.money)}
                 </div>
            </div>

            {/* Status Principais */}
            <div>
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 pl-1">Biometria</h3>
                <div className="grid grid-cols-2 gap-3">
                    <StatPill icon={<HeartIcon className="text-red-400"/>} label="Saúde" value={stats.health} />
                    <StatPill icon={<SparklesIcon className="text-yellow-400"/>} label="Felicidade" value={stats.happiness} />
                    <StatPill icon={<LightBulbIcon className="text-blue-400"/>} label="Inteligência" value={stats.intelligence} />
                    <StatPill icon={<UserIcon className="text-pink-400"/>} label="Aparência" value={stats.appearance} />
                </div>
            </div>

            {/* Status Secundários */}
            <div>
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 pl-1">Psicossocial</h3>
                <div className="grid grid-cols-3 gap-3">
                    <StatPill icon={<FireIcon className="text-orange-400"/>} label="Estresse" value={stats.stress} />
                    <StatPill icon={<StarIcon className="text-purple-400"/>} label="Notoriedade" value={stats.notoriety} />
                    <StatPill icon={<ShieldExclamationIcon className="text-red-500"/>} label="Crime" value={stats.criminality} />
                </div>
            </div>
            
             <div className="text-center">
                 <span className="text-xs text-gray-600">Educação: {stats.education}</span>
             </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PlayerStatsModal);
