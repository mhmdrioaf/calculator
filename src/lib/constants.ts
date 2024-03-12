import { cva } from "class-variance-authority";

export const BUTTON_VARIANTS = cva(
  "px-4 py-4 rounded-md text-lg font-bold text-center",
  {
    variants: {
      variant: {
        default: "bg-primary/80 text-primary-foreground hover:bg-primary/100",
        action:
          "bg-secondary/80 text-secondary-foreground hover:bg-secondary/100",
        clear:
          "bg-destructive/80 text-destructive-foreground hover:bg-destructive/100",
        sum: "bg-tertiary/80 text-tertiary-foreground hover:bg-tertiary/100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
