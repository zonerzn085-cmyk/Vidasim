
-- ==============================================================================
-- SCHEMA VIDA SIM - SUPABASE (Aplicado em oenlkhjugunvfmedegqu)
-- ==============================================================================

-- 1. LIMPEZA
DROP TABLE IF EXISTS public.tombstones;
DROP TABLE IF EXISTS public.saves;
DROP TABLE IF EXISTS public.profiles;

-- 2. TABELA DE PERFIS
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABELA DE SAVES
CREATE TABLE public.saves (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  version INTEGER DEFAULT 1,
  
  -- Armazenamento JSONB
  player_stats JSONB NOT NULL DEFAULT '{}'::jsonb,
  game_log JSONB NOT NULL DEFAULT '[]'::jsonb,
  history JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_saves_user_id ON public.saves(user_id);
CREATE INDEX idx_saves_stats ON public.saves USING GIN (player_stats);

-- 4. TABELA DE LÁPIDES
CREATE TABLE public.tombstones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  character_name TEXT NOT NULL,
  age TEXT NOT NULL,
  cause_of_death TEXT,
  wealth TEXT,
  epitaph TEXT,
  died_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. SEGURANÇA (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tombstones ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Usuários podem ver seus próprios perfis" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Usuários podem atualizar seus próprios perfis" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Usuários podem ver apenas seus saves" ON public.saves FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem criar saves" ON public.saves FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Usuários podem atualizar seus saves" ON public.saves FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem deletar seus saves" ON public.saves FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Qualquer um pode ver o cemitério (Lápides)" ON public.tombstones FOR SELECT USING (true);
CREATE POLICY "Usuários criam suas lápides ao morrer" ON public.tombstones FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 6. GATILHOS
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'name', 'Jogador Anônimo')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_saves_modtime 
    BEFORE UPDATE ON public.saves 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
