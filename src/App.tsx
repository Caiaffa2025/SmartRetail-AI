import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PlatformOverview } from './components/PlatformOverview';
import { InteractiveTabloidStudio } from './components/InteractiveTabloidStudio';
import { TradeMarketingHub } from './components/TradeMarketingHub';
import { RetailIntelligenceDashboard } from './components/RetailIntelligenceDashboard';
import { AiCopilotModule } from './components/AiCopilotModule';
import { RetailInsights } from './components/RetailInsights';
import { RoiCalculator } from './components/RoiCalculator';
import { FeatureGrid } from './components/FeatureGrid';
import { TestimonialsSection } from './components/TestimonialsSection';
import { DemoModal } from './components/DemoModal';
import { RetailFeedbackWidget } from './components/RetailFeedbackWidget';
import { Footer } from './components/Footer';

export default function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const handleSelectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Fixed Top Header */}
      <Header 
        onOpenDemo={() => setDemoModalOpen(true)}
        onSelectSection={handleSelectSection}
        activeSection={activeSection}
      />

      <main>
        {/* Hero Section */}
        <HeroSection 
          onOpenDemo={() => setDemoModalOpen(true)}
          onExploreModule={handleSelectSection}
        />

        {/* Detailed Platform Manifest & Retail Value Overview */}
        <PlatformOverview 
          onOpenDemo={() => setDemoModalOpen(true)}
          onExploreModule={handleSelectSection}
        />

        {/* Live Interactive Tabloid Studio */}
        <InteractiveTabloidStudio />

        {/* Trade Marketing & Supplier Hub */}
        <TradeMarketingHub />

        {/* Retail Price Intelligence Dashboard */}
        <RetailIntelligenceDashboard />

        {/* AI Copilot Module */}
        <AiCopilotModule />

        {/* Retail Insights with Google Search Grounding */}
        <RetailInsights />

        {/* ROI Calculator */}
        <RoiCalculator onOpenDemo={() => setDemoModalOpen(true)} />

        {/* Features & Core Capabilities Grid */}
        <FeatureGrid onOpenDemo={() => setDemoModalOpen(true)} />

        {/* Success Cases & ERP Integrations */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenDemo={() => setDemoModalOpen(true)}
        onSelectSection={handleSelectSection}
      />

      {/* Demo Request Modal */}
      <DemoModal 
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />

      {/* Floating Retail Intelligence Feedback Widget */}
      <RetailFeedbackWidget />

    </div>
  );
}
