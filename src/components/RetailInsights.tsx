import React, { useState, useEffect } from 'react';
import { Search, Globe, TrendingUp, Sparkles, RefreshCw, ExternalLink, ShieldCheck, Newspaper, Tag, Lightbulb, BookmarkCheck, ArrowUpRight } from 'lucide-react';

interface Article {
  title: string;
  snippet: string;
  category: string;
  impactScore: string;
  tag: string;
  url?: string;
}

interface Source {
  title: string;
  uri: string;
}

interface InsightsData {
  summary: string;
  lastUpdated: string;
  articles: Article[];
  keyTakeaways: string[];
  sources?: Source[];
  webSearchQueries?: string[];
  source?: string;
}

export const RetailInsights: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Geral');
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<InsightsData | null>(null);

  const categories = [
    { id: 'Geral', label: 'Todas as Tendências' },
    { id: 'IA em Supermercados', label: 'IA em Supermercados' },
    { id: 'Trade Marketing', label: 'Trade Marketing & Retail Media' },
    { id: 'Encartes Digitais', label: 'Encartes & WhatsApp' },
    { id: 'Precificação Dinâmica', label: 'Precificação & Margem' }
  ];

  const fetchInsights = async (searchTopic?: string) => {
    setLoading(true);
    try {
      const activeTopic = searchTopic !== undefined ? searchTopic : topic;
      const res = await fetch('/api/retail-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: activeTopic || (selectedCategory !== 'Geral' ? selectedCategory : ''),
          region: 'Brasil e América Latina'
        })
      });
      const data = await res.json();
      if (data && data.success) {
        setInsights(data);
      }
    } catch (err) {
      console.error('Failed to fetch retail insights:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    const searchVal = catId === 'Geral' ? '' : catId;
    fetchInsights(searchVal);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchInsights();
  };

  return (
    <section id="retail-insights" className="py-20 bg-slate-950 border-t border-slate-800 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-inner">
            <Globe className="w-3.5 h-3.5" />
            <span>Google Search Grounding Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-outfit mb-4">
            Retail Insights & Tendências em Tempo Real
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Acompanhe em tempo real as últimas inovações tecnológicas, estudos de mercado e movimentações do varejo supermercadista com inteligência conectada diretamente à busca do Google.
          </p>
        </div>

        {/* Search & Category Filter Control Bar */}
        <div className="bg-slate-900/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-2xl mb-10">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3 mb-5">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex: IA em supermercados, Retail Media, precificação dinâmica em atacarejos..."
                className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm hover:shadow-lg hover:shadow-emerald-500/20 transition-all disabled:opacity-50 whitespace-nowrap cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Pesquisando no Google...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Buscar Tendências</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs text-slate-400 font-medium mr-2 flex items-center gap-1 shrink-0">
              <Tag className="w-3.5 h-3.5 text-emerald-400" /> Tópicos Populares:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-semibold'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Animated Skeleton Loaders */}
        {loading && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Executive Summary Skeleton Banner */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl animate-pulse">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-800 shrink-0" />
                  <div className="space-y-2">
                    <div className="h-5 w-48 sm:w-64 bg-slate-800 rounded-lg" />
                    <div className="h-3 w-32 bg-slate-800/60 rounded" />
                  </div>
                </div>
                <div className="h-7 w-36 bg-slate-800 rounded-lg shrink-0" />
              </div>

              {/* Summary Text Skeleton */}
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2.5">
                <div className="h-4 w-full bg-slate-800/80 rounded" />
                <div className="h-4 w-11/12 bg-slate-800/80 rounded" />
                <div className="h-4 w-3/4 bg-slate-800/60 rounded" />
              </div>

              {/* Takeaways Skeleton Grid */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="h-3 w-3/4 bg-slate-800 rounded" />
                    <div className="h-3 w-1/2 bg-slate-800/60 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Articles Grid Skeleton */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-6 w-56 bg-slate-800 rounded-lg animate-pulse" />
                <div className="h-4 w-24 bg-slate-800/60 rounded animate-pulse" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg animate-pulse">
                    <div className="flex items-center justify-between">
                      <div className="h-5 w-24 bg-slate-800 rounded-md" />
                      <div className="h-4 w-16 bg-slate-800/60 rounded" />
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="h-4 w-full bg-slate-800 rounded" />
                      <div className="h-4 w-4/5 bg-slate-800 rounded" />
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="h-3 w-full bg-slate-800/60 rounded" />
                      <div className="h-3 w-11/12 bg-slate-800/60 rounded" />
                      <div className="h-3 w-2/3 bg-slate-800/40 rounded" />
                    </div>

                    <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                      <div className="h-3 w-28 bg-slate-800 rounded" />
                      <div className="h-4 w-16 bg-slate-800/80 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Insights Results Display */}
        {!loading && insights && (
          <div className="space-y-8 animate-in fade-in duration-500">
            
            {/* Executive Summary Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-outfit">Resumo Executivo do Varejo Tech</h3>
                    <p className="text-xs text-slate-400">Atualizado recentemente • {insights.lastUpdated}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-emerald-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Google Search Grounded</span>
                </div>
              </div>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                "{insights.summary}"
              </p>

              {/* Key Takeaways */}
              {insights.keyTakeaways && insights.keyTakeaways.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-800/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" /> Destaques Estratégicos & Desdobramentos:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {insights.keyTakeaways.map((takeaway, idx) => (
                      <div key={idx} className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300">
                        <BookmarkCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Articles Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white font-outfit flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-emerald-400" />
                  <span>Tendências & Notícias Recentes</span>
                </h3>
                <span className="text-xs text-slate-400">Mostrando {insights.articles?.length || 0} análises</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insights.articles && insights.articles.map((article, idx) => (
                  <div 
                    key={idx} 
                    className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/40 hover:bg-slate-900 transition-all duration-300 group shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold">
                          {article.category || 'Varejo Tech'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {article.impactScore || 'Estratégico'}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-2.5 line-clamp-2">
                        {article.title}
                      </h4>

                      <p className="text-slate-400 text-xs leading-relaxed mb-4">
                        {article.snippet}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between mt-auto">
                      <span className="text-[11px] text-emerald-400 font-medium">
                        {article.tag || 'Tendência Varejo'}
                      </span>
                      <a
                        href={article.url || `https://www.google.com/search?q=${encodeURIComponent(article.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-colors"
                      >
                        <span>Explorar</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Citation Sources Footer */}
            {insights.sources && insights.sources.length > 0 && (
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 sm:p-5 text-xs text-slate-400">
                <div className="flex items-center gap-2 font-semibold text-slate-300 mb-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>Fontes Grounded pelo Google Search:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {insights.sources.map((src, idx) => (
                    <a
                      key={idx}
                      href={src.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-all text-[11px]"
                    >
                      <span className="truncate max-w-[200px]">{src.title || src.uri}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
