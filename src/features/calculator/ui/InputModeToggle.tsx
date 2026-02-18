import type { InputMethod } from "../model/useCalculator";
import styles from "./InputModeToggle.module.scss";

interface Props {
  value: InputMethod;
  onChange: (next: InputMethod) => void;
}

export function InputModeToggle({ value, onChange }: Props) {
  return (
    <fieldset className={styles.fieldset}>
      <span className={styles.legend}>Способ задания размеров</span>
      <div className={styles.options}>
        <label className={styles.option}>
          <input
            type="radio"
            name="input-mode"
            checked={value === "dimensions"}
            onChange={() => onChange("dimensions")}
            className={styles.radio}
          />
          <span>Задать размеры</span>
        </label>
        <label className={styles.option}>
          <input
            type="radio"
            name="input-mode"
            checked={value === "reference"}
            onChange={() => onChange("reference")}
            className={styles.radio}
          />
          <span>Из справочника</span>
        </label>
      </div>
    </fieldset>
  );
}

