import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { calculateWeight, formatWeight } from "@/entities/calculation";
import { metalGrades, metalKinds } from "@/entities/metal";
import { products, productInputMode, type FieldDef, type ProductType } from "@/entities/product";
import { getReferencesForProduct, type Reference, type ReferenceSize } from "@/entities/reference";
import {
  channelTypeData,
  getChannelWeightPerMeter,
  getIBeamWeightPerMeter,
  iBeamTypeData,
  type ChannelType,
  type IBeamType,
} from "@/entities/beam";

export type InputMethod = "dimensions" | "reference";

type CalculationSnapshot = {
  id: string;
  createdAt: number;
  productId: ProductType;
  metalId: string;
  metalKindId?: string;
  metalGradeId?: string;
  dims: Record<string, string>;
  quantity: string;
  inputMethod: InputMethod;
  selectedReferenceId: string;
  selectedSizeId: string;
  selectedIBeamType: IBeamType | "";
  selectedChannelType: ChannelType | "";
  selectedBeamNumber: string;
  weight: number;
};

type SavedSnapshot = CalculationSnapshot & {
  name: string;
  comment?: string;
};

const LS_HISTORY_KEY = "cc:calc:history:v1";
const LS_SAVED_KEY = "cc:calc:saved:v1";
const HISTORY_LIMIT = 30;

function safeParseJson<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function readSnapshots(key: string): CalculationSnapshot[] {
  if (typeof window === "undefined") return [];
  const parsed = safeParseJson<CalculationSnapshot[]>(window.localStorage.getItem(key));
  return Array.isArray(parsed) ? parsed : [];
}

function readSavedSnapshots(key: string): SavedSnapshot[] {
  if (typeof window === "undefined") return [];
  const parsed = safeParseJson<Array<Partial<SavedSnapshot> & CalculationSnapshot>>(window.localStorage.getItem(key));
  if (!Array.isArray(parsed)) return [];
  return parsed
    .filter((x) => !!x && typeof x === "object")
    .map((x) => {
      const base = x as SavedSnapshot;
      return {
        ...base,
        name: typeof base.name === "string" && base.name.trim() ? base.name : "",
        comment: typeof base.comment === "string" && base.comment.trim() ? base.comment : undefined,
      };
    });
}

function writeSnapshots(key: string, items: CalculationSnapshot[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(items));
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function stableStringify(value: unknown): string {
  if (value === null || value === undefined) return String(value);
  if (typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj).sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${stableStringify(obj[k])}`).join(",")}}`;
}

function snapshotFingerprint(s: Omit<CalculationSnapshot, "id" | "createdAt">): string {
  return stableStringify(s);
}

function weightToLabel(weightKg: number): string {
  if (!weightKg || weightKg <= 0) return "0 кг";
  if (weightKg >= 1000) return `${formatWeight(weightKg / 1000)} т`;
  return `${formatWeight(weightKg)} кг`;
}

function qtyToLabel(quantity: string): string {
  const n = parseInt(quantity) || 1;
  return `${n} шт`;
}

function compactDims(productId: ProductType, dims: Record<string, string>): string {
  const pick = (k: string) => dims[k] || "";

  switch (productId) {
    case "sheet": {
      const a = pick("a");
      const b = pick("b");
      const t = pick("t");
      if (!a || !b || !t) return "";
      return `${a}×${b}×${t}`;
    }
    case "profile_pipe": {
      const a = pick("a");
      const b = pick("b");
      const t = pick("t");
      const L = pick("L");
      if (!a || !b || !t || !L) return "";
      return `${a}×${b}×${t}, L=${L}м`;
    }
    case "round_pipe": {
      const d = pick("d");
      const t = pick("t");
      const L = pick("L");
      if (!d || !t || !L) return "";
      return `Ø${d}×${t}, L=${L}м`;
    }
    case "circle": {
      const d = pick("d");
      const L = pick("L");
      if (!d || !L) return "";
      return `Ø${d}, L=${L}м`;
    }
    case "square": {
      const a = pick("a");
      const L = pick("L");
      if (!a || !L) return "";
      return `${a}, L=${L}м`;
    }
    case "hexagon": {
      const a = pick("a");
      const L = pick("L");
      if (!a || !L) return "";
      return `${a}, L=${L}м`;
    }
    case "strip": {
      const a = pick("a");
      const t = pick("t");
      const L = pick("L");
      if (!a || !t || !L) return "";
      return `${a}×${t}, L=${L}м`;
    }
    case "rebar": {
      const d = pick("d");
      const L = pick("L");
      if (!d || !L) return "";
      return `Ø${d}, L=${L}м`;
    }
    case "angle": {
      const a = pick("a");
      const b = pick("b");
      const t = pick("t");
      const L = pick("L");
      if (!a || !b || !t || !L) return "";
      return `${a}×${b}×${t}, L=${L}м`;
    }
    case "i_beam":
    case "channel": {
      const L = pick("L");
      if (!L) return "";
      return `L=${L}м`;
    }
    default:
      return "";
  }
}

function dimensionFieldsOnly(fields: FieldDef[]): FieldDef[] {
  return fields.filter((f) => f.key !== "L");
}

export function useCalculator() {
  const [selectedProduct, setSelectedProduct] = useState<ProductType>("sheet");
  const [selectedMetalKind, setSelectedMetalKind] = useState(metalKinds[0]!.id);
  const [selectedMetalGrade, setSelectedMetalGrade] = useState(
    metalGrades.find((g) => g.kindId === metalKinds[0]!.id)?.id ?? metalGrades[0]!.id,
  );
  const [dims, setDims] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState("1");

  // for mode=both
  const [inputMethod, setInputMethod] = useState<InputMethod>("dimensions");

  // common references
  const [selectedReferenceId, setSelectedReferenceId] = useState("");
  const [selectedSizeId, setSelectedSizeId] = useState("");

  // beams/channels
  const [selectedIBeamType, setSelectedIBeamType] = useState<IBeamType | "">("");
  const [selectedChannelType, setSelectedChannelType] = useState<ChannelType | "">("");
  const [selectedBeamNumber, setSelectedBeamNumber] = useState("");

  const [history, setHistory] = useState<CalculationSnapshot[]>(() => readSnapshots(LS_HISTORY_KEY));
  const [saved, setSaved] = useState<SavedSnapshot[]>(() => readSavedSnapshots(LS_SAVED_KEY));

  const [lastWeight, setLastWeight] = useState(0);
  const [hasResult, setHasResult] = useState(false);

  const historyRef = useRef(history);
  const savedRef = useRef(saved);
  useEffect(() => {
    historyRef.current = history;
  }, [history]);
  useEffect(() => {
    savedRef.current = saved;
  }, [saved]);

  const product = useMemo(
    () => products.find((p) => p.id === selectedProduct)!,
    [selectedProduct],
  );

  const productNameById = useMemo(() => {
    return Object.fromEntries(products.map((p) => [p.id, p.name])) as Record<ProductType, string>;
  }, []);

  const handleMetalKindChange = useCallback((kindId: string) => {
    setSelectedMetalKind(kindId as any);
    const firstGrade = metalGrades.find((g) => g.kindId === kindId)?.id;
    if (firstGrade) setSelectedMetalGrade(firstGrade);
  }, []);

  const availableMetalGrades = useMemo(
    () => metalGrades.filter((g) => g.kindId === selectedMetalKind),
    [selectedMetalKind],
  );

  const metal = useMemo(
    () => metalGrades.find((m) => m.id === selectedMetalGrade) ?? availableMetalGrades[0] ?? metalGrades[0]!,
    [availableMetalGrades, selectedMetalGrade],
  );

  const mode = productInputMode[product.id];
  const dimensionFields = useMemo(() => dimensionFieldsOnly(product.fields), [product.fields]);

  const productReferences = useMemo(() => getReferencesForProduct(product.id), [product.id]);
  const selectedReference = useMemo(
    () => productReferences.find((r) => r.id === selectedReferenceId) ?? null,
    [productReferences, selectedReferenceId],
  );
  const availableSizes = selectedReference?.sizes ?? [];
  const selectedSize = availableSizes.find((s) => s.id === selectedSizeId) ?? null;

  const handleDimChange = useCallback((key: string, value: string) => {
    setDims((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleProductChange = useCallback((id: ProductType) => {
    setSelectedProduct(id);
    setDims({});
    setSelectedReferenceId("");
    setSelectedSizeId("");
    setSelectedIBeamType("");
    setSelectedChannelType("");
    setSelectedBeamNumber("");
    if (productInputMode[id] === "both") {
      setInputMethod("dimensions");
    }
    setHasResult(false);
    setLastWeight(0);
  }, []);

  const handleReferenceChange = useCallback(
    (refId: string) => {
      const ref = productReferences.find((r) => r.id === refId);
      const firstSize = ref?.sizes[0];
      setSelectedReferenceId(refId);
      setSelectedSizeId(firstSize?.id ?? "");
      setDims((prev) => {
        const next = { ...prev };
        if (firstSize?.dims) {
          for (const k of Object.keys(firstSize.dims)) {
            next[k] = String(firstSize.dims[k]);
          }
        }
        return next;
      });
    },
    [productReferences],
  );

  const handleSizeChange = useCallback(
    (sizeId: string) => {
      setSelectedSizeId(sizeId);
      const size = availableSizes.find((s) => s.id === sizeId);
      if (size?.dims) {
        setDims((prev) => ({
          ...prev,
          ...Object.fromEntries(Object.entries(size.dims).map(([k, v]) => [k, String(v)])),
        }));
      }
    },
    [availableSizes],
  );

  const computeWeight = useCallback(() => {
    const numDims: Record<string, number> = {};
    for (const f of product.fields) {
      const val = parseFloat(dims[f.key] || "");
      if (isNaN(val) || val <= 0) return 0;
      numDims[f.key] = val;
    }
    const qty = parseInt(quantity) || 1;

    let weightPerMeter: number | null = null;
    if (product.id === "i_beam" && selectedIBeamType && selectedBeamNumber) {
      weightPerMeter = getIBeamWeightPerMeter(selectedIBeamType, selectedBeamNumber);
    } else if (product.id === "channel" && selectedChannelType && selectedBeamNumber) {
      weightPerMeter = getChannelWeightPerMeter(selectedChannelType, selectedBeamNumber);
    }

    return calculateWeight(product.id, numDims, metal.density, qty, weightPerMeter);
  }, [
    dims,
    metal.density,
    product.fields,
    product.id,
    quantity,
    selectedBeamNumber,
    selectedChannelType,
    selectedIBeamType,
  ]);

  const weightUnit = lastWeight >= 1000 ? "т" : "кг";
  const displayValue = lastWeight >= 1000 ? formatWeight(lastWeight / 1000) : formatWeight(lastWeight);

  const showDimensionsInput = mode === "dimensions_only" || (mode === "both" && inputMethod === "dimensions");
  const showReferenceInput = mode === "reference_only" || (mode === "both" && inputMethod === "reference");

  const makeSnapshot = useCallback(
    (weight: number): CalculationSnapshot => ({
      id: makeId(),
      createdAt: Date.now(),
      productId: selectedProduct,
      metalId: selectedMetalGrade,
      metalKindId: selectedMetalKind,
      metalGradeId: selectedMetalGrade,
      dims,
      quantity,
      inputMethod,
      selectedReferenceId,
      selectedSizeId,
      selectedIBeamType,
      selectedChannelType,
      selectedBeamNumber,
      weight,
    }),
    [
      dims,
      inputMethod,
      quantity,
      selectedBeamNumber,
      selectedChannelType,
      selectedIBeamType,
      selectedMetalGrade,
      selectedMetalKind,
      selectedProduct,
      selectedReferenceId,
      selectedSizeId,
    ],
  );

  const snapshotLabel = useCallback(
    (s: CalculationSnapshot) => {
      const prodName = productNameById[s.productId] ?? s.productId;
      const dimsLabel = compactDims(s.productId, s.dims);
      const left = dimsLabel ? `${prodName} ${dimsLabel}` : prodName;
      return `${left}, ${qtyToLabel(s.quantity)} — ${weightToLabel(s.weight)}`;
    },
    [productNameById],
  );

  const defaultSaveName = useCallback(() => {
    const snap = makeSnapshot(lastWeight);
    return snapshotLabel(snap);
  }, [lastWeight, makeSnapshot, snapshotLabel]);

  const restoreSnapshot = useCallback((s: CalculationSnapshot) => {
    setSelectedProduct(s.productId);
    const nextKind =
      (s.metalKindId as any) ??
      metalGrades.find((g) => g.id === s.metalGradeId)?.kindId ??
      metalGrades.find((g) => g.id === s.metalId)?.kindId ??
      metalKinds[0]!.id;

    const nextGrade =
      s.metalGradeId ??
      (metalGrades.find((g) => g.id === s.metalId)?.id ?? metalGrades.find((g) => g.kindId === nextKind)?.id);

    setSelectedMetalKind(nextKind);
    if (nextGrade) setSelectedMetalGrade(nextGrade);
    setDims(s.dims);
    setQuantity(s.quantity);
    setInputMethod(s.inputMethod);
    setSelectedReferenceId(s.selectedReferenceId);
    setSelectedSizeId(s.selectedSizeId);
    setSelectedIBeamType(s.selectedIBeamType);
    setSelectedChannelType(s.selectedChannelType);
    setSelectedBeamNumber(s.selectedBeamNumber);
    setLastWeight(s.weight);
    setHasResult(true);
  }, []);

  const calculate = useCallback(() => {
    const w = computeWeight();
    setLastWeight(w);
    setHasResult(true);

    const snap = makeSnapshot(w);

    const prev = historyRef.current;
    const prev0 = prev[0];
    if (prev0) {
      const fpPrev0 = snapshotFingerprint({
        productId: prev0.productId,
        metalId: prev0.metalId,
        dims: prev0.dims,
        quantity: prev0.quantity,
        inputMethod: prev0.inputMethod,
        selectedReferenceId: prev0.selectedReferenceId,
        selectedSizeId: prev0.selectedSizeId,
        selectedIBeamType: prev0.selectedIBeamType,
        selectedChannelType: prev0.selectedChannelType,
        selectedBeamNumber: prev0.selectedBeamNumber,
        weight: prev0.weight,
      });
      const fpSnap = snapshotFingerprint({
        productId: snap.productId,
        metalId: snap.metalId,
        dims: snap.dims,
        quantity: snap.quantity,
        inputMethod: snap.inputMethod,
        selectedReferenceId: snap.selectedReferenceId,
        selectedSizeId: snap.selectedSizeId,
        selectedIBeamType: snap.selectedIBeamType,
        selectedChannelType: snap.selectedChannelType,
        selectedBeamNumber: snap.selectedBeamNumber,
        weight: snap.weight,
      });
      if (fpPrev0 === fpSnap) {
        return w;
      }
    }

    const next = [snap, ...prev].slice(0, HISTORY_LIMIT);
    setHistory(next);
    writeSnapshots(LS_HISTORY_KEY, next);
    return w;
  }, [computeWeight, makeSnapshot]);

  const reset = useCallback(() => {
    setSelectedProduct("sheet");
    setSelectedMetalKind(metalKinds[0]!.id);
    setSelectedMetalGrade(metalGrades.find((g) => g.kindId === metalKinds[0]!.id)?.id ?? metalGrades[0]!.id);
    setDims({});
    setQuantity("1");
    setInputMethod("dimensions");
    setSelectedReferenceId("");
    setSelectedSizeId("");
    setSelectedIBeamType("");
    setSelectedChannelType("");
    setSelectedBeamNumber("");
    setLastWeight(0);
    setHasResult(false);
  }, []);

  const saveWithMeta = useCallback(
    (name: string, comment?: string) => {
      if (!hasResult) return;
      const snap = makeSnapshot(lastWeight);
      const snapToSave: SavedSnapshot = {
        ...snap,
        name: name.trim() ? name.trim() : snapshotLabel(snap),
        comment: comment?.trim() ? comment.trim() : undefined,
      };

      const fpSnap = snapshotFingerprint({
        productId: snapToSave.productId,
        metalId: snapToSave.metalId,
        dims: snapToSave.dims,
        quantity: snapToSave.quantity,
        inputMethod: snapToSave.inputMethod,
        selectedReferenceId: snapToSave.selectedReferenceId,
        selectedSizeId: snapToSave.selectedSizeId,
        selectedIBeamType: snapToSave.selectedIBeamType,
        selectedChannelType: snapToSave.selectedChannelType,
        selectedBeamNumber: snapToSave.selectedBeamNumber,
        weight: snapToSave.weight,
      });

      const prev = savedRef.current;
      const next = [
        snapToSave,
        ...prev.filter((x) => {
          const fpX = snapshotFingerprint({
            productId: x.productId,
            metalId: x.metalId,
            dims: x.dims,
            quantity: x.quantity,
            inputMethod: x.inputMethod,
            selectedReferenceId: x.selectedReferenceId,
            selectedSizeId: x.selectedSizeId,
            selectedIBeamType: x.selectedIBeamType,
            selectedChannelType: x.selectedChannelType,
            selectedBeamNumber: x.selectedBeamNumber,
            weight: x.weight,
          });
          return fpX !== fpSnap;
        }),
      ];

      setSaved(next);
      writeSnapshots(LS_SAVED_KEY, next);
    },
    [hasResult, lastWeight, makeSnapshot, snapshotLabel],
  );

  const removeFromHistory = useCallback((id: string) => {
    const next = historyRef.current.filter((x) => x.id !== id);
    setHistory(next);
    writeSnapshots(LS_HISTORY_KEY, next);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    writeSnapshots(LS_HISTORY_KEY, []);
  }, []);

  const removeFromSaved = useCallback((id: string) => {
    const next = savedRef.current.filter((x) => x.id !== id);
    setSaved(next);
    writeSnapshots(LS_SAVED_KEY, next);
  }, []);

  const clearSaved = useCallback(() => {
    setSaved([]);
    writeSnapshots(LS_SAVED_KEY, []);
  }, []);

  return {
    // raw
    products,
    metalKinds,
    metalGrades,
    availableMetalGrades,
    iBeamTypeData,
    channelTypeData,
    // state
    selectedProduct,
    selectedMetalKind,
    selectedMetalGrade,
    dims,
    quantity,
    inputMethod,
    selectedReferenceId,
    selectedSizeId,
    selectedIBeamType,
    selectedChannelType,
    selectedBeamNumber,
    // derived
    product,
    metal,
    mode,
    dimensionFields,
    productReferences,
    selectedReference,
    availableSizes,
    selectedSize,
    weight: lastWeight,
    weightUnit,
    displayValue,
    hasResult,
    history,
    saved,
    snapshotLabel,
    defaultSaveName,
    showDimensionsInput,
    showReferenceInput,
    // actions
    setSelectedMetalKind: handleMetalKindChange,
    setSelectedMetalGrade,
    setQuantity,
    setInputMethod,
    setSelectedIBeamType,
    setSelectedChannelType,
    setSelectedBeamNumber,
    handleProductChange,
    handleDimChange,
    handleReferenceChange,
    handleSizeChange,
    calculate,
    reset,
    saveWithMeta,
    restoreSnapshot,
    removeFromHistory,
    clearHistory,
    removeFromSaved,
    clearSaved,
  };
}

