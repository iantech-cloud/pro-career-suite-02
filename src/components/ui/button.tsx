import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-organic text-sm font-medium tracking-wide ring-offset-background transition-organic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:transform",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/92 hover:scale-[1.02] shadow-natural",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/92 hover:scale-[1.01] shadow-natural",
        outline:
          "border border-input bg-background hover:bg-muted hover:text-foreground shadow-sm hover:shadow-natural hover:scale-[1.01]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/85 hover:scale-[1.01] shadow-sm",
        ghost: "hover:bg-muted hover:text-foreground hover:scale-[1.01]",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-hero text-white hover:opacity-92 hover:scale-[1.02] shadow-organic font-semibold",
        professional: "bg-primary text-primary-foreground hover:bg-primary/92 hover:scale-[1.01] shadow-primary",
        success: "bg-success text-success-foreground hover:bg-success/92 hover:scale-[1.01] shadow-natural",
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
