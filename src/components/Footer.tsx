import React from 'react';
import { ShoppingCart, ShieldCheck, Lock, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenDemo: () => void;
  onSelectSection: (sectionId: string) => void;
  onOpenCredits?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemo, onSelectSection, onOpenCredits }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold text-white font-outfit">
                Smart<span className="text-emerald-400">Retail</span> AI
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              A solução nº 1 em inteligência de ofertas, trade marketing, diagramação automática de encartes e cartazes para o varejo brasileiro.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Plataforma Homologada & LGPD Compliant</span>
            </div>
          </div>

          {/* Solutions Nav */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Soluções da Plataforma</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectSection('tabloid-studio')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Gerador de Encartes & Cartazes
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('trade-hub')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Trade Marketing & Portal de JBP
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('intelligence')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Inteligência Preditiva de Preços
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('copilot')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  SmartRetail AI Copilot
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('retail-insights')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Retail Insights (Google Grounding)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSection('roi-calculator')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Calculadora de ROI Varejista
                </button>
              </li>
            </ul>
          </div>

          {/* ERP Integrations */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Sistemas Integrados</h4>
            <ul className="space-y-2">
              <li>TOTVS Consinco / RMS</li>
              <li>Linx Microvix & Degust</li>
              <li>Senior Sistemas</li>
              <li>VR Software / SysPDV</li>
              <li>SAP S/4HANA Retail</li>
              <li>Bluesoft ERP Cloud</li>
            </ul>
          </div>

          {/* Contact & Demo CTA */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Atendimento Corporativo</h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>contato@smartretail.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>0800 591 0422</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>São Paulo / SP — Brasil</span>
              </div>
            </div>

            <button
              onClick={onOpenDemo}
              className="mt-2 w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors cursor-pointer"
            >
              Falar com Consultor
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} SmartRetail AI. Todos os direitos reservados.</span>
            {onOpenCredits && (
              <button
                onClick={onOpenCredits}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors font-semibold cursor-pointer"
              >
                <span>Stc Mobile / Sydney Caiaffa</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenCredits} className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400 font-medium">
              Direitos Autorais @2026
            </button>
            <a href="#privacy" className="hover:underline">Termos de Uso</a>
            <a href="#terms" className="hover:underline">Política de Privacidade</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
