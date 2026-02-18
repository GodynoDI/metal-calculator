import { useEffect, useState } from "react";
import { useCalculator } from "@/features/calculator/model/useCalculator";
import { InputModeToggle } from "@/features/calculator/ui/InputModeToggle";
import { ProductSelector } from "@/features/calculator/ui/ProductSelector";
import { ResultCard } from "@/features/calculator/ui/ResultCard";
import { Button } from "@/shared/ui/button";
import { LabeledNumberInput } from "@/shared/ui/labeledNumberInput";
import { LabeledSelect } from "@/shared/ui/labeledSelect";
import { SnapshotsModal } from "@/shared/ui/snapshotsModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { ProductDiagram } from "./ProductDiagram";
import styles from "./MetalCalculator.module.scss";

export function MetalCalculator() {
  const c = useCalculator();

  const [productChosen, setProductChosen] = useState(false);

  const [historyOpen, setHistoryOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [saveComment, setSaveComment] = useState("");

  useEffect(() => {
    if (!saveOpen) return;
    setSaveName((prev) => (prev ? prev : c.defaultSaveName()));
    setSaveComment((prev) => prev);
  }, [c, saveOpen]);

  const gramsHint =
    c.hasResult && c.weight > 0 && c.weight < 1000 ? `${(c.weight * 1000).toFixed(1)} г` : null;

  return (
    <div className={styles.calculator}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.headerIcon}>
            <span className={styles.headerIconText}>⚙</span>
          </div>
          <div>
            <h1 className={styles.headerTitle}>Калькулятор металлопроката</h1>
            <p className={styles.headerSubtitle}>Расчёт веса металлических изделий</p>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.card}>
          <section className={styles.cardSection}>
            <ProductSelector
              products={c.products}
              selectedProduct={c.selectedProduct}
              onSelect={(id) => {
                setProductChosen(true);
                c.handleProductChange(id);
              }}
            />
          </section>

          {!productChosen ? null : (
            <div className={styles.form}>
              <section className={styles.inputs}>
                {c.mode === "both" && (
                  <InputModeToggle value={c.inputMethod} onChange={c.setInputMethod} />
                )}

                {c.showDimensionsInput && (
                  <div className={styles.dimensionsGrid}>
                    {c.dimensionFields.map((f) => (
                      <LabeledNumberInput
                        key={f.key}
                        inputId={`dim-${f.key}`}
                        label={f.label}
                        value={c.dims[f.key] || ""}
                        onChange={(e) => c.handleDimChange(f.key, e.target.value)}
                        placeholder="0"
                        min={0}
                        step="any"
                        aria-label={f.label}
                        unit={f.unit}
                      />
                    ))}
                  </div>
                )}

                {c.showReferenceInput && c.product.id === "i_beam" && (
                  <>
                    <div className={styles.pairedFieldsRow}>
                      <LabeledSelect
                        label="Тип балки"
                        inputId="ibeam-type-select"
                        ariaLabel="Тип балки"
                        value={c.selectedIBeamType}
                        onChange={(typeId) => {
                          c.setSelectedIBeamType(typeId as any);
                          c.setSelectedBeamNumber("");
                          const d = c.iBeamTypeData.find((x) => x.type.id === typeId);
                          if (d?.numbers?.[0]) c.setSelectedBeamNumber(d.numbers[0].id);
                        }}
                        placeholder="Выберите тип"
                        items={c.iBeamTypeData.map((d) => ({
                          value: d.type.id,
                          label: `${d.type.name} ${d.type.shortName ? `(${d.type.shortName})` : ""} — ${d.type.gost}`,
                        }))}
                      />

                      <LabeledSelect
                        label="Номер балки"
                        inputId="ibeam-number-select"
                        ariaLabel="Номер балки"
                        value={c.selectedBeamNumber}
                        onChange={c.setSelectedBeamNumber}
                        placeholder="Выберите номер"
                        disabled={!c.selectedIBeamType}
                        items={(c.iBeamTypeData.find((d) => d.type.id === c.selectedIBeamType)?.numbers ?? []).map(
                          (n) => ({
                            value: n.id,
                            label: `${n.number} (вес: ${n.weightPerMeter} кг/м)`,
                          }),
                        )}
                      />
                    </div>
                  </>
                )}

                {c.showReferenceInput && c.product.id === "channel" && (
                  <>
                    <div className={styles.pairedFieldsRow}>
                      <LabeledSelect
                        label="Тип швеллера"
                        inputId="channel-type-select"
                        ariaLabel="Тип швеллера"
                        value={c.selectedChannelType}
                        onChange={(typeId) => {
                          c.setSelectedChannelType(typeId as any);
                          c.setSelectedBeamNumber("");
                          const d = c.channelTypeData.find((x) => x.type.id === typeId);
                          if (d?.numbers?.[0]) c.setSelectedBeamNumber(d.numbers[0].id);
                        }}
                        placeholder="Выберите тип"
                        items={c.channelTypeData.map((d) => ({
                          value: d.type.id,
                          label: `${d.type.name} ${d.type.shortName ? `(${d.type.shortName})` : ""} — ${d.type.gost}`,
                        }))}
                      />

                      <LabeledSelect
                        label="Номер швеллера"
                        inputId="channel-number-select"
                        ariaLabel="Номер швеллера"
                        value={c.selectedBeamNumber}
                        onChange={c.setSelectedBeamNumber}
                        placeholder="Выберите номер"
                        disabled={!c.selectedChannelType}
                        items={(c.channelTypeData.find((d) => d.type.id === c.selectedChannelType)?.numbers ?? []).map(
                          (n) => ({
                            value: n.id,
                            label: `${n.number} (вес: ${n.weightPerMeter} кг/м)`,
                          }),
                        )}
                      />
                    </div>
                  </>
                )}

                {c.showReferenceInput && c.product.id !== "i_beam" && c.product.id !== "channel" && (
                  <>
                    <div className={styles.pairedFieldsRow}>
                      <LabeledSelect
                        label="Справочник"
                        inputId="reference-select"
                        ariaLabel="Выбор справочника"
                        value={c.selectedReferenceId}
                        onChange={c.handleReferenceChange}
                        placeholder="Выберите справочник"
                        items={c.productReferences.map((ref) => ({ value: ref.id, label: ref.name }))}
                      />

                      <LabeledSelect
                        label="Размер"
                        inputId="size-select"
                        ariaLabel="Выбор размера из справочника"
                        value={c.selectedSizeId}
                        onChange={c.handleSizeChange}
                        placeholder="Выберите размер"
                        disabled={!c.selectedReferenceId}
                        items={c.availableSizes.map((s) => ({ value: s.id, label: s.label }))}
                      />
                    </div>
                  </>
                )}
              </section>

              <section className={styles.diagram}>
                <div className={styles.diagramContainer}>
                  <ProductDiagram product={c.selectedProduct} dims={c.dims} />
                </div>
              </section>

              <section className={styles.inputs}>
                <div className={styles.pairedFieldsRow}>
                  <LabeledSelect
                    label="Металл"
                    inputId="metal-kind-select"
                    ariaLabel="Выбор металла"
                    value={c.selectedMetalKind}
                    onChange={c.setSelectedMetalKind}
                    items={c.metalKinds.map((m) => ({
                      value: m.id,
                      label: m.name,
                    }))}
                  />

                  <LabeledSelect
                    label="Марка"
                    inputId="metal-grade-select"
                    ariaLabel="Выбор марки металла"
                    value={c.selectedMetalGrade}
                    onChange={c.setSelectedMetalGrade}
                    disabled={c.availableMetalGrades.length === 0}
                    placeholder={c.availableMetalGrades.length === 0 ? "Нет марок" : "Выберите марку"}
                    items={c.availableMetalGrades.map((g) => ({
                      value: g.id,
                      label: g.name,
                    }))}
                  />
                </div>

                <div className={styles.inlineInputs}>
                  <LabeledNumberInput
                    inputId="dim-L"
                    label="Длина (L)"
                    value={c.dims.L || ""}
                    onChange={(e) => c.handleDimChange("L", e.target.value)}
                    placeholder="0"
                    min={0}
                    step="any"
                    aria-label="Длина"
                    unit="м"
                  />

                  <LabeledNumberInput
                    inputId="quantity"
                    label="Количество"
                    value={c.quantity}
                    onChange={(e) => c.setQuantity(e.target.value)}
                    placeholder="1"
                    min={1}
                    aria-label="Количество изделий"
                    unit="шт."
                  />
                </div>

                <div className={styles.actionsPrimary}>
                  <Button type="button" onClick={c.calculate} className={styles.actionsCalculate}>
                    Рассчитать
                  </Button>
                  <Button type="button" variant="outline" onClick={c.reset}>
                    Новый расчет
                  </Button>

                  <SnapshotsModal
                    open={historyOpen}
                    onOpenChange={setHistoryOpen}
                    triggerLabel="История расчетов"
                    title="История расчетов"
                    description="Автоматически сохраняется после каждого расчёта."
                    items={c.history.map((h) => ({
                      id: h.id,
                      title: new Date(h.createdAt).toLocaleString(),
                      meta: c.snapshotLabel(h),
                    }))}
                    emptyText="История пуста"
                    onSelect={(id) => {
                      const item = c.history.find((x) => x.id === id);
                      if (item) c.restoreSnapshot(item);
                    }}
                    onRemove={c.removeFromHistory}
                    onClear={c.clearHistory}
                    clearLabel="Очистить историю"
                  />

                  <SnapshotsModal
                    open={savedOpen}
                    onOpenChange={setSavedOpen}
                    triggerLabel="Мои расчеты"
                    title="Мои расчеты"
                    description="Сохранённые вручную расчёты (localStorage)."
                    items={c.saved.map((s) => ({
                      id: s.id,
                      title: s.name,
                      meta: c.snapshotLabel(s),
                      comment: s.comment,
                    }))}
                    emptyText="Сохранённых расчётов нет"
                    onSelect={(id) => {
                      const item = c.saved.find((x) => x.id === id);
                      if (item) c.restoreSnapshot(item);
                    }}
                    onRemove={c.removeFromSaved}
                    onClear={c.clearSaved}
                    clearLabel="Очистить мои расчеты"
                  />
                </div>

                {c.hasResult ? (
                  <ResultCard displayValue={c.displayValue} unit={c.weightUnit} gramsHint={gramsHint} />
                ) : null}

                <div className={styles.actionsBottom}>
                  <Button type="button" variant="secondary" onClick={() => setSaveOpen(true)} disabled={!c.hasResult}>
                    Сохранить расчет
                  </Button>
                  <Button type="button" variant="outline" onClick={() => window.print()}>
                    Печать
                  </Button>
                  <Button type="button" variant="outline" onClick={() => window.print()}>
                    PDF
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const subject = encodeURIComponent("Metal Calculator: ошибка в расчёте");
                      const body = encodeURIComponent(
                        `Опишите проблему.\n\nТекущее состояние:\nproduct=${c.selectedProduct}\nmetalKind=${c.selectedMetalKind}\nmetalGrade=${c.selectedMetalGrade}\nquantity=${c.quantity}\ndims=${JSON.stringify(c.dims)}\nresult=${c.hasResult ? c.weight : "(нет)"}`,
                      );
                      window.location.href = `mailto:support@metal-calculator.local?subject=${subject}&body=${body}`;
                    }}
                  >
                    Сообщить об ошибке
                  </Button>
                </div>

                <Dialog open={saveOpen} onOpenChange={setSaveOpen}>
                  <DialogContent className={styles.modalContent}>
                    <DialogHeader>
                      <DialogTitle>Сохранить расчет</DialogTitle>
                      <DialogDescription>Укажи название и (опционально) комментарий.</DialogDescription>
                    </DialogHeader>

                    <div className={styles.saveForm}>
                      <label className={styles.saveLabel} htmlFor="save-name">
                        Название
                      </label>
                      <input
                        id="save-name"
                        className={styles.saveInput}
                        value={saveName}
                        onChange={(e) => setSaveName(e.target.value)}
                        placeholder={c.defaultSaveName()}
                      />

                      <label className={styles.saveLabel} htmlFor="save-comment">
                        Комментарий (необязательно)
                      </label>
                      <textarea
                        id="save-comment"
                        className={styles.saveTextarea}
                        value={saveComment}
                        onChange={(e) => setSaveComment(e.target.value)}
                        placeholder=""
                        rows={4}
                      />
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setSaveOpen(false)}>
                        Отмена
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          c.saveWithMeta(saveName, saveComment);
                          setSaveOpen(false);
                        }}
                      >
                        Сохранить
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </section>
            </div>
          )}
        </section>

        <p className={styles.infoText}>
          Плотность {c.metal.name.toLowerCase()}: {c.metal.density} г/см³
        </p>
      </main>
    </div>
  );
}

