"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Download, FileText, User, Briefcase, Home, Eye, Loader2 } from "lucide-react"
import { useState, use } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { adminApplicationService } from "@/lib/services/admin/applicationService"
import { Application, ApplicationStatus } from "@/lib/types/admin/application"
import { format } from "date-fns"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [status, setStatus] = useState<ApplicationStatus | "">("")
  const [viewingDocument, setViewingDocument] = useState<{ url: string; type: string; name: string } | null>(null)
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["application", id],
    queryFn: () => adminApplicationService.getApplication(id),
  })

  const application: Application | undefined = data?.data

  const updateStatusMutation = useMutation({
    mutationFn: (newStatus: "under_review") =>
      adminApplicationService.updateApplicationStatus(id, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application", id] })
      toast.success("Application status updated successfully")
    },
    onError: () => {
      toast.error("Failed to update status")
    }
  })

  const approveMutation = useMutation({
    mutationFn: () => adminApplicationService.approveApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application", id] })
      toast.success("Application approved successfully")
    },
    onError: () => {
      toast.error("Failed to approve application")
    }
  })

  const rejectMutation = useMutation({
    mutationFn: () => adminApplicationService.rejectApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application", id] })
      toast.success("Application rejected successfully")
    },
    onError: () => {
      toast.error("Failed to reject application")
    }
  })

  const handleStatusUpdate = () => {
    if (status === "under_review") {
      updateStatusMutation.mutate("under_review")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved": return "bg-emerald-500/10 text-emerald-700"
      case "rejected": return "bg-red-500/10 text-red-700"
      case "under_review": return "bg-amber-500/10 text-amber-700"
      case "submitted": return "bg-blue-500/10 text-blue-700"
      default: return "bg-slate-500/10 text-slate-700"
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    )
  }

  if (error || !application) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <p className="text-destructive font-medium">Error loading application details</p>
          <Link href="/admin/applications">
            <Button variant="outline">Go Back</Button>
          </Link>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/applications">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Application Details</h1>
              <p className="text-sm text-muted-foreground">
                Submitted on {application.submittedAt ? format(new Date(application.submittedAt), 'MMM dd, yyyy') : 'N/A'}
              </p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={`text-base px-4 py-2 capitalize ${getStatusColor(application.status)}`}
          >
            {application.status?.replace("_", " ")}
          </Badge>
        </div>

        {/* Actions Card */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Application Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-4">
              {/* Status Update Dropdown */}
              <div className="flex items-center gap-2">
                <Select
                  value={status}
                  onValueChange={(val) => setStatus(val as ApplicationStatus)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under_review">Under Review</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleStatusUpdate}
                  disabled={!status || updateStatusMutation.isPending}
                >
                  {updateStatusMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update
                </Button>
              </div>

              <div className="h-8 w-px bg-border mx-2 hidden md:block" />

              {/* Approve/Reject Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => approveMutation.mutate()}
                  disabled={approveMutation.isPending || application.status === "approved"}
                >
                  {approveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Approve Application
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => rejectMutation.mutate()}
                  disabled={rejectMutation.isPending || application.status === "rejected"}
                >
                  {rejectMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Reject Application
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Information Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">{application.personalInfo?.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{application.personalInfo?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{application.personalInfo?.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                <p className="font-medium">{application.personalInfo?.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gender</p>
                <p className="font-medium capitalize">{application.personalInfo?.gender}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Marital Status</p>
                <p className="font-medium capitalize">{application.personalInfo?.maritalStatus}</p>
              </div>
            </CardContent>
          </Card>

          {/* Employment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Briefcase className="h-5 w-5" />
                Employment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Employment Status</p>
                <p className="font-medium capitalize">{application.employment?.employmentStatus}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Employer</p>
                <p className="font-medium">{application.employment?.employer}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Job Title</p>
                <p className="font-medium">{application.employment?.jobTitle}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Income</p>
                <p className="font-medium">
                  {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(application.employment?.monthlyIncome || 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Years Employed</p>
                <p className="font-medium">{application.employment?.yearsEmployed} years</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Office Address</p>
                <p className="font-medium">{application.employment?.officeAddress}</p>
              </div>
            </CardContent>
          </Card>

          {/* Loan Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" />
                Loan Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Loan Purpose</p>
                <p className="font-medium capitalize">{application.loanDetails?.loanPurpose}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amount Requested</p>
                <p className="font-medium text-lg">
                  {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(application.loanDetails?.loanAmount || 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Repayment Period</p>
                <p className="font-medium">{application.loanDetails?.repaymentPeriod} months</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Rent</p>
                <p className="font-medium">
                  {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(application.loanDetails?.monthlyRent || 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Preferred Repayment Date</p>
                <p className="font-medium">Day {application.loanDetails?.preferredRepaymentDate} of the month</p>
              </div>
            </CardContent>
          </Card>

          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Home className="h-5 w-5" />
                Property Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Property Address</p>
                <p className="font-medium">{application.loanDetails?.propertyAddress}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Landlord Name</p>
                <p className="font-medium">{application.loanDetails?.landlordName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Landlord Phone</p>
                <p className="font-medium">{application.loanDetails?.landlordPhone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Documents */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" />
                Uploaded Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {application.documents?.map((doc, index) => (
                  <div key={index} className="flex flex-col p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-medium text-sm truncate pr-2" title={doc.documentType}>
                        {doc.documentType.replace(/_/g, " ").toUpperCase()}
                      </span>
                      <Badge variant="outline" className="text-[10px]">
                        {doc.documentUrl.split('.').pop()?.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">
                      Uploaded on {doc.uploadedAt ? format(new Date(doc.uploadedAt), 'MMM dd, yyyy') : 'N/A'}
                    </p>
                    <div className="flex gap-2 mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setViewingDocument({
                          url: doc.documentUrl,
                          type: doc.documentType,
                          name: doc.documentType
                        })}
                      >
                        <Eye className="h-3 w-3 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="px-2"
                        asChild
                      >
                        <a href={doc.documentUrl} target="_blank" rel="noopener noreferrer" download>
                          <Download className="h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
                {(!application.documents || application.documents.length === 0) && (
                  <p className="text-muted-foreground text-sm col-span-full text-center py-8">
                    No documents uploaded.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document Viewer Modal */}
        <Dialog open={!!viewingDocument} onOpenChange={(open) => !open && setViewingDocument(null)}>
          <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="capitalize">
                {viewingDocument?.name.replace(/_/g, " ")}
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 w-full h-full min-h-0 bg-muted/20 rounded-md overflow-hidden relative">
              {viewingDocument && (
                <iframe
                  src={viewingDocument.url}
                  className="w-full h-full"
                  title="Document Viewer"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
