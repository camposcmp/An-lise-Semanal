import React, { useState } from 'react';
import { FII_RANKING, REJECTED_FIIS } from '../data/investmentData';
import { Building, ShieldCheck, AlertTriangle, Layers, Percent, FileText, CheckCircle } from 'lucide-react';
import { formatCurrencyBRL, formatPercent } from '../utils/calculator';

export const FIIView: React.FC = () => {
  const [selectedFII, setSelectedFII] = useState<string>('HGLG11');
  const activeAsset = FII_RANKING.find(f => f.ticker === selectedFII) || FII_RANKING[0];

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <span>Etapa 2 & 4 — Análise Completa e Ranking de FIIs</span>
          <span>·</span>
          <span>Seções 5, 6 e 9 do Relatório</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Universo de Fundos Imobiliários e Auditoria de Sustentabilidade
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-4xl leading-relaxed">
          Foram auditados 48 fundos imobiliários negociados na B3 entre os segmentos de logística, shopping centers, renda urbana, híbridos e recebíveis (CRIs). A seleção priorizou gestão institucional independente, vacância estrutural baixa, contratos atípicos ou indexação protegida, eliminando armadilhas de yield elevado e fundos alavancados.
        </p>

        {/* Weights strip */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-700 block mb-2 uppercase tracking-wider">
            Critérios Oficiais de Pontuação (Ranking 0 a 100 pontos):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
              <span className="text-slate-500 block">Qualidade & Gestão</span>
              <span className="font-bold text-slate-900 font-mono">Peso: 25%</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
              <span className="text-slate-500 block">Sustentabilidade</span>
              <span className="font-bold text-slate-900 font-mono">Peso: 25%</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
              <span className="text-slate-500 block">Saúde Financeira</span>
              <span className="font-bold text-slate-900 font-mono">Peso: 20%</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
              <span className="text-slate-500 block">Preço & Valuation</span>
              <span className="font-bold text-slate-900 font-mono">Peso: 15%</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5">
              <span className="text-slate-500 block">Diversif. & Liquidez</span>
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
        {/* List of Analyzed FIIs */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            FIIs Aprovados no Ranking Oficial
          </span>
          {FII_RANKING.map((fii, index) => (
            <button
              key={fii.ticker}
              onClick={() => setSelectedFII(fii.ticker)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedFII === fii.ticker
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                    selectedFII === fii.ticker ? 'bg-slate-800 text-emerald-400' : 'bg-slate-100 text-slate-700'
                  }`}>
                    #{index + 1}
                  </span>
                  <span className="font-bold font-mono tracking-tight">{fii.ticker}</span>
                </div>
                <span className={`text-xs font-mono font-bold ${
                  selectedFII === fii.ticker ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  Nota: {fii.scores.total.toFixed(2)}
                </span>
              </div>
              <div className="text-xs mt-1.5 opacity-80 flex items-center justify-between">
                <span>{fii.segment}</span>
                <span className="font-mono">P/VP: {fii.pvp.toFixed(2)} · DY: {fii.dy12m.toFixed(1)}%</span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected FII Dossier Card */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-mono text-slate-900">{activeAsset.ticker}</span>
                <span className="text-xs text-slate-500 font-medium">· {activeAsset.name}</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Gestora: <strong className="text-slate-800">{activeAsset.manager}</strong> · Segmento: <strong className="text-slate-800">{activeAsset.segment}</strong>
              </p>
            </div>
            <div className="text-right sm:text-right">
              <span className="text-xs text-slate-500 block uppercase">Pontuação Ponderada</span>
              <span className="text-2xl font-bold font-mono text-emerald-700 tabular-nums">
                {activeAsset.scores.total.toFixed(2)} / 100
              </span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">Cotação Atual</span>
              <span className="text-base font-bold font-mono text-slate-900">{formatCurrencyBRL(activeAsset.price)}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">Valor Patrimonial (VP)</span>
              <span className="text-base font-bold font-mono text-slate-900">{formatCurrencyBRL(activeAsset.vp)}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">P/VP Atual</span>
              <span className={`text-base font-bold font-mono ${activeAsset.pvp < 1 ? 'text-emerald-700' : 'text-slate-900'}`}>
                {activeAsset.pvp.toFixed(2)}x {activeAsset.pvp < 1 && `(${((1 - activeAsset.pvp) * 100).toFixed(0)}% desc)`}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">Dividend Yield (12m)</span>
              <span className="text-base font-bold font-mono text-emerald-700">{activeAsset.dy12m.toFixed(2)}% a.a.</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">Patrimônio Líquido</span>
              <span className="text-sm font-semibold text-slate-800 font-mono">{activeAsset.patrimonioLiquido}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">Liquidez Diária Média</span>
              <span className="text-sm font-semibold text-slate-800 font-mono">{activeAsset.liquidezDiaria}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">Vacância / Inadimplência</span>
              <span className="text-sm font-semibold text-slate-800 font-mono">{activeAsset.vacancy}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-500 block">Preço Teto de Entrada</span>
              <span className="text-sm font-semibold text-slate-800 font-mono">{formatCurrencyBRL(activeAsset.entryPriceMax)}</span>
            </div>
          </div>

          {/* Scores Breakdown */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-700 block mb-3 uppercase tracking-wider">
              Auditoria de Notas por Critério (Escala 0 a 100):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="border border-slate-100 p-2.5 rounded-lg">
                <span className="text-slate-500 block">Qualidade & Gestão (25%)</span>
                <span className="text-sm font-bold font-mono text-slate-900">{activeAsset.scores.qualidadeGestao} pts</span>
              </div>
              <div className="border border-slate-100 p-2.5 rounded-lg">
                <span className="text-slate-500 block">Sustentabilidade (25%)</span>
                <span className="text-sm font-bold font-mono text-slate-900">{activeAsset.scores.sustentabilidadeRendimentos} pts</span>
              </div>
              <div className="border border-slate-100 p-2.5 rounded-lg">
                <span className="text-slate-500 block">Saúde Financeira (20%)</span>
                <span className="text-sm font-bold font-mono text-slate-900">{activeAsset.scores.saudeFinanceiraRiscos} pts</span>
              </div>
              <div className="border border-slate-100 p-2.5 rounded-lg">
                <span className="text-slate-500 block">Preço / Valuation (15%)</span>
                <span className="text-sm font-bold font-mono text-slate-900">{activeAsset.scores.precoValuation} pts</span>
              </div>
              <div className="border border-slate-100 p-2.5 rounded-lg">
                <span className="text-slate-500 block">Diversif. / Liquidez (10%)</span>
                <span className="text-sm font-bold font-mono text-slate-900">{activeAsset.scores.diversificacaoLiquidez} pts</span>
              </div>
              <div className="border border-slate-100 p-2.5 rounded-lg">
                <span className="text-slate-500 block">Retorno Histórico (5%)</span>
                <span className="text-sm font-bold font-mono text-slate-900">{activeAsset.scores.historicoRetorno} pts</span>
              </div>
            </div>
          </div>

          {/* Thesis, Contracts, Risks */}
          <div className="mt-6 pt-6 border-t border-slate-100 space-y-3 text-xs">
            <div>
              <strong className="text-slate-900 block font-semibold mb-1">Fundamentação da Tese:</strong>
              <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                {activeAsset.thesis}
              </p>
            </div>
            <div>
              <strong className="text-slate-900 block font-semibold mb-1">Perfil Contratual / Alavancagem:</strong>
              <p className="text-slate-700 font-mono bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                {activeAsset.contractProfile} · {activeAsset.ltvOrDuration}
              </p>
            </div>
            <div>
              <strong className="text-amber-900 block font-semibold mb-1">Principais Riscos Monitorados:</strong>
              <p className="text-slate-700 bg-amber-50/50 p-3 rounded-lg border border-amber-200/60">
                {activeAsset.risks}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rejected FIIs */}
      <div className="bg-rose-50/40 border border-rose-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
          <h3 className="text-lg font-bold text-rose-950">
            FIIs Reprovados na Análise Fundamentalista — Armadilhas de Yield
          </h3>
        </div>
        <p className="text-xs text-rose-800 mb-4 max-w-3xl">
          Estes fundos apresentam dividend yields aparentes elevados na tela de corretoras, mas possuem graves desvios estruturais de crédito, risco de default de emissores ou alavancagem descontrolada. São estritamente reprovados para o perfil do investidor.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-rose-100/60 border-b border-rose-200 text-rose-900 font-semibold uppercase">
              <tr>
                <th className="py-2.5 px-3">Ticker</th>
                <th className="py-2.5 px-3">Nome / Segmento</th>
                <th className="py-2.5 px-3">Yield Aparente</th>
                <th className="py-2.5 px-3">Motivo da Reprovação</th>
                <th className="py-2.5 px-3">Risco Fatal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-100 text-rose-950">
              {REJECTED_FIIS.map((fii) => (
                <tr key={fii.ticker} className="hover:bg-rose-100/40">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-900">{fii.ticker}</td>
                  <td className="py-2.5 px-3 font-medium">{fii.name} ({fii.segment})</td>
                  <td className="py-2.5 px-3 font-mono text-rose-700 font-semibold">{fii.dyAparente}</td>
                  <td className="py-2.5 px-3">{fii.reason}</td>
                  <td className="py-2.5 px-3 font-semibold text-rose-800">{fii.fatalRisk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
