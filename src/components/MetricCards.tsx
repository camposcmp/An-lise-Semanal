import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import { formatCurrencyBRL } from '../utils/calculator';
import { TOTAL_INVESTED, CASH_BALANCE, ANNUAL_NET_INCOME, MONTHLY_NET_INCOME_AVG, BLENDED_NET_YIELD } from '../data/investmentData';

export const MetricCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Metric 1 */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Patrimônio Inicial</span>
          <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Executável
          </span>
        </div>
        <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-slate-900 tabular-nums">
          {formatCurrencyBRL(500000)}
        </div>
        <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
          <span>FIIs (60%): R$ 300k</span>
          <span>·</span>
          <span>Ações (40%): R$ 200k</span>
          <span>·</span>
          <span>Caixa: R$ 1,50</span>
        </div>
      </div>

      {/* Metric 2 */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Proventos Líquidos</span>
          <span className="text-xs font-semibold font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {BLENDED_NET_YIELD.toFixed(2).replace('.', ',')}% a.a. líq
          </span>
        </div>
        <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-slate-900 tabular-nums">
          {formatCurrencyBRL(ANNUAL_NET_INCOME)}
        </div>
        <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
          <span>Média mensal líquida:</span>
          <span className="font-semibold text-emerald-700 font-mono">{formatCurrencyBRL(MONTHLY_NET_INCOME_AVG)}</span>
        </div>
      </div>

      {/* Metric 3: Retirada Máxima Sustentável */}
      <div className="bg-white border border-emerald-300 bg-emerald-50/30 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-950 uppercase tracking-wider">Você Pode Retirar</span>
          <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Consumo Sustentável
          </span>
        </div>
        <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-emerald-800 tabular-nums">
          R$ 2.050,00 <span className="text-xs font-normal text-slate-600">/mês</span>
        </div>
        <div className="mt-2 text-xs text-emerald-900 flex items-center justify-between">
          <span>54,65% dos proventos (R$ 24,6k/ano)</span>
          <span>·</span>
          <span className="font-semibold">Poder Real Preservado</span>
        </div>
      </div>

      {/* Metric 4: Reinvestimento Obrigatório */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Você Deve Reinvestir</span>
          <span className="text-xs text-slate-700 font-medium flex items-center gap-1 font-mono">
            IPCA 4,5% a.a.
          </span>
        </div>
        <div className="mt-2 text-2xl font-bold font-mono tracking-tight text-slate-900 tabular-nums">
          R$ 1.701,35 <span className="text-xs font-normal text-slate-500">/mês</span>
        </div>
        <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
          <span>45,35% dos proventos (R$ 20,4k/ano)</span>
          <span>·</span>
          <span>Mantém capital real</span>
        </div>
      </div>
    </div>
  );
};
