import React, { useState } from 'react';
import { REINVESTMENT_POLICIES } from '../data/investmentData';
import { formatCurrencyBRL } from '../utils/calculator';
import { RefreshCw, ShieldCheck, AlertTriangle, Calculator, Sparkles, TrendingUp, CheckCircle, Scale } from 'lucide-react';

export const ReinvestmentPolicyView: React.FC = () => {
  const [selectedPolicyCode, setSelectedPolicyCode] = useState<string>('C2');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <span>Etapa 6 — Política de Distribuição, Reinvestimento e Consumo</span>
          <span>·</span>
          <span>Seções 14 a 18 do Relatório</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Princípio Fundamental de Sustentabilidade dos Proventos
        </h2>
        <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Regra de Ouro do Analista Institucional
          </div>
          <p className="text-base sm:text-lg font-semibold leading-relaxed">
            "O valor distribuído pelos ativos NÃO é automaticamente o valor que pode ser consumido."
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Fundos imobiliários e ações distribuem rendimentos brutos que incorporam a amortização inflacionária da dívida (em CRIs) ou o desgaste de ativos físicos (depreciação de tijolos). Consumir 100% dos dividendos recebidos equivale a liquidar silenciosamente frações do patrimônio, levando à corrosão fatal do poder de compra no horizonte de 15 a 30 anos.
          </p>
        </div>
      </div>

      {/* Audit Reconciliation Callout */}
      <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Scale className="w-5 h-5 text-emerald-700" />
          <h3 className="text-lg font-bold text-emerald-950">
            Demonstração Matemática de Fechamento de Caixa e Preservação Real
          </h3>
        </div>
        <p className="text-xs text-emerald-900 leading-relaxed mb-4">
          Para sanar qualquer ambiguidade de conciliação contábil, apresentamos abaixo a <strong>identidade estrita de fechamento em dinheiro</strong> e o <strong>balanço patrimonial real consolidado</strong> da política recomendada:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Quadro 1: Identidade Estrita de Caixa */}
          <div className="bg-white border border-emerald-200 rounded-xl p-4 shadow-2xs space-y-2.5">
            <span className="font-bold text-slate-900 text-sm block border-b border-slate-100 pb-2">
              Quadro 1: Identidade Estrita de Caixa (Dinheiro Vivo)
            </span>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-600">Proventos Líquidos Mensais Totais:</span>
              <span className="font-mono font-bold text-slate-900">R$ 3.751,35 (100,0%)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 text-amber-900">
              <span>(-) Retirada Recomendada para Moradia:</span>
              <span className="font-mono font-bold">R$ 2.050,00 (54,65%)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 text-emerald-700">
              <span>(=) Reinvestimento Obrigatório em Dinheiro:</span>
              <span className="font-mono font-bold">R$ 1.701,35 (45,35%)</span>
            </div>
            <div className="flex justify-between pt-2 font-bold text-slate-950 bg-slate-50 px-2 rounded">
              <span>Total Retirada + Reinvestimento em Caixa:</span>
              <span className="font-mono text-emerald-800">R$ 3.751,35 (Zero divergência)</span>
            </div>
            <p className="text-[11px] text-slate-500 pt-1 leading-relaxed">
              * A soma dos saques em dinheiro e das novas compras de cotas fecha exatamente no centavo dos proventos recebidos.
            </p>
          </div>

          {/* Quadro 2: Balanço Real Consolidado */}
          <div className="bg-white border border-emerald-200 rounded-xl p-4 shadow-2xs space-y-2.5">
            <span className="font-bold text-slate-900 text-sm block border-b border-slate-100 pb-2">
              Quadro 2: Balanço Real de Preservação Patrimonial
            </span>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-600">Meta Teórica de Reposição IPCA (4,5% a.a.):</span>
              <span className="font-mono font-semibold text-slate-700">R$ 1.875,00/mês</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-600">Reinvestimento Direto em Caixa:</span>
              <span className="font-mono font-semibold text-emerald-700">R$ 1.701,35/mês</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 text-amber-800">
              <span>Diferença Teórica de Caixa vs. IPCA Integral:</span>
              <span className="font-mono font-bold">-R$ 173,65/mês</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 text-emerald-800">
              <span>(+) Crescimento Real Acionário (40% carteira @ 2,8% a.a.):</span>
              <span className="font-mono font-bold">+R$ 466,67/mês</span>
            </div>
            <div className="flex justify-between pt-2 font-bold text-slate-950 bg-emerald-50 px-2 rounded">
              <span>(=) Superávit Real Consolidado:</span>
              <span className="font-mono text-emerald-700">+R$ 293,02/mês</span>
            </div>
            <p className="text-[11px] text-slate-600 pt-1 leading-relaxed">
              * A defasagem em caixa de R$ 173,65 é amplamente compensada pela retenção de lucros das ações líderes (ROE de 21,8%), garantindo expansão real do patrimônio.
            </p>
          </div>
        </div>
      </div>

      {/* Section 15 Mathematical Breakdown */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-slate-800" />
          <h3 className="text-lg font-bold text-slate-900">
            15. Decomposição das Duas Vias de Preservação Patrimonial
          </h3>
        </div>
        <p className="text-xs text-slate-600 mb-6">
          O investidor pode adotar duas vias sustentáveis no Ano 1 sobre o capital de R$ 500.000,00:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Opção C1: 100% via Caixa */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="font-bold text-slate-900 text-sm block mb-1">Via C1 — Preservação Estrita 100% em Dinheiro</span>
            <p className="text-slate-600 mb-3">Reinveste a inflação integral em dinheiro vivo sem contar com a valorização de ações:</p>
            <ul className="space-y-1.5 font-mono text-slate-800">
              <li>· Proventos Líquidos: <strong>R$ 3.751,35/mês</strong> (R$ 45.016,20/ano)</li>
              <li>· Reinvestimento em Caixa: <strong>R$ 1.875,67/mês</strong> (R$ 22.508,10/ano)</li>
              <li>· Retirada Permitida da Carteira: <strong>R$ 1.875,68/mês</strong> (R$ 22.508,10/ano)</li>
              <li>· Soma: R$ 1.875,68 + R$ 1.875,67 = <strong>R$ 3.751,35</strong> (100% exato)</li>
              <li>· Preservação Real Integral: Reinvestimento em dinheiro (R$ 1.875,67/mês) cobre 100% da meta de inflação (IPCA 4,5% a.a.) de forma imediata e autônoma.</li>
            </ul>
          </div>

          {/* Opção C2: Recomendada com R$ 2.050 */}
          <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50">
            <span className="font-bold text-emerald-950 text-sm block mb-1">Via C2 (Recomendada) — Retirada de R$ 2.050,00/mês</span>
            <p className="text-slate-700 mb-3">Maximiza a retirada da carteira, cobrindo o restante da inflação com a retenção de lucros das ações:</p>
            <ul className="space-y-1.5 font-mono text-slate-800">
              <li>· Proventos Líquidos: <strong>R$ 3.751,35/mês</strong> (R$ 45.016,20/ano)</li>
              <li>· Retirada Efetiva da Carteira: <strong>R$ 2.050,00/mês</strong> (R$ 24.600,00/ano)</li>
              <li>· Reinvestimento em Dinheiro: <strong>R$ 1.701,35/mês</strong> (R$ 20.416,20/ano)</li>
              <li>· Soma: R$ 2.050,00 + R$ 1.701,35 = <strong>R$ 3.751,35</strong> (100% exato)</li>
              <li>· Ganho Real Acionário Composto: A retenção de lucros das ações (+R$ 466,67/mês) supera a defasagem de caixa de R$ 173,65, gerando superávit real de +R$ 293,02/mês.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 16 Fixed Policies Comparison */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          16. Comparação Obrigatória das Políticas de Reinvestimento
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Análise comparativa das taxas de reinvestimento dos proventos e seus efeitos patrimoniais nominais e reais em 5, 10, 20 e 30 anos:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3">Código / Política</th>
                <th className="py-3 px-3 text-center">Retirada / Reinvest.</th>
                <th className="py-3 px-3 text-right">Retirada Mensal</th>
                <th className="py-3 px-3 text-right">Reinvestido Mensal</th>
                <th className="py-3 px-3 text-right">Real em 5 Anos</th>
                <th className="py-3 px-3 text-right">Real em 10 Anos</th>
                <th className="py-3 px-3 text-right">Real em 20 Anos</th>
                <th className="py-3 px-3 text-right">Real em 30 Anos</th>
                <th className="py-3 px-3">Sensibilidade de Esgotamento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {REINVESTMENT_POLICIES.map((pol) => {
                const isSelected = selectedPolicyCode === pol.code;
                const isRecommended = pol.code === 'C2';
                return (
                  <tr
                    key={pol.code}
                    onClick={() => setSelectedPolicyCode(pol.code)}
                    className={`cursor-pointer transition-colors ${
                      isRecommended
                        ? 'bg-emerald-50/80 hover:bg-emerald-50 font-medium'
                        : isSelected
                        ? 'bg-slate-100 hover:bg-slate-100'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      <div className="flex items-center gap-1.5">
                        {isRecommended && <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />}
                        <span>{pol.name.split('—')[0]}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold">
                      {pol.utilizedPercent}% / {pol.reinvestedPercent}%
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-900 font-semibold">
                      {formatCurrencyBRL(pol.monthlyAvailable)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-emerald-700 font-semibold">
                      {formatCurrencyBRL(pol.monthlyReinvested)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-800">
                      {formatCurrencyBRL(pol.real5y)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-800 font-bold">
                      {formatCurrencyBRL(pol.real10y)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-800">
                      {formatCurrencyBRL(pol.real20y)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-900 font-bold">
                      {formatCurrencyBRL(pol.real30y)}
                    </td>
                    <td className="py-3 px-3 text-xs text-slate-600">
                      {pol.exhaustionSensitivity}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected policy note */}
        {selectedPolicyCode && (
          <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <strong className="text-slate-900">
              Parecer Técnico sobre a {REINVESTMENT_POLICIES.find(p => p.code === selectedPolicyCode)?.name}:
            </strong>
            <p className="mt-1">
              {REINVESTMENT_POLICIES.find(p => p.code === selectedPolicyCode)?.note}
            </p>
          </div>
        )}
      </div>

      {/* Section 17 Dynamic Reinvestment Policy */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-3">
          <RefreshCw className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-bold text-slate-900">
            17. Regra Dinâmica de Reinvestimento — Metodologia Recursiva Completa
          </h3>
        </div>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Para garantir a reprodutibilidade integral dos cálculos de preservação real em 10 e 30 anos (Item C da auditoria), detalhamos a formulação recursiva contínua de Fisher:
        </p>

        <div className="bg-slate-900 text-emerald-400 p-5 rounded-xl font-mono text-xs sm:text-sm space-y-3">
          <div>
            <span className="text-slate-400">// Equação Recursiva de Preservação Patrimonial Real:</span>
          </div>
          <div className="text-white text-sm sm:text-base font-bold bg-slate-800 p-3 rounded-lg leading-relaxed">
            K_nom(t+1) = K_nom(t) × [1 + g_org] + R_caixa(t+1)
            <br />
            K_real(t+1) = K_nom(t+1) / (1 + π)^(t+1)
          </div>
          <div className="text-slate-300 text-xs space-y-1">
            <p>· <strong>K_nom(0):</strong> R$ 500.000,00 (Capital inicial investido)</p>
            <p>· <strong>π (Inflação IPCA):</strong> 4,50% a.a. (0,045)</p>
            <p>· <strong>g_org (Ganho Real Orgânico):</strong> 1,50% a.a. médio ponderado (ações retêm lucros a 21,8% ROE gerando 2,8% real; FIIs repassam IPCA nos contratos)</p>
            <p>· <strong>R_caixa (Reinvestimento em dinheiro):</strong> Proventos Líquidos(t) - Retirada(t)</p>
            <p>· <strong>Resultado em 10 Anos:</strong> K_real(10) = R$ 546.820 (Política C1) e R$ 527.100 (Política C2)</p>
            <p>· <strong>Resultado em 30 Anos:</strong> K_real(30) = R$ 766.800 (Política C1) e R$ 678.000 (Política C2)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
          <div className="border border-slate-200 p-3 rounded-lg">
            <strong className="text-slate-900 block mb-1">Regra para Inflação Alta:</strong>
            <p className="text-slate-600">
              Se a inflação acumulada de 12 meses superar 6,0%, a parcela de reinvestimento em dinheiro sobe automaticamente para 55% dos proventos.
            </p>
          </div>
          <div className="border border-slate-200 p-3 rounded-lg">
            <strong className="text-slate-900 block mb-1">Regra para Superávit Sazonal:</strong>
            <p className="text-slate-600">
              Em meses de bonificação de ações (ex: Dezembro com R$ 8.484 recebidos), a retirada é mantida fixa em R$ 2.050 e todo o saldo (R$ 6.434) é reinvestido.
            </p>
          </div>
          <div className="border border-slate-200 p-3 rounded-lg">
            <strong className="text-slate-900 block mb-1">Blindagem de Crises:</strong>
            <p className="text-slate-600">
              Em momentos de corte severo de proventos no mercado, o investidor mantém a integridade das cotas e aciona temporariamente o colchão de liquidez de R$ 5.000.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
