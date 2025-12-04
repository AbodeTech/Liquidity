'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Bell, LogOut, User, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function DashboardTopBar() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-30 bg-background border-b border-border">
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👋</span>
          <h1 className="text-lg font-semibold text-foreground hidden sm:block">
            Welcome back
          </h1>
        </div>

        {/* Right side - Notifications and user menu */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="px-3 py-2 border-b">
                <p className="font-semibold">Notifications</p>
              </div>
              <div className="py-2">
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <p className="text-sm font-medium">Application Approved</p>
                  <p className="text-xs text-muted-foreground">Your rent loan application has been approved</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <p className="text-sm font-medium">Payment Reminder</p>
                  <p className="text-xs text-muted-foreground">Your next payment is due in 5 days</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <p className="text-sm font-medium">Document Required</p>
                  <p className="text-xs text-muted-foreground">Please upload your bank statement</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </DropdownMenuItem>
              </div>
              <div className="px-3 py-2 border-t">
                <Button variant="link" className="w-full p-0 h-auto text-sm">
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 px-2 py-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button className="w-full cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button className="w-full cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button className="w-full cursor-pointer text-destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
