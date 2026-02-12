
import { JobOffer, UniversityCourse, ShopItem } from '../types';

// ============================================================================
// HELPERS
// ============================================================================

const generateId = (name: string, index: number) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 20) + `_${index}`;
};

const mapCategory = (rawCategory: string): 'Veículo' | 'Eletrônico' | 'Item de Luxo' | 'Outro' => {
    const cat = rawCategory.toLowerCase();
    if (cat.includes('carro') || cat.includes('moto') || cat.includes('transporte')) return 'Veículo';
    if (cat.includes('eletrônico')) return 'Eletrônico';
    if (cat.includes('luxo') || cat.includes('arte') || cat.includes('imóvel')) return 'Item de Luxo';
    return 'Outro';
};

const generateEffect = (category: string, price: number, intelligenceReq: number): string => {
    if (category === 'Veículo') {
        const agility = Math.min(50, Math.floor(price / 10000) + 5);
        return `Agilidade +${agility}, Status +${Math.floor(agility/2)}`;
    }
    if (category === 'Eletrônico') {
        return `Felicidade +${Math.min(30, Math.floor(price / 500))}, Inteligência +${Math.floor(intelligenceReq / 10)}`;
    }
    if (category === 'Item de Luxo') {
        return `Status +${Math.min(100, Math.floor(price / 5000))}, Notoriedade +${Math.floor(price / 20000)}`;
    }
    return `Conforto +${Math.min(20, Math.floor(price / 200))}`;
};

// ============================================================================
// DATABASE
// ============================================================================

export const STATIC_SHOP_ITEMS: ShopItem[] = [
    {
        id: 'item_smartphone_basic',
        name: 'Smartphone Básico',
        category: 'Eletrônico',
        price: 1500,
        description: 'Um celular funcional para o dia a dia.',
        effect: 'Felicidade +5'
    },
    {
        id: 'item_smartphone_pro',
        name: 'Smartphone Pro',
        category: 'Eletrônico',
        price: 5000,
        description: 'Câmera incrível e processador rápido.',
        effect: 'Felicidade +15, Status +5'
    },
    {
        id: 'item_notebook_work',
        name: 'Notebook de Trabalho',
        category: 'Eletrônico',
        price: 3500,
        description: 'Essencial para estudos e home office.',
        effect: 'Inteligência +2'
    },
    {
        id: 'item_car_popular',
        name: 'Carro Popular Usado',
        category: 'Veículo',
        price: 25000,
        description: 'Leva você do ponto A ao B.',
        effect: 'Agilidade +10'
    },
    {
        id: 'item_watch_luxury',
        name: 'Relógio de Ouro',
        category: 'Item de Luxo',
        price: 12000,
        description: 'Um símbolo de status inconfundível.',
        effect: 'Status +10'
    },
    {
        id: 'item_console_game',
        name: 'Console de Videogame',
        category: 'Eletrônico',
        price: 4000,
        description: 'Diversão garantida para o fim de semana.',
        effect: 'Felicidade +10'
    },
    {
        id: 'item_bike_sport',
        name: 'Bicicleta Esportiva',
        category: 'Veículo',
        price: 2500,
        description: 'Ótima para exercícios e transporte verde.',
        effect: 'Saúde +5, Agilidade +5'
    },
    {
        id: 'item_suit_tailored',
        name: 'Terno Sob Medida',
        category: 'Outro',
        price: 1500,
        description: 'Impressione em entrevistas e reuniões.',
        effect: 'Status +5, Aparência +5'
    }
];

export const STATIC_JOBS: JobOffer[] = [
    {
      title: "Operador de Telemarketing",
      company: "CallCenter Soluções",
      salary: 68828,
      description: "Prospecção de novos clientes e negociação de contratos. Remuneração baseada em comissão.",
      requirements: "Habilidade de persuasão. (QI > 49)"
    },
    {
      title: "Entregador de Bicicleta",
      company: "Ponto Final Entregas",
      salary: 19794,
      description: "Atendimento ao cliente, preparo de lanches e organização do salão. Ambiente dinâmico e rápido.",
      requirements: "Disposição para trabalho braçal. (QI > 23)"
    },
    {
      title: "Desenvolvedor Júnior",
      company: "Marketing Digital Pro",
      salary: 130213,
      description: "Acompanhamento de obras, elaboração de projetos estruturais e fiscalização de qualidade.",
      requirements: "Graduação em Ciência da Computação ou similar. (QI > 69)"
    },
    {
      title: "VP de Engenharia",
      company: "Hospital Estrela",
      salary: 694682,
      description: "Visão estratégica e liderança máxima da corporação. Responsável por todas as decisões de alto nível.",
      requirements: "Residência em cirurgia e 15 anos de prática. (QI > 99)"
    },
    {
      title: "Auxiliar Administrativo",
      company: "CallCenter Soluções",
      salary: 66451,
      description: "Organização de documentos, agendamento de reuniões e suporte à gerência.",
      requirements: "Experiência prévia em vendas. (QI > 35)"
    },
    {
      title: "Especialista em SEO",
      company: "Finanças Inteligentes",
      salary: 117478,
      description: "Ministrar aulas para o ensino médio, preparar material didático e acompanhar o desenvolvimento dos alunos.",
      requirements: "Diploma de Engenharia Civil e registro no CREA. (QI > 54)"
    },
    {
      title: "Engenheiro Civil Júnior",
      company: "CodeFlow Software",
      salary: 120511,
      description: "Acompanhamento de obras, elaboração de projetos estruturais e fiscalização de qualidade.",
      requirements: "Graduação em Ciência da Computação ou similar. (QI > 65)"
    },
    {
      title: "Advogado Sênior (Direito Empresarial)",
      company: "QuantumTech Labs",
      salary: 199374,
      description: "Arquitetura de sistemas escaláveis, mentoria de desenvolvedores juniores e definição de padrões de código.",
      requirements: "8 anos de experiência em desenvolvimento full-stack. (QI > 78)"
    },
    {
      title: "Técnico de Suporte Júnior",
      company: "Transporte Rápido",
      salary: 48306,
      description: "Atendimento ativo e receptivo para vendas de serviços. Ambiente de metas e pressão.",
      requirements: "Ensino médio completo e CNH. (QI > 34)"
    },
    {
      title: "Vendedor Externo",
      company: "Vendas & Cia.",
      salary: 36892,
      description: "Transporte de passageiros via aplicativo. Flexibilidade de horário e ganhos variáveis.",
      requirements: "Conhecimento básico em Pacote Office. (QI > 39)"
    },
    {
      title: "Especialista em SEO",
      company: "CodeFlow Software",
      salary: 168604,
      description: "Ministrar aulas para o ensino médio, preparar material didático e acompanhar o desenvolvimento dos alunos.",
      requirements: "Graduação em Ciência da Computação ou similar. (QI > 51)"
    },
    {
      title: "Advogado Sênior",
      company: "QuantumTech Labs",
      salary: 334371,
      description: "Arquitetura de sistemas escaláveis, mentoria de desenvolvedores juniores e definição de padrões de código.",
      requirements: "8 anos de experiência em desenvolvimento full-stack. (QI > 71)"
    },
    {
      title: "Repositor de Estoque",
      company: "Lixão Urbano S.A.",
      salary: 27585,
      description: "Atendimento ao cliente, preparo de lanches e organização do salão. Ambiente dinâmico e rápido.",
      requirements: "Disposição para trabalho braçal. (QI > 24)"
    },
    {
      title: "Operador de Telemarketing",
      company: "Transporte Rápido",
      salary: 56842,
      description: "Transporte de passageiros via aplicativo. Flexibilidade de horário e ganhos variáveis.",
      requirements: "Curso técnico em informática. (QI > 47)"
    },
    {
      title: "Desenvolvedor Júnior",
      company: "Finanças Inteligentes",
      salary: 75759,
      description: "Otimização de conteúdo para motores de busca, visando aumentar o tráfego orgânico do cliente.",
      requirements: "Licenciatura na área de atuação. (QI > 58)"
    },
    {
      title: "Motorista de Aplicativo",
      company: "Transporte Rápido",
      salary: 44553,
      description: "Atendimento ativo e receptivo para vendas de serviços. Ambiente de metas e pressão.",
      requirements: "Habilidade de persuasão. (QI > 46)"
    },
    {
      title: "Advogado Sênior",
      company: "C-Level Consultoria",
      salary: 281796,
      description: "Modelagem preditiva, análise de grandes volumes de dados e criação de insights para a diretoria.",
      requirements: "Mestrado em Direito e 5 anos de experiência. (QI > 77)"
    },
    {
      title: "Professor de Ensino Médio",
      company: "Marketing Digital Pro",
      salary: 131075,
      description: "Acompanhamento de obras, elaboração de projetos estruturais e fiscalização de qualidade.",
      requirements: "Experiência de 2 anos em análise de dados. (QI > 60)"
    },
    {
      title: "Atendente de Lanchonete",
      company: "Ponto Final Entregas",
      salary: 19713,
      description: "Responsável pela coleta e descarte de resíduos sólidos urbanos. Trabalho noturno e exigente fisicamente.",
      requirements: "Nenhuma experiência necessária. (QI > 21)"
    },
    {
      title: "Consultor Estratégico",
      company: "DataScience Elite",
      salary: 214729,
      description: "Liderança de equipes multidisciplinares, gestão de cronogramas e orçamentos de projetos complexos.",
      requirements: "Mestrado em Direito e 5 anos de experiência. (QI > 89)"
    },
    {
      title: "Engenheiro Civil Júnior",
      company: "CodeFlow Software",
      salary: 108567,
      description: "Acompanhamento de obras, elaboração de projetos estruturais e fiscalização de qualidade.",
      requirements: "Diploma de Engenharia Civil e registro no CREA. (QI > 63)"
    },
    {
      title: "Professor de Ensino Médio",
      company: "Escola do Saber",
      salary: 82020,
      description: "Elaboração de relatórios financeiros, análise de investimentos e orçamento empresarial.",
      requirements: "Licenciatura na área de atuação. (QI > 53)"
    },
    {
      title: "Engenheiro de Software Sênior",
      company: "Medicina Avançada",
      salary: 448743,
      description: "Desenvolvimento de planos de negócios e estratégias de mercado para empresas Fortune 500.",
      requirements: "Experiência em Big Four. (QI > 73)"
    },
    {
      title: "CEO",
      company: "Hospital Estrela",
      salary: 3882158,
      description: "Visão estratégica e liderança máxima da corporação. Responsável por todas as decisões de alto nível.",
      requirements: "Liderança de equipes globais de engenharia. (QI > 98)"
    },
    {
      title: "Analista Financeiro Pleno",
      company: "CodeFlow Software",
      salary: 174690,
      description: "Ministrar aulas para o ensino médio, preparar material didático e acompanhar o desenvolvimento dos alunos.",
      requirements: "Certificação em Google Analytics. (QI > 63)"
    },
    {
      title: "Engenheiro de Software Sênior",
      company: "DataScience Elite",
      salary: 230705,
      description: "Desenvolvimento de planos de negócios e estratégias de mercado para empresas Fortune 500.",
      requirements: "Doutorado em Estatística ou Ciência da Computação. (QI > 89)"
    },
    {
      title: "Diretor Financeiro (CFO)",
      company: "Hospital Estrela",
      salary: 4399365,
      description: "Definição da arquitetura tecnológica da empresa e gestão de milhares de engenheiros.",
      requirements: "Influência política e econômica. (QI > 99)"
    },
    {
      title: "Consultor Estratégico",
      company: "Medicina Avançada",
      salary: 313800,
      description: "Representação legal de grandes corporações, fusões e aquisições. Exige alta capacidade de negociação.",
      requirements: "Mestrado em Direito e 5 anos de experiência. (QI > 74)"
    },
    {
      title: "Gerente de Projetos Sênior",
      company: "C-Level Consultoria",
      salary: 491708,
      description: "Modelagem preditiva, análise de grandes volumes de dados e criação de insights para a diretoria.",
      requirements: "Experiência em Big Four. (QI > 84)"
    },
    {
      title: "Consultor Estratégico",
      company: "Global Law Firm",
      salary: 401020,
      description: "Modelagem preditiva, análise de grandes volumes de dados e criação de insights para a diretoria.",
      requirements: "8 anos de experiência em desenvolvimento full-stack. (QI > 88)"
    },
    {
      title: "Gerente de Projetos Sênior",
      company: "Global Law Firm",
      salary: 222408,
      description: "Representação legal de grandes corporações, fusões e aquisições. Exige alta capacidade de negociação.",
      requirements: "8 anos de experiência em desenvolvimento full-stack. (QI > 84)"
    },
    {
      title: "Engenheiro Civil Júnior",
      company: "Engenharia Estrutural",
      salary: 116387,
      description: "Otimização de conteúdo para motores de busca, visando aumentar o tráfego orgânico do cliente.",
      requirements: "Licenciatura na área de atuação. (QI > 53)"
    },
    {
      title: "Analista Financeiro Pleno",
      company: "CodeFlow Software",
      salary: 100342,
      description: "Acompanhamento de obras, elaboração de projetos estruturais e fiscalização de qualidade.",
      requirements: "Licenciatura na área de atuação. (QI > 63)"
    },
    {
      title: "Engenheiro de Software Sênior",
      company: "Medicina Avançada",
      salary: 318326,
      description: "Arquitetura de sistemas escaláveis, mentoria de desenvolvedores juniores e definição de padrões de código.",
      requirements: "Doutorado em Estatística ou Ciência da Computação. (QI > 71)"
    },
    {
      title: "Analista Financeiro Pleno",
      company: "CodeFlow Software",
      salary: 118683,
      description: "Elaboração de relatórios financeiros, análise de investimentos e orçamento empresarial.",
      requirements: "Graduação em Ciência da Computação ou similar. (QI > 52)"
    },
    {
      title: "Engenheiro Civil Júnior",
      company: "Marketing Digital Pro",
      salary: 103830,
      description: "Ministrar aulas para o ensino médio, preparar material didático e acompanhar o desenvolvimento dos alunos.",
      requirements: "Graduação em Ciência da Computação ou similar. (QI > 70)"
    },
    {
      title: "Analista Financeiro Pleno",
      company: "Finanças Inteligentes",
      salary: 112976,
      description: "Ministrar aulas para o ensino médio, preparar material didático e acompanhar o desenvolvimento dos alunos.",
      requirements: "Diploma de Engenharia Civil e registro no CREA. (QI > 59)"
    },
    {
      title: "Gerente de Projetos Sênior",
      company: "DataScience Elite",
      salary: 280457,
      description: "Arquitetura de sistemas escaláveis, mentoria de desenvolvedores juniores e definição de padrões de código.",
      requirements: "Doutorado em Estatística ou Ciência da Computação. (QI > 72)"
    },
    {
      title: "Especialista em SEO",
      company: "Finanças Inteligentes",
      salary: 95511,
      description: "Elaboração de relatórios financeiros, análise de investimentos e orçamento empresarial.",
      requirements: "Licenciatura na área de atuação. (QI > 70)"
    },
    {
      title: "Desenvolvedor Júnior",
      company: "Marketing Digital Pro",
      salary: 159717,
      description: "Ministrar aulas para o ensino médio, preparar material didático e acompanhar o desenvolvimento dos alunos.",
      requirements: "Certificação em Google Analytics. (QI > 60)"
    },
    {
      title: "Cientista de Dados",
      company: "DataScience Elite",
      salary: 448724,
      description: "Desenvolvimento de planos de negócios e estratégias de mercado para empresas Fortune 500.",
      requirements: "Mestrado em Direito e 5 anos de experiência. (QI > 74)"
    },
    {
      title: "Consultor Estratégico",
      company: "QuantumTech Labs",
      salary: 311491,
      description: "Arquitetura de sistemas escaláveis, mentoria de desenvolvedores juniores e definição de padrões de código.",
      requirements: "8 anos de experiência em desenvolvimento full-stack. (QI > 83)"
    },
    {
      title: "Engenheiro Civil Júnior",
      company: "Marketing Digital Pro",
      salary: 77763,
      description: "Elaboração de relatórios financeiros, análise de investimentos e orçamento empresarial.",
      requirements: "Diploma de Engenharia Civil e registro no CREA. (QI > 59)"
    },
    {
      title: "Engenheiro Civil Júnior",
      company: "Marketing Digital Pro",
      salary: 172343,
      description: "Elaboração de relatórios financeiros, análise de investimentos e orçamento empresarial.",
      requirements: "Experiência de 2 anos em análise de dados. (QI > 69)"
    },
    {
      title: "Engenheiro Civil Júnior",
      company: "Finanças Inteligentes",
      salary: 174336,
      description: "Desenvolvimento e manutenção de novas funcionalidades em aplicações web. Uso de tecnologias modernas.",
      requirements: "Experiência de 2 anos em análise de dados. (QI > 63)"
    },
    {
      title: "Especialista em SEO",
      company: "CodeFlow Software",
      salary: 96213,
      description: "Ministrar aulas para o ensino médio, preparar material didático e acompanhar o desenvolvimento dos alunos.",
      requirements: "Experiência de 2 anos em análise de dados. (QI > 55)"
    },
    {
      title: "Gerente de Projetos Sênior",
      company: "C-Level Consultoria",
      salary: 453461,
      description: "Arquitetura de sistemas escaláveis, mentoria de desenvolvedores juniores e definição de padrões de código.",
      requirements: "Doutorado em Estatística ou Ciência da Computação. (QI > 85)"
    },
    {
      title: "Desenvolvedor Júnior",
      company: "Engenharia Estrutural",
      salary: 82306,
      description: "Otimização de conteúdo para motores de busca, visando aumentar o tráfego orgânico do cliente.",
      requirements: "Licenciatura na área de atuação. (QI > 62)"
    },
    {
      title: "Analista Financeiro Pleno",
      company: "Marketing Digital Pro",
      salary: 72434,
      description: "Acompanhamento de obras, elaboração de projetos estruturais e fiscalização de qualidade.",
      requirements: "Experiência de 2 anos em análise de dados. (QI > 61)"
    },
    {
      title: "Gerente de Projetos Sênior",
      company: "DataScience Elite",
      salary: 476761,
      description: "Liderança de equipes multidisciplinares, gestão de cronogramas e orçamentos de projetos complexos.",
      requirements: "MBA ou Pós-graduação em Gestão. (QI > 73)"
    },
    {
      title: "Especialista em SEO",
      company: "Finanças Inteligentes",
      salary: 113892,
      description: "Desenvolvimento e manutenção de novas funcionalidades em aplicações web. Uso de tecnologias modernas.",
      requirements: "Licenciatura na área de atuação. (QI > 66)"
    },
    {
      title: "Professor de Ensino Médio",
      company: "Engenharia Estrutural",
      salary: 153020,
      description: "Acompanhamento de obras, elaboração de projetos estruturais e fiscalização de qualidade.",
      requirements: "Experiência de 2 anos em análise de dados. (QI > 59)"
    },
    {
      title: "Engenheiro de Software Sênior",
      company: "C-Level Consultoria",
      salary: 337097,
      description: "Liderança de equipes multidisciplinares, gestão de cronogramas e orçamentos de projetos complexos.",
      requirements: "8 anos de experiência em desenvolvimento full-stack. (QI > 78)"
    },
    {
      title: "Advogado Sênior (Direito Empresarial)",
      company: "QuantumTech Labs",
      salary: 363124,
      description: "Desenvolvimento de planos de negócios e estratégias de mercado para empresas Fortune 500.",
      requirements: "Mestrado em Direito e 5 anos de experiência. (QI > 72)"
    },
    {
      title: "Analista Financeiro Pleno",
      company: "Marketing Digital Pro",
      salary: 139207,
      description: "Acompanhamento de obras, elaboração de projetos estruturais e fiscalização de qualidade.",
      requirements: "Licenciatura na área de atuação. (QI > 67)"
    },
    {
      title: "VP de Engenharia",
      company: "TechNova Solutions",
      salary: 2165360,
      description: "Gestão do capital, planejamento financeiro de longo prazo e relações com investidores.",
      requirements: "Histórico comprovado de sucesso e liderança. (QI > 100)"
    },
    {
      title: "Consultor Estratégico",
      company: "C-Level Consultoria",
      salary: 244506,
      description: "Liderança de equipes multidisciplinares, gestão de cronogramas e orçamentos de projetos complexos.",
      requirements: "Mestrado em Direito e 5 anos de experiência. (QI > 79)"
    },
    {
      title: "Professor de Ensino Médio",
      company: "Finanças Inteligentes",
      salary: 90292,
      description: "Desenvolvimento e manutenção de novas funcionalidades em aplicações web. Uso de tecnologias modernas.",
      requirements: "Experiência de 2 anos em análise de dados. (QI > 65)"
    },
    {
      title: "Analista Financeiro Pleno",
      company: "Engenharia Estrutural",
      salary: 101893,
      description: "Acompanhamento de obras, elaboração de projetos estruturais e fiscalização de qualidade.",
      requirements: "Experiência de 2 anos em análise de dados. (QI > 69)"
    },
    {
      title: "Engenheiro de Software Sênior",
      company: "C-Level Consultoria",
      salary: 356526,
      description: "Arquitetura de sistemas escaláveis, mentoria de desenvolvedores juniores e definição de padrões de código.",
      requirements: "Experiência em Big Four. (QI > 82)"
    },
    {
      title: "Desenvolvedor Júnior",
      company: "Marketing Digital Pro",
      salary: 79292,
      description: "Elaboração de relatórios financeiros, análise de investimentos e orçamento empresarial.",
      requirements: "Diploma de Engenharia Civil e registro no CREA. (QI > 56)"
    },
    {
      title: "Engenheiro Civil Júnior",
      company: "Engenharia Estrutural",
      salary: 79127,
      description: "Acompanhamento de obras, elaboração de projetos estruturais e fiscalização de qualidade.",
      requirements: "Diploma de Engenharia Civil e registro no CREA. (QI > 58)"
    },
    {
      title: "Cientista de Dados",
      company: "QuantumTech Labs",
      salary: 260089,
      description: "Representação legal de grandes corporações, fusões e aquisições. Exige alta capacidade de negociação.",
      requirements: "Experiência em Big Four. (QI > 80)"
    },
    {
      title: "Professor de Ensino Médio",
      company: "Escola do Saber",
      salary: 165068,
      description: "Acompanhamento de obras, elaboração de projetos estruturais e fiscalização de qualidade.",
      requirements: "Diploma de Engenharia Civil e registro no CREA. (QI > 64)"
    },
    {
      title: "Analista Financeiro Pleno",
      company: "CodeFlow Software",
      salary: 119849,
      description: "Desenvolvimento e manutenção de novas funcionalidades em aplicações web. Uso de tecnologias modernas.",
      requirements: "Experiência de 2 anos em análise de dados. (QI > 61)"
    },
    {
      title: "Especialista em SEO",
      company: "CodeFlow Software",
      salary: 72076,
      description: "Otimização de conteúdo para motores de busca, visando aumentar o tráfego orgânico do cliente.",
      requirements: "Graduação em Ciência da Computação ou similar. (QI > 70)"
    },
    {
      title: "Diretor Financeiro (CFO)",
      company: "Hospital Estrela",
      salary: 3630007,
      description: "Liderança da equipe cirúrgica, realização de procedimentos de alta complexidade e pesquisa médica.",
      requirements: "Influência política e econômica. (QI > 92)"
    },
    {
      title: "Desenvolvedor Júnior",
      company: "Finanças Inteligentes",
      salary: 126946,
      description: "Acompanhamento de obras, elaboração de projetos estruturais e fiscalização de qualidade.",
      requirements: "Certificação em Google Analytics. (QI > 59)"
    },
    {
      title: "Cientista de Dados",
      company: "Medicina Avançada",
      salary: 285438,
      description: "Arquitetura de sistemas escaláveis, mentoria de desenvolvedores juniores e definição de padrões de código.",
      requirements: "Mestrado em Direito e 5 anos de experiência. (QI > 90)"
    },
    {
      title: "VP de Engenharia",
      company: "TechNova Solutions",
      salary: 2105361,
      description: "Supervisão da governança corporativa e representação da empresa perante acionistas.",
      requirements: "Liderança de equipes globais de engenharia. (QI > 93)"
    },
    {
      title: "Analista Financeiro Pleno",
      company: "Marketing Digital Pro",
      salary: 162379,
      description: "Elaboração de relatórios financeiros, análise de investimentos e orçamento empresarial.",
      requirements: "Licenciatura na área de atuação. (QI > 64)"
    },
    {
      title: "Cientista de Dados",
      company: "QuantumTech Labs",
      salary: 184056,
      description: "Representação legal de grandes corporações, fusões e aquisições. Exige alta capacidade de negociação.",
      requirements: "Doutorado em Estatística ou Ciência da Computação. (QI > 87)"
    },
    {
      title: "Analista Financeiro Pleno",
      company: "Finanças Inteligentes",
      salary: 89938,
      description: "Otimização de conteúdo para motores de busca, visando aumentar o tráfego orgânico do cliente.",
      requirements: "Certificação em Google Analytics. (QI > 53)"
    },
    {
      title: "Analista Financeiro Pleno",
      company: "Escola do Saber",
      salary: 106623,
      description: "Otimização de conteúdo para motores de busca, visando aumentar o tráfego orgânico do cliente.",
      requirements: "Licenciatura na área de atuação. (QI > 51)"
    },
    {
      title: "Gerente de Projetos Sênior",
      company: "Global Law Firm",
      salary: 273823,
      description: "Liderança de equipes multidisciplinares, gestão de cronogramas e orçamentos de projetos complexos.",
      requirements: "Doutorado em Estatística ou Ciência da Computação. (QI > 90)"
    },
    {
      title: "Cientista de Dados",
      company: "DataScience Elite",
      salary: 456309,
      description: "Desenvolvimento de planos de negócios e estratégias de mercado para empresas Fortune 500.",
      requirements: "Experiência em Big Four. (QI > 76)"
    },
    {
      title: "Desenvolvedor Júnior",
      company: "Engenharia Estrutural",
      salary: 151672,
      description: "Ministrar aulas para o ensino médio, preparar material didático e acompanhar o desenvolvimento dos alunos.",
      requirements: "Licenciatura na área de atuação. (QI > 58)"
    },
    {
      title: "VP de Engenharia",
      company: "Petróleo do Sul",
      salary: 1261259,
      description: "Definição da arquitetura tecnológica da empresa e gestão de milhares de engenheiros.",
      requirements: "Histórico comprovado de sucesso e liderança. (QI > 92)"
    },
    {
      title: "Gerente de Projetos Sênior",
      company: "DataScience Elite",
      salary: 369400,
      description: "Desenvolvimento de planos de negócios e estratégias de mercado para empresas Fortune 500.",
      requirements: "Mestrado em Direito e 5 anos de experiência. (QI > 74)"
    },
    {
      title: "Engenheiro Civil Júnior",
      company: "Marketing Digital Pro",
      salary: 107783,
      description: "Desenvolvimento e manutenção de novas funcionalidades em aplicações web. Uso de tecnologias modernas.",
      requirements: "Diploma de Engenharia Civil e registro no CREA. (QI > 65)"
    },
    {
      title: "Engenheiro Civil Júnior",
      company: "Engenharia Estrutural",
      salary: 169279,
      description: "Desenvolvimento e manutenção de novas funcionalidades em aplicações web. Uso de tecnologias modernas.",
      requirements: "Experiência de 2 anos em análise de dados. (QI > 62)"
    },
    {
      title: "VP de Engenharia",
      company: "MegaCorp Holding",
      salary: 4097069,
      description: "Supervisão da governança corporativa e representação da empresa perante acionistas.",
      requirements: "Residência em cirurgia e 15 anos de prática. (QI > 94)"
    },
    {
      title: "Professor de Ensino Médio",
      company: "CodeFlow Software",
      salary: 88675,
      description: "Desenvolvimento e manutenção de novas funcionalidades em aplicações web. Uso de tecnologias modernas.",
      requirements: "Certificação em Google Analytics. (QI > 54)"
    },
    {
      title: "Analista Financeiro Pleno",
      company: "CodeFlow Software",
      salary: 121074,
      description: "Desenvolvimento e manutenção de novas funcionalidades em aplicações web. Uso de tecnologias modernas.",
      requirements: "Licenciatura na área de atuação. (QI > 57)"
    },
    {
      title: "Analista Financeiro Pleno",
      company: "Marketing Digital Pro",
      salary: 152406,
      description: "Elaboração de relatórios financeiros, análise de investimentos e orçamento empresarial.",
      requirements: "Licenciatura na área de atuação. (QI > 62)"
    },
    {
      title: "Desenvolvedor Júnior",
      company: "Finanças Inteligentes",
      salary: 124961,
      description: "Ministrar aulas para o ensino médio, preparar material didático e acompanhar o desenvolvimento dos alunos.",
      requirements: "Certificação em Google Analytics. (QI > 61)"
    },
    {
      title: "Diretor Financeiro (CFO)",
      company: "Banco Central do Jogo",
      salary: 4981613,
      description: "Supervisão da governança corporativa e representação da empresa perante acionistas.",
      requirements: "20+ anos de experiência em finanças corporativas. (QI > 93)"
    },
    {
      title: "Especialista em SEO",
      company: "Escola do Saber",
      salary: 92801,
      description: "Desenvolvimento e manutenção de novas funcionalidades em aplicações web. Uso de tecnologias modernas.",
      requirements: "Certificação em Google Analytics. (QI > 67)"
    },
    {
      title: "Engenheiro Civil Júnior",
      company: "Finanças Inteligentes",
      salary: 127419,
      description: "Acompanhamento de obras, elaboração de projetos estruturais e fiscalização de qualidade.",
      requirements: "Certificação em Google Analytics. (QI > 56)"
    },
    {
      title: "Consultor Estratégico",
      company: "C-Level Consultoria",
      salary: 361786,
      description: "Desenvolvimento de planos de negócios e estratégias de mercado para empresas Fortune 500.",
      requirements: "8 anos de experiência em desenvolvimento full-stack. (QI > 79)"
    },
    {
      title: "Professor de Ensino Médio",
      company: "Escola do Saber",
      salary: 125424,
      description: "Elaboração de relatórios financeiros, análise de investimentos e orçamento empresarial.",
      requirements: "Diploma de Engenharia Civil e registro no CREA. (QI > 65)"
    },
    {
      title: "Especialista em SEO",
      company: "Finanças Inteligentes",
      salary: 138540,
      description: "Elaboração de relatórios financeiros, análise de investimentos e orçamento empresarial.",
      requirements: "Experiência de 2 anos em análise de dados. (QI > 60)"
    },
    {
      title: "Especialista em SEO",
      company: "Engenharia Estrutural",
      salary: 154202,
      description: "Desenvolvimento e manutenção de novas funcionalidades em aplicações web. Uso de tecnologias modernas.",
      requirements: "Diploma de Engenharia Civil e registro no CREA. (QI > 63)"
    },
    {
      title: "Analista Financeiro Pleno",
      company: "Escola do Saber",
      salary: 76365,
      description: "Desenvolvimento e manutenção de novas funcionalidades em aplicações web. Uso de tecnologias modernas.",
      requirements: "Experiência de 2 anos em análise de dados. (QI > 63)"
    },
    {
      title: "Engenheiro Civil Júnior",
      company: "Finanças Inteligentes",
      salary: 72541,
      description: "Desenvolvimento e manutenção de novas funcionalidades em aplicações web. Uso de tecnologias modernas.",
      requirements: "Experiência de 2 anos em análise de dados. (QI > 70)"
    },
    {
      title: "Desenvolvedor Júnior",
      company: "Finanças Inteligentes",
      salary: 161499,
      description: "Ministrar aulas para o ensino médio, preparar material didático e acompanhar o desenvolvimento dos alunos.",
      requirements: "Certificação em Google Analytics. (QI > 67)"
    },
    {
      title: "Professor de Ensino Médio",
      company: "Engenharia Estrutural",
      salary: 122695,
      description: "Acompanhamento de obras, elaboração de projetos estruturais e fiscalização de qualidade.",
      requirements: "Certificação em Google Analytics. (QI > 70)"
    },
    {
      title: "Especialista em SEO",
      company: "Finanças Inteligentes",
      salary: 132171,
      description: "Desenvolvimento e manutenção de novas funcionalidades em aplicações web. Uso de tecnologias modernas.",
      requirements: "Graduação em Ciência da Computação ou similar. (QI > 53)"
    },
    {
      title: "Especialista em SEO",
      company: "CodeFlow Software",
      salary: 83391,
      description: "Elaboração de relatórios financeiros, análise de investimentos e orçamento empresarial.",
      requirements: "Licenciatura na área de atuação. (QI > 62)"
    },
    {
      title: "Desenvolvedor Júnior",
      company: "CodeFlow Software",
      salary: 91258,
      description: "Otimização de conteúdo para motores de busca, visando aumentar o tráfego orgânico do cliente.",
      requirements: "Certificação em Google Analytics. (QI > 65)"
    },
    {
      title: "Engenheiro Civil Júnior",
      company: "Finanças Inteligentes",
      salary: 168169,
      description: "Desenvolvimento e manutenção de novas funcionalidades em aplicações web. Uso de tecnologias modernas.",
      requirements: "Licenciatura na área de atuação. (QI > 59)"
    },
    {
      title: "Presidente de Conselho",
      company: "Petróleo do Sul",
      salary: 4949714,
      description: "Gestão do capital, planejamento financeiro de longo prazo e relações com investidores.",
      requirements: "Influência política e econômica. (QI > 93)"
    },
    {
      title: "Professor de Ensino Médio",
      company: "CodeFlow Software",
      salary: 86765,
      description: "Elaboração de relatórios financeiros, análise de investimentos e orçamento empresarial.",
      requirements: "Graduação em Ciência da Computação ou similar. (QI > 70)"
    },
    {
      title: "Consultor Estratégico",
      company: "QuantumTech Labs",
      salary: 403888,
      description: "Representação legal de grandes corporações, fusões e aquisições. Exige alta capacidade de negociação.",
      requirements: "Experiência em Big Four. (QI > 74)"
    },
    {
      title: "Analista Financeiro Pleno",
      company: "Escola do Saber",
      salary: 157855,
      description: "Ministrar aulas para o ensino médio, preparar material didático e acompanhar o desenvolvimento dos alunos.",
      requirements: "Certificação em Google Analytics. (QI > 69)"
    },
    {
      title: "Cirurgião Chefe",
      company: "MegaCorp Holding",
      salary: 3082818,
      description: "Liderança da equipe cirúrgica, realização de procedimentos de alta complexidade e pesquisa médica.",
      requirements: "Residência em cirurgia e 15 anos de prática. (QI > 100)"
    },
    {
      title: "Consultor Estratégico",
      company: "Global Law Firm",
      salary: 240305,
      description: "Representação legal de grandes corporações, fusões e aquisições. Exige alta capacidade de negociação.",
      requirements: "Mestrado em Direito e 5 anos de experiência. (QI > 77)"
    },
    {
      title: "Desenvolvedor Júnior",
      company: "Marketing Digital Pro",
      salary: 127390,
      description: "Acompanhamento de obras, elaboração de projetos estruturais e fiscalização de qualidade.",
      requirements: "Diploma de Engenharia Civil e registro no CREA. (QI > 56)"
    },
    {
      title: "Diretor Financeiro (CFO)",
      company: "TechNova Solutions",
      salary: 3901842,
      description: "Liderança da equipe cirúrgica, realização de procedimentos de alta complexidade e pesquisa médica.",
      requirements: "Histórico comprovado de sucesso e liderança. (QI > 96)"
    },
    {
      title: "CEO",
      company: "Banco Central do Jogo",
      salary: 566303,
      description: "Visão estratégica e liderança máxima da corporação. Responsável por todas as decisões de alto nível.",
      requirements: "20+ anos de experiência em finanças corporativas. (QI > 97)"
    },
    {
      title: "CEO",
      company: "MegaCorp Holding",
      salary: 768743,
      description: "Liderança da equipe cirúrgica, realização de procedimentos de alta complexidade e pesquisa médica.",
      requirements: "Liderança de equipes globais de engenharia. (QI > 91)"
    },
    {
      title: "Advogado Sênior (Direito Empresarial)",
      company: "DataScience Elite",
      salary: 295037,
      description: "Desenvolvimento de planos de negócios e estratégias de mercado para empresas Fortune 500.",
      requirements: "Doutorado em Estatística ou Ciência da Computação. (QI > 79)"
    },
    {
      title: "Advogado Sênior (Direito Empresarial)",
      company: "C-Level Consultoria",
      salary: 309117,
      description: "Arquitetura de sistemas escaláveis, mentoria de desenvolvedores juniores e definição de padrões de código.",
      requirements: "MBA ou Pós-graduação em Gestão. (QI > 88)"
    },
    {
      title: "Cientista de Dados",
      company: "QuantumTech Labs",
      salary: 280915,
      description: "Representação legal de grandes corporações, fusões e aquisições. Exige alta capacidade de negociação.",
      requirements: "8 anos de experiência em desenvolvimento full-stack. (QI > 78)"
    },
    {
      title: "Advogado Sênior (Direito Empresarial)",
      company: "C-Level Consultoria",
      salary: 285379,
      description: "Arquitetura de sistemas escaláveis, mentoria de desenvolvedores juniores e definição de padrões de código.",
      requirements: "Doutorado em Estatística ou Ciência da Computação. (QI > 71)"
    },
    {
      title: "Professor de Ensino Médio",
      company: "Marketing Digital Pro",
      salary: 150867,
      description: "Otimização de conteúdo para motores de busca, visando aumentar o tráfego orgânico do cliente.",
      requirements: "Diploma de Engenharia Civil e registro no CREA. (QI > 63)"
    },
    {
      title: "Analista Financeiro Pleno",
      company: "Finanças Inteligentes",
      salary: 129415,
      description: "Elaboração de relatórios financeiros, análise de investimentos e orçamento empresarial.",
      requirements: "Graduação em Ciência da Computação ou similar. (QI > 57)"
    },
    {
      title: "Consultor Estratégico",
      company: "DataScience Elite",
      salary: 405568,
      description: "Modelagem preditiva, análise de grandes volumes de dados e criação de insights para a diretoria.",
      requirements: "Doutorado em Estatística ou Ciência da Computação. (QI > 83)"
    },
    {
      title: "Advogado Sênior (Direito Empresarial)",
      company: "Medicina Avançada",
      salary: 426690,
      description: "Desenvolvimento de planos de negócios e estratégias de mercado para empresas Fortune 500.",
      requirements: "Doutorado em Estatística ou Ciência da Computação. (QI > 86)"
    },
    {
      title: "Especialista em SEO",
      company: "Finanças Inteligentes",
      salary: 175605,
      description: "Desenvolvimento e manutenção de novas funcionalidades em aplicações web. Uso de tecnologias modernas.",
      requirements: "Experiência de 2 anos em análise de dados. (QI > 67)"
    },
    {
      title: "Desenvolvedor Júnior",
      company: "CodeFlow Software",
      salary: 95190,
      description: "Acompanhamento de obras, elaboração de projetos estruturais e fiscalização de qualidade.",
      requirements: "Certificação em Google Analytics. (QI > 56)"
    },
    {
      title: "Especialista em SEO",
      company: "Escola do Saber",
      salary: 152637,
      description: "Ministrar aulas para o ensino médio, preparar material didático e acompanhar o desenvolvimento dos alunos.",
      requirements: "Experiência de 2 anos em análise de dados. (QI > 69)"
    },
    {
      title: "Consultor Estratégico",
      company: "QuantumTech Labs",
      salary: 455965,
      description: "Arquitetura de sistemas escaláveis, mentoria de desenvolvedores juniores e definição de padrões de código.",
      requirements: "Experiência em Big Four. (QI > 73)"
    }
];

export const STATIC_COURSES: UniversityCourse[] = [
    {
        name: "Comércio Exterior",
        durationYears: 4,
        costPerYear: 18923,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 70"
    },
    {
        name: "Comércio Exterior",
        durationYears: 4,
        costPerYear: 26918,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 60"
    },
    {
        name: "Engenharia Civil",
        durationYears: 5,
        costPerYear: 26766,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 76"
    },
    {
        name: "Enfermagem",
        durationYears: 7,
        costPerYear: 37509,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 86"
    },
    {
        name: "Engenharia Civil",
        durationYears: 5,
        costPerYear: 33258,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 82"
    },
    {
        name: "Fisioterapia",
        durationYears: 7,
        costPerYear: 30204,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 88"
    },
    {
        name: "Administração de Empresas",
        durationYears: 4,
        costPerYear: 22376,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 62"
    },
    {
        name: "Engenharia Mecânica",
        durationYears: 6,
        costPerYear: 26457,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Finanças",
        durationYears: 5,
        costPerYear: 12420,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 78"
    },
    {
        name: "Fotografia",
        durationYears: 2,
        costPerYear: 7560,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 35"
    },
    {
        name: "Nutrição",
        durationYears: 7,
        costPerYear: 23292,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 81"
    },
    {
        name: "Comércio Exterior",
        durationYears: 4,
        costPerYear: 28943,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Engenharia Civil",
        durationYears: 6,
        costPerYear: 29613,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 78"
    },
    {
        name: "História",
        durationYears: 5,
        costPerYear: 22218,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 55"
    },
    {
        name: "Jornalismo",
        durationYears: 4,
        costPerYear: 16429,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 67"
    },
    {
        name: "Estatística",
        durationYears: 5,
        costPerYear: 16586,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 69"
    },
    {
        name: "Engenharia Civil",
        durationYears: 5,
        costPerYear: 19829,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 80"
    },
    {
        name: "História",
        durationYears: 5,
        costPerYear: 22247,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 57"
    },
    {
        name: "Veterinária",
        durationYears: 8,
        costPerYear: 50875,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 84"
    },
    {
        name: "Engenharia Elétrica",
        durationYears: 6,
        costPerYear: 39121,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 89"
    },
    {
        name: "Fotografia",
        durationYears: 2,
        costPerYear: 7485,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 39"
    },
    {
        name: "Odontologia",
        durationYears: 7,
        costPerYear: 22131,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 76"
    },
    {
        name: "Filosofia",
        durationYears: 4,
        costPerYear: 14216,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 58"
    },
    {
        name: "Física",
        durationYears: 6,
        costPerYear: 20141,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 64"
    },
    {
        name: "História",
        durationYears: 5,
        costPerYear: 8803,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 64"
    },
    {
        name: "Biomedicina",
        durationYears: 7,
        costPerYear: 31472,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 85"
    },
    {
        name: "Comércio Exterior",
        durationYears: 4,
        costPerYear: 21401,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 67"
    },
    {
        name: "Medicina",
        durationYears: 6,
        costPerYear: 20481,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 99"
    },
    {
        name: "Cinema e Audiovisual",
        durationYears: 5,
        costPerYear: 17703,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 68"
    },
    {
        name: "Artes Visuais",
        durationYears: 4,
        costPerYear: 17794,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 65"
    },
    {
        name: "Jornalismo",
        durationYears: 5,
        costPerYear: 23105,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 60"
    },
    {
        name: "Odontologia",
        durationYears: 8,
        costPerYear: 56646,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 74"
    },
    {
        name: "Cinema e Audiovisual",
        durationYears: 5,
        costPerYear: 14061,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 70"
    },
    {
        name: "Engenharia Elétrica",
        durationYears: 5,
        costPerYear: 19473,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 66"
    },
    {
        name: "Técnico em Enfermagem",
        durationYears: 1,
        costPerYear: 10033,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 30"
    },
    {
        name: "Análise de Sistemas",
        durationYears: 5,
        costPerYear: 30437,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 62"
    },
    {
        name: "Engenharia Civil",
        durationYears: 6,
        costPerYear: 25806,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 72"
    },
    {
        name: "Biomedicina",
        durationYears: 8,
        costPerYear: 23644,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 98"
    },
    {
        name: "Design de Interiores",
        durationYears: 2,
        costPerYear: 14792,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 40"
    },
    {
        name: "Física",
        durationYears: 6,
        costPerYear: 33864,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 70"
    },
    {
        name: "Relações Públicas",
        durationYears: 4,
        costPerYear: 13415,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 73"
    },
    {
        name: "Estética",
        durationYears: 3,
        costPerYear: 6661,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 32"
    },
    {
        name: "Ciência da Computação",
        durationYears: 6,
        costPerYear: 33482,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 62"
    },
    {
        name: "Medicina",
        durationYears: 8,
        costPerYear: 47095,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 100"
    },
    {
        name: "Engenharia Elétrica",
        durationYears: 6,
        costPerYear: 29095,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 84"
    },
    {
        name: "Análise de Sistemas",
        durationYears: 5,
        costPerYear: 27600,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 86"
    },
    {
        name: "Matemática Aplicada",
        durationYears: 5,
        costPerYear: 29570,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 76"
    },
    {
        name: "Artes Visuais",
        durationYears: 5,
        costPerYear: 16514,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 55"
    },
    {
        name: "Segurança do Trabalho",
        durationYears: 3,
        costPerYear: 13117,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 48"
    },
    {
        name: "Artes Visuais",
        durationYears: 5,
        costPerYear: 21664,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Química Industrial",
        durationYears: 5,
        costPerYear: 16625,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 64"
    },
    {
        name: "Jornalismo",
        durationYears: 4,
        costPerYear: 21143,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 70"
    },
    {
        name: "Medicina",
        durationYears: 8,
        costPerYear: 27944,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 93"
    },
    {
        name: "Economia",
        durationYears: 4,
        costPerYear: 14441,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 57"
    },
    {
        name: "Ciência da Computação",
        durationYears: 5,
        costPerYear: 19206,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 76"
    },
    {
        name: "Educação Física",
        durationYears: 6,
        costPerYear: 41614,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 92"
    },
    {
        name: "Medicina",
        durationYears: 8,
        costPerYear: 46647,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 96"
    },
    {
        name: "Direito",
        durationYears: 5,
        costPerYear: 12158,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 65"
    },
    {
        name: "Direito",
        durationYears: 4,
        costPerYear: 19819,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 77"
    },
    {
        name: "Medicina",
        durationYears: 7,
        costPerYear: 59873,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 85"
    },
    {
        name: "Comércio Exterior",
        durationYears: 5,
        costPerYear: 24733,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Jornalismo",
        durationYears: 5,
        costPerYear: 18703,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 56"
    },
    {
        name: "Filosofia",
        durationYears: 4,
        costPerYear: 16165,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 55"
    },
    {
        name: "Direito",
        durationYears: 4,
        costPerYear: 26313,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 53"
    },
    {
        name: "Farmácia",
        durationYears: 6,
        costPerYear: 44137,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 81"
    },
    {
        name: "Técnico em Eletrotécnica",
        durationYears: 3,
        costPerYear: 7966,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 32"
    },
    {
        name: "Design de Interiores",
        durationYears: 1,
        costPerYear: 11490,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 51"
    },
    {
        name: "Análise de Sistemas",
        durationYears: 6,
        costPerYear: 34702,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 76"
    },
    {
        name: "Medicina",
        durationYears: 6,
        costPerYear: 28891,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 96"
    },
    {
        name: "Direito",
        durationYears: 5,
        costPerYear: 22101,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 54"
    },
    {
        name: "Música",
        durationYears: 4,
        costPerYear: 9647,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 68"
    },
    {
        name: "Técnico em Informática",
        durationYears: 1,
        costPerYear: 13860,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 46"
    },
    {
        name: "Biomedicina",
        durationYears: 6,
        costPerYear: 37994,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 71"
    },
    {
        name: "Enfermagem",
        durationYears: 6,
        costPerYear: 33108,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 70"
    },
    {
        name: "Ciências Contábeis",
        durationYears: 4,
        costPerYear: 16709,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 60"
    },
    {
        name: "Engenharia Elétrica",
        durationYears: 5,
        costPerYear: 37896,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 83"
    },
    {
        name: "Física",
        durationYears: 6,
        costPerYear: 28682,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 75"
    },
    {
        name: "Finanças",
        durationYears: 5,
        costPerYear: 24587,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 71"
    },
    {
        name: "Marketing",
        durationYears: 4,
        costPerYear: 12632,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 53"
    },
    {
        name: "Logística",
        durationYears: 4,
        costPerYear: 20649,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 56"
    },
    {
        name: "Jornalismo",
        durationYears: 5,
        costPerYear: 13679,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 70"
    },
    {
        name: "Física",
        durationYears: 5,
        costPerYear: 37879,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 86"
    },
    {
        name: "Gestão de Recursos Humanos",
        durationYears: 4,
        costPerYear: 17909,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 62"
    },
    {
        name: "Engenharia Civil",
        durationYears: 5,
        costPerYear: 26781,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 73"
    },
    {
        name: "Filosofia",
        durationYears: 4,
        costPerYear: 21215,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 56"
    },
    {
        name: "Gestão de Recursos Humanos",
        durationYears: 5,
        costPerYear: 20567,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 57"
    },
    {
        name: "Enfermagem",
        durationYears: 8,
        costPerYear: 47648,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 83"
    },
    {
        name: "Engenharia de Software",
        durationYears: 5,
        costPerYear: 15102,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 83"
    },
    {
        name: "Matemática Aplicada",
        durationYears: 5,
        costPerYear: 39400,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 65"
    },
    {
        name: "Relações Internacionais",
        durationYears: 5,
        costPerYear: 21244,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 66"
    },
    {
        name: "Logística",
        durationYears: 4,
        costPerYear: 26326,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 76"
    },
    {
        name: "Matemática Aplicada",
        durationYears: 5,
        costPerYear: 23813,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 80"
    },
    {
        name: "Direito",
        durationYears: 4,
        costPerYear: 27752,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 77"
    },
    {
        name: "Relações Públicas",
        durationYears: 4,
        costPerYear: 10601,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 73"
    },
    {
        name: "Engenharia Elétrica",
        durationYears: 5,
        costPerYear: 36965,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 75"
    },
    {
        name: "Artes Visuais",
        durationYears: 5,
        costPerYear: 14855,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 60"
    },
    {
        name: "Química Industrial",
        durationYears: 5,
        costPerYear: 25083,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 68"
    },
    {
        name: "Veterinária",
        durationYears: 8,
        costPerYear: 52341,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 77"
    },
    {
        name: "Técnico em Eletrotécnica",
        durationYears: 1,
        costPerYear: 12588,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 33"
    },
    {
        name: "Gastronomia",
        durationYears: 1,
        costPerYear: 10755,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 60"
    },
    {
        name: "Ciência da Computação",
        durationYears: 5,
        costPerYear: 26687,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Ciências Contábeis",
        durationYears: 4,
        costPerYear: 21790,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 79"
    },
    {
        name: "Mecânica Automotiva",
        durationYears: 2,
        costPerYear: 5705,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 58"
    },
    {
        name: "Psicologia Clínica",
        durationYears: 8,
        costPerYear: 44434,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 81"
    },
    {
        name: "Engenharia Civil",
        durationYears: 6,
        costPerYear: 39028,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 80"
    },
    {
        name: "Engenharia Mecânica",
        durationYears: 6,
        costPerYear: 39035,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 81"
    },
    {
        name: "Administração de Empresas",
        durationYears: 4,
        costPerYear: 13418,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 76"
    },
    {
        name: "Química Industrial",
        durationYears: 6,
        costPerYear: 21743,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 80"
    },
    {
        name: "Análise de Sistemas",
        durationYears: 6,
        costPerYear: 37529,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 73"
    },
    {
        name: "Educação Física",
        durationYears: 7,
        costPerYear: 25684,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 99"
    },
    {
        name: "Veterinária",
        durationYears: 8,
        costPerYear: 51175,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 90"
    },
    {
        name: "Artes Visuais",
        durationYears: 5,
        costPerYear: 9100,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 49"
    },
    {
        name: "Cinema e Audiovisual",
        durationYears: 5,
        costPerYear: 14496,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 47"
    },
    {
        name: "Física",
        durationYears: 5,
        costPerYear: 29237,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 86"
    },
    {
        name: "Química Industrial",
        durationYears: 5,
        costPerYear: 32974,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 65"
    },
    {
        name: "Engenharia Civil",
        durationYears: 6,
        costPerYear: 19438,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 86"
    },
    {
        name: "Educação Física",
        durationYears: 6,
        costPerYear: 45997,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 100"
    },
    {
        name: "Estatística",
        durationYears: 5,
        costPerYear: 23476,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 70"
    },
    {
        name: "Gastronomia",
        durationYears: 3,
        costPerYear: 14485,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 53"
    },
    {
        name: "Química Industrial",
        durationYears: 6,
        costPerYear: 28789,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 74"
    },
    {
        name: "Teatro",
        durationYears: 5,
        costPerYear: 24774,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 55"
    },
    {
        name: "Nutrição",
        durationYears: 8,
        costPerYear: 54962,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 76"
    },
    {
        name: "Medicina",
        durationYears: 8,
        costPerYear: 37331,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 71"
    },
    {
        name: "Filosofia",
        durationYears: 5,
        costPerYear: 8405,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 58"
    },
    {
        name: "Engenharia Civil",
        durationYears: 5,
        costPerYear: 17933,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 64"
    },
    {
        name: "Letras",
        durationYears: 4,
        costPerYear: 17157,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 57"
    },
    {
        name: "Direito",
        durationYears: 4,
        costPerYear: 10720,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 62"
    },
    {
        name: "Comércio Exterior",
        durationYears: 4,
        costPerYear: 22128,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 62"
    },
    {
        name: "Logística",
        durationYears: 4,
        costPerYear: 29268,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 69"
    },
    {
        name: "Relações Internacionais",
        durationYears: 4,
        costPerYear: 19829,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 68"
    },
    {
        name: "Farmácia",
        durationYears: 6,
        costPerYear: 35155,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 80"
    },
    {
        name: "Medicina",
        durationYears: 6,
        costPerYear: 48386,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 78"
    },
    {
        name: "Relações Públicas",
        durationYears: 5,
        costPerYear: 14247,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 56"
    },
    {
        name: "Ciência da Computação",
        durationYears: 5,
        costPerYear: 30475,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 62"
    },
    {
        name: "Engenharia de Software",
        durationYears: 6,
        costPerYear: 39934,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 86"
    },
    {
        name: "Teatro",
        durationYears: 5,
        costPerYear: 11808,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 62"
    },
    {
        name: "Engenharia de Software",
        durationYears: 5,
        costPerYear: 17162,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Nutrição",
        durationYears: 7,
        costPerYear: 56399,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 97"
    },
    {
        name: "Design Gráfico",
        durationYears: 5,
        costPerYear: 17244,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 42"
    },
    {
        name: "Engenharia Elétrica",
        durationYears: 5,
        costPerYear: 34624,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 88"
    },
    {
        name: "Engenharia Elétrica",
        durationYears: 5,
        costPerYear: 16174,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 60"
    },
    {
        name: "Psicologia Clínica",
        durationYears: 6,
        costPerYear: 36597,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 82"
    },
    {
        name: "Estética",
        durationYears: 1,
        costPerYear: 14288,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 50"
    },
    {
        name: "Direito",
        durationYears: 5,
        costPerYear: 26441,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 68"
    },
    {
        name: "Fotografia",
        durationYears: 2,
        costPerYear: 5062,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 35"
    },
    {
        name: "Veterinária",
        durationYears: 8,
        costPerYear: 50035,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 80"
    },
    {
        name: "Comércio Exterior",
        durationYears: 4,
        costPerYear: 12694,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 78"
    },
    {
        name: "Gestão de Recursos Humanos",
        durationYears: 5,
        costPerYear: 10118,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 78"
    },
    {
        name: "Ciência da Computação",
        durationYears: 5,
        costPerYear: 37569,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 81"
    },
    {
        name: "Engenharia Elétrica",
        durationYears: 5,
        costPerYear: 34117,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 75"
    },
    {
        name: "Economia",
        durationYears: 4,
        costPerYear: 28389,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Análise de Sistemas",
        durationYears: 5,
        costPerYear: 30472,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 76"
    },
    {
        name: "Estatística",
        durationYears: 6,
        costPerYear: 30531,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 71"
    },
    {
        name: "Mecânica Automotiva",
        durationYears: 3,
        costPerYear: 14195,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 55"
    },
    {
        name: "Engenharia Mecânica",
        durationYears: 5,
        costPerYear: 21542,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 70"
    },
    {
        name: "Estética",
        durationYears: 3,
        costPerYear: 7218,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 44"
    },
    {
        name: "Artes Visuais",
        durationYears: 5,
        costPerYear: 8793,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 42"
    },
    {
        name: "Psicologia Clínica",
        durationYears: 7,
        costPerYear: 35022,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 71"
    },
    {
        name: "Direito",
        durationYears: 4,
        costPerYear: 10796,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 68"
    },
    {
        name: "Análise de Sistemas",
        durationYears: 5,
        costPerYear: 39411,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 90"
    },
    {
        name: "Engenharia de Software",
        durationYears: 6,
        costPerYear: 21196,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 76"
    },
    {
        name: "Engenharia Elétrica",
        durationYears: 6,
        costPerYear: 22701,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 89"
    },
    {
        name: "Jornalismo",
        durationYears: 5,
        costPerYear: 24961,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 58"
    },
    {
        name: "Artes Visuais",
        durationYears: 5,
        costPerYear: 8131,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 57"
    },
    {
        name: "Medicina",
        durationYears: 8,
        costPerYear: 25498,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 75"
    },
    {
        name: "Biomedicina",
        durationYears: 6,
        costPerYear: 58628,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 83"
    },
    {
        name: "Engenharia Mecânica",
        durationYears: 6,
        costPerYear: 33033,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 79"
    },
    {
        name: "Engenharia de Software",
        durationYears: 6,
        costPerYear: 36731,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Física",
        durationYears: 5,
        costPerYear: 17159,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 83"
    },
    {
        name: "Web Design",
        durationYears: 1,
        costPerYear: 7547,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 49"
    },
    {
        name: "Ciência da Computação",
        durationYears: 6,
        costPerYear: 17717,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 81"
    },
    {
        name: "Ciência da Computação",
        durationYears: 6,
        costPerYear: 39520,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 82"
    },
    {
        name: "Nutrição",
        durationYears: 8,
        costPerYear: 32540,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 72"
    },
    {
        name: "Engenharia Civil",
        durationYears: 5,
        costPerYear: 31699,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 82"
    },
    {
        name: "Segurança do Trabalho",
        durationYears: 1,
        costPerYear: 5909,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 54"
    },
    {
        name: "Fisioterapia",
        durationYears: 8,
        costPerYear: 35718,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 73"
    },
    {
        name: "Direito",
        durationYears: 4,
        costPerYear: 21564,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 74"
    },
    {
        name: "Química Industrial",
        durationYears: 5,
        costPerYear: 19534,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 74"
    },
    {
        name: "Marketing",
        durationYears: 4,
        costPerYear: 18193,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 65"
    },
    {
        name: "Ciência da Computação",
        durationYears: 6,
        costPerYear: 26099,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 66"
    },
    {
        name: "Psicologia Clínica",
        durationYears: 6,
        costPerYear: 31760,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 77"
    },
    {
        name: "Matemática Aplicada",
        durationYears: 6,
        costPerYear: 33408,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 84"
    },
    {
        name: "Engenharia de Software",
        durationYears: 5,
        costPerYear: 39405,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 78"
    },
    {
        name: "Engenharia Mecânica",
        durationYears: 6,
        costPerYear: 39153,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 68"
    },
    {
        name: "Artes Visuais",
        durationYears: 4,
        costPerYear: 18290,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 70"
    },
    {
        name: "Física",
        durationYears: 5,
        costPerYear: 20162,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 83"
    },
    {
        name: "Logística",
        durationYears: 4,
        costPerYear: 11011,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 73"
    },
    {
        name: "Física",
        durationYears: 5,
        costPerYear: 24568,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 80"
    },
    {
        name: "Educação Física",
        durationYears: 7,
        costPerYear: 40755,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 81"
    },
    {
        name: "Engenharia de Software",
        durationYears: 5,
        costPerYear: 15219,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 82"
    },
    {
        name: "Estética",
        durationYears: 2,
        costPerYear: 5104,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 55"
    },
    {
        name: "Direito",
        durationYears: 4,
        costPerYear: 10301,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 58"
    },
    {
        name: "Técnico em Eletrotécnica",
        durationYears: 2,
        costPerYear: 11731,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 60"
    },
    {
        name: "Engenharia Mecânica",
        durationYears: 6,
        costPerYear: 16515,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 70"
    },
    {
        name: "Química Industrial",
        durationYears: 5,
        costPerYear: 27903,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 84"
    },
    {
        name: "Logística",
        durationYears: 5,
        costPerYear: 19011,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 65"
    },
    {
        name: "Biomedicina",
        durationYears: 6,
        costPerYear: 33753,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 74"
    },
    {
        name: "Finanças",
        durationYears: 4,
        costPerYear: 14043,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 57"
    },
    {
        name: "Relações Internacionais",
        durationYears: 4,
        costPerYear: 13883,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 53"
    },
    {
        name: "Técnico em Informática",
        durationYears: 1,
        costPerYear: 10265,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 46"
    },
    {
        name: "Análise de Sistemas",
        durationYears: 5,
        costPerYear: 28223,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 90"
    },
    {
        name: "Engenharia Elétrica",
        durationYears: 5,
        costPerYear: 22862,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 83"
    },
    {
        name: "Jornalismo",
        durationYears: 5,
        costPerYear: 22465,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 45"
    },
    {
        name: "Jornalismo",
        durationYears: 4,
        costPerYear: 10009,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 69"
    },
    {
        name: "Design Gráfico",
        durationYears: 5,
        costPerYear: 16369,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 40"
    },
    {
        name: "Design Gráfico",
        durationYears: 5,
        costPerYear: 12658,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 54"
    },
    {
        name: "Relações Internacionais",
        durationYears: 4,
        costPerYear: 24828,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Técnico em Eletrotécnica",
        durationYears: 2,
        costPerYear: 14451,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 50"
    },
    {
        name: "Engenharia Elétrica",
        durationYears: 5,
        costPerYear: 37694,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 66"
    },
    {
        name: "Relações Públicas",
        durationYears: 4,
        costPerYear: 21069,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 50"
    },
    {
        name: "Gestão de Recursos Humanos",
        durationYears: 4,
        costPerYear: 29166,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 76"
    },
    {
        name: "Administração de Empresas",
        durationYears: 4,
        costPerYear: 25065,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 61"
    },
    {
        name: "Odontologia",
        durationYears: 7,
        costPerYear: 50889,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 71"
    },
    {
        name: "Finanças",
        durationYears: 4,
        costPerYear: 19233,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Cinema e Audiovisual",
        durationYears: 4,
        costPerYear: 15300,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 54"
    },
    {
        name: "Design de Interiores",
        durationYears: 3,
        costPerYear: 14215,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 51"
    },
    {
        name: "Segurança do Trabalho",
        durationYears: 1,
        costPerYear: 5223,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 49"
    },
    {
        name: "Música",
        durationYears: 4,
        costPerYear: 15661,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 57"
    },
    {
        name: "Direito",
        durationYears: 5,
        costPerYear: 23180,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 70"
    },
    {
        name: "Análise de Sistemas",
        durationYears: 6,
        costPerYear: 23805,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 67"
    },
    {
        name: "Design Gráfico",
        durationYears: 4,
        costPerYear: 18542,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 41"
    },
    {
        name: "Estética",
        durationYears: 3,
        costPerYear: 14763,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 56"
    },
    {
        name: "Enfermagem",
        durationYears: 6,
        costPerYear: 50364,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 87"
    },
    {
        name: "Gestão de Recursos Humanos",
        durationYears: 4,
        costPerYear: 21160,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 54"
    },
    {
        name: "Engenharia de Software",
        durationYears: 5,
        costPerYear: 15909,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 67"
    },
    {
        name: "Teatro",
        durationYears: 4,
        costPerYear: 12113,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 49"
    },
    {
        name: "Artes Visuais",
        durationYears: 4,
        costPerYear: 14460,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 57"
    },
    {
        name: "Engenharia de Software",
        durationYears: 6,
        costPerYear: 15347,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 65"
    },
    {
        name: "Educação Física",
        durationYears: 8,
        costPerYear: 24519,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 91"
    },
    {
        name: "Ciência da Computação",
        durationYears: 5,
        costPerYear: 19191,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 70"
    },
    {
        name: "Enfermagem",
        durationYears: 6,
        costPerYear: 41992,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 89"
    },
    {
        name: "Filosofia",
        durationYears: 4,
        costPerYear: 13765,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 66"
    },
    {
        name: "Estatística",
        durationYears: 6,
        costPerYear: 29799,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 78"
    },
    {
        name: "Filosofia",
        durationYears: 5,
        costPerYear: 13828,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 70"
    },
    {
        name: "Medicina",
        durationYears: 7,
        costPerYear: 26292,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 82"
    },
    {
        name: "Educação Física",
        durationYears: 7,
        costPerYear: 51859,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 100"
    },
    {
        name: "Física",
        durationYears: 6,
        costPerYear: 23634,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 90"
    },
    {
        name: "Marketing",
        durationYears: 5,
        costPerYear: 18117,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 58"
    },
    {
        name: "Ciência da Computação",
        durationYears: 6,
        costPerYear: 36929,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 79"
    },
    {
        name: "História",
        durationYears: 4,
        costPerYear: 10594,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 42"
    },
    {
        name: "Direito",
        durationYears: 4,
        costPerYear: 12094,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 74"
    },
    {
        name: "Educação Física",
        durationYears: 7,
        costPerYear: 21341,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 88"
    },
    {
        name: "Jornalismo",
        durationYears: 4,
        costPerYear: 13441,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 65"
    },
    {
        name: "Teatro",
        durationYears: 4,
        costPerYear: 21164,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Química Industrial",
        durationYears: 5,
        costPerYear: 28598,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 81"
    },
    {
        name: "Física",
        durationYears: 6,
        costPerYear: 21743,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 90"
    },
    {
        name: "Engenharia de Software",
        durationYears: 5,
        costPerYear: 29503,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 68"
    },
    {
        name: "Direito",
        durationYears: 5,
        costPerYear: 21461,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 51"
    },
    {
        name: "Design Gráfico",
        durationYears: 4,
        costPerYear: 15321,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 50"
    },
    {
        name: "Engenharia Mecânica",
        durationYears: 5,
        costPerYear: 20510,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 70"
    },
    {
        name: "Farmácia",
        durationYears: 7,
        costPerYear: 43538,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 99"
    },
    {
        name: "Cinema e Audiovisual",
        durationYears: 5,
        costPerYear: 21396,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 41"
    },
    {
        name: "Farmácia",
        durationYears: 6,
        costPerYear: 45204,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 70"
    },
    {
        name: "Relações Internacionais",
        durationYears: 4,
        costPerYear: 8310,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 58"
    },
    {
        name: "Música",
        durationYears: 5,
        costPerYear: 10872,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 43"
    },
    {
        name: "Engenharia Mecânica",
        durationYears: 5,
        costPerYear: 30081,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 70"
    },
    {
        name: "Direito",
        durationYears: 4,
        costPerYear: 14854,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 73"
    },
    {
        name: "Ciências Contábeis",
        durationYears: 5,
        costPerYear: 29628,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 59"
    },
    {
        name: "Teatro",
        durationYears: 5,
        costPerYear: 21057,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 47"
    },
    {
        name: "Fisioterapia",
        durationYears: 6,
        costPerYear: 29447,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 75"
    },
    {
        name: "Design Gráfico",
        durationYears: 4,
        costPerYear: 15766,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 66"
    },
    {
        name: "Psicologia Clínica",
        durationYears: 6,
        costPerYear: 57551,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 72"
    },
    {
        name: "Educação Física",
        durationYears: 8,
        costPerYear: 27532,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 95"
    },
    {
        name: "Gestão de Recursos Humanos",
        durationYears: 5,
        costPerYear: 14213,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 77"
    },
    {
        name: "Letras",
        durationYears: 4,
        costPerYear: 11340,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 40"
    },
    {
        name: "Ciência da Computação",
        durationYears: 6,
        costPerYear: 20948,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 71"
    },
    {
        name: "Relações Públicas",
        durationYears: 4,
        costPerYear: 22647,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 79"
    },
    {
        name: "Design de Interiores",
        durationYears: 1,
        costPerYear: 11220,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 47"
    },
    {
        name: "Marketing",
        durationYears: 5,
        costPerYear: 12584,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 65"
    },
    {
        name: "Marketing",
        durationYears: 4,
        costPerYear: 23853,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 64"
    },
    {
        name: "Jornalismo",
        durationYears: 5,
        costPerYear: 23092,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 46"
    },
    {
        name: "Engenharia Mecânica",
        durationYears: 6,
        costPerYear: 27281,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 82"
    },
    {
        name: "Fisioterapia",
        durationYears: 8,
        costPerYear: 35154,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 87"
    },
    {
        name: "Física",
        durationYears: 6,
        costPerYear: 19434,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 87"
    },
    {
        name: "Análise de Sistemas",
        durationYears: 5,
        costPerYear: 30285,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 71"
    },
    {
        name: "Matemática Aplicada",
        durationYears: 6,
        costPerYear: 37024,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 65"
    },
    {
        name: "Ciências Contábeis",
        durationYears: 4,
        costPerYear: 16310,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 66"
    },
    {
        name: "Relações Públicas",
        durationYears: 4,
        costPerYear: 27914,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 51"
    },
    {
        name: "Comércio Exterior",
        durationYears: 5,
        costPerYear: 17575,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 77"
    },
    {
        name: "Farmácia",
        durationYears: 6,
        costPerYear: 43304,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 80"
    },
    {
        name: "Nutrição",
        durationYears: 7,
        costPerYear: 53198,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 89"
    },
    {
        name: "Finanças",
        durationYears: 5,
        costPerYear: 27289,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 58"
    },
    {
        name: "Técnico em Informática",
        durationYears: 1,
        costPerYear: 8553,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 45"
    },
    {
        name: "Teatro",
        durationYears: 4,
        costPerYear: 13779,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Comércio Exterior",
        durationYears: 4,
        costPerYear: 14784,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 58"
    },
    {
        name: "Letras",
        durationYears: 4,
        costPerYear: 22887,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 65"
    },
    {
        name: "Biomedicina",
        durationYears: 7,
        costPerYear: 48579,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 92"
    },
    {
        name: "Comércio Exterior",
        durationYears: 4,
        costPerYear: 21688,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 57"
    },
    {
        name: "Enfermagem",
        durationYears: 6,
        costPerYear: 29339,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 83"
    },
    {
        name: "Farmácia",
        durationYears: 8,
        costPerYear: 34934,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 85"
    },
    {
        name: "Engenharia Mecânica",
        durationYears: 5,
        costPerYear: 37392,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 61"
    },
    {
        name: "Engenharia de Software",
        durationYears: 5,
        costPerYear: 32890,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 85"
    },
    {
        name: "Técnico em Informática",
        durationYears: 2,
        costPerYear: 6658,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 34"
    },
    {
        name: "Design de Interiores",
        durationYears: 2,
        costPerYear: 14830,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 44"
    },
    {
        name: "Filosofia",
        durationYears: 4,
        costPerYear: 9441,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 59"
    },
    {
        name: "Análise de Sistemas",
        durationYears: 6,
        costPerYear: 16816,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 70"
    },
    {
        name: "Jornalismo",
        durationYears: 5,
        costPerYear: 21651,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 64"
    },
    {
        name: "Relações Públicas",
        durationYears: 5,
        costPerYear: 12298,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 66"
    },
    {
        name: "Técnico em Eletrotécnica",
        durationYears: 1,
        costPerYear: 5987,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 30"
    },
    {
        name: "Farmácia",
        durationYears: 6,
        costPerYear: 52196,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 79"
    },
    {
        name: "Teatro",
        durationYears: 4,
        costPerYear: 14973,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 41"
    },
    {
        name: "Logística",
        durationYears: 4,
        costPerYear: 12266,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 55"
    },
    {
        name: "Física",
        durationYears: 5,
        costPerYear: 31350,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 85"
    },
    {
        name: "Economia",
        durationYears: 4,
        costPerYear: 20102,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 80"
    },
    {
        name: "História",
        durationYears: 4,
        costPerYear: 8291,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 51"
    },
    {
        name: "Artes Visuais",
        durationYears: 5,
        costPerYear: 17813,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 42"
    },
    {
        name: "Economia",
        durationYears: 5,
        costPerYear: 13136,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 53"
    },
    {
        name: "Ciências Contábeis",
        durationYears: 5,
        costPerYear: 22440,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 55"
    },
    {
        name: "Relações Públicas",
        durationYears: 5,
        costPerYear: 10874,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 56"
    },
    {
        name: "Análise de Sistemas",
        durationYears: 5,
        costPerYear: 19969,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 88"
    },
    {
        name: "Química Industrial",
        durationYears: 5,
        costPerYear: 17495,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 79"
    },
    {
        name: "Estatística",
        durationYears: 5,
        costPerYear: 18729,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 80"
    },
    {
        name: "Artes Visuais",
        durationYears: 5,
        costPerYear: 24733,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 68"
    },
    {
        name: "Química Industrial",
        durationYears: 6,
        costPerYear: 22278,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 85"
    },
    {
        name: "Teatro",
        durationYears: 5,
        costPerYear: 10924,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 61"
    },
    {
        name: "Nutrição",
        durationYears: 6,
        costPerYear: 46297,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 86"
    },
    {
        name: "Biomedicina",
        durationYears: 7,
        costPerYear: 23730,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 89"
    },
    {
        name: "Economia",
        durationYears: 5,
        costPerYear: 18106,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Jornalismo",
        durationYears: 5,
        costPerYear: 16152,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 67"
    },
    {
        name: "Música",
        durationYears: 5,
        costPerYear: 9189,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 42"
    },
    {
        name: "Música",
        durationYears: 4,
        costPerYear: 13763,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 54"
    },
    {
        name: "Farmácia",
        durationYears: 7,
        costPerYear: 27325,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 74"
    },
    {
        name: "Educação Física",
        durationYears: 6,
        costPerYear: 24299,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 75"
    },
    {
        name: "Fisioterapia",
        durationYears: 7,
        costPerYear: 24975,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 72"
    },
    {
        name: "Nutrição",
        durationYears: 7,
        costPerYear: 28667,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 96"
    },
    {
        name: "Mecânica Automotiva",
        durationYears: 2,
        costPerYear: 7139,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 38"
    },
    {
        name: "Artes Visuais",
        durationYears: 4,
        costPerYear: 14320,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 53"
    },
    {
        name: "Economia",
        durationYears: 5,
        costPerYear: 23241,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Engenharia Mecânica",
        durationYears: 6,
        costPerYear: 20654,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 71"
    },
    {
        name: "Design de Interiores",
        durationYears: 1,
        costPerYear: 9676,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 43"
    },
    {
        name: "Fisioterapia",
        durationYears: 8,
        costPerYear: 25955,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 76"
    },
    {
        name: "Relações Públicas",
        durationYears: 4,
        costPerYear: 26320,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 74"
    },
    {
        name: "Engenharia de Software",
        durationYears: 6,
        costPerYear: 22401,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 68"
    },
    {
        name: "Enfermagem",
        durationYears: 7,
        costPerYear: 57684,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 92"
    },
    {
        name: "Administração de Empresas",
        durationYears: 5,
        costPerYear: 26377,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 71"
    },
    {
        name: "Educação Física",
        durationYears: 8,
        costPerYear: 27893,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 99"
    },
    {
        name: "Farmácia",
        durationYears: 7,
        costPerYear: 23477,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 90"
    },
    {
        name: "Gestão de Recursos Humanos",
        durationYears: 5,
        costPerYear: 17026,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 66"
    },
    {
        name: "História",
        durationYears: 4,
        costPerYear: 11072,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 47"
    },
    {
        name: "Letras",
        durationYears: 5,
        costPerYear: 24013,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 64"
    },
    {
        name: "Farmácia",
        durationYears: 8,
        costPerYear: 55599,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 98"
    },
    {
        name: "Engenharia de Software",
        durationYears: 6,
        costPerYear: 17388,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 83"
    },
    {
        name: "Química Industrial",
        durationYears: 6,
        costPerYear: 38046,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 72"
    },
    {
        name: "Veterinária",
        durationYears: 6,
        costPerYear: 35881,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 78"
    },
    {
        name: "Mecânica Automotiva",
        durationYears: 2,
        costPerYear: 5370,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 57"
    },
    {
        name: "Análise de Sistemas",
        durationYears: 6,
        costPerYear: 17472,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 68"
    },
    {
        name: "Logística",
        durationYears: 4,
        costPerYear: 22476,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 50"
    },
    {
        name: "Cinema e Audiovisual",
        durationYears: 4,
        costPerYear: 23759,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 53"
    },
    {
        name: "Medicina",
        durationYears: 7,
        costPerYear: 32053,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 89"
    },
    {
        name: "Fotografia",
        durationYears: 1,
        costPerYear: 6975,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 55"
    },
    {
        name: "Educação Física",
        durationYears: 8,
        costPerYear: 51706,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 84"
    },
    {
        name: "Engenharia Elétrica",
        durationYears: 5,
        costPerYear: 18688,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 84"
    },
    {
        name: "Engenharia Elétrica",
        durationYears: 6,
        costPerYear: 39855,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 89"
    },
    {
        name: "Música",
        durationYears: 4,
        costPerYear: 14899,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 46"
    },
    {
        name: "Fotografia",
        durationYears: 2,
        costPerYear: 8459,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 43"
    },
    {
        name: "Análise de Sistemas",
        durationYears: 5,
        costPerYear: 35861,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 69"
    },
    {
        name: "Estatística",
        durationYears: 5,
        costPerYear: 21411,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Finanças",
        durationYears: 4,
        costPerYear: 12434,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 52"
    },
    {
        name: "Marketing",
        durationYears: 5,
        costPerYear: 13473,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 58"
    },
    {
        name: "Engenharia de Software",
        durationYears: 6,
        costPerYear: 36140,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 84"
    },
    {
        name: "Música",
        durationYears: 5,
        costPerYear: 23084,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 51"
    },
    {
        name: "Ciência da Computação",
        durationYears: 6,
        costPerYear: 16145,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 90"
    },
    {
        name: "Engenharia Elétrica",
        durationYears: 5,
        costPerYear: 30341,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 82"
    },
    {
        name: "Física",
        durationYears: 6,
        costPerYear: 18151,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 77"
    },
    {
        name: "Física",
        durationYears: 6,
        costPerYear: 39100,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 65"
    },
    {
        name: "Mecânica Automotiva",
        durationYears: 2,
        costPerYear: 6508,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 51"
    },
    {
        name: "Engenharia Elétrica",
        durationYears: 6,
        costPerYear: 30752,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 83"
    },
    {
        name: "Gestão de Recursos Humanos",
        durationYears: 5,
        costPerYear: 18350,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 62"
    },
    {
        name: "Educação Física",
        durationYears: 6,
        costPerYear: 47823,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 90"
    },
    {
        name: "Jornalismo",
        durationYears: 4,
        costPerYear: 22762,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 56"
    },
    {
        name: "Cinema e Audiovisual",
        durationYears: 5,
        costPerYear: 16483,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 48"
    },
    {
        name: "Enfermagem",
        durationYears: 8,
        costPerYear: 21216,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 93"
    },
    {
        name: "Direito",
        durationYears: 5,
        costPerYear: 27088,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 74"
    },
    {
        name: "Ciência da Computação",
        durationYears: 5,
        costPerYear: 29116,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 76"
    },
    {
        name: "Engenharia Elétrica",
        durationYears: 5,
        costPerYear: 30625,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 74"
    },
    {
        name: "Matemática Aplicada",
        durationYears: 6,
        costPerYear: 19560,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 77"
    },
    {
        name: "Ciências Contábeis",
        durationYears: 4,
        costPerYear: 23208,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 58"
    },
    {
        name: "Artes Visuais",
        durationYears: 5,
        costPerYear: 19786,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 47"
    },
    {
        name: "Economia",
        durationYears: 4,
        costPerYear: 18763,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 54"
    },
    {
        name: "Veterinária",
        durationYears: 7,
        costPerYear: 47536,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 100"
    },
    {
        name: "Educação Física",
        durationYears: 7,
        costPerYear: 35398,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 78"
    },
    {
        name: "Ciência da Computação",
        durationYears: 6,
        costPerYear: 28561,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 78"
    },
    {
        name: "Enfermagem",
        durationYears: 8,
        costPerYear: 23298,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 88"
    },
    {
        name: "Relações Públicas",
        durationYears: 5,
        costPerYear: 12920,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 78"
    },
    {
        name: "Análise de Sistemas",
        durationYears: 5,
        costPerYear: 38393,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 79"
    },
    {
        name: "Engenharia Elétrica",
        durationYears: 5,
        costPerYear: 36817,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 74"
    },
    {
        name: "Engenharia Mecânica",
        durationYears: 6,
        costPerYear: 33556,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Web Design",
        durationYears: 2,
        costPerYear: 13901,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 36"
    },
    {
        name: "Comércio Exterior",
        durationYears: 5,
        costPerYear: 17197,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 69"
    },
    {
        name: "Engenharia Civil",
        durationYears: 6,
        costPerYear: 29678,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 61"
    },
    {
        name: "Marketing",
        durationYears: 5,
        costPerYear: 27762,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 74"
    },
    {
        name: "Medicina",
        durationYears: 7,
        costPerYear: 51855,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 91"
    },
    {
        name: "Veterinária",
        durationYears: 6,
        costPerYear: 43721,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 98"
    },
    {
        name: "Gastronomia",
        durationYears: 2,
        costPerYear: 6180,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 41"
    },
    {
        name: "Engenharia de Software",
        durationYears: 5,
        costPerYear: 34766,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 82"
    },
    {
        name: "Física",
        durationYears: 6,
        costPerYear: 20261,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 89"
    },
    {
        name: "Design Gráfico",
        durationYears: 4,
        costPerYear: 15559,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 69"
    },
    {
        name: "Engenharia Civil",
        durationYears: 5,
        costPerYear: 38275,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 66"
    },
    {
        name: "Administração de Empresas",
        durationYears: 5,
        costPerYear: 18152,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 57"
    },
    {
        name: "Relações Internacionais",
        durationYears: 4,
        costPerYear: 19328,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 48"
    },
    {
        name: "Relações Internacionais",
        durationYears: 4,
        costPerYear: 19852,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Ciência da Computação",
        durationYears: 5,
        costPerYear: 39563,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 72"
    },
    {
        name: "História",
        durationYears: 4,
        costPerYear: 10995,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 45"
    },
    {
        name: "Psicologia Clínica",
        durationYears: 8,
        costPerYear: 31520,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 74"
    },
    {
        name: "Logística",
        durationYears: 5,
        costPerYear: 18676,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 60"
    },
    {
        name: "Estética",
        durationYears: 1,
        costPerYear: 14662,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 32"
    },
    {
        name: "Letras",
        durationYears: 5,
        costPerYear: 16450,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 58"
    },
    {
        name: "Ciência da Computação",
        durationYears: 6,
        costPerYear: 15146,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 66"
    },
    {
        name: "Comércio Exterior",
        durationYears: 5,
        costPerYear: 18617,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 58"
    },
    {
        name: "Estatística",
        durationYears: 6,
        costPerYear: 23330,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 69"
    },
    {
        name: "Técnico em Informática",
        durationYears: 3,
        costPerYear: 11176,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 32"
    },
    {
        name: "Matemática Aplicada",
        durationYears: 6,
        costPerYear: 17399,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 79"
    },
    {
        name: "Direito",
        durationYears: 4,
        costPerYear: 21611,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 69"
    },
    {
        name: "Jornalismo",
        durationYears: 5,
        costPerYear: 17137,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 70"
    },
    {
        name: "Estética",
        durationYears: 2,
        costPerYear: 7812,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 50"
    },
    {
        name: "Finanças",
        durationYears: 4,
        costPerYear: 13378,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 52"
    },
    {
        name: "Análise de Sistemas",
        durationYears: 6,
        costPerYear: 17307,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 68"
    },
    {
        name: "Nutrição",
        durationYears: 8,
        costPerYear: 48775,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 82"
    },
    {
        name: "Nutrição",
        durationYears: 8,
        costPerYear: 57955,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 82"
    },
    {
        name: "Fisioterapia",
        durationYears: 8,
        costPerYear: 47228,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 94"
    },
    {
        name: "Química Industrial",
        durationYears: 5,
        costPerYear: 22405,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 80"
    },
    {
        name: "Nutrição",
        durationYears: 8,
        costPerYear: 27526,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 71"
    },
    {
        name: "Direito",
        durationYears: 4,
        costPerYear: 16302,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 72"
    },
    {
        name: "Técnico em Enfermagem",
        durationYears: 3,
        costPerYear: 7291,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 54"
    },
    {
        name: "Marketing",
        durationYears: 4,
        costPerYear: 11227,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Matemática Aplicada",
        durationYears: 6,
        costPerYear: 34179,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 72"
    },
    {
        name: "Gastronomia",
        durationYears: 2,
        costPerYear: 7021,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 38"
    },
    {
        name: "Química Industrial",
        durationYears: 5,
        costPerYear: 23967,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 60"
    },
    {
        name: "Teatro",
        durationYears: 4,
        costPerYear: 12826,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 44"
    },
    {
        name: "Marketing",
        durationYears: 5,
        costPerYear: 18373,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 52"
    },
    {
        name: "Artes Visuais",
        durationYears: 5,
        costPerYear: 21945,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 46"
    },
    {
        name: "Engenharia Mecânica",
        durationYears: 5,
        costPerYear: 39263,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 86"
    },
    {
        name: "Engenharia Civil",
        durationYears: 5,
        costPerYear: 33129,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 81"
    },
    {
        name: "Comércio Exterior",
        durationYears: 4,
        costPerYear: 15260,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 68"
    },
    {
        name: "Cinema e Audiovisual",
        durationYears: 4,
        costPerYear: 17749,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 41"
    },
    {
        name: "Fisioterapia",
        durationYears: 8,
        costPerYear: 35965,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 88"
    },
    {
        name: "Fisioterapia",
        durationYears: 7,
        costPerYear: 28172,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 89"
    },
    {
        name: "Artes Visuais",
        durationYears: 4,
        costPerYear: 8444,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 61"
    },
    {
        name: "Ciência da Computação",
        durationYears: 6,
        costPerYear: 27884,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 63"
    },
    {
        name: "Filosofia",
        durationYears: 4,
        costPerYear: 12526,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 61"
    },
    {
        name: "Psicologia Clínica",
        durationYears: 7,
        costPerYear: 20163,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 92"
    },
    {
        name: "Design Gráfico",
        durationYears: 4,
        costPerYear: 14441,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 60"
    },
    {
        name: "Ciência da Computação",
        durationYears: 5,
        costPerYear: 34366,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 89"
    },
    {
        name: "Nutrição",
        durationYears: 6,
        costPerYear: 52610,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 83"
    },
    {
        name: "Educação Física",
        durationYears: 6,
        costPerYear: 33851,
        description: "Oferecido por Universidade Estadual de Campinas (UEC)",
        requirements: "QI Recomendado: 78"
    },
    {
        name: "Química Industrial",
        durationYears: 5,
        costPerYear: 15345,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 62"
    },
    {
        name: "História",
        durationYears: 5,
        costPerYear: 18198,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 50"
    },
    {
        name: "Relações Internacionais",
        durationYears: 4,
        costPerYear: 22897,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 58"
    },
    {
        name: "Técnico em Eletrotécnica",
        durationYears: 2,
        costPerYear: 12145,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 57"
    },
    {
        name: "Estatística",
        durationYears: 6,
        costPerYear: 33139,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 85"
    },
    {
        name: "Design Gráfico",
        durationYears: 4,
        costPerYear: 14926,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 48"
    },
    {
        name: "Logística",
        durationYears: 4,
        costPerYear: 12461,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 75"
    },
    {
        name: "Técnico em Informática",
        durationYears: 1,
        costPerYear: 6947,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 37"
    },
    {
        name: "Filosofia",
        durationYears: 4,
        costPerYear: 19753,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 54"
    },
    {
        name: "Ciência da Computação",
        durationYears: 6,
        costPerYear: 18767,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 71"
    },
    {
        name: "História",
        durationYears: 4,
        costPerYear: 8949,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 46"
    },
    {
        name: "Engenharia de Software",
        durationYears: 6,
        costPerYear: 25462,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 62"
    },
    {
        name: "Finanças",
        durationYears: 5,
        costPerYear: 24316,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 75"
    },
    {
        name: "Fisioterapia",
        durationYears: 8,
        costPerYear: 28594,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 93"
    },
    {
        name: "Design Gráfico",
        durationYears: 5,
        costPerYear: 13844,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 44"
    },
    {
        name: "Veterinária",
        durationYears: 6,
        costPerYear: 22828,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 73"
    },
    {
        name: "Psicologia Clínica",
        durationYears: 7,
        costPerYear: 35734,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 71"
    },
    {
        name: "Engenharia de Software",
        durationYears: 6,
        costPerYear: 32953,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 71"
    },
    {
        name: "Medicina",
        durationYears: 6,
        costPerYear: 46566,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 74"
    },
    {
        name: "Relações Públicas",
        durationYears: 5,
        costPerYear: 19413,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 74"
    },
    {
        name: "Educação Física",
        durationYears: 7,
        costPerYear: 42164,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 93"
    },
    {
        name: "Ciências Contábeis",
        durationYears: 5,
        costPerYear: 15485,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 79"
    },
    {
        name: "Direito",
        durationYears: 5,
        costPerYear: 20631,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 57"
    },
    {
        name: "Psicologia Clínica",
        durationYears: 6,
        costPerYear: 52253,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 94"
    },
    {
        name: "Engenharia de Software",
        durationYears: 5,
        costPerYear: 27739,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 78"
    },
    {
        name: "Fotografia",
        durationYears: 2,
        costPerYear: 10785,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 34"
    },
    {
        name: "Nutrição",
        durationYears: 6,
        costPerYear: 37906,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 98"
    },
    {
        name: "Relações Internacionais",
        durationYears: 5,
        costPerYear: 8508,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 60"
    },
    {
        name: "Música",
        durationYears: 5,
        costPerYear: 18679,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 41"
    },
    {
        name: "Matemática Aplicada",
        durationYears: 6,
        costPerYear: 38645,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 72"
    },
    {
        name: "Química Industrial",
        durationYears: 6,
        costPerYear: 29056,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 79"
    },
    {
        name: "Relações Internacionais",
        durationYears: 4,
        costPerYear: 19145,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 69"
    },
    {
        name: "Matemática Aplicada",
        durationYears: 5,
        costPerYear: 18459,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 74"
    },
    {
        name: "Jornalismo",
        durationYears: 5,
        costPerYear: 14684,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 61"
    },
    {
        name: "Engenharia Mecânica",
        durationYears: 5,
        costPerYear: 31683,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 82"
    },
    {
        name: "Ciência da Computação",
        durationYears: 5,
        costPerYear: 36607,
        description: "Oferecido por Escola Superior de Negócios 'Capital'",
        requirements: "QI Recomendado: 79"
    },
    {
        name: "Ciência da Computação",
        durationYears: 6,
        costPerYear: 37238,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 88"
    },
    {
        name: "Administração de Empresas",
        durationYears: 5,
        costPerYear: 15034,
        description: "Oferecido por Instituto Politécnico de Inovação (IPI)",
        requirements: "QI Recomendado: 57"
    },
    {
        name: "Análise de Sistemas",
        durationYears: 5,
        costPerYear: 30288,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 72"
    },
    {
        name: "Veterinária",
        durationYears: 7,
        costPerYear: 54407,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 81"
    },
    {
        name: "Logística",
        durationYears: 5,
        costPerYear: 20641,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 80"
    },
    {
        name: "Jornalismo",
        durationYears: 4,
        costPerYear: 20997,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 52"
    },
    {
        name: "Análise de Sistemas",
        durationYears: 6,
        costPerYear: 35534,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 88"
    },
    {
        name: "Engenharia Mecânica",
        durationYears: 6,
        costPerYear: 24354,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 85"
    },
    {
        name: "Farmácia",
        durationYears: 6,
        costPerYear: 37769,
        description: "Oferecido por Instituto de Artes Liberais 'O Pensador'",
        requirements: "QI Recomendado: 92"
    },
    {
        name: "Música",
        durationYears: 5,
        costPerYear: 23782,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 42"
    },
    {
        name: "Biomedicina",
        durationYears: 8,
        costPerYear: 50326,
        description: "Oferecido por Centro Universitário de Estudos Técnicos (CUET)",
        requirements: "QI Recomendado: 100"
    },
    {
        name: "Economia",
        durationYears: 4,
        costPerYear: 18485,
        description: "Oferecido por Universidade do Metaverso (UMV)",
        requirements: "QI Recomendado: 56"
    },
    {
        name: "Gastronomia",
        durationYears: 3,
        costPerYear: 14106,
        description: "Oferecido por Faculdade de Medicina 'Vita Nova'",
        requirements: "QI Recomendado: 51"
    },
    {
        name: "Engenharia Civil",
        durationYears: 6,
        costPerYear: 29031,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 82"
    },
    {
        name: "Relações Públicas",
        durationYears: 5,
        costPerYear: 22589,
        description: "Oferecido por Universidade Federal de São Paulo (UFS)",
        requirements: "QI Recomendado: 53"
    },
    {
        name: "Web Design",
        durationYears: 2,
        costPerYear: 11357,
        description: "Oferecido por Academia de Tecnologia Quântica (ATQ)",
        requirements: "QI Recomendado: 59"
    },
    {
        name: "Psicologia Clínica",
        durationYears: 8,
        costPerYear: 32360,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 93"
    },
    {
        name: "Logística",
        durationYears: 4,
        costPerYear: 19327,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 61"
    },
    {
        name: "Estética",
        durationYears: 3,
        costPerYear: 6726,
        description: "Oferecido por Faculdade de Direito 'Lex Suprema'",
        requirements: "QI Recomendado: 31"
    }
];
    