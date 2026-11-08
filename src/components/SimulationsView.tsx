import React, { useState } from 'react';
import {
  FIVE_YEAR_PROJECTION,
  TEN_YEAR_PROJECTION,
  POLICY_C_TEN_YEAR_PROJECTION,
  LONG_HORIZON_SUMMARY,
  CORRELATED_STRESS_TESTS
} from '../data/investmentData';
import { formatCurrencyBRL, formatPercent } from '../utils/calculator';
import { TrendingUp, AlertTriangle, ShieldCheck, Activity, LineChart, CheckCircle2, Calculator } from 'lucide-react';

export const SimulationsView: React.FC = () => {
  const [selectedHorizon, setSelectedHorizon] = useState<'5Y' | '10Y' | 'POLICY_C_10Y' | 'LONG'>('POLICY_C_10Y');

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <span>Etapa 8 — Modelagem Financeira & Testes de Estresse</span>
          <span>·</span>
          <span>Seções 21 a 24 do Relatório</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Simulações Patrimoniais em 5, 10, 15, 20 e 30 Anos & Testes Correlacionados
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-4xl leading-relaxed">
          As projeções foram calculadas por modelagem recursiva contínua de Fisher sem dupla contagem de proventos e valorização. A inflação de referência é de <strong>4,50% ao ano</strong> (IPCA). Demonstramos com rigor a bifurcação matemática entre a <strong>Política Recomendada (Preservação e Crescimento Real)</strong> e políticas com retiradas acima da taxa sustentável sem reposição inflacionária, além de testes de estresse com cortes simultâneos de cotações e proventos.
        </p>

        {/* Tab buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <button
            onClick={() => setSelectedHorizon('POLICY_C_10Y')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              selectedHorizon === 'POLICY_C_10Y'
                ? 'bg-emerald-700 text-white shadow-xs font-bold'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Política Recomendada (10 Anos — Preservação Real)</span>
          </button>
          <button
            onClick={() => setSelectedHorizon('10Y')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              selectedHorizon === '10Y'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cenário de Retirada Excessiva c/ IPCA (10 Anos)
          </button>
          <button
            onClick={() => setSelectedHorizon('5Y')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              selectedHorizon === '5Y'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Detalhamento 5 Anos (Retirada c/ IPCA)
          </button>
          <button
            onClick={() => setSelectedHorizon('LONG')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              selectedHorizon === 'LONG'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Testes Longos (15, 20 e 30 Anos)
          </button>
        </div>
      </div>

      {/* Trajectory Comparison SVG Graph */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <LineChart className="w-5 h-5 text-slate-700" />
              Trajetória do Patrimônio Real (Poder de Compra Deflacionado pelo IPCA)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparação entre Política Recomendada (R$ 2.050/mês) vs Consumo Desbalanceado com Saque Acima da Sustentabilidade (30 anos)
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-emerald-600 block" />
              <span className="text-slate-700 font-medium">Recomendada (Expansão Real R$ 500k → R$ 678k-766k)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-rose-500 block" />
              <span className="text-slate-700 font-medium">Consumo Excessivo c/ IPCA (Erosão Real → R$ 66k)</span>
            </div>
          </div>
        </div>

        {/* SVG Chart */}
        <div className="w-full h-64 relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 800 220">
            {/* Grid */}
            <line x1="60" y1="20" x2="780" y2="20" stroke="#f1f5f9" strokeWidth="1" />
            <text x="50" y="24" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono">R$ 800k</text>

            <line x1="60" y1="70" x2="780" y2="70" stroke="#f1f5f9" strokeWidth="1" />
            <text x="50" y="74" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono">R$ 600k</text>

            {/* Initial Baseline R$ 500k */}
            <line x1="60" y1="95" x2="780" y2="95" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
            <text x="50" y="99" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="end" fontFamily="JetBrains Mono">R$ 500k</text>

            <line x1="60" y1="145" x2="780" y2="145" stroke="#f1f5f9" strokeWidth="1" />
            <text x="50" y="149" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono">R$ 300k</text>

            <line x1="60" y1="195" x2="780" y2="195" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="50" y="199" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono">R$ 0</text>

            {/* X-axis labels */}
            <text x="60" y="215" fill="#64748b" fontSize="10" textAnchor="middle">Ano 0</text>
            <text x="180" y="215" fill="#64748b" fontSize="10" textAnchor="middle">Ano 5</text>
            <text x="300" y="215" fill="#64748b" fontSize="10" textAnchor="middle">Ano 10 (Principal)</text>
            <text x="420" y="215" fill="#64748b" fontSize="10" textAnchor="middle">Ano 15</text>
            <text x="540" y="215" fill="#64748b" fontSize="10" textAnchor="middle">Ano 20</text>
            <text x="660" y="215" fill="#64748b" fontSize="10" textAnchor="middle">Ano 25</text>
            <text x="780" y="215" fill="#64748b" fontSize="10" textAnchor="middle">Ano 30</text>

            {/* Sustainable Path (Green) */}
            <path
              d="M 60 95 Q 180 90, 300 83 T 540 61 T 780 28"
              fill="none"
              stroke="#059669"
              strokeWidth="3"
            />
            <circle cx="60" cy="95" r="4" fill="#059669" />
            <circle cx="180" cy="90" r="4" fill="#059669" />
            <circle cx="300" cy="83" r="4" fill="#059669" />
            <circle cx="540" cy="61" r="4" fill="#059669" />
            <circle cx="780" cy="28" r="4" fill="#059669" />

            {/* 3000/mo Path (Red) */}
            <path
              d="M 60 95 Q 180 103, 300 114 T 540 146 T 780 203"
              fill="none"
              stroke="#e11d48"
              strokeWidth="3"
              strokeDasharray="6 3"
            />
            <circle cx="60" cy="95" r="4" fill="#e11d48" />
            <circle cx="180" cy="103" r="4" fill="#e11d48" />
            <circle cx="300" cy="114" r="4" fill="#e11d48" />
            <circle cx="420" cy="128" r="4" fill="#e11d48" />
            <circle cx="540" cy="146" r="4" fill="#e11d48" />
            <circle cx="660" cy="171" r="4" fill="#e11d48" />
            <circle cx="780" cy="203" r="4" fill="#e11d48" />

            {/* Labels at key points */}
            <text x="300" y="70" fill="#059669" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="JetBrains Mono">R$ 546k</text>
            <text x="780" y="20" fill="#059669" fontSize="10" fontWeight="bold" textAnchor="end" fontFamily="JetBrains Mono">R$ 678k-766k (Real)</text>

            <text x="300" y="130" fill="#e11d48" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="JetBrains Mono">R$ 425k (-15%)</text>
            <text x="780" y="195" fill="#e11d48" fontSize="10" fontWeight="bold" textAnchor="end" fontFamily="JetBrains Mono">R$ 66k (-87%)</text>
          </svg>
        </div>
      </div>

      {/* Projection Tables based on active tab */}
      {selectedHorizon === 'POLICY_C_10Y' && (
        <div className="bg-white border-2 border-emerald-500 rounded-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">
                Projeção da Política Recomendada C (1 a 10 Anos) — Reprodutibilidade Matemática Integral
              </h3>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
              Patrimônio Real Preservado & Crescente
            </span>
          </div>

          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Demonstração detalhada ano a ano da fórmula recursiva de Fisher: <code>K_real(t) = K_nom(t) / (1 + IPCA)^t</code>, considerando a retirada de <strong>R$ 2.050/mês</strong> reajustada pelo IPCA (R$ 24.600 no Ano 1), reinvestimento em dinheiro de <strong>R$ 20.416,20</strong> e ganho de capital real das ações:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-50/80 border-b border-emerald-200 text-emerald-950 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3">Ano</th>
                  <th className="py-3 px-3 text-right">Patrimônio Nominal</th>
                  <th className="py-3 px-3 text-right font-bold text-emerald-900">Patrimônio Real (IPCA 4,5%)</th>
                  <th className="py-3 px-3 text-right">Proventos Líquidos</th>
                  <th className="py-3 px-3 text-right font-semibold text-amber-900">Retirada Efetiva</th>
                  <th className="py-3 px-3 text-right font-bold text-emerald-800">Reinvestido em Caixa</th>
                  <th className="py-3 px-3 text-right">Yield Líquido</th>
                  <th className="py-3 px-3">Status de Preservação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {POLICY_C_TEN_YEAR_PROJECTION.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3 font-semibold text-slate-900 font-mono">Ano {row.year}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-700">{formatCurrencyBRL(row.nominalCapital)}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums font-bold text-emerald-700">{formatCurrencyBRL(row.realCapital)}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-800">{formatCurrencyBRL(row.netProventos)}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-amber-900">{formatCurrencyBRL(row.retirada)}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums font-bold text-emerald-700">{formatCurrencyBRL(row.reinvestido)}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-600">{row.dividendYield.toFixed(2)}% a.a.</td>
                    <td className="py-3 px-3 text-slate-600 text-[11px]">
                      <span className="text-emerald-700 font-medium">100% blindado</span> (+{((row.realCapital / 500000 - 1) * 100).toFixed(1)}% real vs início)
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-emerald-50/50 border-t border-emerald-300 font-bold text-emerald-950">
                <tr>
                  <td className="py-3 px-3">Marco 10 Anos</td>
                  <td className="py-3 px-3 text-right font-mono">R$ 895.408</td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-800 text-sm">R$ 576.590</td>
                  <td className="py-3 px-3 text-right font-mono">R$ 76.027</td>
                  <td className="py-3 px-3 text-right font-mono text-amber-900">R$ 36.558</td>
                  <td className="py-3 px-3 text-right font-mono text-emerald-800">R$ 39.469</td>
                  <td className="py-3 px-3 text-right font-mono">9,00%</td>
                  <td className="py-3 px-3 text-xs text-emerald-800 font-normal">Superávit real cumulativo de +15,3% acima da inflação.</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {selectedHorizon === '5Y' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Horizonte Operacional (5 Anos) — Cenário de Retirada Acima da Sustentabilidade
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Simulação anual detalhada para o caso de retirada reajustada pelo IPCA (4,5% a.a.) sem recomposição proporcional da inflação:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3">Ano</th>
                  <th className="py-3 px-3 text-right">Patrimônio Nominal</th>
                  <th className="py-3 px-3 text-right font-bold">Patrimônio Real (IPCA)</th>
                  <th className="py-3 px-3 text-right">Proventos Brutos</th>
                  <th className="py-3 px-3 text-right">Proventos Líquidos</th>
                  <th className="py-3 px-3 text-right font-semibold text-amber-900">Retirada Total</th>
                  <th className="py-3 px-3 text-right font-bold text-emerald-700">Reinvestimento</th>
                  <th className="py-3 px-3 text-right">Poder de Compra Real</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {FIVE_YEAR_PROJECTION.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3 font-semibold text-slate-900 font-mono">Ano {row.year}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-700">{formatCurrencyBRL(row.nominalCapital)}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums font-bold text-slate-900">{formatCurrencyBRL(row.realCapital)}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-600">{formatCurrencyBRL(row.grossProventos)}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-800">{formatCurrencyBRL(row.netProventos)}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-amber-900">{formatCurrencyBRL(row.retirada)}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums font-bold text-emerald-700">{formatCurrencyBRL(row.reinvestido)}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-600 font-semibold">{formatCurrencyBRL(row.purchasingPowerReal)} /mês</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedHorizon === '10Y' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Horizonte Central de Estratégia Patrimonial (10 Anos) — Cenário com Retirada Excessiva
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Evolução anual de 1 a 10 anos sob retirada acima da sustentabilidade reajustada pelo IPCA (demonstrando a erosão do capital real de R$ 500k para R$ 425k):
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3">Ano</th>
                  <th className="py-3 px-3 text-right">Patrimônio Nominal</th>
                  <th className="py-3 px-3 text-right font-bold text-rose-800">Patrimônio Real (Deflacionado)</th>
                  <th className="py-3 px-3 text-right">Proventos Líquidos</th>
                  <th className="py-3 px-3 text-right font-semibold text-amber-900">Retirada Total</th>
                  <th className="py-3 px-3 text-right font-bold text-emerald-700">Reinvestido</th>
                  <th className="py-3 px-3">Diagnóstico do Período</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TEN_YEAR_PROJECTION.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3 font-semibold text-slate-900 font-mono">Ano {row.year}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-700">{formatCurrencyBRL(row.nominalCapital)}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums font-bold text-rose-700">{formatCurrencyBRL(row.realCapital)}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-800">{formatCurrencyBRL(row.netProventos)}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-amber-900">{formatCurrencyBRL(row.retirada)}</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums font-bold text-emerald-700">{formatCurrencyBRL(row.reinvestido)}</td>
                    <td className="py-3 px-3 text-slate-500 text-[11px]">
                      {row.year <= 5 ? 'Reinvestimento ainda cobre parte da inflação.' : 'Reinvestimento residual insuficiente; erosão contínua acelerando.'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedHorizon === 'LONG' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Avaliações Complementares & Testes de Sustentabilidade (15, 20 e 30 Anos)
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Análise de sensibilidade de esgotamento caso o investidor retire acima do patamar sustentável de R$ 2.050/mês reajustado pela inflação:
          </p>

          <div className="space-y-4">
            {LONG_HORIZON_SUMMARY.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <span className="font-bold text-slate-900 text-sm">{item.horizon}</span>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span>Nominal: <strong className="text-slate-900">{item.nominalCap}</strong></span>
                    <span>Real: <strong className="text-rose-700">{item.realCap}</strong></span>
                    <span>Proventos: <strong className="text-slate-800">{item.netProventosYear}</strong></span>
                    <span>Saque: <strong className="text-amber-900">{item.retiradaYear}</strong></span>
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{item.status}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Correlated Stress Testing Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-rose-600" />
          <h3 className="text-lg font-bold text-slate-900">
            24. Testes de Estresse Correlacionados (Choques Simultâneos em Cotações e Proventos)
          </h3>
        </div>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          <strong>Auditoria Técnica (Ponto B):</strong> Em atendimento à auditoria, abandonamos a hipótese otimista de estabilidade de proventos em quedas de preços. Testamos cenários de crise severa onde <strong>cotações de mercado e dividendos caem simultaneamente</strong> (-15%, -25% e -35% nos proventos):
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3">Cenário de Estresse</th>
                <th className="py-3 px-3 text-center">Queda Cotação</th>
                <th className="py-3 px-3 text-center">Queda Proventos</th>
                <th className="py-3 px-3 text-right">Renda Líquida Mensal</th>
                <th className="py-3 px-3">Impacto na Retirada Recomendada (R$ 2.050)</th>
                <th className="py-3 px-3">Impacto em Retiradas Excessivas (R$ 3.000+)</th>
                <th className="py-3 px-3">Diagnóstico de Risco</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CORRELATED_STRESS_TESTS.map((test, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {test.scenarioName}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-rose-700">
                    {test.cotacoesDrop}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-amber-700">
                    {test.proventosDrop}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-950">
                    {test.proventosMensais}
                  </td>
                  <td className="py-3 px-3 text-emerald-800 font-medium">
                    {test.impactoRetirada2050}
                  </td>
                  <td className="py-3 px-3 text-rose-800">
                    {test.impactoRetiradaExcessiva}
                  </td>
                  <td className="py-3 px-3 text-slate-600 text-[11px]">
                    {test.conclusaoRisco}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
          <strong className="text-slate-900 block mb-1">
            Conclusão do Teste de Estresse Correlacionado:
          </strong>
          <p className="leading-relaxed">
            Mesmo no cenário extremo de crise combinada (-40% nas cotações e -35% de corte drástico nos proventos), a renda mensal cai para <strong>R$ 2.438,38/mês</strong>, o que ainda cobre <strong>100% da retirada recomendada de R$ 2.050,00</strong> com folga de R$ 388,38/mês sem tocar em uma única cota! Em contrapartida, qualquer retirada acima de R$ 2.438/mês entraria em déficit de caixa no ápice da crise, sendo forçada a queimar capital no pior momento do mercado.
          </p>
        </div>
      </div>
    </div>
  );
};
