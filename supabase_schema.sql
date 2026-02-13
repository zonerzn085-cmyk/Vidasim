
-- ==============================================================================
-- SCHEMA VIDA SIM - SUPABASE (Versão Reforçada)
-- ==============================================================================

-- 1. LIMPEZA PREVENTIVA (Cuidado: Isso apaga dados em produção se rodar manualmente)
-- Em um ambiente de produção real, usaríamos ALTER TABLE. Aqui, para garantir a estrutura:
-- DROP TABLE IF EXISTS public.tombstones;
-- DROP TABLE IF EXISTS public.saves;
-- DROP TABLE IF EXISTS public.profiles;

-- 2. TABELA DE PERFIS (Se não existir)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABELA DE SAVES (Reforçada)
CREATE TABLE IF NOT EXISTS public.saves (
  id TEXT PRIMARY KEY, -- ID gerado pelo frontend (timestamp + random)
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  version INTEGER DEFAULT 1,
  
  -- Armazenamento JSONB
  player_stats JSONB NOT NULL DEFAULT '{}'::jsonb,
  game_log JSONB NOT NULL DEFAULT '[]'::jsonb,
  history JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_saves_user_id ON public.saves(user_id);
CREATE INDEX IF NOT EXISTS idx_saves_updated_at ON public.saves(updated_at DESC);

-- 4. TABELA DE LÁPIDES
CREATE TABLE IF NOT EXISTS public.tombstones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  character_name TEXT NOT NULL,
  age TEXT NOT NULL,
  cause_of_death TEXT,
  wealth TEXT,
  epitaph TEXT,
  died_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SEGURANÇA (RLS - Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tombstones ENABLE ROW LEVEL SECURITY;

-- Policies (Recriar para garantir permissões corretas)
DROP POLICY IF EXISTS "Usuários podem ver seus próprios perfis" ON public.profiles;
CREATE POLICY "Usuários podem ver seus próprios perfis" ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios perfis" ON public.profiles;
CREATE POLICY "Usuários podem atualizar seus próprios perfis" ON public.profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Usuários podem ver apenas seus saves" ON public.saves;
CREATE POLICY "Usuários podem ver apenas seus saves" ON public.saves FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Usuários podem criar/atualizar saves" ON public.saves;
CREATE POLICY "Usuários podem criar/atualizar saves" ON public.saves FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Qualquer um pode ver o cemitério" ON public.tombstones;
CREATE POLICY "Qualquer um pode ver o cemitério" ON public.tombstones FOR SELECT USING (true);

DROP POLICY IF EXISTS "Usuários criam suas lápides" ON public.tombstones;
CREATE POLICY "Usuários criam suas lápides" ON public.tombstones FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 6. GATILHOS (Triggers)
-- Atualizar timestamp automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_saves_modtime ON public.saves;
CREATE TRIGGER update_saves_modtime 
    BEFORE UPDATE ON public.saves 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Criar perfil automaticamente ao cadastrar
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'name', 'Jogador Anônimo')
  )
  ON CONFLICT (id) DO NOTHING; -- Evita erros se o perfil já existir
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
