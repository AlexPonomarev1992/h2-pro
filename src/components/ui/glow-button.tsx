import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const glowButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-gradient-button text-primary-foreground shadow-glow-primary hover:shadow-neon hover:scale-105",
        secondary: "bg-gradient-secondary text-secondary-foreground shadow-glow-secondary hover:shadow-neon hover:scale-105",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary/10 hover:shadow-glow-primary",
        ghost: "text-primary hover:bg-primary/10 hover:text-primary hover:shadow-glow-soft",
        hero: "bg-gradient-button text-primary-foreground shadow-neon text-lg font-bold px-8 py-4 hover:scale-110 hover:shadow-neon pulse-glow"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glowButtonVariants> {
  asChild?: boolean
}

const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(glowButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
GlowButton.displayName = "GlowButton"

export { GlowButton, glowButtonVariants }