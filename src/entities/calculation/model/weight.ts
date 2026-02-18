import type { ProductType } from "@/entities/product";

/**
 * Calculate volume in cm³ based on product type and dimensions (in mm, except L in meters)
 */
export function calculateVolume(product: ProductType, dims: Record<string, number>): number {
  switch (product) {
    case "sheet": {
      const a = dims.a / 10;
      const b = dims.b / 10;
      const t = dims.t / 10;
      return a * b * t;
    }
    case "round_pipe": {
      const d = dims.d / 10; // cm
      const t = dims.t / 10;
      const L = dims.L * 100; // m → cm
      const outerArea = (Math.PI / 4) * d * d;
      const innerD = d - 2 * t;
      const innerArea = (Math.PI / 4) * innerD * innerD;
      return (outerArea - innerArea) * L;
    }
    case "profile_pipe": {
      const a = dims.a / 10;
      const b = dims.b / 10;
      const t = dims.t / 10;
      const L = dims.L * 100;
      const outer = a * b;
      const inner = (a - 2 * t) * (b - 2 * t);
      return (outer - inner) * L;
    }
    case "circle":
    case "rebar": {
      const d = dims.d / 10;
      const L = dims.L * 100;
      return (Math.PI / 4) * d * d * L;
    }
    case "square": {
      const a = dims.a / 10;
      const L = dims.L * 100;
      return a * a * L;
    }
    case "hexagon": {
      const a = dims.a / 10; // cm
      const L = dims.L * 100;
      return (Math.sqrt(3) / 2) * a * a * L;
    }
    case "strip": {
      const a = dims.a / 10;
      const t = dims.t / 10;
      const L = dims.L * 100;
      return a * t * L;
    }
    case "angle": {
      const a = dims.a / 10;
      const b = dims.b / 10;
      const t = dims.t / 10;
      const L = dims.L * 100;
      return (a + b - t) * t * L;
    }
    default:
      return 0;
  }
}

export function calculateWeight(
  product: ProductType,
  dims: Record<string, number>,
  density: number,
  quantity: number,
  /** Для двутавров и швеллеров: вес на метр из ГОСТ (кг/м). Табличное значение уже учитывает плотность стали. */
  weightPerMeter?: number | null,
): number {
  if (product === "i_beam" || product === "channel") {
    if (weightPerMeter !== null && weightPerMeter !== undefined && weightPerMeter > 0) {
      const L = dims.L || 0;
      return weightPerMeter * L * quantity;
    }
    return 0;
  }

  const volume = calculateVolume(product, dims);
  return (volume * density * quantity) / 1000;
}

/**
 * Форматирует вес с ограничением до 15 знаков (включая точку, знак минуса, e, +/-, но без единиц измерения)
 * Использует научную нотацию для очень больших или очень маленьких чисел
 */
export function formatWeight(kg: number): string {
  if (kg === 0) return "0";

  const absKg = Math.abs(kg);
  const MAX_LENGTH = 15;

  if (absKg >= 1e12) {
    for (let precision = 6; precision >= 0; precision--) {
      const exp = kg.toExponential(precision);
      if (exp.length <= MAX_LENGTH) return exp;
    }
    return kg.toExponential(0);
  }

  if (absKg > 0 && absKg < 1e-6) {
    for (let precision = 6; precision >= 0; precision--) {
      const exp = kg.toExponential(precision);
      if (exp.length <= MAX_LENGTH) return exp;
    }
    return kg.toExponential(0);
  }

  if (kg >= 1000) {
    const formatted = kg.toFixed(1);
    if (formatted.length <= MAX_LENGTH) return formatted;
    for (let precision = 6; precision >= 0; precision--) {
      const exp = kg.toExponential(precision);
      if (exp.length <= MAX_LENGTH) return exp;
    }
    return kg.toExponential(0);
  }

  if (kg >= 1) {
    const formatted = kg.toFixed(3);
    if (formatted.length <= MAX_LENGTH) return formatted;
    for (let decimals = 2; decimals >= 0; decimals--) {
      const v = kg.toFixed(decimals);
      if (v.length <= MAX_LENGTH) return v;
    }
    for (let precision = 6; precision >= 0; precision--) {
      const exp = kg.toExponential(precision);
      if (exp.length <= MAX_LENGTH) return exp;
    }
    return kg.toExponential(0);
  }

  if (kg >= 0.001) {
    const formatted = kg.toFixed(4);
    if (formatted.length <= MAX_LENGTH) return formatted;
    for (let decimals = 3; decimals >= 0; decimals--) {
      const v = kg.toFixed(decimals);
      if (v.length <= MAX_LENGTH) return v;
    }
    for (let precision = 6; precision >= 0; precision--) {
      const exp = kg.toExponential(precision);
      if (exp.length <= MAX_LENGTH) return exp;
    }
    return kg.toExponential(0);
  }

  for (let precision = 6; precision >= 0; precision--) {
    const exp = kg.toExponential(precision);
    if (exp.length <= MAX_LENGTH) return exp;
  }
  return kg.toExponential(0);
}

