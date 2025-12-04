"use client"

import { Card, CardContent } from "@/components/ui/card"
import { type LucideIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"

interface StatCardProps {
  icon: LucideIcon
  value: string
  label: string
  subtext: string
  variant?: "default" | "warning"
  href?: string
}

export function StatCard({ icon: Icon, value, label, subtext, variant = "default", href }: StatCardProps) {
  const router = useRouter()
  const isClickable = !!href

  const handleClick = () => {
    if (href) {
      router.push(href)
    }
  }

  return (
    <Card
      className={cn(
        "border-border",
        isClickable && "cursor-pointer hover:border-primary transition-colors",
        variant === "warning" && "border-amber-500/50"
      )}
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className={cn(
              "text-3xl font-bold mb-1",
              variant === "warning" ? "text-amber-600" : "text-foreground"
            )}>
              {value}
            </p>
            <p className="text-xs text-muted-foreground">{subtext}</p>
          </div>
          <div className={cn(
            "p-3 rounded-lg",
            variant === "warning" ? "bg-amber-500/10" : "bg-primary/10"
          )}>
            <Icon className={cn(
              "h-6 w-6",
              variant === "warning" ? "text-amber-600" : "text-primary"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
