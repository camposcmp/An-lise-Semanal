import React, { useState } from 'react';
import { ALLOCATION_SCENARIOS, EXECUTABLE_PORTFOLIO, TOTAL_INVESTED, CASH_BALANCE, ANNUAL_NET_INCOME, MONTHLY_NET_INCOME_AVG, BLENDED_NET_YIELD } from '../data/investmentData';
import { formatCurrencyBRL, formatPercent } from '../utils/calculator';
import { PieChart, CheckCircle2, ShieldAlert, ArrowRight, Wallet, Check, AlertCircle } from 'lucide-react';

export const PortfolioOptimizerView: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<number>(3);
  const [filterType, setFilterType] = useState<'ALL' | 'FII' | 'AÇÃO'>('ALL');

  const filteredPositions = EXECUTABLE_PORTFOLIO.filter(p => {
    if (filterType === 'ALL') return true;
    if (filterType === 'FII') return p.type === 'FII';
    return p.type === 'Ação';
  });

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <span>Etapa 5 — Otimização de Carteira & Alocação Executável</span>
          <span>·</span>
          <span>Seções 11, 12 e 13 do Relatório</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Comparação dos 7 Cenários de Alocação e Carteira Executável de R$ 500.000,00
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-4xl leading-relaxed">
          Comparamos rigorosamente as sete proporções exigidas entre FIIs e Ações. O <strong>Cenário 3 (60% FIIs / 40% Ações)</strong> consagrou-se como a fronteira eficiente ideal para o investidor de 61 anos, combinando a alta previsibilidade e isenção tributária de proventos mensais dos FIIs para sustentar a retirada mensal com a proteção contra a inflação secular proporcionada pelo crescimento dos lucros e dividendos das ações.
        </p>
      </div>

      {/* Comparison Table of 7 Scenarios */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-between">
          <span>11. Matriz Comparativa Obrigatória das Sete Composições</span>
          <span className="text-xs text-slate-500 font-normal">Clique no cenário para destacar detalhes</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3">Cenário</th>
                <th className="py-3 px-3">Mix (FII / Ações)</th>
                <th className="py-3 px-3 text-right">Yield Liq. Médio</th>
                <th className="py-3 px-3 text-right">Renda Mensal Média</th>
                <th className="py-3 px-3 text-right">Crescimento Real</th>
                <th className="py-3 px-3 text-right">Retorno Total Real</th>
                <th className="py-3 px-3 text-right">Volatilidade Anual</th>
                <th className="py-3 px-3 text-center">Relação Sharpe</th>
                <th className="py-3 px-3">Diagnóstico de Adequação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ALLOCATION_SCENARIOS.map((scen) => {
                const isSelected = selectedScenarioId === scen.id;
                const isWinner = scen.id === 3;
                return (
                  <tr
                    key={scen.id}
                    onClick={() => setSelectedScenarioId(scen.id)}
                    className={`cursor-pointer transition-colors ${
                      isWinner
                        ? 'bg-emerald-50/70 hover:bg-emerald-50 font-medium'
                        : isSelected
                        ? 'bg-slate-100 hover:bg-slate-100'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-1.5">
                      {isWinner && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      <span>{scen.name}</span>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold">
                      {scen.fiiPct}% FII / {scen.acoesPct}% Ações
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-emerald-700 font-semibold">
                      {formatPercent(scen.netYield)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-900 font-semibold">
                      {formatCurrencyBRL(scen.monthlyAvg)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-700">
                      +{formatPercent(scen.realCapGrowth)} a.a.
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums font-bold text-slate-900">
                      +{formatPercent(scen.totalRealReturn)} a.a.
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-600">
                      {formatPercent(scen.volatility)}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-800">
                      {scen.sharpeProxy.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-slate-600 text-xs">
                      {scen.assessment}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Technical Callout: Markowitz Covariance & Multi-Period Sharpe Resolution */}
        <div className="mt-6 p-5 rounded-xl bg-slate-900 text-slate-100 text-xs space-y-4 border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Fundamentação Técnica da Escolha 60/40 vs. 80/20 (Resolução do Paradoxo do Sharpe Estático)</span>
          </div>

          <p className="leading-relaxed text-slate-300">
            <strong>Auditoria Técnica (Ponto A):</strong> O investidor observou com precisão que os cenários 80/20 e 70/30 apresentam Sharpe estático de <strong>0,51</strong>, enquanto o cenário 60/40 apresenta Sharpe de <strong>0,50</strong>. Por que a recomendação institucional consagrou o 60/40?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 font-mono">
            {/* Metodologia de Cálculo */}
            <div className="bg-slate-800/90 p-4 rounded-lg border border-slate-700 space-y-2">
              <span className="text-emerald-400 font-bold block">// Metodologia de Volatilidade de Markowitz (σ_p):</span>
              <div className="text-[11px] text-slate-200">
                σ_p = √ [ w_fii²·σ_fii² + w_ac²·σ_ac² + 2·w_fii·w_ac·σ_fii·σ_ac·ρ ]
              </div>
              <div className="text-[11px] text-slate-400 space-y-0.5">
                <p>· σ_fii = 11,0% a.a. (Volatilidade histórica do IFIX)</p>
                <p>· σ_ac = 20,0% a.a. (Volatilidade histórica de IDIV/IBOV)</p>
                <p>· ρ = 0,35 (Correlação histórica descorrelacionada)</p>
                <p>· 80/20: σ_p = 10,87% | Sharpe = 5,55% / 10,87% = <strong>0,51</strong></p>
                <p>· 60/40: σ_p = 12,02% | Sharpe = 6,00% / 12,02% = <strong>0,50</strong></p>
              </div>
            </div>

            {/* O Ponto Cego do Sharpe de 1 Período */}
            <div className="bg-slate-800/90 p-4 rounded-lg border border-slate-700 space-y-2">
              <span className="text-amber-400 font-bold block">// Por que o 60/40 Vence no Longo Prazo (10 a 30 Anos):</span>
              <div className="text-[11px] text-slate-300 leading-relaxed">
                O índice de Sharpe clássico é <strong>estático e míope a 1 ano</strong>: penaliza a volatilidade das ações no denominador, ignorando o crescimento secular dos dividendos.
                <br /><br />
                · <strong>FIIs distribuem 95%+ do lucro caixa:</strong> Quase zero retenção de lucros orgânicos (crescimento real de proventos de apenas 0,3% a.a.).
                <br />
                · <strong>Ações retêm lucros com ROE de 21,8%:</strong> Expandem dividendos reais em 3,3% a.a.
                <br />
                · <strong>Renda Real Mensal em 30 Anos:</strong> No 60/40, a renda atinge <strong>R$ 5.861/mês</strong> vs apenas <strong>R$ 4.988/mês</strong> no 80/20 (+17,5% em poder de compra).
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 border-t border-slate-800 pt-2">
            <strong>Conclusão Institucional:</strong> Em carteiras previdenciárias de aposentadoria (horizonte de 10 a 30 anos para investidor aos 61 anos), a otimização intertemporal de longevidade exige a maior resiliência de fluxo real do 60/40, superando a ligeira vantagem estática de curto prazo do 80/20.
          </p>
        </div>
      </div>

      {/* Internal Limits & Concentration Governance */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-3">
          12. Distribuição Interna e Regras de Limites de Exposição
        </h3>
        <p className="text-xs text-slate-600 mb-4">
          Para proteger o patrimônio contra perdas permanentes, foram fixados limites prudentes de alocação:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
            <span className="text-slate-500 uppercase font-semibold block">Limite Máximo por Ativo Individual</span>
            <span className="text-lg font-bold font-mono text-slate-900">12,0% (Máx R$ 60k)</span>
            <p className="text-slate-600 mt-1">Nenhum ativo concentra mais de 12% da carteira (HGLG11 lidera com 12%).</p>
          </div>
          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
            <span className="text-slate-500 uppercase font-semibold block">Limite Máximo por Gestor de FII</span>
            <span className="text-lg font-bold font-mono text-slate-900">22,0% por Gestora</span>
            <p className="text-slate-600 mt-1">Pátria/CSHG (HGLG + HGRU = 22,0%) e Kinea (KNCR + KNRI = 20,0%).</p>
          </div>
          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
            <span className="text-slate-500 uppercase font-semibold block">Limite por Setor em Ações</span>
            <span className="text-lg font-bold font-mono text-slate-900">15,0% por Setor</span>
            <p className="text-slate-600 mt-1">Energia dividida entre Geração (EGIE3 8%) e Transmissão (TRPL4 7%).</p>
          </div>
          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
            <span className="text-slate-500 uppercase font-semibold block">Crédito Privado / CRIs Total</span>
            <span className="text-lg font-bold font-mono text-slate-900">18,0% do Patrimônio</span>
            <p className="text-slate-600 mt-1">KNCR11 (10% CDI) + RBRR11 (8% IPCA), ambos com LTV inferior a 55%.</p>
          </div>
        </div>
      </div>

      {/* Executable Portfolio Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">
                13. Carteira Executável Recomendada — Composição Exata de R$ 500.000,00
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Baseada em preços reais observados, quantidades inteiras de cotas e ações e ordens liquidáveis na B3.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                filterType === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos (11 ativos)
            </button>
            <button
              onClick={() => setFilterType('FII')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                filterType === 'FII' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              FIIs (6 fundos · 60%)
            </button>
            <button
              onClick={() => setFilterType('AÇÃO')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                filterType === 'AÇÃO' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ações (5 empresas · 40%)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3">Ticker / Ativo</th>
                <th className="py-3 px-3">Classe & Segmento</th>
                <th className="py-3 px-3 text-right">Preço Unit.</th>
                <th className="py-3 px-3 text-right">Quantidade</th>
                <th className="py-3 px-3 text-right">Valor Investido</th>
                <th className="py-3 px-3 text-right">% Real</th>
                <th className="py-3 px-3 text-right">Yield Líq.</th>
                <th className="py-3 px-3 text-right">Renda Anual Líq.</th>
                <th className="py-3 px-3 text-right">Média Mensal</th>
                <th className="py-3 px-3">Frequência</th>
                <th className="py-3 px-3">Condição de Entrada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPositions.map((p) => (
                <tr key={p.ticker} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3">
                    <span className="font-bold font-mono text-slate-900 text-sm">{p.ticker}</span>
                    <span className="text-slate-500 block text-[11px] truncate max-w-[140px]">{p.name}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-medium text-slate-800">{p.type}</span>
                    <span className="text-slate-500 block text-[11px]">{p.segment}</span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-900">
                    {formatCurrencyBRL(p.price)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold tabular-nums text-slate-900">
                    {p.shares.toLocaleString('pt-BR')}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold tabular-nums text-slate-900">
                    {formatCurrencyBRL(p.totalInvested)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-600">
                    {formatPercent(p.actualPercent)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-emerald-700">
                    {formatPercent(p.netYield * 100)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-slate-900">
                    {formatCurrencyBRL(p.annualNetIncome)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-bold text-emerald-700">
                    {formatCurrencyBRL(p.monthlyNetIncome)}
                  </td>
                  <td className="py-3 px-3 text-slate-600 text-[11px]">
                    {p.frequency}
                  </td>
                  <td className="py-3 px-3 text-slate-600 text-[11px]">
                    {p.entryCondition}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-100/80 font-bold border-t border-slate-300 text-slate-900">
              <tr>
                <td colSpan={4} className="py-3 px-3 uppercase text-slate-700">Total Investido em Ativos</td>
                <td className="py-3 px-3 text-right font-mono tabular-nums text-sm text-slate-950">
                  {formatCurrencyBRL(TOTAL_INVESTED)}
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums">99,9997%</td>
                <td className="py-3 px-3 text-right font-mono tabular-nums text-emerald-800">
                  {BLENDED_NET_YIELD.toFixed(2).replace('.', ',')}% a.a.
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums text-emerald-800">
                  {formatCurrencyBRL(ANNUAL_NET_INCOME)}
                </td>
                <td className="py-3 px-3 text-right font-mono tabular-nums text-emerald-800">
                  {formatCurrencyBRL(MONTHLY_NET_INCOME_AVG)}
                </td>
                <td colSpan={2} className="py-3 px-3 text-xs text-slate-600 font-normal">
                  Saldo residual em Caixa: <strong className="text-slate-900 font-mono">{formatCurrencyBRL(CASH_BALANCE)}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Detailed justifications for each position */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-3">
            Justificativas de Inclusão e Riscos Específicos por Ativo:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {EXECUTABLE_PORTFOLIO.map((item) => (
              <div key={item.ticker} className="p-3 rounded-lg border border-slate-200/70 bg-slate-50/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold font-mono text-slate-900">{item.ticker} — {item.name}</span>
                  <span className="text-emerald-700 font-mono font-semibold">{formatCurrencyBRL(item.totalInvested)}</span>
                </div>
                <p className="text-slate-700 mb-1"><strong>Tese:</strong> {item.rationale}</p>
                <p className="text-slate-600"><strong>Risco Específico:</strong> {item.specificRisk}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Liquidity Reserve Dilemma */}
      <div className="bg-slate-50 border border-slate-300 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
          <div className="space-y-2 text-xs text-slate-700">
            <h4 className="text-sm font-bold text-slate-900">
              Análise Técnica: O Papel do Colchão de Liquidez e Regularidade dos Saques
            </h4>
            <p className="leading-relaxed">
              O investidor optou por alocar o capital em FIIs e ações para maximizar dividendos. Para garantir a regularidade ininterrupta dos saques mensais para suas despesas sem jamais precisar alienar cotas com deságio em momentos de estresse de mercado, desenhou-se o colchão de amortecimento operacional.
            </p>
            <div className="bg-white border border-slate-200 p-3 rounded-lg space-y-1">
              <strong className="text-slate-900 block">Quantificação de Cenário com Reserva Operacional de 12 Meses de Retiradas (R$ 24.600,00 no Tesouro Selic):</strong>
              <p>· Capital alocado em FIIs e Ações: <strong>R$ 475.400,00</strong> (gera R$ 42.786,00 líquidos ao ano em proventos).</p>
              <p>· Reserva de Liquidez (Tesouro Selic / CDB 100% CDI): <strong>R$ 24.600,00</strong> (gera ~R$ 2.250,00 líquidos ao ano com Selic a 11,25%).</p>
              <p>· Renda Líquida Total Combinada: <strong>R$ 45.036,00/ano (R$ 3.753,00/mês)</strong>, praticamente idêntica à carteira 100% renda variável, porém com blindagem total contra resgates forçados de cotas em bear markets!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
