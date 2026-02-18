import type { ReactNode } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import styles from "./labeledSelect.module.scss";

interface Item {
  value: string;
  label: ReactNode;
}

interface Props {
  label: ReactNode;
  inputId: string;
  ariaLabel: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  items: Item[];
}

export function LabeledSelect({
  label,
  inputId,
  ariaLabel,
  value,
  onChange,
  placeholder,
  disabled,
  items,
}: Props) {
  return (
    <div className={styles.group}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger id={inputId} aria-label={ariaLabel}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((it) => (
            <SelectItem key={it.value} value={it.value}>
              {it.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
