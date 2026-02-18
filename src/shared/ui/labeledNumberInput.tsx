import * as React from "react";

import { cn } from "@/shared/lib/cn";
import styles from "./labeledNumberInput.module.scss";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

interface Props extends InputProps {
  label: string;
  inputId: string;
  unit?: string;
  wrapperClassName?: string;
}

export function LabeledNumberInput({
  label,
  inputId,
  unit,
  className,
  wrapperClassName,
  ...props
}: Props) {
  return (
    <div className={cn(styles.group, wrapperClassName)}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input id={inputId} type="number" className={cn(styles.input, className)} {...props} />
        {unit && (
          <span className={styles.unit} aria-hidden="true">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
