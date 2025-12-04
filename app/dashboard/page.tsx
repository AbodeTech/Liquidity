"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, PlusCircle, LogOut, User } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    const name = localStorage.getItem("userName") || "User"
    setUserName(name)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-foreground">
            Liquidity
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{userName}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {userName.split(" ")[0]}!</h1>
          <p className="text-muted-foreground mt-1">What would you like to do today?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {/* Apply for Loan Card */}
          <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
            <Link href="/dashboard/apply">
              <CardHeader>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <PlusCircle className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Apply for Loan</CardTitle>
                <CardDescription>
                  Start a new loan application, continue saved drafts, or manage your applications in progress.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Start Application</Button>
              </CardContent>
            </Link>
          </Card>

          {/* View Applications Card */}
          <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
            <Link href="/dashboard/applications">
              <CardHeader>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>
                  View the status of your submitted applications, track approvals, and manage your loans.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  View Applications
                </Button>
              </CardContent>
            </Link>
          </Card>
        </div>
      </main>
    </div>
  )
}
