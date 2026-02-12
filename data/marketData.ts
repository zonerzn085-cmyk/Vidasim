
export interface CorpEntity {
    name: string;
    type: 'Real' | 'Fictício';
    sector: string;
    valuation?: string;
    description: string; // Contexto para a IA
}

export interface TradableAsset {
    id: string;
    name: string;
    type: 'Ação' | 'Cripto' | 'Renda Fixa' | 'Fundo Imobiliário';
    risk: 'Baixo' | 'Médio' | 'Alto' | 'Extremo';
    description: string;
    minEntry: number;
}

export const availableAssets: TradableAsset[] = [
    { id: "asset_selic", name: "Tesouro Selic 2029", type: "Renda Fixa", risk: "Baixo", description: "Títulos públicos seguros atrelados à taxa de juros.", minEntry: 100 },
    { id: "asset_cdb", name: "CDB Banco Inter", type: "Renda Fixa", risk: "Baixo", description: "Certificado de Depósito Bancário com liquidez diária.", minEntry: 50 },
    { id: "asset_fii_hglg", name: "FII HGLG11 (Logística)", type: "Fundo Imobiliário", risk: "Médio", description: "Fundo de galpões logísticos. Renda passiva de aluguéis.", minEntry: 200 },
    { id: "asset_fii_mxrf", name: "FII MXRF11 (Papel)", type: "Fundo Imobiliário", risk: "Médio", description: "Fundo de recebíveis imobiliários. Popular e acessível.", minEntry: 10 },
    { id: "asset_stock_petr4", name: "Petrobras (PETR4)", type: "Ação", risk: "Alto", description: "Gigante estatal de petróleo. Dividendos altos, risco político.", minEntry: 500 },
    { id: "asset_stock_nvda", name: "NVIDIA Corp", type: "Ação", risk: "Alto", description: "Líder em chips de IA. Potencial de crescimento explosivo.", minEntry: 1000 },
    { id: "asset_stock_weg", name: "WEG S.A.", type: "Ação", risk: "Médio", description: "Multinacional brasileira de equipamentos elétricos.", minEntry: 300 },
    { id: "asset_crypto_btc", name: "Bitcoin", type: "Cripto", risk: "Extremo", description: "Ouro digital descentralizado. Volatilidade extrema.", minEntry: 100 },
    { id: "asset_crypto_eth", name: "Ethereum", type: "Cripto", risk: "Alto", description: "Plataforma de contratos inteligentes e Web3.", minEntry: 100 },
    { id: "asset_crypto_meme", name: "DogeCoin", type: "Cripto", risk: "Extremo", description: "Moeda meme. Pode ir à lua ou a zero.", minEntry: 50 }
];

export const corporateDatabase: Record<string, CorpEntity[]> = {
    financeiro: [
        { name: "Itaú Unibanco S.A.", type: "Real", sector: "Bancário", valuation: "R$ 433B", description: "Benchmark para bancos privados de varejo e atacado." },
        { name: "Banco do Brasil S.A.", type: "Real", sector: "Bancário", valuation: "R$ 128B", description: "Estatal, forte no agronegócio." },
        { name: "Banco Meridional do Atlântico", type: "Fictício", sector: "Bancário", valuation: "R$ 98B", description: "Banco tradicional do Sul, focado em financiamento industrial." },
        { name: "Nubank (Nu Holdings)", type: "Real", sector: "Fintech", valuation: "R$ 250B", description: "Neobanco líder global." },
        { name: "CrediFácil Soluções Ltda", type: "Fictício", sector: "Crédito", valuation: "R$ 150M", description: "Fintech focada em microcrédito para negativados." },
        { name: "Nebula Bank Digital", type: "Fictício", sector: "Neobanco", valuation: "R$ 8.5B", description: "Banco 100% digital focado na Geração Z e gamers." },
        { name: "Pinnacle Asset Management", type: "Fictício", sector: "Investimentos", valuation: "R$ 45B", description: "Gestora de fortunas para clientes ultra-high." },
        { name: "Solidus Bank S.A.", type: "Fictício", sector: "Bancário", valuation: "R$ 60B", description: "Banco conservador focado em crédito imobiliário." }
    ],
    tecnologia: [
        { name: "Totvs S.A.", type: "Real", sector: "Software/ERP", valuation: "R$ 18B", description: "Gigante brasileira de gestão empresarial." },
        { name: "OmniCode Systems", type: "Fictício", sector: "DevTools", valuation: "R$ 450M", description: "Plataforma de Low-code e DevOps automation." },
        { name: "Vortex Data Analytics", type: "Fictício", sector: "Big Data", valuation: "R$ 1.2B", description: "Consultoria de Machine Learning e Predictive Analysis." },
        { name: "Mercado Livre", type: "Real", sector: "E-commerce", valuation: "R$ 400B", description: "Maior empresa de tecnologia da América Latina." },
        { name: "Sentinel CyberSecurity", type: "Fictício", sector: "Segurança", valuation: "R$ 2.5B", description: "Empresa de Zero Trust e Endpoint Protection." },
        { name: "NeuralMind AI", type: "Fictício", sector: "IA", valuation: "R$ 3B", description: "Laboratório de NLP e LLMs generativos em português." },
        { name: "LogiTrack Rastreamento", type: "Fictício", sector: "LogTech", valuation: "R$ 220M", description: "Solução de IoT e frota conectada." }
    ],
    varejo: [
        { name: "Grupo Carrefour Brasil", type: "Real", sector: "Varejo Alimentar", valuation: "R$ 115B", description: "Líder do varejo alimentar e atacarejo." },
        { name: "Lojas Imperatriz", type: "Fictício", sector: "Varejo Eletro", valuation: "R$ 5B", description: "Rede de eletrodomésticos popular do Norte." },
        { name: "Magazine Luiza (Magalu)", type: "Real", sector: "E-commerce", valuation: "R$ 20B", description: "Ecossistema digital de varejo." },
        { name: "Moda Fina Têxtil S.A.", type: "Fictício", sector: "Vestuário", valuation: "R$ 1.2B", description: "Indústria de moda Fast Fashion." },
        { name: "EletroMax Importadora", type: "Fictício", sector: "Eletrônicos", valuation: "R$ 300M", description: "Importadora de gadgets white-label." },
        { name: "Livraria Cultura do Saber", type: "Fictício", sector: "Livraria", valuation: "R$ 40M", description: "Focada em material didático e universitário." },
        { name: "PetShop Amigo Fiel", type: "Fictício", sector: "Pet", valuation: "R$ 600M", description: "Rede regional com clínica 24h." }
    ],
    industria_agro: [
        { name: "Vale S.A.", type: "Real", sector: "Mineração", valuation: "R$ 320B", description: "Nomes curtos e geológicos dominam o setor." },
        { name: "Agropecuária Boi Gordo S.A.", type: "Fictício", sector: "Pecuária", valuation: "R$ 3B", description: "Empresa com 500 mil cabeças de gado e confinamento." },
        { name: "SLC Agrícola", type: "Real", sector: "Agrícola", valuation: "R$ 9B", description: "Uma das maiores proprietárias de terras agrícolas do mundo." },
        { name: "Construtora Pilar Forte", type: "Fictício", sector: "Construção", valuation: "R$ 1.8B", description: "Focada em obras públicas, pontes e viadutos." },
        { name: "Mineração Ferro Puro", type: "Fictício", sector: "Mineração", valuation: "R$ 15B", description: "Extração de minério de ferro de alto teor." },
        { name: "Metalúrgica Aço Nobre", type: "Fictício", sector: "Siderurgia", valuation: "R$ 4.2B", description: "Produtora de chapas de aço para indústria automotiva." },
        { name: "Grãos do Centro-Oeste Export", type: "Fictício", sector: "Trading", valuation: "R$ 8.5B", description: "Silos de soja e milho e terminal ferroviário." }
    ]
};

// Helper para a IA entender como criar nomes se precisar
export const namingConventions = `
REGRAS DE NOMENCLATURA CORPORATIVA (Estilo BitLife):
1. Financeiro: Nomes sólidos, cores (Vermelho, Azul), referências geográficas (Meridional, Atlântico).
2. Tech: Sufixos -ly, -ify, -io, -sys. Prefixos Omni-, Neo-, Data-. (Ex: Vexia, Zorp).
3. Agronegócio: Siglas (LDC, ADM), sobrenomes de famílias, "Coop" (Cooperativa).
4. Varejo: Nomes de fundadores, topônimos regionais, palavras simples e sonoras.
`;
