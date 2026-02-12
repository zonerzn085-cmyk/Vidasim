import { createClient } from '@supabase/supabase-js';

// ==================================================================================
// CONFIGURAÇÃO DO SUPABASE
// ==================================================================================

// 1. O URL do seu projeto
const SUPABASE_URL = 'https://oenlkhjugunvfmedegqu.supabase.co';

// 2. A SUA CHAVE ANON (Configurada e segura para fallback)
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lbmxraGp1Z3VudmZtZWRlZ3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MTY0MDQsImV4cCI6MjA4NjQ5MjQwNH0.nMbwwA3Mz2WzBe2dKhGgwv8U2hwUec_QCFJkif8WgOQ'; 

// ==================================================================================

// Helper seguro para obter a chave sem crashar o navegador
const getSupabaseKey = () => {
    try {
        if (typeof process !== 'undefined' && process.env) {
            // Tenta ler do environment (prioritário se configurado corretamente)
            const envKey = process.env.REACT_APP_SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_KEY;
            if (envKey) return envKey;
        }
        if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
            const viteKey = (import.meta as any).env.VITE_SUPABASE_KEY;
            if (viteKey) return viteKey;
        }
    } catch (e) {
        // Ignora erros de acesso a process
    }
    return SUPABASE_ANON_KEY; // Fallback para a chave hardcoded
};

const finalKey = getSupabaseKey();

if (!finalKey || finalKey.includes('SUA_CHAVE')) {
    console.error("🛑 ERRO CRÍTICO: Chave do Supabase inválida.");
}

export const supabase = createClient(SUPABASE_URL, finalKey);