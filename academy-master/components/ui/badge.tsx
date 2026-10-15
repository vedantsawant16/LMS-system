import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:   "bg-gold/15 text-gold border-gold/25",
        secondary: "bg-surface-4 text-warm-400 border-white/[0.06]",
        destructive: "bg-danger-muted text-danger border-danger/20",
        outline:   "border-white/10 text-warm-400",
        success:   "bg-success-muted text-success border-success/20",
        warning:   "bg-gold/10 text-gold-light border-gold/20",
        info:      "bg-info-muted text-info border-info/20",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
