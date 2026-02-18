import type { ProductType } from "@/entities/product";

import {
  iBeamTypeData,
  channelTypeData,
  type IBeamType,
  type ChannelType,
  type IBeamTypeData,
  type ChannelTypeData,
} from "@/entities/beam";

export interface ReferenceSize {
  id: string;
  label: string;
  /** Размеры в мм (кроме L — в метрах). Без L. Для двутавров и швеллеров не используется. */
  dims?: Record<string, number>;
  /** Для двутавров и швеллеров: вес на метр из ГОСТ (кг/м) */
  weightPerMeter?: number;
}

export interface Reference {
  id: string;
  name: string;
  productType: ProductType;
  sizes: ReferenceSize[];
}

/** Моковые справочники. В будущем заполнить реальными данными. */
export const references: Reference[] = [
  // Арматура
  {
    id: 'gost-2591',
    name: 'ГОСТ 2591',
    productType: 'rebar',
    sizes: [
      { id: 'd6', label: '6 мм', dims: { d: 6 } },
      { id: 'd8', label: '8 мм', dims: { d: 8 } },
      { id: 'd10', label: '10 мм', dims: { d: 10 } },
      { id: 'd12', label: '12 мм', dims: { d: 12 } },
      { id: 'd14', label: '14 мм', dims: { d: 14 } },
      { id: 'd16', label: '16 мм', dims: { d: 16 } },
      { id: 'd18', label: '18 мм', dims: { d: 18 } },
      { id: 'd20', label: '20 мм', dims: { d: 20 } },
      { id: 'd22', label: '22 мм', dims: { d: 22 } },
      { id: 'd25', label: '25 мм', dims: { d: 25 } },
    ],
  },
  {
    id: 'gost-8559',
    name: 'ГОСТ 8559',
    productType: 'rebar',
    sizes: [
      { id: 'd6', label: '6 мм', dims: { d: 6 } },
      { id: 'd8', label: '8 мм', dims: { d: 8 } },
      { id: 'd10', label: '10 мм', dims: { d: 10 } },
      { id: 'd12', label: '12 мм', dims: { d: 12 } },
      { id: 'd14', label: '14 мм', dims: { d: 14 } },
      { id: 'd16', label: '16 мм', dims: { d: 16 } },
      { id: 'd20', label: '20 мм', dims: { d: 20 } },
      { id: 'd25', label: '25 мм', dims: { d: 25 } },
      { id: 'd28', label: '28 мм', dims: { d: 28 } },
      { id: 'd32', label: '32 мм', dims: { d: 32 } },
    ],
  },
  // Труба профильная
  {
    id: 'gost-8645',
    name: 'ГОСТ 8645',
    productType: 'profile_pipe',
    sizes: [
      { id: '15x15x1', label: '15×15×1 мм', dims: { a: 15, b: 15, t: 1 } },
      { id: '20x20x1.5', label: '20×20×1,5 мм', dims: { a: 20, b: 20, t: 1.5 } },
      { id: '25x25x1.5', label: '25×25×1,5 мм', dims: { a: 25, b: 25, t: 1.5 } },
      { id: '40x40x2', label: '40×40×2 мм', dims: { a: 40, b: 40, t: 2 } },
      { id: '50x50x2', label: '50×50×2 мм', dims: { a: 50, b: 50, t: 2 } },
      { id: '60x60x2', label: '60×60×2 мм', dims: { a: 60, b: 60, t: 2 } },
    ],
  },
  // Круг
  {
    id: 'gost-2590',
    name: 'ГОСТ 2590',
    productType: 'circle',
    sizes: [
      { id: 'd10', label: '10 мм', dims: { d: 10 } },
      { id: 'd12', label: '12 мм', dims: { d: 12 } },
      { id: 'd14', label: '14 мм', dims: { d: 14 } },
      { id: 'd16', label: '16 мм', dims: { d: 16 } },
      { id: 'd20', label: '20 мм', dims: { d: 20 } },
      { id: 'd25', label: '25 мм', dims: { d: 25 } },
      { id: 'd30', label: '30 мм', dims: { d: 30 } },
      { id: 'd40', label: '40 мм', dims: { d: 40 } },
      { id: 'd50', label: '50 мм', dims: { d: 50 } },
    ],
  },
  // Квадрат
  {
    id: 'gost-2591-square',
    name: 'ГОСТ 2591',
    productType: 'square',
    sizes: [
      { id: 'a10', label: '10 мм', dims: { a: 10 } },
      { id: 'a12', label: '12 мм', dims: { a: 12 } },
      { id: 'a14', label: '14 мм', dims: { a: 14 } },
      { id: 'a16', label: '16 мм', dims: { a: 16 } },
      { id: 'a20', label: '20 мм', dims: { a: 20 } },
      { id: 'a25', label: '25 мм', dims: { a: 25 } },
      { id: 'a30', label: '30 мм', dims: { a: 30 } },
      { id: 'a40', label: '40 мм', dims: { a: 40 } },
    ],
  },
  // Шестигранник
  {
    id: 'gost-2879',
    name: 'ГОСТ 2879',
    productType: 'hexagon',
    sizes: [
      { id: 'a8', label: '8 мм', dims: { a: 8 } },
      { id: 'a10', label: '10 мм', dims: { a: 10 } },
      { id: 'a12', label: '12 мм', dims: { a: 12 } },
      { id: 'a14', label: '14 мм', dims: { a: 14 } },
      { id: 'a17', label: '17 мм', dims: { a: 17 } },
      { id: 'a19', label: '19 мм', dims: { a: 19 } },
      { id: 'a22', label: '22 мм', dims: { a: 22 } },
      { id: 'a24', label: '24 мм', dims: { a: 24 } },
    ],
  },
  // Полоса
  {
    id: 'gost-103',
    name: 'ГОСТ 103',
    productType: 'strip',
    sizes: [
      { id: '20x3', label: '20×3 мм', dims: { a: 20, t: 3 } },
      { id: '25x4', label: '25×4 мм', dims: { a: 25, t: 4 } },
      { id: '30x4', label: '30×4 мм', dims: { a: 30, t: 4 } },
      { id: '40x4', label: '40×4 мм', dims: { a: 40, t: 4 } },
      { id: '40x5', label: '40×5 мм', dims: { a: 40, t: 5 } },
      { id: '50x5', label: '50×5 мм', dims: { a: 50, t: 5 } },
      { id: '60x6', label: '60×6 мм', dims: { a: 60, t: 6 } },
    ],
  },
  // Уголок
  {
    id: 'gost-8509',
    name: 'ГОСТ 8509',
    productType: 'angle',
    sizes: [
      { id: '25x25x3', label: '25×25×3 мм', dims: { a: 25, b: 25, t: 3 } },
      { id: '30x30x3', label: '30×30×3 мм', dims: { a: 30, b: 30, t: 3 } },
      { id: '40x40x4', label: '40×40×4 мм', dims: { a: 40, b: 40, t: 4 } },
      { id: '50x50x5', label: '50×50×5 мм', dims: { a: 50, b: 50, t: 5 } },
      { id: '63x63x5', label: '63×63×5 мм', dims: { a: 63, b: 63, t: 5 } },
      { id: '75x75x6', label: '75×75×6 мм', dims: { a: 75, b: 75, t: 6 } },
      { id: '100x100x8', label: '100×100×8 мм', dims: { a: 100, b: 100, t: 8 } },
    ],
  },
];

/** Справочники для данного сортамента */
export function getReferencesForProduct(productType: ProductType): Reference[] {
  return references.filter((r) => r.productType === productType);
}

export { iBeamTypeData, channelTypeData };
export type { IBeamType, ChannelType, IBeamTypeData, ChannelTypeData };
