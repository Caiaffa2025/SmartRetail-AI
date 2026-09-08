import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  LayoutDashboard, TrendingUp, DollarSign, Award, ArrowUpRight, Search, 
  Bell, BellRing, Mail, Smartphone, Check, Plus, Trash2, Sliders, 
  ShieldAlert, AlertTriangle, Sparkles, CheckCircle2, X, Volume2, Send,
  Clock, AlertCircle, Zap, Shield, Filter
} from 'lucide-react';

const ELASTICITY_DATA = [
  { category: 'Mercearia Básica', volumeBoost: 180, marginEffect: 14, competitorPrice: 28.5 },
  { category: 'Cervejas e Bebidas', volumeBoost: 240, marginEffect: 22, competitorPrice: 42.0 },
  { category: 'Açougue e Carnes', volumeBoost: 150, marginEffect: 18, competitorPrice: 52.0 },
  { category: 'Limpeza Doméstica', volumeBoost: 110, marginEffect: 26, competitorPrice: 31.9 },
  { category: 'Hortifruti Fresco', volumeBoost: 210, marginEffect: 28, competitorPrice: 12.9 },
  { category: 'Perfumaria e Higiene', volumeBoost: 95, marginEffect: 32, competitorPrice: 19.9 },
];

const CHANNEL_ROI_DATA = [
  { channel: 'Encarte Impresso A4', cost: 12000, revenue: 85000, roi: '7.1x' },
  { channel: 'WhatsApp / Catalogo', cost: 1500, revenue: 64000, roi: '42.6x' },
  { channel: 'Instagram Stories', cost: 2500, revenue: 38000, roi: '15.2x' },
  { channel: 'Cartazeamento PDV', cost: 3000, revenue: 92000, roi: '30.6x' },
];

const HISTORICAL_PRICE_DATA: Record<string, Array<{ month: string; myPrice: number; competitorAvg: number; marketMin: number }>> = {
  'Mercearia Básica': [
    { month: 'Jan', myPrice: 29.90, competitorAvg: 31.50, marketMin: 28.90 },
    { month: 'Fev', myPrice: 29.50, competitorAvg: 30.90, marketMin: 28.50 },
    { month: 'Mar', myPrice: 28.90, competitorAvg: 30.20, marketMin: 27.90 },
    { month: 'Abr', myPrice: 28.90, competitorAvg: 29.80, marketMin: 27.50 },
    { month: 'Mai', myPrice: 27.90, competitorAvg: 29.50, marketMin: 26.90 },
    { month: 'Jun', myPrice: 28.50, competitorAvg: 29.20, marketMin: 27.20 },
    { month: 'Jul', myPrice: 27.50, competitorAvg: 28.90, marketMin: 26.50 },
    { month: 'Ago', myPrice: 26.90, competitorAvg: 28.50, marketMin: 25.90 },
    { month: 'Set', myPrice: 26.50, competitorAvg: 27.90, marketMin: 25.50 },
  ],
  'Cervejas e Bebidas': [
    { month: 'Jan', myPrice: 44.90, competitorAvg: 46.50, marketMin: 42.90 },
    { month: 'Fev', myPrice: 43.90, competitorAvg: 45.80, marketMin: 41.90 },
    { month: 'Mar', myPrice: 42.50, competitorAvg: 44.90, marketMin: 40.50 },
    { month: 'Abr', myPrice: 41.90, competitorAvg: 43.90, marketMin: 39.90 },
    { month: 'Mai', myPrice: 40.90, competitorAvg: 42.90, marketMin: 38.90 },
    { month: 'Jun', myPrice: 39.90, competitorAvg: 41.90, marketMin: 37.90 },
    { month: 'Jul', myPrice: 38.90, competitorAvg: 40.90, marketMin: 36.90 },
    { month: 'Ago', myPrice: 37.90, competitorAvg: 39.50, marketMin: 35.90 },
    { month: 'Set', myPrice: 36.90, competitorAvg: 38.50, marketMin: 34.90 },
  ],
  'Açougue e Carnes': [
    { month: 'Jan', myPrice: 58.00, competitorAvg: 61.50, marketMin: 55.00 },
    { month: 'Fev', myPrice: 56.50, competitorAvg: 59.90, marketMin: 53.90 },
    { month: 'Mar', myPrice: 55.00, competitorAvg: 58.00, marketMin: 52.00 },
    { month: 'Abr', myPrice: 53.90, competitorAvg: 56.50, marketMin: 50.90 },
    { month: 'Mai', myPrice: 52.50, competitorAvg: 55.00, marketMin: 49.50 },
    { month: 'Jun', myPrice: 51.00, competitorAvg: 53.90, marketMin: 48.00 },
    { month: 'Jul', myPrice: 49.90, competitorAvg: 52.50, marketMin: 46.90 },
    { month: 'Ago', myPrice: 48.50, competitorAvg: 51.00, marketMin: 45.50 },
    { month: 'Set', myPrice: 47.90, competitorAvg: 49.90, marketMin: 44.90 },
  ],
  'Limpeza Doméstica': [
    { month: 'Jan', myPrice: 34.90, competitorAvg: 36.50, marketMin: 32.90 },
    { month: 'Fev', myPrice: 33.90, competitorAvg: 35.20, marketMin: 31.90 },
    { month: 'Mar', myPrice: 32.50, competitorAvg: 34.00, marketMin: 30.50 },
    { month: 'Abr', myPrice: 31.90, competitorAvg: 33.20, marketMin: 29.90 },
    { month: 'Mai', myPrice: 30.90, competitorAvg: 32.50, marketMin: 28.90 },
    { month: 'Jun', myPrice: 29.90, competitorAvg: 31.50, marketMin: 27.90 },
    { month: 'Jul', myPrice: 28.90, competitorAvg: 30.20, marketMin: 26.90 },
    { month: 'Ago', myPrice: 27.90, competitorAvg: 29.50, marketMin: 25.90 },
    { month: 'Set', myPrice: 26.90, competitorAvg: 28.50, marketMin: 24.90 },
  ],
  'Hortifruti Fresco': [
    { month: 'Jan', myPrice: 15.90, competitorAvg: 17.20, marketMin: 14.50 },
    { month: 'Fev', myPrice: 14.90, competitorAvg: 16.50, marketMin: 13.90 },
    { month: 'Mar', myPrice: 14.20, competitorAvg: 15.80, marketMin: 12.90 },
    { month: 'Abr', myPrice: 13.50, competitorAvg: 14.90, marketMin: 12.20 },
    { month: 'Mai', myPrice: 12.90, competitorAvg: 14.20, marketMin: 11.50 },
    { month: 'Jun', myPrice: 12.50, competitorAvg: 13.80, marketMin: 11.00 },
    { month: 'Jul', myPrice: 11.90, competitorAvg: 13.20, marketMin: 10.50 },
    { month: 'Ago', myPrice: 11.20, competitorAvg: 12.50, marketMin: 9.90 },
    { month: 'Set', myPrice: 10.90, competitorAvg: 11.90, marketMin: 9.50 },
  ],
  'Perfumaria e Higiene': [
    { month: 'Jan', myPrice: 24.90, competitorAvg: 26.50, marketMin: 22.90 },
    { month: 'Fev', myPrice: 23.90, competitorAvg: 25.20, marketMin: 21.90 },
    { month: 'Mar', myPrice: 22.90, competitorAvg: 24.50, marketMin: 20.90 },
    { month: 'Abr', myPrice: 21.90, competitorAvg: 23.20, marketMin: 19.90 },
    { month: 'Mai', myPrice: 20.90, competitorAvg: 22.50, marketMin: 18.90 },
    { month: 'Jun', myPrice: 19.90, competitorAvg: 21.50, marketMin: 17.90 },
    { month: 'Jul', myPrice: 18.90, competitorAvg: 20.20, marketMin: 16.90 },
    { month: 'Ago', myPrice: 17.90, competitorAvg: 19.50, marketMin: 15.90 },
    { month: 'Set', myPrice: 16.90, competitorAvg: 18.50, marketMin: 14.90 },
  ],
  'Laticínio e Frios': [
    { month: 'Jan', myPrice: 32.00, competitorAvg: 34.50, marketMin: 29.90 },
    { month: 'Fev', myPrice: 31.00, competitorAvg: 33.20, marketMin: 28.90 },
    { month: 'Mar', myPrice: 29.90, competitorAvg: 32.00, marketMin: 27.90 },
    { month: 'Abr', myPrice: 28.90, competitorAvg: 30.90, marketMin: 26.90 },
    { month: 'Mai', myPrice: 27.90, competitorAvg: 29.50, marketMin: 25.90 },
    { month: 'Jun', myPrice: 26.90, competitorAvg: 28.50, marketMin: 24.90 },
    { month: 'Jul', myPrice: 25.90, competitorAvg: 27.20, marketMin: 23.90 },
    { month: 'Ago', myPrice: 24.90, competitorAvg: 26.00, marketMin: 22.90 },
    { month: 'Set', myPrice: 23.90, competitorAvg: 25.00, marketMin: 21.90 },
  ],
  'Biscoitos e Matinais': [
    { month: 'Jan', myPrice: 18.90, competitorAvg: 20.50, marketMin: 16.90 },
    { month: 'Fev', myPrice: 17.90, competitorAvg: 19.50, marketMin: 15.90 },
    { month: 'Mar', myPrice: 16.90, competitorAvg: 18.20, marketMin: 14.90 },
    { month: 'Abr', myPrice: 15.90, competitorAvg: 17.20, marketMin: 13.90 },
    { month: 'Mai', myPrice: 14.90, competitorAvg: 16.50, marketMin: 12.90 },
    { month: 'Jun', myPrice: 13.90, competitorAvg: 15.50, marketMin: 11.90 },
    { month: 'Jul', myPrice: 12.90, competitorAvg: 14.20, marketMin: 10.90 },
    { month: 'Ago', myPrice: 11.90, competitorAvg: 13.50, marketMin: 9.90 },
    { month: 'Set', myPrice: 10.90, competitorAvg: 12.20, marketMin: 8.90 },
  ]
};

export interface PriceAlert {
  id: string;
  category: string;
  condition: 'price_drop' | 'margin_risk' | 'promo_spike';
  conditionLabel: string;
  thresholdValue: number;
  thresholdUnit: '%' | 'R$';
  emailEnabled: boolean;
  pushEnabled: boolean;
  whatsappEnabled: boolean;
  recipientEmail: string;
  recipientPhone: string;
  active: boolean;
  status: 'active' | 'pending' | 'triggered';
  lastTriggered?: string;
}

const CATEGORY_OPTIONS = [
  'Mercearia Básica',
  'Cervejas e Bebidas',
  'Açougue e Carnes',
  'Limpeza Doméstica',
  'Hortifruti Fresco',
  'Perfumaria e Higiene',
  'Laticínio e Frios',
  'Biscoitos e Matinais'
];

/* Custom Tooltip for Elasticity Chart */
const CustomElasticityTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950/95 border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-md max-w-xs space-y-2 z-50">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 gap-3">
          <span className="font-bold text-white text-xs">{data.category}</span>
          <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
            Elasticidade IA
          </span>
        </div>
        <div className="space-y-1.5 text-xs font-mono">
          <div className="flex items-center justify-between text-emerald-400">
            <span>Giro de Volume Estimado:</span>
            <span className="font-extrabold">+{data.volumeBoost}%</span>
          </div>
          <div className="flex items-center justify-between text-cyan-400">
            <span>Margem Retida no Lote:</span>
            <span className="font-extrabold">{data.marginEffect}%</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Preço Concorrente Médio:</span>
            <span className="text-white font-bold">R$ {data.competitorPrice.toFixed(2)}</span>
          </div>
        </div>
        <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 leading-tight">
          💡 <span className="text-slate-300">Produto de alto impacto no tráfego. Ideal para primeira página do encarte.</span>
        </div>
      </div>
    );
  }
  return null;
};

/* Custom Tooltip for Channel ROI Chart */
const CustomChannelRoiTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-950/95 border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-md max-w-xs space-y-2 z-50">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 gap-3">
          <span className="font-bold text-white text-xs">{data.channel}</span>
          <span className="text-[10px] font-mono bg-teal-500/10 text-teal-300 px-2 py-0.5 rounded border border-teal-500/30 font-bold">
            ROI {data.roi}
          </span>
        </div>
        <div className="space-y-1.5 text-xs font-mono">
          <div className="flex items-center justify-between text-rose-400">
            <span>Custo do Canal:</span>
            <span className="font-extrabold">R$ {data.cost.toLocaleString('pt-BR')}</span>
          </div>
          <div className="flex items-center justify-between text-emerald-400">
            <span>Vendas Geradas:</span>
            <span className="font-extrabold">R$ {data.revenue.toLocaleString('pt-BR')}</span>
          </div>
        </div>
        <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 leading-tight">
          📈 <span className="text-slate-300">Retorno direto calculado sobre todas as vendas atribuídas às ofertas deste canal.</span>
        </div>
      </div>
    );
  }
  return null;
};

/* Custom Tooltip for Historical Price Trend Chart */
const CustomHistoricalPriceTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isComparing = data.isComparing;

    if (isComparing) {
      return (
        <div className="bg-slate-950/95 border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-md w-72 space-y-3 z-50">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-white text-xs font-mono">Mês de {label}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Modo Comparativo
            </span>
          </div>

          {/* Primary Category */}
          <div className="space-y-1 bg-slate-900/60 p-2.5 rounded-xl border border-amber-500/20">
            <div className="text-[11px] font-extrabold text-amber-400 flex items-center justify-between">
              <span>{data.primaryCategoryName}</span>
              <span className="text-[10px] text-slate-400 font-normal">Base</span>
            </div>
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Nosso Preço:</span>
              <span className="font-bold text-amber-300">R$ {data.myPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Concorrentes:</span>
              <span className="font-bold text-emerald-400">R$ {data.competitorAvg.toFixed(2)}</span>
            </div>
          </div>

          {/* Secondary Category */}
          <div className="space-y-1 bg-slate-900/60 p-2.5 rounded-xl border border-cyan-500/20">
            <div className="text-[11px] font-extrabold text-cyan-400 flex items-center justify-between">
              <span>{data.comparedCategoryName}</span>
              <span className="text-[10px] text-slate-400 font-normal">Comparado</span>
            </div>
            <div className="flex justify-between text-xs font-mono text-slate-300">
              <span>Nosso Preço:</span>
              <span className="font-bold text-cyan-300">R$ {data.compareMyPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Concorrentes:</span>
              <span className="font-bold text-purple-400">R$ {data.compareCompetitorAvg.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-1 border-t border-slate-800/80 text-[10px] text-slate-400 leading-tight flex items-center justify-between">
            <span>Diferencial Médio:</span>
            <span className="font-mono font-bold text-slate-200">
              R$ {Math.abs(data.myPrice - data.compareMyPrice).toFixed(2)}
            </span>
          </div>
        </div>
      );
    }

    const diff = data.competitorAvg - data.myPrice;
    const isCheaper = diff >= 0;
    const percentDiff = ((Math.abs(diff) / data.competitorAvg) * 100).toFixed(1);

    return (
      <div className="bg-slate-950/95 border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-md w-64 space-y-2.5 z-50">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-white text-xs font-mono">Mês de {label}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
            isCheaper 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
          }`}>
            {isCheaper ? `${percentDiff}% mais barato` : `${percentDiff}% acima`}
          </span>
        </div>

        <div className="space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              Nosso Preço Médio:
            </span>
            <span className="font-extrabold text-amber-300">R$ {data.myPrice.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              Média Concorrentes:
            </span>
            <span className="font-extrabold text-emerald-300">R$ {data.competitorAvg.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-rose-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
              Menor Encarte Rival:
            </span>
            <span className="font-extrabold text-rose-300">R$ {data.marketMin.toFixed(2)}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 leading-tight flex items-center justify-between">
          <span>Spread x Mercado:</span>
          <span className={`font-mono font-bold ${isCheaper ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isCheaper ? `- R$ ${diff.toFixed(2)}` : `+ R$ ${Math.abs(diff).toFixed(2)}`}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export const RetailIntelligenceDashboard: React.FC = () => {
  // Price Alerts State
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    {
      id: 'alert-1',
      category: 'Cervejas e Bebidas',
      condition: 'price_drop',
      conditionLabel: 'Queda de Preço Concorrente',
      thresholdValue: 5,
      thresholdUnit: '%',
      emailEnabled: true,
      pushEnabled: true,
      whatsappEnabled: true,
      recipientEmail: 'comercial@redesuper.com.br',
      recipientPhone: '(11) 98765-4321',
      active: true,
      status: 'triggered',
      lastTriggered: 'Hoje às 09:15'
    },
    {
      id: 'alert-2',
      category: 'Mercearia Básica',
      condition: 'margin_risk',
      conditionLabel: 'Margem de Categoria Ameaçada',
      thresholdValue: 12,
      thresholdUnit: '%',
      emailEnabled: true,
      pushEnabled: true,
      whatsappEnabled: false,
      recipientEmail: 'pricing@redesuper.com.br',
      recipientPhone: '',
      active: true,
      status: 'active',
      lastTriggered: 'Ontem às 16:40'
    },
    {
      id: 'alert-3',
      category: 'Açougue e Carnes',
      condition: 'promo_spike',
      conditionLabel: 'Oferta Agressiva em Encarte Rival',
      thresholdValue: 8,
      thresholdUnit: '%',
      emailEnabled: false,
      pushEnabled: true,
      whatsappEnabled: true,
      recipientEmail: '',
      recipientPhone: '(11) 98765-4321',
      active: false,
      status: 'pending',
      lastTriggered: 'Aguardando validação ERP'
    }
  ]);

  // New Alert Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState(CATEGORY_OPTIONS[0]);
  const [newCondition, setNewCondition] = useState<'price_drop' | 'margin_risk' | 'promo_spike'>('price_drop');
  const [newThresholdValue, setNewThresholdValue] = useState(6);
  const [newThresholdUnit, setNewThresholdUnit] = useState<'%' | 'R$'>('%');
  const [newEmailEnabled, setNewEmailEnabled] = useState(true);
  const [newPushEnabled, setNewPushEnabled] = useState(true);
  const [newWhatsappEnabled, setNewWhatsappEnabled] = useState(false);
  const [newRecipientEmail, setNewRecipientEmail] = useState('diretoria.pricing@supervarejo.com.br');
  const [newRecipientPhone, setNewRecipientPhone] = useState('(11) 99123-8899');
  
  const [newInitialStatus, setNewInitialStatus] = useState<'active' | 'pending'>('active');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'triggered'>('all');
  const [selectedHistoricalCategory, setSelectedHistoricalCategory] = useState<string>('Cervejas e Bebidas');
  const [isComparing, setIsComparing] = useState<boolean>(false);
  const [comparedCategory, setComparedCategory] = useState<string>('Mercearia Básica');
  const [isLoadingCharts, setIsLoadingCharts] = useState<boolean>(false);

  const historicalChartData = React.useMemo(() => {
    const primaryData = HISTORICAL_PRICE_DATA[selectedHistoricalCategory] || HISTORICAL_PRICE_DATA['Cervejas e Bebidas'];
    const secondaryData = HISTORICAL_PRICE_DATA[comparedCategory] || HISTORICAL_PRICE_DATA['Mercearia Básica'];

    return primaryData.map((item, idx) => {
      const secItem = secondaryData[idx] || { myPrice: 0, competitorAvg: 0, marketMin: 0 };
      return {
        month: item.month,
        myPrice: item.myPrice,
        competitorAvg: item.competitorAvg,
        marketMin: item.marketMin,
        compareMyPrice: secItem.myPrice,
        compareCompetitorAvg: secItem.competitorAvg,
        compareMarketMin: secItem.marketMin,
        primaryCategoryName: selectedHistoricalCategory,
        comparedCategoryName: comparedCategory,
        isComparing
      };
    });
  }, [selectedHistoricalCategory, comparedCategory, isComparing]);

  const handleSyncCharts = () => {
    setIsLoadingCharts(true);
    setTimeout(() => {
      setIsLoadingCharts(false);
      showToast('Dados de precificação e concorrência sincronizados!');
    }, 1200);
  };
  
  // Feedback Banner State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [testNotification, setTestNotification] = useState<{
    visible: boolean;
    title: string;
    body: string;
    time: string;
  } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleToggleAlert = (id: string) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === id) {
        const nextActive = !a.active;
        const nextStatus = nextActive ? 'active' : 'pending';
        return { ...a, active: nextActive, status: nextStatus };
      }
      return a;
    }));
    const target = alerts.find(a => a.id === id);
    if (target) {
      showToast(`Alerta para "${target.category}" ${!target.active ? 'ativado' : 'desativado'}.`);
    }
  };

  const handleSetAlertStatus = (id: string, newStatus: 'active' | 'pending' | 'triggered') => {
    setAlerts(prev => prev.map(a => {
      if (a.id === id) {
        return { 
          ...a, 
          status: newStatus, 
          active: newStatus !== 'pending',
          lastTriggered: newStatus === 'triggered' ? 'Agora mesmo' : a.lastTriggered
        };
      }
      return a;
    }));
    showToast(`Status do alerta alterado para ${newStatus.toUpperCase()}`);
  };

  const handleDeleteAlert = (id: string) => {
    const target = alerts.find(a => a.id === id);
    setAlerts(prev => prev.filter(a => a.id !== id));
    if (target) {
      showToast(`Alerta de preço para "${target.category}" removido.`);
    }
  };

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const conditionLabels = {
      price_drop: 'Queda de Preço Concorrente',
      margin_risk: 'Margem de Categoria Ameaçada',
      promo_spike: 'Oferta Agressiva em Encarte Rival'
    };

    const newAlert: PriceAlert = {
      id: `alert-${Date.now()}`,
      category: newCategory,
      condition: newCondition,
      conditionLabel: conditionLabels[newCondition],
      thresholdValue: Number(newThresholdValue),
      thresholdUnit: newThresholdUnit,
      emailEnabled: newEmailEnabled,
      pushEnabled: newPushEnabled,
      whatsappEnabled: newWhatsappEnabled,
      recipientEmail: newRecipientEmail,
      recipientPhone: newRecipientPhone,
      active: newInitialStatus === 'active',
      status: newInitialStatus,
      lastTriggered: 'Novo'
    };

    setAlerts(prev => [newAlert, ...prev]);
    setShowAddForm(false);
    showToast(`Novo alerta configurado com sucesso [${newInitialStatus.toUpperCase()}] para ${newCategory}!`);
  };

  const handleSimulateAlertTrigger = (alert: PriceAlert) => {
    // Update alert status to 'triggered'
    setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, status: 'triggered', active: true, lastTriggered: 'Agora mesmo' } : a));

    setTestNotification({
      visible: true,
      title: `🚨 Alerta Disparado: ${alert.category}`,
      body: `Concorrente reduziu preço em ${alert.thresholdValue}${alert.thresholdUnit}! Disparo simulado via ${[
        alert.pushEnabled && 'Push App',
        alert.emailEnabled && `Email (${alert.recipientEmail || 'comercial@varejo.com'})`,
        alert.whatsappEnabled && 'WhatsApp'
      ].filter(Boolean).join(', ')}.`,
      time: 'Agora mesmo'
    });
  };

  const renderStatusBadge = (status: 'active' | 'pending' | 'triggered', alertId: string) => {
    switch (status) {
      case 'active':
        return (
          <button
            type="button"
            onClick={() => handleSetAlertStatus(alertId, 'triggered')}
            title="Clique para simular disparo"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold shadow-sm shadow-emerald-500/10 cursor-pointer hover:bg-emerald-500/25 transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ativo</span>
          </button>
        );
      case 'pending':
        return (
          <button
            type="button"
            onClick={() => handleSetAlertStatus(alertId, 'active')}
            title="Clique para ativar alerta"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/40 text-[11px] font-bold cursor-pointer hover:bg-amber-500/25 transition-all"
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Pendente</span>
          </button>
        );
      case 'triggered':
        return (
          <button
            type="button"
            onClick={() => handleSetAlertStatus(alertId, 'active')}
            title="Clique para resetar status para Ativo"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/50 text-[11px] font-bold shadow-md shadow-rose-500/20 animate-pulse cursor-pointer hover:bg-rose-500/30 transition-all"
          >
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>Disparado</span>
          </button>
        );
      default:
        return null;
    }
  };

  const filteredAlerts = alerts.filter(a => statusFilter === 'all' || a.status === statusFilter);

  return (
    <section id="intelligence" className="py-20 bg-slate-950 border-t border-slate-800/60 relative scroll-mt-24">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-300 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Simulated Live Push Alert Popup */}
      {testNotification && testNotification.visible && (
        <div className="fixed top-6 right-6 z-50 max-w-md w-full bg-slate-900 border-2 border-amber-500 rounded-2xl p-4 shadow-2xl text-white animate-in zoom-in-95 duration-200">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <BellRing className="w-4 h-4 animate-bounce" />
              <span>{testNotification.title}</span>
            </div>
            <button 
              onClick={() => setTestNotification(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            {testNotification.body}
          </p>
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            <span>Enviado para os canais configurados</span>
            <span className="text-amber-400 font-semibold">{testNotification.time}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Inteligência Competitiva de Varejo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
            Análise Preditiva de Preços e Elasticidade de Vendas
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Monitore os preços praticados pelos principais concorrentes da região, entenda a elasticidade de cada categoria e precifique para maximizar volume e margem.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={handleSyncCharts}
              disabled={isLoadingCharts}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:text-white hover:border-cyan-500 text-xs font-bold transition-all shadow-lg cursor-pointer disabled:opacity-50"
            >
              <Zap className={`w-3.5 h-3.5 ${isLoadingCharts ? 'animate-spin text-amber-400' : 'text-cyan-400'}`} />
              <span>{isLoadingCharts ? 'Sincronizando Banco de Preços...' : 'Sincronizar Inteligência de Preços'}</span>
            </button>
          </div>
        </div>

        {/* Charts Grid or Skeleton Loaders */}
        {isLoadingCharts ? (
          <div className="mt-12 space-y-8 animate-in fade-in duration-300">
            {/* Top Charts Grid Skeletons */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-5 w-48 bg-slate-800 rounded-lg" />
                    <div className="h-3 w-64 bg-slate-800/60 rounded" />
                  </div>
                  <div className="h-6 w-20 bg-slate-800 rounded-lg" />
                </div>
                <div className="h-64 w-full bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-end p-4 gap-3">
                  {[40, 75, 55, 90, 60, 80].map((height, i) => (
                    <div key={i} className="flex-1 bg-slate-800/80 rounded-t-lg" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-5 w-48 bg-slate-800 rounded-lg" />
                    <div className="h-3 w-64 bg-slate-800/60 rounded" />
                  </div>
                  <div className="h-6 w-24 bg-slate-800 rounded-lg" />
                </div>
                <div className="h-64 w-full bg-slate-950/80 rounded-xl border border-slate-800/80 p-4 space-y-4 flex flex-col justify-around">
                  {[70, 45, 85, 60].map((width, i) => (
                    <div key={i} className="bg-slate-800/80 h-7 rounded-r-lg" style={{ width: `${width}%` }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Historical Line Chart Skeleton */}
            <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl animate-pulse">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="space-y-2">
                  <div className="h-6 w-64 bg-slate-800 rounded-lg" />
                  <div className="h-3 w-80 bg-slate-800/60 rounded" />
                </div>
                <div className="h-8 w-40 bg-slate-800 rounded-xl" />
              </div>
              <div className="h-72 w-full bg-slate-950/80 rounded-2xl border border-slate-800/80 p-6 flex flex-col justify-between">
                <div className="h-3 w-full bg-slate-800/40 rounded" />
                <div className="h-3 w-full bg-slate-800/40 rounded" />
                <div className="h-3 w-full bg-slate-800/40 rounded" />
                <div className="h-3 w-full bg-slate-800/40 rounded" />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Elasticity Chart */}
          <div className="bg-slate-900/90 p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Aumento de Volume (%) vs. Margem Retida (%)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Comportamento de vendas de acordo com o desconto no encarte</p>
              </div>
              <span className="text-[10px] sm:text-[11px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-lg border border-emerald-500/30 font-bold">
                IA Preditiva
              </span>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ELASTICITY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="category" stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomElasticityTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                  <Bar dataKey="volumeBoost" name="Giro de Volume (+%)" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="marginEffect" name="Margem Final (%)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Channel ROI Chart */}
          <div className="bg-slate-900/90 p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-teal-400" />
                  <span>ROI por Canal de Comunicação Promocional</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Comparativo de investimento de marketing vs. receita bruta gerada</p>
              </div>
              <span className="text-[10px] sm:text-[11px] bg-teal-500/10 text-teal-400 px-2.5 py-1 rounded-lg border border-teal-500/30 font-bold">
                Mídia Omnichannel
              </span>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHANNEL_ROI_DATA} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis type="number" stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis dataKey="channel" type="category" stroke="#64748b" tick={{ fontSize: 10 }} width={120} />
                  <Tooltip content={<CustomChannelRoiTooltip />} />
                  <Bar dataKey="cost" name="Custo do Canal (R$)" fill="#ef4444" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="revenue" name="Vendas Geradas (R$)" fill="#10b981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Historical Price Trend Line Chart Card */}
        <div className="mt-8 bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 font-outfit">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  <span>Evolução Histórica de Preços por Categoria</span>
                </h3>
                {isComparing ? (
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-300 px-2.5 py-0.5 rounded-full border border-cyan-500/30 font-bold uppercase tracking-wide">
                    Modo Comparativo Ativo
                  </span>
                ) : (
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-bold uppercase tracking-wide">
                    Tendência Mensal
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Acompanhe as oscilações médias de preço (R$) praticadas por você vs. concorrentes diretos nos últimos 9 meses.
              </p>
            </div>

            {/* Category Selector & Compare Toggle */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Primary Dropdown */}
              <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 font-medium pl-1">Base:</span>
                <select
                  value={selectedHistoricalCategory}
                  onChange={(e) => setSelectedHistoricalCategory(e.target.value)}
                  className="bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer shadow-inner"
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Compare Toggle Button */}
              <button
                onClick={() => setIsComparing(!isComparing)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
                  isComparing
                    ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                <Sliders className={`w-3.5 h-3.5 ${isComparing ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{isComparing ? 'Comparando Categorias' : 'Comparar Produtos'}</span>
              </button>

              {/* Secondary Compare Dropdown */}
              {isComparing && (
                <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-cyan-500/40 animate-in fade-in duration-200">
                  <span className="text-xs text-cyan-400 font-medium pl-1">vs:</span>
                  <select
                    value={comparedCategory}
                    onChange={(e) => setComparedCategory(e.target.value)}
                    className="bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-bold rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 cursor-pointer shadow-inner"
                  >
                    {CATEGORY_OPTIONS.filter(cat => cat !== selectedHistoricalCategory).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Recharts LineChart */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis 
                  stroke="#64748b" 
                  tick={{ fontSize: 11 }} 
                  domain={['auto', 'auto']}
                  tickFormatter={(val) => `R$ ${val}`}
                />
                <Tooltip content={<CustomHistoricalPriceTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '12px', color: '#94a3b8' }} />
                
                {/* Primary Category Lines */}
                <Line 
                  type="monotone" 
                  dataKey="myPrice" 
                  name={isComparing ? `Nosso Preço (${selectedHistoricalCategory})` : "Nosso Preço Médio (R$)"} 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#fbbf24' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="competitorAvg" 
                  name={isComparing ? `Concorrentes (${selectedHistoricalCategory})` : "Média dos Concorrentes (R$)"} 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#10b981' }}
                />

                {!isComparing && (
                  <Line 
                    type="monotone" 
                    dataKey="marketMin" 
                    name="Menor Preço de Encarte Rival (R$)" 
                    stroke="#f43f5e" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 3, fill: '#f43f5e' }}
                  />
                )}

                {/* Secondary Category Lines when Comparing */}
                {isComparing && (
                  <>
                    <Line 
                      type="monotone" 
                      dataKey="compareMyPrice" 
                      name={`Nosso Preço (${comparedCategory})`} 
                      stroke="#06b6d4" 
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#06b6d4', strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: '#22d3ee' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="compareCompetitorAvg" 
                      name={`Concorrentes (${comparedCategory})`} 
                      stroke="#a855f7" 
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#a855f7' }}
                    />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        </>
        )}

        {/* NEW: PRICE ALERTS & NOTIFICATION SETTINGS COMPONENT */}
        <div className="mt-12 bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mt-0.5 shrink-0">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white font-outfit">Configurações de Alertas de Preço</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Notificações Automáticas
                  </span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Defina gatilhos de preço, variações de margem e receba alertas instantâneos via Email e Push sempre que concorrentes alterarem ofertas.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-lg shadow-amber-500/10 shrink-0"
            >
              {showAddForm ? (
                <>
                  <X className="w-4 h-4" />
                  <span>Fechar Formulário</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Novo Alerta de Preço</span>
                </>
              )}
            </button>
          </div>

          {/* Add New Alert Form Modal / Panel */}
          {showAddForm && (
            <form onSubmit={handleCreateAlert} className="bg-slate-950/90 border border-amber-500/30 rounded-2xl p-6 mb-8 space-y-6 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Sliders className="w-4 h-4" />
                  <span>Criar Novo Gatilho de Alerta de Preço</span>
                </h4>
                <span className="text-xs text-slate-500">Configuração de Threshold</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Product Category Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Categoria de Produto</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Condition Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Condição do Gatilho</label>
                  <select
                    value={newCondition}
                    onChange={(e: any) => setNewCondition(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="price_drop">Queda de Preço Concorrente (% maior)</option>
                    <option value="margin_risk">Margem de Categoria Ameaçada (% menor)</option>
                    <option value="promo_spike">Oferta Agressiva em Encarte Rival (% desconto)</option>
                  </select>
                </div>

                {/* Threshold Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Limite do Threshold</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      value={newThresholdValue}
                      onChange={(e) => setNewThresholdValue(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <select
                      value={newThresholdUnit}
                      onChange={(e: any) => setNewThresholdUnit(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 shrink-0"
                    >
                      <option value="%">%</option>
                      <option value="R$">R$</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notification Methods Selection */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span>Métodos de Notificação Desejados:</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Email Toggle */}
                  <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    newEmailEnabled 
                      ? 'bg-amber-500/10 border-amber-500/40 text-white' 
                      : 'bg-slate-900/60 border-slate-800 text-slate-400'
                  }`}>
                    <div className="flex items-center gap-2.5 text-xs">
                      <Mail className={`w-4 h-4 ${newEmailEnabled ? 'text-amber-400' : 'text-slate-500'}`} />
                      <div>
                        <p className="font-semibold">Email Alerta</p>
                        <p className="text-[10px] opacity-70">Envio de resumo diário</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={newEmailEnabled}
                      onChange={(e) => setNewEmailEnabled(e.target.checked)}
                      className="rounded accent-amber-500 w-4 h-4 cursor-pointer"
                    />
                  </label>

                  {/* Push Toggle */}
                  <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    newPushEnabled 
                      ? 'bg-amber-500/10 border-amber-500/40 text-white' 
                      : 'bg-slate-900/60 border-slate-800 text-slate-400'
                  }`}>
                    <div className="flex items-center gap-2.5 text-xs">
                      <Smartphone className={`w-4 h-4 ${newPushEnabled ? 'text-amber-400' : 'text-slate-500'}`} />
                      <div>
                        <p className="font-semibold">Notificação Push</p>
                        <p className="text-[10px] opacity-70">Alerta popup instantâneo</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={newPushEnabled}
                      onChange={(e) => setNewPushEnabled(e.target.checked)}
                      className="rounded accent-amber-500 w-4 h-4 cursor-pointer"
                    />
                  </label>

                  {/* WhatsApp Toggle */}
                  <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    newWhatsappEnabled 
                      ? 'bg-amber-500/10 border-amber-500/40 text-white' 
                      : 'bg-slate-900/60 border-slate-800 text-slate-400'
                  }`}>
                    <div className="flex items-center gap-2.5 text-xs">
                      <Send className={`w-4 h-4 ${newWhatsappEnabled ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <div>
                        <p className="font-semibold">WhatsApp Bot</p>
                        <p className="text-[10px] opacity-70">Mensagem no celular</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={newWhatsappEnabled}
                      onChange={(e) => setNewWhatsappEnabled(e.target.checked)}
                      className="rounded accent-amber-500 w-4 h-4 cursor-pointer"
                    />
                  </label>

                </div>

                {/* Recipient Input details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {newEmailEnabled && (
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Email do Destinatário</label>
                      <input
                        type="email"
                        value={newRecipientEmail}
                        onChange={(e) => setNewRecipientEmail(e.target.value)}
                        placeholder="comercial@supermercado.com.br"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  )}

                  {newWhatsappEnabled && (
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Número WhatsApp do Gestor</label>
                      <input
                        type="text"
                        value={newRecipientPhone}
                        onChange={(e) => setNewRecipientPhone(e.target.value)}
                        placeholder="(11) 99999-8888"
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  )}
                </div>

              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  Ativar Alerta de Preço
                </button>
              </div>

            </form>
          )}

          {/* Active Alerts List Header & Filters */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400 font-semibold px-1 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span>Alertas Configurados ({alerts.length})</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-500">Filtrar por Status:</span>
              </div>

              {/* Color-Coded Status Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <button
                  type="button"
                  onClick={() => setStatusFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    statusFilter === 'all'
                      ? 'bg-slate-700 text-white border border-slate-600'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  Todos ({alerts.length})
                </button>

                <button
                  type="button"
                  onClick={() => setStatusFilter('active')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    statusFilter === 'active'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-emerald-400 border border-slate-800'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Ativos ({alerts.filter(a => a.status === 'active').length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatusFilter('pending')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    statusFilter === 'pending'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-amber-400 border border-slate-800'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Pendentes ({alerts.filter(a => a.status === 'pending').length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatusFilter('triggered')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    statusFilter === 'triggered'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-rose-400 border border-slate-800'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>Disparados ({alerts.filter(a => a.status === 'triggered').length})</span>
                </button>
              </div>
            </div>

            {/* Alert Cards */}
            <div className="grid grid-cols-1 gap-3">
              {alerts
                .filter(a => statusFilter === 'all' || a.status === statusFilter)
                .map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    alert.status === 'triggered'
                      ? 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/50'
                      : alert.status === 'active' 
                        ? 'bg-slate-950/80 border-slate-800 hover:border-amber-500/40' 
                        : 'bg-slate-950/40 border-slate-800/50 opacity-75'
                  }`}
                >
                  {/* Category & Condition Info */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-bold text-white text-base font-outfit">{alert.category}</span>
                      
                      {/* COLOR-CODED STATUS BADGE */}
                      {renderStatusBadge(alert.status, alert.id)}

                      {alert.lastTriggered && (
                        <span className="text-[10px] text-slate-500 font-medium">
                          Último registro: {alert.lastTriggered}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-amber-400 font-medium flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>Gatilho: {alert.conditionLabel} ({alert.thresholdValue}{alert.thresholdUnit})</span>
                    </p>

                    {/* Notification Methods Badges */}
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] text-slate-500">Canais:</span>
                      
                      {alert.emailEnabled && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">
                          <Mail className="w-3 h-3 text-amber-400" /> Email
                        </span>
                      )}

                      {alert.pushEnabled && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">
                          <Smartphone className="w-3 h-3 text-amber-400" /> Push App
                        </span>
                      )}

                      {alert.whatsappEnabled && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[10px]">
                          <Send className="w-3 h-3 text-emerald-400" /> WhatsApp
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Actions & Controls */}
                  <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                    
                    {/* Test Trigger Button */}
                    <button
                      type="button"
                      onClick={() => handleSimulateAlertTrigger(alert)}
                      title="Simular disparo de gatilho para esta categoria"
                      className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Simular Disparo</span>
                    </button>

                    {/* Active Toggle Switch */}
                    <button
                      type="button"
                      onClick={() => handleToggleAlert(alert.id)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        alert.active 
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30' 
                          : 'bg-slate-800 text-slate-500 border-slate-700 hover:bg-slate-700'
                      }`}
                      title={alert.active ? 'Pausar alerta (mudar para Pendente)' : 'Ativar alerta'}
                    >
                      <Check className="w-4 h-4" />
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="p-2 rounded-xl bg-slate-900 text-slate-500 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 border border-slate-800 transition-all cursor-pointer"
                      title="Excluir alerta"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>
                </div>
              ))}

              {filteredAlerts.length === 0 && (
                <div className="text-center py-8 bg-slate-950/40 rounded-2xl border border-slate-800 text-slate-400 text-xs">
                  Nenhum alerta encontrado com o status "{statusFilter.toUpperCase()}".
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

