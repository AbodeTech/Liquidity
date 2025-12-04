"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

interface QuickActionCardProps {
  icon: string
  title: string
  description: string
  href: string
}

export function QuickActionCard({ icon, title, description, href }: QuickActionCardProps) {
  const router = useRouter()

  return (
    <Card
      className="cursor-pointer hover:border-primary transition-colors border-border"
      onClick={() => router.push(href)}
    >
      <CardContent className="p-6 text-center">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="font-semibold mb-1 text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
