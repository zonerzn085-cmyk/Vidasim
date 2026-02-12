
import { SaveData, User } from '../types';

const CLOUD_DB_KEY = 'vidaSim_cloud_db';
const SESSION_KEY = 'vidaSim_session';

// --- MOCK DATABASE STRUCTURE ---
interface CloudDB {
    users: Array<{
        id: string;
        name: string;
        email: string;
        passwordHash: string; // "Hashed" just for simulation
        createdAt: number;
    }>;
    saves: Record<string, SaveData[]>; // UserId -> SaveData[]
}

// Initialize "Cloud" safely
const initCloud = (): CloudDB => {
    try {
        const data = localStorage.getItem(CLOUD_DB_KEY);
        if (data) {
            return JSON.parse(data);
        }
    } catch (e) {
        console.error("Cloud DB Corrupted. Resetting.", e);
    }
    
    const initial = { users: [], saves: {} };
    // Try to initialize, but don't crash if quota full
    try {
        localStorage.setItem(CLOUD_DB_KEY, JSON.stringify(initial));
    } catch (e) {
        console.error("Failed to init cloud db storage", e);
    }
    return initial;
};

// Simulate Network Delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
    // --- AUTHENTICATION ---

    register: async (name: string, email: string, password: string): Promise<User> => {
        await delay(800); // Network lag
        const db = initCloud();
        
        if (db.users.some(u => u.email === email)) {
            throw new Error("Este email já está registrado.");
        }

        const newUser = {
            id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            name,
            email,
            passwordHash: btoa(password), // Mock encryption
            createdAt: Date.now()
        };

        db.users.push(newUser);
        try {
            localStorage.setItem(CLOUD_DB_KEY, JSON.stringify(db));
            // Auto Login
            localStorage.setItem(SESSION_KEY, JSON.stringify({ id: newUser.id, name: newUser.name, email: newUser.email, createdAt: newUser.createdAt }));
        } catch (e) {
            throw new Error("Falha no armazenamento. Armazenamento cheio?");
        }
        
        return { id: newUser.id, name: newUser.name, email: newUser.email, createdAt: newUser.createdAt };
    },

    login: async (email: string, password: string): Promise<User> => {
        await delay(600);
        const db = initCloud();
        const user = db.users.find(u => u.email === email && u.passwordHash === btoa(password));

        if (!user) {
            throw new Error("Credenciais inválidas.");
        }

        const sessionUser = { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
        
        return sessionUser;
    },

    logout: async () => {
        await delay(200);
        localStorage.removeItem(SESSION_KEY);
    },

    getCurrentUser: (): User | null => {
        try {
            const data = localStorage.getItem(SESSION_KEY);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    },

    // --- CLOUD STORAGE ---

    syncSave: async (userId: string, save: SaveData): Promise<void> => {
        await delay(500);
        const db = initCloud();
        
        if (!db.saves[userId]) db.saves[userId] = [];
        
        const existingIndex = db.saves[userId].findIndex(s => s.id === save.id);
        
        // Remove heavy history for cloud sync to save space
        const optimizedSave = { ...save, history: [] }; 
        
        if (existingIndex >= 0) {
            // Update existing
            db.saves[userId][existingIndex] = optimizedSave;
        } else {
            // Add new
            db.saves[userId].push(optimizedSave);
        }

        try {
            localStorage.setItem(CLOUD_DB_KEY, JSON.stringify(db));
        } catch (e) {
            console.error("Cloud storage quota exceeded");
        }
    },

    fetchCloudSaves: async (userId: string): Promise<SaveData[]> => {
        await delay(1000); // Simulate downloading large files
        const db = initCloud();
        return db.saves[userId] || [];
    }
};
