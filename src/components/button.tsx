import React from "react";
import { twMerge } from "tailwind-merge";
import { BUTTON_VARIANTS } from "../lib/constants";
import { VariantProps } from "class-variance-authority";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof BUTTON_VARIANTS> {
  variant: "default" | "action" | "clear" | "sum";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <button
        className={twMerge(BUTTON_VARIANTS({ variant, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
