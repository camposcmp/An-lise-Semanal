import React from 'react';
import { Printer, TrendingUp, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onPrint }) => {
  const navItems = [
    { id: 'conclusao', label: 'Conclusão' },
    { id: 'macro', label: 'Macro' },
    { id: 'analise', label: 'FIIs & Ações' },
    { id: 'carteira', label: 'Carteira R$ 500k' },
    { id: 'semanal', label: 'Monitor Semanal' },
    { id: 'reinvestimento', label: 'Reinvestimento' },
    { id: 'fluxo', label: 'Fluxo 12M' },
    { id: 'simulacoes', label: 'Projeções' },
    { id: 'auditoria', label: 'Auditoria' },
    { id: 'simulador', label: 'Simulador' },
    { id: 'dossie', label: 'Dossiê' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap">
                VALOR & RENDA
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline ml-2 border-l border-slate-200 pl-2">
                Consultoria Institucional de Investimentos
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Clean single-line text links) */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {navItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  activeTab === item.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="h-4 w-px bg-slate-200 mx-1" />
            {navItems.slice(5).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  activeTab === item.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap"
              title="Exportar ou Imprimir Relatório Oficial"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Imprimir Relatório</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary tab strip */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-100 scrollbar-none">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors shrink-0 ${
                activeTab === item.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
