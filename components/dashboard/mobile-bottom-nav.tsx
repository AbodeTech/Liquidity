'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { LayoutDashboard, FileText, PlusCircle, MoreHorizontal, CreditCard, FolderOpen, Bell, Settings } from 'lucide-react'

const mainNavItems = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Applications',
    href: '/dashboard/applications',
    icon: FileText,
  },
  {
    title: 'Apply',
    href: '/dashboard/apply',
    icon: PlusCircle,
  },
]

const moreNavItems = [
  {
    title: 'Payments',
    href: '/dashboard/payments',
    icon: CreditCard,
  },
  {
    title: 'Documents',
    href: '/dashboard/documents',
    icon: FolderOpen,
  },
  {
    title: 'Notifications',
    href: '/dashboard/notifications',
    icon: Bell,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border">
      <div className="flex items-center justify-around px-2 py-3">
        {/* Main 3 nav items */}
        {mainNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors flex-1',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.title}</span>
            </Link>
          )
        })}

        {/* More button with sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 h-auto rounded-lg flex-1',
                'text-muted-foreground hover:text-foreground'
              )}
            >
              <MoreHorizontal className="h-5 w-5" />
              <span className="text-xs font-medium">More</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-auto">
            <SheetHeader>
              <SheetTitle>More Options</SheetTitle>
            </SheetHeader>
            <div className="grid gap-2 py-6">
              {moreNavItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                )
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
