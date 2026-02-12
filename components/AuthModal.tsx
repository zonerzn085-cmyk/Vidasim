
import React, { useState } from 'react';
import { XMarkIcon, UserCircleIcon, LockClosedIcon, EnvelopeIcon, ArrowRightOnRectangleIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';

interface AuthModalProps {
    onClose: () => void;
}

function AuthModal({ onClose }: AuthModalProps): React.ReactElement {
    const { login, register } = useAuth();
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMsg(null);
        setLoading(true);

        try {
            if (mode === 'login') {
                await login(email, password);
                onClose();
            } else {
                if (!name) throw new Error("Nome é obrigatório.");
                await register(name, email, password);
                
                const { data } = await supabase.auth.getSession();
                if (data.session) {
                    onClose(); 
                } else {
                    // Mensagem mais robusta e amigável
                    setSuccessMsg("Conta criada com sucesso!");
                    setMode('login'); 
                }
            }
        } catch (err: any) {
            setError(err.message || "Ocorreu um erro inesperado.");
        } finally {
            setLoading(false);
        }
    };

    // Tela de Sucesso Específica (Confirmação de Email)
    if (successMsg && mode === 'login' && !loading) {
        return (
            <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in-up">
                <div className="bg-gray-900 border border-green-500/30 rounded-3xl shadow-[0_0_50px_rgba(34,197,94,0.15)] w-full max-w-md overflow-hidden relative p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                        <CheckCircleIcon className="w-8 h-8 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Verifique seu E-mail</h2>
                    <p className="text-gray-300 mb-6">
                        Enviamos um link de confirmação para <strong>{email}</strong>.
                        <br/><br/>
                        Clique no link para ativar sua conta e começar a jogar. Lembre-se de checar a caixa de <strong>Spam</strong>.
                    </p>
                    <button 
                        onClick={() => setSuccessMsg(null)}
                        className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl transition-colors border border-gray-700"
                    >
                        Voltar para Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in-up"
            onClick={onClose}
        >
            <div 
                className="bg-gray-900 border border-teal-500/30 rounded-3xl shadow-[0_0_50px_rgba(20,184,166,0.15)] w-full max-w-md overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Decoration */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-teal-500"></div>

                <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-3xl font-black text-white tracking-tight">
                                {mode === 'login' ? 'Bem-vindo de volta' : 'Criar Conta'}
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">
                                {mode === 'login' ? 'Sincronize seus saves na nuvem.' : 'Salve sua jornada para sempre.'}
                            </p>
                        </div>
                        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-sm p-4 rounded-xl mb-6 flex items-start gap-3">
                            <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === 'register' && (
                            <div className="relative group">
                                <UserCircleIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Nome de Jogador" 
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder-gray-600"
                                />
                            </div>
                        )}

                        <div className="relative group">
                            <EnvelopeIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder-gray-600"
                            />
                        </div>

                        <div className="relative group">
                            <LockClosedIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-500 group-focus-within:text-teal-400 transition-colors" />
                            <input 
                                type="password" 
                                placeholder="Senha" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all placeholder-gray-600"
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-900/30 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    {mode === 'login' ? 'Entrar' : 'Registrar'}
                                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-500 text-sm">
                            {mode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                            <button 
                                onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(null); setSuccessMsg(null); }}
                                className="ml-2 text-teal-400 hover:text-teal-300 font-bold hover:underline transition-all"
                            >
                                {mode === 'login' ? 'Crie agora' : 'Faça login'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(AuthModal);
