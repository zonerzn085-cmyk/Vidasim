
import { Content } from "@google/genai";

export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: number;
}

export interface MentorshipDetails {
  status: 'PlayerIsMentor' | 'PlayerIsMentee';
  area: string; // e.g., 'Carreira', 'Programação', 'Artes'
  progress: number; // 0-100
}

export interface Relationship {
  id: string;
  name: string;
  type: string; // Ex: 'Mãe', 'Pai', 'Amigo', 'Colega de Trabalho'
  relationshipScore: number; // 0-100
  mentorshipDetails?: MentorshipDetails | null;
  // NPC Personality Profile
  personalityTraits: string[]; // e.g., 'Ambicioso', 'Tímido', 'Generoso'
  motivations: string[]; // e.g., 'Ganhar dinheiro', 'Proteger a família'
  background: string; // A short sentence about their history
  quirks: string[]; // e.g., 'Sempre usa um chapéu', 'Ri alto demais'
  competencies?: { [key: string]: number }; // e.g., { 'Liderança': 80, 'Criatividade': 95 }
  portraitBase64?: string;
}

export interface Executive {
  role: string; // 'Presidente', 'Diretor Criativo', 'CEO'
  personId: string; // ID of the Relationship object
}

export interface Technology {
  id: string;
  name: string;
  description: string;
  status: 'Em Desenvolvimento' | 'Concluído' | 'Arquivado';
  bonusEffect: string;
  yearCreated: number;
}

export type CurrencyType = 'BRL' | 'USD' | 'EUR';

export interface GameProject {
  id: string;
  name: string;
  genre: string;
  status: 'Em Desenvolvimento' | 'Lançado' | 'Cancelado' | 'Concluído';
  qualityScore: number;
  completionPercentage?: number; // 0-100, usado se estiver em desenvolvimento
  
  // Sales Logic
  unitPrice: number; // Preço por unidade
  currency: CurrencyType; // Moeda da venda (ex: USD para mercado global)
  unitsSold: number; // Total de unidades vendidas
  revenueGenerated: number; // Total monetário (convertido para base do jogador se necessário)
  
  developmentCost: number;
  assignedStudio: string; // 'Sede Principal' or a subsidiary name
  technologiesUsed: string[]; // List of technology names
  
  // Immersion & Simulation
  scale: 'Indie' | 'AA' | 'AAA';
  targetAudience: 'Infantil' | 'Jovem' | 'Adulto' | 'Geral';
  hype: number; // 0-100, afeta vendas iniciais
}


export interface Business {
  name: string;
  type: 'Legal' | 'Máfia' | 'Gangue de Rua';
  value: number;
  industry: string; // Ex: 'Tecnologia', 'Jogos', 'Varejo'
  quality: number; // 0-100
  marketing: number; // 0-100
  staffCount: number;
  annualRevenue: number;
  annualExpenses: number;
  customerCount?: number;
  monthlySubscriptionPrice?: number;
  executives?: Executive[];
  enterprises?: string[]; // List of illegal businesses (e.g., 'Extortion Racket')
  subsidiaries?: string[]; // List of studio/subsidiary names
  gameProjects?: GameProject[]; // Rastreia os jogos desenvolvidos pela empresa
  technologies?: Technology[];
  // Novos campos para gestão
  morale: number; // 0-100, moral dos funcionários
  workStyle: 'Relaxado' | 'Equilibrado' | 'Crunch Time';
}

export interface Building {
  id: string;
  name: string;
  type: 'Residencial' | 'Comercial' | 'Saúde' | 'Educação' | 'Lazer' | 'Trabalho' | 'Governamental' | 'Segurança';
  description: string;
  // Optional: Specific details for certain building types
  businessType?: 'Restaurante' | 'Loja' | 'Bar' | 'Oficina' | 'Mercado';
  serviceType?: 'Hospital' | 'Clínica' | 'Escola' | 'Universidade' | 'Delegacia';
  quality?: 'Baixa' | 'Média' | 'Alta';
  ownerId?: string; // ID of an NPC owner
}

export interface NotableNPC {
  id: string;
  name: string;
  description: string; // Ex: 'Dono da mercearia', 'Vizinho amigável'
  isPotentialMentor?: boolean;
  mentorArea?: string;
  // NPC Personality Profile
  personalityTraits: string[];
  motivations: string[];
  background: string;
  quirks: string[];
  competencies?: { [key: string]: number };
  portraitBase64?: string;
}

export interface Property {
  id: string;
  name: string; // Ex: 'Apartamento Aconchegante', 'Mansão Moderna'
  type: 'Apartamento' | 'Casa' | 'Mansão' | 'Terreno';
  value: number;
  upkeepCost: number; // Manutenção anual
  rentalIncome: number; // Renda de aluguel anual
  isRentedOut: boolean;
  neighborhoodId: string;
}

export interface Job {
  id: string;
  title: string;
  salary: number;
  requiredEducation: string;
  requiredIntelligence: number;
}

export interface NeighborhoodEvent {
  id:string;
  name: string;
  description: string;
  effects: string; // Text description of potential outcomes
  durationInYears: number; // How many years the event lasts
}

export interface ShopItem {
    id: string;
    name: string;
    category: 'Veículo' | 'Eletrônico' | 'Item de Luxo' | 'Outro';
    price: number;
    description: string;
    effect: string; // e.g. "Felicidade +10"
}

export interface Neighborhood {
  id: string;
  name: string;
  description: string;
  safety: number; // 0-100
  wealthLevel: 'Pobre' | 'Média' | 'Rica';
  buildings: Building[];
  notableNPCs: NotableNPC[];
  propertiesForSale: Property[];
  localJobs: Job[];
  shopItems?: ShopItem[]; // Items available in local shops
  currentEvent: NeighborhoodEvent | null;
  position: { x: number; y: number; };
}

export interface Task {
  id: string;
  title: string;
  category: 'Meta' | 'Tarefa'; // Goal or Task
  isComplete: boolean;
  dueDate: string; // e.g., "Final do ano", "Em 3 meses"
  relatedAttribute: 'intelligence' | 'health' | 'happiness' | 'career' | 'money' | 'appearance' | 'stress' | 'notoriety' | 'criminality' | 'none';
}

export interface Memory {
    year: number;
    description: string;
    significance: 'Baixa' | 'Média' | 'Alta' | 'Lendária';
    emotion: 'Alegria' | 'Tristeza' | 'Raiva' | 'Medo' | 'Orgulho' | 'Arrependimento';
}

export interface Investment {
    id: string;
    name: string;
    type: 'Ação' | 'Cripto' | 'Renda Fixa' | 'Fundo Imobiliário';
    amountInvested: number;
    currentValue: number;
    risk: 'Baixo' | 'Médio' | 'Alto' | 'Extremo';
}

export type Weather = 'Ensolarado' | 'Nublado' | 'Chuvoso' | 'Tempestade' | 'Neve';

export interface PlayerProfile {
  playstyle: string; // e.g., 'Empresário Visionário', 'Criminoso Impulsivo'
  summary: string; // A short paragraph summarizing the player's life so far.
  lastUpdatedYear: number;
}

export interface PlayerStats {
  name: string;
  age: number;
  day: number;
  month: number;
  year: number;
  birthDay: number;
  birthMonth: number;
  health: number;
  happiness: number;
  intelligence: number;
  appearance: number;
  money: number;
  currency: CurrencyType; // Moeda principal do jogador
  career: string;
  education: string; // Ex: 'Nenhuma', 'Ensino Médio', 'Graduação'
  stress: number;
  notoriety: number;
  criminality: number;
  hobbies: string[];
  relationships: Relationship[];
  business: Business | null; // Rastreia a empresa ou organização criminosa do jogador
  currentNeighborhood: Neighborhood | null;
  city: Neighborhood[];
  properties: Property[]; // Lista de propriedades do jogador
  inventory: ShopItem[]; // Items owned by the player
  tasks: Task[]; // Lista de metas e tarefas
  memories: Memory[]; // Long-term memory of significant events
  investments: Investment[]; // Financial portfolio
  currentWeather: Weather;
  playerProfile: PlayerProfile | null;
}

export interface Tombstone {
  name: string;
  age: string;
  cause: string;
  wealth: string;
  epitaph: string;
}

export interface GameTurn {
  speaker: 'system' | 'player';
  text: string;
  summary?: string; // New field for AI Summary Mode
  isChoice?: boolean;
  date?: {
    day: number;
    month: number;
    year: number;
  };
}

export interface ApiResponse {
  narrative: string;
  updatedStats: PlayerStats;
  choices: string[];
  isGameOver: boolean;
  tombstone: Tombstone | null;
}

export interface HistoryItem {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export interface SaveData {
  id: string;
  playerStats: PlayerStats;
  gameLog: GameTurn[];
  history: Content[];
  version?: number; // Version number for the save format
}

export interface CharacterCreationData {
  name: string;
  gender: string;
  country: string;
  city: string;
  socialClass: 'Pobre' | 'Média' | 'Rica' | 'Milionário';
  stats: {
    health: number;
    happiness: number;
    intelligence: number;
    appearance: number;
  };
  hobby: 'Nenhum' | 'Atletismo' | 'Artes' | 'Leitura e Escrita' | 'Pesca' | 'Programação';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface NpcChatMessage {
  role: 'user' | 'npc';
  text: string;
  timestamp: number;
}

export interface JobOffer {
    title: string;
    company: string;
    salary: number;
    description: string;
    requirements: string; // e.g. "Inteligência > 60"
}

export interface UniversityCourse {
    name: string;
    durationYears: number;
    costPerYear: number;
    description: string;
    requirements: string;
}
