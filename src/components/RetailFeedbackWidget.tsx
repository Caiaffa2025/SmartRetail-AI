import React, { useState } from 'react';
import { 
  MessageSquarePlus, X, Send, CheckCircle2, AlertTriangle, Lightbulb, 
  BarChart3, Sparkles, Shield, ThumbsUp, Bug, ArrowRight, Layers,
  Building2, Mail, User, Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

type FeedbackType = 'issue' | 'suggestion' | 'data' | 'feature';

const MODULE_OPTIONS = [
  'Monitoramento de Preços Concorrentes',
  'Regras de Repreficação Automática',
  'Alertas de Margem e Inflação',
  'Elasticidade de Vendas & Margem',
  'ROI por Canal Omnichannel',
  'Evolução Histórica & Comparativo',
  'Outro / Visão Geral'
];

export const RetailFeedbackWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('suggestion');
  const [selectedModule, setSelectedModule] = useState<string>('Monitoramento de Preços Concorrentes');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [subject, setSubject] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [includeDashboardContext, setIncludeDashboardContext] = useState<boolean>(true);
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>('');

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `RI-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (err) {
        // Fallback if confetti fails
      }
    }, 800);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubject('');
    setDescription('');
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Tooltip Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-medium">Feedback Retail Intelligence</span>
        </div>

        <button
          onClick={handleOpen}
          id="retail-feedback-trigger-btn"
          aria-label="Feedback Retail Intelligence"
          className="group relative flex items-center justify-center w-13 h-13 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all duration-200 border border-emerald-300/40 cursor-pointer"
        >
          <MessageSquarePlus className="w-6 h-6 stroke-[2.2] group-hover:rotate-12 transition-transform duration-200" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-slate-950 rounded-full" />
        </button>
      </div>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              id="close-retail-feedback-modal"
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-950/80 border border-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Header */}
                <div className="space-y-2 pr-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Retail Intelligence Lab</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white font-outfit">
                    Enviar Feedback & Sugestões
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Sua experiência direciona a evolução dos nossos algoritmos de precificação, comparativos de mercado e análise de margem.
                  </p>
                </div>

                {/* Feedback Type Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Tipo de Feedback
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFeedbackType('suggestion')}
                      className={`flex items-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all text-left cursor-pointer ${
                        feedbackType === 'suggestion'
                          ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Sugestão de Melhoria</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFeedbackType('issue')}
                      className={`flex items-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all text-left cursor-pointer ${
                        feedbackType === 'issue'
                          ? 'bg-rose-500/15 border-rose-500/50 text-rose-300'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <Bug className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>Relatar Problema</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFeedbackType('data')}
                      className={`flex items-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all text-left cursor-pointer ${
                        feedbackType === 'data'
                          ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Divergência de Dados</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFeedbackType('feature')}
                      className={`flex items-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all text-left cursor-pointer ${
                        feedbackType === 'feature'
                          ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>Nova Funcionalidade</span>
                    </button>
                  </div>
                </div>

                {/* Module Affected Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">
                    Recurso Específico
                  </label>
                  <select
                    value={selectedModule}
                    onChange={(e) => setSelectedModule(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {MODULE_OPTIONS.map((mod) => (
                      <option key={mod} value={mod}>
                        {mod}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Optional Priority if Bug/Data Issue */}
                {(feedbackType === 'issue' || feedbackType === 'data') && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 block">
                      Prioridade do Impacto
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setPriority('low')}
                        className={`flex-1 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                          priority === 'low'
                            ? 'bg-slate-800 border-slate-600 text-slate-200'
                            : 'bg-slate-950 border-slate-800 text-slate-500'
                        }`}
                      >
                        Baixa
                      </button>
                      <button
                        type="button"
                        onClick={() => setPriority('medium')}
                        className={`flex-1 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                          priority === 'medium'
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                            : 'bg-slate-950 border-slate-800 text-slate-500'
                        }`}
                      >
                        Média
                      </button>
                      <button
                        type="button"
                        onClick={() => setPriority('high')}
                        className={`flex-1 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                          priority === 'high'
                            ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                            : 'bg-slate-950 border-slate-800 text-slate-500'
                        }`}
                      >
                        Alta
                      </button>
                    </div>
                  </div>
                )}

                {/* Subject / Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">
                    Resumo do Feedback
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Ex: Adicionar filtro por raio de distância no comparativo de concorrentes"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Detailed Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">
                    Descrição Detalhada
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Conte-nos o que funcionou bem, o que pode ser aprimorado ou qual discrepância de preço você identificou..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                {/* User Info (Optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-400 block">
                      Seu Nome / Cargo (Opcional)
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Ex: Mariana - Gerente de Pricing"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-400 block">
                      E-mail para Retorno (Opcional)
                    </label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="seu.email@supermercado.com.br"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Include Dashboard Context Checkbox */}
                <label className="flex items-center gap-2.5 pt-1 text-xs text-slate-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeDashboardContext}
                    onChange={(e) => setIncludeDashboardContext(e.target.checked)}
                    className="rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-emerald-500/20"
                  />
                  <span>Anexar contexto do estado atual dos gráficos do Dashboard</span>
                </label>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || !description.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-extrabold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Enviar Feedback</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Success Confirmation View */
              <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white font-outfit">
                    Feedback Recebido com Sucesso!
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Muito obrigado! Seu relato foi registrado e encaminhado diretamente para nossa equipe de Inteligência Varejista.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 max-w-sm mx-auto space-y-1 text-left font-mono text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Protocolo:</span>
                    <span className="text-emerald-400 font-bold">{ticketId}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Módulo:</span>
                    <span className="text-slate-200 font-medium truncate max-w-[180px]">{selectedModule}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Status:</span>
                    <span className="text-amber-400 font-semibold">Em Análise Técnica</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleResetForm}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Enviar Outro
                  </button>

                  <button
                    onClick={handleClose}
                    className="px-5 py-2 rounded-xl bg-emerald-500 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
                  >
                    Concluir
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
