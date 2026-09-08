import React, { useState, useEffect } from 'react';
import { ShieldCheck, Sparkles, X, Check, Building2, UserCheck, Award, ExternalLink } from 'lucide-react';

interface AgencyCreditsPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
  autoOpenOnLoad?: boolean;
}

export const AgencyCreditsPopup: React.FC<AgencyCreditsPopupProps> = ({ 
  isOpen: propsIsOpen, 
  onClose: propsOnClose,
  autoOpenOnLoad = true 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (propsIsOpen !== undefined) {
      setIsOpen(propsIsOpen);
    } else if (autoOpenOnLoad) {
      // Check if user closed it in current session or open on first visit
      const popupDismissed = sessionStorage.getItem('stc_credits_dismissed');
      if (!popupDismissed) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, [propsIsOpen, autoOpenOnLoad]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('stc_credits_dismissed', 'true');
    if (propsOnClose) {
      propsOnClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-500/10 space-y-6 overflow-hidden">
        
        {/* Background Decorative Lighting */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-950/80 border border-slate-800 transition-colors cursor-pointer z-10"
          aria-label="Fechar aviso de direitos autorais"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                Aviso de Desenvolvimento & Direitos
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                2026
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Informações Oficiais do Ecossistema
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-slate-950/90 border border-slate-800/90 rounded-2xl p-5 space-y-4 shadow-inner">
          <p className="text-sm sm:text-base font-bold text-white leading-relaxed font-outfit">
            &ldquo;Esta plataforma de Trade Marketing está sendo desenvolvida pela agência <span className="text-emerald-400 font-extrabold underline decoration-emerald-500/50 underline-offset-4">Stc Mobile</span> / <span className="text-cyan-400 font-extrabold">Sydney Caiaffa</span> / Todos os direitos reservados<span className="text-emerald-400">@2026</span>.&rdquo;
          </p>

          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Agência: <strong>Stc Mobile</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Liderança: <strong>Sydney Caiaffa</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Propriedade: <strong>Trade Marketing AI</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Copyright: <strong>© 2026 Stc Mobile</strong></span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Entendi e Continuar para o Sistema</span>
          </button>
        </div>

      </div>
    </div>
  );
};
