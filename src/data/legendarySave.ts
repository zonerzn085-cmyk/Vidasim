
import { SaveData } from '../types';
import { baseCityStructure } from './cityData';

// Reconstruct the city based on base structure but inject the saved neighborhood
// This ensures the map works correctly while preserving the custom neighborhood data
const baseCity = baseCityStructure.map((n, index) => ({
    id: `neighborhood_${index}_${Date.now()}`,
    name: n.name,
    description: `Um bairro com um caráter distinto, pronto para ser explorado.`,
    safety: n.safety,
    wealthLevel: n.wealthLevel,
    position: n.position,
    buildings: [],
    notableNPCs: [],
    propertiesForSale: [],
    localJobs: [],
    currentEvent: null,
}));

const savedNeighborhood = {
  id: "nh1",
  name: "Alto da Colina",
  description: "Um bairro exclusivo e luxuoso de São Paulo, conhecido por suas mansões imponentes, ruas arborizadas e uma comunidade de alto poder aquisitivo. A segurança é impecável e a qualidade de vida, excepcional.",
  safety: 90,
  wealthLevel: "Rica" as const,
  position: { x: 1, y: 1 },
  buildings: [
    {
      id: "b1",
      name: "Mansão da Família Barbosa",
      type: "Residencial",
      description: "Uma das maiores e mais elegantes residências do bairro, com vastos jardins e arquitetura clássica.",
      businessType: null,
      ownerId: null,
      quality: "Alta",
      serviceType: null
    },
    {
      id: "b2",
      name: "Restaurante Le Gourmet",
      type: "Comercial",
      description: "Um renomado restaurante francês, com pratos assinados e um ambiente sofisticado.",
      businessType: "Restaurante",
      ownerId: null,
      quality: "Alta",
      serviceType: null
    },
    {
      id: "b3",
      name: "Hospital Prime Care",
      type: "Saúde",
      description: "Um hospital de elite com a mais moderna tecnologia e os melhores especialistas.",
      businessType: null,
      ownerId: null,
      quality: "Alta",
      serviceType: "Hospital"
    },
    {
      id: "b4",
      name: "Escola Internacional Maple Leaf",
      type: "Educação",
      description: "Uma prestigiada escola bilíngue, com foco em educação integral e formação global.",
      businessType: null,
      ownerId: null,
      quality: "Alta",
      serviceType: "Escola"
    },
    {
      id: "b5",
      name: "Delegacia Especializada Alto da Colina",
      type: "Segurança",
      description: "A delegacia local, conhecida por sua eficiência e baixa taxa de criminalidade na região.",
      businessType: null,
      ownerId: null,
      quality: "Alta",
      serviceType: "Delegacia"
    },
    {
      id: "b6",
      name: "Boutique Elegance Moda",
      type: "Comercial",
      description: "Loja de roupas de grife com as últimas tendências da moda internacional.",
      businessType: "Loja de Roupas",
      ownerId: null,
      quality: "Alta",
      serviceType: null
    },
    {
      id: "b7",
      name: "Galeria de Arte Contemporânea Fênix",
      type: "Comercial",
      description: "Espaço dedicado à exibição e venda de obras de arte modernas de artistas renomados.",
      businessType: "Galeria de Arte",
      ownerId: null,
      quality: "Alta",
      serviceType: null
    },
    {
      id: "b8",
      name: "Academia Corpo Elite",
      type: "Serviço",
      description: "Academia com equipamentos de última geração e personal trainers exclusivos.",
      businessType: null,
      ownerId: null,
      quality: "Alta",
      serviceType: "Academia"
    },
    {
      id: "b9",
      name: "Condomínio Jardins Nobres",
      type: "Residencial",
      description: "Um condomínio de luxo com apartamentos espaçosos e diversas comodidades para os moradores.",
      businessType: null,
      ownerId: null,
      quality: "Alta",
      serviceType: null
    },
    {
      id: "b10",
      name: "Cafeteria Aroma Real",
      type: "Comercial",
      description: "Uma charmosa cafeteria, ideal para encontros casuais e reuniões de negócios rápidas.",
      businessType: "Cafeteria",
      ownerId: null,
      quality: "Média",
      serviceType: null
    }
  ],
  notableNPCs: [
    {
      id: "n1",
      name: "Dr. Ricardo Teixeira",
      description: "Renomado cirurgião cardíaco do Hospital Prime Care, conhecido por sua ética e habilidade.",
      personalityTraits: ["Dedicado", "Meticuloso", "Reservado"],
      motivations: ["Aperfeiçoar técnicas cirúrgicas", "Salvar vidas com excelência"],
      background: "Trabalhou em alguns dos hospitais mais renomados do mundo antes de retornar ao Brasil.",
      quirks: ["Sempre usa a mesma caneta para preencher prontuários.", "Limpa os óculos repetidamente quando está pensativo."],
      competencies: { "Medicina": 95, "Cirurgia": 98 }
    },
    {
      id: "n2",
      name: "Dona Alice Mendes",
      description: "Proprietária da Boutique Elegance Moda, sempre impecavelmente vestida e muito influente.",
      personalityTraits: ["Elegante", "Astuta", "Exigente"],
      motivations: ["Manter sua boutique como referência de luxo", "Influenciar tendências de moda"],
      background: "Começou como vendedora em uma pequena loja e construiu seu império de moda com trabalho duro e visão.",
      quirks: ["Tem uma coleção secreta de chapéus extravagantes.", "Nunca sai de casa sem um lenço de seda exclusivo."],
      competencies: { "Moda": 90, "Vendas": 85 }
    },
    {
      id: "n3",
      name: "Sr. Paulo Silva",
      description: "Diretor da Escola Internacional Maple Leaf, um educador respeitado na comunidade.",
      personalityTraits: ["Sábio", "Paciente", "Inovador"],
      motivations: ["Promover a educação integral", "Formar cidadãos globais"],
      background: "Um ex-diplomata que decidiu dedicar sua vida à educação, acreditando no poder transformador do conhecimento.",
      quirks: ["Sempre carrega um pequeno livro de poesia no bolso.", "Gosta de iniciar conversas citando pensadores clássicos."],
      competencies: { "Educação": 92, "Diplomacia": 80 }
    },
    {
      id: "n4",
      name: "Sra. Helena Costa",
      description: "Artista plástica de renome internacional, frequentemente vista na Galeria Fênix.",
      personalityTraits: ["Criativa", "Introspectiva", "Visionária"],
      motivations: ["Expressar a alma humana através da arte", "Inspirar novas gerações de artistas"],
      background: "Passou anos viajando o mundo, absorvendo culturas e técnicas artísticas diversas antes de se fixar em São Paulo.",
      quirks: ["Frequentemente esquece onde guardou as chaves, mas nunca onde deixou seu pincel favorito.", "Tem o hábito de desenhar em guardanapos de café."],
      competencies: { "Artes Plásticas": 95, "História da Arte": 88 }
    },
    {
      id: "n5",
      name: "Chefe Antônio Pereira",
      description: "Chefe do Restaurante Le Gourmet, famoso por sua culinária inovadora e premiada.",
      personalityTraits: ["Apaixonado", "Exigente", "Inovador"],
      motivations: ["Criar experiências gastronômicas únicas", "Alcançar reconhecimento internacional por sua culinária"],
      background: "Começou lavando pratos em um restaurante estrelado e ascendeu ao posto de chef com puro talento e determinação.",
      quirks: ["Gosta de testar novos temperos em seus pratos, às vezes com resultados surpreendentes.", "Sempre usa uma bandana vermelha na cozinha."],
      competencies: { "Culinária": 94, "Gestão de Cozinha": 85 }
    },
    {
      id: "n6",
      name: "Arquiteta Sofia Rodrigues",
      description: "Responsável pelo design de várias mansões e edifícios de luxo no bairro.",
      personalityTraits: ["Precisa", "Pragmática", "Estética"],
      motivations: ["Criar espaços funcionais e belos", "Deixar sua marca na arquitetura contemporânea"],
      background: "Graduada com honras na FAU-USP, rapidamente se destacou por seus projetos inovadores e sustentáveis.",
      quirks: ["Organiza sua mesa de trabalho com régua e esquadro todos os dias.", "Prefere cores neutras em seu vestuário, mas adora um acessório vibrante."],
      competencies: { "Arquitetura": 90, "Design de Interiores": 85 }
    },
    {
      id: "n7",
      name: "Thiago Martins",
      description: "Jovem e carismático professor de educação física na Academia Corpo Elite.",
      personalityTraits: ["Enérgico", "Motivador", "Altruísta"],
      motivations: ["Inspirar as pessoas a adotarem um estilo de vida saudável", "Ser um exemplo de bem-estar"],
      background: "Ex-atleta profissional que se tornou personal trainer após uma lesão, encontrando nova paixão em ajudar os outros.",
      quirks: ["Sempre começa o dia com uma corrida ao amanhecer, faça chuva ou faça sol.", "Tem uma playlist motivacional para cada tipo de exercício."],
      competencies: { "Educação Física": 88, "Nutrição": 70 }
    }
  ],
  propertiesForSale: [
    {
      id: "p1",
      name: "Apartamento de Luxo no Edifício Cristal",
      type: "Apartamento",
      value: 3500000,
      upkeepCost: 3500,
      rentalIncome: 15000,
      isRentedOut: false,
      neighborhoodId: "nh1"
    },
    {
      id: "p2",
      name: "Mansão com Piscina e Vista Panorâmica",
      type: "Casa",
      value: 8000000,
      upkeepCost: 8000,
      rentalIncome: 30000,
      isRentedOut: false,
      neighborhoodId: "nh1"
    },
    {
      id: "p3",
      name: "Cobertura Duplex no SkyTower",
      type: "Apartamento",
      value: 5000000,
      upkeepCost: 5000,
      rentalIncome: 20000,
      isRentedOut: false,
      neighborhoodId: "nh1"
    }
  ],
  localJobs: [
    {
      id: "j1",
      title: "Médico Residente",
      salary: 10000,
      requiredEducation: "Graduação em Medicina",
      requiredIntelligence: 80
    },
    {
      id: "j2",
      title: "Advogado Júnior",
      salary: 8000,
      requiredEducation: "Graduação em Direito",
      requiredIntelligence: 75
    },
    {
      id: "j3",
      title: "Gerente de Boutique",
      salary: 6000,
      requiredEducation: "Ensino Médio",
      requiredIntelligence: 60
    },
    {
      id: "j4",
      title: "Chef de Cozinha",
      salary: 9000,
      requiredEducation: "Ensino Médio",
      requiredIntelligence: 65
    }
  ],
  currentEvent: null
};

// Replace one of the base neighborhoods with the saved one to avoid duplication or omission
// We use the one at position x:1, y:1 as target replacement
const finalCity = baseCity.map(n => {
    if (n.position.x === 1 && n.position.y === 1) {
        return { ...n, ...savedNeighborhood, id: n.id }; // Keep generated ID but use saved data
    }
    return n;
});


export const arthurLegendarySave: SaveData = {
  id: "legendary_arthur_1762186517853",
  version: 17,
  playerStats: {
    name: "Arthur Oliveira Barbosa",
    age: 18,
    day: 28,
    month: 7,
    year: 2042,
    birthDay: 1,
    birthMonth: 1,
    health: 60,
    happiness: 100,
    intelligence: 100,
    appearance: 60,
    money: 486590,
    currency: "BRL",
    career: "CEO (dev.co)",
    education: "Ensino Médio",
    stress: 0,
    notoriety: 100,
    criminality: 45,
    currentWeather: "Ensolarado",
    playerProfile: {
        playstyle: "Visionário Tecnológico",
        summary: "De prodígio hacker a CEO respeitado, Arthur transformou habilidades obscuras em um império de jogos legítimo. Criador da tecnologia Vant e do sucesso Armas da Guerra.",
        lastUpdatedYear: 2040
    },
    hobbies: [
      "Programação", "Python", "Banco de Dados SQL", "Desenvolvimento de Sistemas",
      "Testes de Segurança de Dados", "Simulação de Invasão de Banco de Dados",
      "Programação em Python Avançado", "Otimização de Banco de Dados",
      "Vant - Sistema de Banco de Dados", "Desenvolvimento de Jogos 3D",
      "Criptografia", "Desenvolvimento de Darkweb", "Cibersegurança Avançada",
      "Venda de Software Pirata", "Empreendedorismo (dev.co)",
      "Desenvolvimento de Jogos em Equipe", "Design de Jogos Táticos",
      "Desenvolvimento de 'Armas da Guerra'", "Inteligência Artificial (Jogos)",
      "Simulação de Clima em Jogos", "Gerenciamento de Projetos de Jogo",
      "Integração de Arte 3D", "Programação de IA em Jogos",
      "Inovação em Sistemas de Jogos", "Marketing de Jogos",
      "Quebra de DRM", "Gestão de Empresas de Jogos",
      "Gestão de Comunidade de Jogos", "Análise de Feedback",
      "Otimização de Jogos", "Implementação de Feedback",
      "Produção de Trailer de Jogos", "Refinamento de Gameplay",
      "Tecnologia Vant (dev.co)", "Análise de Sistemas de Segurança",
      "Otimização de Robustez", "Gestão Empresarial",
      "Apresentações Técnicas", "Marketing de Lançamento de Jogos",
      "Distribuição Digital de Jogos"
    ],
    relationships: [
      {
        id: "rel1",
        name: "Gustavo Castro",
        type: "Pai",
        relationshipScore: 90,
        personalityTraits: ["Ambicioso", "Protetor", "Pragmático"],
        motivations: ["Garantir o futuro da família", "Expandir seus negócios"],
        background: "Herdeiro de uma grande empresa familiar que transformou um negócio regional em um império nacional.",
        quirks: ["Sempre verifica o relógio, mesmo sem compromisso iminente.", "Tem o hábito de organizar objetos por cor."],
        mentorshipDetails: null,
        competencies: { "Gestão de Negócios": 85, "Liderança": 90 }
      },
      {
        id: "rel2",
        name: "Camila Soares",
        type: "Mãe",
        relationshipScore: 90,
        personalityTraits: ["Carinhosa", "Refinada", "Perceptiva"],
        motivations: ["Manter a harmonia familiar", "Engajar-se em causas sociais importantes"],
        background: "Vem de uma linhagem de artistas e filantropos, dedicando sua vida à cultura e à comunidade.",
        quirks: ["Adora jardinagem e sempre tem terra nas unhas, apesar da sua elegância.", "Fala com as plantas como se fossem pessoas."],
        mentorshipDetails: null,
        competencies: { "Artes": 75, "Jardinagem": 90 }
      },
      {
        id: "rel3",
        name: "Rafael Santos",
        type: "Colega (Programador)",
        relationshipScore: 100,
        personalityTraits: ["Analítico", "Curioso", "Metódico", "Colaborativo", "Perfeccionista", "Visionário"],
        motivations: ["Resolver problemas complexos", "Criar inovações tecnológicas", "Contribuir para projetos significativos", "Dominar novas linguagens de programação", "Ver 'Armas da Guerra' se tornar um sucesso", "Explorar novas arquiteturas de software"],
        background: "Um programador autodidata que começou a codificar aos 8 anos, fascinado por algoritmos e lógica, sempre buscando a solução mais elegante para cada desafio.",
        quirks: ["Sempre tem um caderno de anotações e uma caneta à mão.", "Estala os dedos da mão esquerda quando está concentrado.", "Bebe café gelado, não importa a temperatura ambiente."],
        mentorshipDetails: null,
        competencies: { "Programação": 95, "Algoritmos": 98, "IA": 85 }
      },
      {
        id: "rel4",
        name: "Helena Costa",
        type: "Colega (Designer de Jogos)",
        relationshipScore: 100,
        personalityTraits: ["Criativa", "Comunicativa", "Sonhadora", "Organizada", "Empática", "Inspiradora"],
        motivations: ["Dar vida a mundos imaginários", "Proporcionar experiências inesquecíveis aos jogadores", "Ver suas criações se tornarem realidade", "Construir comunidades vibrantes em torno dos jogos", "Criar a narrativa e o visual icônico de 'Armas da Guerra'", "Desenvolver experiências de usuário revolucionárias"],
        background: "Desde pequena, desenhava cenários e personagens, transformando seu quarto em um universo de fantasia, com uma paixão inata por narrativas visuais.",
        quirks: ["Usa óculos com armações coloridas e incomuns.", "Sempre faz rabiscos em guardanapos enquanto pensa.", "Fala sozinha, testando diálogos e ideias de personagens."],
        mentorshipDetails: null,
        competencies: { "Design de Jogos": 96, "Narrativa": 92, "Arte 2D": 88 }
      }
    ],
    business: {
      name: "dev.co",
      type: "Legal",
      value: 10000,
      industry: "Jogos",
      annualRevenue: 0,
      annualExpenses: 15000,
      quality: 50,
      marketing: 50,
      staffCount: 3,
      morale: 90,
      workStyle: "Equilibrado",
      monthlySubscriptionPrice: 1500,
      customerCount: 1,
      enterprises: [],
      subsidiaries: [],
      executives: [
          { role: "Diretor Técnico (CTO)", personId: "rel3" },
          { role: "Diretora Criativa", personId: "rel4" }
      ],
      technologies: [
          {
              id: "tech_vant",
              name: "Vant",
              description: "Sistema de Banco de Dados Robusto com Criptografia Avançada.",
              status: "Concluído",
              bonusEffect: "Segurança de Dados +50, Performance +20%",
              yearCreated: 2042
          }
      ],
      gameProjects: [
          {
              id: "gp_armas_guerra",
              name: "Armas da Guerra",
              genre: "Tiro Tático",
              status: "Em Desenvolvimento",
              completionPercentage: 100,
              qualityScore: 95,
              revenueGenerated: 0,
              developmentCost: 5000,
              assignedStudio: "Sede Principal",
              technologiesUsed: ["Vant"],
              scale: "AAA",
              targetAudience: "Adulto",
              hype: 100,
              unitPrice: 60,
              currency: "USD",
              unitsSold: 0
          }
      ]
    },
    city: finalCity as any,
    currentNeighborhood: {
      ...savedNeighborhood,
      id: finalCity.find(n => n.position.x === 1 && n.position.y === 1)!.id,
      currentEvent: null
    } as any,
    properties: [],
    inventory: [],
    memories: [],
    investments: [],
    tasks: [
      {
        id: "task_vant_launch",
        title: "Lançar o sistema Vant oficialmente",
        category: "Meta",
        isComplete: true,
        dueDate: "Agora",
        relatedAttribute: "notoriety"
      },
      {
        id: "task_devco_form",
        title: "Formar a empresa de jogos dev.co com amigos",
        category: "Meta",
        isComplete: true,
        dueDate: "Agora",
        relatedAttribute: "notoriety"
      },
      {
        id: "task_devco_game",
        title: "Desenvolver o primeiro jogo 3D da dev.co",
        category: "Meta",
        isComplete: true,
        dueDate: "11/07/2042",
        relatedAttribute: "notoriety"
      },
      {
        id: "task_armas_da_guerra",
        title: "Desenvolver o jogo de tiro tático 'Armas da Guerra'",
        category: "Meta",
        isComplete: true,
        dueDate: "11/07/2042",
        relatedAttribute: "notoriety"
      },
      {
        id: "task_armas_da_guerra_demo",
        title: "Lançar demo jogável de 'Armas da Guerra' por $60",
        category: "Tarefa",
        isComplete: true,
        dueDate: "10/2040",
        relatedAttribute: "notoriety"
      },
      {
        id: "task_gestao_jogos",
        title: "Estudar gestão de empresas de jogos",
        category: "Tarefa",
        isComplete: false,
        dueDate: "Continuamente",
        relatedAttribute: "intelligence"
      },
      {
        id: "task_implementar_feedback",
        title: "Implementar feedback da comunidade no jogo final de 'Armas da Guerra'",
        category: "Tarefa",
        isComplete: true,
        dueDate: "11/07/2042",
        relatedAttribute: "notoriety"
      },
      {
        id: "task_trailer_armas_guerra",
        title: "Criar trailer de 'Armas da Guerra'",
        category: "Tarefa",
        isComplete: true,
        dueDate: "28/07/2042",
        relatedAttribute: "notoriety"
      },
      {
        id: "task_aperfeicoar_vant",
        title: "Aperfeiçoar o sistema Vant",
        category: "Tarefa",
        isComplete: true,
        dueDate: "03/2042",
        relatedAttribute: "intelligence"
      },
      {
        id: "task_marketing_armas_guerra",
        title: "Fazer marketing para o lançamento de 'Armas da Guerra'",
        category: "Tarefa",
        isComplete: true,
        dueDate: "Concluído",
        relatedAttribute: "notoriety"
      },
      {
        id: "task_pre_venda_armas_guerra",
        title: "Colocar 'Armas da Guerra' em pré-venda nas principais plataformas por $50",
        category: "Tarefa",
        isComplete: true,
        dueDate: "Agora",
        relatedAttribute: "notoriety"
      },
      {
        id: "task_marketing_vant",
        title: "Intensificar o marketing do Vant",
        category: "Tarefa",
        isComplete: false,
        dueDate: "Contínuo",
        relatedAttribute: "notoriety"
      },
      {
        id: "task_relatorio_feedback",
        title: "Criar relatórios sobre feedback da comunidade de 'Armas da Guerra'",
        category: "Tarefa",
        isComplete: false,
        dueDate: "Contínuo",
        relatedAttribute: "intelligence"
      }
    ]
  },
  gameLog: [
      {
          speaker: "system",
          text: "Resumo dos Capítulos Anteriores:\n\nVocê é Arthur Oliveira Barbosa, um prodígio nascido em 2024 no Alto da Colina, São Paulo. Desde bebê, demonstrou interesse por programação. Aos 5 anos, já invadia bancos de dados simulados. Aos 11, operava na DarkWeb vendendo software pirata sob o codinome 'DarkByte'.\n\nAos 12, fundou a 'dev.co' com amigos, Rafael e Helena, focando em criar o jogo 'Armas da Guerra'. Aos 18, legalizou a empresa, lançou a tecnologia revolucionária 'Vant' (Sistema de Banco de Dados Robusto) e completou o desenvolvimento do seu jogo.\n\nHoje é dia 28 de Julho de 2042. O jogo 'Armas da Guerra' está 100% pronto. O marketing gerou um Hype imenso. O público aguarda ansiosamente. É hora de lançar.",
          date: { day: 28, "month": 7, "year": 2042 }
      }
  ],
  history: []
};
