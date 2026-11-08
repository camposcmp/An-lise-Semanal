import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowRight, UserCheck, Banknote, Scale, TrendingUp } from 'lucide-react';
import { MANDATORY_CONCLUSION_ANSWERS } from '../data/investmentData';

export const MandatoryConclusionView: React.FC<{ 
  onNavigateToPortfolio: () => void;
  onNavigateToWeekly?: () => void;
}> = ({ onNavigateToPortfolio, onNavigateToWeekly }) => {
  return (
    <div className="space-y-8">
      {/* Investor Profile Summary Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              <UserCheck className="w-4 h-4" /> Diagnóstico do Perfil do Investidor
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-white">
              Planejamento de Renda Sustentável & Preservação Patrimonial
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Curitiba-PR · 61 anos · Capital: R$ 500.000,00 · Sem novos aportes · Foco em Manutenção do Poder de Compra Real
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onNavigateToPortfolio}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-xs"
            >
              <span>Ver Carteira Executável</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {onNavigateToWeekly && (
              <button
                onClick={onNavigateToWeekly}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700 shadow-xs"
              >
                <span>Monitor Semanal & Aportes</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-xs text-slate-300">
          <div>
            <span className="text-slate-500 block uppercase">Retirada Sustentável</span>
            <span className="text-lg font-bold font-mono text-emerald-400">R$ 2.050 /mês</span>
          </div>
          <div>
            <span className="text-slate-500 block uppercase">Reinvestimento Manutenção</span>
            <span className="text-lg font-bold font-mono text-emerald-400">R$ 1.701 /mês</span>
          </div>
          <div>
            <span className="text-slate-500 block uppercase">Proventos Líquidos</span>
            <span className="text-lg font-bold font-mono text-white">R$ 3.751 /mês (9,00%)</span>
          </div>
          <div>
            <span className="text-slate-500 block uppercase">Poder de Compra Real</span>
            <span className="text-lg font-bold text-white">100% Preservado & Crescente</span>
          </div>
        </div>
      </div>

      {/* The Central Policy: Quanto Posso Retirar e Quanto Devo Reinvestir */}
      <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-6 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Scale className="w-6 h-6" />
          </div>
          <div className="space-y-3 w-full">
            <h2 className="text-lg font-bold text-emerald-950">
              Resposta Expressa e Fundamental: Quanto posso retirar e quanto devo reinvestir para manter, pelo menos, o poder de compra?
            </h2>
            <div className="text-sm text-emerald-950 leading-relaxed space-y-2">
              <p>
                A carteira de <strong>R$ 500.000,00</strong> gera <strong>R$ 45.016,20 líquidos ao ano</strong> (média de <strong>R$ 3.751,35 líquidos por mês</strong>, com yield de 9,00% a.a. já livre de impostos).
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-white border border-emerald-300 p-4 rounded-xl shadow-2xs space-y-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                    1. O Que Você Pode Retirar Mensalmente:
                  </span>
                  <div className="text-2xl font-bold font-mono text-emerald-900">
                    R$ 1.875,68 <span className="text-sm font-normal text-slate-600">a</span> R$ 2.050,00 <span className="text-xs font-normal text-slate-500">/mês</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Esse é o <strong>teto de retirada sustentável</strong> que você pode consumir livremente todos os meses, podendo reajustá-lo anualmente pela inflação (IPCA), sem jamais corroer o capital original investido.
                  </p>
                </div>

                <div className="bg-white border border-emerald-300 p-4 rounded-xl shadow-2xs space-y-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                    2. O Que Você Deve Reinvestir Obrigatoriamente:
                  </span>
                  <div className="text-2xl font-bold font-mono text-emerald-900">
                    R$ 1.701,35 <span className="text-sm font-normal text-slate-600">a</span> R$ 1.875,00 <span className="text-xs font-normal text-slate-500">/mês</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Parcela indispensável de reinvestimento em novas cotas/ações para <strong>neutralizar a inflação (IPCA de 4,5% a.a.)</strong> e amortizar o desgaste do papel dos CRIs, blindando o poder de compra do patrimônio para sempre.
                  </p>
                </div>
              </div>

              <div className="bg-white/90 border border-emerald-200 rounded-lg p-3 text-xs font-medium text-slate-800 mt-2">
                <strong className="text-emerald-900">IDENTIDADE EXATA DE FECHAMENTO:</strong> Retirada (R$ 2.050,00) + Reinvestimento (R$ 1.701,35) = <strong>R$ 3.751,35/mês</strong>. A defasagem teórica de caixa frente ao IPCA integral de R$ 1.875 é coberta pelo crescimento real composto das ações (R$ 466,67/mês), gerando um <strong>superávit real consolidado de +R$ 293,02/mês</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Conclusion Grid */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl font-bold text-slate-900">
            Conclusão Obrigatória — Respostas Objetivas aos Quesitos Oficiais
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Q1 */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              1. Melhores FIIs Identificados
            </span>
            <p className="text-sm font-semibold text-slate-900">{MANDATORY_CONCLUSION_ANSWERS.bestFIIs}</p>
            <p className="text-xs text-slate-600 mt-2">
              Privilegiados ativos de logística classe A, shoppings consolidados, renda urbana atípica e CRIs high grade CDI e IPCA de baixíssimo LTV.
            </p>
          </div>

          {/* Q2 */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              2. Melhores Ações Identificadas
            </span>
            <p className="text-sm font-semibold text-slate-900">{MANDATORY_CONCLUSION_ANSWERS.bestEquities}</p>
            <p className="text-xs text-slate-600 mt-2">
              Empresas líderes com vantagens competitivas intransponíveis, ROE elevado (15% a 72%), payout consistente e blindagem regulatória contra a inflação.
            </p>
          </div>

          {/* Q3 */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              3. Proporção Ideal entre FIIs e Ações
            </span>
            <p className="text-sm font-semibold text-slate-900">{MANDATORY_CONCLUSION_ANSWERS.bestRatio}</p>
            <p className="text-xs text-slate-600 mt-2">
              Vence as 7 simulações por conciliar a previsibilidade de caixa mensal dos FIIs (isenção fiscal) com o repasse real de lucros e dividendos do equity.
            </p>
          </div>

          {/* Q4 */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              4. Distribuição Exata dos R$ 500.000,00
            </span>
            <p className="text-sm font-semibold text-slate-900">{MANDATORY_CONCLUSION_ANSWERS.howToAllocate500k}</p>
            <p className="text-xs text-slate-600 mt-2 font-mono tabular-nums">
              Total Investido: R$ 499.998,50 | Cotas e ações inteiras calculadas a preços vigentes.
            </p>
          </div>

          {/* Q5 */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              5. Geração Efetiva de Proventos
            </span>
            <p className="text-sm font-semibold text-slate-900">{MANDATORY_CONCLUSION_ANSWERS.expectedIncome}</p>
            <p className="text-xs text-slate-600 mt-2">
              Renda calculada sobre bases recorrentes auditadas, expurgando lucros contábeis não recorrentes e antecipações artificiais.
            </p>
          </div>

          {/* Q6 & Q7 */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              6 & 7. Retirada Sustentável vs Reinvestimento Obrigatório
            </span>
            <p className="text-sm font-semibold text-slate-900">
              Retirada: {MANDATORY_CONCLUSION_ANSWERS.sustainableMonthlyWithdrawal} | Reinvestimento: {MANDATORY_CONCLUSION_ANSWERS.requiredReinvestment}
            </p>
            <p className="text-xs text-slate-600 mt-2">
              Garante a preservação matemática integral do poder de compra dos R$ 500k pelos próximos 30 anos.
            </p>
          </div>

          {/* Q8 & Q9 */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              8 & 9. Preservação do Poder de Compra Real
            </span>
            <p className="text-sm font-semibold text-emerald-800">{MANDATORY_CONCLUSION_ANSWERS.doesPreserveRealCapital}</p>
            <p className="text-xs text-slate-600 mt-2">
              Ao retirar até R$ 2.050/mês e reinvestir R$ 1.701/mês, o poder de compra cresce para R$ 527k em 10 anos e R$ 678k em 30 anos.
            </p>
          </div>

          {/* Q10 */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              10. Patrimônio Real em 5, 10, 15, 20 e 30 Anos
            </span>
            <div className="text-xs text-slate-700 space-y-1">
              <p><strong>Política C2 (Recomendada):</strong> 5a: R$ 509k · 10a: R$ 527k · 20a: R$ 588k · 30a: R$ 678k (Ganho Real).</p>
              <p><strong>Política C1 (Estrita 50/50):</strong> 5a: R$ 519k · 10a: R$ 546k · 20a: R$ 634k · 30a: R$ 766k (Máxima Preservação).</p>
            </div>
          </div>

          {/* Q11 */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 md:col-span-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              11. Principal Risco da Estratégia e Mitigação
            </span>
            <p className="text-sm font-semibold text-slate-900">{MANDATORY_CONCLUSION_ANSWERS.mainStrategyRisk}</p>
            <p className="text-xs text-slate-600 mt-2">
              Mitigação: Manter o colchão de liquidez de R$ 5.000 para absorver sazonalidades de proventos de ações e nunca consumir mais que a retirada sustentável recomendada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
