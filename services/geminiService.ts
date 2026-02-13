
import { GoogleGenAI, Type, Content, GenerateContentResponse, Modality, Chat, GenerateImagesResponse } from "@google/genai";
import C from '../constants';
import { ApiResponse, PlayerStats, Neighborhood, Business, Tombstone, Building, NotableNPC, Property, Job, GameProject, Technology, PlayerProfile, Relationship, Task, JobOffer, UniversityCourse, ShopItem } from '../types';
import { corporateDatabase } from '../data/marketData';
import { STATIC_JOBS, STATIC_COURSES, STATIC_SHOP_ITEMS } from '../data/staticWorld';

// --- SAFE ENV ACCESS ---
// Helper to avoid "process is not defined" crash in browser environments (Vercel/Vite)
const getApiKey = () => {
    try {
        // 1. Try standard Node/CRA process.env
        if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
            return process.env.API_KEY;
        }
        // 2. Try Vite import.meta.env
        if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_API_KEY) {
            return (import.meta as any).env.VITE_API_KEY;
        }
        // 3. Check for prefixed versions in process.env (React App / Next.js)
        if (typeof process !== 'undefined' && process.env) {
            return process.env.REACT_APP_API_KEY || process.env.NEXT_PUBLIC_API_KEY;
        }
    } catch (e) {
        console.warn("Error reading env vars:", e);
    }
    return "";
};

const API_KEY = getApiKey();
// Initialize safely. If key is missing, AI calls will fail gracefully later, not crash the app on load.
const ai = new GoogleGenAI({ apiKey: API_KEY || "MISSING_KEY" });

// ============================================================================
// UTILITIES
// ============================================================================

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  if (!API_KEY || API_KEY === "MISSING_KEY") {
      throw new Error("API Key não configurada. Verifique as configurações do Vercel.");
  }

  let attempts = 0;
  while (attempts <= retries) {
    try {
      return await fn();
    } catch (error: any) {
      attempts++;
      const msg = error?.message || "";
      
      // 429 (Too Many Requests) or 503 (Service Unavailable)
      const isTransient = msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("503") || msg.includes("UNAVAILABLE") || msg.includes("fetch");
      
      if (attempts > retries) {
        console.error(`Gemini API call failed after ${attempts} attempt(s).`, error);
        throw error;
      }
      
      if (isTransient) {
          // Paid Level 1 Strategy: Aggressive retry with shorter backoff
          const backoffTime = delay * Math.pow(1.5, attempts - 1); 
          console.warn(`Gemini API transient error (${attempts}/${retries}). Retrying in ${backoffTime}ms...`);
          await new Promise(res => setTimeout(res, backoffTime));
      } else {
          // If it's a 400 (Bad Request) or similar, don't retry.
          if (msg.includes("400") || msg.includes("INVALID_ARGUMENT")) {
             console.warn("Invalid Argument (400). Aborting retry.");
             throw error;
          }
          const backoffTime = delay * Math.pow(1.5, attempts - 1);
          await new Promise(res => setTimeout(res, backoffTime));
      }
    }
  }
  throw new Error("Retry logic failed unexpectedly.");
}

// ============================================================================
// CONTEXT OPTIMIZATION LOGIC
// ============================================================================

function getOptimizedState(stats: PlayerStats, action: string) {
    const actionLower = action.toLowerCase();
    
    // Heuristics for Context
    const isBusiness = /empresa|negócio|trabalh|contratar|demitir|projeto|escritório|reunião|ceo|lucro|prejuízo|sócio|start|fundar|indústria|jogo|game|desenvolv|lançar|marketing|dlc|codar|programar/i.test(actionLower);
    const isProject = /projeto|jogo|game|desenvolv|lançar|marketing|dlc|codar|programar/i.test(actionLower);
    const isSocial = /conversar|falar|encontrar|sair|namorar|casar|terminar|pai|mãe|irmão|amigo|vizinho|conhecer|festa|interagir|relacionamento|amor|flerte/i.test(actionLower);
    const isTravel = /viajar|ir para|visitar|explorar|mapa|passear|bairro|mudar de cidade|voar/i.test(actionLower);
    const isShopping = /comprar|vender|loja|shopping|gastar|pagar|mercado|imóvel|carro/i.test(actionLower);
    const isFinance = /investir|ação|ações|bolsa|cripto|banco|empréstimo|apostar|loteria|dinheiro|dólar|real|aplicar|resgatar/i.test(actionLower);
    const isHealth = /médico|hospital|academia|treinar|doente|ferido|cirurgia|plástica|saúde|terapia|psicólogo/i.test(actionLower);
    const isCrime = /roubar|matar|crime|gangue|polícia|preso|fugir|drogas|ilegal|hackear|invadir|assalto|tráfico/i.test(actionLower);
    const isEducation = /estudar|escola|faculdade|curso|universidade|aprender|livro|aula|matrícula/i.test(actionLower);

    // 1. Core State (Compact & Essential)
    const core = {
        persona: {
            name: stats.name,
            age: stats.age,
            role: stats.career,
            edu: stats.education,
            profile: stats.playerProfile?.playstyle
        },
        vitals: {
            hp: stats.health,
            hap: stats.happiness,
            int: stats.intelligence,
            app: stats.appearance,
            str: stats.stress,
            crm: stats.criminality,
            rep: stats.notoriety
        },
        assets: {
            cash: stats.money,
            curr: stats.currency
        },
        time: {
            date: `${stats.day}/${stats.month}/${stats.year}`,
            weather: stats.currentWeather
        }
    };

    // 2. Relationships (Filtered by Relevance to save tokens)
    // Only send if Social context OR Top relationships OR Immediate Family
    const relevantRelationships = stats.relationships.filter(r => 
        isSocial || 
        r.relationshipScore > 80 || 
        ['Mãe', 'Pai', 'Esposo(a)', 'Namorado(a)', 'Filho', 'Filha'].some(t => r.type.includes(t))
    );

    const relationships = relevantRelationships.map(r => {
        const base = { id: r.id, name: r.name, role: r.type, val: r.relationshipScore };
        if (isSocial) {
            return {
                ...base,
                traits: r.personalityTraits,
                mentor: r.mentorshipDetails ? r.mentorshipDetails.area : undefined
            };
        }
        return base;
    });

    // 3. Business (Contextual Detail)
    let business: any = "None";
    if (stats.business) {
        if (isBusiness) {
            business = {
                name: stats.business.name,
                industry: stats.business.industry,
                rev: stats.business.annualRevenue,
                val: stats.business.value,
                morale: stats.business.morale,
                workStyle: stats.business.workStyle,
                // Only send full project details if relevant to projects/dev
                gameProjects: isProject ? stats.business.gameProjects?.map(p => ({
                    name: p.name,
                    status: p.status,
                    completionPercentage: p.completionPercentage,
                    qualityScore: p.qualityScore,
                    unitsSold: p.unitsSold
                })) : `${stats.business.gameProjects?.length || 0} active projects`,
                // Executives always useful in business context
                executives: stats.business.executives?.map(e => ({ role: e.role, personId: e.personId })),
                technologies: stats.business.technologies?.map(t => t.name)
            }; 
        } else {
            // Minimal summary for non-business turns
            business = {
                name: stats.business.name,
                industry: stats.business.industry,
                role: "Owner/CEO",
                val: stats.business.value
            };
        }
    }

    // 4. Location (Contextual Detail)
    let location: any = { name: "Unknown" };
    if (stats.currentNeighborhood) {
        const n = stats.currentNeighborhood;
        if (isTravel || isShopping || isCrime || isSocial) {
            location = {
                name: n.name,
                desc: n.description,
                safety: n.safety,
                wealth: n.wealthLevel,
                event: n.currentEvent ? { name: n.currentEvent.name, effect: n.currentEvent.effects } : null,
                // Summarize buildings
                spots: n.buildings.map(b => b.name),
                // Summarize NPCs
                npcs: n.notableNPCs.map(npc => ({ name: npc.name, desc: npc.description })),
                // Only send market data if shopping/travel
                market: (isShopping || isTravel) ? n.propertiesForSale.map(p => ({ name: p.name, value: p.value })) : "Hidden"
            };
        } else {
            location = { 
                name: n.name, 
                event: n.currentEvent ? n.currentEvent.name : null 
            };
        }
    }

    const extras: any = {};
    if (isFinance) extras.investments = stats.investments;
    // Only send items names unless specifically needed
    if (isShopping || isCrime) extras.inventory = stats.inventory.map(i => i.name);
    
    // Memories - Limit text length to save tokens
    const uniqueMemories = new Map();
    stats.memories.filter(m => m.significance === 'Lendária').forEach(m => uniqueMemories.set(m.year + m.description, m));
    stats.memories.slice(-5).forEach(m => uniqueMemories.set(m.year + m.description, m));
    
    const memories = Array.from(uniqueMemories.values())
        .sort((a: any, b: any) => b.year - a.year)
        .map((m: any) => ({
            year: m.year,
            // Truncate long descriptions
            text: m.description.length > 100 ? m.description.substring(0, 100) + "..." : m.description
        }));

    const tasks = stats.tasks.filter(t => !t.isComplete).map(t => t.title);

    return {
        ...core,
        context: {
            relationships,
            business,
            location,
            ...extras,
            memories,
            tasks
        }
    };
}

// Helper to map optimized AI response back to PlayerStats keys
function normalizeAiStats(rawStats: any): any {
    if (!rawStats) return {};
    
    // If stats are already in flat format, return them
    if (rawStats.health !== undefined || rawStats.money !== undefined) return rawStats;

    const normalized: any = {};

    // Map Nested Vitals
    if (rawStats.vitals) {
        if (rawStats.vitals.hp !== undefined) normalized.health = rawStats.vitals.hp;
        if (rawStats.vitals.hap !== undefined) normalized.happiness = rawStats.vitals.hap;
        if (rawStats.vitals.int !== undefined) normalized.intelligence = rawStats.vitals.int;
        if (rawStats.vitals.app !== undefined) normalized.appearance = rawStats.vitals.app;
        if (rawStats.vitals.str !== undefined) normalized.stress = rawStats.vitals.str;
        if (rawStats.vitals.crm !== undefined) normalized.criminality = rawStats.vitals.crm;
        if (rawStats.vitals.rep !== undefined) normalized.notoriety = rawStats.vitals.rep;
    }

    // Map Assets
    if (rawStats.assets) {
        if (rawStats.assets.cash !== undefined) normalized.money = rawStats.assets.cash;
    }

    // Map Persona
    if (rawStats.persona) {
        if (rawStats.persona.age !== undefined) normalized.age = rawStats.persona.age;
        if (rawStats.persona.role !== undefined) normalized.career = rawStats.persona.role;
        if (rawStats.persona.edu !== undefined) normalized.education = rawStats.persona.edu;
        if (rawStats.persona.name !== undefined) normalized.name = rawStats.persona.name;
    }

    // Map Context/Relationships (often complex, check if present)
    if (rawStats.context) {
        if (rawStats.context.relationships) normalized.relationships = rawStats.context.relationships;
        if (rawStats.context.business) normalized.business = rawStats.context.business;
        if (rawStats.context.location) {
             // Handle neighborhood updates if necessary, usually partial
             // Not strictly mapping entire objects here to allow GameContext merge logic to work
        }
    }

    // Copy direct root keys if the AI mixed formats
    const rootKeys = ['memories', 'investments', 'tasks', 'inventory', 'city', 'isGameOver', 'tombstone', 'eventSummary', 'choices'];
    rootKeys.forEach(key => {
        if (rawStats[key]) normalized[key] = rawStats[key];
    });

    return normalized;
}

// ============================================================================
// MAIN GAME LOGIC
// ============================================================================

export async function* sendMessageToGameStream(history: Content[], action: string, currentStats: PlayerStats) {
    if (!API_KEY || API_KEY === "MISSING_KEY") {
        yield { type: 'error', payload: "⚠️ ERRO DE CONFIGURAÇÃO: API Key não encontrada." };
        return;
    }

    const optimizedState = getOptimizedState(currentStats, action);
    
    const geminiHistory = history.map(h => ({
        role: h.role,
        parts: h.parts
    }));

    const userMessage = {
        role: 'user',
        parts: [{ text: `Ação do Jogador: "${action}"\n\nEstado Atual (JSON Otimizado): ${JSON.stringify(optimizedState)}` }]
    };

    const systemInstruction = C.UNIFIED_SYSTEM_INSTRUCTIONS;

    // Retry Strategy - PAID LEVEL 1 (Aggressive)
    const attemptSequence = [
        { model: 'gemini-3-pro-preview', delay: 0 },   // Try Pro immediately
        { model: 'gemini-3-pro-preview', delay: 200 }, // Retry Pro quickly
        { model: 'gemini-3-flash-preview', delay: 0 },  // Fallback to Flash
        { model: 'gemini-3-flash-preview', delay: 1000 } // Last resort
    ];

    let stream;
    let connectionError = null;

    for (const attempt of attemptSequence) {
        if (attempt.delay > 0) await new Promise(r => setTimeout(r, attempt.delay));
        
        try {
            stream = await ai.models.generateContentStream({
                model: attempt.model,
                contents: [...geminiHistory, userMessage],
                config: {
                    systemInstruction: systemInstruction,
                    temperature: 0.8, // Slightly higher for creativity in Paid tier
                    maxOutputTokens: 20000, // High token limit for detailed responses
                }
            });
            connectionError = null;
            break; 
        } catch (e: any) {
            connectionError = e;
            console.warn(`Gemini Stream Attempt Failed (${attempt.model}):`, e.message);
        }
    }

    if (connectionError || !stream) {
        yield { type: 'error', payload: "⚠️ O sistema de IA está temporariamente indisponível." };
        return;
    }

    let isCollectingJSON = false;
    let jsonBuffer = "";

    try {
        for await (const chunk of stream) {
            const text = chunk.text;
            if (!text) continue;

            if (text.includes("|||CHOICES:")) {
                const parts = text.split("|||CHOICES:");
                if (parts[0]) yield { type: 'text', payload: parts[0] };
                continue; 
            }

            if (text.includes("|||DATA_START|||")) {
                const parts = text.split("|||DATA_START|||");
                
                if (parts[0]) {
                    const textPart = parts[0].replace(/\|\|\|CHOICES:.*$/, ''); 
                    yield { type: 'text', payload: textPart };
                }
                
                isCollectingJSON = true;
                if (parts[1]) {
                    jsonBuffer += parts[1];
                }
            } else if (isCollectingJSON) {
                jsonBuffer += text;
            } else {
                yield { type: 'text', payload: text };
            }
        }
    } catch (e: any) {
        console.error("Stream Iteration Error", e);
        // Important: Yield an explicit error type so GameContext can discard this failed turn
        yield { type: 'error', payload: "\n[Conexão interrompida durante a resposta.]" };
        return;
    }

    // Process JSON
    if (jsonBuffer.trim()) {
        try {
            let cleanJson = jsonBuffer.replace(/```json/g, "").replace(/```/g, "").trim();
            const lastBrace = cleanJson.lastIndexOf('}');
            if (lastBrace !== -1) cleanJson = cleanJson.substring(0, lastBrace + 1);

            const parsedData = JSON.parse(cleanJson);
            
            if (parsedData.statChanges) {
                parsedData.statChanges = normalizeAiStats(parsedData.statChanges);
            }

            if (parsedData.statChanges && !parsedData.statChanges.memories) {
                parsedData.statChanges.memories = []; 
            }

            yield { type: 'stats', payload: parsedData };
        } catch (e) {
            console.error("JSON Parsing Error", e);
            // If JSON fails, it's also a turn failure because state didn't update
            yield { type: 'error', payload: "Erro ao processar dados vitais." };
        }
    }
}

// ============================================================================
// AUXILIARY SERVICES (One-shot calls)
// ============================================================================

export async function runAiDirectorAnalysis(history: Content[], currentStats: PlayerStats): Promise<PlayerProfile | null> {
    try {
        return await withRetry(async () => {
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview', 
                contents: [
                    ...history.slice(-10), 
                    { role: 'user', parts: [{ text: `Analise o estilo de jogo deste jogador com base no histórico recente e estatísticas: ${JSON.stringify(currentStats)}. Retorne um perfil curto (playstyle + summary) em JSON.` }] }
                ],
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            playstyle: { type: Type.STRING },
                            summary: { type: Type.STRING },
                        },
                        required: ['playstyle', 'summary']
                    }
                }
            });
            return JSON.parse(response.text || "null");
        });
    } catch (e) {
        console.warn("AI Director Failed", e);
        return null;
    }
}

export const fetchNeighborhoodData = {
    buildings: async (neighborhoodName: string, history: Content[]) => { return []; },
    notableNPCs: async (neighborhoodName: string, history: Content[]) => { return []; },
    propertiesForSale: async (neighborhoodName: string, history: Content[]) => { return []; },
    localJobs: async (neighborhoodName: string, history: Content[]) => { return []; },
};

export const fetchBusinessData = {
    gameProjects: async (businessName: string, history: Content[]) => { return []; },
    technologies: async (businessName: string, history: Content[]) => { return []; },
    executives: async (businessName: string, history: Content[]) => { return []; },
};

export async function fetchAvailableJobs(playerStats: PlayerStats, history: Content[]): Promise<JobOffer[]> {
    try {
        return await withRetry(async () => {
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: [...history.slice(-5), { role: 'user', parts: [{ text: `Gere 5 ofertas de emprego compatíveis com: ${playerStats.education}, Inteligência ${playerStats.intelligence}.` }] }],
                config: {
                    responseMimeType: "application/json",
                    responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, company: { type: Type.STRING }, salary: { type: Type.NUMBER }, description: { type: Type.STRING }, requirements: { type: Type.STRING } } } }
                }
            });
            return JSON.parse(response.text || "[]");
        });
    } catch (e) { return STATIC_JOBS; }
}

export async function fetchEducationOptions(playerStats: PlayerStats, history: Content[]): Promise<UniversityCourse[]> {
    try {
        return await withRetry(async () => {
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: [...history.slice(-5), { role: 'user', parts: [{ text: `Gere 5 cursos universitários ou técnicos.` }] }],
                config: {
                    responseMimeType: "application/json",
                    responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, durationYears: { type: Type.NUMBER }, costPerYear: { type: Type.NUMBER }, description: { type: Type.STRING }, requirements: { type: Type.STRING } } } }
                }
            });
            return JSON.parse(response.text || "[]");
        });
    } catch (e) { return STATIC_COURSES; }
}

export async function fetchShopItems(playerStats: PlayerStats, history: Content[]): Promise<ShopItem[]> {
    try {
        return await withRetry(async () => {
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: [...history.slice(-5), { role: 'user', parts: [{ text: `Gere 6 itens para comprar (Veículo, Eletrônico, Luxo).` }] }],
                config: {
                    responseMimeType: "application/json",
                    responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, name: { type: Type.STRING }, category: { type: Type.STRING }, price: { type: Type.NUMBER }, description: { type: Type.STRING }, effect: { type: Type.STRING } } } }
                }
            });
            return JSON.parse(response.text || "[]");
        });
    } catch (e) { return STATIC_SHOP_ITEMS; }
}

export async function fetchContextualDialogueOptions(npc: Relationship | NotableNPC, playerStats: PlayerStats, history: Content[]): Promise<string[]> {
    try {
        const npcData = JSON.stringify({
            name: npc.name,
            description: (npc as any).description || (npc as any).type,
            traits: npc.personalityTraits,
            relationship: (npc as any).relationshipScore || 0
        });
        
        return await withRetry(async () => {
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: [
                    ...history.slice(-5), 
                    { role: 'user', parts: [{ text: `Gere 4 opções curtas de diálogo (frases em primeira pessoa) para o jogador dizer a este NPC, baseadas nos traços de personalidade do NPC e na situação atual.
                    NPC: ${npcData}
                    Jogador: ${playerStats.name}, ${playerStats.age} anos.
                    
                    As opções devem ser variadas (ex: Amigável, Agressiva, Persuasiva, Curiosa). Retorne APENAS um array de strings JSON.` }] }
                ],
                config: {
                    responseMimeType: "application/json",
                    responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
            });
            return JSON.parse(response.text || "[]");
        });
    } catch (e) {
        return [
            `Olá, ${npc.name}, como vai?`,
            "Pode me ajudar com algo?",
            "Só estava passando por aqui.",
            "Não tenho tempo agora."
        ];
    }
}

export function createChatSession(history?: Content[], playerStats?: PlayerStats): Chat {
    let systemInstruction = "Você é um assistente útil dentro do jogo VidaSim. Ajude o jogador com dúvidas sobre mecânicas ou história.";

    if (playerStats) {
        systemInstruction += `
        \n\n--- DADOS DO JOGADOR ATUAL ---
        Nome: ${playerStats.name} | Idade: ${playerStats.age} anos
        Dinheiro: ${playerStats.money} | Carreira: ${playerStats.career}
        Bairro Atual: ${playerStats.currentNeighborhood?.name || 'Desconhecido'}
        Estado Civil: ${playerStats.relationships.find(r => r.type === 'Namorado(a)' || r.type === 'Esposo(a)') ? 'Compromissado' : 'Solteiro'}
        
        Stats Principais: Saúde(${playerStats.health}), Felicidade(${playerStats.happiness}), Intelecto(${playerStats.intelligence}).
        
        Use essas informações para dar conselhos personalizados e responder como se conhecesse a vida do jogador.
        `;
    }

    return ai.chats.create({
        model: 'gemini-3-pro-preview', // Force Pro model for Chatbot
        history: history || [],
        config: { 
            systemInstruction,
            maxOutputTokens: 20000 
        }
    });
}

export function createNpcChatSession(npc: Relationship | NotableNPC, playerStats: PlayerStats): Chat {
    const context = `Você está interpretando ${npc.name}. 
    Descrição: ${(npc as any).description || (npc as any).type}.
    Traços: ${(npc.personalityTraits || []).join(', ')}.
    Histórico: ${npc.background || 'N/A'}.
    O jogador é: ${playerStats.name}, ${playerStats.age} anos.
    Responda como o personagem. Seja breve e conversacional.`;

    return ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: { systemInstruction: context }
    });
}

export async function generateImageWithImagen(prompt: string, aspectRatio: string): Promise<string | null> {
    try {
        return await withRetry(async () => {
            const response = await ai.models.generateImages({
                model: 'imagen-3.0-generate-002', 
                prompt: prompt,
                config: { numberOfImages: 1, aspectRatio: aspectRatio }
            });
            // @ts-ignore
            return response.generatedImages?.[0]?.image?.imageBytes || null;
        });
    } catch (e) {
        console.error("Image Gen Error", e);
        return null;
    }
}
