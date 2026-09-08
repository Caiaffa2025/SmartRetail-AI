export type RetailSector = 'supermarket' | 'wholesale' | 'pharmacy' | 'home_center' | 'electronics';

export interface ProductOffer {
  id: string;
  name: string;
  category: string;
  regularPrice: number;
  promoPrice: number;
  unit: string;
  badge: string;
  image: string;
  supplier: string;
  tradeFund: number;
  marginPercent: number;
  stockQty: number;
}

export interface TradeAgreement {
  id: string;
  supplier: string;
  logo: string;
  campaign: string;
  mediaType: 'Encarte Capa' | 'Ponta de Ilha' | 'Banner E-commerce' | 'WhatsApp Mídias';
  investmentValue: number;
  status: 'Aprovado' | 'Em Negociação' | 'Pendente Auditoria' | 'Finalizado';
  executionRate: number;
}

export interface SuccessCase {
  id: string;
  clientName: string;
  sector: string;
  storesCount: number;
  logo: string;
  resultMetric: string;
  resultDescription: string;
  testimonialText: string;
  authorName: string;
  authorRole: string;
}

export interface ErpIntegration {
  name: string;
  category: string;
  description: string;
  logo: string;
}

export type TabloidFormat = 'A4_PRINT' | 'INSTAGRAM_STORY' | 'WHATSAPP_CATALOG' | 'TV_INDOOR';
