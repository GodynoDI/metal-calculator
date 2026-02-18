import type { ProductType } from "./types";

export type InputMode = "reference_only" | "dimensions_only" | "both";

/** Какой способ ввода доступен для каждого сортамента */
export const productInputMode: Record<ProductType, InputMode> = {
  rebar: "reference_only",
  i_beam: "reference_only",
  channel: "reference_only",
  round_pipe: "dimensions_only",
  sheet: "dimensions_only",
  profile_pipe: "both",
  circle: "both",
  square: "both",
  hexagon: "both",
  strip: "both",
  angle: "both",
};

