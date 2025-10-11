import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary-hover))] transition-smooth",
        destructive:
          "bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] hover:bg-[hsl(var(--destructive)/0.9)] transition-smooth",
        outline:
          "border border-[hsl(var(--input))] bg-[hsl(var(--background))] hover:bg-[hsl(var(--primary)/0.1)] hover:text-[hsl(var(--primary))] transition-smooth",
        secondary:
          "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary-hover))] transition-smooth",
        ghost:
          "hover:bg-[hsl(var(--primary)/0.1)] hover:text-[hsl(var(--primary))] transition-smooth",
        link:
          "text-[hsl(var(--primary))] underline-offset-4 hover:underline transition-smooth",

        // ⚽ Fantasy Sports Variants (Dream11 Red Theme)
        fantasy:
          "bg-gradient-to-br from-[hsl(var(--fantasy-gold))] to-[hsl(var(--fantasy-blue))] text-white hover:scale-105 shadow-player transition-bounce border-0",
        cricket:
          "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary-hover))] shadow-card transition-smooth font-semibold",
        gold:
          "bg-[hsl(var(--fantasy-gold))] text-white hover:bg-[hsl(var(--fantasy-blue))] shadow-card transition-smooth font-semibold",
        team:
          "bg-[hsl(var(--team-primary))] text-white hover:scale-105 shadow-player transition-bounce",

        // ✅ Selected now uses red tones instead of yellow
        selected:
          "bg-[hsl(var(--fantasy-gold))] text-white shadow-selected ring-2 ring-[hsl(var(--fantasy-blue))] transition-smooth",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
