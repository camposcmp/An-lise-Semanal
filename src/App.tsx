import React, { useState } from 'react';
import { Header } from './components/Header';
import { MetricCards } from './components/MetricCards';
import { MandatoryConclusionView } from './components/MandatoryConclusionView';
import { MacroView } from './components/MacroView';
import { FIIView } from './components/FIIView';
import { EquitiesView } from './components/EquitiesView';
import { PortfolioOptimizerView } from './components/PortfolioOptimizerView';
import { ReinvestmentPolicyView } from './components/ReinvestmentPolicyView';
import { CashFlowCalendarView } from './components/CashFlowCalendarView';
import { SimulationsView } from './components/SimulationsView';
import { GovernanceAuditView } from './components/GovernanceAuditView';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { FullDossierPrintView } from './components/FullDossierPrintView';
import { WeeklyMonitorView } from './components/WeeklyMonitorView';
import { PrintModal } from './components/PrintModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('conclusao');
  const [analiseSubTab, setAnaliseSubTab] = useState<'FII' | 'ACOES'>('FII');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  const handlePrintClick = () => {
    setIsPrintModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-slate-900 selection:text-white">
      {/* Top Bar adhering to Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPrint={handlePrintClick}
      />

      {/* Export / Print Modal */}
      <PrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top KPIs (always visible on screen, hidden on print dossier if desired) */}
        <div className="no-print">
          <MetricCards />
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'conclusao' && (
            <MandatoryConclusionView
              onNavigateToPortfolio={() => setActiveTab('carteira')}
              onNavigateToWeekly={() => setActiveTab('semanal')}
            />
          )}

          {activeTab === 'macro' && <MacroView />}

          {activeTab === 'analise' && (
            <div className="space-y-6">
              {/* Sub-selector for FIIs or Equities */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2 no-print">
                <button
                  onClick={() => setAnaliseSubTab('FII')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                    analiseSubTab === 'FII'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Fundos Imobiliários (FIIs)
                </button>
                <button
                  onClick={() => setAnaliseSubTab('ACOES')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                    analiseSubTab === 'ACOES'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Ações de Dividendos
                </button>
              </div>

              {analiseSubTab === 'FII' ? <FIIView /> : <EquitiesView />}
            </div>
          )}

          {activeTab === 'carteira' && <PortfolioOptimizerView />}

          {activeTab === 'semanal' && <WeeklyMonitorView />}

          {activeTab === 'reinvestimento' && <ReinvestmentPolicyView />}

          {activeTab === 'fluxo' && <CashFlowCalendarView />}

          {activeTab === 'simulacoes' && <SimulationsView />}

          {activeTab === 'auditoria' && <GovernanceAuditView />}

          {activeTab === 'simulador' && <InteractiveSimulator />}

          {activeTab === 'dossie' && <FullDossierPrintView />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-semibold text-slate-700">VALOR & RENDA ADVISORY</span>
            <span className="mx-2">·</span>
            <span>Relatório Técnico Independente de Investimentos</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Investidor: 61 anos · Curitiba-PR</span>
            <span>·</span>
            <span>Horizonte Central: 10 Anos</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
