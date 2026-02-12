
import React, { useState, useEffect } from 'react';
import { UniversityCourse, PlayerStats } from '../types';
import { XMarkIcon, AcademicCapIcon, BookOpenIcon, ClockIcon } from '@heroicons/react/24/outline';
import { fetchEducationOptions } from '../services/geminiService';
import { Content } from '@google/genai';

interface EducationDialogProps {
    playerStats: PlayerStats;
    history: Content[];
    onEnroll: (courseName: string, type: string) => void;
    onClose: () => void;
}

const CourseSkeleton = () => (
    <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/50 animate-pulse flex flex-col gap-3">
        <div className="flex justify-between">
            <div className="h-6 bg-gray-700 rounded w-1/2"></div>
            <div className="h-6 bg-gray-700 rounded w-16"></div>
        </div>
        <div className="h-12 bg-gray-700/30 rounded w-full"></div>
        <div className="flex gap-2">
            <div className="h-6 bg-gray-700/50 rounded w-1/3"></div>
            <div className="h-6 bg-gray-700/50 rounded w-1/3"></div>
        </div>
        <div className="h-10 bg-gray-700 rounded w-full mt-1"></div>
    </div>
);

function EducationDialog({ playerStats, history, onEnroll, onClose }: EducationDialogProps): React.ReactElement {
    const [courses, setCourses] = useState<UniversityCourse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const loadCourses = async () => {
            try {
                const fetchedCourses = await fetchEducationOptions(playerStats, history);
                if (isMounted) {
                    setCourses(fetchedCourses || []);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Failed to load courses", error);
                if (isMounted) setIsLoading(false);
            }
        };
        loadCourses();
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
                            <AcademicCapIcon className="w-8 h-8 text-indigo-400" />
                            Universidade
                        </h2>
                        <p className="text-sm text-gray-400">Invista no seu futuro.</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-6 bg-gray-950/50 space-y-4">
                    {isLoading ? (
                         Array.from({ length: 3 }).map((_, i) => <CourseSkeleton key={i} />)
                    ) : courses.length > 0 ? (
                        courses.map((course, idx) => (
                            <div key={idx} className="bg-gray-800/40 hover:bg-gray-800/60 p-5 rounded-2xl border border-gray-700/50 hover:border-indigo-500/30 transition-all group flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">{course.name}</h3>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-200 bg-indigo-900/40 px-3 py-1.5 rounded-full border border-indigo-500/20">
                                        <ClockIcon className="w-3.5 h-3.5" />
                                        {course.durationYears} anos
                                    </div>
                                </div>
                                
                                <p className="text-sm text-gray-300 mb-4 flex-grow opacity-80">{course.description}</p>
                                
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                     <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/30">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Investimento</p>
                                        <p className="text-red-300 font-mono font-bold text-sm">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(course.costPerYear)}/ano</p>
                                     </div>
                                     <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/30">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Requisitos</p>
                                        <p className="text-gray-300 text-xs truncate" title={course.requirements}>{course.requirements}</p>
                                     </div>
                                </div>

                                <button 
                                    onClick={() => onEnroll(course.name, 'Curso Superior')}
                                    className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-900/20 transform active:scale-[0.98]"
                                >
                                    <BookOpenIcon className="w-5 h-5"/>
                                    Realizar Matrícula
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-10 opacity-60">
                             <AcademicCapIcon className="w-16 h-16 mx-auto mb-4"/>
                            <p>Nenhum curso disponível.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default React.memo(EducationDialog);
