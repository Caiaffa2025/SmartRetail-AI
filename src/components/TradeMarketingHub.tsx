import React, { useState } from 'react';
import { SAMPLE_TRADE_AGREEMENTS } from '../data/retailData';
import { TradeAgreement } from '../types';
import { Target, DollarSign, CheckCircle2, Clock, Camera, ShieldCheck, Plus, Filter, FileText, ArrowUpRight } from 'lucide-react';

export const TradeMarketingHub: React.FC = () => {
  const [agreements, setAgreements] = useState<TradeAgreement[]>(SAMPLE_TRADE_AGREEMENTS);
  const [filterStatus, setFilterStatus] = useState<string>('todos');

  // Form for new agreement
  const [newSupplier, setNewSupplier] = useState('');
  const [newCampaign, setNewCampaign] = useState('');
  const [newMediaType, setNewMediaType] = useState<'Encarte Capa' | 'Ponta de Ilha' | 'Banner E-commerce' | 'WhatsApp Mídias'>('Encarte Capa');
  const [newInvestment, setNewInvestment] = useState('25000');

  const filteredAgreements = agreements.filter(a => {
    if (filterStatus === 'todos') return true;
    return a.status.toLowerCase().includes(filterStatus.toLowerCase());
  });

  const totalInvestmentApproved = agreements
    .filter(a => a.status === 'Aprovado')
    .reduce((sum, a) => sum + a.investmentValue, 0);

  const handleAddAgreement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSupplier || !newCampaign) return;

    const newItem: TradeAgreement = {
      id: `ta-${Date.now()}`,
      supplier: newSupplier,
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&auto=format&fit=crop&q=80',
      campaign: newCampaign,
      mediaType: newMediaType,
      investmentValue: parseFloat(newInvestment) || 15000,
      status: 'Em Negociação',
      executionRate: 0
    };

    setAgreements([newItem, ...agreements]);
    setNewSupplier('');
    setNewCampaign('');
  };

  return (
    <section id="trade-hub" className="py-20 bg-slate-950 border-t border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" />
            <span>Portal de Acordos Comerciais & JBP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-outfit">
            Trade Marketing & Negociação com a Indústria
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Centralize os contratos de cooperação comercial com fornecedores, gerencie verbas de encarte e comprove a execução nas lojas com o Trade App Control.
          </p>
        </div>

        {/* Dashboard Overview Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Total em Verbas Aprovadas</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400 font-outfit">
              R$ {totalInvestmentApproved.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-slate-400">Verbas liberadas para investimento em mídia e encartes</p>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Taxa Média de Execução em PDV</span>
              <ShieldCheck className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-3xl font-extrabold text-teal-300 font-outfit">
              93.8%
            </div>
            <p className="text-xs text-slate-400">Comprovação geolocalizada por foto via Trade App</p>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Fornecedores Ativos</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-cyan-300 font-outfit">
              48 Indústrias
            </div>
            <p className="text-xs text-slate-400">Ambev, Unilever, Nestlé, P&G, JBS e parceiros</p>
          </div>
        </div>

        {/* Main Interactive Table & New Agreement Form */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* New Agreement Form (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-teal-400" />
              <span>Propor Novo Acordo Comercial</span>
            </h3>
            
            <form onSubmit={handleAddAgreement} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Indústria / Fornecedor</label>
                <input
                  type="text"
                  placeholder="Ex: Coca-Cola Brasil"
                  value={newSupplier}
                  onChange={e => setNewSupplier(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Nome da Campanha</label>
                <input
                  type="text"
                  placeholder="Ex: Festival Verão Refrescante"
                  value={newCampaign}
                  onChange={e => setNewCampaign(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Ativo de Mídia Solicitado</label>
                <select
                  value={newMediaType}
                  onChange={e => setNewMediaType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="Encarte Capa">Encarte Capa (Destaque Principal)</option>
                  <option value="Ponta de Ilha">Ponta de Ilha / Exposição Física</option>
                  <option value="Banner E-commerce">Banner E-commerce & App</option>
                  <option value="WhatsApp Mídias">WhatsApp & Redes Sociais</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Valor do Aporte de Trade (R$)</label>
                <input
                  type="number"
                  value={newInvestment}
                  onChange={e => setNewInvestment(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-400 font-bold focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Registrar Proposta de Trade
              </button>
            </form>
          </div>

          {/* Agreements Table (8 cols) */}
          <div className="lg:col-span-8 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-400" />
                <span>Contratos de Trade Marketing Ativos</span>
              </h3>

              {/* Status Filter */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setFilterStatus('todos')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    filterStatus === 'todos' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilterStatus('aprovado')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    filterStatus === 'aprovado' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Aprovados
                </button>
                <button
                  onClick={() => setFilterStatus('negociação')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    filterStatus === 'negociação' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Em Negociação
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-2">Fornecedor</th>
                    <th className="py-3 px-2">Campanha & Mídia</th>
                    <th className="py-3 px-2">Aporte (R$)</th>
                    <th className="py-3 px-2">Execução PDV</th>
                    <th className="py-3 px-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredAgreements.map((agreement) => (
                    <tr key={agreement.id} className="hover:bg-slate-950/50 transition-colors">
                      <td className="py-3 px-2 font-bold text-white">
                        {agreement.supplier}
                      </td>
                      <td className="py-3 px-2">
                        <div className="text-slate-200 font-semibold">{agreement.campaign}</div>
                        <div className="text-[10px] text-teal-400">{agreement.mediaType}</div>
                      </td>
                      <td className="py-3 px-2 font-mono font-bold text-emerald-400">
                        R$ {agreement.investmentValue.toLocaleString('pt-BR')}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                            <div 
                              className="bg-teal-400 h-full rounded-full" 
                              style={{ width: `${agreement.executionRate}%` }} 
                            />
                          </div>
                          <span className="text-[10px] text-slate-300 font-mono">{agreement.executionRate}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          agreement.status === 'Aprovado' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          agreement.status === 'Em Negociação' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        }`}>
                          {agreement.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
