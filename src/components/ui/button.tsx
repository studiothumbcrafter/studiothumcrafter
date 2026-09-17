import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 border-2 font-display text-xl uppercase transition-[transform,background-color,color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
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
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />;
}

export { Button, buttonVariants };