import { Toaster as Sonner, toast } from "sonner";

import styles from "./sonner.module.scss";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={"system" as ToasterProps["theme"]}
      className={styles.toaster}
      toastOptions={{
        classNames: {
          toast: styles.toast,
          description: styles.description,
          actionButton: styles.actionButton,
          cancelButton: styles.cancelButton,
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
