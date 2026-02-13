
export interface ChangelogEntry {
    version: string;
    date: string;
    title: string;
    changes: string[];
}

export const changelogData: ChangelogEntry[] = [
    {
        version: "1.2.0",
        date: "Hoje",
        title: "Atualização de Estabilidade & Música",
        changes: [
            "CRÍTICO: Sistema de salvamento na nuvem reforçado. Saves agora sincronizam automaticamente ao abrir o menu.",
            "NOVO: Integração expandida de Rádio (Spotify) com categorias (Foco, Brasil, Phonk, etc).",
            "NOVO: Seletor de Modo de Jogo (Robusto vs Resumo) ao iniciar uma vida.",
            "Melhoria na formatação de texto da IA (agora ela resume textos longos no modo Resumo).",
            "Correção de bugs na migração de saves antigos."
        ]
    },
    {
        version: "1.1.0",
        date: "Anterior",
        title: "Vida Financeira & Imóveis",
        changes: [
            "Adicionado painel de Investimentos (Ações, FIIs, Cripto).",
            "Adicionado sistema de compra e aluguel de imóveis nos bairros.",
            "NPCs agora possuem retratos gerados (placeholders) e competências visíveis."
        ]
    },
    {
        version: "1.0.0",
        date: "Lançamento",
        title: "Bem-vindo ao VidaSim",
        changes: [
            "Lançamento inicial do simulador de vida baseado em IA.",
            "Sistemas básicos: Carreira, Relacionamentos, Bairros e Eventos Aleatórios."
        ]
    }
];
