import type { ProductInfo, ProductType } from "@/entities/product";
import styles from "./ProductSelector.module.scss";

interface Props {
  products: ProductInfo[];
  selectedProduct: ProductType;
  onSelect: (id: ProductType) => void;
}

export function ProductSelector({ products, selectedProduct, onSelect }: Props) {
  return (
    <>
      <label className={styles.label}>Сортамент</label>
      <nav className={styles.products} aria-label="Выбор типа изделия">
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className={[styles.button, selectedProduct === p.id ? styles.buttonActive : ""].join(" ")}
            aria-pressed={selectedProduct === p.id}
            aria-label={p.name}
            type="button"
          >
            <span className={styles.buttonIcon}>{p.icon}</span>
            <span className={styles.buttonName}>{p.name}</span>
          </button>
        ))}
      </nav>
      <div className={styles.productMobileLabel} aria-hidden="true">
        {products.find((p) => p.id === selectedProduct)?.name}
      </div>
    </>
  );
}

