import React, { useState, useEffect } from 'react';
import { ShoppingCart, Sparkles, LayoutDashboard, Calculator, ArrowRight, Menu, X, FileText, Target, Bot, Globe, Building2, Search, Check, Zap } from 'lucide-react';
import { GlobalSearchModal } from './GlobalSearchModal';

interface HeaderProps {
  onOpenDemo: () => void;
  onSelectSection: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenDemo, onSelectSection, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Ctrl+K / Cmd+K and Escape listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'platform-overview', label: 'A Plataforma', desc: 'Visão geral do ecossistema', icon: Building2 },
    { id: 'tabloid-studio', label: 'Gerador de Encartes', desc: 'Crie encartes em segundos', icon: FileText },
    { id: 'trade-hub', label: 'Trade Marketing', desc: 'Contratos e verbas de fornecedores', icon: Target },
    { id: 'intelligence', label: 'Inteligência de Preços', desc: 'Precificação dinâmica e concorrentes', icon: LayoutDashboard },
    { id: 'copilot', label: 'AI Copilot', desc: 'Assistente inteligente de varejo', icon: Bot },
    { id: 'retail-insights', label: 'Retail Insights', desc: 'Notícias do setor com Search Grounding', icon: Globe },
    { id: 'roi-calculator', label: 'Calculadora ROI', desc: 'Simule a economia da sua rede', icon: Calculator },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-2.5 sm:py-3' 
        : 'bg-slate-950/40 backdrop-blur-sm py-3.5 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* Logo Brand */}
          <div 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }} 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white font-outfit">
                  Smart<span className="text-emerald-400">Retail</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                Inteligência de Varejo & Encartes
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectSection(link.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20 font-extrabold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Compact Navigation Bar for Mid Screens (Tablet / Laptop lg) */}
          <nav className="hidden lg:flex xl:hidden items-center gap-1 bg-slate-900/80 p-1 rounded-full border border-slate-800/80">
            {navLinks.slice(0, 5).map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectSection(link.id)}
                  title={link.label}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[90px]">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Global Search Bar Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/40 transition-all duration-200 cursor-pointer shadow-inner group"
              title="Buscar módulos ou documentação (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline">Buscar...</span>
              <kbd className="hidden md:inline-flex items-center gap-0.5 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                <span>⌘K</span>
              </kbd>
            </button>

            <button
              onClick={() => onSelectSection('copilot')}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/40 hover:border-emerald-500/60 transition-all duration-200 cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="hidden md:inline">Experimentar IA</span>
              <span className="md:hidden">IA</span>
            </button>

            <button
              onClick={onOpenDemo}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shrink-0"
            >
              <span>Demonstração</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Search & Hamburger Controls */}
          <div className="lg:hidden flex items-center gap-1.5">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 hover:text-white active:scale-95 transition-transform"
              title="Buscar módulos"
              aria-label="Buscar módulos"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white active:scale-95 transition-transform cursor-pointer"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] z-50 flex flex-col bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
          
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 max-w-md w-full mx-auto pb-24">
            
            {/* Header Title inside drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                  Navegação de Módulos
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                IA Varejista Ativa
              </span>
            </div>

            {/* Quick Search Button in Drawer */}
            <button
              onClick={() => {
                setSearchModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium shadow-inner hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-emerald-400" />
                <span>Buscar módulos ou recursos...</span>
              </div>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                ⌘K
              </kbd>
            </button>

            {/* Navigation Items List */}
            <div className="space-y-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.id;

                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      onSelectSection(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer min-h-[48px] ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/50 text-white shadow-md'
                        : 'bg-slate-900/60 border border-slate-800/80 text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl shrink-0 ${
                        isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-emerald-400 border border-slate-800'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className={`text-sm font-bold leading-tight ${isActive ? 'text-emerald-400' : 'text-slate-100'}`}>
                          {link.label}
                        </p>
                        <p className="text-[11px] text-slate-400 font-normal leading-tight mt-0.5">
                          {link.desc}
                        </p>
                      </div>
                    </div>

                    {isActive && (
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Primary Action inside Mobile Drawer */}
            <div className="pt-3 space-y-2.5">
              <button
                onClick={() => {
                  onOpenDemo();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 active:scale-98 transition-transform cursor-pointer"
              >
                <span>Agendar Demonstração</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Render Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectSection={onSelectSection}
        onOpenDemo={onOpenDemo}
      />
    </header>
  );
};

