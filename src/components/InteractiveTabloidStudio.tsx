import React, { useState } from 'react';
import { ProductOffer, TabloidFormat } from '../types';
import { INITIAL_PRODUCTS } from '../data/retailData';
import { FileText, Plus, Trash2, Download, Smartphone, LayoutGrid, Monitor, Printer, Tag, DollarSign, Sparkles, Check, RefreshCw, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InteractiveTabloidStudio: React.FC = () => {
  const [products, setProducts] = useState<ProductOffer[]>(INITIAL_PRODUCTS);
  const [selectedFormat, setSelectedFormat] = useState<TabloidFormat>('A4_PRINT');
  const [campaignTitle, setCampaignTitle] = useState<string>('OFERTAS IMBATÍVEIS DO FIM DE SEMANA');
  const [themeColor, setThemeColor] = useState<'emerald' | 'amber' | 'rose' | 'indigo'>('emerald');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportedSuccess, setExportedSuccess] = useState<boolean>(false);

  // New item form inline state
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Mercearia');
  const [newItemRegPrice, setNewItemRegPrice] = useState('29.90');
  const [newItemPromoPrice, setNewItemPromoPrice] = useState('19.90');
  const [newItemBadge, setNewItemBadge] = useState('OFERTA ESPECIAL');

  // Handle price change
  const handleUpdatePrice = (id: string, field: 'regularPrice' | 'promoPrice', value: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    }));
  };

  const handleUpdateBadge = (id: string, badge: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) return { ...p, badge };
      return p;
    }));
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) return;

    const newProd: ProductOffer = {
      id: `custom-${Date.now()}`,
      name: newItemName,
      category: newItemCategory,
      regularPrice: parseFloat(newItemRegPrice) || 10,
      promoPrice: parseFloat(newItemPromoPrice) || 8,
      unit: 'un',
      badge: newItemBadge,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80',
      supplier: 'Fornecedor Parceiro',
      tradeFund: 2500,
      marginPercent: 21.0,
      stockQty: 5000
    };

    setProducts(prev => [newProd, ...prev]);
    setNewItemName('');
  };

  // Calculations for campaign health
  const totalRegularVal = products.reduce((acc, p) => acc + p.regularPrice, 0);
  const totalPromoVal = products.reduce((acc, p) => acc + p.promoPrice, 0);
  const avgDiscount = totalRegularVal > 0 ? (((totalRegularVal - totalPromoVal) / totalRegularVal) * 100).toFixed(1) : '0';
  const totalTradeCoop = products.reduce((acc, p) => acc + (p.tradeFund || 0), 0);

  const handleSimulateExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportedSuccess(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      setTimeout(() => setExportedSuccess(false), 4000);
    }, 1200);
  };

  const themeClasses = {
    emerald: {
      bg: 'bg-emerald-600',
      border: 'border-emerald-500',
      text: 'text-emerald-400',
      badge: 'bg-emerald-500 text-slate-950 font-bold',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500'
    },
    amber: {
      bg: 'bg-amber-600',
      border: 'border-amber-500',
      text: 'text-amber-400',
      badge: 'bg-amber-500 text-slate-950 font-bold',
      gradient: 'from-amber-500 via-orange-500 to-yellow-500'
    },
    rose: {
      bg: 'bg-rose-600',
      border: 'border-rose-500',
      text: 'text-rose-400',
      badge: 'bg-rose-500 text-white font-bold',
      gradient: 'from-rose-500 via-red-500 to-pink-500'
    },
    indigo: {
      bg: 'bg-indigo-600',
      border: 'border-indigo-500',
      text: 'text-indigo-400',
      badge: 'bg-indigo-500 text-white font-bold',
      gradient: 'from-indigo-500 via-purple-500 to-blue-500'
    }
  };

  return (
    <section id="tabloid-studio" className="py-20 bg-slate-950 border-t border-slate-800/60 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Módulo de Automação Visual</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
            Gerador Inteligente de Encartes & Cartazes Digitais
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Monte encartes promocionais com validação automática de margem e precificação do ERP. Alterne os formatos em tempo real sem refazer o trabalho de design.
          </p>
        </div>

        {/* Interactive Studio Layout Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: Controls & Form Editor (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-xl">
            
            {/* Header & Format Controls */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2">1. Selecione o Formato de Exibição</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedFormat('A4_PRINT')}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    selectedFormat === 'A4_PRINT'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Printer className="w-4 h-4 text-emerald-400" />
                  <span>Tablóide Impresso (A4)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFormat('INSTAGRAM_STORY')}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    selectedFormat === 'INSTAGRAM_STORY'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Story 9:16 (Redes)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFormat('WHATSAPP_CATALOG')}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    selectedFormat === 'WHATSAPP_CATALOG'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4 text-emerald-400" />
                  <span>Catálogo WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFormat('TV_INDOOR')}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    selectedFormat === 'TV_INDOOR'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-4 h-4 text-emerald-400" />
                  <span>TV Indoor / Mídia Lojas</span>
                </button>
              </div>
            </div>

            {/* Campaign Title & Theme Color */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase text-slate-400">2. Título da Campanha Promocional</label>
              <input
                type="text"
                value={campaignTitle}
                onChange={(e) => setCampaignTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm font-semibold focus:outline-none focus:border-emerald-500"
              />

              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs font-bold text-slate-400">Tema Visual:</span>
                <div className="flex items-center gap-2">
                  {(['emerald', 'amber', 'rose', 'indigo'] as const).map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setThemeColor(color)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        color === 'emerald' ? 'bg-emerald-500' :
                        color === 'amber' ? 'bg-amber-500' :
                        color === 'rose' ? 'bg-rose-500' : 'bg-indigo-500'
                      } ${themeColor === color ? 'scale-125 border-white' : 'border-transparent opacity-70'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Add Product Form */}
            <form onSubmit={handleAddProduct} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>Adicionar Produto ao Lote</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Nome do produto"
                  value={newItemName}
                  onChange={e => setNewItemName(e.target.value)}
                  className="col-span-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  required
                />
                <div>
                  <label className="text-[10px] text-slate-400 block">Preço Normal (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newItemRegPrice}
                    onChange={e => setNewItemRegPrice(e.target.value)}
                    className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">Preço Oferta (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newItemPromoPrice}
                    onChange={e => setNewItemPromoPrice(e.target.value)}
                    className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-emerald-400 font-bold"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Inserir Produto no Encarte</span>
              </button>
            </form>

            {/* Campaign Health & Margin Metrics */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Análise Financeira da Oferta</span>
                </span>
                <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[11px]">
                  Desconto Médio: {avgDiscount}%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800/80">
                  <div className="text-[10px] text-slate-400">Total Verbas de Trade</div>
                  <div className="text-sm font-bold text-emerald-400">R$ {totalTradeCoop.toLocaleString('pt-BR')}</div>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800/80">
                  <div className="text-[10px] text-slate-400">Status ERP</div>
                  <div className="text-xs font-bold text-teal-300 flex items-center gap-1 mt-1">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Margem Protegida</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Export Simulator Button */}
            <div>
              <button
                onClick={handleSimulateExport}
                disabled={isExporting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isExporting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Diagramando e Validando com ERP...</span>
                  </>
                ) : exportedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Encarte Gerado com Sucesso!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Exportar Materiais Promocionais (PDF / HQ)</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* RIGHT PANEL: Live Visual Preview Canvas (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-2xl flex flex-col items-center">
            
            <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Visualização em Tempo Real — {selectedFormat}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {products.length} Produtos
              </span>
            </div>

            {/* CANVAS RENDER AREA */}
            <div className={`w-full transition-all duration-300 p-3 sm:p-6 rounded-2xl bg-slate-950 border ${themeClasses[themeColor].border} shadow-2xl relative overflow-hidden min-h-[420px]`}>
              
              {/* Decorative Banner Header in Preview */}
              <div className={`w-full py-3.5 px-4 sm:px-6 rounded-xl bg-gradient-to-r ${themeClasses[themeColor].gradient} text-slate-950 font-extrabold text-center uppercase tracking-tight shadow-lg mb-4 sm:mb-6`}>
                <div className="text-[10px] font-black tracking-widest text-slate-900/80 uppercase">SUPERMERCADOS & VAREJO</div>
                <div className="text-lg sm:text-xl font-black font-outfit">{campaignTitle}</div>
                <div className="text-[11px] font-bold text-slate-900/90 mt-0.5">OFERTAS VÁLIDAS ENQUANTO DURAREM OS ESTOQUES</div>
              </div>

              {/* PRODUCTS GRID IN PREVIEW */}
              <div className={`grid ${
                selectedFormat === 'INSTAGRAM_STORY' ? 'grid-cols-1 sm:grid-cols-2 gap-3' :
                selectedFormat === 'WHATSAPP_CATALOG' ? 'grid-cols-1 gap-3' :
                'grid-cols-2 sm:grid-cols-3 gap-3'
              }`}>
                {products.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-slate-900 p-3 rounded-xl border border-slate-800 relative group hover:border-slate-700 transition-all"
                  >
                    {/* Delete button on hover */}
                    <button
                      onClick={() => handleRemoveProduct(item.id)}
                      className="absolute top-2 right-2 p-1 bg-rose-500/80 hover:bg-rose-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                      title="Remover produto"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>

                    {/* Badge */}
                    <div className="inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider mb-2 bg-emerald-500 text-slate-950">
                      {item.badge}
                    </div>

                    {/* Product Image & Info */}
                    <div className="flex gap-2 items-center">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 rounded-lg object-cover bg-slate-800 shrink-0" 
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-white truncate">{item.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">Cod: {item.id}</div>
                      </div>
                    </div>

                    {/* Pricing Edit Inputs */}
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 line-through">De R$ </span>
                        <input
                          type="number"
                          step="0.01"
                          value={item.regularPrice}
                          onChange={(e) => handleUpdatePrice(item.id, 'regularPrice', parseFloat(e.target.value) || 0)}
                          className="w-12 bg-slate-950 border border-slate-800 rounded px-1 text-[11px] text-slate-400 line-through font-mono"
                        />
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-bold text-emerald-400">Por R$ </span>
                        <input
                          type="number"
                          step="0.01"
                          value={item.promoPrice}
                          onChange={(e) => handleUpdatePrice(item.id, 'promoPrice', parseFloat(e.target.value) || 0)}
                          className="w-16 bg-slate-950 border border-emerald-500/50 rounded px-1 text-sm font-extrabold text-emerald-400 font-mono text-right"
                        />
                      </div>
                    </div>

                    {/* Barcode & Unit Footer */}
                    <div className="mt-1 flex items-center justify-between text-[9px] text-slate-500 font-mono">
                      <span>{item.unit.toUpperCase()}</span>
                      <span>|||||| || |||||</span>
                    </div>

                  </div>
                ))}
              </div>

              {/* Bottom Footer Notice in Tabloid */}
              <div className="mt-6 pt-3 border-t border-slate-800 text-center text-[10px] text-slate-500">
                Imagens meramente ilustrativas. Ofertas com precificação validada via SmartRetail AI ERP Sync.
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
