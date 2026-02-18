interface Props {
  displayValue: string;
  unit: string;
  gramsHint?: string | null;
}

import styles from "./ResultCard.module.scss";

export function ResultCard({ displayValue, unit, gramsHint }: Props) {
  return (
    <div className={styles.root} role="status" aria-live="polite" aria-label="Результат расчета массы">
      <div className={styles.label}>Масса</div>
      <div className={styles.value}>
        <span className={styles.number}>{displayValue}</span>
        <span className={styles.unit}>{unit}</span>
      </div>
      {gramsHint && <div className={styles.grams}>{gramsHint}</div>}
    </div>
  );
}

