import React, { useState, useMemo } from 'react';
import { runDynamicSimulation, formatCurrencyBRL, formatPercent } from '../utils/calculator';
import { Sliders, AlertTriangle, ShieldCheck, Play, RotateCcw, CheckCircle2 } from 'lucide-react';

export const InteractiveSimulator: React.FC = () => {
  const [initialCapital, setInitialCapital] = useState<number>(500000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState<number>(2050);
  const [inflationRate, setInflationRate] = useState<number>(4.5);
  const [netYieldRate, setNetYieldRate] = useState<number>(9.0);
  const [adjustWithInflation, setAdjustWithInflation] = useState<boolean>(true);
  const [realGrowthRate, setRealGrowthRate] = useState<number>(1.5);

  const simulationData = useMemo(() => {
    return runDynamicSimulation({
      initialCapital,
      initialMonthlyWithdrawal: monthlyWithdrawal,
      adjustWithdrawalWithInflation: adjustWithInflation,
      annualInflation: inflationRate / 100,
      netYield: netYieldRate / 100,
      realCapitalGrowth: realGrowthRate / 100,
      years: 30
    });
  }, [initialCapital, monthlyWithdrawal, inflationRate, netYieldRate, adjustWithInflation, realGrowthRate]);

  const exhaustionYear = simulationData.find(d => d.isExhausted)?.year;
  const year10 = simulationData.find(d => d.year === 10);
  const year30 = simulationData.find(d => d.year === 30);

  const handleReset = () => {
    setInitialCapital(500000);
    setMonthlyWithdrawal(2050);
    setInflationRate(4.5);
    setNetYieldRate(9.0);
    setAdjustWithInflation(true);
    setRealGrowthRate(1.5);
  };

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <span>Laboratório de Modelagem Financeira</span>
          <span>·</span>
          <span>Simulador Interativo de Estresse & Sensibilidade</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Simulador Dinâmico de Renda, Retiradas e Preservação Patrimonial
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-4xl leading-relaxed">
          Altere os parâmetros abaixo em tempo real para visualizar como diferentes níveis de inflação, valores de saque e taxas de dividendo alteram a preservação ou esgotamento do poder de compra nos próximos 30 anos.
        </p>
      </div>

      {/* Control Panel Grid */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-slate-700" />
            <h3 className="text-base font-bold text-slate-900">Parâmetros do Cenário</h3>
          </div>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão Recomendado (R$ 500k / R$ 2.050)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Capital Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-700">Patrimônio Inicial:</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{formatCurrencyBRL(initialCapital)}</span>
            </div>
            <input
              type="range"
              min="200000"
              max="1500000"
              step="25000"
              value={initialCapital}
              onChange={(e) => setInitialCapital(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>R$ 200k</span>
              <span>R$ 500k</span>
              <span>R$ 1,5M</span>
            </div>
          </div>

          {/* Withdrawal Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-700">Retirada Mensal Inicial:</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{formatCurrencyBRL(monthlyWithdrawal)}/mês</span>
            </div>
            <input
              type="range"
              min="1000"
              max="6000"
              step="100"
              value={monthlyWithdrawal}
              onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>R$ 1.000</span>
              <span className="text-emerald-700 font-bold">R$ 2.050 (SWR)</span>
              <span>R$ 3.000</span>
              <span>R$ 6.000</span>
            </div>
          </div>

          {/* Inflation Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-700">Inflação Média Anual (IPCA):</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{formatPercent(inflationRate)} a.a.</span>
            </div>
            <input
              type="range"
              min="2.5"
              max="9.0"
              step="0.25"
              value={inflationRate}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>2,5%</span>
              <span>4,5% (Focus)</span>
              <span>9,0% (Estresse)</span>
            </div>
          </div>

          {/* Net Yield Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-700">Dividend Yield Líquido da Carteira:</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{formatPercent(netYieldRate)} a.a.</span>
            </div>
            <input
              type="range"
              min="6.0"
              max="13.0"
              step="0.25"
              value={netYieldRate}
              onChange={(e) => setNetYieldRate(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>6,0%</span>
              <span>9,0% (Recomendado)</span>
              <span>13,0%</span>
            </div>
          </div>

          {/* Real Capital Growth Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-slate-700">Crescimento Real Médio dos Ativos:</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{formatPercent(realGrowthRate)} a.a.</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="4.0"
              step="0.25"
              value={realGrowthRate}
              onChange={(e) => setRealGrowthRate(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0,0% (Ultraconservador)</span>
              <span>1,5% (Base)</span>
              <span>4,0%</span>
            </div>
          </div>

          {/* Inflation adjustment toggle */}
          <div className="space-y-2 flex flex-col justify-center">
            <span className="font-semibold text-slate-700">Correção Inflacionária dos Saques:</span>
            <label className="flex items-center gap-2 cursor-pointer p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                checked={adjustWithInflation}
                onChange={(e) => setAdjustWithInflation(e.target.checked)}
                className="w-4 h-4 rounded text-slate-900 accent-slate-900"
              />
              <span className="text-slate-800 font-medium">Reajustar saque anualmente pelo IPCA</span>
            </label>
            <span className="text-[10px] text-slate-500">
              {adjustWithInflation ? 'Simula a retirada reajustada pelo IPCA a cada 12 meses para manter o poder de compra.' : 'Mantém o saque congelado em valor nominal fixo.'}
            </span>
          </div>
        </div>

        {/* Live Status Diagnosis Banner */}
        <div className={`mt-6 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          exhaustionYear
            ? 'bg-rose-50 border-rose-200 text-rose-950'
            : (year30 && year30.realCapital >= initialCapital)
            ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
            : 'bg-amber-50 border-amber-200 text-amber-950'
        }`}>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mb-1">
              {exhaustionYear ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Risco de Esgotamento Patrimonial Detectado</span>
                </>
              ) : (year30 && year30.realCapital >= initialCapital) ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Estratégia 100% Sustentável (Preservação Integral)</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Consumo Parcial de Capital no Longo Prazo</span>
                </>
              )}
            </div>
            <p className="text-xs">
              {exhaustionYear ? (
                <span>O capital investido é <strong>completamente esgotado no Ano {exhaustionYear}</strong> (investidor com {61 + exhaustionYear} anos de idade). Reduza o saque ou complemente com a aposentadoria!</span>
              ) : (year30 && year30.realCapital >= initialCapital) ? (
                <span>O patrimônio chega aos 30 anos com <strong>{formatCurrencyBRL(year30.realCapital)} de poder de compra real</strong> (superior aos R$ 500k iniciais corrigidos pela inflação).</span>
              ) : (
                <span>O patrimônio nominal segue positivo, mas o <strong>poder de compra real aos 30 anos é reduzido para {formatCurrencyBRL(year30 ? year30.realCapital : 0)}</strong>.</span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs shrink-0 font-mono">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Real aos 10 Anos</span>
              <span className="text-sm font-bold text-slate-900">{formatCurrencyBRL(year10 ? year10.realCapital : 0)}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Real aos 30 Anos</span>
              <span className="text-sm font-bold text-slate-900">{formatCurrencyBRL(year30 ? year30.realCapital : 0)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Results Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Tabela Projetada dos Próximos 30 Anos com os Parâmetros Selecionados
        </h3>
        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider sticky top-0">
              <tr>
                <th className="py-2.5 px-3">Ano</th>
                <th className="py-2.5 px-3">Idade</th>
                <th className="py-2.5 px-3 text-right">Patrimônio Nominal</th>
                <th className="py-2.5 px-3 text-right font-bold">Patrimônio Real</th>
                <th className="py-2.5 px-3 text-right">Proventos Líq.</th>
                <th className="py-2.5 px-3 text-right">Retirada Total</th>
                <th className="py-2.5 px-3 text-right">Reinvestido / Déficit</th>
                <th className="py-2.5 px-3 text-right">Poder Mensal Moradia</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {simulationData.map((d) => (
                <tr key={d.year} className={`hover:bg-slate-50 ${d.isExhausted ? 'bg-rose-50/50' : ''}`}>
                  <td className="py-2 px-3 font-mono font-semibold text-slate-900">Ano {d.year}</td>
                  <td className="py-2 px-3 font-mono text-slate-600">{61 + d.year} anos</td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums">{formatCurrencyBRL(d.nominalCapital)}</td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums font-bold text-slate-900">{formatCurrencyBRL(d.realCapital)}</td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums text-slate-800">{formatCurrencyBRL(d.netProventos)}</td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums text-amber-900">{formatCurrencyBRL(d.retiradaNominal)}</td>
                  <td className={`py-2 px-3 text-right font-mono tabular-nums font-bold ${d.reinvestidoNominal >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {formatCurrencyBRL(d.reinvestidoNominal)}
                  </td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums font-semibold text-slate-700">
                    {formatCurrencyBRL(d.realRentPurchasingPower)}
                  </td>
                  <td className="py-2 px-3">
                    {d.isExhausted ? (
                      <span className="text-rose-700 font-bold font-mono">ESGOTADO</span>
                    ) : (
                      <span className="text-emerald-700 font-medium">Ativo</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
