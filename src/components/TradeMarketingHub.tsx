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
    <section id="trade-hub" className="py-20 bg-slate-950 border-t border-slate-800/60 relative scroll-mt-24">
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
          
          {/* Trade App Control Showcase Card with Photo Audit (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <Camera className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Smarket Trade App Control
                </span>
              </div>
              <h3 className="text-lg font-bold text-white font-outfit">
                Comprovação Fotográfica no PDV
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                A equipe de campo utiliza o aplicativo mobile para fotografar ilhas e pontas de gôndola. As fotos possuem validação por geolocalização e data/hora para faturamento direto do fornecedor.
              </p>
            </div>

            {/* Mobile App Screen Mockup */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl group">
              <img 
                src="/src/assets/images/smarket_mobile_audit_1788880848707.jpg" 
                alt="Smarket Trade App Control - Comprovação de Loja e Ponto Extra" 
                className="w-full h-60 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-3">
                <div className="flex items-center justify-between w-full text-[11px] font-bold text-white bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Auditoria Aprovada
                  </span>
                  <span className="text-slate-400 font-mono">GPS: PDV Loja #102</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <form onSubmit={handleAddAgreement} className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5 text-teal-400" />
                  <span>Cadastrar Novo Acordo de Trade</span>
                </h4>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Fornecedor / Marca</label>
                  <input
                    type="text"
                    value={newSupplier}
                    onChange={(e) => setNewSupplier(e.target.value)}
                    placeholder="Ex: Coca-Cola / Solar"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Nome da Campanha</label>
                  <input
                    type="text"
                    value={newCampaign}
                    onChange={(e) => setNewCampaign(e.target.value)}
                    placeholder="Ex: Verão Refrescante 2026"
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Tipo de Mídia</label>
                    <select
                      value={newMediaType}
                      onChange={(e) => setNewMediaType(e.target.value as any)}
                      className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-white focus:outline-none focus:border-teal-500"
                    >
                      <option value="Encarte Capa">Encarte Capa</option>
                      <option value="Ponta de Ilha">Ponta de Ilha</option>
                      <option value="Banner E-commerce">Banner Digital</option>
                      <option value="WhatsApp Mídias">WhatsApp Disparo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Aporte (R$)</label>
                    <input
                      type="number"
                      value={newInvestment}
                      onChange={(e) => setNewInvestment(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-bold focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400 transition-colors cursor-pointer"
                >
                  Registrar Acordo de Trade
                </button>
              </form>
            </div>
          </div>

          {/* Trade Agreements Table (8 cols) */}
          <div className="lg:col-span-8 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-outfit">
                  Acordos de Cooperação com Fornecedores
                </h3>
                <p className="text-xs text-slate-400">
                  Acompanhamento de status, execução em PDV e aportes financeiros
                </p>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
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
