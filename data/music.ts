
export interface SpotifyPlaylist {
    name: string;
    id: string; // Spotify Playlist ID
    category: 'Foco' | 'Brasil' | 'Pop' | 'Vibe' | 'Rock' | 'Relax';
}

export const playlists: SpotifyPlaylist[] = [
    // Foco / Trabalho
    { name: "Lofi Girl", id: "0vvXsWCC9xrXsKd4FyS8kM", category: "Foco" },
    { name: "Deep Focus", id: "37i9dQZF1DWZeKCadgRdKQ", category: "Foco" },
    { name: "Brain Food", id: "37i9dQZF1DWXLeA8Omikj7", category: "Foco" },
    { name: "Coding Mode", id: "37i9dQZF1DX692WcMwL2yW", category: "Foco" },

    // Brasil
    { name: "Top Brasil", id: "37i9dQZF1DX0FOF1IUWK1W", category: "Brasil" },
    { name: "Funk Hits", id: "37i9dQZF1DWWmhNJ4gcyWj", category: "Brasil" },
    { name: "Pagodeira", id: "37i9dQZF1DX2j9dD2Y680Q", category: "Brasil" },
    { name: "MPB Classics", id: "37i9dQZF1DX8EhyqoXywTI", category: "Brasil" },
    { name: "Sertanejo Pop", id: "37i9dQZF1DX343baI6h3K7", category: "Brasil" },
    { name: "Rap Brasil", id: "37i9dQZF1DX2Rc2d2zEk05", category: "Brasil" },

    // Pop / Global
    { name: "Top 50 Global", id: "37i9dQZEVXbMDoHDwVN2tF", category: "Pop" },
    { name: "Pop Up", id: "37i9dQZF1DX2vYju3i0lNX", category: "Pop" },
    { name: "Viral Hits", id: "37i9dQZF1DX2L0iB23Enbq", category: "Pop" },
    { name: "Throwback 2000s", id: "37i9dQZF1DX4o1oenSJRJd", category: "Pop" },

    // Vibe / Games
    { name: "Synthwave", id: "37i9dQZF1DXdLEN7aqioXM", category: "Vibe" },
    { name: "Cyberpunk", id: "37i9dQZF1DX0i61tT0OnnK", category: "Vibe" },
    { name: "Phonk", id: "37i9dQZF1DWWY64wDtewQt", category: "Vibe" },
    { name: "Gaming Hardstyle", id: "37i9dQZF1DX9jgH6f0A4rK", category: "Vibe" },
    { name: "Trap Nation", id: "37i9dQZF1DX3rX1fCn6sB8", category: "Vibe" },

    // Rock
    { name: "Rock Classics", id: "37i9dQZF1DWXRqgorJj26U", category: "Rock" },
    { name: "Metal Essentials", id: "37i9dQZF1DWWOaP4H0wKns", category: "Rock" },
    { name: "Indie Rock", id: "37i9dQZF1DWWEcRhUVtL8n", category: "Rock" },

    // Relax / Classica
    { name: "Classical Essentials", id: "37i9dQZF1DWWEJlAGA9gs0", category: "Relax" },
    { name: "Jazz Vibes", id: "37i9dQZF1DXbITWG1ZJK8t", category: "Relax" },
    { name: "Piano Peace", id: "37i9dQZF1DX4sWSpwq3LiO", category: "Relax" },
    { name: "Sleep", id: "37i9dQZF1DWZd79rJ6a7lp", category: "Relax" }
];
