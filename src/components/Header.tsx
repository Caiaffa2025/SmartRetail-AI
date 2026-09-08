import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, Sparkles, LayoutDashboard, Calculator, ArrowRight, Menu, X, 
  FileText, Target, Bot, Globe, Building2, Search, Check, ChevronDown, Zap
} from 'lucide-react';
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
  
  // Dropdown States
  const [activeDropdown, setActiveDropdown] = useState<'modules' | 'analytics' | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setSearchModalOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent Body Scroll when Mobile Drawer is Open
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

  // Dropdown Hover Delay Handlers
  const handleMouseEnter = (menu: 'modules' | 'analytics') => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Grouped Navigation Data
  const modulesGroup = [
    { id: 'tabloid-studio', label: 'Gerador de Encartes', desc: 'Crie tabloides e artes em segundos', icon: FileText, color: 'text-amber-400' },
    { id: 'trade-hub', label: 'Trade Marketing Hub', desc: 'Contratos e verbas de fornecedores', icon: Target, color: 'text-teal-400' },
    { id: 'intelligence', label: 'Inteligência de Preços', desc: 'Monitoramento dinâmico de concorrentes', icon: LayoutDashboard, color: 'text-cyan-400' },
    { id: 'copilot', label: 'AI Copilot Autônomo', desc: 'Assistente inteligente de decisões', icon: Bot, color: 'text-emerald-400' },
  ];

  const analyticsGroup = [
    { id: 'platform-overview', label: 'A Plataforma', desc: 'Visão geral do ecossistema varejista', icon: Building2, color: 'text-slate-300' },
    { id: 'retail-insights', label: 'Retail Insights', desc: 'Notícias do mercado com Google Search Grounding', icon: Globe, color: 'text-blue-400' },
    { id: 'roi-calculator', label: 'Calculadora ROI', desc: 'Simule a economia anual da sua rede', icon: Calculator, color: 'text-emerald-400' },
  ];

  const isModuleActive = modulesGroup.some(m => m.id === activeSection);
  const isAnalyticsActive = analyticsGroup.some(a => a.id === activeSection);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-2.5 sm:py-3' 
        : 'bg-slate-950/60 backdrop-blur-sm py-3.5 sm:py-4 border-b border-slate-900/40'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          
          {/* LOGO BRAND */}
          <div 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }} 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
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
              <p className="text-[10px] text-slate-400 font-medium hidden md:block">
                Plataforma de Inteligência de Varejo
              </p>
            </div>
          </div>

          {/* DESKTOP & TABLET NAVIGATION MENU */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md shadow-inner">
            
            {/* Dropdown 1: Módulos do Sistema */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('modules')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'modules' ? null : 'modules')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isModuleActive || activeDropdown === 'modules'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Módulos IA</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === 'modules' ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Dropdown Content */}
              {activeDropdown === 'modules' && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-slate-950/98 border border-slate-800 rounded-3xl p-3 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 z-50 space-y-1">
                  <div className="px-3 py-1.5 border-b border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    <span>Módulos de Automação</span>
                    <span className="text-emerald-400 font-bold">4 Ferramentas</span>
                  </div>
                  {modulesGroup.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectSection(item.id);
                          setActiveDropdown(null);
                        }}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-2xl text-left transition-all duration-150 cursor-pointer group ${
                          isActive 
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-white' 
                            : 'hover:bg-slate-900 text-slate-300 hover:text-white'
                        }`}
                      >
                        <div className={`p-2 rounded-xl bg-slate-900 border border-slate-800/80 shrink-0 group-hover:scale-110 transition-transform ${item.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold leading-tight flex items-center justify-between">
                            <span>{item.label}</span>
                            {isActive && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                          </p>
                          <p className="text-[11px] text-slate-400 font-normal leading-tight">
                            {item.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dropdown 2: Análises & Estratégia */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('analytics')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'analytics' ? null : 'analytics')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isAnalyticsActive || activeDropdown === 'analytics'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Análises & ROI</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeDropdown === 'analytics' ? 'rotate-180' : ''
                }`} />
              </button>

              {/* Dropdown Content */}
              {activeDropdown === 'analytics' && (
                <div className="absolute top-full left-0 mt-2 w-76 bg-slate-950/98 border border-slate-800 rounded-3xl p-3 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 z-50 space-y-1">
                  <div className="px-3 py-1.5 border-b border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    <span>Inteligência Estratégica</span>
                  </div>
                  {analyticsGroup.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectSection(item.id);
                          setActiveDropdown(null);
                        }}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-2xl text-left transition-all duration-150 cursor-pointer group ${
                          isActive 
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-white' 
                            : 'hover:bg-slate-900 text-slate-300 hover:text-white'
                        }`}
                      >
                        <div className={`p-2 rounded-xl bg-slate-900 border border-slate-800/80 shrink-0 group-hover:scale-110 transition-transform ${item.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold leading-tight flex items-center justify-between">
                            <span>{item.label}</span>
                            {isActive && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                          </p>
                          <p className="text-[11px] text-slate-400 font-normal leading-tight">
                            {item.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Direct Quick Link: Gerador de Encartes */}
            <button
              onClick={() => onSelectSection('tabloid-studio')}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeSection === 'tabloid-studio'
                  ? 'bg-amber-400 text-slate-950 font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Encartes</span>
            </button>
          </nav>

          {/* ACTION BUTTONS (RIGHT SIDE) */}
          <div className="flex items-center gap-2">
            
            {/* Global Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/40 transition-all duration-200 cursor-pointer shadow-inner group"
              title="Buscar módulos ou documentação (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline text-xs">Buscar...</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                <span>⌘K</span>
              </kbd>
            </button>

            {/* Primary Demo Button */}
            <button
              onClick={onOpenDemo}
              className="hidden sm:flex items-center gap-2 text-xs font-extrabold px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shrink-0"
            >
              <span>Agendar Demonstração</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white active:scale-95 transition-transform cursor-pointer"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* MOBILE & TABLET SLIDE-OVER DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] z-50 flex flex-col bg-slate-950/95 backdrop-blur-2xl animate-in fade-in duration-200">
          
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 max-w-md w-full mx-auto pb-28">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
                  Navegação Inteligente
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                AI Active
              </span>
            </div>

            {/* Quick Search */}
            <button
              onClick={() => {
                setSearchModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium shadow-inner hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-emerald-400" />
                <span>Buscar módulo, encarte ou ferramenta...</span>
              </div>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                ⌘K
              </kbd>
            </button>

            {/* Section 1: Módulos Principais */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                ⚡ Módulos de Operação IA
              </p>
              <div className="space-y-1.5">
                {modulesGroup.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectSection(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/50 text-white shadow-lg'
                          : 'bg-slate-900/70 border border-slate-800/80 text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl shrink-0 ${
                          isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 border border-slate-800 ' + item.color
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className={`text-sm font-bold leading-tight ${isActive ? 'text-emerald-400' : 'text-slate-100'}`}>
                            {item.label}
                          </p>
                          <p className="text-[11px] text-slate-400 font-normal leading-tight mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      {isActive && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Análises & Estratégia */}
            <div className="space-y-2 pt-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                📈 Estratégia & Retorno
              </p>
              <div className="space-y-1.5">
                {analyticsGroup.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectSection(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/50 text-white shadow-lg'
                          : 'bg-slate-900/70 border border-slate-800/80 text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl shrink-0 ${
                          isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 border border-slate-800 ' + item.color
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className={`text-sm font-bold leading-tight ${isActive ? 'text-emerald-400' : 'text-slate-100'}`}>
                            {item.label}
                          </p>
                          <p className="text-[11px] text-slate-400 font-normal leading-tight mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      {isActive && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sticky Bottom Action inside Mobile Drawer */}
            <div className="pt-4">
              <button
                onClick={() => {
                  onOpenDemo();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 active:scale-98 transition-transform cursor-pointer"
              >
                <span>Agendar Demonstração Gratuita</span>
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
