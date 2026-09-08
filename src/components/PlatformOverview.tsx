import React, { useState } from 'react';
import { 
  Building2, ShoppingCart, Zap, Target, BarChart3, Bot, CheckCircle2, 
  ArrowRight, ShieldCheck, Layers, RefreshCw, Sparkles, FileText, 
  DollarSign, Store, Smartphone, Mail, Globe, Users, TrendingUp, AlertTriangle,
  ChevronRight, Laptop, Award, Percent, HelpCircle
} from 'lucide-react';

interface PlatformOverviewProps {
  onOpenDemo?: () => void;
  onExploreModule?: (sectionId: string) => void;
}

export const PlatformOverview: React.FC<PlatformOverviewProps> = ({ onOpenDemo, onExploreModule }) => {
  const [activeTab, setActiveTab] = useState<'what-is' | 'pillars' | 'pains' | 'workflow' | 'erps'>('what-is');

  const RETAIL_PAINS = [
    {
      pain: 'Lentidão e Erros no Marketing',
      description: 'Equipes levam dias para diagramar encartes no Photoshop/InDesign, sujeitas a preços desatualizados e divergência com o caixa.',
      solution: 'Geração automatizada de tablóides, banners e cartazes em segundos com puxada direta de preços do ERP sem risco de digitação humana.',
      impact: '-85% tempo de produção'
    },
    {
      pain: 'Verbas de Trade Marketing Perdidas',
      description: 'Fornecedores e indústrias financiam ofertas (sell-out), mas a falta de comprovação ágil faz a rede perder o reembolso comercial.',
      solution: 'Portal de Trade Marketing onde fornecedores contratam cotas digitais e recebem relatórios automatizados de comprovação de veiculação.',
      impact: '+18% arrecadação de verbas'
    },
    {
      pain: 'Reação Tardia à Concorrência',
      description: 'Falta de visibilidade sobre reduções agressivas de preços de concorrentes no mesmo bairro ou região geográfica.',
      solution: 'Dashboard de Inteligência de Preços com alertas automáticos via WhatsApp e Push sobre quedas de preços e encartes rivais.',
      impact: '100% monitoramento em tempo real'
    },
    {
      pain: 'Divergência entre Preço de Gôndola e Caixa',
      description: 'Preço anunciado no encarte impresso difere do sistema de PDV, causando atrito no checkout e multas dos órgãos de proteção.',
      solution: 'Sincronizador Universal com validação tripla (ERP ➔ Encarte ➔ PDV) e geração instantânea de cartazes com código de barras.',
      impact: '0% divergência de preço'
    }
  ];

  const CORE_PILLARS = [
    {
      id: 'encartes',
      title: 'Estúdio Omnichannel de Encartes & Mídias',
      icon: FileText,
      badge: 'Automação de Layouts',
      color: 'from-emerald-500 to-teal-500',
      description: 'Plataforma inteligente que transforma tabelas do ERP em encartes impressos, tablóides digitais, stories de Instagram, catálogos de WhatsApp e cartazes de PDV em segundos.',
      capabilities: [
        'Diagramação automática em múltiplos formatos (A4, A3, Story, Square, Tablóide)',
        'Remoção automática de fundo de imagens de produtos com IA',
        'Impressão de etiquetas de oferta e cartazes com código de barras e QR Code',
        'Sincronização direta de preços promocionais sem necessidade de digitação'
      ]
    },
    {
      id: 'trade',
      title: 'Portal de Trade Marketing & Verbas da Indústria',
      icon: Target,
      badge: 'Monetização de Espaços',
      color: 'from-amber-500 to-orange-500',
      description: 'Ambiente B2B para negociação, contratação e comprovação de cotas cooperadas com indústrias e marcas fabricantes (FMCG).',
      capabilities: [
        'Venda de cotas de destaque em encartes, topo de tablóide e ilhas de PDV',
        'Contratos digitais e aprovação instantânea de artes pelas marcas parceiras',
        'Geração de dossiê fotográfico e clipping automático de comprovação (Proof of Performance)',
        'Cálculo de ROI por campanha e divisão transparente de custos de veiculação'
      ]
    },
    {
      id: 'intelligence',
      title: 'Inteligência de Precificação & Elasticidade',
      icon: BarChart3,
      badge: 'Proteção de Margem',
      color: 'from-teal-500 to-cyan-500',
      description: 'Engine analítico que rastreia preços da concorrência, simula elasticidade preço-demanda e emite alertas antes de afetar a margem.',
      capabilities: [
        'Monitoramento de encartes e preços de redes concorrentes no mesmo raio de atuação',
        'Simulador de elasticidade para prever o volume de vendas x impacto na margem bruta',
        'Gatilhos configuráveis de alertas de preços via Email, Push App e WhatsApp',
        'Gráficos históricos de oscilação de preços de categorias e marcas líderes'
      ]
    },
    {
      id: 'copilot',
      title: 'AI Retail Copilot & Assistente Estratégico',
      icon: Bot,
      badge: 'Inteligência Generativa',
      color: 'from-cyan-500 to-blue-500',
      description: 'Assistente treinado em dados varejistas que analisa mix de ofertas, sugere copywriting persuasivo e identifica oportunidades de margem.',
      capabilities: [
        'Sugestão automática de produtos "chamariz" (traffic drivers) para capa de encarte',
        'Geração automática de chamadas comerciais para rádio interna e redes sociais',
        'Análise preditiva de giro de estoque para evitar ruptura durante a promoção',
        'Consultoria em linguagem natural baseada nas melhores práticas de pricing do varejo'
      ]
    }
  ];

  const WORKFLOW_STEPS = [
    {
      number: '01',
      title: 'Negociação no Hub Trade',
      subtitle: 'Indústria & Varejo',
      description: 'A equipe comercial define as ofertas com a indústria parceira e reserva cotas patrocinadas no portal.'
    },
    {
      number: '02',
      title: 'Sincronização no ERP',
      subtitle: 'Integração de Preços',
      description: 'O preço promocional e o período de validade são atualizados automaticamente no ERP (TOTVS, SAP, etc).'
    },
    {
      number: '03',
      title: 'Criação com IA em Segundos',
      subtitle: 'Estúdio de Mídia',
      description: 'O sistema puxa a lista de produtos e diagramas em dezenas de formatos gráficos prontos para publicação.'
    },
    {
      number: '04',
      title: 'Disparo Multicanal & PDV',
      subtitle: 'Omnichannel & Loja',
      description: 'Os encartes são enviados para WhatsApp, redes sociais e os cartazes são impressos na loja física.'
    },
    {
      number: '05',
      title: 'Comprovação & Reembolso',
      subtitle: 'Auditoria de Trade',
      description: 'O relatório de comprovação é gerado automaticamente para que o varejista receba o reembolso da indústria.'
    }
  ];

  const RETAIL_SECTORS = [
    { name: 'Supermercados & Hipermercados', count: '+1.200 lojas', icon: ShoppingCart },
    { name: 'Atacarejo & Cash & Carry', count: '+450 unidades', icon: Store },
    { name: 'Redes de Drogarias & Farmácias', count: '+800 pontos', icon: Zap },
    { name: 'Home Centers & Construção', count: '+300 redes', icon: Building2 },
    { name: 'Hortifruti & Especializados', count: '+500 lojas', icon: Sparkles }
  ];

  return (
    <section id="platform-overview" className="py-20 bg-slate-950 border-t border-slate-800/80 relative overflow-hidden scroll-mt-24">
      
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Entenda a Plataforma SmartRetail</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-outfit leading-tight">
            O Sistema Operacional Completo para a <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Gestão de Ofertas e Trade Marketing
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            O <strong>SmartRetail AI</strong> é a solução SaaS B2B criada para unificar o planejamento comercial, a diagramação de encartes, o controle de verbas da indústria e a inteligência de preços no varejo alimentício e especializado.
          </p>
        </div>

        {/* Navigation Tabs for Platform Deep-Dive */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 max-w-full">
            <button
              onClick={() => setActiveTab('what-is')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'what-is'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>O que é a Plataforma</span>
            </button>

            <button
              onClick={() => setActiveTab('pillars')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'pillars'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Os 4 Pilares da Plataforma</span>
            </button>

            <button
              onClick={() => setActiveTab('pains')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'pains'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Dores do Varejo que Solucionamos</span>
            </button>

            <button
              onClick={() => setActiveTab('workflow')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'workflow'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Fluxo de Execução</span>
            </button>
          </div>
        </div>

        {/* TAB 1: O QUE É A PLATAFORMA */}
        {activeTab === 'what-is' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Definição & Conceito Central</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-outfit leading-snug">
                Substitua planilhas paralelas, softwares lentos e processos manuais por uma única plataforma inteligente.
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                No varejo tradicional, a criação de uma campanha promocional envolve múltiplos departamentos: o setor comercial negocia com a indústria, o marketing cria os materiais gráficos no Photoshop, a TI cadastra o preço no ERP, e a loja imprime os cartazes. Essa fragmentação causa erros frequentes de preços, atrasos na veiculação e perda de verbas da indústria.
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                O <strong>SmartRetail AI</strong> conecta todos esses elos em um fluxo contínuo e automatizado. Ao integrar-se diretamente ao ERP da sua rede varejista, a plataforma elimina 85% do trabalho operacional e assegura que o preço negociado seja exatamente o mesmo no encarte impresso, no WhatsApp, no aplicativo e no caixa da loja.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Conexão Direta ao ERP</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Sincronia nativa com TOTVS, SAP, Linx, Senior, Consinco, Bluesoft e sistemas locais de PDV.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                    <Award className="w-4 h-4" />
                    <span>Compliance e Segurança</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Trilha de auditoria completa, conformidade com a LGPD e níveis customizáveis de acesso por perfil de usuário.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Card Visual */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Store className="w-4 h-4" />
                <span>Setores Varejistas Atendidos</span>
              </h4>

              <div className="space-y-3">
                {RETAIL_SECTORS.map((sector, idx) => {
                  const Icon = sector.icon;
                  return (
                    <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/30 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-200">{sector.name}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        {sector.count}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-800 text-center">
                <button
                  onClick={onOpenDemo}
                  className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  Agendar Apresentação Técnica
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OS 4 PILARES */}
        {activeTab === 'pillars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {CORE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.id} className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 p-6 sm:p-8 rounded-3xl space-y-5 transition-all shadow-xl group">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-outfit">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{pillar.description}</p>

                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Recursos Principais:</p>
                    {pillar.capabilities.map((cap, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: DORES QUE SOLUCIONAMOS */}
        {activeTab === 'pains' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {RETAIL_PAINS.map((item, idx) => (
              <div key={idx} className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    <h4 className="text-base font-bold text-white font-outfit">{item.pain}</h4>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    {item.impact}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong className="text-rose-400">Desafio Tradicional:</strong> {item.description}
                  </p>
                  <p className="text-xs text-slate-200 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <strong className="text-emerald-400">Solução SmartRetail:</strong> {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: FLUXO DE EXECUÇÃO */}
        {activeTab === 'workflow' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white font-outfit">
                Como Funciona na Prática a Operação
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Uma jornada simplificada de 5 etapas que garante agilidade, acurácia e monetização total das verbas de trade marketing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {WORKFLOW_STEPS.map((step, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 relative group hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-emerald-400 font-outfit">{step.number}</span>
                    <span className="text-[10px] text-slate-500 font-semibold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      Etapa {idx + 1}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">{step.title}</h4>
                    <p className="text-[11px] font-semibold text-emerald-400">{step.subtitle}</p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action Banner */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/30 p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-outfit">
              Pronto para Transformar a Gestão de Ofertas da sua Rede Varejista?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Junte-se a mais de 3.000 lojas no Brasil que utilizam a inteligência artificial para potencializar margens, automatizar tablóides e recuperar verbas da indústria.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onOpenDemo}
              className="px-8 py-4 rounded-2xl bg-emerald-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/25 hover:bg-emerald-400 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Solicitar Demonstração</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
