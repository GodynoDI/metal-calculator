export interface MetalInfo {
  id: string;
  name: string;
  density: number; // g/cm³
}

export type MetalKindId =
  | "steel"
  | "aluminum"
  | "copper"
  | "brass"
  | "bronze"
  | "titanium"
  | "cast_iron"
  | "zinc";

export interface MetalKind {
  id: MetalKindId;
  name: string;
  density: number; // g/cm³
}

export interface MetalGrade {
  id: string;
  kindId: MetalKindId;
  name: string;
  density: number; // g/cm³
}

