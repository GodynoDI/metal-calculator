import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/shared/lib/cn";
import styles from "./button.module.scss";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

type ButtonVariantsOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const variantClassMap: Record<ButtonVariant, string> = {
  default: styles.variantDefault,
  destructive: styles.variantDestructive,
  outline: styles.variantOutline,
  secondary: styles.variantSecondary,
  ghost: styles.variantGhost,
  link: styles.variantLink,
};

const sizeClassMap: Record<ButtonSize, string> = {
  default: styles.sizeDefault,
  sm: styles.sizeSm,
  lg: styles.sizeLg,
  icon: styles.sizeIcon,
};

const buttonVariants = ({ variant = "default", size = "default", className }: ButtonVariantsOptions = {}) => {
  return cn(styles.root, variantClassMap[variant], sizeClassMap[size], className);
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantsOptions {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={buttonVariants({ variant, size, className })} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
