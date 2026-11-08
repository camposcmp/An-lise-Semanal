import React from 'react';
import { MACRO_DIAGNOSIS } from '../data/investmentData';
import { Globe, TrendingUp, TrendingDown, Minus, Building2, Factory, Zap, Landmark } from 'lucide-react';

export const MacroView: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <span>Etapa 1 — Análise Macroeconômica</span>
          <span>·</span>
          <span>Seção 4 do Relatório</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Diagnóstico do Cenário Macroeconômico e Impactos Setoriais
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-4xl leading-relaxed">
          A conjuntura macroeconômica brasileira no horizonte de 5 a 10 anos é caracterizada por juros reais estruturalmente elevados (NTN-B negociando no patamar de IPCA + 6,5% a.a.), ancoragem imperfeita de expectativas fiscais e rigidez inflacionária. Esse ambiente impõe seleção rigorosa de ativos geradores de fluxo de caixa operacional, penalizando teses de crescimento especulativo e alavancagem financeira.
        </p>
      </div>

      {/* Main Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MACRO_DIAGNOSIS.map((indicator, index) => (
          <div key={index} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase">{indicator.name}</span>
                <div className="text-xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {indicator.currentValue}
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded font-medium flex items-center gap-1 ${
                indicator.trend === 'alta' ? 'bg-amber-100 text-amber-800' :
                indicator.trend === 'baixa' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
              }`}>
                {indicator.trend === 'alta' ? <TrendingUp className="w-3 h-3" /> :
                 indicator.trend === 'baixa' ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                {indicator.trend === 'alta' ? 'Viés de Alta' : indicator.trend === 'baixa' ? 'Pressão Negativa' : 'Estabilidade'}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div>
                <strong className="text-slate-700">Expectativas Focus / Mercado:</strong>
                <p className="text-slate-600 mt-0.5">{indicator.focusExpectation}</p>
              </div>
              <div>
                <strong className="text-slate-700">Impacto em FIIs:</strong>
                <p className="text-slate-600 mt-0.5">{indicator.impactFII}</p>
              </div>
              <div>
                <strong className="text-slate-700">Impacto em Ações:</strong>
                <p className="text-slate-600 mt-0.5">{indicator.impactEquities}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2 text-slate-700 border border-slate-200/60 font-medium">
                <span className="text-slate-900 font-semibold">Diretriz Estratégica: </span>
                {indicator.strategicNote}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sectorial Impact Matrix */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Factory className="w-5 h-5 text-slate-700" />
          Mapeamento Setorial e Sensibilidade ao Cenário Econômico
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Segmento / Setor</th>
                <th className="py-3 px-4">Sensibilidade à Selic</th>
                <th className="py-3 px-4">Proteção Inflacionária (IPCA)</th>
                <th className="py-3 px-4">Capacidade de Repasse</th>
                <th className="py-3 px-4">Conclusão do Analista</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-semibold text-slate-900">FIIs de Tijolo (Logística / Shoppings)</td>
                <td className="py-3 px-4 text-amber-600">Média-Alta (marcação a mercado)</td>
                <td className="py-3 px-4 text-emerald-600">Alta (reajuste anual de contratos)</td>
                <td className="py-3 px-4">Elevada em localizações prime com vacância &lt; 5%</td>
                <td className="py-3 px-4 font-medium text-emerald-700">Sobreponderar ativos descontados (P/VP &lt; 1,0x)</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-semibold text-slate-900">FIIs de Papel (CRIs High Grade)</td>
                <td className="py-3 px-4 text-emerald-600">Positiva (CDI+ eleva rendimentos)</td>
                <td className="py-3 px-4 text-emerald-600">Imediata (correção monetária na cota)</td>
                <td className="py-3 px-4">Contratual; amortização de dívida imobiliária</td>
                <td className="py-3 px-4 font-medium text-slate-900">Alocar 18% em CDI+ e IPCA+; reinvestir correção</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-semibold text-slate-900">Bancos (Itaú / BB)</td>
                <td className="py-3 px-4 text-emerald-600">Favorável (margem financeira com clientes)</td>
                <td className="py-3 px-4 text-slate-600">Indireta (expansão nominal de carteira)</td>
                <td className="py-3 px-4">Excelente em produtos corporativos e consignado</td>
                <td className="py-3 px-4 font-medium text-emerald-700">Pilar central em ações (ROE &gt; 21%, proventos mensais)</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-semibold text-slate-900">Energia (Transmissão & Geração)</td>
                <td className="py-3 px-4 text-slate-600">Neutra a Moderada (alavancagem longa)</td>
                <td className="py-3 px-4 text-emerald-600">Total (RAP corrigida por IPCA/IGP-M)</td>
                <td className="py-3 px-4">Blindada por contrato de concessão federal</td>
                <td className="py-3 px-4 font-medium text-emerald-700">Imprescindível para preservação do poder de compra</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-semibold text-slate-900">Seguros (BB Seguridade)</td>
                <td className="py-3 px-4 text-emerald-600">Altamente Positiva (float rende Selic)</td>
                <td className="py-3 px-4 text-slate-600">Boa (prêmios sobem com valor segurado)</td>
                <td className="py-3 px-4">Sem risco de crédito; repasse imediato</td>
                <td className="py-3 px-4 font-medium text-emerald-700">Máquina geradora de proventos (yield líquido &gt; 10%)</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-semibold text-slate-900">Saneamento (Sanepar)</td>
                <td className="py-3 px-4 text-slate-600">Moderada</td>
                <td className="py-3 px-4 text-emerald-600">Alta (revisão tarifária regulatória periódica)</td>
                <td className="py-3 px-4">Monopólio essencial de água e esgoto</td>
                <td className="py-3 px-4 font-medium text-emerald-700">Desconto patrimonial de 28% no Paraná</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-semibold text-slate-900">Varejo Alavancado / Ciclícas Puras</td>
                <td className="py-3 px-4 text-rose-600">Crítica (custo de dívida asfixia o lucro)</td>
                <td className="py-3 px-4 text-rose-600">Baixa (perda de margem na ponta final)</td>
                <td className="py-3 px-4">Dificuldade de repasse com renda comprimida</td>
                <td className="py-3 px-4 font-medium text-rose-700">REPROVADO para carteira de renda sustentável</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
