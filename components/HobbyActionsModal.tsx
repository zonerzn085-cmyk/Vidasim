
import React, { useMemo } from 'react';
import { XMarkIcon, PaintBrushIcon, CommandLineIcon, TrophyIcon, MusicalNoteIcon, BookOpenIcon } from '@heroicons/react/24/outline';

interface HobbyActionsModalProps {
  hobby: string;
  onAction: (action: string) => void;
  onClose: () => void;
}

interface ActionButtonProps {
    label: string;
    action: string;
    onAction: (action: string) => void;
    subtitle?: string;
    colorClass?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, action, onAction, subtitle, colorClass = "bg-gray-700 hover:bg-gray-600" }) => (
    <button
        onClick={() => onAction(action)}
        className={`w-full text-left text-gray-200 font-medium py-3 px-4 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-[1.02] shadow-md border border-white/5 ${colorClass}`}
    >
        <div className="font-bold">{label}</div>
        {subtitle && <div className="text-xs opacity-70 mt-0.5 font-normal">{subtitle}</div>}
    </button>
);

// Definição de ações específicas por tipo de hobby
const SPECIFIC_ACTIONS: Record<string, { label: string, action: string, subtitle: string, color: string }[]> = {
    'tech': [
        { label: "Contribuição Open Source", action: "Contribuir para um projeto Open Source relevante no GitHub", subtitle: "Ganhe reputação na comunidade dev", color: "bg-blue-900/40 hover:bg-blue-800/60" },
        { label: "Freelance Rápido", action: "Pegar um trabalho freelance rápido de programação", subtitle: "Dinheiro extra, estresse extra", color: "bg-green-900/40 hover:bg-green-800/60" },
        { label: "Estudar Nova Stack", action: "Estudar uma nova linguagem ou framework emergente", subtitle: "Aumente sua inteligência técnica", color: "bg-indigo-900/40 hover:bg-indigo-800/60" },
        { label: "Hackathon Solo", action: "Participar de uma Game Jam ou Hackathon online", subtitle: "Teste seus limites em 48h", color: "bg-purple-900/40 hover:bg-purple-800/60" }
    ],
    'hacking': [
        { label: "Pentest (White Hat)", action: "Realizar testes de penetração autorizados em busca de recompensas (Bug Bounty)", subtitle: "Ganhe dinheiro de forma legal", color: "bg-teal-900/40 hover:bg-teal-800/60" },
        { label: "Explorar Fóruns Onion", action: "Navegar em fóruns profundos da DarkWeb em busca de 0-days", subtitle: "Alto risco, conhecimento proibido", color: "bg-gray-800 hover:bg-gray-700" },
        { label: "Ataque Simulado", action: "Simular uma invasão complexa em um servidor sandbox", subtitle: "Prática segura de skills ofensivas", color: "bg-blue-900/40 hover:bg-blue-800/60" },
        { label: "Black Hat Operation", action: "Tentar invadir um banco de dados corporativo real para roubar dados", subtitle: "CRIME: Aumenta drasticamente a notoriedade e risco de prisão", color: "bg-red-900/40 hover:bg-red-800/60 border-red-500/30" }
    ],
    'art': [
        { label: "Rascunho Rápido", action: "Fazer esboços rápidos para soltar a criatividade", subtitle: "Relaxe e melhore o traço", color: "bg-pink-900/40 hover:bg-pink-800/60" },
        { label: "Estudo de Observação", action: "Ir a um local público e desenhar o que vê", subtitle: "Melhora a percepção", color: "bg-yellow-900/40 hover:bg-yellow-800/60" },
        { label: "Publicar Portfólio", action: "Publicar suas melhores artes recentes online", subtitle: "Ganhe seguidores e feedback", color: "bg-blue-900/40 hover:bg-blue-800/60" }
    ],
    'fitness': [
        { label: "Treino HIIT", action: "Realizar um treino intervalado de alta intensidade", subtitle: "Queima rápida, cansaço alto", color: "bg-orange-900/40 hover:bg-orange-800/60" },
        { label: "Yoga & Alongamento", action: "Sessão longa de alongamento e foco", subtitle: "Reduz estresse, aumenta saúde", color: "bg-emerald-900/40 hover:bg-emerald-800/60" },
        { label: "Competição Amadora", action: "Se inscrever em um torneio local", subtitle: "Teste sua performance", color: "bg-red-900/40 hover:bg-red-800/60" }
    ]
};

function getHobbyCategory(hobby: string): string | null {
    const h = hobby.toLowerCase();
    if (h.includes('program') || h.includes('python') || h.includes('sql') || h.includes('dados') || h.includes('sistemas') || h.includes('dev')) return 'tech';
    if (h.includes('hack') || h.includes('segurança') || h.includes('cripto') || h.includes('darkweb') || h.includes('invadir')) return 'hacking';
    if (h.includes('pintura') || h.includes('desenho') || h.includes('arte') || h.includes('escrita')) return 'art';
    if (h.includes('atletismo') || h.includes('futebol') || h.includes('academia') || h.includes('esporte')) return 'fitness';
    return null;
}

function HobbyActionsModal({ hobby, onAction, onClose }: HobbyActionsModalProps): React.ReactElement {
  
  const category = useMemo(() => getHobbyCategory(hobby), [hobby]);
  const specificActions = category ? SPECIFIC_ACTIONS[category] : [];

  // Icon selection
  let Icon = PaintBrushIcon;
  if (category === 'tech' || category === 'hacking') Icon = CommandLineIcon;
  if (category === 'fitness') Icon = TrophyIcon;
  if (category === 'art') Icon = MusicalNoteIcon; // Generic art icon

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md flex flex-col animate-fade-in-up overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900/50">
          <h2 className="text-xl font-bold text-teal-300 flex items-center gap-2 truncate pr-4">
            <Icon className="w-6 h-6 flex-shrink-0" />
            {hobby}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white flex-shrink-0">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {specificActions.length > 0 ? (
                <>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ações Dedicadas</p>
                    {specificActions.map((act, idx) => (
                        <ActionButton 
                            key={idx}
                            label={act.label}
                            subtitle={act.subtitle}
                            action={act.action}
                            onAction={onAction}
                            colorClass={act.color}
                        />
                    ))}
                    <div className="h-px bg-gray-700 my-4"></div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Genérico</p>
                </>
            ) : (
                <p className="text-sm text-gray-400 mb-4">Como você gostaria de interagir com seu hobby?</p>
            )}

            <ActionButton 
                label="Prática de Rotina"
                subtitle="Manutenção de habilidade básica"
                action={`Praticar ${hobby} dedicadamente por algumas horas`} 
                onAction={onAction} 
            />
            <ActionButton 
                label="Desafio Criativo (IA)" 
                subtitle="Deixe o destino decidir o que acontece"
                action={`Eu quero praticar meu hobby, ${hobby}, de uma forma inesperada. Gere um cenário desafiador.`} 
                onAction={onAction} 
            />
            <ActionButton 
                label="Estudo Teórico" 
                subtitle="Ler livros e artigos sobre o assunto"
                action={`Estudar a teoria e história de ${hobby}`} 
                onAction={onAction} 
            />
        </div>
      </div>
    </div>
  );
}

export default React.memo(HobbyActionsModal);
