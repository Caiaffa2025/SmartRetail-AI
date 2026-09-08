import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building2, Store, Phone, Mail, User, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [storeCount, setStoreCount] = useState('5 a 15 lojas');
  const [sector, setSector] = useState('Supermercados');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, company, email, phone, storeCount, sector })
      });
      const data = await res.json();
      setResponseData(data);
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-950/80 border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Demonstração Personalizada</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white font-outfit">
                Agendar Demonstração ao Vivo
              </h3>
              <p className="text-xs text-slate-300">
                Preencha os dados da sua rede para apresentarmos o SmartRetail AI em funcionamento com a estrutura da sua empresa.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Seu Nome Completo</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Mendes"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Nome da Empresa / Rede Varejista</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Supermercados Estrela"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">E-mail Corporativo</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="nome@empresa.com.br"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Telefone / WhatsApp</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Número de Lojas</label>
                  <select
                    value={storeCount}
                    onChange={e => setStoreCount(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="1 a 4 lojas">1 a 4 lojas</option>
                    <option value="5 a 15 lojas">5 a 15 lojas</option>
                    <option value="16 a 50 lojas">16 a 50 lojas</option>
                    <option value="Mais de 50 lojas">Mais de 50 lojas</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Segmento</label>
                  <select
                    value={sector}
                    onChange={e => setSector(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Supermercados">Supermercados</option>
                    <option value="Atacarejo">Atacarejo</option>
                    <option value="Farmácia">Farmácia & Drogaria</option>
                    <option value="Home Center">Home Center</option>
                    <option value="Eletro">Eletro & Utilidades</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Enviando Dados...</span>
                  </>
                ) : (
                  <>
                    <span>Confirmar Agendamento</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white font-outfit">
                Solicitação Confirmada!
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                {responseData?.message || 'Recebemos suas informações com sucesso.'}
              </p>
            </div>

            {responseData?.details && (
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left text-xs space-y-2">
                <div className="text-emerald-400 font-bold">Estimativa de Impacto para {company}:</div>
                <div className="text-slate-300">⏱️ Tempo Operacional Salvo: <strong>{responseData.details.estimatedTimeSaved}</strong></div>
                <div className="text-slate-300">💰 Potencial de Verba Recuperada: <strong>{responseData.details.estimatedExtraMargin}</strong></div>
              </div>
            )}

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Fechar Janela
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
