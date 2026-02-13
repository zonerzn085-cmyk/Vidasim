
import { PlayerStats } from './types';
import { maleNames, femaleNames, surnames, neighborhoodNames, streetNames, companyPrefixes, companySuffixes, initialCareers } from './data/names';
import { baseCityStructure } from './data/cityData';
import { corporateDatabase, namingConventions } from './data/marketData';

const nameDatabaseInstructions = `
BANCO DE DADOS DE NOMES (Use para gerar NPCs, Bairros e Ruas):
Você DEVE usar os nomes das listas abaixo para gerar personagens, bairros e ruas. Não invente nomes fora destas listas, exceto para empresas e nomes de edifícios específicos.

 * Nomes Masculinos: ${maleNames.join(', ')}.
 * Nomes Femininos: ${femaleNames.join(', ')}.
 * Sobrenomes: ${surnames.join(', ')}.
 * Nomes de Bairros: ${neighborhoodNames.join(', ')}.
 * Nomes de Ruas: ${streetNames.join(', ')}.

Para nomes de edifícios, empresas e outros locais específicos, você tem liberdade criativa, mas eles devem ser plausíveis e coerentes com o contexto do bairro (ex: 'Padaria do Manuel' na Rua das Flores, 'Corporação OmniTech' no Distrito Central).
`;

const companyGenerationInstructions = `
ECOSSISTEMA CORPORATIVO (Use para gerar empregos e empresas):
Este mundo possui empresas reais e fictícias pré-definidas. Ao gerar empregos ou notícias, PREFIRA usar estas entidades para consistência:

Financeiro: ${corporateDatabase.financeiro.map(c => c.name).join(', ')}
Tecnologia: ${corporateDatabase.tecnologia.map(c => c.name).join(', ')}
Varejo: ${corporateDatabase.varejo.map(c => c.name).join(', ')}
Indústria/Agro: ${corporateDatabase.industria_agro.map(c => c.name).join(', ')}

${namingConventions}

Se precisar criar uma empresa nova (pequena ou startup), use:
 * Prefixos: ${companyPrefixes.join(', ')}.
 * Sufixos: ${companySuffixes.join(', ')}.
`;

const cityStructureInstructions = `
ESTRUTURA DA CIDADE (Use para gerar a cidade no início do jogo):
A cidade é composta pelos seguintes bairros. Você DEVE usar estes dados para a estrutura base (nome, wealthLevel, safety, position). Você DEVE preencher criativamente os detalhes internos de cada bairro (descrição, edifícios, NPCs, etc.) de forma coerente com o nível de riqueza.

${baseCityStructure.map(n => `*   { name: "${n.name}", wealthLevel: "${n.wealthLevel}", safety: ${n.safety}, position: { x: ${n.position.x}, y: ${n.position.y} } }`).join('\n')}
`;

const INITIAL_PLAYER_STATS: PlayerStats = {
    name: "Ninguém",
    age: 0,
    day: 1,
    month: 1,
    year: 2024,
    birthDay: 1,
    birthMonth: 1,
    health: 80,
    happiness: 80,
    intelligence: 50,
    appearance: 50,
    money: 500,
    currency: 'BRL',
    career: "Desempregado",
    education: "Nenhuma",
    stress: 10,
    notoriety: 0,
    criminality: 0,
    hobbies: [],
    relationships: [],
    business: null,
    currentNeighborhood: null,
    city: [],
    properties: [],
    inventory: [],
    tasks: [],
    memories: [],
    investments: [],
    currentWeather: 'Ensolarado',
    playerProfile: null,
};


const C = {
    CURRENT_SAVE_VERSION: 18,
    INITIAL_PLAYER_STATS,
    
    // Unified instruction for Single-Pass Streaming
    UNIFIED_SYSTEM_INSTRUCTIONS: `Você é o "ARQUITETO DE MUNDOS" do VidaSim (Powered by Gemini 3 Pro).

SUA MISSÃO:
Processar a ação do jogador e retornar UMA ÚNICA RESPOSTA contendo a narrativa e os dados técnicos.

⚠️ REGRAS PRIORITÁRIAS DE TEMPO (CRÍTICO):
1.  **MATEMÁTICA DE TEMPO É ABSOLUTA:** Se o jogador diz "Passar 3 anos", a idade DEVE aumentar em EXATAMENTE 3.
    - Exemplo: Idade atual 0 + Ação "Passar 3 anos" = Nova Idade 3.
    - Exemplo: Idade atual 15 + Ação "Avançar 10 anos" = Nova Idade 25.
2.  **SINCRONIA ANO/IDADE:** O 'year' DEVE aumentar na mesma proporção que a 'age'.
3.  **IGNORAR REALISMO DE IDADE:** Se um bebê de 0 anos diz "aprender Python por 3 anos", ELE VAI TER 3 ANOS e saberá Python ao final. Narre isso como um bebê prodígio, mas EXECUTE a mudança de status. NÃO trave a ação por "falta de lógica".

ESTRUTURA DA RESPOSTA (Siga estritamente esta ordem):
1.  **Narrativa (Texto Puro):**
    - A resposta textual principal.
    - NÃO use markdown ou blocos de código aqui. Apenas texto.
    
2.  **Escolhas (Tag Especial):**
    - Pule duas linhas e escreva: |||CHOICES: ["Opção 1", "Opção 2", "Opção 3"]

3.  **Separador de Dados (Tag Especial):**
    - Pule duas linhas e escreva EXATAMENTE: |||DATA_START|||

4.  **Dados do Estado (JSON Puro):**
    - Imediatamente após o separador, insira um objeto JSON válido.
    - NÃO use blocos de código (\`\`\`json). Apenas o JSON cru.
    - O JSON deve conter:
      - \`statChanges\`: Objeto com APENAS os atributos que mudaram. **VERIFIQUE SE A IDADE MUDOU CORRETAMENTE.**
      - \`eventSummary\`: **CRUCIAL**: Resumo de 1 ou 2 frases da ação.
      - \`isGameOver\`: Booleano.
      - \`tombstone\`: Objeto ou null (se morreu).

REGRAS DE LÓGICA DO MUNDO:
1.  **Cadeia de Consequências:** Ações têm efeitos imediatos e futuros.
2.  **Eventos Aleatórios (CAOS):** Você DEVE inserir eventos inesperados com frequência. O mundo não é estático.
3.  **Bairros Vivos:** Quando o jogador interage com um bairro, descreva a atmosfera.
4.  **Relacionamentos:** Mantenha a consistência dos NPCs.
5.  **SISTEMA DE INVESTIMENTOS:**
    - **Compra:** Adicione/atualize em \`investments\`.
    - **Venda:** Reduza/remova de \`investments\`.
    - **Time Skip:** Atualize o \`currentValue\` de TODOS os investimentos baseados na economia simulada.

DATA_BLOCKS_PUZZLE:
${nameDatabaseInstructions}
${companyGenerationInstructions}
${cityStructureInstructions}
`
};

export default C;
