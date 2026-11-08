import React, { useState } from 'react';
import { RECOMMENDED_CASH_FLOW_12M, CONSUMPTION_CASH_FLOW_12M } from '../data/investmentData';
import { formatCurrencyBRL } from '../utils/calculator';
import { Calendar, Layers, ShieldCheck, ArrowDownCircle, ArrowUpCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

export const CashFlowCalendarView: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<'recommended' | 'consumption'>('recommended');

  const activeCashFlow = selectedScenario === 'recommended' ? RECOMMENDED_CASH_FLOW_12M : CONSUMPTION_CASH_FLOW_12M;
  const targetWithdrawal = selectedScenario === 'recommended' ? 2050 : 1875.68;
  const annualWithdrawal = selectedScenario === 'recommended' ? 24600 : 22508.10;
  const annualReinvested = selectedScenario === 'recommended' ? 20416.20 : 22508.10;

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <span>Etapa 7 — Calendário e Gestão de Fluxo de Caixa</span>
          <span>·</span>
          <span>Seções 19 e 20 do Relatório</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Cronograma de Recebimentos e Sazonalidade dos Proventos
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-4xl leading-relaxed">
          Enquanto os 6 fundos imobiliários depositam rendimentos impreterivelmente todos os meses (gerando <strong>R$ 2.381,87 mensais isentos</strong>), as 5 ações distribuem dividendos e JCP em datas sazonais específicas (BB Seguridade em março e agosto, ISA CTEEP em abril e novembro, Engie e Sanepar em maio, junho e dezembro, e Itaú com JCP mensal + bonificação de fim de ano). Para uniformizar os saques sem sobressaltos e garantir regularidade total, mantemos o <strong>Colchão de Amortecimento de R$ 5.000,00</strong>.
        </p>

        {/* Tab Selector */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedScenario('recommended')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              selectedScenario === 'recommended'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Tabela 1: Política Recomendada (Retirada R$ 2.050,00/mês · Reinvestimento R$ 1.701,35/mês)</span>
          </button>
          <button
            onClick={() => setSelectedScenario('consumption')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              selectedScenario === 'consumption'
                ? 'bg-sky-700 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Tabela 2: Preservação Estrita 100% em Dinheiro (Retirada R$ 1.875,68/mês · Reinvestimento R$ 1.875,67/mês)</span>
          </button>
        </div>
      </div>

      {/* Seasonality Chart (Custom SVG Bar Chart) */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Distribuição Mensal da Renda Líquida vs. Retirada Selecionada ({formatCurrencyBRL(targetWithdrawal)}/mês)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {selectedScenario === 'recommended'
                ? 'Na retirada recomendada de R$ 2.050,00, TODOS os 12 meses geram proventos superiores ao saque mensal, permitindo reinvestir R$ 1.701,35/mês de forma sistemática.'
                : 'Na preservação estrita de R$ 1.875,68, reinvestem-se R$ 1.875,67/mês em dinheiro, repondo 100% do IPCA de 4,5% a.a. diretamente pelo caixa.'}
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-right shrink-0">
            <span className="text-[11px] text-slate-500 block">Proventos Totais 12M</span>
            <span className="text-sm font-bold font-mono text-emerald-700">{formatCurrencyBRL(45016.20)}</span>
          </div>
        </div>

        {/* SVG Chart */}
        <div className="w-full h-64 relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 800 220">
            {/* Grid Lines */}
            <line x1="50" y1="20" x2="780" y2="20" stroke="#f1f5f9" strokeWidth="1" />
            <text x="40" y="24" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono">R$ 8k</text>

            <line x1="50" y1="70" x2="780" y2="70" stroke="#f1f5f9" strokeWidth="1" />
            <text x="40" y="74" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono">R$ 6k</text>

            <line x1="50" y1="120" x2="780" y2="120" stroke="#f1f5f9" strokeWidth="1" />
            <text x="40" y="124" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono">R$ 4k</text>

            {/* Target Withdrawal Line */}
            {selectedScenario === 'recommended' ? (
              <>
                <line x1="50" y1="159" x2="780" y2="159" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
                <text x="785" y="162" fill="#059669" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">Retirada: R$ 2.050</text>
              </>
            ) : (
              <>
                <line x1="50" y1="162" x2="780" y2="162" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 4" />
                <text x="785" y="165" fill="#0284c7" fontSize="10" fontWeight="bold" fontFamily="JetBrains Mono">Retirada: R$ 1.875,68</text>
              </>
            )}

            <line x1="50" y1="170" x2="780" y2="170" stroke="#f1f5f9" strokeWidth="1" />
            <text x="40" y="174" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="JetBrains Mono">R$ 2k</text>

            <line x1="50" y1="200" x2="780" y2="200" stroke="#cbd5e1" strokeWidth="1.5" />

            {/* Monthly Bars */}
            {activeCashFlow.map((item, idx) => {
              const x = 70 + idx * 58;
              const maxVal = 9000;
              const totalHeight = (item.proventosLiquidos / maxVal) * 180;
              const fiiHeight = (item.fiiNet / maxVal) * 180;
              const acoesHeight = ((item.proventosLiquidos - item.fiiNet) / maxVal) * 180;
              const yBase = 200;

              return (
                <g key={item.month}>
                  {/* FII portion (slate) */}
                  <rect
                    x={x}
                    y={yBase - fiiHeight}
                    width="34"
                    height={fiiHeight}
                    fill="#334155"
                    rx="3"
                  />
                  {/* Equities portion (emerald) */}
                  {acoesHeight > 0 && (
                    <rect
                      x={x}
                      y={yBase - fiiHeight - acoesHeight}
                      width="34"
                      height={acoesHeight}
                      fill="#10b981"
                      rx="3"
                    />
                  )}
                  {/* Value on top */}
                  <text
                    x={x + 17}
                    y={yBase - totalHeight - 6}
                    fill="#1e293b"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="JetBrains Mono"
                  >
                    {(item.proventosLiquidos / 1000).toFixed(1)}k
                  </text>
                  {/* Month Label */}
                  <text
                    x={x + 17}
                    y={215}
                    fill="#64748b"
                    fontSize="10"
                    textAnchor="middle"
                    fontWeight="500"
                  >
                    {item.month.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 bg-slate-700 rounded-xs" />
            <span className="text-slate-700">Rendimento Regular FIIs (Isento)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 bg-emerald-500 rounded-xs" />
            <span className="text-slate-700">Dividendos & JCP Líquido de Ações</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-0.5 border-t-2 border-dashed ${selectedScenario === 'recommended' ? 'border-emerald-500' : 'border-amber-500'}`} />
            <span className={`font-semibold ${selectedScenario === 'recommended' ? 'text-emerald-800' : 'text-amber-800'}`}>
              Retirada Mensal ({formatCurrencyBRL(targetWithdrawal)})
            </span>
          </div>
        </div>
      </div>

      {/* Full 12-Month Cash Flow Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <h3 className="text-lg font-bold text-slate-900">
            20. Demonstração Contábil do Fluxo de Caixa dos Primeiros 12 Meses — {selectedScenario === 'recommended' ? 'Política Recomendada (Retirada R$ 2.050,00/mês · Reinvestimento R$ 1.701,35/mês)' : 'Preservação Estrita 100% em Dinheiro (Retirada R$ 1.875,68/mês · Reinvestimento R$ 1.875,67/mês)'}
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
            Soma: Retirada ({formatCurrencyBRL(annualWithdrawal)}) + Reinvestido ({formatCurrencyBRL(annualReinvested)}) = {formatCurrencyBRL(45016.20)}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3">Mês / Período</th>
                <th className="py-3 px-3 text-right">Saldo Inicial Caixa</th>
                <th className="py-3 px-3 text-right">FIIs (Isentos)</th>
                <th className="py-3 px-3 text-right">Ações Líq.</th>
                <th className="py-3 px-3 text-right font-bold">Total Proventos</th>
                <th className="py-3 px-3 text-right font-bold text-amber-900">Retirada Efetiva</th>
                <th className="py-3 px-3 text-right font-bold text-emerald-700">Reinvestido em Caixa</th>
                <th className="py-3 px-3 text-right font-bold">Saldo Final Caixa</th>
                <th className="py-3 px-3">Comportamento Operacional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeCashFlow.map((row) => (
                <tr key={row.month} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {row.month}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-700">
                    {formatCurrencyBRL(row.saldoInicial)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-800">
                    {formatCurrencyBRL(row.fiiNet)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-800">
                    {formatCurrencyBRL(row.acoesNet)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-bold text-slate-950">
                    {formatCurrencyBRL(row.proventosLiquidos)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-amber-900 font-semibold">
                    {formatCurrencyBRL(row.retirada)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-bold text-emerald-700">
                    {formatCurrencyBRL(row.reinvestido)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                    {formatCurrencyBRL(row.saldoFinal)}
                  </td>
                  <td className="py-3 px-3 text-slate-500 text-[11px]">
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-100 font-bold border-t border-slate-300 text-slate-900">
              <tr>
                <td className="py-3 px-3 uppercase text-slate-700">Totais Anuais (12 Meses)</td>
                <td className="py-3 px-3 text-right font-mono text-slate-600">Buffer: R$ 5.000</td>
                <td className="py-3 px-3 text-right font-mono tabular-nums">R$ 28.582,44</td>
                <td className="py-3 px-3 text-right font-mono tabular-nums">R$ 16.433,76</td>
                <td className="py-3 px-3 text-right font-mono tabular-nums text-emerald-800 text-sm">
                  {formatCurrencyBRL(45016.20)}
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums text-amber-900 text-sm">
                  {formatCurrencyBRL(annualWithdrawal)}
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums text-emerald-800 text-sm">
                  {formatCurrencyBRL(annualReinvested)}
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-950 text-sm">
                  R$ 5.000,00
                </td>
                <td className="py-3 px-3 text-xs text-slate-600 font-normal">
                  {selectedScenario === 'recommended'
                    ? 'Identidade rigorosa: R$ 24.600,00 retirados + R$ 20.416,20 reinvestidos = R$ 45.016,20 proventos líquidos exatos.'
                    : 'Identidade rigorosa: R$ 22.508,10 retirados + R$ 22.508,10 reinvestidos = R$ 45.016,20 proventos líquidos exatos.'}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
