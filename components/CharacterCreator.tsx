
import React, { useState, useMemo } from 'react';
import { CharacterCreationData } from '../types';
import { HeartIcon, SparklesIcon, LightBulbIcon, UserIcon, ArrowLeftIcon, ExclamationCircleIcon, CheckCircleIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import { cityDatabase, nameDatabase } from '../data/names';

interface CharacterCreatorProps {
  onStart: (data: CharacterCreationData) => void;
  onBack: () => void;
}

// Mapeamento dinâmico baseado nos dados disponíveis
const countries = Object.keys(nameDatabase);
const citiesByCountry: Record<string, string[]> = {
    'Brasil': ['Rio de Janeiro', 'São Paulo'],
    'Estados Unidos': ['New York'],
    'Japão': ['Tóquio'],
    'Portugal': ['Lisboa'],
    'Reino Unido': ['Londres'],
    'França': ['Paris'],
    'Alemanha': ['Berlim'],
    'Argentina': ['Buenos Aires']
};

const getCitiesForCountry = (country: string) => {
    if (citiesByCountry[country]) return citiesByCountry[country];
    return ['Capital City'];
};

const TOTAL_ATTRIBUTE_POINTS = 240;
const MIN_ATTRIBUTE_POINTS = 20;
const MAX_ATTRIBUTE_POINTS = 100;

function CharacterCreator({ onStart, onBack }: CharacterCreatorProps): React.ReactElement {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Masculino');
  const [country, setCountry] = useState(countries[0]);
  const [city, setCity] = useState(getCitiesForCountry(countries[0])[0]);
  const [socialClass, setSocialClass] = useState<CharacterCreationData['socialClass']>('Média');
  const [hobby, setHobby] = useState<CharacterCreationData['hobby']>('Nenhum');
  
  const [health, setHealth] = useState(60);
  const [happiness, setHappiness] = useState(60);
  const [intelligence, setIntelligence] = useState(60);
  const [appearance, setAppearance] = useState(60);

  const pointsUsed = useMemo(() => health + happiness + intelligence + appearance, [health, happiness, intelligence, appearance]);
  const pointsRemaining = TOTAL_ATTRIBUTE_POINTS - pointsUsed;
  const isValid = pointsRemaining === 0 && name.trim().length > 0;
  
  const availableCities = useMemo(() => getCitiesForCountry(country), [country]);

  function handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newCountry = e.target.value;
    setCountry(newCountry);
    setCity(getCitiesForCountry(newCountry)[0]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    
    onStart({
      name,
      gender,
      country,
      city,
      socialClass,
      hobby,
      stats: { health, happiness, intelligence, appearance },
    });
  }
  
  function handleAttributeChange(setter: React.Dispatch<React.SetStateAction<number>>, value: number) {
      const numericValue = isNaN(value) ? MIN_ATTRIBUTE_POINTS : value;
      const clampedValue = Math.max(MIN_ATTRIBUTE_POINTS, Math.min(MAX_ATTRIBUTE_POINTS, numericValue));
      setter(clampedValue);
  }

  function renderStatSlider(label: string, value: number, setter: React.Dispatch<React.SetStateAction<number>>, Icon: React.ElementType, colorClass: string) {
    return (
        <div className="bg-gray-900/40 p-4 rounded-xl border border-gray-700/50 transition-all hover:border-gray-600">
            <div className="flex justify-between items-center mb-3">
                <label className="flex items-center gap-2 font-bold text-gray-200">
                    <Icon className={`w-5 h-5 ${colorClass}`} />
                    {label}
                </label>
                <input 
                    type="number"
                    value={value}
                    onChange={(e) => handleAttributeChange(setter, parseInt(e.target.value))}
                    className="w-16 bg-gray-950 border border-gray-700 rounded-lg py-1 px-2 text-center text-white font-mono text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
            </div>
            <input
                type="range"
                min={MIN_ATTRIBUTE_POINTS}
                max={MAX_ATTRIBUTE_POINTS}
                value={value}
                onChange={(e) => handleAttributeChange(setter, parseInt(e.target.value))}
                className={`w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-teal-500 hover:accent-teal-400`}
            />
        </div>
      );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="w-full max-w-4xl z-10 animate-fade-in-up my-4">
        <button onClick={onBack} className="mb-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
            Voltar ao Menu
        </button>

        <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-700/50 bg-gray-900/30">
                <h1 className="text-3xl sm:text-4xl font-black text-white">
                    Identidade <span className="text-teal-400">Digital</span>
                </h1>
                <p className="text-gray-400 mt-1">Configure os parâmetros da sua nova existência.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    
                    {/* Left Column: Bio Data */}
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Dados Biográficos</h3>
                        
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nome Completo</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full input-style" placeholder="Ex: Alex Silva" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-2">Gênero</label>
                                <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="w-full input-style">
                                    <option>Masculino</option>
                                    <option>Feminino</option>
                                    <option>Não-binário</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="hobby" className="block text-sm font-medium text-gray-300 mb-2">Hobby Inicial</label>
                                <select id="hobby" value={hobby} onChange={(e) => setHobby(e.target.value as CharacterCreationData['hobby'])} className="w-full input-style">
                                    <option>Nenhum</option>
                                    <option>Atletismo</option>
                                    <option>Artes</option>
                                    <option>Leitura e Escrita</option>
                                    <option>Pesca</option>
                                    <option>Programação</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-2">País de Origem</label>
                                <select id="country" value={country} onChange={handleCountryChange} className="w-full input-style">
                                    {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                             <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">Cidade</label>
                                <select id="city" value={city} onChange={(e) => setCity(e.target.value)} className="w-full input-style">
                                   {availableCities.map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                         <div>
                            <label htmlFor="social-class" className="block text-sm font-medium text-gray-300 mb-2">Classe Social</label>
                            <div className="relative">
                                <select 
                                    id="social-class" 
                                    value={socialClass} 
                                    onChange={(e) => setSocialClass(e.target.value as CharacterCreationData['socialClass'])} 
                                    className={`w-full input-style ${socialClass === 'Milionário' ? 'border-yellow-500/50 text-yellow-400 bg-yellow-900/10' : ''}`}
                                >
                                    <option>Pobre</option>
                                    <option>Média</option>
                                    <option>Rica</option>
                                    <option>Milionário</option>
                                </select>
                                {socialClass === 'Milionário' && (
                                    <BanknotesIcon className="w-5 h-5 text-yellow-400 absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none animate-pulse" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Attributes */}
                    <div className="space-y-6">
                         <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Alocação de Stats</h3>
                            <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full transition-colors ${pointsRemaining === 0 ? 'bg-green-500/20 text-green-300 border border-green-500/50' : 'bg-red-500/20 text-red-300 border border-red-500/50'}`}>
                                {pointsRemaining === 0 ? <CheckCircleIcon className="w-4 h-4" /> : <ExclamationCircleIcon className="w-4 h-4" />}
                                {pointsRemaining === 0 ? 'Balanceado' : `Pontos: ${pointsRemaining}`}
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            {renderStatSlider("Saúde", health, setHealth, HeartIcon, "text-red-400")}
                            {renderStatSlider("Felicidade", happiness, setHappiness, SparklesIcon, "text-yellow-400")}
                            {renderStatSlider("Inteligência", intelligence, setIntelligence, LightBulbIcon, "text-blue-400")}
                            {renderStatSlider("Aparência", appearance, setAppearance, UserIcon, "text-pink-400")}
                        </div>

                        <div className="pt-6">
                            <button 
                                type="submit" 
                                className={`w-full font-black text-lg py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2
                                    ${isValid 
                                        ? 'bg-white text-black hover:bg-teal-50 hover:scale-[1.02] cursor-pointer' 
                                        : 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-70'
                                    }`} 
                                disabled={!isValid}
                            >
                                {isValid ? "INICIAR SIMULAÇÃO" : (name.trim() === "" ? "INSIRA UM NOME" : "AJUSTE OS PONTOS")}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
      </div>
      <style>{`
        .input-style {
            background-color: rgba(17, 24, 39, 0.6);
            border: 1px solid rgba(75, 85, 99, 0.4);
            border-radius: 0.75rem;
            padding: 0.75rem 1rem;
            color: white;
            transition: all 0.2s ease;
        }
        .input-style:focus {
            outline: none;
            border-color: rgb(20, 184, 166);
            background-color: rgba(17, 24, 39, 0.8);
            box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.1);
        }
      `}</style>
    </div>
  );
}

export default React.memo(CharacterCreator);
