import React, { useState } from 'react';
import { EQUITIES_RANKING, REJECTED_EQUITIES } from '../data/investmentData';
import { TrendingUp, ShieldCheck, AlertTriangle, Briefcase, Landmark, CheckCircle } from 'lucide-react';
import { formatCurrencyBRL } from '../utils/calculator';

export const EquitiesView: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<string>('ITUB4');
  const activeStock = EQUITIES_RANKING.find(s => s.ticker === selectedStock) || EQUITIES_RANKING[0];

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <span>Etapa 3 & 4 — Análise Fundamentalista e Ranking de Ações</span>
          <span>·</span>
          <span>Seções 7, 8 e 10 do Relatório</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Universo de Ações Dividend Yield e Capacidade de Geração de Caixa
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-4xl leading-relaxed">
          Foram analisadas 35 companhias de setores regulados e defensivos (instituições financeiras líderes, geração e transmissão de energia elétrica, seguradoras e saneamento básico). O foco é selecionar empresas maduras, com retorno sobre o patrimônio líquido (ROE) elevado, margem operacional sólida e dividendos crescentes acima da inflação, excluindo companhias ciclícas alavancadas.
        </p>

        {/* Weights strip */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-700 block mb-2 uppercase tracking-wider">
            Critérios Oficiais de Pontuação das Ações (Ranking 0 a 100 pontos):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
              <span className="text-slate-500 block">Qualidade & Governança</span>
              <span className="font-bold text-slate-900 font-mono">Peso: 25%</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
              <span className="text-slate-500 block">Sustentab. Dividendos</span>
              <span className="font-bold text-slate-900 font-mono">Peso: 25%</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
              <span className="text-slate-500 block">Saúde Fin. & Caixa</span>
              <span className="font-bold text-slate-900 font-mono">Peso: 20%</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
              <span className="text-slate-500 block">Preço & Valuation</span>
              <span className="font-bold text-slate-900 font-mono">Peso: 15%</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
              <span className="text-slate-500 block">Cresc. & Perspectivas</span>
              <span className="font-bold text-slate-900 font-mono">Peso: 10%</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
              <span className="text-slate-500 block">Retorno Histórico</span>
              <span className="font-bold text-slate-900 font-mono">Peso: 5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selector & Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* List of Analyzed Stocks */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Ações Aprovadas no Ranking Oficial
          </span>
          {EQUITIES_RANKING.map((stock, index) => (
            <button
              key={stock.ticker}
              onClick={() => setSelectedStock(stock.ticker)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedStock === stock.ticker
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                    selectedStock === stock.ticker ? 'bg-slate-800 text-emerald-400' : 'bg-slate-100 text-slate-700'
                  }`}>
                    #{index + 1}
                  </span>
                  <span className="font-bold font-mono tracking-tight">{stock.ticker}</span>
                </div>
                <span className={`text-xs font-mono font-bold ${
                  selectedStock === stock.ticker ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  Nota: {stock.scores.total.toFixed(2)}
                </span>
              </div>
              <div className="text-xs mt-1.5 opacity-80 flex items-center justify-between">
                <span>{stock.sector}</span>
                <span className="font-mono">ROE: {stock.roe.toFixed(1)}% · DY: {stock.dy12m.toFixed(1)}%</span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Stock Dossier Card */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-mono text-slate-900">{activeStock.ticker}</span>
                <span className="text-xs text-slate-500 font-medium">· {activeStock.name}</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Setor: <strong className="text-slate-800">{activeStock.sector}</strong> · Governança: <strong className="text-slate-800">{activeStock.governance}</strong>
              </p>
            </div>
            <div className="text-right sm:text-right">
              <span className="text-xs text-slate-500 block uppercase">Pontuação Ponderada</span>
              <span className="text-2xl font-bold font-mono text-emerald-700 tabular-nums">
                {activeStock.scores.total.toFixed(2)} / 100
              </span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">Preço Atual</span>
              <span className="text-base font-bold font-mono text-slate-900">{formatCurrencyBRL(activeStock.price)}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">P/L (Múltiplo de Lucro)</span>
              <span className="text-base font-bold font-mono text-slate-900">{activeStock.pl.toFixed(1)}x</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">P/VP Atual</span>
              <span className="text-base font-bold font-mono text-slate-900">{activeStock.pvp.toFixed(2)}x</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">ROE (Rentabilidade PL)</span>
              <span className="text-base font-bold font-mono text-emerald-700">{activeStock.roe.toFixed(1)}%</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">Dividend Yield (12m)</span>
              <span className="text-sm font-semibold text-emerald-700 font-mono">{activeStock.dy12m.toFixed(2)}% bruto</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">Crescimento Div. (5a)</span>
              <span className="text-sm font-semibold text-slate-800 font-mono">{activeStock.dividendCagr5y}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">Payout Médio</span>
              <span className="text-sm font-semibold text-slate-800 font-mono">{activeStock.payout}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">Preço Teto Recomendado</span>
              <span className="text-sm font-semibold text-slate-800 font-mono">{formatCurrencyBRL(activeStock.entryPriceMax)}</span>
            </div>
          </div>

          {/* Scores Breakdown */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-700 block mb-3 uppercase tracking-wider">
              Auditoria de Notas por Critério (Escala 0 a 100):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="border border-slate-100 p-2.5 rounded-lg">
                <span className="text-slate-500 block">Qualidade & Governança (25%)</span>
                <span className="text-sm font-bold font-mono text-slate-900">{activeStock.scores.qualidadeNegocio} pts</span>
              </div>
              <div className="border border-slate-100 p-2.5 rounded-lg">
                <span className="text-slate-500 block">Sustentab. Dividendos (25%)</span>
                <span className="text-sm font-bold font-mono text-slate-900">{activeStock.scores.sustentabilidadeDividendos} pts</span>
              </div>
              <div className="border border-slate-100 p-2.5 rounded-lg">
                <span className="text-slate-500 block">Saúde Fin. & Caixa (20%)</span>
                <span className="text-sm font-bold font-mono text-slate-900">{activeStock.scores.saudeFinanceiraCaixa} pts</span>
              </div>
              <div className="border border-slate-100 p-2.5 rounded-lg">
                <span className="text-slate-500 block">Preço & Valuation (15%)</span>
                <span className="text-sm font-bold font-mono text-slate-900">{activeStock.scores.precoValuation} pts</span>
              </div>
              <div className="border border-slate-100 p-2.5 rounded-lg">
                <span className="text-slate-500 block">Cresc. & Perspectivas (10%)</span>
                <span className="text-sm font-bold font-mono text-slate-900">{activeStock.scores.crescimentoPerspectivas} pts</span>
              </div>
              <div className="border border-slate-100 p-2.5 rounded-lg">
                <span className="text-slate-500 block">Retorno Histórico (5%)</span>
                <span className="text-sm font-bold font-mono text-slate-900">{activeStock.scores.historicoRetorno} pts</span>
              </div>
            </div>
          </div>

          {/* Thesis, Frequency, Risks */}
          <div className="mt-6 pt-6 border-t border-slate-100 space-y-3 text-xs">
            <div>
              <strong className="text-slate-900 block font-semibold mb-1">Tese de Investimento & Foso Competitivo:</strong>
              <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                {activeStock.thesis}
              </p>
            </div>
            <div>
              <strong className="text-slate-900 block font-semibold mb-1">Periodicidade de Proventos & Alavancagem:</strong>
              <p className="text-slate-700 font-mono bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                Frequência: {activeStock.frequency} · Dívida/EBITDA: {activeStock.dividaEbitda}
              </p>
            </div>
            <div>
              <strong className="text-amber-900 block font-semibold mb-1">Principais Riscos Regulatórios e Setoriais:</strong>
              <p className="text-slate-700 bg-amber-50/50 p-3 rounded-lg border border-amber-200/60">
                {activeStock.risks}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rejected Equities */}
      <div className="bg-rose-50/40 border border-rose-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
          <h3 className="text-lg font-bold text-rose-950">
            Ações Reprovadas na Análise Fundamentalista — Risco de Destruição de Capital
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-rose-100/60 border-b border-rose-200 text-rose-900 font-semibold uppercase">
              <tr>
                <th className="py-2.5 px-3">Ticker</th>
                <th className="py-2.5 px-3">Nome / Setor</th>
                <th className="py-2.5 px-3">Yield Aparente</th>
                <th className="py-2.5 px-3">Motivo da Reprovação Técnica</th>
                <th className="py-2.5 px-3">Risco Fatal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-100 text-rose-950">
              {REJECTED_EQUITIES.map((stock) => (
                <tr key={stock.ticker} className="hover:bg-rose-100/40">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-900">{stock.ticker}</td>
                  <td className="py-2.5 px-3 font-medium">{stock.name} ({stock.segment})</td>
                  <td className="py-2.5 px-3 font-mono text-rose-700 font-semibold">{stock.dyAparente}</td>
                  <td className="py-2.5 px-3">{stock.reason}</td>
                  <td className="py-2.5 px-3 font-semibold text-rose-800">{stock.fatalRisk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
