
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, SaveData } from '../types';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';

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

    useEffect(() => {
        const storedUser = authService.getCurrentUser();
        if (storedUser) setUser(storedUser);
    }, []);

    const login = useCallback(async (email: string, pass: string) => {
        const loggedUser = await authService.login(email, pass);
        setUser(loggedUser);
        // Auto-sync on login can be added here if desired
    }, []);

    const register = useCallback(async (name: string, email: string, pass: string) => {
        const newUser = await authService.register(name, email, pass);
        setUser(newUser);
    }, []);

    const logout = useCallback(async () => {
        await authService.logout();
        setUser(null);
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
            // Ideally we check timestamps, but for simplicity we'll just merge unique IDs
            // and prefer Cloud for conflicts in this "Restore" action.
            
            const mergedMap = new Map<string, SaveData>();
            localSaves.forEach(s => mergedMap.set(s.id, s));
            cloudSaves.forEach(s => mergedMap.set(s.id, s)); // Cloud overwrites local in simple sync

            const mergedList = Array.from(mergedMap.values());
            storageService.saveAll(mergedList);
            
        } catch (e) {
            console.error("Sync failed", e);
        } finally {
            setIsSyncing(false);
        }
    }, [user]);

    const uploadSave = useCallback(async (save: SaveData) => {
        if (!user) return;
        // Don't set global isSyncing to avoid UI lock, just background push
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
