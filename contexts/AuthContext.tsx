
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, SaveData } from '../types';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';
import { supabase } from '../supabaseClient';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, pass: string) => Promise<void>;
    register: (name: string, email: string, pass: string) => Promise<void>;
    logout: () => void;
    syncSaves: () => Promise<void>; // Pulls from cloud to local
    uploadSave: (save: SaveData) => Promise<void>; // Pushes local to cloud
    isSyncing: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children?: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);

    // Initialize Session
    useEffect(() => {
        // Check active session on load
        authService.getUserSession().then(sessionUser => {
            setUser(sessionUser);
        });

        // Listen for auth changes (e.g. token refresh, logout in another tab)
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    name: session.user.user_metadata.name || "Jogador",
                    email: session.user.email || "",
                    createdAt: new Date(session.user.created_at).getTime()
                });
            } else {
                setUser(null);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const login = useCallback(async (email: string, pass: string) => {
        const loggedUser = await authService.login(email, pass);
        // User state will be updated by onAuthStateChange
    }, []);

    const register = useCallback(async (name: string, email: string, pass: string) => {
        await authService.register(name, email, pass);
        // User state will be updated by onAuthStateChange
    }, []);

    const logout = useCallback(async () => {
        await authService.logout();
    }, []);

    const syncSaves = useCallback(async () => {
        if (!user) return;
        setIsSyncing(true);
        try {
            // 1. Get Cloud Saves
            const cloudSaves = await authService.fetchCloudSaves(user.id);
            
            // 2. Get Local Saves
            const localSaves = storageService.getSaves();

            // 3. Merge Logic (Cloud wins if newer or if local missing)
            const mergedMap = new Map<string, SaveData>();
            
            // First load locals
            localSaves.forEach(s => mergedMap.set(s.id, s));
            
            // Then overwrite with cloud (assuming cloud is source of truth for Restore action)
            cloudSaves.forEach(s => mergedMap.set(s.id, s)); 

            const mergedList = Array.from(mergedMap.values());
            storageService.saveAll(mergedList);
            
        } catch (e) {
            console.error("Sync failed", e);
            alert("Erro ao sincronizar com a nuvem.");
        } finally {
            setIsSyncing(false);
        }
    }, [user]);

    const uploadSave = useCallback(async (save: SaveData) => {
        if (!user) return;
        try {
            await authService.syncSave(user.id, save);
        } catch (e) {
            console.error("Cloud upload failed", e);
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            login,
            register,
            logout,
            syncSaves,
            uploadSave,
            isSyncing
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
