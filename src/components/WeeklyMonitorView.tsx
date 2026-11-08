import React, { useState, useMemo } from 'react';
import { EXECUTABLE_PORTFOLIO } from '../data/investmentData';
import { formatCurrencyBRL, formatPercent } from '../utils/calculator';
import { 
  Scale, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  AlertCircle, 
  ShoppingCart, 
  RotateCcw, 
  Terminal, 
  Copy, 
  Check, 
  Sliders, 
  ShieldCheck, 
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

interface AssetItem {
  ticker: string;
  name: string;
  type: 'FII' | 'Ação';
  segment: string;
  targetPercent: number;
  initialPrice: number;
  currentPrice: number;
  shares: number;
  maxEntryPrice: number;
}

const INITIAL_ASSETS: AssetItem[] = EXECUTABLE_PORTFOLIO.map(p => {
  // Preços teto definidos na análise fundamentalista
  const maxPriceMap: Record<string, number> = {
    'HGLG11': 168.00,
    'XPML11': 112.00,
    'KNRI11': 162.00,
    'HGRU11': 132.00,
    'KNCR11': 104.50,
    'RBRR11': 98.00,
    'ITUB4': 36.50,
    'BBSE3': 36.00,
    'EGIE3': 44.00,
    'TRPL4': 27.50,
    'SAPR11': 30.00
  };

  return {
    ticker: p.ticker,
    name: p.name,
    type: p.type as 'FII' | 'Ação',
    segment: p.segment,
    targetPercent: p.targetPercent,
    initialPrice: p.price,
    currentPrice: p.price,
    shares: p.shares,
    maxEntryPrice: maxPriceMap[p.ticker] || p.price * 1.08
  };
});

export const WeeklyMonitorView: React.FC = () => {
  const [assets, setAssets] = useState<AssetItem[]>(INITIAL_ASSETS);
  const [reinvestmentCash, setReinvestmentCash] = useState<number>(1701.35);
  const [enforceCeilingPrice, setEnforceCeilingPrice] = useState<boolean>(true);
  const [activeSubTab, setActiveSubTab] = useState<'rebalancer' | 'checklist' | 'script'>('rebalancer');
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [copiedOrders, setCopiedOrders] = useState<boolean>(false);

  // Totais da carteira atual
  const totalCurrentValue = useMemo(() => {
    return assets.reduce((sum, a) => sum + a.shares * a.currentPrice, 0);
  }, [assets]);

  // Alocação FII vs Ações
  const currentFIITotal = useMemo(() => {
    return assets.filter(a => a.type === 'FII').reduce((sum, a) => sum + a.shares * a.currentPrice, 0);
  }, [assets]);

  const currentAcoesTotal = useMemo(() => {
    return assets.filter(a => a.type === 'Ação').reduce((sum, a) => sum + a.shares * a.currentPrice, 0);
  }, [assets]);

  const currentFIIPercent = totalCurrentValue > 0 ? (currentFIITotal / totalCurrentValue) * 100 : 0;
  const currentAcoesPercent = totalCurrentValue > 0 ? (currentAcoesTotal / totalCurrentValue) * 100 : 0;

  // Atualizador de preço
  const handlePriceChange = (ticker: string, newPrice: number) => {
    if (isNaN(newPrice) || newPrice <= 0) return;
    setAssets(prev => prev.map(a => a.ticker === ticker ? { ...a, currentPrice: newPrice } : a));
  };

  // Resetar cotações
  const handleResetPrices = () => {
    setAssets(INITIAL_ASSETS);
    setReinvestmentCash(1701.35);
  };

  // Algoritmo de Rebalanceamento Inteligente de Proventos
  const rebalancingResult = useMemo(() => {
    let availableCash = reinvestmentCash;
    const postAssets = assets.map(a => ({
      ...a,
      newSharesToBuy: 0,
      postShares: a.shares,
      currentTotal: a.shares * a.currentPrice,
      currentWeight: totalCurrentValue > 0 ? ((a.shares * a.currentPrice) / totalCurrentValue) * 100 : 0
    }));

    const targetTotalPortfolio = totalCurrentValue + reinvestmentCash;

    // Loop guloso: seleciona a cada rodada o ativo elegível com maior defasagem monetária
    let iterations = 0;
    const maxIterations = 2000;

    while (availableCash > 0 && iterations < maxIterations) {
      iterations++;

      // Calcula a meta monetária e déficit atual para cada ativo
      const candidates = postAssets.map(item => {
        const targetValue = (targetTotalPortfolio * item.targetPercent) / 100;
        const currentInvested = item.postShares * item.currentPrice;
        const deficit = targetValue - currentInvested;
        const isUnderCeiling = !enforceCeilingPrice || item.currentPrice <= item.maxEntryPrice;
        const canAfford = availableCash >= item.currentPrice;

        return {
          item,
          deficit,
          eligible: isUnderCeiling && canAfford && deficit > 0
        };
      }).filter(c => c.eligible);

      if (candidates.length === 0) break;

      // Ordena por maior déficit monetário relativo
      candidates.sort((a, b) => b.deficit - a.deficit);

      const best = candidates[0].item;
      best.newSharesToBuy += 1;
      best.postShares += 1;
      availableCash -= best.currentPrice;
    }

    const remainingCash = availableCash;
    const orders = postAssets
      .filter(a => a.newSharesToBuy > 0)
      .map(a => ({
        ticker: a.ticker,
        name: a.name,
        type: a.type,
        sharesToBuy: a.newSharesToBuy,
        price: a.currentPrice,
        orderTotal: a.newSharesToBuy * a.currentPrice,
        isFractional: a.type === 'Ação' && a.newSharesToBuy % 100 !== 0,
        postWeight: targetTotalPortfolio > 0 ? ((a.postShares * a.currentPrice) / targetTotalPortfolio) * 100 : 0
      }));

    const totalOrdersValue = orders.reduce((sum, o) => sum + o.orderTotal, 0);

    return {
      postAssets,
      orders,
      totalOrdersValue,
      remainingCash,
      targetTotalPortfolio
    };
  }, [assets, totalCurrentValue, reinvestmentCash, enforceCeilingPrice]);

  // Gerador de script Python
  const pythonScriptCode = `"""
VALOR & RENDA ADVISORY — SCRIPT DE MONITORAMENTO E REBALANCEAMENTO SEMANAL
Requisitos: pip install yfinance pandas tabulate
Agendamento: Executar toda sexta-feira às 18h00 (pós-fechamento da B3)
"""

import yfinance as yf
import pandas as pd
from tabulate import tabulate

# 1. Configuração da Carteira Alvo (60% FIIs / 40% Ações)
PORTFOLIO_CONFIG = [
    {"ticker": "HGLG11.SA", "clean_ticker": "HGLG11", "type": "FII", "target_pct": 12.0, "current_shares": 367, "ceiling_price": 168.00},
    {"ticker": "XPML11.SA", "clean_ticker": "XPML11", "type": "FII", "target_pct": 10.0, "current_shares": 480, "ceiling_price": 112.00},
    {"ticker": "KNRI11.SA", "clean_ticker": "KNRI11", "type": "FII", "target_pct": 10.0, "current_shares": 355, "ceiling_price": 162.00},
    {"ticker": "HGRU11.SA", "clean_ticker": "HGRU11", "type": "FII", "target_pct": 10.0, "current_shares": 394, "ceiling_price": 132.00},
    {"ticker": "KNCR11.SA", "clean_ticker": "KNCR11", "type": "FII", "target_pct": 10.0, "current_shares": 483, "ceiling_price": 104.50},
    {"ticker": "RBRR11.SA", "clean_ticker": "RBRR11", "type": "FII", "target_pct": 8.0,  "current_shares": 422, "ceiling_price": 98.00},
    {"ticker": "ITUB4.SA",  "clean_ticker": "ITUB4",  "type": "AÇÃO", "target_pct": 10.0, "current_shares": 1462, "ceiling_price": 36.50},
    {"ticker": "BBSE3.SA",  "clean_ticker": "BBSE3",  "type": "AÇÃO", "target_pct": 8.0,  "current_shares": 1190, "ceiling_price": 36.00},
    {"ticker": "EGIE3.SA",  "clean_ticker": "EGIE3",  "type": "AÇÃO", "target_pct": 8.0,  "current_shares": 1005, "ceiling_price": 44.00},
    {"ticker": "TRPL4.SA",  "clean_ticker": "TRPL4",  "type": "AÇÃO", "target_pct": 7.0,  "current_shares": 1428, "ceiling_price": 27.50},
    {"ticker": "SAPR11.SA", "clean_ticker": "SAPR11", "type": "AÇÃO", "target_pct": 7.0,  "current_shares": 1411, "ceiling_price": 30.00},
]

def run_weekly_rebalance(available_cash_brl=1701.35):
    print("=" * 75)
    print("   VALOR & RENDA ADVISORY — MONITORAMENTO SEMANAL DA CARTEIRA")
    print("=" * 75)
    
    symbols = [item["ticker"] for item in PORTFOLIO_CONFIG]
    print(f"\\n1. Coletando cotações em tempo real da B3 via Yahoo Finance...")
    data = yf.download(symbols, period="1d", interval="1d", progress=False)['Close'].iloc[-1]
    
    portfolio = []
    total_market_value = 0.0
    
    for item in PORTFOLIO_CONFIG:
        sym = item["ticker"]
        price = float(data[sym]) if sym in data else item["ceiling_price"] * 0.95
        pos_val = item["current_shares"] * price
        total_market_value += pos_val
        portfolio.append({
            **item,
            "current_price": price,
            "position_val": pos_val
        })
        
    print(f"Patrimônio Atual de Mercado: R$ {total_market_value:,.2f}")
    print(f"Saldo de Proventos para Aporte: R$ {available_cash_brl:,.2f}")
    
    target_total = total_market_value + available_cash_brl
    
    # Algoritmo de Rebalanceamento Inteligente sem Vendas
    cash_left = available_cash_brl
    for p in portfolio:
        p["shares_to_buy"] = 0
        p["target_value"] = (target_total * p["target_pct"]) / 100.0
        
    while cash_left > 0:
        candidates = []
        for p in portfolio:
            current_inv = (p["current_shares"] + p["shares_to_buy"]) * p["current_price"]
            deficit = p["target_value"] - current_inv
            if p["current_price"] <= p["ceiling_price"] and cash_left >= p["current_price"] and deficit > 0:
                candidates.append((deficit, p))
                
        if not candidates:
            break
            
        candidates.sort(key=lambda x: x[0], reverse=True)
        chosen = candidates[0][1]
        chosen["shares_to_buy"] += 1
        cash_left -= chosen["current_price"]
        
    # Relatório de Ordens
    print("\\n2. ORDENS RECOMENDADAS PARA EXECUÇÃO NESTA SEMANA:")
    orders = [p for p in portfolio if p["shares_to_buy"] > 0]
    table_orders = []
    for o in orders:
        frac_tag = f"{o['clean_ticker']}F" if o["type"] == "AÇÃO" and o["shares_to_buy"] < 100 else o["clean_ticker"]
        table_orders.append([
            frac_tag,
            o["type"],
            o["shares_to_buy"],
            f"R$ {o['current_price']:.2f}",
            f"R$ {o['shares_to_buy'] * o['current_price']:.2f}",
            f"R$ {o['ceiling_price']:.2f}"
        ])
        
    print(tabulate(table_orders, headers=["Código B3", "Classe", "Comprar (Qtde)", "Preço", "Total Ordem", "Preço Teto"], tablefmt="grid"))
    print(f"\\nTotal Investido nas Ordens: R$ {available_cash_brl - cash_left:,.2f}")
    print(f"Saldo Residual em Caixa (Colchão): R$ {cash_left:,.2f}")

if __name__ == "__main__":
    run_weekly_rebalance(available_cash_brl=1701.35)
`;

  const handleCopyScript = async () => {
    try {
      await navigator.clipboard.writeText(pythonScriptCode);
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2500);
    } catch {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2500);
    }
  };

  const handleCopyOrders = async () => {
    const textOrders = rebalancingResult.orders.map(o => 
      `COMPRA: ${o.ticker}${o.isFractional ? 'F' : ''} | Qtde: ${o.sharesToBuy} | Preço Estimado: ${formatCurrencyBRL(o.price)} | Total: ${formatCurrencyBRL(o.orderTotal)}`
    ).join('\n') + `\nTotal das Ordens: ${formatCurrencyBRL(rebalancingResult.totalOrdersValue)} | Sobra em Caixa: ${formatCurrencyBRL(rebalancingResult.remainingCash)}`;

    try {
      await navigator.clipboard.writeText(textOrders);
      setCopiedOrders(true);
      setTimeout(() => setCopiedOrders(false), 2500);
    } catch {
      setCopiedOrders(true);
      setTimeout(() => setCopiedOrders(false), 2500);
    }
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <span>Governança Contínua & Execução Operacional</span>
          <span>·</span>
          <span>Módulo de Acompanhamento Semanal</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Monitor Semanal & Rebalanceamento Inteligente de Proventos
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-4xl leading-relaxed">
          Para que a carteira de R$ 500.000 mantenha perpétua a fronteira eficiente de <strong>60% FIIs e 40% Ações</strong> sem jamais incorrer em vendas forçadas ou atritos tributários de imposto de renda sobre ganho de capital, <strong>o rebalanceamento é realizado exclusivamente via direcionamento cirúrgico dos proventos recebidos</strong>. O algoritmo compara a posição semanal com a meta e compra os ativos com maior defasagem que estejam abaixo do preço-teto.
        </p>

        {/* Sub Navigation */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <button
            onClick={() => setActiveSubTab('rebalancer')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'rebalancer'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Scale className="w-4 h-4 text-emerald-400" />
            <span>1. Rebalanceador Semanal de Proventos</span>
          </button>
          <button
            onClick={() => setActiveSubTab('checklist')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'checklist'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4 text-sky-400" />
            <span>2. Protocolo de Rotina Semanal (Checklist)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('script')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'script'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>3. Programa Automatizado (Script Python / B3)</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: REBALANCEADOR INTERATIVO */}
      {activeSubTab === 'rebalancer' && (
        <div className="space-y-8">
          {/* Top Control Bar for the Rebalancer */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Simulação de Aporte Semanal / Mensal
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Defina o Saldo Disponível de Proventos para Reinvestimento
                </h3>
                <p className="text-xs text-slate-600">
                  Insira o valor acumulado na conta da corretora para gerar as ordens exatas de compra sem sobras expressivas de caixa.
                </p>
              </div>

              {/* Input & Quick presets */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-500">R$</span>
                  <input
                    type="number"
                    step="10"
                    min="50"
                    max="100000"
                    value={reinvestmentCash}
                    onChange={(e) => setReinvestmentCash(Math.max(0, Number(e.target.value)))}
                    className="w-40 pl-9 pr-3 py-2 text-sm font-bold font-mono text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                {/* Preset shortcuts */}
                <div className="flex flex-wrap items-center gap-1 text-xs">
                  <button
                    onClick={() => setReinvestmentCash(425.00)}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md font-medium text-slate-700 transition-colors"
                    title="Aporte semanal (~1/4 do reinvestimento mensal)"
                  >
                    R$ 425 (Semanal)
                  </button>
                  <button
                    onClick={() => setReinvestmentCash(1701.35)}
                    className="px-2.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold rounded-md transition-colors"
                    title="Reinvestimento obrigatório da Política C2 Recomendada"
                  >
                    R$ 1.701 (Mensal C2)
                  </button>
                  <button
                    onClick={() => setReinvestmentCash(1875.67)}
                    className="px-2.5 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-950 font-bold rounded-md transition-colors"
                    title="Reinvestimento estrito da Política C1 (100% IPCA em caixa)"
                  >
                    R$ 1.875 (Mensal C1)
                  </button>
                </div>
              </div>
            </div>

            {/* Constraints & Summary bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={enforceCeilingPrice}
                  onChange={(e) => setEnforceCeilingPrice(e.target.checked)}
                  className="w-4 h-4 rounded text-slate-900 accent-slate-900"
                />
                <span className="font-semibold text-slate-900">Bloquear compra se o ativo estiver acima do Preço Teto</span>
                <span className="text-slate-500 hidden sm:inline">(Evita comprar ativos inflacionados)</span>
              </label>

              <button
                onClick={handleResetPrices}
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors self-start sm:self-auto font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Cotações Originais</span>
              </button>
            </div>
          </div>

          {/* Current Portfolio Asset Table with Live Price Inputs */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Posição da Carteira & Análise de Desvio Semanal
                </h3>
                <p className="text-xs text-slate-500">
                  Altere as cotações atuais abaixo para refletir o mercado do dia e identificar automaticamente quais ativos estão defasados (<em>underweight</em>).
                </p>
              </div>

              {/* Balance Badge */}
              <div className="flex items-center gap-3 text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg shrink-0">
                <span>Mix Atual:</span>
                <strong className={currentFIIPercent > 62 ? 'text-amber-800' : 'text-slate-900'}>
                  FIIs: {currentFIIPercent.toFixed(1)}% (Meta: 60%)
                </strong>
                <span>·</span>
                <strong className={currentAcoesPercent < 38 ? 'text-amber-800' : 'text-slate-900'}>
                  Ações: {currentAcoesPercent.toFixed(1)}% (Meta: 40%)
                </strong>
              </div>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 font-semibold uppercase text-slate-700">
                  <tr>
                    <th className="py-3 px-3">Ativo / Código</th>
                    <th className="py-3 px-3">Classe</th>
                    <th className="py-3 px-3 text-right">Qtde Cotas</th>
                    <th className="py-3 px-3 text-right">Cotação Atual (R$)</th>
                    <th className="py-3 px-3 text-right">Preço Teto</th>
                    <th className="py-3 px-3 text-right">Posição Atual (R$)</th>
                    <th className="py-3 px-3 text-right">% Atual</th>
                    <th className="py-3 px-3 text-right">% Alvo</th>
                    <th className="py-3 px-3 text-center">Desvio ($\Delta\%$)</th>
                    <th className="py-3 px-3">Diagnóstico</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {assets.map((item) => {
                    const positionVal = item.shares * item.currentPrice;
                    const weightPct = totalCurrentValue > 0 ? (positionVal / totalCurrentValue) * 100 : 0;
                    const deltaPct = weightPct - item.targetPercent;
                    const isOverCeiling = item.currentPrice > item.maxEntryPrice;
                    const isUnderweight = deltaPct < -0.15;
                    const isOverweight = deltaPct > 0.15;

                    return (
                      <tr key={item.ticker} className="hover:bg-slate-50/70">
                        <td className="py-3 px-3 font-bold font-mono text-slate-900">
                          {item.ticker}
                          <span className="block text-[11px] font-normal text-slate-500 truncate max-w-[140px]">
                            {item.name}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                            item.type === 'FII' ? 'bg-slate-100 text-slate-800' : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                          }`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-medium">
                          {item.shares}
                        </td>
                        <td className="py-3 px-3 text-right font-mono">
                          <input
                            type="number"
                            step="0.05"
                            value={item.currentPrice}
                            onChange={(e) => handlePriceChange(item.ticker, parseFloat(e.target.value))}
                            className="w-20 text-right font-mono font-bold px-1.5 py-0.5 bg-slate-50 border border-slate-300 rounded text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                          />
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-600">
                          {formatCurrencyBRL(item.maxEntryPrice)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-slate-950">
                          {formatCurrencyBRL(positionVal)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono">
                          {weightPct.toFixed(2)}%
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-semibold text-slate-700">
                          {item.targetPercent.toFixed(2)}%
                        </td>
                        <td className="py-3 px-3 text-center font-mono font-bold">
                          <span className={deltaPct < 0 ? 'text-emerald-700' : 'text-slate-600'}>
                            {deltaPct > 0 ? `+${deltaPct.toFixed(2)}%` : `${deltaPct.toFixed(2)}%`}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-[11px]">
                          {isOverCeiling ? (
                            <span className="text-rose-700 font-semibold flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" /> Acima do Teto (Aguardar)
                            </span>
                          ) : isUnderweight ? (
                            <span className="text-emerald-800 font-bold flex items-center gap-1">
                              <TrendingDown className="w-3.5 h-3.5 text-emerald-600" /> Aporte Prioritário
                            </span>
                          ) : isOverweight ? (
                            <span className="text-slate-500 flex items-center gap-1">
                              <TrendingUp className="w-3.5 h-3.5 text-slate-400" /> Acima da Meta (Neutro)
                            </span>
                          ) : (
                            <span className="text-slate-600 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" /> Em Equilíbrio
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-slate-100 font-bold border-t border-slate-300 text-slate-900">
                  <tr>
                    <td className="py-3 px-3 uppercase text-slate-700">Total Carteira Atual</td>
                    <td className="py-3 px-3" colSpan={4}></td>
                    <td className="py-3 px-3 text-right font-mono text-sm text-slate-950">
                      {formatCurrencyBRL(totalCurrentValue)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono">100,00%</td>
                    <td className="py-3 px-3 text-right font-mono">100,00%</td>
                    <td className="py-3 px-3 text-center font-mono">0,00%</td>
                    <td className="py-3 px-3 text-[11px] text-slate-500 font-normal">Base patrimonial auditada</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Executable Weekly Orders Result Box */}
          <div className="bg-white border-2 border-emerald-500 rounded-xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-emerald-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Ordens Recomendadas de Compra para o Aporte ({formatCurrencyBRL(reinvestmentCash)})
                  </h3>
                  <p className="text-xs text-slate-600">
                    Calculadas para comprar cotas inteiras dos ativos mais defasados sem violar os tetos de preço.
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyOrders}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg transition-colors cursor-pointer"
              >
                {copiedOrders ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                <span>{copiedOrders ? 'Ordens Copiadas!' : 'Copiar Ordens para o Home Broker'}</span>
              </button>
            </div>

            {rebalancingResult.orders.length > 0 ? (
              <div className="space-y-4">
                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left border border-emerald-200 rounded-lg overflow-hidden">
                    <thead className="bg-emerald-50 border-b border-emerald-200 font-semibold uppercase text-emerald-950">
                      <tr>
                        <th className="p-3">Código do Ativo (Ticker)</th>
                        <th className="p-3">Classe</th>
                        <th className="p-3 text-right">Preço Estimado</th>
                        <th className="p-3 text-right font-bold text-emerald-950">Comprar (Qtde Inteira)</th>
                        <th className="p-3 text-right font-bold">Total da Ordem (R$)</th>
                        <th className="p-3 text-right">% Projetado Pós-Aporte</th>
                        <th className="p-3">Instrução Operacional</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-100 bg-white">
                      {rebalancingResult.orders.map((ord) => (
                        <tr key={ord.ticker} className="hover:bg-emerald-50/40">
                          <td className="p-3 font-bold font-mono text-slate-900">
                            {ord.ticker}{ord.isFractional ? <span className="text-emerald-700 font-bold">F</span> : ''}
                            <span className="block text-[11px] font-normal text-slate-500">
                              {ord.name}
                            </span>
                          </td>
                          <td className="p-3 text-slate-700 font-medium">{ord.type}</td>
                          <td className="p-3 text-right font-mono">{formatCurrencyBRL(ord.price)}</td>
                          <td className="p-3 text-right font-mono font-bold text-emerald-800 text-sm">
                            +{ord.sharesToBuy} {ord.sharesToBuy === 1 ? 'cota' : 'cotas'}
                          </td>
                          <td className="p-3 text-right font-mono font-bold text-slate-950">
                            {formatCurrencyBRL(ord.orderTotal)}
                          </td>
                          <td className="p-3 text-right font-mono font-semibold text-slate-700">
                            {ord.postWeight.toFixed(2)}%
                          </td>
                          <td className="p-3 text-[11px] text-slate-600">
                            {ord.isFractional
                              ? `Ordem no mercado fracionário (${ord.ticker}F) a mercado.`
                              : `Ordem padrão (${ord.ticker}) a mercado.`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-emerald-50/80 font-bold border-t border-emerald-200 text-emerald-950 text-xs">
                      <tr>
                        <td className="p-3 uppercase">Total a Executar no Broker</td>
                        <td className="p-3" colSpan={3}></td>
                        <td className="p-3 text-right font-mono text-sm text-emerald-950">
                          {formatCurrencyBRL(rebalancingResult.totalOrdersValue)}
                        </td>
                        <td className="p-3 text-right font-mono text-slate-600">
                          Sobra: {formatCurrencyBRL(rebalancingResult.remainingCash)}
                        </td>
                        <td className="p-3 text-[11px] text-emerald-800 font-normal">
                          Sobra residual de {formatCurrencyBRL(rebalancingResult.remainingCash)} permanece no caixa de liquidez.
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs text-emerald-950 leading-relaxed">
                  <strong>Vantagem Estrutural do Modelo:</strong> Ao realizar o rebalanceamento exclusivamente com os proventos recebidos ({formatCurrencyBRL(rebalancingResult.totalOrdersValue)}), você <strong>nunca precisa vender um único ativo para reequilibrar a carteira</strong>. Isso elimina qualquer pagamento de Imposto de Renda de 15% ou 20% sobre ganho de capital e preserva 100% da força dos juros compostos.
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-600 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-semibold text-slate-800">Nenhum ativo elegível para compra com os parâmetros atuais.</p>
                <p className="mt-1">Aumente o saldo disponível de proventos ou desmarque a restrição de Preço Teto caso algum ativo esteja em cotação de mercado superior.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CHECKLIST DE ROTINA SEMANAL */}
      {activeSubTab === 'checklist' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-xl font-bold text-slate-900">
              Protocolo de Governança Semanal do Investidor (Sexta-feira ou Fim de Semana)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Roteiro de 4 etapas práticas (duração estimada: 15 minutos semanais) para manter a carteira sob controle permanente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Passo 1 */}
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">1</span>
                <span>Conferência de Proventos Creditados</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Acesse a conta da corretora ou a Área do Investidor da B3. Verifique se os rendimentos dos 6 FIIs (creditados entre o 10º e o 15º dia útil) e os dividendos de ações programados para a semana caíram corretamente na conta corrente.
              </p>
              <div className="p-2.5 bg-white border border-slate-200 rounded font-mono text-[11px] text-slate-700">
                Regra: Deduzir a retirada mensal (R$ 2.050/mês ou R$ 512,50/semana) e transferir o saldo livre para a ordem de compra.
              </div>
            </div>

            {/* Passo 2 */}
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">2</span>
                <span>Checagem de Preços de Fechamento vs. Preço Teto</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Observe o fechamento da sexta-feira. Compare com os tetos de compra recomendados:
              </p>
              <ul className="space-y-1 font-mono text-[11px] text-slate-700 bg-white p-2.5 border border-slate-200 rounded">
                <li>· FIIs: HGLG11 (R$ 168), XPML11 (R$ 112), KNRI11 (R$ 162), KNCR11 (R$ 104,50), HGRU11 (R$ 132), RBRR11 (R$ 98).</li>
                <li>· Ações: ITUB4 (R$ 36,50), BBSE3 (R$ 36,00), EGIE3 (R$ 44,00), TRPL4 (R$ 27,50), SAPR11 (R$ 30,00).</li>
              </ul>
            </div>

            {/* Passo 3 */}
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">3</span>
                <span>Execução das Ordens de Compra Fracionárias</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                No painel da corretora, digite as ordens apontadas pelo rebalanceador. Se for comprar ações em lotes menores que 100 unidades, utilize a letra <strong>"F"</strong> ao final do código (exemplo: <em>ITUB4F</em>, <em>SAPR11F</em>, <em>BBSE3F</em>). Os FIIs são negociados de 1 em 1 cota no mercado padrão.
              </p>
              <div className="p-2.5 bg-white border border-slate-200 rounded font-mono text-[11px] text-slate-700">
                Dica: Emitir ordens do tipo "Limitada" com o preço da última cotação ou a mercado nos primeiros minutos da sessão.
              </div>
            </div>

            {/* Passo 4 */}
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">4</span>
                <span>Atualização de Custódia & Histórico de Rendimentos</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Após a confirmação de liquidação (D+2 na B3), atualize a quantidade de cotas na sua planilha ou no sistema. Como novas cotas foram adicionadas, o próximo mês pagará um volume ainda maior de proventos nominais, ativando a bola de neve dos juros compostos.
              </p>
              <div className="p-2.5 bg-white border border-slate-200 rounded font-mono text-[11px] text-slate-700">
                Resultado: No ano 10, o fluxo de proventos sobe de R$ 3.751/mês para mais de R$ 6.300/mês.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CÓDIGO DO SCRIPT DE AUTOMAÇÃO */}
      {activeSubTab === 'script' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Script em Python para Automação Contínua Semanal
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Conecta-se diretamente à base de dados da B3 via Yahoo Finance (`yfinance`) para calcular as ordens semanais automaticamente.
              </p>
            </div>

            <button
              onClick={handleCopyScript}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              {copiedScript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedScript ? 'Código Copiado!' : 'Copiar Código Python'}</span>
            </button>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <p>
              <strong>Como rodar no seu computador:</strong>
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-slate-600 font-mono text-[11px]">
              <li>Instale as bibliotecas necessárias no terminal: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-900">pip install yfinance pandas tabulate</code></li>
              <li>Salve o código abaixo em um arquivo chamado <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-900">monitor_semanal.py</code></li>
              <li>Execute semanalmente com: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-900">python monitor_semanal.py</code></li>
              <li>(Opcional) Agende no Agendador de Tarefas do Windows ou Cron do Linux para disparar todo sábado de manhã.</li>
            </ol>
          </div>

          {/* Code Viewer */}
          <div className="relative rounded-xl overflow-hidden bg-slate-950 text-slate-200 border border-slate-800 font-mono text-xs">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
              <span>monitor_semanal.py</span>
              <span>Python 3.10+ / yfinance</span>
            </div>
            <pre className="p-4 overflow-x-auto text-[11px] leading-relaxed text-emerald-400/90 font-mono">
              <code>{pythonScriptCode}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
