import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-body-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-text-primary text-page-bg hover:bg-text-primary/90 active:bg-text-primary/80",
        secondary:
          "bg-card-elevated text-text-primary border border-divider hover:bg-card-bg hover:border-text-muted/30 active:bg-section-bg",
        outline:
          "border border-divider bg-transparent text-text-secondary hover:text-text-primary hover:border-text-muted/50 active:bg-card-bg",
        ghost:
          "text-text-secondary hover:text-text-primary hover:bg-card-bg active:bg-card-elevated",
        link:
          "text-text-secondary hover:text-text-primary underline-offset-4 hover:underline",
        destructive:
          "bg-accent-red text-text-primary hover:bg-accent-red/90 active:bg-accent-red/80",
      },
      size: {
        default: "h-11 px-6 rounded",
        sm: "h-9 px-4 rounded-sm text-caption",
        lg: "h-12 px-8 rounded text-body",
        icon: "h-10 w-10 rounded",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
