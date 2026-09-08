import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Play, FileSpreadsheet, Percent, ShieldCheck, Zap, Layers, RefreshCw, BarChart3, Store } from 'lucide-react';
import { PLATFORM_STATS } from '../data/retailData';

interface HeroSectionProps {
  onOpenDemo: () => void;
  onExploreModule: (moduleKey: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDemo, onExploreModule }) => {
  const [activePreview, setActivePreview] = useState<'encartes' | 'trade' | 'inteligencia'>('encartes');

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-slate-950 scroll-mt-24">
      
      {/* Background Decorative Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-xl shadow-emerald-950/50 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Gestão de Ofertas & Trade Marketing com IA para Redes Varejistas</span>
          </div>
        </div>

        {/* Main Title & Headline */}
        <div className="mt-6 text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] font-outfit">
            A Plataforma Completa para <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Gestão de Ofertas, Encartes
            </span>{' '}
            e Trade Marketing
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Elimine 85% do tempo de diagramação de tablóides e cartazes, integre o ERP ao PDV sem divergência de preço e unifique as negociações de verba comercial com a indústria em um único ecossistema.
          </p>

          {/* Call To Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenDemo}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>Solicitar Demonstração Gratuita</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onExploreModule('tabloid-studio')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900 border border-slate-700/80 hover:border-emerald-500/50 text-slate-200 hover:text-white font-semibold text-base transition-all duration-200 cursor-pointer"
            >
              <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span>Simular Gerador de Encartes</span>
            </button>
          </div>

          {/* Key Value Checklist */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Integrado aos ERPs TOTVS, Linx, Senior e SAP</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Validação automática de margem e estoque</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Trade App Control para campo</span>
            </div>
          </div>
        </div>

        {/* Interactive Platform Mockup Container */}
        <div className="mt-14 relative max-w-5xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-slate-800/80 via-slate-900/60 to-slate-950 shadow-2xl shadow-emerald-950/40 border border-slate-800">
          
          {/* Header Controls for Mockup Tabs */}
          <div className="bg-slate-950/90 rounded-2xl p-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">smartretail.ai/platform-hub</span>
            </div>

            {/* Selector Tabs */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  setActivePreview('encartes');
                  onExploreModule('tabloid-studio');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activePreview === 'encartes'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Gerador de Encartes
              </button>
              <button
                onClick={() => {
                  setActivePreview('trade');
                  onExploreModule('trade-hub');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activePreview === 'trade'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Trade Marketing & Verbas
              </button>
              <button
                onClick={() => {
                  setActivePreview('inteligencia');
                  onExploreModule('intelligence');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activePreview === 'inteligencia'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Inteligência de Preços
              </button>
            </div>
          </div>

          {/* Interactive Preview Canvas */}
          <div className="bg-slate-900/90 rounded-b-2xl p-6 md:p-8 min-h-[380px] flex flex-col justify-between">
            {activePreview === 'encartes' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase text-emerald-400 tracking-wider">Módulo de Diagramação</span>
                    <h3 className="text-xl font-bold text-white">Criador Automático de Tablóides & Cartazes Digitais</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                    <span>Sincronizado com ERP em tempo real</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Diagramação em 1 Clique</h4>
                      <p className="text-xs text-slate-400 mt-1">Converte ofertas aprovadas em PDFs para impressão, cartazes de gôndola e Stories para redes sociais.</p>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Validador de Margem</h4>
                      <p className="text-xs text-slate-400 mt-1">Bloqueia automaticamente ofertas abaixo da margem mínima sem autorização comercial prévia.</p>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Multicanal Omnichannel</h4>
                      <p className="text-xs text-slate-400 mt-1">Publicação simultânea em WhatsApp, E-commerce, App da Rede e TVs Internas de Loja.</p>
                    </div>
                  </div>
                </div>

                {/* Simulated Offer Item Rows */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                    <span>Prévia de Lote Promocional (Fim de Semana Especial)</span>
                    <span className="text-emerald-400 font-bold">4 Itens Aprovados</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center">
                      <div className="text-xs font-bold text-white truncate">Arroz 5kg Camil</div>
                      <div className="text-[11px] text-slate-400 line-through">De R$ 28,90</div>
                      <div className="text-sm font-extrabold text-emerald-400">Por R$ 21,90</div>
                      <div className="mt-1 text-[10px] bg-emerald-500/20 text-emerald-300 rounded px-1 py-0.5">Margem: 14.5%</div>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center">
                      <div className="text-xs font-bold text-white truncate">Cerveja Pack 12</div>
                      <div className="text-[11px] text-slate-400 line-through">De R$ 44,90</div>
                      <div className="text-sm font-extrabold text-emerald-400">Por R$ 35,90</div>
                      <div className="mt-1 text-[10px] bg-emerald-500/20 text-emerald-300 rounded px-1 py-0.5">Verba Ambev: R$ 8.2k</div>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center">
                      <div className="text-xs font-bold text-white truncate">Café 500g 3Corações</div>
                      <div className="text-[11px] text-slate-400 line-through">De R$ 19,90</div>
                      <div className="text-sm font-extrabold text-emerald-400">Por R$ 14,99</div>
                      <div className="mt-1 text-[10px] bg-emerald-500/20 text-emerald-300 rounded px-1 py-0.5">Giro Estimado: +180%</div>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-center">
                      <div className="text-xs font-bold text-white truncate">Contra Filé kg</div>
                      <div className="text-[11px] text-slate-400 line-through">De R$ 54,90</div>
                      <div className="text-sm font-extrabold text-emerald-400">Por R$ 39,90</div>
                      <div className="mt-1 text-[10px] bg-emerald-500/20 text-emerald-300 rounded px-1 py-0.5">Verba JBS: R$ 12k</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePreview === 'trade' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase text-teal-400 tracking-wider">Gestão Comercial & JBP</span>
                    <h3 className="text-xl font-bold text-white">Portal de Acordos de Trade Marketing e Auditoria</h3>
                  </div>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 font-bold">
                    +R$ 4,8 Mi em Verbas Ativas
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-teal-400" />
                      <span>Contratos de Mídia & Espaço de Loja</span>
                    </h4>
                    <p className="text-xs text-slate-400">Gerencie verbas de encarte, pontas de gôndola, ilhas promocionais e banners digitais com a indústria farmacêutica e alimentícia.</p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Store className="w-4 h-4 text-emerald-400" />
                      <span>Trade App Control (Comprovação no PDV)</span>
                    </h4>
                    <p className="text-xs text-slate-400">Equipe de campo tira fotos geolocalizadas do ponto de venda para comprovação e liberação imediata do faturamento de trade.</p>
                  </div>
                </div>
              </div>
            )}

            {activePreview === 'inteligencia' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase text-cyan-400 tracking-wider">Analytics & Elasticidade</span>
                    <h3 className="text-xl font-bold text-white">Inteligência Competitiva e Análise Preditiva de Preços</h3>
                  </div>
                  <span className="text-xs bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30 font-bold">
                    Pesquisa de Concorrência em Tempo Real
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                    <span>Matriz de Atratividade Promocional</span>
                  </h4>
                  <p className="text-xs text-slate-400">Identifique quais produtos da sua curva A realmente atraem fluxo de clientes e quais apenas queimam margem sem gerar receita incremental.</p>
                </div>
              </div>
            )}

            {/* Bottom bar inside preview */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Demonstrativo Interativo da Plataforma SmartRetail AI</span>
              </span>
              <button 
                onClick={onOpenDemo}
                className="text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>Ver todos os recursos da plataforma</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Ticker Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4">
          {PLATFORM_STATS.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 backdrop-blur-sm text-center hover:border-emerald-500/40 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-outfit">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
