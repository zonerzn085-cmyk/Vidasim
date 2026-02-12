
import { Neighborhood } from '../types';

export interface CityNeighborhoodTemplate {
    name: string;
    wealthLevel: 'Pobre' | 'Média' | 'Rica';
    safety: number;
    description: string;
}

export const cityDatabase: Record<string, CityNeighborhoodTemplate[]> = {
  "Rio de Janeiro": [
    {
      "name": "Minato Plaza",
      "wealthLevel": "Rica",
      "safety": 98,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Rio de Janeiro)."
    },
    {
      "name": "Minato Plaza 74",
      "wealthLevel": "Rica",
      "safety": 87,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Rio de Janeiro)."
    },
    {
      "name": "Recoleta do Sol",
      "wealthLevel": "Rica",
      "safety": 94,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Rio de Janeiro)."
    },
    {
      "name": "Vila do Sol",
      "wealthLevel": "Rica",
      "safety": 87,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Rio de Janeiro)."
    },
    {
      "name": "Alto de Heights 51",
      "wealthLevel": "Rica",
      "safety": 94,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Rio de Janeiro)."
    },
    {
      "name": "Dahlem Chic",
      "wealthLevel": "Rica",
      "safety": 86,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Rio de Janeiro)."
    },
    {
      "name": "Kensington Heights",
      "wealthLevel": "Rica",
      "safety": 95,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Rio de Janeiro)."
    },
    {
      "name": "Restelo View 73",
      "wealthLevel": "Rica",
      "safety": 95,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Rio de Janeiro)."
    },
    {
      "name": "Jardim do Sol",
      "wealthLevel": "Rica",
      "safety": 91,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Rio de Janeiro)."
    },
    {
      "name": "Upper Hills 39",
      "wealthLevel": "Rica",
      "safety": 86,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Rio de Janeiro)."
    },
    {
      "name": "Vila View",
      "wealthLevel": "Rica",
      "safety": 96,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Rio de Janeiro)."
    },
    {
      "name": "7ème das Acácias",
      "wealthLevel": "Rica",
      "safety": 87,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Rio de Janeiro)."
    },
    {
      "name": "Palermo Heights",
      "wealthLevel": "Média",
      "safety": 79,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Rio de Janeiro)."
    },
    {
      "name": "Centro Sul",
      "wealthLevel": "Média",
      "safety": 60,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Rio de Janeiro)."
    },
    {
      "name": "Mid Kiez",
      "wealthLevel": "Média",
      "safety": 55,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Rio de Janeiro)."
    },
    {
      "name": "Mitte Central",
      "wealthLevel": "Média",
      "safety": 84,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Rio de Janeiro)."
    },
    {
      "name": "Campo de Norte",
      "wealthLevel": "Média",
      "safety": 59,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Rio de Janeiro)."
    },
    {
      "name": "Mitte Village",
      "wealthLevel": "Média",
      "safety": 71,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Rio de Janeiro)."
    },
    {
      "name": "Campo de Square",
      "wealthLevel": "Média",
      "safety": 81,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Rio de Janeiro)."
    },
    {
      "name": "East Square 58",
      "wealthLevel": "Média",
      "safety": 81,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Rio de Janeiro)."
    },
    {
      "name": "Mid Novo",
      "wealthLevel": "Média",
      "safety": 61,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Rio de Janeiro)."
    },
    {
      "name": "Centro Sul",
      "wealthLevel": "Média",
      "safety": 81,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Rio de Janeiro)."
    },
    {
      "name": "Vila Heights",
      "wealthLevel": "Média",
      "safety": 58,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Rio de Janeiro)."
    },
    {
      "name": "Vila Novo 64",
      "wealthLevel": "Média",
      "safety": 64,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Rio de Janeiro)."
    },
    {
      "name": "Centro Norte",
      "wealthLevel": "Média",
      "safety": 68,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Rio de Janeiro)."
    },
    {
      "name": "Centro Sul",
      "wealthLevel": "Média",
      "safety": 78,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Rio de Janeiro)."
    },
    {
      "name": "East Heights",
      "wealthLevel": "Média",
      "safety": 84,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Rio de Janeiro)."
    },
    {
      "name": "Mid Novo",
      "wealthLevel": "Média",
      "safety": 59,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Rio de Janeiro)."
    },
    {
      "name": "Vila Village",
      "wealthLevel": "Média",
      "safety": 62,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Rio de Janeiro)."
    },
    {
      "name": "East Central",
      "wealthLevel": "Média",
      "safety": 73,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Rio de Janeiro)."
    },
    {
      "name": "North Heights",
      "wealthLevel": "Média",
      "safety": 64,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Rio de Janeiro)."
    },
    {
      "name": "West Novo",
      "wealthLevel": "Média",
      "safety": 59,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Rio de Janeiro)."
    },
    {
      "name": "North Central",
      "wealthLevel": "Média",
      "safety": 59,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Rio de Janeiro)."
    },
    {
      "name": "Villa da Ponte",
      "wealthLevel": "Pobre",
      "safety": 51,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Rio de Janeiro)."
    },
    {
      "name": "Baixada Block",
      "wealthLevel": "Pobre",
      "safety": 44,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Rio de Janeiro)."
    },
    {
      "name": "Baixada Perdido",
      "wealthLevel": "Pobre",
      "safety": 13,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Rio de Janeiro)."
    },
    {
      "name": "Kiez Side",
      "wealthLevel": "Pobre",
      "safety": 49,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Rio de Janeiro)."
    },
    {
      "name": "Villa Block",
      "wealthLevel": "Pobre",
      "safety": 51,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Rio de Janeiro)."
    },
    {
      "name": "Outer Block",
      "wealthLevel": "Pobre",
      "safety": 24,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Rio de Janeiro)."
    },
    {
      "name": "Kiez End",
      "wealthLevel": "Pobre",
      "safety": 31,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Rio de Janeiro)."
    },
    {
      "name": "South End",
      "wealthLevel": "Pobre",
      "safety": 35,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Rio de Janeiro)."
    },
    {
      "name": "Complexo Perdido",
      "wealthLevel": "Pobre",
      "safety": 39,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Rio de Janeiro)."
    },
    {
      "name": "Outer do Fim",
      "wealthLevel": "Pobre",
      "safety": 38,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Rio de Janeiro)."
    },
    {
      "name": "Cova do Fim",
      "wealthLevel": "Pobre",
      "safety": 30,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Rio de Janeiro)."
    },
    {
      "name": "Outer End",
      "wealthLevel": "Pobre",
      "safety": 45,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Rio de Janeiro)."
    },
    {
      "name": "Kiez Oeste",
      "wealthLevel": "Pobre",
      "safety": 51,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Rio de Janeiro)."
    },
    {
      "name": "East Side",
      "wealthLevel": "Pobre",
      "safety": 26,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Rio de Janeiro)."
    }
  ],
  "Nova York": [
    {
      "name": "Reserva Park",
      "wealthLevel": "Rica",
      "safety": 88,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Nova York)."
    },
    {
      "name": "Vila Plaza",
      "wealthLevel": "Rica",
      "safety": 100,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Nova York)."
    },
    {
      "name": "Upper Imperial",
      "wealthLevel": "Rica",
      "safety": 97,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Nova York)."
    },
    {
      "name": "Reserva das Acácias",
      "wealthLevel": "Rica",
      "safety": 90,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Nova York)."
    },
    {
      "name": "Vila Chic",
      "wealthLevel": "Rica",
      "safety": 96,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Nova York)."
    },
    {
      "name": "7ème das Acácias",
      "wealthLevel": "Rica",
      "safety": 95,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Nova York)."
    },
    {
      "name": "Upper Prestige",
      "wealthLevel": "Rica",
      "safety": 99,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Nova York)."
    },
    {
      "name": "Minato Park 34",
      "wealthLevel": "Rica",
      "safety": 94,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Nova York)."
    },
    {
      "name": "Recoleta Chic",
      "wealthLevel": "Rica",
      "safety": 90,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Nova York)."
    },
    {
      "name": "Recoleta das Acácias",
      "wealthLevel": "Rica",
      "safety": 99,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Nova York)."
    },
    {
      "name": "Reserva das Acácias",
      "wealthLevel": "Rica",
      "safety": 91,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Nova York)."
    },
    {
      "name": "Jardim do Sol",
      "wealthLevel": "Rica",
      "safety": 92,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Nova York)."
    },
    {
      "name": "Minato do Sol",
      "wealthLevel": "Rica",
      "safety": 89,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Nova York)."
    },
    {
      "name": "Dahlem Plaza",
      "wealthLevel": "Rica",
      "safety": 89,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Nova York)."
    },
    {
      "name": "Reserva Chic",
      "wealthLevel": "Rica",
      "safety": 91,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Nova York)."
    },
    {
      "name": "Alto de View 51",
      "wealthLevel": "Rica",
      "safety": 90,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Nova York)."
    },
    {
      "name": "Recoleta Imperial",
      "wealthLevel": "Rica",
      "safety": 91,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Nova York)."
    },
    {
      "name": "Dahlem Heights",
      "wealthLevel": "Rica",
      "safety": 89,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Nova York)."
    },
    {
      "name": "Kensington Chic",
      "wealthLevel": "Rica",
      "safety": 89,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Nova York)."
    },
    {
      "name": "Alto de Gardens 50",
      "wealthLevel": "Rica",
      "safety": 86,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Nova York)."
    },
    {
      "name": "7ème Imperial",
      "wealthLevel": "Rica",
      "safety": 95,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Nova York)."
    },
    {
      "name": "Alto de Gardens",
      "wealthLevel": "Rica",
      "safety": 86,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Nova York)."
    },
    {
      "name": "Upper Imperial",
      "wealthLevel": "Rica",
      "safety": 100,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Nova York)."
    },
    {
      "name": "Kensington Chic",
      "wealthLevel": "Rica",
      "safety": 95,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Nova York)."
    },
    {
      "name": "Reserva Prestige",
      "wealthLevel": "Rica",
      "safety": 90,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Nova York)."
    },
    {
      "name": "Recoleta Hills 90",
      "wealthLevel": "Rica",
      "safety": 95,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Nova York)."
    },
    {
      "name": "Mid Central",
      "wealthLevel": "Média",
      "safety": 61,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Nova York)."
    },
    {
      "name": "Bairro Heights",
      "wealthLevel": "Média",
      "safety": 80,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Nova York)."
    },
    {
      "name": "Palermo Square",
      "wealthLevel": "Média",
      "safety": 76,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Nova York)."
    },
    {
      "name": "Palermo Kiez",
      "wealthLevel": "Média",
      "safety": 83,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Nova York)."
    },
    {
      "name": "East Velho",
      "wealthLevel": "Média",
      "safety": 62,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Nova York)."
    },
    {
      "name": "Mitte Kiez",
      "wealthLevel": "Média",
      "safety": 60,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Nova York)."
    },
    {
      "name": "Palermo do Comércio",
      "wealthLevel": "Média",
      "safety": 71,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Nova York)."
    },
    {
      "name": "North Novo",
      "wealthLevel": "Média",
      "safety": 77,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Nova York)."
    },
    {
      "name": "East Norte",
      "wealthLevel": "Média",
      "safety": 57,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Nova York)."
    },
    {
      "name": "North Norte",
      "wealthLevel": "Média",
      "safety": 84,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Nova York)."
    },
    {
      "name": "Bairro Square",
      "wealthLevel": "Média",
      "safety": 66,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Nova York)."
    },
    {
      "name": "West Village",
      "wealthLevel": "Média",
      "safety": 72,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Nova York)."
    },
    {
      "name": "Centro Village 24",
      "wealthLevel": "Média",
      "safety": 63,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Nova York)."
    },
    {
      "name": "North Novo 35",
      "wealthLevel": "Média",
      "safety": 62,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Nova York)."
    },
    {
      "name": "Campo de Velho",
      "wealthLevel": "Média",
      "safety": 81,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Nova York)."
    },
    {
      "name": "North Square",
      "wealthLevel": "Média",
      "safety": 60,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Nova York)."
    },
    {
      "name": "Bairro Heights 52",
      "wealthLevel": "Média",
      "safety": 56,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Nova York)."
    },
    {
      "name": "Palermo Village",
      "wealthLevel": "Média",
      "safety": 67,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Nova York)."
    },
    {
      "name": "Villa Block 62",
      "wealthLevel": "Pobre",
      "safety": 41,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Nova York)."
    },
    {
      "name": "South End 15",
      "wealthLevel": "Pobre",
      "safety": 20,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Nova York)."
    },
    {
      "name": "South Norte",
      "wealthLevel": "Pobre",
      "safety": 27,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Nova York)."
    },
    {
      "name": "East da Ponte",
      "wealthLevel": "Pobre",
      "safety": 19,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Nova York)."
    },
    {
      "name": "South Perdido",
      "wealthLevel": "Pobre",
      "safety": 15,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Nova York)."
    },
    {
      "name": "South Side 31",
      "wealthLevel": "Pobre",
      "safety": 39,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Nova York)."
    },
    {
      "name": "Favela do Fim",
      "wealthLevel": "Pobre",
      "safety": 42,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Nova York)."
    },
    {
      "name": "Outer Side",
      "wealthLevel": "Pobre",
      "safety": 49,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Nova York)."
    },
    {
      "name": "Cova Oeste",
      "wealthLevel": "Pobre",
      "safety": 54,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Nova York)."
    },
    {
      "name": "Morro Perdido 2",
      "wealthLevel": "Pobre",
      "safety": 45,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Nova York)."
    },
    {
      "name": "South Sul",
      "wealthLevel": "Pobre",
      "safety": 19,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Nova York)."
    },
    {
      "name": "Favela Norte",
      "wealthLevel": "Pobre",
      "safety": 16,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Nova York)."
    },
    {
      "name": "Complexo End",
      "wealthLevel": "Pobre",
      "safety": 24,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Nova York)."
    },
    {
      "name": "Baixada Block",
      "wealthLevel": "Pobre",
      "safety": 46,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Nova York)."
    },
    {
      "name": "Favela Side",
      "wealthLevel": "Pobre",
      "safety": 52,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Nova York)."
    }
  ],
  "Tóquio": [
    {
      "name": "Jardim do Sol 95",
      "wealthLevel": "Rica",
      "safety": 86,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Tóquio)."
    },
    {
      "name": "Minato Imperial",
      "wealthLevel": "Rica",
      "safety": 94,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Tóquio)."
    },
    {
      "name": "Minato Imperial",
      "wealthLevel": "Rica",
      "safety": 85,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Tóquio)."
    },
    {
      "name": "Alto de Park",
      "wealthLevel": "Rica",
      "safety": 98,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Tóquio)."
    },
    {
      "name": "Dahlem Chic",
      "wealthLevel": "Rica",
      "safety": 95,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Tóquio)."
    },
    {
      "name": "Dahlem das Acácias",
      "wealthLevel": "Rica",
      "safety": 94,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Tóquio)."
    },
    {
      "name": "Kensington Chic",
      "wealthLevel": "Rica",
      "safety": 94,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Tóquio)."
    },
    {
      "name": "Minato Park",
      "wealthLevel": "Rica",
      "safety": 87,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Tóquio)."
    },
    {
      "name": "Upper Gardens",
      "wealthLevel": "Rica",
      "safety": 96,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Tóquio)."
    },
    {
      "name": "Kensington do Sol",
      "wealthLevel": "Rica",
      "safety": 98,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Tóquio)."
    },
    {
      "name": "Restelo Park",
      "wealthLevel": "Rica",
      "safety": 87,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Tóquio)."
    },
    {
      "name": "Upper Park",
      "wealthLevel": "Rica",
      "safety": 93,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Tóquio)."
    },
    {
      "name": "Minato do Sol",
      "wealthLevel": "Rica",
      "safety": 97,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Tóquio)."
    },
    {
      "name": "Restelo View",
      "wealthLevel": "Rica",
      "safety": 95,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Tóquio)."
    },
    {
      "name": "Jardim Prestige",
      "wealthLevel": "Rica",
      "safety": 96,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Tóquio)."
    },
    {
      "name": "Restelo do Sol",
      "wealthLevel": "Rica",
      "safety": 98,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Tóquio)."
    },
    {
      "name": "Centro Square",
      "wealthLevel": "Média",
      "safety": 82,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Tóquio)."
    },
    {
      "name": "East do Comércio 42",
      "wealthLevel": "Média",
      "safety": 62,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Tóquio)."
    },
    {
      "name": "Palermo Square",
      "wealthLevel": "Média",
      "safety": 69,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Tóquio)."
    },
    {
      "name": "Mitte Norte",
      "wealthLevel": "Média",
      "safety": 56,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Tóquio)."
    },
    {
      "name": "Bairro do Comércio 57",
      "wealthLevel": "Média",
      "safety": 80,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Tóquio)."
    },
    {
      "name": "Campo de Central",
      "wealthLevel": "Média",
      "safety": 59,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Tóquio)."
    },
    {
      "name": "North Velho",
      "wealthLevel": "Média",
      "safety": 83,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Tóquio)."
    },
    {
      "name": "Palermo Novo",
      "wealthLevel": "Média",
      "safety": 73,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Tóquio)."
    },
    {
      "name": "Campo de do Comércio",
      "wealthLevel": "Média",
      "safety": 82,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Tóquio)."
    },
    {
      "name": "Palermo Square",
      "wealthLevel": "Média",
      "safety": 81,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Tóquio)."
    },
    {
      "name": "Vila Village",
      "wealthLevel": "Média",
      "safety": 67,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Tóquio)."
    },
    {
      "name": "Bairro Kiez",
      "wealthLevel": "Média",
      "safety": 84,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Tóquio)."
    },
    {
      "name": "Mitte Central",
      "wealthLevel": "Média",
      "safety": 77,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Tóquio)."
    },
    {
      "name": "Mitte Velho 60",
      "wealthLevel": "Média",
      "safety": 65,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Tóquio)."
    },
    {
      "name": "Vila Norte",
      "wealthLevel": "Média",
      "safety": 55,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Tóquio)."
    },
    {
      "name": "Bairro do Comércio",
      "wealthLevel": "Média",
      "safety": 58,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Tóquio)."
    },
    {
      "name": "Campo de Novo",
      "wealthLevel": "Média",
      "safety": 76,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Tóquio)."
    },
    {
      "name": "South Side",
      "wealthLevel": "Pobre",
      "safety": 45,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Tóquio)."
    },
    {
      "name": "East Block 44",
      "wealthLevel": "Pobre",
      "safety": 39,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Tóquio)."
    },
    {
      "name": "Kiez Norte",
      "wealthLevel": "Pobre",
      "safety": 25,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Tóquio)."
    },
    {
      "name": "Morro Sul 83",
      "wealthLevel": "Pobre",
      "safety": 42,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Tóquio)."
    },
    {
      "name": "Cova Ghetto 67",
      "wealthLevel": "Pobre",
      "safety": 16,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Tóquio)."
    },
    {
      "name": "Complexo Side",
      "wealthLevel": "Pobre",
      "safety": 40,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Tóquio)."
    },
    {
      "name": "Baixada Oeste",
      "wealthLevel": "Pobre",
      "safety": 43,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Tóquio)."
    },
    {
      "name": "Outer Block 50",
      "wealthLevel": "Pobre",
      "safety": 32,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Tóquio)."
    },
    {
      "name": "Kiez Norte",
      "wealthLevel": "Pobre",
      "safety": 14,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Tóquio)."
    },
    {
      "name": "Cova Ghetto 48",
      "wealthLevel": "Pobre",
      "safety": 44,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Tóquio)."
    },
    {
      "name": "Cova do Fim",
      "wealthLevel": "Pobre",
      "safety": 14,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Tóquio)."
    },
    {
      "name": "South Norte",
      "wealthLevel": "Pobre",
      "safety": 35,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Tóquio)."
    },
    {
      "name": "South Sul 68",
      "wealthLevel": "Pobre",
      "safety": 49,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Tóquio)."
    },
    {
      "name": "Complexo do Fim 23",
      "wealthLevel": "Pobre",
      "safety": 27,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Tóquio)."
    },
    {
      "name": "East Norte",
      "wealthLevel": "Pobre",
      "safety": 24,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Tóquio)."
    },
    {
      "name": "Favela Perdido",
      "wealthLevel": "Pobre",
      "safety": 14,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Tóquio)."
    },
    {
      "name": "Cova do Fim",
      "wealthLevel": "Pobre",
      "safety": 53,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Tóquio)."
    },
    {
      "name": "East do Fim 77",
      "wealthLevel": "Pobre",
      "safety": 17,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Tóquio)."
    },
    {
      "name": "Favela da Ponte 28",
      "wealthLevel": "Pobre",
      "safety": 33,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Tóquio)."
    },
    {
      "name": "Kiez Perdido",
      "wealthLevel": "Pobre",
      "safety": 17,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Tóquio)."
    },
    {
      "name": "Morro Norte",
      "wealthLevel": "Pobre",
      "safety": 11,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Tóquio)."
    },
    {
      "name": "Favela Side",
      "wealthLevel": "Pobre",
      "safety": 52,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Tóquio)."
    }
  ],
  "Londres": [
    {
      "name": "Reserva Heights",
      "wealthLevel": "Rica",
      "safety": 94,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Londres)."
    },
    {
      "name": "7ème Hills",
      "wealthLevel": "Rica",
      "safety": 88,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Londres)."
    },
    {
      "name": "Kensington Chic",
      "wealthLevel": "Rica",
      "safety": 90,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Londres)."
    },
    {
      "name": "Vila Plaza",
      "wealthLevel": "Rica",
      "safety": 87,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Londres)."
    },
    {
      "name": "Vila View",
      "wealthLevel": "Rica",
      "safety": 97,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Londres)."
    },
    {
      "name": "Porto Plaza",
      "wealthLevel": "Rica",
      "safety": 93,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Londres)."
    },
    {
      "name": "Dahlem Plaza",
      "wealthLevel": "Rica",
      "safety": 85,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Londres)."
    },
    {
      "name": "Alto de das Acácias",
      "wealthLevel": "Rica",
      "safety": 95,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Londres)."
    },
    {
      "name": "7ème Park",
      "wealthLevel": "Rica",
      "safety": 97,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Londres)."
    },
    {
      "name": "Recoleta Chic 45",
      "wealthLevel": "Rica",
      "safety": 90,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Londres)."
    },
    {
      "name": "Upper Plaza",
      "wealthLevel": "Rica",
      "safety": 100,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Londres)."
    },
    {
      "name": "Alto de View",
      "wealthLevel": "Rica",
      "safety": 85,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Londres)."
    },
    {
      "name": "Reserva Park",
      "wealthLevel": "Rica",
      "safety": 89,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Londres)."
    },
    {
      "name": "7ème Heights",
      "wealthLevel": "Rica",
      "safety": 97,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Londres)."
    },
    {
      "name": "Reserva do Sol",
      "wealthLevel": "Rica",
      "safety": 89,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Londres)."
    },
    {
      "name": "Porto Park",
      "wealthLevel": "Rica",
      "safety": 96,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Londres)."
    },
    {
      "name": "Porto Heights",
      "wealthLevel": "Rica",
      "safety": 87,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Londres)."
    },
    {
      "name": "Recoleta Plaza 84",
      "wealthLevel": "Rica",
      "safety": 98,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Londres)."
    },
    {
      "name": "Jardim Park 40",
      "wealthLevel": "Rica",
      "safety": 86,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Londres)."
    },
    {
      "name": "Alto de Prestige",
      "wealthLevel": "Rica",
      "safety": 88,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Londres)."
    },
    {
      "name": "Bairro Square",
      "wealthLevel": "Média",
      "safety": 70,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Londres)."
    },
    {
      "name": "Palermo Central",
      "wealthLevel": "Média",
      "safety": 63,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Londres)."
    },
    {
      "name": "North Kiez 79",
      "wealthLevel": "Média",
      "safety": 66,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Londres)."
    },
    {
      "name": "Campo de Velho",
      "wealthLevel": "Média",
      "safety": 72,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Londres)."
    },
    {
      "name": "West Novo",
      "wealthLevel": "Média",
      "safety": 55,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Londres)."
    },
    {
      "name": "Bairro Central",
      "wealthLevel": "Média",
      "safety": 58,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Londres)."
    },
    {
      "name": "West Heights",
      "wealthLevel": "Média",
      "safety": 82,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Londres)."
    },
    {
      "name": "Mitte Novo",
      "wealthLevel": "Média",
      "safety": 73,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Londres)."
    },
    {
      "name": "Bairro Norte",
      "wealthLevel": "Média",
      "safety": 67,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Londres)."
    },
    {
      "name": "Centro Norte 46",
      "wealthLevel": "Média",
      "safety": 82,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Londres)."
    },
    {
      "name": "Campo de do Comércio",
      "wealthLevel": "Média",
      "safety": 71,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Londres)."
    },
    {
      "name": "West Central",
      "wealthLevel": "Média",
      "safety": 72,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Londres)."
    },
    {
      "name": "Palermo Novo 52",
      "wealthLevel": "Média",
      "safety": 66,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Londres)."
    },
    {
      "name": "Mid Central",
      "wealthLevel": "Média",
      "safety": 60,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Londres)."
    },
    {
      "name": "Mitte Novo",
      "wealthLevel": "Média",
      "safety": 76,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Londres)."
    },
    {
      "name": "North Village",
      "wealthLevel": "Média",
      "safety": 63,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Londres)."
    },
    {
      "name": "Bairro Novo",
      "wealthLevel": "Média",
      "safety": 76,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Londres)."
    },
    {
      "name": "Mid Kiez 50",
      "wealthLevel": "Média",
      "safety": 65,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Londres)."
    },
    {
      "name": "North Square",
      "wealthLevel": "Média",
      "safety": 60,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Londres)."
    },
    {
      "name": "Vila Velho",
      "wealthLevel": "Média",
      "safety": 65,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Londres)."
    },
    {
      "name": "North Norte",
      "wealthLevel": "Média",
      "safety": 77,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Londres)."
    },
    {
      "name": "Morro Oeste",
      "wealthLevel": "Pobre",
      "safety": 29,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Londres)."
    },
    {
      "name": "Cova Sul",
      "wealthLevel": "Pobre",
      "safety": 37,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Londres)."
    },
    {
      "name": "Villa Oeste",
      "wealthLevel": "Pobre",
      "safety": 31,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Londres)."
    },
    {
      "name": "South End 78",
      "wealthLevel": "Pobre",
      "safety": 11,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Londres)."
    },
    {
      "name": "Complexo End",
      "wealthLevel": "Pobre",
      "safety": 29,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Londres)."
    },
    {
      "name": "Complexo Side",
      "wealthLevel": "Pobre",
      "safety": 11,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Londres)."
    },
    {
      "name": "Outer Ghetto",
      "wealthLevel": "Pobre",
      "safety": 40,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Londres)."
    },
    {
      "name": "Kiez End",
      "wealthLevel": "Pobre",
      "safety": 46,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Londres)."
    },
    {
      "name": "East da Ponte",
      "wealthLevel": "Pobre",
      "safety": 36,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Londres)."
    },
    {
      "name": "East Oeste",
      "wealthLevel": "Pobre",
      "safety": 44,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Londres)."
    },
    {
      "name": "Villa Ghetto",
      "wealthLevel": "Pobre",
      "safety": 40,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Londres)."
    },
    {
      "name": "Outer End",
      "wealthLevel": "Pobre",
      "safety": 25,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Londres)."
    },
    {
      "name": "Outer Oeste 9",
      "wealthLevel": "Pobre",
      "safety": 21,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Londres)."
    },
    {
      "name": "Complexo Oeste 6",
      "wealthLevel": "Pobre",
      "safety": 15,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Londres)."
    },
    {
      "name": "South da Ponte 56",
      "wealthLevel": "Pobre",
      "safety": 20,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Londres)."
    },
    {
      "name": "Cova Sul",
      "wealthLevel": "Pobre",
      "safety": 50,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Londres)."
    },
    {
      "name": "Morro do Fim",
      "wealthLevel": "Pobre",
      "safety": 43,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Londres)."
    },
    {
      "name": "Complexo Perdido",
      "wealthLevel": "Pobre",
      "safety": 17,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Londres)."
    },
    {
      "name": "Morro Sul 32",
      "wealthLevel": "Pobre",
      "safety": 52,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Londres)."
    },
    {
      "name": "Kiez Norte",
      "wealthLevel": "Pobre",
      "safety": 14,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Londres)."
    },
    {
      "name": "Morro Perdido",
      "wealthLevel": "Pobre",
      "safety": 36,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Londres)."
    },
    {
      "name": "Morro Ghetto",
      "wealthLevel": "Pobre",
      "safety": 44,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Londres)."
    },
    {
      "name": "East Ghetto",
      "wealthLevel": "Pobre",
      "safety": 54,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Londres)."
    },
    {
      "name": "Outer Side",
      "wealthLevel": "Pobre",
      "safety": 39,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Londres)."
    },
    {
      "name": "Favela End",
      "wealthLevel": "Pobre",
      "safety": 27,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Londres)."
    },
    {
      "name": "Favela Norte",
      "wealthLevel": "Pobre",
      "safety": 21,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Londres)."
    }
  ],
  "Paris": [
    {
      "name": "Upper Chic 63",
      "wealthLevel": "Rica",
      "safety": 96,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Paris)."
    },
    {
      "name": "Reserva Imperial 33",
      "wealthLevel": "Rica",
      "safety": 88,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Paris)."
    },
    {
      "name": "7ème View",
      "wealthLevel": "Rica",
      "safety": 91,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Paris)."
    },
    {
      "name": "Kensington Heights",
      "wealthLevel": "Rica",
      "safety": 90,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Paris)."
    },
    {
      "name": "Dahlem Plaza 65",
      "wealthLevel": "Rica",
      "safety": 91,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Paris)."
    },
    {
      "name": "Upper Plaza 16",
      "wealthLevel": "Rica",
      "safety": 90,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Paris)."
    },
    {
      "name": "Restelo Gardens",
      "wealthLevel": "Rica",
      "safety": 89,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Paris)."
    },
    {
      "name": "Upper Park 41",
      "wealthLevel": "Rica",
      "safety": 96,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Paris)."
    },
    {
      "name": "Kensington Park",
      "wealthLevel": "Rica",
      "safety": 99,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Paris)."
    },
    {
      "name": "Recoleta Imperial",
      "wealthLevel": "Rica",
      "safety": 96,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Paris)."
    },
    {
      "name": "Reserva Heights",
      "wealthLevel": "Rica",
      "safety": 85,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Paris)."
    },
    {
      "name": "Reserva Hills 40",
      "wealthLevel": "Rica",
      "safety": 86,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Paris)."
    },
    {
      "name": "Minato das Acácias 89",
      "wealthLevel": "Rica",
      "safety": 99,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Paris)."
    },
    {
      "name": "Vila Plaza",
      "wealthLevel": "Rica",
      "safety": 96,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Paris)."
    },
    {
      "name": "Minato Gardens 92",
      "wealthLevel": "Rica",
      "safety": 95,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Paris)."
    },
    {
      "name": "Vila Hills",
      "wealthLevel": "Rica",
      "safety": 99,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Paris)."
    },
    {
      "name": "Dahlem Imperial",
      "wealthLevel": "Rica",
      "safety": 91,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Paris)."
    },
    {
      "name": "Campo de Kiez 30",
      "wealthLevel": "Média",
      "safety": 60,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Paris)."
    },
    {
      "name": "Palermo Square",
      "wealthLevel": "Média",
      "safety": 78,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Paris)."
    },
    {
      "name": "Mid Square",
      "wealthLevel": "Média",
      "safety": 63,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Paris)."
    },
    {
      "name": "Vila Heights 68",
      "wealthLevel": "Média",
      "safety": 65,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Paris)."
    },
    {
      "name": "North Square",
      "wealthLevel": "Média",
      "safety": 73,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Paris)."
    },
    {
      "name": "East Sul",
      "wealthLevel": "Média",
      "safety": 61,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Paris)."
    },
    {
      "name": "North Heights",
      "wealthLevel": "Média",
      "safety": 65,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Paris)."
    },
    {
      "name": "West Velho",
      "wealthLevel": "Média",
      "safety": 79,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Paris)."
    },
    {
      "name": "Mitte Village",
      "wealthLevel": "Média",
      "safety": 68,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Paris)."
    },
    {
      "name": "Mid Novo",
      "wealthLevel": "Média",
      "safety": 67,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Paris)."
    },
    {
      "name": "Mitte Central",
      "wealthLevel": "Média",
      "safety": 61,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Paris)."
    },
    {
      "name": "Mitte Sul",
      "wealthLevel": "Média",
      "safety": 60,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Paris)."
    },
    {
      "name": "East Village",
      "wealthLevel": "Média",
      "safety": 67,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Paris)."
    },
    {
      "name": "East Norte 42",
      "wealthLevel": "Média",
      "safety": 60,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Paris)."
    },
    {
      "name": "Palermo Novo",
      "wealthLevel": "Média",
      "safety": 58,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Paris)."
    },
    {
      "name": "Mid do Comércio",
      "wealthLevel": "Média",
      "safety": 76,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Paris)."
    },
    {
      "name": "Centro Square",
      "wealthLevel": "Média",
      "safety": 77,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Paris)."
    },
    {
      "name": "Cova Side",
      "wealthLevel": "Pobre",
      "safety": 22,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Paris)."
    },
    {
      "name": "Complexo Ghetto",
      "wealthLevel": "Pobre",
      "safety": 48,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Paris)."
    },
    {
      "name": "Villa do Fim 65",
      "wealthLevel": "Pobre",
      "safety": 49,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Paris)."
    },
    {
      "name": "Morro Sul 41",
      "wealthLevel": "Pobre",
      "safety": 16,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Paris)."
    },
    {
      "name": "Complexo Norte",
      "wealthLevel": "Pobre",
      "safety": 14,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Paris)."
    },
    {
      "name": "South da Ponte 95",
      "wealthLevel": "Pobre",
      "safety": 47,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Paris)."
    },
    {
      "name": "Complexo Side",
      "wealthLevel": "Pobre",
      "safety": 21,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Paris)."
    },
    {
      "name": "Complexo Oeste",
      "wealthLevel": "Pobre",
      "safety": 35,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Paris)."
    },
    {
      "name": "Villa Sul",
      "wealthLevel": "Pobre",
      "safety": 21,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Paris)."
    },
    {
      "name": "Kiez Side",
      "wealthLevel": "Pobre",
      "safety": 52,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Paris)."
    },
    {
      "name": "Kiez Block",
      "wealthLevel": "Pobre",
      "safety": 44,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Paris)."
    },
    {
      "name": "South End",
      "wealthLevel": "Pobre",
      "safety": 27,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Paris)."
    },
    {
      "name": "Cova do Fim",
      "wealthLevel": "Pobre",
      "safety": 34,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Paris)."
    },
    {
      "name": "Cova Side",
      "wealthLevel": "Pobre",
      "safety": 46,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Paris)."
    },
    {
      "name": "Cova Oeste",
      "wealthLevel": "Pobre",
      "safety": 47,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Paris)."
    },
    {
      "name": "Kiez Ghetto",
      "wealthLevel": "Pobre",
      "safety": 54,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Paris)."
    }
  ],
  "Berlim": [
    {
      "name": "Recoleta Park",
      "wealthLevel": "Rica",
      "safety": 88,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Berlim)."
    },
    {
      "name": "Kensington Prestige",
      "wealthLevel": "Rica",
      "safety": 85,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Berlim)."
    },
    {
      "name": "Restelo Imperial",
      "wealthLevel": "Rica",
      "safety": 89,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Berlim)."
    },
    {
      "name": "Reserva Gardens",
      "wealthLevel": "Rica",
      "safety": 88,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Berlim)."
    },
    {
      "name": "Minato das Acácias",
      "wealthLevel": "Rica",
      "safety": 87,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Berlim)."
    },
    {
      "name": "Upper Park",
      "wealthLevel": "Rica",
      "safety": 95,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Berlim)."
    },
    {
      "name": "Alto de Plaza",
      "wealthLevel": "Rica",
      "safety": 87,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Berlim)."
    },
    {
      "name": "Reserva Heights",
      "wealthLevel": "Rica",
      "safety": 96,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Berlim)."
    },
    {
      "name": "Restelo Gardens",
      "wealthLevel": "Rica",
      "safety": 94,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Berlim)."
    },
    {
      "name": "Recoleta das Acácias 66",
      "wealthLevel": "Rica",
      "safety": 85,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Berlim)."
    },
    {
      "name": "Restelo do Sol 34",
      "wealthLevel": "Rica",
      "safety": 93,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Berlim)."
    },
    {
      "name": "Reserva Imperial",
      "wealthLevel": "Rica",
      "safety": 94,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Berlim)."
    },
    {
      "name": "Reserva Park",
      "wealthLevel": "Rica",
      "safety": 93,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Berlim)."
    },
    {
      "name": "Recoleta View",
      "wealthLevel": "Rica",
      "safety": 93,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Berlim)."
    },
    {
      "name": "Vila Prestige",
      "wealthLevel": "Rica",
      "safety": 88,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Berlim)."
    },
    {
      "name": "Recoleta Gardens 58",
      "wealthLevel": "Rica",
      "safety": 100,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Berlim)."
    },
    {
      "name": "Alto de Plaza",
      "wealthLevel": "Rica",
      "safety": 90,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Berlim)."
    },
    {
      "name": "Dahlem do Sol",
      "wealthLevel": "Rica",
      "safety": 94,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Berlim)."
    },
    {
      "name": "Upper Park 18",
      "wealthLevel": "Rica",
      "safety": 86,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Berlim)."
    },
    {
      "name": "Kensington Imperial",
      "wealthLevel": "Rica",
      "safety": 88,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Berlim)."
    },
    {
      "name": "Centro Village",
      "wealthLevel": "Média",
      "safety": 57,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Berlim)."
    },
    {
      "name": "Campo de Novo",
      "wealthLevel": "Média",
      "safety": 83,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Berlim)."
    },
    {
      "name": "Palermo Heights",
      "wealthLevel": "Média",
      "safety": 70,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Berlim)."
    },
    {
      "name": "Centro Central",
      "wealthLevel": "Média",
      "safety": 74,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Berlim)."
    },
    {
      "name": "Mitte Velho",
      "wealthLevel": "Média",
      "safety": 70,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Berlim)."
    },
    {
      "name": "North Sul",
      "wealthLevel": "Média",
      "safety": 60,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Berlim)."
    },
    {
      "name": "Mid Velho",
      "wealthLevel": "Média",
      "safety": 67,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Berlim)."
    },
    {
      "name": "East Central",
      "wealthLevel": "Média",
      "safety": 82,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Berlim)."
    },
    {
      "name": "Mid Heights",
      "wealthLevel": "Média",
      "safety": 78,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Berlim)."
    },
    {
      "name": "Palermo Kiez 5",
      "wealthLevel": "Média",
      "safety": 75,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Berlim)."
    },
    {
      "name": "Mitte Velho 29",
      "wealthLevel": "Média",
      "safety": 79,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Berlim)."
    },
    {
      "name": "East Norte 68",
      "wealthLevel": "Média",
      "safety": 65,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Berlim)."
    },
    {
      "name": "Villa End",
      "wealthLevel": "Pobre",
      "safety": 29,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Berlim)."
    },
    {
      "name": "Outer da Ponte",
      "wealthLevel": "Pobre",
      "safety": 10,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Berlim)."
    },
    {
      "name": "Baixada Oeste",
      "wealthLevel": "Pobre",
      "safety": 11,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Berlim)."
    },
    {
      "name": "Outer Side",
      "wealthLevel": "Pobre",
      "safety": 42,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Berlim)."
    },
    {
      "name": "Morro do Fim",
      "wealthLevel": "Pobre",
      "safety": 18,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Berlim)."
    },
    {
      "name": "Complexo Oeste",
      "wealthLevel": "Pobre",
      "safety": 43,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Berlim)."
    },
    {
      "name": "Morro Sul",
      "wealthLevel": "Pobre",
      "safety": 11,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Berlim)."
    },
    {
      "name": "Baixada do Fim",
      "wealthLevel": "Pobre",
      "safety": 15,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Berlim)."
    },
    {
      "name": "Morro Sul",
      "wealthLevel": "Pobre",
      "safety": 50,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Berlim)."
    },
    {
      "name": "Morro Oeste",
      "wealthLevel": "Pobre",
      "safety": 49,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Berlim)."
    },
    {
      "name": "East Sul 44",
      "wealthLevel": "Pobre",
      "safety": 14,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Berlim)."
    },
    {
      "name": "Baixada Ghetto",
      "wealthLevel": "Pobre",
      "safety": 43,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Berlim)."
    },
    {
      "name": "Baixada End",
      "wealthLevel": "Pobre",
      "safety": 24,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Berlim)."
    },
    {
      "name": "Villa End",
      "wealthLevel": "Pobre",
      "safety": 46,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Berlim)."
    },
    {
      "name": "Baixada Side",
      "wealthLevel": "Pobre",
      "safety": 28,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Berlim)."
    }
  ],
  "Lisboa": [
    {
      "name": "Reserva Plaza",
      "wealthLevel": "Rica",
      "safety": 93,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Lisboa)."
    },
    {
      "name": "Minato Imperial 20",
      "wealthLevel": "Rica",
      "safety": 100,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Lisboa)."
    },
    {
      "name": "Porto Imperial 37",
      "wealthLevel": "Rica",
      "safety": 95,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Lisboa)."
    },
    {
      "name": "Vila Park",
      "wealthLevel": "Rica",
      "safety": 92,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Lisboa)."
    },
    {
      "name": "Vila View 73",
      "wealthLevel": "Rica",
      "safety": 93,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Lisboa)."
    },
    {
      "name": "Reserva Prestige",
      "wealthLevel": "Rica",
      "safety": 92,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Lisboa)."
    },
    {
      "name": "Alto de Plaza",
      "wealthLevel": "Rica",
      "safety": 85,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Lisboa)."
    },
    {
      "name": "Jardim Imperial",
      "wealthLevel": "Rica",
      "safety": 97,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Lisboa)."
    },
    {
      "name": "Minato Park 36",
      "wealthLevel": "Rica",
      "safety": 93,
      "description": "Região tranquila e arborizada, com as melhores escolas e hospitais da cidade. (em Lisboa)."
    },
    {
      "name": "Minato Gardens 71",
      "wealthLevel": "Rica",
      "safety": 92,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Lisboa)."
    },
    {
      "name": "Jardim Gardens",
      "wealthLevel": "Rica",
      "safety": 94,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Lisboa)."
    },
    {
      "name": "Porto Plaza",
      "wealthLevel": "Rica",
      "safety": 91,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Lisboa)."
    },
    {
      "name": "Minato do Sol",
      "wealthLevel": "Rica",
      "safety": 95,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Lisboa)."
    },
    {
      "name": "Recoleta Heights",
      "wealthLevel": "Rica",
      "safety": 91,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Lisboa)."
    },
    {
      "name": "Porto Park",
      "wealthLevel": "Rica",
      "safety": 99,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Lisboa)."
    },
    {
      "name": "Restelo Chic",
      "wealthLevel": "Rica",
      "safety": 95,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Lisboa)."
    },
    {
      "name": "Reserva Prestige",
      "wealthLevel": "Rica",
      "safety": 99,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Lisboa)."
    },
    {
      "name": "Alto de do Sol",
      "wealthLevel": "Rica",
      "safety": 95,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Lisboa)."
    },
    {
      "name": "Alto de das Acácias",
      "wealthLevel": "Rica",
      "safety": 86,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Lisboa)."
    },
    {
      "name": "Bairro Velho",
      "wealthLevel": "Média",
      "safety": 62,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Lisboa)."
    },
    {
      "name": "Vila Heights",
      "wealthLevel": "Média",
      "safety": 67,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Lisboa)."
    },
    {
      "name": "Campo de Village",
      "wealthLevel": "Média",
      "safety": 72,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Lisboa)."
    },
    {
      "name": "Campo de Velho",
      "wealthLevel": "Média",
      "safety": 60,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Lisboa)."
    },
    {
      "name": "Mitte Velho",
      "wealthLevel": "Média",
      "safety": 72,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Lisboa)."
    },
    {
      "name": "North Village 68",
      "wealthLevel": "Média",
      "safety": 74,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Lisboa)."
    },
    {
      "name": "Mid Heights",
      "wealthLevel": "Média",
      "safety": 73,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Lisboa)."
    },
    {
      "name": "Mid do Comércio 74",
      "wealthLevel": "Média",
      "safety": 84,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Lisboa)."
    },
    {
      "name": "Campo de Norte",
      "wealthLevel": "Média",
      "safety": 84,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Lisboa)."
    },
    {
      "name": "Palermo Velho",
      "wealthLevel": "Média",
      "safety": 83,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Lisboa)."
    },
    {
      "name": "Campo de Heights",
      "wealthLevel": "Média",
      "safety": 58,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Lisboa)."
    },
    {
      "name": "Centro do Comércio 57",
      "wealthLevel": "Média",
      "safety": 62,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Lisboa)."
    },
    {
      "name": "Vila Kiez",
      "wealthLevel": "Média",
      "safety": 84,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Lisboa)."
    },
    {
      "name": "Mid Velho",
      "wealthLevel": "Média",
      "safety": 84,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Lisboa)."
    },
    {
      "name": "Mid Velho",
      "wealthLevel": "Média",
      "safety": 82,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Lisboa)."
    },
    {
      "name": "North Novo",
      "wealthLevel": "Média",
      "safety": 77,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Lisboa)."
    },
    {
      "name": "Cova da Ponte 59",
      "wealthLevel": "Pobre",
      "safety": 34,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Lisboa)."
    },
    {
      "name": "Complexo Oeste",
      "wealthLevel": "Pobre",
      "safety": 37,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Lisboa)."
    },
    {
      "name": "Villa End",
      "wealthLevel": "Pobre",
      "safety": 31,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Lisboa)."
    },
    {
      "name": "Favela Block",
      "wealthLevel": "Pobre",
      "safety": 10,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Lisboa)."
    },
    {
      "name": "Favela End",
      "wealthLevel": "Pobre",
      "safety": 45,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Lisboa)."
    },
    {
      "name": "South do Fim",
      "wealthLevel": "Pobre",
      "safety": 23,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Lisboa)."
    },
    {
      "name": "South Norte",
      "wealthLevel": "Pobre",
      "safety": 39,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Lisboa)."
    },
    {
      "name": "East Block",
      "wealthLevel": "Pobre",
      "safety": 21,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Lisboa)."
    },
    {
      "name": "Baixada End",
      "wealthLevel": "Pobre",
      "safety": 53,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Lisboa)."
    },
    {
      "name": "Villa End",
      "wealthLevel": "Pobre",
      "safety": 49,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Lisboa)."
    },
    {
      "name": "South do Fim",
      "wealthLevel": "Pobre",
      "safety": 52,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Lisboa)."
    },
    {
      "name": "South Sul",
      "wealthLevel": "Pobre",
      "safety": 48,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Lisboa)."
    },
    {
      "name": "Kiez da Ponte 53",
      "wealthLevel": "Pobre",
      "safety": 52,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Lisboa)."
    },
    {
      "name": "Baixada Perdido",
      "wealthLevel": "Pobre",
      "safety": 51,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Lisboa)."
    },
    {
      "name": "South Ghetto",
      "wealthLevel": "Pobre",
      "safety": 49,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Lisboa)."
    },
    {
      "name": "Morro Side",
      "wealthLevel": "Pobre",
      "safety": 29,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Lisboa)."
    },
    {
      "name": "Cova Ghetto",
      "wealthLevel": "Pobre",
      "safety": 46,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Lisboa)."
    },
    {
      "name": "East da Ponte",
      "wealthLevel": "Pobre",
      "safety": 11,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Lisboa)."
    },
    {
      "name": "East Ghetto",
      "wealthLevel": "Pobre",
      "safety": 23,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Lisboa)."
    },
    {
      "name": "South Oeste 69",
      "wealthLevel": "Pobre",
      "safety": 44,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Lisboa)."
    },
    {
      "name": "Complexo Ghetto 94",
      "wealthLevel": "Pobre",
      "safety": 23,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Lisboa)."
    },
    {
      "name": "Complexo Oeste 70",
      "wealthLevel": "Pobre",
      "safety": 30,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Lisboa)."
    },
    {
      "name": "Morro Block 40",
      "wealthLevel": "Pobre",
      "safety": 34,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Lisboa)."
    },
    {
      "name": "Favela Side 90",
      "wealthLevel": "Pobre",
      "safety": 26,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Lisboa)."
    },
    {
      "name": "Cova Side",
      "wealthLevel": "Pobre",
      "safety": 26,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Lisboa)."
    },
    {
      "name": "Kiez End 19",
      "wealthLevel": "Pobre",
      "safety": 24,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Lisboa)."
    },
    {
      "name": "Villa Norte 91",
      "wealthLevel": "Pobre",
      "safety": 39,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Lisboa)."
    }
  ],
  "Buenos Aires": [
    {
      "name": "Alto de Imperial",
      "wealthLevel": "Rica",
      "safety": 92,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Buenos Aires)."
    },
    {
      "name": "Upper das Acácias",
      "wealthLevel": "Rica",
      "safety": 96,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Buenos Aires)."
    },
    {
      "name": "Vila do Sol",
      "wealthLevel": "Rica",
      "safety": 94,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Buenos Aires)."
    },
    {
      "name": "Porto das Acácias",
      "wealthLevel": "Rica",
      "safety": 96,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Buenos Aires)."
    },
    {
      "name": "Jardim Chic 3",
      "wealthLevel": "Rica",
      "safety": 99,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Buenos Aires)."
    },
    {
      "name": "Dahlem Gardens 11",
      "wealthLevel": "Rica",
      "safety": 85,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Buenos Aires)."
    },
    {
      "name": "Jardim Imperial",
      "wealthLevel": "Rica",
      "safety": 88,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Buenos Aires)."
    },
    {
      "name": "Alto de Heights",
      "wealthLevel": "Rica",
      "safety": 89,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Buenos Aires)."
    },
    {
      "name": "Minato Prestige",
      "wealthLevel": "Rica",
      "safety": 85,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Buenos Aires)."
    },
    {
      "name": "7ème Plaza",
      "wealthLevel": "Rica",
      "safety": 98,
      "description": "Conhecido por suas lojas de grife, restaurantes estrelados e vida noturna sofisticada. (em Buenos Aires)."
    },
    {
      "name": "7ème do Sol 45",
      "wealthLevel": "Rica",
      "safety": 99,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Buenos Aires)."
    },
    {
      "name": "Porto Plaza 20",
      "wealthLevel": "Rica",
      "safety": 92,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Buenos Aires)."
    },
    {
      "name": "Restelo Plaza",
      "wealthLevel": "Rica",
      "safety": 94,
      "description": "Bairro nobre com arquitetura de luxo e segurança privada. (em Buenos Aires)."
    },
    {
      "name": "Jardim Plaza 15",
      "wealthLevel": "Rica",
      "safety": 94,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Buenos Aires)."
    },
    {
      "name": "Alto de Heights",
      "wealthLevel": "Rica",
      "safety": 93,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Buenos Aires)."
    },
    {
      "name": "Minato Prestige",
      "wealthLevel": "Rica",
      "safety": 99,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Buenos Aires)."
    },
    {
      "name": "Restelo Plaza",
      "wealthLevel": "Rica",
      "safety": 89,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Buenos Aires)."
    },
    {
      "name": "Vila Plaza",
      "wealthLevel": "Rica",
      "safety": 90,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Buenos Aires)."
    },
    {
      "name": "Dahlem Gardens",
      "wealthLevel": "Rica",
      "safety": 86,
      "description": "Vistas panorâmicas, mansões históricas e acesso restrito. (em Buenos Aires)."
    },
    {
      "name": "7ème Imperial",
      "wealthLevel": "Rica",
      "safety": 92,
      "description": "Área residencial exclusiva, lar de embaixadas e celebridades. (em Buenos Aires)."
    },
    {
      "name": "Campo de Square",
      "wealthLevel": "Média",
      "safety": 68,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Buenos Aires)."
    },
    {
      "name": "West Kiez",
      "wealthLevel": "Média",
      "safety": 60,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Buenos Aires)."
    },
    {
      "name": "Palermo Square",
      "wealthLevel": "Média",
      "safety": 74,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Buenos Aires)."
    },
    {
      "name": "Palermo Central",
      "wealthLevel": "Média",
      "safety": 80,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Buenos Aires)."
    },
    {
      "name": "Mitte do Comércio",
      "wealthLevel": "Média",
      "safety": 65,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Buenos Aires)."
    },
    {
      "name": "Campo de do Comércio",
      "wealthLevel": "Média",
      "safety": 77,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Buenos Aires)."
    },
    {
      "name": "Campo de Novo 35",
      "wealthLevel": "Média",
      "safety": 83,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Buenos Aires)."
    },
    {
      "name": "Centro Kiez 85",
      "wealthLevel": "Média",
      "safety": 81,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Buenos Aires)."
    },
    {
      "name": "Mid Sul 51",
      "wealthLevel": "Média",
      "safety": 73,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Buenos Aires)."
    },
    {
      "name": "Campo de Novo",
      "wealthLevel": "Média",
      "safety": 68,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Buenos Aires)."
    },
    {
      "name": "Centro Central",
      "wealthLevel": "Média",
      "safety": 63,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Buenos Aires)."
    },
    {
      "name": "Vila Sul",
      "wealthLevel": "Média",
      "safety": 58,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Buenos Aires)."
    },
    {
      "name": "West Heights",
      "wealthLevel": "Média",
      "safety": 83,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Buenos Aires)."
    },
    {
      "name": "Vila Norte 3",
      "wealthLevel": "Média",
      "safety": 58,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Buenos Aires)."
    },
    {
      "name": "North Kiez",
      "wealthLevel": "Média",
      "safety": 60,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Buenos Aires)."
    },
    {
      "name": "Palermo Central 71",
      "wealthLevel": "Média",
      "safety": 70,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Buenos Aires)."
    },
    {
      "name": "North Heights",
      "wealthLevel": "Média",
      "safety": 69,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Buenos Aires)."
    },
    {
      "name": "East Norte",
      "wealthLevel": "Média",
      "safety": 65,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Buenos Aires)."
    },
    {
      "name": "Bairro Square",
      "wealthLevel": "Média",
      "safety": 75,
      "description": "Bairro gentrificado, com mistura de moradores antigos e jovens profissionais. (em Buenos Aires)."
    },
    {
      "name": "Mitte Heights",
      "wealthLevel": "Média",
      "safety": 74,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Buenos Aires)."
    },
    {
      "name": "Mitte Square",
      "wealthLevel": "Média",
      "safety": 63,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Buenos Aires)."
    },
    {
      "name": "North Kiez 25",
      "wealthLevel": "Média",
      "safety": 64,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Buenos Aires)."
    },
    {
      "name": "Vila Heights",
      "wealthLevel": "Média",
      "safety": 64,
      "description": "Área residencial popular com bom comércio local e transporte público eficiente. (em Buenos Aires)."
    },
    {
      "name": "West Kiez",
      "wealthLevel": "Média",
      "safety": 66,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Buenos Aires)."
    },
    {
      "name": "West Village",
      "wealthLevel": "Média",
      "safety": 82,
      "description": "Vida noturna ativa, muitos bares e restaurantes acessíveis. (em Buenos Aires)."
    },
    {
      "name": "Mitte Novo",
      "wealthLevel": "Média",
      "safety": 80,
      "description": "Região familiar, com parques e escolas de qualidade média. (em Buenos Aires)."
    },
    {
      "name": "West Central",
      "wealthLevel": "Média",
      "safety": 76,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Buenos Aires)."
    },
    {
      "name": "Bairro Sul",
      "wealthLevel": "Média",
      "safety": 57,
      "description": "Centro de negócios e serviços, com apartamentos modernos. (em Buenos Aires)."
    },
    {
      "name": "Kiez Norte",
      "wealthLevel": "Pobre",
      "safety": 39,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Buenos Aires)."
    },
    {
      "name": "Favela Ghetto",
      "wealthLevel": "Pobre",
      "safety": 31,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Buenos Aires)."
    },
    {
      "name": "Complexo End",
      "wealthLevel": "Pobre",
      "safety": 28,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Buenos Aires)."
    },
    {
      "name": "Villa Oeste",
      "wealthLevel": "Pobre",
      "safety": 27,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Buenos Aires)."
    },
    {
      "name": "Morro Norte",
      "wealthLevel": "Pobre",
      "safety": 14,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Buenos Aires)."
    },
    {
      "name": "Cova Block 40",
      "wealthLevel": "Pobre",
      "safety": 23,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Buenos Aires)."
    },
    {
      "name": "Favela Block 51",
      "wealthLevel": "Pobre",
      "safety": 40,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Buenos Aires)."
    },
    {
      "name": "Kiez da Ponte",
      "wealthLevel": "Pobre",
      "safety": 27,
      "description": "Comunidade com alta densidade populacional e desafios sociais. (em Buenos Aires)."
    },
    {
      "name": "Villa Sul",
      "wealthLevel": "Pobre",
      "safety": 53,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Buenos Aires)."
    },
    {
      "name": "Baixada Perdido",
      "wealthLevel": "Pobre",
      "safety": 49,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Buenos Aires)."
    },
    {
      "name": "Complexo Sul",
      "wealthLevel": "Pobre",
      "safety": 47,
      "description": "Distrito industrial antigo, com poluição e problemas de saúde pública. (em Buenos Aires)."
    },
    {
      "name": "Outer Norte 48",
      "wealthLevel": "Pobre",
      "safety": 17,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Buenos Aires)."
    },
    {
      "name": "Kiez Sul",
      "wealthLevel": "Pobre",
      "safety": 41,
      "description": "Área com histórico de dificuldades econômicas e baixa segurança. (em Buenos Aires)."
    },
    {
      "name": "East Norte 7",
      "wealthLevel": "Pobre",
      "safety": 19,
      "description": "Moradias simples e precárias, com forte senso de comunidade. (em Buenos Aires)."
    },
    {
      "name": "South Side",
      "wealthLevel": "Pobre",
      "safety": 19,
      "description": "Região periférica, com pouca infraestrutura e alto índice de desemprego. (em Buenos Aires)."
    }
  ]
};

export const baseCityStructure = cityDatabase["Rio de Janeiro"]?.slice(0, 6).map((n, i) => ({
  ...n,
  position: { x: i % 3, y: Math.floor(i / 3) }
})) || [];

export function getCityNeighborhoods(city: string): CityNeighborhoodTemplate[] {
    return cityDatabase[city] || cityDatabase['Rio de Janeiro'];
}

