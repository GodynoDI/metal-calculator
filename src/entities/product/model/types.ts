export type ProductType =
  | "sheet"
  | "round_pipe"
  | "profile_pipe"
  | "circle"
  | "square"
  | "hexagon"
  | "strip"
  | "rebar"
  | "angle"
  | "i_beam"
  | "channel";

export interface FieldDef {
  key: string;
  label: string;
  unit: string;
  placeholder?: string;
}

export interface ProductInfo {
  id: ProductType;
  name: string;
  icon: string;
  fields: FieldDef[];
}

