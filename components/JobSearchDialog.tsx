
import React, { useState, useEffect } from 'react';
import { JobOffer, PlayerStats } from '../types';
import { XMarkIcon, BriefcaseIcon, CheckCircleIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { fetchAvailableJobs } from '../services/geminiService';
import { Content } from '@google/genai';

interface JobSearchDialogProps {
    playerStats: PlayerStats;
    history: Content[];
    onApply: (jobTitle: string, company: string) => void;
    onClose: () => void;
}

const JobSkeleton = () => (
    <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/50 animate-pulse flex flex-col gap-3">
        <div className="flex justify-between">
            <div className="h-6 bg-gray-700 rounded w-1/3"></div>
            <div className="h-6 bg-gray-700 rounded w-20"></div>
        </div>
        <div className="h-4 bg-gray-700/50 rounded w-1/4"></div>
        <div className="h-12 bg-gray-700/30 rounded w-full"></div>
        <div className="h-10 bg-gray-700 rounded w-full mt-2"></div>
    </div>
);

function JobSearchDialog({ playerStats, history, onApply, onClose }: JobSearchDialogProps): React.ReactElement {
    const [jobs, setJobs] = useState<JobOffer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const loadJobs = async () => {
            try {
                const fetchedJobs = await fetchAvailableJobs(playerStats, history);
                if (isMounted) {
                    setJobs(fetchedJobs || []);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Failed to load jobs", error);
                if (isMounted) setIsLoading(false);
            }
        };
        loadJobs();
        return () => { isMounted = false; };
    }, [playerStats, history]);

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fade-in-up"
            onClick={onClose}
        >
            <div 
                className="bg-gray-900/95 border border-gray-700/50 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md z-10">
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                            <BriefcaseIcon className="w-8 h-8 text-blue-400" />
                            Vagas.IA
                        </h2>
                        <p className="text-sm text-gray-400">Encontre o próximo passo da sua carreira.</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-6 bg-gray-950/50 space-y-4">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => <JobSkeleton key={i} />)
                    ) : jobs.length > 0 ? (
                        jobs.map((job, idx) => (
                            <div key={idx} className="bg-gray-800/40 hover:bg-gray-800/60 p-5 rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-all group">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">{job.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                            <BuildingOfficeIcon className="w-4 h-4" />
                                            <span>{job.company}</span>
                                        </div>
                                    </div>
                                    <div className="text-green-400 font-mono font-bold text-sm bg-green-900/20 px-3 py-1 rounded-full border border-green-500/20">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(job.salary)}/ano
                                    </div>
                                </div>
                                
                                <p className="text-sm text-gray-300 mb-4 leading-relaxed opacity-80">{job.description}</p>
                                
                                <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50 mb-4">
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Requisitos</p>
                                    <p className="text-sm text-gray-300">{job.requirements}</p>
                                </div>

                                <button 
                                    onClick={() => onApply(job.title, job.company)}
                                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-3 rounded-lg transition-all shadow-lg shadow-blue-900/20 transform active:scale-[0.98]"
                                >
                                    <CheckCircleIcon className="w-5 h-5"/>
                                    Aplicar para Vaga
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-10 opacity-60">
                             <BriefcaseIcon className="w-16 h-16 mx-auto mb-4"/>
                            <p>Nenhuma oportunidade encontrada.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default React.memo(JobSearchDialog);
