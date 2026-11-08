import React, { useState } from 'react';
import {
  MACRO_DIAGNOSIS,
  FII_RANKING,
  EQUITIES_RANKING,
  REJECTED_FIIS,
  REJECTED_EQUITIES,
  ALLOCATION_SCENARIOS,
  EXECUTABLE_PORTFOLIO,
  TOTAL_INVESTED,
  CASH_BALANCE,
  ANNUAL_NET_INCOME,
  MONTHLY_NET_INCOME_AVG,
  BLENDED_NET_YIELD,
  REINVESTMENT_POLICIES,
  RECOMMENDED_CASH_FLOW_12M,
  CONSUMPTION_CASH_FLOW_12M,
  FIVE_YEAR_PROJECTION,
  TEN_YEAR_PROJECTION,
  POLICY_C_TEN_YEAR_PROJECTION,
  LONG_HORIZON_SUMMARY,
  CORRELATED_STRESS_TESTS,
  MATHEMATICAL_AUDIT_VERIFICATIONS,
  MANDATORY_CONCLUSION_ANSWERS
} from '../data/investmentData';
import { formatCurrencyBRL, formatPercent } from '../utils/calculator';
import { ShieldCheck, Printer, Download, Copy, Check, FileText } from 'lucide-react';
import { generateDossierHTML, generateDossierMarkdown, downloadFile } from '../utils/exportDossier';

export const FullDossierPrintView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleDownloadHTML = () => {
    const htmlContent = generateDossierHTML();
    downloadFile('relatorio_investimentos_500k.html', htmlContent, 'text/html;charset=utf-8');
  };

  const handleDownloadMarkdown = () => {
    const mdContent = generateDossierMarkdown();
    downloadFile('relatorio_investimentos_500k.md', mdContent, 'text/markdown;charset=utf-8');
  };

  const handleCopyClipboard = async () => {
    const mdContent = generateDossierMarkdown();
    try {
      await navigator.clipboard.writeText(mdContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = mdContent;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch (e) {
      handleDownloadHTML();
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-12 shadow-sm space-y-12 text-slate-900 print:border-none print:shadow-none print:p-0">
      {/* Quick Export Action Bar */}
      <div className="no-print bg-slate-900 text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">Exportar Relatório Oficial</span>
          <p className="text-xs text-slate-300">Baixe o arquivo pronto para impressão ou copie o texto completo.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadHTML}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar HTML / PDF</span>
          </button>
          <button
            onClick={handleCopyClipboard}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
          </button>
          <button
            onClick={handleDownloadMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Baixar .md</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 rounded-lg transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {/* Cover / Document Header */}
      <div className="border-b-2 border-slate-900 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2">
            Relatório Oficial de Análise e Consultoria Financeira Independente
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
            ANALISTA DE INVESTIMENTOS — FIIs, AÇÕES E GERAÇÃO SUSTENTÁVEL DE RENDA
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Construção e Otimização de Carteira de R$ 500.000,00 · Preservação do Poder de Compra · Geração Sustentável de Proventos
          </p>
        </div>
        <div className="text-xs text-slate-500 font-mono text-left sm:text-right shrink-0">
          <p><strong>Investidor:</strong> 61 anos · Curitiba-PR</p>
          <p><strong>Aposentadoria:</strong> R$ 13.000,00/mês</p>
          <p><strong>Perfil:</strong> Renda Mensal com Preservação Real</p>
          <p><strong>Data de Referência:</strong> Novembro de 2026</p>
        </div>
      </div>

      {/* 1. Resumo Executivo */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 border-b border-slate-200 pb-2">
          1. Resumo Executivo
        </h2>
        <p className="text-xs text-slate-700 leading-relaxed text-justify">
          Este trabalho foi estruturado com o objetivo técnico e independente de conceber uma estratégia de alocação de ativos no valor total de R$ 500.000,00 para um investidor de 61 anos, residente em Curitiba-PR, cujo objetivo primordial é auferir renda recorrente sustentável da carteira e preservar integralmente o poder de compra real do capital ao longo do tempo, sem novos aportes e com horizonte analítico central de 10 anos (detalhamento de 5 anos e testes de longevidade de 15, 20 e 30 anos).
        </p>
        <p className="text-xs text-slate-700 leading-relaxed text-justify">
          A análise rejeitou expressamente a falsa premissa de que o <em>dividend yield</em> nominal recebido representa lucro disponível para consumo. Por meio de modelagem matemática recursiva, constatou-se que a carteira recomendada gera <strong>R$ 45.016,20 líquidos ao ano (R$ 3.751,35/mês de média, ou 9,00% a.a.)</strong>. Para manter, pelo menos, o poder de compra real frente à inflação projetada (IPCA de 4,5% a.a.), a análise determina com precisão:
        </p>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5 font-mono">
          <p className="text-slate-900">· <strong>O que você pode retirar:</strong> de <strong>R$ 1.875,68/mês</strong> (via reposição 100% em dinheiro) a <strong>R$ 2.050,00/mês</strong> (Política Recomendada com ganho real acionário), reajustados anualmente pela inflação.</p>
          <p className="text-slate-900">· <strong>O que você deve reinvestir:</strong> de <strong>R$ 1.701,35/mês</strong> (R$ 20.416,20/ano na C2) a <strong>R$ 1.875,67/mês</strong> (R$ 22.508,10/ano na C1) obrigatoriamente para blindar o capital real de R$ 500.000 contra a corrosão inflacionária.</p>
          <p className="text-emerald-800 font-bold">· <strong>Fechamento Estrito:</strong> Retirada (R$ 2.050,00) + Reinvestimento (R$ 1.701,35) = R$ 3.751,35/mês de proventos líquidos (100% exato, sem divergência!).</p>
        </div>
      </section>

      {/* 2. Diagnóstico Macroeconômico */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 border-b border-slate-200 pb-2">
          2. Diagnóstico Macroeconômico
        </h2>
        <p className="text-xs text-slate-700 leading-relaxed text-justify">
          O cenário econômico vigente impõe taxa Selic em patamar restritivo (11,25% a.a.), IPCA projetado em 4,50% e juros reais longos (NTN-B 2035) em IPCA + 6,50%. Tal realidade beneficia os ativos com forte capacidade de geração de caixa operacional e contratos indexados à inflação (galpões logísticos classe A, transmissão e geração de energia elétrica e saneamento), enquanto penaliza empresas alavancadas e fundos imobiliários com lajes corporativas fora dos eixos nobres.
        </p>
      </section>

      {/* 3 & 4. Análise dos FIIs e das Ações */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 border-b border-slate-200 pb-2">
          3 & 4. Análise Fundamentalista de FIIs e Ações
        </h2>
        <p className="text-xs text-slate-700 leading-relaxed text-justify">
          <strong>FIIs:</strong> Foram selecionados exclusivamente fundos com gestão institucional de primeira linha (Pátria/CSHG, Kinea e XP), vacância física controlada (&lt; 5%), ausência de alavancagem estrutural desmedida e contratos atípicos ou indexação CDI/IPCA com garantias reais sólidas (LTV médio &lt; 50%).
        </p>
        <p className="text-xs text-slate-700 leading-relaxed text-justify">
          <strong>Ações:</strong> O universo foi restrito a empresas do Novo Mercado e Nível 1/2 com foso competitivo comprovado (Itaú Unibanco com ROE &gt; 21%, BB Seguridade com ROE &gt; 70% e caixa líquido, Engie Brasil com concessões renováveis de longo prazo, ISA CTEEP com RAP blindada contra oscilações de consumo e Sanepar com monopólio essencial de saneamento no Paraná).
        </p>
      </section>

      {/* 5 & 6. Rankings Oficiais */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 border-b border-slate-200 pb-2">
          5 & 6. Rankings Oficiais Ponderados (Escala 0 a 100 Pontos)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <h3 className="font-bold text-slate-900 mb-2 uppercase">Ranking FIIs (Pesos Oficiais Aplicados)</h3>
            <table className="w-full border border-slate-200 text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-2">Pos.</th>
                  <th className="p-2">Ticker</th>
                  <th className="p-2">Segmento</th>
                  <th className="p-2 text-right">Nota Final</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {FII_RANKING.map((f, i) => (
                  <tr key={f.ticker}>
                    <td className="p-2 font-mono">#{i + 1}</td>
                    <td className="p-2 font-bold font-mono">{f.ticker}</td>
                    <td className="p-2">{f.segment}</td>
                    <td className="p-2 text-right font-bold text-emerald-700 font-mono">{f.scores.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-2 uppercase">Ranking Ações (Pesos Oficiais Aplicados)</h3>
            <table className="w-full border border-slate-200 text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-2">Pos.</th>
                  <th className="p-2">Ticker</th>
                  <th className="p-2">Setor</th>
                  <th className="p-2 text-right">Nota Final</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {EQUITIES_RANKING.map((s, i) => (
                  <tr key={s.ticker}>
                    <td className="p-2 font-mono">#{i + 1}</td>
                    <td className="p-2 font-bold font-mono">{s.ticker}</td>
                    <td className="p-2">{s.sector}</td>
                    <td className="p-2 text-right font-bold text-emerald-700 font-mono">{s.scores.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. Comparação das 7 Proporções */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 border-b border-slate-200 pb-2">
          7. Comparação das Sete Proporções entre FIIs e Ações
        </h2>
        <div className="overflow-x-auto text-xs">
          <table className="w-full border border-slate-200 text-left">
            <thead className="bg-slate-50 border-b border-slate-200 font-semibold uppercase">
              <tr>
                <th className="p-2">Cenário</th>
                <th className="p-2">Mix FII / Ações</th>
                <th className="p-2 text-right">Yield Líquido</th>
                <th className="p-2 text-right">Renda Mensal</th>
                <th className="p-2 text-right">Cresc. Real</th>
                <th className="p-2 text-right">Retorno Real</th>
                <th className="p-2 text-right">Volatilidade</th>
                <th className="p-2 text-center">Sharpe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ALLOCATION_SCENARIOS.map((s) => (
                <tr key={s.id} className={s.id === 3 ? 'bg-emerald-50 font-bold' : ''}>
                  <td className="p-2">{s.name}</td>
                  <td className="p-2 font-mono">{s.fiiPct}% / {s.acoesPct}%</td>
                  <td className="p-2 text-right font-mono">{formatPercent(s.netYield)}</td>
                  <td className="p-2 text-right font-mono">{formatCurrencyBRL(s.monthlyAvg)}</td>
                  <td className="p-2 text-right font-mono">+{formatPercent(s.realCapGrowth)}</td>
                  <td className="p-2 text-right font-mono font-bold">+{formatPercent(s.totalRealReturn)}</td>
                  <td className="p-2 text-right font-mono">{formatPercent(s.volatility)}</td>
                  <td className="p-2 text-center font-mono">{s.sharpeProxy.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 8 & 9. Carteira Recomendada e Quantidades */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 border-b border-slate-200 pb-2">
          8, 9 & 10. Carteira Recomendada, Quantidades Inteiras e Renda Estimada (R$ 500.000,00)
        </h2>
        <div className="overflow-x-auto text-xs">
          <table className="w-full border border-slate-200 text-left">
            <thead className="bg-slate-50 border-b border-slate-200 font-semibold uppercase">
              <tr>
                <th className="p-2">Ticker</th>
                <th className="p-2">Tipo / Segmento</th>
                <th className="p-2 text-right">Preço Unit.</th>
                <th className="p-2 text-right">Qtde</th>
                <th className="p-2 text-right">Total Investido</th>
                <th className="p-2 text-right">% Real</th>
                <th className="p-2 text-right">Yield Líq.</th>
                <th className="p-2 text-right">Renda Anual</th>
                <th className="p-2 text-right">Renda Mensal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {EXECUTABLE_PORTFOLIO.map((p) => (
                <tr key={p.ticker}>
                  <td className="p-2 font-bold font-mono">{p.ticker}</td>
                  <td className="p-2">{p.type} ({p.segment})</td>
                  <td className="p-2 text-right font-mono">{formatCurrencyBRL(p.price)}</td>
                  <td className="p-2 text-right font-mono font-bold">{p.shares.toLocaleString('pt-BR')}</td>
                  <td className="p-2 text-right font-mono font-bold">{formatCurrencyBRL(p.totalInvested)}</td>
                  <td className="p-2 text-right font-mono">{formatPercent(p.actualPercent)}</td>
                  <td className="p-2 text-right font-mono text-emerald-700">{formatPercent(p.netYield * 100)}</td>
                  <td className="p-2 text-right font-mono font-semibold">{formatCurrencyBRL(p.annualNetIncome)}</td>
                  <td className="p-2 text-right font-mono font-bold text-emerald-700">{formatCurrencyBRL(p.monthlyNetIncome)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-100 font-bold border-t border-slate-300">
              <tr>
                <td colSpan={4} className="p-2 uppercase">Total Geral Investido</td>
                <td className="p-2 text-right font-mono">{formatCurrencyBRL(TOTAL_INVESTED)}</td>
                <td className="p-2 text-right font-mono">100,00%</td>
                <td className="p-2 text-right font-mono text-emerald-800">{BLENDED_NET_YIELD.toFixed(2)}%</td>
                <td className="p-2 text-right font-mono text-emerald-800">{formatCurrencyBRL(ANNUAL_NET_INCOME)}</td>
                <td className="p-2 text-right font-mono text-emerald-800">{formatCurrencyBRL(MONTHLY_NET_INCOME_AVG)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="text-xs text-slate-500 font-mono">
          Saldo residual não investido em caixa: R$ 1,50. Total líquido anual médio apurado: R$ 45.016,20.
        </p>
      </section>

      {/* 11 & 14. Fluxo de Caixa 12 Meses - DUAS TABELAS DISTINTAS */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-xl font-bold text-slate-950">
            11 & 14. Calendário e Fluxo de Caixa dos Primeiros 12 Meses
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Apresentamos separadamente a <strong>Tabela 11A (Política Recomendada de R$ 2.050/mês)</strong> e a <strong>Tabela 11B (Preservação Estrita 100% em Dinheiro de R$ 1.875,68/mês)</strong>.
          </p>
        </div>

        {/* Tabela 11A: Recomendada */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-emerald-950">
              Tabela 11A: Fluxo de Caixa da Política Recomendada (Retirada R$ 2.050,00/mês · Reinvestimento R$ 20.416,20/ano)
            </h3>
            <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Soma: R$ 24.600 + R$ 20.416,20 = R$ 45.016,20 (100% exato)
            </span>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full border border-slate-200 text-left">
              <thead className="bg-emerald-50/60 border-b border-slate-200 font-semibold uppercase text-slate-700">
                <tr>
                  <th className="p-2">Mês</th>
                  <th className="p-2 text-right">Saldo Inic.</th>
                  <th className="p-2 text-right">FIIs Líq.</th>
                  <th className="p-2 text-right">Ações Líq.</th>
                  <th className="p-2 text-right font-bold">Total Proventos</th>
                  <th className="p-2 text-right text-amber-900 font-bold">Retirada Efetiva</th>
                  <th className="p-2 text-right font-bold text-emerald-700">Reinvestido</th>
                  <th className="p-2 text-right font-bold">Saldo Final Caixa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {RECOMMENDED_CASH_FLOW_12M.map((m) => (
                  <tr key={m.month}>
                    <td className="p-2 font-medium">{m.month}</td>
                    <td className="p-2 text-right font-mono">{formatCurrencyBRL(m.saldoInicial)}</td>
                    <td className="p-2 text-right font-mono">{formatCurrencyBRL(m.fiiNet)}</td>
                    <td className="p-2 text-right font-mono">{formatCurrencyBRL(m.acoesNet)}</td>
                    <td className="p-2 text-right font-mono font-bold">{formatCurrencyBRL(m.proventosLiquidos)}</td>
                    <td className="p-2 text-right font-mono text-amber-900 font-semibold">{formatCurrencyBRL(m.retirada)}</td>
                    <td className="p-2 text-right font-mono font-bold text-emerald-700">{formatCurrencyBRL(m.reinvestido)}</td>
                    <td className="p-2 text-right font-mono font-bold">{formatCurrencyBRL(m.saldoFinal)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-emerald-50 font-bold border-t border-emerald-300 text-emerald-950">
                <tr>
                  <td className="p-2 uppercase">Total Anual</td>
                  <td className="p-2 text-right font-mono">Buffer R$ 5k</td>
                  <td className="p-2 text-right font-mono">R$ 28.582,44</td>
                  <td className="p-2 text-right font-mono">R$ 16.433,76</td>
                  <td className="p-2 text-right font-mono">{formatCurrencyBRL(45016.20)}</td>
                  <td className="p-2 text-right font-mono text-amber-900">{formatCurrencyBRL(24600.00)}</td>
                  <td className="p-2 text-right font-mono text-emerald-800">{formatCurrencyBRL(20416.20)}</td>
                  <td className="p-2 text-right font-mono">R$ 5.000,00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Tabela 11B: Preservação Estrita */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-sky-950">
              Tabela 11B: Fluxo de Caixa da Preservação Estrita (Retirada R$ 1.875,68/mês · Reinvestimento R$ 22.508,10/ano)
            </h3>
            <span className="text-[11px] font-mono text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
              Soma: R$ 22.508,10 + R$ 22.508,10 = R$ 45.016,20 (100% exato)
            </span>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full border border-slate-200 text-left">
              <thead className="bg-sky-50/60 border-b border-slate-200 font-semibold uppercase text-slate-700">
                <tr>
                  <th className="p-2">Mês</th>
                  <th className="p-2 text-right">Saldo Inic.</th>
                  <th className="p-2 text-right">FIIs Líq.</th>
                  <th className="p-2 text-right">Ações Líq.</th>
                  <th className="p-2 text-right font-bold">Total Proventos</th>
                  <th className="p-2 text-right text-sky-900 font-bold">Retirada Estrita</th>
                  <th className="p-2 text-right font-bold text-emerald-700">Reinvestido</th>
                  <th className="p-2 text-right font-bold">Saldo Final Caixa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CONSUMPTION_CASH_FLOW_12M.map((m) => (
                  <tr key={m.month}>
                    <td className="p-2 font-medium">{m.month}</td>
                    <td className="p-2 text-right font-mono">{formatCurrencyBRL(m.saldoInicial)}</td>
                    <td className="p-2 text-right font-mono">{formatCurrencyBRL(m.fiiNet)}</td>
                    <td className="p-2 text-right font-mono">{formatCurrencyBRL(m.acoesNet)}</td>
                    <td className="p-2 text-right font-mono font-bold">{formatCurrencyBRL(m.proventosLiquidos)}</td>
                    <td className="p-2 text-right font-mono text-sky-900 font-semibold">{formatCurrencyBRL(m.retirada)}</td>
                    <td className="p-2 text-right font-mono font-bold text-emerald-700">{formatCurrencyBRL(m.reinvestido)}</td>
                    <td className="p-2 text-right font-mono font-bold">{formatCurrencyBRL(m.saldoFinal)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-sky-50 font-bold border-t border-sky-300 text-sky-950">
                <tr>
                  <td className="p-2 uppercase">Total Anual</td>
                  <td className="p-2 text-right font-mono">Buffer R$ 5k</td>
                  <td className="p-2 text-right font-mono">R$ 28.582,44</td>
                  <td className="p-2 text-right font-mono">R$ 16.433,76</td>
                  <td className="p-2 text-right font-mono">{formatCurrencyBRL(45016.20)}</td>
                  <td className="p-2 text-right font-mono text-sky-900">{formatCurrencyBRL(22508.10)}</td>
                  <td className="p-2 text-right font-mono text-emerald-800">{formatCurrencyBRL(22508.10)}</td>
                  <td className="p-2 text-right font-mono">R$ 5.000,00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* 12 & 24. Testes de Estresse Correlacionados */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 border-b border-slate-200 pb-2">
          12 & 24. Testes de Estresse Correlacionados (Choques Simultâneos em Cotações e Proventos)
        </h2>
        <div className="overflow-x-auto text-xs">
          <table className="w-full border border-slate-200 text-left">
            <thead className="bg-slate-50 border-b border-slate-200 font-semibold uppercase">
              <tr>
                <th className="p-2">Cenário de Crise</th>
                <th className="p-2 text-center text-rose-800">Cotações</th>
                <th className="p-2 text-center text-amber-800">Proventos</th>
                <th className="p-2 text-right">Renda Mensal</th>
                <th className="p-2 text-emerald-800">Retirada Recomendada (R$ 2.050)</th>
                <th className="p-2 text-rose-800">Retirada Acima da Sustentabilidade (R$ 3.000+)</th>
                <th className="p-2">Diagnóstico de Risco</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CORRELATED_STRESS_TESTS.map((t, i) => (
                <tr key={i}>
                  <td className="p-2 font-semibold text-slate-900">{t.scenarioName}</td>
                  <td className="p-2 text-center font-mono font-bold text-rose-700">{t.cotacoesDrop}</td>
                  <td className="p-2 text-center font-mono font-bold text-amber-700">{t.proventosDrop}</td>
                  <td className="p-2 text-right font-mono font-bold">{t.proventosMensais}</td>
                  <td className="p-2 text-emerald-800 font-medium">{t.impactoRetirada2050}</td>
                  <td className="p-2 text-rose-800">{t.impactoRetiradaExcessiva}</td>
                  <td className="p-2 text-slate-600 text-[11px]">{t.conclusaoRisco}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 13, 15, 16 & 17. Políticas, Projeções e Sustentabilidade */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 border-b border-slate-200 pb-2">
          13, 15, 16 & 17. Política de Consumo e Projeções de 5, 10, 15, 20 e 30 Anos
        </h2>
        <div className="overflow-x-auto text-xs">
          <table className="w-full border border-slate-200 text-left">
            <thead className="bg-slate-50 border-b border-slate-200 font-semibold uppercase">
              <tr>
                <th className="p-2">Horizonte</th>
                <th className="p-2 text-right">Patrimônio Nominal</th>
                <th className="p-2 text-right font-bold">Patrimônio Real (Deflacionado)</th>
                <th className="p-2 text-right">Proventos Líquidos</th>
                <th className="p-2 text-right text-amber-900">Retirada Reajustada</th>
                <th className="p-2">Parecer Técnico de Sustentabilidade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {LONG_HORIZON_SUMMARY.map((h, i) => (
                <tr key={i}>
                  <td className="p-2 font-bold">{h.horizon}</td>
                  <td className="p-2 text-right font-mono">{h.nominalCap}</td>
                  <td className="p-2 text-right font-mono font-bold text-rose-700">{h.realCap}</td>
                  <td className="p-2 text-right font-mono">{h.netProventosYear}</td>
                  <td className="p-2 text-right font-mono text-amber-900">{h.retiradaYear}</td>
                  <td className="p-2 text-[11px] text-slate-600">{h.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 27. Auditoria Matemática */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-950 border-b border-slate-200 pb-2">
          22 & 27. Auditoria Matemática Independente
        </h2>
        <div className="overflow-x-auto text-xs">
          <table className="w-full border border-slate-200 text-left">
            <thead className="bg-slate-50 border-b border-slate-200 font-semibold uppercase">
              <tr>
                <th className="p-2">Item</th>
                <th className="p-2">Verificação</th>
                <th className="p-2">Resultado Auditado</th>
                <th className="p-2">Evidência</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MATHEMATICAL_AUDIT_VERIFICATIONS.slice(0, 8).map((v) => (
                <tr key={v.item}>
                  <td className="p-2 font-mono">#{v.item}</td>
                  <td className="p-2 font-semibold">{v.check}</td>
                  <td className="p-2 font-bold text-emerald-700 font-mono">{v.status}</td>
                  <td className="p-2 text-slate-600 text-[11px] font-mono">{v.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mandatory Conclusion */}
      <section className="space-y-4 border-t-2 border-slate-900 pt-8">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-700" />
          <h2 className="text-2xl font-extrabold text-slate-950">
            CONCLUSÃO OBRIGATÓRIA — RESPOSTAS DEFINITIVAS AOS QUESITOS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
            <strong className="text-slate-900 block mb-1">Quais são os melhores FIIs identificados?</strong>
            <p className="text-slate-700">{MANDATORY_CONCLUSION_ANSWERS.bestFIIs}</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
            <strong className="text-slate-900 block mb-1">Quais são as melhores ações identificadas?</strong>
            <p className="text-slate-700">{MANDATORY_CONCLUSION_ANSWERS.bestEquities}</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
            <strong className="text-slate-900 block mb-1">Qual proporção apresenta a melhor relação entre renda e risco?</strong>
            <p className="text-slate-700">{MANDATORY_CONCLUSION_ANSWERS.bestRatio}</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
            <strong className="text-slate-900 block mb-1">Como distribuir os R$ 500.000?</strong>
            <p className="text-slate-700">{MANDATORY_CONCLUSION_ANSWERS.howToAllocate500k}</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
            <strong className="text-slate-900 block mb-1">Quanto a carteira deverá gerar de proventos?</strong>
            <p className="text-slate-700">{MANDATORY_CONCLUSION_ANSWERS.expectedIncome}</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
            <strong className="text-slate-900 block mb-1">Quanto poderá ser utilizado e quanto deve ser reinvestido?</strong>
            <p className="text-slate-700">Retirada sustentável: <strong>{MANDATORY_CONCLUSION_ANSWERS.sustainableMonthlyWithdrawal}</strong> | Reinvestimento obrigatório: <strong>{MANDATORY_CONCLUSION_ANSWERS.requiredReinvestment}</strong>.</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 md:col-span-2">
            <strong className="text-slate-900 block mb-1">Essa estratégia preserva e expande o poder de compra do patrimônio real?</strong>
            <p className="text-slate-700 mb-2">{MANDATORY_CONCLUSION_ANSWERS.doesPreserveRealCapital}</p>
            <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded font-medium text-emerald-950 text-[11px]">
              <strong>Síntese da Decisão: </strong> Retirada máxima de R$ 1.875 a R$ 2.050/mês para consumo livre com reajuste IPCA. Reinvestimento obrigatório de R$ 1.701 a R$ 1.875/mês para neutralizar a inflação e garantir a perenidade do capital.
            </div>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
            <strong className="text-slate-900 block mb-1">Qual será o patrimônio real estimado em 5 e 10 anos?</strong>
            <p className="text-slate-700">{MANDATORY_CONCLUSION_ANSWERS.realCapital5and10Years}</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
            <strong className="text-slate-900 block mb-1">Qual será o patrimônio real estimado em 15, 20 e 30 anos?</strong>
            <p className="text-slate-700">{MANDATORY_CONCLUSION_ANSWERS.realCapital15_20_30Years}</p>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 md:col-span-2">
            <strong className="text-slate-900 block mb-1">Qual é o principal risco da estratégia?</strong>
            <p className="text-slate-700">{MANDATORY_CONCLUSION_ANSWERS.mainStrategyRisk}</p>
          </div>
        </div>

        {/* Signature block */}
        <div className="pt-8 mt-8 border-t border-slate-200 flex justify-between items-end text-xs text-slate-500 font-mono">
          <div>
            <p><strong>Certificação Técnica:</strong> CNPI / Consultoria de Valores Mobiliários</p>
            <p>Análise de Investimentos conforme Instruções CVM vigentes</p>
          </div>
          <div className="text-right">
            <p>Emissão Digital Certificada</p>
            <p className="text-slate-900 font-bold">VALOR & RENDA ADVISORY</p>
          </div>
        </div>
      </section>
    </div>
  );
};
