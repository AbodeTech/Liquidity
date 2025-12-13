"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { FileText, PlusCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useUserProfile } from "@/lib/store/userProfile"
import { auth } from "@/lib/auth"

export default function DashboardPage() {
  const router = useRouter()
  // const [userName, setUserName] = useState("") // Removed local state
  const { user } = useUserProfile()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = auth.getToken()
    if (!token) {
      router.push("/login")
      return
    }
    setLoading(false)
  }, [router])




  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const userName = user?.fullName || "User"

  return (
    <div className="min-h-screen ">
      {/* Main Content */}
      <main className="container mx-auto pb-8">
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
              <CardContent className="pt-4">
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
              <CardContent className="pt-4">
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
