
export interface RadioStation {
    name: string;
    id: string; // YouTube Video ID (para Lives/Mixes) ou Playlist ID
    provider: 'youtube';
    category: 'Foco' | 'Brasil' | 'Pop' | 'Vibe' | 'Rock' | 'Relax';
    isLive?: boolean;
}

// NOTA: Usamos IDs de Livestreams (Rádios 24h) sempre que possível para evitar o "Erro 150/153"
// que ocorre quando gravadoras bloqueiam músicas específicas em players externos.
export const playlists: RadioStation[] = [
    // --- FOCO / TRABALHO ---
    { name: "Lofi Girl Radio", id: "jfKfPfyJRdk", provider: "youtube", category: "Foco", isLive: true },
    { name: "Coding Chill", id: "_tFVGfw7zFw", provider: "youtube", category: "Foco", isLive: true }, 

    // --- VIBE / GAMES ---
    { name: "Synthwave Radio", id: "4xDzrJKXOOY", provider: "youtube", category: "Vibe", isLive: true },
    { name: "Phonk Gaming 24/7", id: "3lTRBno3e6o", provider: "youtube", category: "Vibe", isLive: true },

    // --- RELAX ---
    { name: "Coffee Shop Jazz", id: "G5GSLo99h9I", provider: "youtube", category: "Relax", isLive: true },
    { name: "Bossa Nova Mix", id: "HuK57d5P6wE", provider: "youtube", category: "Relax", isLive: false }, // Mix Longo (Safe)

    // --- BRASIL ---
    // Brasil é difícil achar Live 24h estável, usando Mixes longos sem copyright agressivo
    { name: "Brasil Vibe Mix", id: "x8z7-eJ-QVI", provider: "youtube", category: "Brasil", isLive: false },
    { name: "MPB Relax", id: "7WOqHKqYq4E", provider: "youtube", category: "Brasil", isLive: false },

    // --- POP / GLOBAL ---
    { name: "Pop Hits Radio", id: "HQtfr3mZk5o", provider: "youtube", category: "Pop", isLive: true },
    { name: "Top 40 Radio", id: "8M7d6537d9M", provider: "youtube", category: "Pop", isLive: true },

    // --- ROCK ---
    { name: "Classic Rock Radio", id: "N_G30f3K9v4", provider: "youtube", category: "Rock", isLive: true },
    { name: "Indie Rock Radio", id: "oVi5ySSAajg", provider: "youtube", category: "Rock", isLive: true }
];
