'use client'

import { useEffect } from "react"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from 'lucide-react'
import Link from "next/link"

export default function SignupPage() {
  const router = useRouter()

  useEffect(() => {
    // Auto-redirect to home page after 3 seconds
    const timer = setTimeout(() => {
      router.push("/")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-500" />
          </div>
          <CardTitle>Page No Longer Available</CardTitle>
          <CardDescription>
            Sign up is no longer required. You can apply for loans directly without creating an account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            You will be redirected to the home page in a few seconds...
          </p>
          <div className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <Link href="/apply">Apply for a Loan</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Go to Home Page</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
