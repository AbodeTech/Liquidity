import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { type LucideIcon } from 'lucide-react'
import Link from "next/link"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <Card className="border-border border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>
        {actionLabel && actionHref && (
          <Link href={actionHref}>
            <Button>{actionLabel}</Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}
