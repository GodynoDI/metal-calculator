import type { ReactNode } from "react";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import styles from "./snapshotsModal.module.scss";

interface SnapshotItem {
  id: string;
  title: string;
  meta: string;
  comment?: string | null;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerLabel: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  items: SnapshotItem[];
  emptyText: ReactNode;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  clearLabel: ReactNode;
}

export function SnapshotsModal({
  open,
  onOpenChange,
  triggerLabel,
  title,
  description,
  items,
  emptyText,
  onSelect,
  onRemove,
  onClear,
  clearLabel,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className={styles.modalContent}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>

        <div className={styles.modalList}>
          {items.length === 0 ? (
            <div className={styles.modalEmpty}>{emptyText}</div>
          ) : (
            items.map((it) => (
              <button
                key={it.id}
                type="button"
                className={styles.modalRowButton}
                onClick={() => {
                  onSelect(it.id);
                  onOpenChange(false);
                }}
              >
                <div className={styles.modalRowMain}>
                  <div className={styles.modalRowTitle}>{it.title}</div>
                  <div className={styles.modalRowMeta}>{it.meta}</div>
                  {it.comment ? <div className={styles.modalRowComment}>{it.comment}</div> : null}
                </div>
                <div className={styles.modalRowActions}>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onRemove(it.id);
                    }}
                  >
                    Удалить
                  </Button>
                </div>
              </button>
            ))
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClear}>
            {clearLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
