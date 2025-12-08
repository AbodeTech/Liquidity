"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LayoutDashboard, FileText, PlusCircle, CreditCard, FolderOpen, Bell, Settings } from "lucide-react"
import { useUserProfile } from "@/lib/store/userProfile"

const allNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Applications",
    href: "/dashboard/applications",
    icon: FileText,
  },
  {
    title: "Apply for Loan",
    href: "/dashboard/apply",
    icon: PlusCircle,
  },
  // {
  //   title: "Payments",
  //   href: "/dashboard/payments",
  //   icon: CreditCard,
  // },
  // {
  //   title: "Documents",
  //   href: "/dashboard/documents",
  //   icon: FolderOpen,
  // },
  // {
  //   title: "Notifications",
  //   href: "/dashboard/notifications",
  //   icon: Bell,
  // },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user } = useUserProfile()

  const getInitials = (name: string) => {
    if (!name) return "JD"
    const parts = name.split(" ")
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }

  const userInitials = getInitials(user?.fullName || "")

  return (
    <aside className="hidden lg:flex fixed top-0 left-0 z-50 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col h-full w-full">
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
          <Link href="/" className="text-2xl font-bold text-sidebar-foreground">
            Liquidity
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {allNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            )
          })}
        </nav>

        {/* User info at bottom */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              {/* <AvatarImage src="/placeholder.svg" alt="User" /> */}
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.fullName || "Guest User"}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{user?.email || ""}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
