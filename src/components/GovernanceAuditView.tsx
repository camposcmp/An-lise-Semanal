import React from 'react';
import { MATHEMATICAL_AUDIT_VERIFICATIONS } from '../data/investmentData';
import { ShieldCheck, Scale, CheckCircle2, AlertCircle, FileSearch, ArrowRightCircle } from 'lucide-react';

export const GovernanceAuditView: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <span>Etapas 9, 10 & 11 — Tributação, Monitoramento & Auditoria</span>
          <span>·</span>
          <span>Seções 25, 26 e 27 do Relatório</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Governança Tributária, Rebalanceamento e Auditoria Matemática
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-4xl leading-relaxed">
          Toda estratégia institucional de investimentos requer conformidade estrita com as regras fiscais vigentes na data da análise, regras objetivas de rebalanceamento por aporte sem giro desnecessário de carteira e auditoria matemática cruzada e independente de cada número apresentado.
        </p>
      </div>

      {/* Section 25 Taxation & Costs */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="w-5 h-5 text-slate-800" />
          <h3 className="text-lg font-bold text-slate-900">
            25. Regime Tributário Vigente e Custos Operacionais
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <strong className="text-slate-900 block font-semibold mb-2">Rendimentos de Fundos Imobiliários (FIIs):</strong>
            <p className="text-slate-700 leading-relaxed">
              <strong>100% Isentos de Imposto de Renda</strong> para pessoa física, em conformidade com o Artigo 3º da Lei nº 11.033/2004 e atualizações da Lei nº 14.754/2023 (requisitos plenamente atendidos: fundos com mais de 100 cotistas negociados exclusivamente em bolsa e investidor detendo menos de 10% do total de cotas).
            </p>
          </div>

          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <strong className="text-slate-900 block font-semibold mb-2">Dividendos e Juros Sobre Capital Próprio (Ações):</strong>
            <p className="text-slate-700 leading-relaxed">
              · <strong>Dividendos de Ações:</strong> Isentos de IR para pessoa física sob o Artigo 10 da Lei nº 9.249/1995 vigente.<br />
              · <strong>Juros Sobre Capital Próprio (JCP):</strong> Tributados na fonte à alíquota definitiva de <strong>15% de IR</strong>. No relatório, todos os números líquidos de ações já descontam integralmente essa retenção.
            </p>
          </div>

          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <strong className="text-slate-900 block font-semibold mb-2">Ganho de Capital em Alienações de Ativos:</strong>
            <p className="text-slate-700 leading-relaxed">
              · <strong>FIIs:</strong> Alíquota de <strong>20% de IR</strong> sobre o ganho líquido em vendas de cotas (sem isenção de valor mensal).<br />
              · <strong>Ações:</strong> Alíquota de <strong>15% de IR</strong> sobre ganho de capital, com isenção fiscal para vendas de até R$ 20.000,00 no mês (operações comuns).
            </p>
          </div>

          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
            <strong className="text-slate-900 block font-semibold mb-2">Custos de Transação e B3:</strong>
            <p className="text-slate-700 leading-relaxed">
              Taxa de corretagem zero nas principais plataformas de investimentos; taxa de custódia zero na B3 para pessoa física; emolumentos e taxa de liquidação da B3 somam apenas <strong>~0,030%</strong> do volume financeiro das ordens executadas.
            </p>
          </div>
        </div>
      </div>

      {/* Section 26 Monitoring & Rebalancing Rules */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          26. Política de Monitoramento, Gatilhos de Saída e Rebalanceamento
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Princípio fundamental: <em>"Jamais vender um ativo apenas porque a cotação oscilou para baixo."</em> A volatilidade de preços é inerente à renda variável; o analista monitora a integridade dos fundamentos de geração de caixa:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
            <span className="font-bold text-slate-900 block mb-1">Gatilhos para Troca de Posição (Venda):</span>
            <ul className="space-y-1 text-slate-700 list-disc list-inside mt-2">
              <li>Fraude contábil ou grave deterioração da governança corporativa.</li>
              <li>Emissão desfavorável com diluição predatória recorrente de cotistas.</li>
              <li>Aumento descontrolado de vacância física crônica sem perspectiva de locação.</li>
              <li>Inadimplência não resolvida em devedores de CRIs com LTV comprometido.</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
            <span className="font-bold text-slate-900 block mb-1">Regra de Rebalanceamento Inteligente:</span>
            <p className="text-slate-700 mt-2 leading-relaxed">
              O rebalanceamento da carteira de R$ 500.000 é realizado <strong>exclusivamente através do direcionamento dos proventos mensais reinvestidos</strong>. Compram-se os ativos da carteira recomendada que estiverem mais abaixo de suas metas percentuais ou com maior desconto sobre o valor patrimonial, evitando despesas fiscais e custos de corretagem desnecessários.
            </p>
          </div>

          <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
            <span className="font-bold text-slate-900 block mb-1">Frequência de Acompanhamento:</span>
            <p className="text-slate-700 mt-2 leading-relaxed">
              · <strong>Mensal:</strong> Conferência dos proventos creditados na conta e apuração do fluxo de caixa versus a retirada sustentável programada.<br />
              · <strong>Trimestral:</strong> Leitura dos relatórios gerenciais e demonstrações financeiras das companhias.<br />
              · <strong>Semestral:</strong> Auditoria da regra dinâmica de reinvestimento e ajuste fino do colchão de liquidez.
            </p>
          </div>
        </div>
      </div>

      {/* Section 27 Mathematical Audit */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <FileSearch className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg font-bold text-slate-900">
            27. Tabela Oficial de Auditoria Matemática Independente dos Resultados
          </h3>
        </div>
        <p className="text-xs text-slate-600 mb-6">
          Verificação cruzada dos 15 itens mandatórios executados através do motor computacional determinístico em Python:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-3">Item</th>
                <th className="py-3 px-3">Critério Auditado</th>
                <th className="py-3 px-3">Status da Validação</th>
                <th className="py-3 px-3">Evidência Matemática / Documental</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MATHEMATICAL_AUDIT_VERIFICATIONS.map((item) => (
                <tr key={item.item} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3 font-mono font-bold text-slate-500">#{item.item}</td>
                  <td className="py-3 px-3 font-semibold text-slate-900">{item.check}</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                    {item.details}
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
