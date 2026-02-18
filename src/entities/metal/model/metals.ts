import type { MetalGrade, MetalInfo, MetalKind } from "./types";

export const metalKinds: MetalKind[] = [
  { id: "steel", name: "Сталь", density: 7.85 },
  { id: "aluminum", name: "Алюминий", density: 2.71 },
  { id: "copper", name: "Медь", density: 8.93 },
  { id: "brass", name: "Латунь", density: 8.5 },
  { id: "bronze", name: "Бронза", density: 8.8 },
  { id: "titanium", name: "Титан", density: 4.505 },
  { id: "cast_iron", name: "Чугун", density: 7.2 },
  { id: "zinc", name: "Цинк", density: 7.13 },
];

export const metalGrades: MetalGrade[] = [
  { id: "steel_st3", kindId: "steel", name: "Ст3", density: 7.85 },
  { id: "steel_09g2s", kindId: "steel", name: "09Г2С", density: 7.85 },
  { id: "steel_12x18h10t", kindId: "steel", name: "12Х18Н10Т", density: 7.85 },

  { id: "aluminum_ad1", kindId: "aluminum", name: "АД1", density: 2.71 },
  { id: "aluminum_amg3", kindId: "aluminum", name: "АМг3", density: 2.71 },

  { id: "copper_m1", kindId: "copper", name: "М1", density: 8.93 },
  { id: "copper_m2", kindId: "copper", name: "М2", density: 8.93 },

  { id: "brass_l63", kindId: "brass", name: "Л63", density: 8.5 },
  { id: "brass_l68", kindId: "brass", name: "Л68", density: 8.5 },

  { id: "bronze_bra5", kindId: "bronze", name: "БрА5", density: 8.8 },
  { id: "bronze_bra7", kindId: "bronze", name: "БрА7", density: 8.8 },

  { id: "titanium_vt1", kindId: "titanium", name: "ВТ1-0", density: 4.505 },
  { id: "titanium_vt6", kindId: "titanium", name: "ВТ6", density: 4.505 },

  { id: "cast_iron_sch20", kindId: "cast_iron", name: "СЧ20", density: 7.2 },
  { id: "cast_iron_sch25", kindId: "cast_iron", name: "СЧ25", density: 7.2 },

  { id: "zinc_zn0", kindId: "zinc", name: "Ц0", density: 7.13 },
];

export const metals: MetalInfo[] = metalGrades;

