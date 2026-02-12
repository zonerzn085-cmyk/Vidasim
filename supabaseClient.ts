
import { createClient } from '@supabase/supabase-js';

// ==================================================================================
// CONFIGURAÇÃO DO SUPABASE
// ==================================================================================

// 1. O URL do seu projeto
const SUPABASE_URL = 'https://oenlkhjugunvfmedegqu.supabase.co';

// 2. A SUA CHAVE ANON (Configurada)
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lbmxraGp1Z3VudmZtZWRlZ3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5MTY0MDQsImV4cCI6MjA4NjQ5MjQwNH0.nMbwwA3Mz2WzBe2dKhGgwv8U2hwUec_QCFJkif8WgOQ'; 

// ==================================================================================

// Verifica se a chave foi colada (tenta ler do .env ou usa a string direta)
const finalKey = process.env.REACT_APP_SUPABASE_KEY || SUPABASE_ANON_KEY;

if (!finalKey || finalKey.includes('SUA_CHAVE')) {
    console.error("🛑 ERRO CRÍTICO: Chave do Supabase inválida.");
}

export const supabase = createClient(SUPABASE_URL, finalKey);
