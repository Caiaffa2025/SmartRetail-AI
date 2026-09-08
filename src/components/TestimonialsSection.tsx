import React from 'react';
import { SUCCESS_CASES, ERP_INTEGRATIONS } from '../data/retailData';
import { Quote, Building2, CheckCircle2, Server } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Testimonials Block */}
        <div>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Quote className="w-3.5 h-3.5" />
              <span>Casos de Sucesso no Varejo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
              O Que Dizem os Maiores Grupos Varejistas
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Veja como grandes redes de supermercados, atacarejos e farmácias revolucionaram suas operações promocionais.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUCCESS_CASES.map((item) => (
              <div 
                key={item.id}
                className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      {item.resultMetric}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.storesCount} Lojas</span>
                  </div>

                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{item.testimonialText}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-emerald-400 shrink-0 border border-slate-700">
                    {item.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{item.authorName}</div>
                    <div className="text-[10px] text-slate-400">{item.authorRole} — {item.clientName}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ERP Integrations Grid */}
        <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase text-teal-400">
              <Server className="w-4 h-4" />
              <span>Conectividade Total</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white font-outfit">
              100% Homologado com seu ERP Varejista
            </h3>
            <p className="text-xs text-slate-400">
              Sem retrabalho manual ou digitação duplicada de preços. As ofertas fluem direto do ERP para encartes, cartazes e PDVs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ERP_INTEGRATIONS.map((erp, idx) => (
              <div 
                key={idx}
                className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex items-start gap-3 hover:border-teal-500/40 transition-colors"
              >
                <div className="text-2xl p-2 bg-slate-900 rounded-lg border border-slate-800 shrink-0">
                  {erp.logo}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{erp.name}</h4>
                  <span className="text-[10px] font-semibold text-teal-400 block">{erp.category}</span>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal">{erp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
