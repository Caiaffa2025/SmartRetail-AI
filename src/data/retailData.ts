import { ProductOffer, TradeAgreement, SuccessCase, ErpIntegration } from '../types';

export const INITIAL_PRODUCTS: ProductOffer[] = [
  {
    id: 'p1',
    name: 'Arroz Tipo 1 Beneficiado 5kg',
    category: 'Mercearia Básica',
    regularPrice: 28.90,
    promoPrice: 21.90,
    unit: 'un',
    badge: 'OFERTA IMBATÍVEL',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80',
    supplier: 'Camil / Tio João',
    tradeFund: 3500,
    marginPercent: 14.5,
    stockQty: 12500
  },
  {
    id: 'p2',
    name: 'Cerveja Lager Especial 350ml (Pack 12)',
    category: 'Bebidas e Cervejas',
    regularPrice: 44.90,
    promoPrice: 35.90,
    unit: 'pack',
    badge: 'SUPER DESCONTO',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&auto=format&fit=crop&q=80',
    supplier: 'Ambev',
    tradeFund: 8200,
    marginPercent: 22.8,
    stockQty: 8400
  },
  {
    id: 'p3',
    name: 'Café Torrado e Moído Tradicional 500g',
    category: 'Matinal & Café',
    regularPrice: 19.90,
    promoPrice: 14.99,
    unit: 'un',
    badge: 'LEVE MAIS POR MENOS',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&auto=format&fit=crop&q=80',
    supplier: '3Corações',
    tradeFund: 4200,
    marginPercent: 18.2,
    stockQty: 6300
  },
  {
    id: 'p4',
    name: 'Contra Filé Bovino Resfriado Pedaço',
    category: 'Açougue e Carnes',
    regularPrice: 54.90,
    promoPrice: 39.90,
    unit: 'kg',
    badge: 'OFERTA DO FIM DE SEMANA',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&auto=format&fit=crop&q=80',
    supplier: 'JBS / Friboi',
    tradeFund: 12000,
    marginPercent: 19.5,
    stockQty: 3200
  },
  {
    id: 'p5',
    name: 'Detergente Líquido Concentrado 3 Litros',
    category: 'Limpeza Doméstica',
    regularPrice: 32.90,
    promoPrice: 24.90,
    unit: 'un',
    badge: 'CLUBE DE VANTAGENS',
    image: 'https://images.unsplash.com/photo-1585832770485-e68a5fcfad52?w=400&auto=format&fit=crop&q=80',
    supplier: 'Unilever / OMO',
    tradeFund: 5100,
    marginPercent: 26.4,
    stockQty: 4800
  },
  {
    id: 'p6',
    name: 'Azeite de Oliva Extra Virgem Português 500ml',
    category: 'Mercearia Fina',
    regularPrice: 42.90,
    promoPrice: 32.90,
    unit: 'un',
    badge: 'PREÇO EXCLUSIVO APP',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80',
    supplier: 'Gallo',
    tradeFund: 6000,
    marginPercent: 29.1,
    stockQty: 2900
  }
];

export const SAMPLE_TRADE_AGREEMENTS: TradeAgreement[] = [
  {
    id: 'ta-101',
    supplier: 'Ambev Indústria de Bebidas',
    logo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    campaign: 'Festival de Cervejas e Churrasco de Primavera',
    mediaType: 'Encarte Capa',
    investmentValue: 45000,
    status: 'Aprovado',
    executionRate: 98.4
  },
  {
    id: 'ta-102',
    supplier: 'Unilever Brasil LTDA',
    logo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    campaign: 'Mega Quinzena da Limpeza e Cuidados',
    mediaType: 'Ponta de Ilha',
    investmentValue: 32000,
    status: 'Aprovado',
    executionRate: 95.0
  },
  {
    id: 'ta-103',
    supplier: 'Nestlé Brasil Alimentos',
    logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    campaign: 'Especial Matinal & Volta às Aulas',
    mediaType: 'WhatsApp Mídias',
    investmentValue: 28500,
    status: 'Em Negociação',
    executionRate: 88.2
  },
  {
    id: 'ta-104',
    supplier: 'Procter & Gamble (P&G)',
    logo: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=120&auto=format&fit=crop&q=80',
    campaign: 'Sessão Higiene Pessoal e Beleza',
    mediaType: 'Banner E-commerce',
    investmentValue: 19000,
    status: 'Pendente Auditoria',
    executionRate: 76.5
  }
];

export const SUCCESS_CASES: SuccessCase[] = [
  {
    id: 'case-1',
    clientName: 'Rede Supermercados São Francisco',
    sector: 'Supermercados & Atacarejo',
    storesCount: 42,
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=80',
    resultMetric: '-85% no tempo de criação',
    resultDescription: 'Redução drástica do tempo de diagramação e envio de encartes promocionais com validação automática de ERP.',
    testimonialText: 'Com o SmartRetail AI, unificamos as negociações de trade marketing e a criação de tablóides digitais para nossas 42 lojas. O que levava 4 dias agora fazemos em apenas 30 minutos sem divergência de preço.',
    authorName: 'Ricardo Mendonça',
    authorRole: 'Diretor de Marketing e Trade'
  },
  {
    id: 'case-2',
    clientName: 'Grupo Varejo Nordeste',
    sector: 'Atacarejo e Hifervarejo',
    storesCount: 78,
    logo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=150&auto=format&fit=crop&q=80',
    resultMetric: '+R$ 14,2 Mi em verbas salvas',
    resultDescription: 'Auditoria de verbas de fornecedores e comprovação de execução no PDV com fotos via Trade App Control.',
    testimonialText: 'A rastreabilidade dos contratos de Trade Marketing nos permitiu recuperar milhões em verbas de cooperação que ficavam esquecidas. É uma ferramenta indispensável para o varejista moderno.',
    authorName: 'Aline Vasconcelos',
    authorRole: 'Gerente Comercial e Suprimentos'
  },
  {
    id: 'case-3',
    clientName: 'Rede Farma Popular',
    sector: 'Farmácias & Drogaria',
    storesCount: 115,
    logo: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=150&auto=format&fit=crop&q=80',
    resultMetric: 'Zero divergências de preço',
    resultDescription: 'Integração em tempo real entre cartazeamento impresso, encartes de oferta e precificação no PDV.',
    testimonialText: 'Eliminamos 100% das multas do Procon e insatisfações de clientes por divergência entre cartazes e o caixa. A automação nos trouxe segurança absoluta.',
    authorName: 'Carlos Eduardo Paiva',
    authorRole: 'COO e Diretor de Operações'
  }
];

export const ERP_INTEGRATIONS: ErpIntegration[] = [
  {
    name: 'TOTVS Consinco / RMS',
    category: 'ERP Varejo & Supermercados',
    description: 'Sincronização bidirecional instantânea de cadastros, preços, margens e estoque.',
    logo: '🏢'
  },
  {
    name: 'Linx Microvix / Degust',
    category: 'ERP Omnichannel',
    description: 'Atualização automática de ofertas e encartes para redes de lojas e e-commerce.',
    logo: '⚙️'
  },
  {
    name: 'Senior Sistemas',
    category: 'ERP Empresarial',
    description: 'Integração de regras comerciais, campanhas por filial e fluxo de compras.',
    logo: '📊'
  },
  {
    name: 'VR Software / SysPDV',
    category: 'ERP Automatizado',
    description: 'Envio direto das promoções aprovadas para as frentes de caixa em segundos.',
    logo: '🛒'
  },
  {
    name: 'SAP S/4HANA Retail',
    category: 'ERP Enterprise',
    description: 'Conectores homologados para grandes redes de varejo e atacarejos enterprise.',
    logo: '🌐'
  },
  {
    name: 'Bluesoft ERP',
    category: 'Cloud Retail System',
    description: 'Integração nativa de ofertas, trade marketing e encartes promocionais digitais.',
    logo: '☁️'
  }
];

export const PLATFORM_STATS = [
  { value: '+R$ 18 Bi', label: 'Em Ofertas e Campanhas Gerenciadas' },
  { value: '+450 Redes', label: 'De Varejo e Atacarejo Atendidas' },
  { value: '+12.000', label: 'Lojas Físicas com Encartes Conectados' },
  { value: '85% Menos', label: 'Tempo Operacional de Marketing' },
  { value: '100% Livre', label: 'De Erros de Precificação no PDV' }
];
