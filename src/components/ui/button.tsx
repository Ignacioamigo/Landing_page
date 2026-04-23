"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 select-none whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "text-white bg-gradient-to-r from-accent to-accent-2 shadow-[0_8px_30px_-6px_rgba(59,130,246,0.55)] hover:shadow-[0_14px_40px_-10px_rgba(139,92,246,0.7)] hover:-translate-y-[1px] active:translate-y-0",
        secondary:
          "text-foreground bg-surface border border-border hover:border-accent/60 hover:bg-surface-2",
        ghost:
          "text-muted hover:text-foreground hover:bg-surface-2",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-[15px]",
        lg: "h-14 px-7 text-base",
        xl: "h-16 px-8 text-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
