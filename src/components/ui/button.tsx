import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 border-2 font-display text-xl uppercase transition-[transform,background-color,color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90",
        primary:
          "border-ink bg-ink px-7 py-3 text-paper hover:border-signal hover:bg-signal hover:text-ink",
        outline:
          "border-ink bg-transparent px-7 py-3 text-ink hover:bg-ink hover:text-paper",
        signal:
          "border-signal bg-signal px-7 py-3 text-ink hover:border-paper hover:bg-paper",
        filter:
          "min-h-9 border-transparent px-3 py-1 font-mono text-xs text-ink hover:border-ink",
        icon:
          "size-11 border-ink bg-transparent p-0 text-ink hover:bg-ink hover:text-paper",
        ghost: "border-transparent px-4 py-2 text-foreground hover:bg-accent",
        destructive:
          "border-destructive bg-destructive px-4 py-2 text-destructive-foreground hover:opacity-90",
        secondary:
          "border-secondary bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/80",
        link: "min-h-0 border-transparent p-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-8",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps };