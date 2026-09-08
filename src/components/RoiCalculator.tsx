import React, { useState } from 'react';
import { Calculator, ArrowRight, Clock, DollarSign, TrendingUp, ShieldCheck, Sparkles } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenDemo: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenDemo }) => {
  const [storeCount, setStoreCount] = useState<number>(12);
  const [campaignsPerMonth, setCampaignsPerMonth] = useState<number>(8);
  const [teamSize, setTeamSize] = useState<number>(4);

  // Math calculations
  const hoursSavedPerMonth = Math.round(storeCount * campaignsPerMonth * 3.5);
  const costSavingsPerYear = Math.round(hoursSavedPerMonth * 65 * 12);
  const extraTradeVerbaGained = Math.round(storeCount * 24000);

  return (
    <section id="roi-calculator" className="py-20 bg-slate-950 border-t border-slate-800/60 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulador de Retorno sobre Investimento</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
            Calcule o ROI e a Economia para a sua Rede Varejista
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Descubra quantas horas operacionais sua equipe economizará mensalmente e o ganho financeiro direto com a automação do SmartRetail AI.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sliders Input Panel (6 cols) */}
          <div className="lg:col-span-6 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Slider 1: Store Count */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                <span>Número de Lojas Físicas / Filiais:</span>
                <span className="text-emerald-400 text-sm font-mono">{storeCount} Lojas</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={storeCount}
                onChange={(e) => setStoreCount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 loja</span>
                <span>50 lojas</span>
                <span>100+ lojas</span>
              </div>
            </div>

            {/* Slider 2: Campaigns per Month */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                <span>Campanhas / Encartes por Mês:</span>
                <span className="text-teal-400 text-sm font-mono">{campaignsPerMonth} Campanhas</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={campaignsPerMonth}
                onChange={(e) => setCampaignsPerMonth(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 /mês</span>
                <span>15 /mês</span>
                <span>30 /mês</span>
              </div>
            </div>

            {/* Slider 3: Marketing Team Size */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                <span>Equipe Operacional de Marketing & Cadastros:</span>
                <span className="text-cyan-400 text-sm font-mono">{teamSize} Pessoas</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={teamSize}
                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 pessoa</span>
                <span>10 pessoas</span>
                <span>20+ pessoas</span>
              </div>
            </div>

          </div>

          {/* Results Display Box (6 cols) */}
          <div className="lg:col-span-6 bg-gradient-to-b from-slate-900/90 to-slate-950 rounded-3xl border border-emerald-500/40 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            
            <div className="text-xs font-extrabold uppercase text-emerald-400 tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Estimativa Anual de Impacto Operacional & Financeiro</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Horas Salvas/Mês</span>
                </div>
                <div className="text-2xl font-extrabold text-white font-outfit">
                  {hoursSavedPerMonth.toLocaleString('pt-BR')} h
                </div>
                <div className="text-[10px] text-emerald-400 font-semibold">
                  Equivale a -85% de tempo de diagramação
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Economia Anual Estimada</span>
                </div>
                <div className="text-2xl font-extrabold text-emerald-400 font-outfit">
                  R$ {costSavingsPerYear.toLocaleString('pt-BR')}
                </div>
                <div className="text-[10px] text-slate-400">
                  Em horas de equipe e redução de erros
                </div>
              </div>

              <div className="col-span-1 sm:col-span-2 bg-slate-950 p-4 rounded-2xl border border-emerald-500/30 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <TrendingUp className="w-4 h-4 text-teal-400" />
                  <span>Projeção de Verbas de Trade Recuperadas/Ano</span>
                </div>
                <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 font-outfit">
                  R$ {extraTradeVerbaGained.toLocaleString('pt-BR')}
                </div>
                <p className="text-[11px] text-slate-400">
                  Com o controle de comprovação de execução no PDV via Trade App Control e auditoria de contratos.
                </p>
              </div>

            </div>

            <button
              onClick={onOpenDemo}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apresentar Proposta para Minha Diretoria</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
