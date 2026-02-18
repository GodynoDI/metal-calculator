import type { ProductType } from "@/entities/product";
import { cn } from "@/shared/lib/cn";
import styles from "./ProductDiagram.module.scss";

interface Props {
  product: ProductType;
  /** Размеры в мм (кроме L — в метрах). Ключи: a, b, t, d, L и т.д. */
  dims?: Record<string, string | number>;
}

/** Форматирует значение для отображения на диаграмме (только число, без единиц измерения) */
function formatDimValue(value: string | number | undefined): string {
  if (value === undefined || value === "" || value === null) return "";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num) || num <= 0) return "";
  if (num % 1 === 0) return String(num);
  return num.toFixed(1);
}

export function ProductDiagram({ product, dims = {} }: Props) {
  switch (product) {
    case "sheet":
      return (
        <div className={styles.root}>
          <svg viewBox="0 0 200 150">
            <defs>
              <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" className={styles.patternLine} strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect x="50" y="20" width="100" height="80" fill="url(#hatch)" className={styles.strokeSteel} strokeWidth="1.5" />
            <line x1="50" y1="115" x2="150" y2="115" className={styles.strokePrimary} strokeWidth="1" />
            <text x="100" y="130" className={cn(styles.diagramLabel, styles.diagramLabelPrimary)}>
              {formatDimValue(dims.a) || "a"}
            </text>
            <line x1="35" y1="20" x2="35" y2="100" className={styles.strokePrimary} strokeWidth="1" />
            <text
              x="25"
              y="65"
              className={cn(styles.diagramLabel, styles.diagramLabelPrimary)}
              transform="rotate(-90 25 65)"
              dominantBaseline="middle"
            >
              {formatDimValue(dims.b) || "b"}
            </text>
            <line x1="155" y1="20" x2="155" y2="30" className={styles.strokeAccent} strokeWidth="1" />
            <text x="168" y="28" className={cn(styles.diagramLabel, styles.diagramLabelSmall, styles.diagramLabelAccent)}>
              {formatDimValue(dims.t) || "t"}
            </text>
          </svg>
        </div>
      );
    case "round_pipe":
      return (
        <div className={styles.root}>
          <svg viewBox="0 0 200 150">
            <circle cx="100" cy="65" r="45" className={styles.strokeSteel} fill="none" strokeWidth="8" />
            <line x1="100" y1="65" x2="145" y2="65" className={styles.strokePrimary} strokeWidth="1" />
            <text x="125" y="58" className={cn(styles.diagramLabel, styles.diagramLabelPrimary)}>
              {formatDimValue(dims.d) || "d"}
            </text>
            <text x="155" y="50" className={cn(styles.diagramLabel, styles.diagramLabelSmall, styles.diagramLabelAccent)}>
              {formatDimValue(dims.t) || "t"}
            </text>
          </svg>
        </div>
      );
    case "profile_pipe":
      return (
        <div className={styles.root}>
          <svg viewBox="0 0 200 150">
            <rect x="45" y="20" width="110" height="90" rx="3" className={styles.strokeSteel} fill="none" strokeWidth="8" />
            <line x1="45" y1="125" x2="155" y2="125" className={styles.strokePrimary} strokeWidth="1" />
            <text x="100" y="140" className={cn(styles.diagramLabel, styles.diagramLabelPrimary)}>
              {formatDimValue(dims.a) || "a"}
            </text>
            <line x1="30" y1="20" x2="30" y2="110" className={styles.strokePrimary} strokeWidth="1" />
            <text
              x="20"
              y="70"
              className={cn(styles.diagramLabel, styles.diagramLabelPrimary)}
              transform="rotate(-90 20 70)"
              dominantBaseline="middle"
            >
              {formatDimValue(dims.b) || "b"}
            </text>
            <text x="165" y="30" className={cn(styles.diagramLabel, styles.diagramLabelSmall, styles.diagramLabelAccent)}>
              {formatDimValue(dims.t) || "t"}
            </text>
          </svg>
        </div>
      );
    case "circle":
    case "rebar":
      return (
        <div className={styles.root}>
          <svg viewBox="0 0 200 150">
            <defs>
              <pattern id="hatch2" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" className={styles.patternLine} strokeWidth="0.8" />
              </pattern>
            </defs>
            <circle cx="100" cy="65" r="40" fill="url(#hatch2)" className={styles.strokeSteel} strokeWidth="1.5" />
            <line x1="60" y1="65" x2="140" y2="65" className={styles.strokePrimary} strokeWidth="1" />
            <text x="100" y="80" className={cn(styles.diagramLabel, styles.diagramLabelPrimary)}>
              {formatDimValue(dims.d) || "d"}
            </text>
          </svg>
        </div>
      );
    case "square":
      return (
        <div className={styles.root}>
          <svg viewBox="0 0 200 150">
            <defs>
              <pattern id="hatch3" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" className={styles.patternLine} strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect x="50" y="25" width="100" height="100" fill="url(#hatch3)" className={styles.strokeSteel} strokeWidth="1.5" />
            <line x1="50" y1="140" x2="150" y2="140" className={styles.strokePrimary} strokeWidth="1" />
            <text x="100" y="150" className={cn(styles.diagramLabel, styles.diagramLabelPrimary)}>
              {formatDimValue(dims.a) || "a"}
            </text>
          </svg>
        </div>
      );
    case "hexagon":
      return (
        <div className={styles.root}>
          <svg viewBox="0 0 200 150">
            <polygon
              points="100,15 145,37.5 145,82.5 100,105 55,82.5 55,37.5"
              className={styles.strokeSteel}
              fill="none"
              strokeWidth="1.5"
            />
            <line x1="55" y1="60" x2="145" y2="60" className={styles.strokePrimary} strokeWidth="1" />
            <text x="100" y="75" className={cn(styles.diagramLabel, styles.diagramLabelPrimary)}>
              {formatDimValue(dims.a) || "a"}
            </text>
          </svg>
        </div>
      );
    case "strip":
      return (
        <div className={styles.root}>
          <svg viewBox="0 0 200 150">
            <defs>
              <pattern id="hatch4" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" className={styles.patternLine} strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect x="30" y="50" width="140" height="20" fill="url(#hatch4)" className={styles.strokeSteel} strokeWidth="1.5" />
            <line x1="30" y1="85" x2="170" y2="85" className={styles.strokePrimary} strokeWidth="1" />
            <text x="100" y="100" className={cn(styles.diagramLabel, styles.diagramLabelPrimary)}>
              {formatDimValue(dims.a) || "a"}
            </text>
            <line x1="180" y1="50" x2="180" y2="70" className={styles.strokeAccent} strokeWidth="1" />
            <text x="190" y="65" className={cn(styles.diagramLabel, styles.diagramLabelSmall, styles.diagramLabelAccent)}>
              {formatDimValue(dims.t) || "t"}
            </text>
          </svg>
        </div>
      );
    case "angle":
      return (
        <div className={styles.root}>
          <svg viewBox="0 0 200 150">
            <path
              d="M 40,20 L 40,130 L 150,130 L 150,115 L 55,115 L 55,20 Z"
              className={styles.strokeSteel}
              fill="none"
              strokeWidth="1.5"
            />
            <line x1="40" y1="140" x2="150" y2="140" className={styles.strokePrimary} strokeWidth="1" />
            <text x="100" y="150" className={cn(styles.diagramLabel, styles.diagramLabelPrimary)}>
              {formatDimValue(dims.a) || "a"}
            </text>
            <line x1="25" y1="20" x2="25" y2="130" className={styles.strokePrimary} strokeWidth="1" />
            <text
              x="15"
              y="80"
              className={cn(styles.diagramLabel, styles.diagramLabelPrimary)}
              transform="rotate(-90 15 80)"
              dominantBaseline="middle"
            >
              {formatDimValue(dims.b) || "b"}
            </text>
            <text x="60" y="80" className={cn(styles.diagramLabel, styles.diagramLabelSmall, styles.diagramLabelAccent)}>
              {formatDimValue(dims.t) || "t"}
            </text>
          </svg>
        </div>
      );
    case "i_beam":
      return (
        <div className={styles.root}>
          <svg viewBox="0 0 200 150">
            <path
              d="M 40,20 L 40,50 L 80,50 L 80,100 L 40,100 L 40,130 L 160,130 L 160,100 L 120,100 L 120,50 L 160,50 L 160,20 Z"
              className={styles.strokeSteel}
              fill="none"
              strokeWidth="1.5"
            />
            <line x1="80" y1="75" x2="120" y2="75" className={styles.strokePrimary} strokeWidth="1" />
            <text x="100" y="90" className={cn(styles.diagramLabel, styles.diagramLabelPrimary)}>
              h
            </text>
            <line x1="30" y1="20" x2="30" y2="130" className={styles.strokePrimary} strokeWidth="1" />
            <text
              x="20"
              y="80"
              className={cn(styles.diagramLabel, styles.diagramLabelPrimary)}
              transform="rotate(-90 20 80)"
              dominantBaseline="middle"
            >
              b
            </text>
          </svg>
        </div>
      );
    case "channel":
      return (
        <div className={styles.root}>
          <svg viewBox="0 0 200 150">
            <path
              d="M 40,20 L 40,50 L 50,50 L 50,100 L 40,100 L 40,130 L 160,130 L 160,100 L 150,100 L 150,50 L 160,50 L 160,20 L 50,20 Z"
              className={styles.strokeSteel}
              fill="none"
              strokeWidth="1.5"
            />
            <line x1="50" y1="75" x2="150" y2="75" className={styles.strokePrimary} strokeWidth="1" />
            <text x="100" y="90" className={cn(styles.diagramLabel, styles.diagramLabelPrimary)}>
              h
            </text>
            <line x1="30" y1="20" x2="30" y2="130" className={styles.strokePrimary} strokeWidth="1" />
            <text
              x="20"
              y="80"
              className={cn(styles.diagramLabel, styles.diagramLabelPrimary)}
              transform="rotate(-90 20 80)"
              dominantBaseline="middle"
            >
              b
            </text>
          </svg>
        </div>
      );
    default:
      return null;
  }
}

