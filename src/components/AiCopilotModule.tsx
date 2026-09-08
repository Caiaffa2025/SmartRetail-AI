import React, { useState } from 'react';
import { Bot, Sparkles, ArrowRight, RefreshCw, CheckCircle2, Zap, Award, Target } from 'lucide-react';

interface RecommendationItem {
  product: string;
  type: string;
  regularPrice: string;
  promoPrice: string;
  margin: string;
  expectedVolumeBoost: string;
  channel: string;
  strategyReason: string;
}

export const AiCopilotModule: React.FC = () => {
  const [sector, setSector] = useState<string>('Supermercado');
  const [goal, setGoal] = useState<string>('Aumentar Margem e Atrair Fluxo');
  const [category, setCategory] = useState<string>('Mercearia Básica e Bebidas');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{
    campaignTitle?: string;
    estimatedROI?: string;
    recommendations?: RecommendationItem[];
    source?: string;
  } | null>(null);

  const handleFetchAiSuggestions = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/copilot/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sector, goal, category })
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error fetching copilot suggestions:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="copilot" className="py-20 bg-slate-950 border-t border-slate-800/60 relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>Inteligência Artificial Generativa Gemini</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
            SmartRetail AI Copilot — Sugestões de Ofertas com IA
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Pergunte à inteligência artificial de varejo sobre quais itens colocar na capa do encarte, margens ideais e táticas para competir contra grandes concorrentes.
          </p>
        </div>

        {/* Main Interface */}
        <div className="mt-12 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl">
          
          <form onSubmit={handleFetchAiSuggestions} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-slate-400 block mb-1.5">Segmento do Varejo</label>
              <select
                value={sector}
                onChange={e => setSector(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-semibold focus:outline-none focus:border-emerald-500"
              >
                <option value="Supermercado">Supermercado de Bairro</option>
                <option value="Atacarejo">Atacarejo / Cash & Carry</option>
                <option value="Farmácia e Drogaria">Farmácia & Drogaria</option>
                <option value="Home Center">Home Center & Material de Construção</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-400 block mb-1.5">Objetivo Estratégico</label>
              <select
                value={goal}
                onChange={e => setGoal(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-semibold focus:outline-none focus:border-emerald-500"
              >
                <option value="Aumentar Margem e Atrair Fluxo">Atrair Fluxo de Clientes (Chamariz)</option>
                <option value="Maximizar Lucro Líquido">Maximizar Margem do Lote</option>
                <option value="Queima de Estoque">Giro de Estoque e Redução de Perdas</option>
                <option value="Combate à Concorrência">Bloqueio da Concorrência Local</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-400 block mb-1.5">Categoria Foco</label>
              <input
                type="text"
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="Ex: Mercearia, Bebidas, Higiene"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-semibold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Analisando com IA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Gerar Plano de Ofertas IA</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* AI Result Box */}
          {result && (
            <div className="mt-8 pt-6 border-t border-slate-800 animate-in fade-in duration-300 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-emerald-500/30">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Recomendação Gerada por Inteligência Artificial</span>
                  <h3 className="text-lg font-bold text-white">{result.campaignTitle}</h3>
                </div>
                <div className="text-xs font-bold text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                  Estimativa de Impacto: {result.estimatedROI}
                </div>
              </div>

              {/* Recommendations Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.recommendations?.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 relative">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                        {item.type}
                      </span>
                      <span className="text-slate-400 font-mono text-[10px]">
                        Giro: {item.expectedVolumeBoost}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-tight">{item.product}</h4>

                    <div className="flex items-baseline justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800/80">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Preço De</span>
                        <span className="text-xs text-slate-400 line-through font-mono">{item.regularPrice}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-emerald-400 block font-bold">Por (Sugerido)</span>
                        <span className="text-base font-extrabold text-emerald-400 font-mono">{item.promoPrice}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/50 space-y-1">
                      <div className="text-[10px] font-bold text-teal-400">Tática Comercial:</div>
                      <p className="text-[11px] text-slate-400 leading-normal">{item.strategyReason}</p>
                    </div>

                    <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                      <Target className="w-3 h-3 text-emerald-400" />
                      <span>Canais: {item.channel}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {!result && !loading && (
            <div className="mt-8 pt-6 border-t border-slate-800 text-center py-6 text-slate-400 text-xs">
              Selecione o segmento e clique em <strong className="text-emerald-400">"Gerar Plano de Ofertas IA"</strong> para visualizar a análise estratégica preditiva.
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
