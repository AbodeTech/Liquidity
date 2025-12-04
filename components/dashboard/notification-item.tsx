"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { FileText, CreditCard, Shield, BellIcon, Check, type LucideIcon } from 'lucide-react'

type NotificationType = "application" | "payment" | "document" | "system"

type Notification = {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
  actionLabel?: string
  actionHref?: string
}

const notificationIcons: Record<NotificationType, LucideIcon> = {
  application: FileText,
  payment: CreditCard,
  document: Shield,
  system: BellIcon,
}

const notificationColors: Record<NotificationType, string> = {
  application: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  payment: "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400",
  document: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  system: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
}

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
}

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const Icon = notificationIcons[notification.type]

  return (
    <Card
      className={cn(
        "p-4 transition-colors",
        !notification.read && "bg-accent/50"
      )}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div className={cn("shrink-0 h-10 w-10 rounded-full flex items-center justify-center", notificationColors[notification.type])}>
          <Icon className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className={cn("font-semibold", !notification.read && "text-foreground")}>
              {notification.title}
            </h3>
            {!notification.read && (
              <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${notification.read ? "bg-transparent" : "bg-primary"}`} />
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-2">
            {notification.message}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs text-muted-foreground">
              {notification.timestamp}
            </span>

            {notification.actionLabel && notification.actionHref && (
              <Button asChild variant="link" size="sm" className="h-auto p-0">
                <Link href={notification.actionHref}>
                  {notification.actionLabel}
                </Link>
              </Button>
            )}

            {!notification.read && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMarkAsRead(notification.id)}
                className="h-auto p-0 text-xs"
              >
                <Check className="h-3 w-3 mr-1" />
                Mark as read
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
