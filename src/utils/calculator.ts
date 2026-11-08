export interface SimulationResult {
  year: number;
  nominalCapital: number;
  realCapital: number;
  grossProventos: number;
  netProventos: number;
  retiradaNominal: number;
  reinvestidoNominal: number;
  realRentPurchasingPower: number;
  isExhausted: boolean;
}

export function runDynamicSimulation({
  initialCapital = 499998.50,
  initialMonthlyWithdrawal = 3000,
  adjustWithdrawalWithInflation = true,
  reinvestmentRate = 0.50, // se for usada taxa fixa, ou se for orientada por meta de saque
  useTargetWithdrawal = true,
  annualInflation = 0.045,
  netYield = 0.0900,
  realCapitalGrowth = 0.015,
  years = 30
}: {
  initialCapital?: number;
  initialMonthlyWithdrawal?: number;
  adjustWithdrawalWithInflation?: boolean;
  reinvestmentRate?: number;
  useTargetWithdrawal?: boolean;
  annualInflation?: number;
  netYield?: number;
  realCapitalGrowth?: number;
  years?: number;
}): SimulationResult[] {
  const results: SimulationResult[] = [];
  let cap = initialCapital;

  for (let y = 1; y <= years; y++) {
    if (cap <= 0) {
      results.push({
        year: y,
        nominalCapital: 0,
        realCapital: 0,
        grossProventos: 0,
        netProventos: 0,
        retiradaNominal: 0,
        reinvestidoNominal: 0,
        realRentPurchasingPower: 0,
        isExhausted: true
      });
      continue;
    }

    const netProventos = cap * netYield;
    const grossProventos = netProventos / (1 - 0.015); // estimativa com impostos

    let retiradaNominal = 0;
    let reinvestidoNominal = 0;

    if (useTargetWithdrawal) {
      const inflationMultiplier = adjustWithdrawalWithInflation
        ? Math.pow(1 + annualInflation, y - 1)
        : 1;
      retiradaNominal = initialMonthlyWithdrawal * 12 * inflationMultiplier;
      reinvestidoNominal = netProventos - retiradaNominal;
    } else {
      retiradaNominal = netProventos * (1 - reinvestmentRate);
      reinvestidoNominal = netProventos * reinvestmentRate;
    }

    // Atualização de capital: ativos valorizam a taxa real e reinvestimento é somado (ou déficit subtraído)
    cap = cap * (1 + realCapitalGrowth) + reinvestidoNominal;
    if (cap < 0) cap = 0;

    const realCapital = cap / Math.pow(1 + annualInflation, y);
    const realRentPurchasingPower = (retiradaNominal / 12) / Math.pow(1 + annualInflation, y);

    results.push({
      year: y,
      nominalCapital: Math.round(cap),
      realCapital: Math.round(realCapital),
      grossProventos: Math.round(grossProventos),
      netProventos: Math.round(netProventos),
      retiradaNominal: Math.round(retiradaNominal),
      reinvestidoNominal: Math.round(reinvestidoNominal),
      realRentPurchasingPower: Math.round(realRentPurchasingPower),
      isExhausted: cap <= 0
    });
  }

  return results;
}

export function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

export function formatPercent(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals).replace('.', ',')}%`;
}
