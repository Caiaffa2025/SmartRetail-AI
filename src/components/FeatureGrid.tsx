import React from 'react';
import { ShoppingCart, FileText, Target, ShieldCheck, Database, Smartphone, Zap, Sparkles, Layers, ArrowRight } from 'lucide-react';

interface FeatureGridProps {
  onOpenDemo: () => void;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ onOpenDemo }) => {
  const features = [
    {
      icon: ShoppingCart,
      title: 'Gestão Inteligente de Ofertas',
      description: 'Defina fluxos de aprovação comercial, estabeleça metas de margem e valide preços em tempo real com regras diretas do seu ERP.',
      badge: 'Core Platform'
    },
    {
      icon: FileText,
      title: 'Diagramação Automática de Encartes',
      description: 'Gere tablóides digitais e impressos, cartazes de gôndola e Stories para redes sociais sem necessidade de softwares gráficos complexos.',
      badge: 'Automação Visual'
    },
    {
      icon: Target,
      title: 'Trade Marketing & Gestão de JBP',
      description: 'Organize a negociação de verbas de cooperação comercial com a indústria, gerencie ativos de mídia e acompanhe a rentabilidade.',
      badge: 'Indústria & Varejo'
    },
    {
      icon: Smartphone,
      title: 'Trade App Control (Campo & PDV)',
      description: 'Acompanhe a execução física nas lojas com fotos geolocalizadas do ponto de venda, garantindo a comprovação das ações contratadas.',
      badge: 'Auditoria em Campo'
    },
    {
      icon: Database,
      title: 'Integração Nativa com ERPs',
      description: 'Homologado com TOTVS Consinco/RMS, Linx, Senior, SAP e mais de 20 ERPs varejistas com sincronização em tempo real.',
      badge: '100% Sincronizado'
    },
    {
      icon: Sparkles,
      title: 'Inteligência Competitiva & Precificação',
      description: 'Monitore ofertas da concorrência, analise elasticidade de vendas por categoria e otimize preços promocionais com auxílio de IA.',
      badge: 'IA Preditiva'
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-950 border-t border-slate-800/60 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Ecossistema Varejista Completo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
            Soluções Especializadas para o Seu Segmento
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Da definição de preço à impressão do cartaz no PDV, o SmartRetail AI automatiza todo o ciclo de vida promocional do varejo.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all duration-300 group space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {feat.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {feat.description}
                </p>

                <div className="pt-2 flex items-center text-xs font-bold text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                  <span>Saber mais</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 p-8 rounded-3xl border border-emerald-500/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-white">Quer ver como o SmartRetail AI funciona no seu ERP?</h3>
            <p className="text-xs text-slate-300">Agende uma demonstração ao vivo adaptada ao tamanho e segmento da sua rede.</p>
          </div>
          <button
            onClick={onOpenDemo}
            className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all cursor-pointer shrink-0"
          >
            Solicitar Demonstração sem Compromisso
          </button>
        </div>

      </div>
    </section>
  );
};
