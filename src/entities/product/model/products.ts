import type { ProductInfo } from "./types";

export const products: ProductInfo[] = [
  {
    id: "sheet",
    name: "Лист",
    icon: "▭",
    fields: [
      { key: "a", label: "Ширина (a)", unit: "мм" },
      { key: "b", label: "Длина (b)", unit: "мм" },
      { key: "t", label: "Толщина (t)", unit: "мм" },
    ],
  },
  {
    id: "round_pipe",
    name: "Труба круглая",
    icon: "◎",
    fields: [
      { key: "d", label: "Диаметр (d)", unit: "мм" },
      { key: "t", label: "Толщина стенки (t)", unit: "мм" },
      { key: "L", label: "Длина (L)", unit: "м" },
    ],
  },
  {
    id: "profile_pipe",
    name: "Труба профильная",
    icon: "▢",
    fields: [
      { key: "a", label: "Ширина (a)", unit: "мм" },
      { key: "b", label: "Высота (b)", unit: "мм" },
      { key: "t", label: "Толщина стенки (t)", unit: "мм" },
      { key: "L", label: "Длина (L)", unit: "м" },
    ],
  },
  {
    id: "circle",
    name: "Круг",
    icon: "●",
    fields: [
      { key: "d", label: "Диаметр (d)", unit: "мм" },
      { key: "L", label: "Длина (L)", unit: "м" },
    ],
  },
  {
    id: "square",
    name: "Квадрат",
    icon: "■",
    fields: [
      { key: "a", label: "Сторона (a)", unit: "мм" },
      { key: "L", label: "Длина (L)", unit: "м" },
    ],
  },
  {
    id: "hexagon",
    name: "Шестигранник",
    icon: "⬡",
    fields: [
      { key: "a", label: "Размер под ключ (a)", unit: "мм" },
      { key: "L", label: "Длина (L)", unit: "м" },
    ],
  },
  {
    id: "strip",
    name: "Лента",
    icon: "━",
    fields: [
      { key: "a", label: "Ширина (a)", unit: "мм" },
      { key: "t", label: "Толщина (t)", unit: "мм" },
      { key: "L", label: "Длина (L)", unit: "м" },
    ],
  },
  {
    id: "rebar",
    name: "Арматура",
    icon: "⊘",
    fields: [
      { key: "d", label: "Диаметр (d)", unit: "мм" },
      { key: "L", label: "Длина (L)", unit: "м" },
    ],
  },
  {
    id: "angle",
    name: "Уголок",
    icon: "∟",
    fields: [
      { key: "a", label: "Ширина уголка (a)", unit: "мм" },
      { key: "b", label: "Высота уголка (b)", unit: "мм" },
      { key: "t", label: "Толщина (t)", unit: "мм" },
      { key: "L", label: "Длина (L)", unit: "м" },
    ],
  },
  {
    id: "i_beam",
    name: "Двутавр",
    icon: "⫸",
    fields: [{ key: "L", label: "Длина (L)", unit: "м" }],
  },
  {
    id: "channel",
    name: "Швеллер",
    icon: "⊏",
    fields: [{ key: "L", label: "Длина (L)", unit: "м" }],
  },
];

