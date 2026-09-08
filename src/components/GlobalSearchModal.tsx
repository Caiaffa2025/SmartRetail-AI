import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, X, FileText, Target, LayoutDashboard, Bot, Globe, Calculator, 
  Building2, BookOpen, ArrowRight, Sparkles, Sliders, ShieldCheck, 
  HelpCircle, ChevronRight, CornerDownLeft, ExternalLink, RefreshCw
} from 'lucide-react';

export interface SearchResultItem {
  id: string;
  title: string;
  category: 'módulos' | 'doc' | 'ações';
  description: string;
  icon: React.ElementType;
  sectionId?: string;
  actionType?: 'section' | 'doc' | 'demo';
  tags: string[];
  docDetails?: {
    summary: string;
    steps?: string[];
  };
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (sectionId: string) => void;
  onOpenDemo: () => void;
}

const SEARCH_ITEMS: SearchResultItem[] = [
  // Módulos
  {
    id: 'mod-tabloid',
    title: 'Gerador de Encartes & Tablóides',
    category: 'módulos',
    description: 'Diagramação automática em segundos, remoção de fundo com IA e exportação de cartazes de PDV.',
    icon: FileText,
    sectionId: 'tabloid-studio',
    actionType: 'section',
    tags: ['encarte', 'tabloide', 'oferta', 'pdf', 'cartaz', 'ia', 'imagem', 'layout', 'pdv']
  },
  {
    id: 'mod-trade',
    title: 'Portal de Trade Marketing & Verbas',
    category: 'módulos',
    description: 'Gestão de cotas com indústrias parceiras, contratos digitais e comprovação fotográfica (sell-out).',
    icon: Target,
    sectionId: 'trade-hub',
    actionType: 'section',
    tags: ['trade', 'industria', 'cota', 'verba', 'patrocinio', 'ambev', 'nestle', 'comprovacao']
  },
  {
    id: 'mod-intelligence',
    title: 'Inteligência de Precificação & Alertas',
    category: 'módulos',
    description: 'Simulador de elasticidade de preço, gráfico histórico e configuração de alertas via WhatsApp/Push.',
    icon: LayoutDashboard,
    sectionId: 'intelligence',
    actionType: 'section',
    tags: ['preco', 'pricing', 'concorrente', 'elasticidade', 'margem', 'alerta', 'whatsapp', 'historico']
  },
  {
    id: 'mod-copilot',
    title: 'AI Retail Copilot & Estratégia',
    category: 'módulos',
    description: 'Assistente generativo treinado em varejo para sugestão de mix de capa e copywriting persuasivo.',
    icon: Bot,
    sectionId: 'copilot',
    actionType: 'section',
    tags: ['ia', 'copilot', 'chat', 'sugestao', 'copywriting', 'capa', 'chamariz']
  },
  {
    id: 'mod-insights',
    title: 'Retail Insights (Google Grounding)',
    category: 'módulos',
    description: 'Tendências e notícias do mercado varejista em tempo real atualizadas via busca online.',
    icon: Globe,
    sectionId: 'retail-insights',
    actionType: 'section',
    tags: ['noticias', 'tendencias', 'google', 'busca', 'mercado', 'supermercado', 'insights']
  },
  {
    id: 'mod-roi',
    title: 'Calculadora de ROI por Canal',
    category: 'módulos',
    description: 'Simulador de retorno sobre investimento em encartes impressos, WhatsApp e mídia PDV.',
    icon: Calculator,
    sectionId: 'roi-calculator',
    actionType: 'section',
    tags: ['roi', 'calculadora', 'retorno', 'investimento', 'canal', 'faturamento', 'simulacao']
  },
  {
    id: 'mod-overview',
    title: 'A Plataforma (Visão Geral)',
    category: 'módulos',
    description: 'Conceitos centrais, integração com ERPs e dores do varejo solucionadas.',
    icon: Building2,
    sectionId: 'platform-overview',
    actionType: 'section',
    tags: ['plataforma', 'visao geral', 'erp', 'totvs', 'sap', 'linx', 'solucao']
  },

  // Documentação
  {
    id: 'doc-erp',
    title: 'Como integrar com ERPs (TOTVS, SAP, Consinco)',
    category: 'doc',
    description: 'Guia de integração de tabelas de preços, estoque e códigos de barras com atualização automática.',
    icon: BookOpen,
    actionType: 'doc',
    tags: ['erp', 'integracao', 'totvs', 'sap', 'consinco', 'linx', 'senior', 'pdv', 'api'],
    docDetails: {
      summary: 'A plataforma SmartRetail integra-se via API REST, Webhooks ou conectores nativos de banco de dados com ERPs varejistas.',
      steps: [
        'Acesse as configurações do seu ERP e solicite a chave de integração API.',
        'No painel SmartRetail, insira a URL do conector e valide a credencial.',
        'Mapeie os campos de Preço Normal, Preço Promocional, Código EAN e Descrição.',
        'Ative a sincronização contínua de ofertas para evitar divergências no caixa.'
      ]
    }
  },
  {
    id: 'doc-alerts',
    title: 'Como configurar Alertas de Preços via WhatsApp e Push',
    category: 'doc',
    description: 'Instruções para cadastrar limites de preço e canais de notificação imediata para a equipe de precificação.',
    icon: BookOpen,
    actionType: 'doc',
    tags: ['alerta', 'whatsapp', 'push', 'email', 'notificacao', 'limite', 'margem'],
    docDetails: {
      summary: 'Defina gatilhos operacionais no painel de Inteligência para ser avisado quando um concorrente baixar preços de categorias chave.',
      steps: [
        'Vá para a seção "Inteligência de Preços" ➔ "Alertas de Preço".',
        'Clique em "+ Novo Alerta de Preço".',
        'Selecione a categoria desejada (ex: Cervejas e Bebidas).',
        'Defina a porcentagem de queda de preço (ex: 5%) e marque as opções de envio via WhatsApp ou Email.'
      ]
    }
  },
  {
    id: 'doc-trade-contract',
    title: 'Como formalizar cotas de Trade Marketing com a indústria',
    category: 'doc',
    description: 'Passo a passo para negociar patrocínios em encartes e anexar fotos de comprovação para reembolso.',
    icon: BookOpen,
    actionType: 'doc',
    tags: ['trade', 'cota', 'patrocinio', 'contrato', 'reembolso', 'sell-out', 'comprovacao'],
    docDetails: {
      summary: 'Garante o ressarcimento ágil da verba cooperada negociada entre a diretoria comercial e os fabricantes FMCG.',
      steps: [
        'Cadastre a campanha de oferta no Hub de Trade Marketing.',
        'Selecione a cota patrocinada (ex: Topo de Encarte - R$ 15.000).',
        'Envie o link de aprovação direta para o gerente de contas do fornecedor.',
        'Após a veiculação, suba a foto da ilha no PDV para gerar o relatório de comprovação.'
      ]
    }
  },

  // Ações
  {
    id: 'act-demo',
    title: 'Agendar Demonstração Técnica com Especialista',
    category: 'ações',
    description: 'Solicite um atendimento personalizado para a sua rede de supermercados com simulação real de ROI.',
    icon: Sparkles,
    actionType: 'demo',
    tags: ['demo', 'demonstracao', 'contato', 'agendar', 'treinamento', 'comercial', 'atendimento']
  }
];

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSection,
  onOpenDemo
}) => {
  const [query, setQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<SearchResultItem | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setSelectedDoc(null);
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredItems = SEARCH_ITEMS.filter(item => {
    if (!normalizedQuery) return true;
    const matchTitle = item.title.toLowerCase().includes(normalizedQuery);
    const matchDesc = item.description.toLowerCase().includes(normalizedQuery);
    const matchTags = item.tags.some(tag => tag.toLowerCase().includes(normalizedQuery));
    return matchTitle || matchDesc || matchTags;
  });

  const handleSelectItem = (item: SearchResultItem) => {
    if (item.actionType === 'section' && item.sectionId) {
      onSelectSection(item.sectionId);
      onClose();
    } else if (item.actionType === 'demo') {
      onOpenDemo();
      onClose();
    } else if (item.actionType === 'doc') {
      setSelectedDoc(item);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Search Container Dialog */}
      <div className="relative z-10 w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200">
        
        {/* Top Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar módulos, recursos ou documentação (ex: ERP, encartes, trade)..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-slate-500 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs font-mono border border-slate-700 shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto space-y-4 divide-y divide-slate-800/60">
          
          {/* If viewing document details */}
          {selectedDoc ? (
            <div className="p-2 space-y-4 animate-in fade-in">
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 hover:underline mb-2"
              >
                ← Voltar aos resultados de busca
              </button>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">{selectedDoc.title}</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {selectedDoc.docDetails?.summary}
                </p>
              </div>

              {selectedDoc.docDetails?.steps && (
                <div className="space-y-2 pt-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Passo a Passo Recomendado:</p>
                  <div className="space-y-2">
                    {selectedDoc.docDetails.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-3 flex justify-end">
                <button
                  onClick={() => {
                    if (selectedDoc.id === 'doc-alerts') onSelectSection('intelligence');
                    else if (selectedDoc.id === 'doc-trade-contract') onSelectSection('trade-hub');
                    else onSelectSection('platform-overview');
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-400"
                >
                  <span>Acessar Módulo Relacionado</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Standard Filtered Results */
            <div>
              {filteredItems.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pb-1">
                    <span>Resultados da Busca ({filteredItems.length})</span>
                    <span>Pressione para ir</span>
                  </div>

                  <div className="space-y-1.5">
                    {filteredItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleSelectItem(item)}
                          className="group p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/50 hover:bg-slate-950 transition-all cursor-pointer flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-xs group-hover:text-emerald-300 transition-colors">
                                  {item.title}
                                </span>
                                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                  item.category === 'módulos' 
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                    : item.category === 'doc'
                                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                      : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                }`}>
                                  {item.category === 'módulos' ? 'Módulo' : item.category === 'doc' ? 'Documentativo' : 'Ação'}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-slate-500 group-hover:text-emerald-400 text-xs shrink-0 font-semibold">
                            <span>{item.actionType === 'doc' ? 'Ver Guia' : 'Ir'}</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 space-y-2">
                  <HelpCircle className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-400 font-medium">
                    Nenhum recurso encontrado para "<strong className="text-white">{query}</strong>".
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Tente buscar por termos como <span className="text-emerald-400 font-semibold">"encartes"</span>, <span className="text-emerald-400 font-semibold">"trade"</span>, <span className="text-emerald-400 font-semibold">"preços"</span> ou <span className="text-emerald-400 font-semibold">"ERP"</span>.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[10px]">ESC</kbd> Fechar
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[10px]">⌘K</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[10px]">Ctrl+K</kbd> Atalho
            </span>
          </div>

          <span className="text-emerald-400 font-bold flex items-center gap-1">
            SmartRetail AI Search
          </span>
        </div>

      </div>
    </div>
  );
};
