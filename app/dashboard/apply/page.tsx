"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, MapPin, ArrowLeft, Pencil, Trash2, Clock, Loader2 } from "lucide-react"
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { applicationService } from "@/lib/services/user/applicationService"
import { toast } from "sonner"

export default function DashboardApplyPage() {

  // const [userName, setUserName] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [draftToDelete, setDraftToDelete] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const { data: drafts = [], isLoading } = useQuery({
    queryKey: ['drafts'],
    queryFn: async () => {
      const response = await applicationService.getDrafts()
      return response.data || []
    }
  })

  const deleteDraftMutation = useMutation({
    mutationFn: applicationService.deleteDraft,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drafts'] })
      toast.success("Draft deleted successfully")
      setDeleteDialogOpen(false)
      setDraftToDelete(null)
    },
    onError: () => {
      toast.error("Failed to delete draft")
      setDeleteDialogOpen(false)
      setDraftToDelete(null)
    }
  })



  const handleDeleteDraft = (id: string) => {
    setDraftToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    console.log(draftToDelete)
    if (draftToDelete) {
      deleteDraftMutation.mutate(draftToDelete)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Main Content */}
      <main className="container mx-auto ">
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
                  Get financing for your rent payment. We pay your landlord directly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                <Button asChild className="w-full">
                  <Link href="/dashboard/apply/land">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Saved Drafts Section */}
        {/* Saved Drafts Section */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Saved Drafts</h2>
          {isLoading ? (
            <div className="flex justify-center p-8 border rounded-lg border-dashed">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : drafts.length === 0 ? (
            <div className="p-8 text-center border rounded-lg border-dashed text-muted-foreground">
              <p>No draft have been saved</p>
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {drafts.map((draft: any) => (
                <Card key={draft.id} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center shrink-0">
                          {draft.loanPurpose === "rent" || draft.rentLoanDetails ? (
                            <Home className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <MapPin className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{draft.loanPurpose === "rent" ? "Rent Loan" : draft.loanPurpose === "land" ? "Land Loan" : draft.type || "Loan Application"}</h3>
                            <Badge variant="outline" className="text-xs">
                              Draft
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ₦{Number(draft.rentLoanDetails?.desiredLoanAmount || draft.landLoanDetails?.desiredLoanAmount || draft.amount || 0).toLocaleString()} • Step {draft.currentStep || draft.step || 1} of 5
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3" />
                            Last updated: {new Date(draft.lastUpdated || draft.updatedAt || new Date()).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:shrink-0">
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            href={`/dashboard/apply/${(draft.loanPurpose === "rent" || draft.rentLoanDetails) ? "rent" : "land"}?draft=${draft._id}`}
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Continue
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteDraft(draft._id)}
                          disabled={deleteDraftMutation.isPending}
                        >
                          {deleteDraftMutation.isPending && draftToDelete === draft._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${((draft.currentStep || draft.step || 1) / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
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
            <AlertDialogCancel disabled={deleteDraftMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={deleteDraftMutation.isPending}
            >
              {deleteDraftMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

