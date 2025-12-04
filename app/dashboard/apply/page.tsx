"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, MapPin, ArrowLeft, Pencil, Trash2, Clock, LogOut, User } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock drafts data
const mockDrafts = [
  {
    id: "draft-001",
    type: "Rent Loan",
    lastUpdated: "2024-01-25",
    step: 2,
    totalSteps: 5,
    amount: 1200000,
  },
  {
    id: "draft-002",
    type: "Land Loan",
    lastUpdated: "2024-01-20",
    step: 3,
    totalSteps: 5,
    amount: 2500000,
  },
]

export default function DashboardApplyPage() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [drafts, setDrafts] = useState(mockDrafts)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [draftToDelete, setDraftToDelete] = useState<string | null>(null)

  useEffect(() => {
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

  const handleDeleteDraft = (id: string) => {
    setDraftToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (draftToDelete) {
      setDrafts(drafts.filter((d) => d.id !== draftToDelete))
    }
    setDeleteDialogOpen(false)
    setDraftToDelete(null)
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
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Apply for Loan</h1>
          <p className="text-muted-foreground mt-1">Start a new application or continue from a saved draft</p>
        </div>

        {/* New Application Section */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">Start New Application</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {/* Rent Loan Card */}
            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Home className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Rent Loan</CardTitle>
                <CardDescription>
                  Get financing for your annual rent payment. We pay your landlord directly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Up to ₦5,000,000</li>
                  <li>• 12 months repayment</li>
                  <li>• Competitive rates</li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/dashboard/apply/rent">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Land Loan Card */}
            <Card className="hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-7 w-7 text-primary" />
                </div>
                <CardTitle>Land Loan</CardTitle>
                <CardDescription>Finance your land purchase with flexible payment options.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Up to ₦10,000,000</li>
                  <li>• Up to 24 months repayment</li>
                  <li>• Verified developers</li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/dashboard/apply/land">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Saved Drafts Section */}
        {drafts.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Saved Drafts</h2>
            <div className="space-y-4 max-w-4xl">
              {drafts.map((draft) => (
                <Card key={draft.id} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center shrink-0">
                          {draft.type === "Rent Loan" ? (
                            <Home className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{draft.type}</h3>
                            <Badge variant="outline" className="text-xs">
                              Draft
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ₦{draft.amount.toLocaleString()} • Step {draft.step} of {draft.totalSteps}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3" />
                            Last updated: {new Date(draft.lastUpdated).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:shrink-0">
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            href={`/dashboard/apply/${draft.type === "Rent Loan" ? "rent" : "land"}?draft=${draft.id}`}
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Continue
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteDraft(draft.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(draft.step / draft.totalSteps) * 100}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Draft?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your saved draft and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
