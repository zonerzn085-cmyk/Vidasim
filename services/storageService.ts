
import { SaveData } from '../types';
import C from '../constants';

const DB_KEY = 'vidaSimSaves';

/**
 * StorageService acts as the Database Layer for the application.
 * Currently uses LocalStorage, but is structured to easily swap to IndexedDB 
 * or a Cloud API in the future without breaking the rest of the app.
 */
export const storageService = {
    /**
     * Retrieves all saves from the browser's local database.
     */
    getSaves: (): SaveData[] => {
        try {
            const savedDataString = localStorage.getItem(DB_KEY);
            if (!savedDataString) return [];
            
            const parsed = JSON.parse(savedDataString);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.error("Database Error (Read): Failed to parse saves.", error);
            return [];
        }
    },

    /**
     * Saves or Updates a specific life in the database.
     * Handles quota exceeded errors by trimming non-essential data (history/logs).
     */
    saveLife: (lifeToSave: SaveData): boolean => {
        try {
            const currentSaves = storageService.getSaves();
            const existingIndex = currentSaves.findIndex(life => life.id === lifeToSave.id);
            
            let updatedSaves;
            if (existingIndex !== -1) {
                updatedSaves = [...currentSaves];
                updatedSaves[existingIndex] = lifeToSave;
            } else {
                updatedSaves = [...currentSaves, lifeToSave];
            }

            try {
                localStorage.setItem(DB_KEY, JSON.stringify(updatedSaves));
                return true;
            } catch (e: any) {
                if (e.name === 'QuotaExceededError' || e.code === 22) {
                    console.warn("Storage Quota Exceeded! Attempting emergency trim...");
                    
                    // Emergency Strategy: Remove 'history' (AI Context) from ALL saves to free space
                    // We keep 'gameLog' (Visible text) but remove 'history' (Technical context)
                    const optimizedSaves = updatedSaves.map(save => ({
                        ...save,
                        history: [], // Clear AI context history (heavy)
                        gameLog: save.gameLog.slice(-50) // Keep only last 50 turns logs
                    }));

                    try {
                        localStorage.setItem(DB_KEY, JSON.stringify(optimizedSaves));
                        console.log("Emergency save successful after trim.");
                        return true;
                    } catch (retryError) {
                        console.error("Critical: Could not save even after trimming.", retryError);
                        alert("ERRO CRÍTICO: Armazenamento do navegador cheio. Não foi possível salvar o jogo. Tente apagar saves antigos.");
                        return false;
                    }
                }
                throw e;
            }
        } catch (error) {
            console.error("Database Error (Write): Failed to save life.", error);
            return false;
        }
    },

    /**
     * Deletes a specific life from the database by ID.
     */
    deleteLife: (id: string): SaveData[] => {
        try {
            const currentSaves = storageService.getSaves();
            const updatedSaves = currentSaves.filter(life => life.id !== id);
            localStorage.setItem(DB_KEY, JSON.stringify(updatedSaves));
            return updatedSaves;
        } catch (error) {
            console.error("Database Error (Delete): Failed to delete life.", error);
            return [];
        }
    },

    /**
     * Bulk saves the entire list (used for imports or migrations).
     */
    saveAll: (lives: SaveData[]): void => {
        try {
            localStorage.setItem(DB_KEY, JSON.stringify(lives));
        } catch (error) {
            console.error("Database Error (Bulk Write): Failed to save all lives.", error);
        }
    }
};
