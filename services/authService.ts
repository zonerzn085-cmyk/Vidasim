
import { SaveData, User } from '../types';
import { supabase } from '../supabaseClient';

export const authService = {
    // --- AUTHENTICATION ---

    register: async (name: string, email: string, password: string): Promise<User> => {
        const currentUrl = typeof window !== 'undefined' ? window.location.origin : undefined;

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: name,
                },
                emailRedirectTo: currentUrl, 
            },
        });

        if (error) {
            console.error("Erro no Registro:", error);
            if (error.message.includes("User already registered") || error.message.includes("already registered")) {
                throw new Error("Este e-mail já está cadastrado. Tente fazer login.");
            }
            if (error.message.includes("Password should be")) {
                throw new Error("A senha deve ter pelo menos 6 caracteres.");
            }
            if (error.message.includes("valid email")) {
                throw new Error("Por favor, insira um e-mail válido.");
            }
            if (error.message.includes("rate limit") || error.message.includes("Too many requests") || error.status === 429) {
                throw new Error("Muitas tentativas recentes. O sistema bloqueou temporariamente por segurança. Aguarde 15 minutos.");
            }
            throw new Error("Erro ao criar conta: " + error.message);
        }

        if (data.user && !data.session) {
             return {
                id: data.user.id,
                name: name,
                email: email,
                createdAt: Date.now()
             };
        }

        if (!data.user) throw new Error("Erro desconhecido ao criar usuário.");

        return {
            id: data.user.id,
            name: data.user.user_metadata.name || name,
            email: data.user.email || email,
            createdAt: new Date(data.user.created_at).getTime()
        };
    },

    login: async (email: string, password: string): Promise<User> => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error("Erro no Login:", error);
            if (error.message.includes("Invalid login credentials")) {
                throw new Error("E-mail ou senha incorretos.");
            }
            if (error.message.includes("Email not confirmed")) {
                throw new Error("Seu e-mail ainda não foi confirmado. Verifique sua caixa de entrada (e spam).");
            }
            if (error.message.includes("rate limit") || error.message.includes("Too many requests")) {
                throw new Error("Muitas tentativas de login. Aguarde um momento antes de tentar de novo.");
            }
            throw new Error("Erro ao fazer login: " + error.message);
        }

        if (!data.user) throw new Error("Usuário não encontrado.");

        return {
            id: data.user.id,
            name: data.user.user_metadata.name || "Jogador",
            email: data.user.email || email,
            createdAt: new Date(data.user.created_at).getTime()
        };
    },

    logout: async () => {
        await supabase.auth.signOut();
    },

    getUserSession: async (): Promise<User | null> => {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) {
            return {
                id: data.session.user.id,
                name: data.session.user.user_metadata.name || "Jogador",
                email: data.session.user.email || "",
                createdAt: new Date(data.session.user.created_at).getTime()
            };
        }
        return null;
    },

    // --- CLOUD STORAGE ---

    syncSave: async (userId: string, save: SaveData): Promise<void> => {
        const payload = {
            id: save.id,
            user_id: userId,
            player_stats: save.playerStats,
            game_log: save.gameLog,
            history: [], 
            version: save.version
        };

        const { error } = await supabase
            .from('saves')
            .upsert(payload, { onConflict: 'id' });

        if (error) {
            console.error("Supabase Sync Error:", error);
            throw new Error("Falha ao salvar na nuvem: " + error.message);
        }
    },

    fetchCloudSaves: async (userId: string): Promise<SaveData[]> => {
        const { data, error } = await supabase
            .from('saves')
            .select('*')
            .eq('user_id', userId)
            .order('updated_at', { ascending: false });

        if (error) {
            console.error("Supabase Fetch Error:", error);
            throw new Error("Falha ao baixar saves da nuvem.");
        }

        return (data || []).map((row: any) => ({
            id: row.id,
            playerStats: row.player_stats,
            gameLog: row.game_log,
            history: row.history || [],
            version: row.version
        }));
    }
};
