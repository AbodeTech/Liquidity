"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Download, FileText, User, Briefcase, Home, CreditCard } from "lucide-react"
import { useState } from "react"

// Mock data for application details
const applicationData = {
  id: "APP-2024-001",
  date: "2024-01-15",
  status: "pending",
  type: "Rent",
  personal: {
    fullName: "Adebayo Johnson",
    email: "adebayo.j@email.com",
    phone: "+234 803 123 4567",
    dateOfBirth: "1990-05-15",
    bvn: "22123456789",
    address: "123 Lekki Phase 1, Lagos",
  },
  employment: {
    status: "Employed",
    company: "Tech Solutions Ltd",
    monthlyIncome: "₦500,000",
    yearsEmployed: "3",
  },
  loan: {
    amount: "₦2,500,000",
    tenure: "12 months",
    interestRate: "15%",
    monthlyRepayment: "₦232,500",
    totalRepayable: "₦2,790,000",
  },
  property: {
    address: "45 Victoria Island, Lagos",
    landlordName: "Mr. Chukwu Obi",
    landlordPhone: "+234 802 987 6543",
  },
  disbursement: {
    bankName: "GTBank",
    accountNumber: "0123456789",
    accountName: "Adebayo Johnson",
  },
  documents: [
    { name: "Driver's License", status: "uploaded" },
    { name: "Utility Bill", status: "uploaded" },
    { name: "Passport Photo", status: "uploaded" },
    { name: "Employment Letter", status: "uploaded" },
    { name: "Statement of Account", status: "uploaded" },
  ],
}

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState(applicationData.status)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleStatusUpdate = () => {
    setShowConfirm(true)
    // In real app, would call API here
    setTimeout(() => {
      setShowConfirm(false)
    }, 2000)
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
              <h1 className="text-3xl font-bold tracking-tight">{applicationData.id}</h1>
              <p className="text-sm text-muted-foreground">Submitted on {applicationData.date}</p>
            </div>
          </div>
          <Badge
            variant={status === "approved" ? "default" : status === "rejected" ? "destructive" : "secondary"}
            className={`text-base px-4 py-2 ${
              status === "approved"
                ? "bg-emerald-500/10 text-emerald-700"
                : status === "pending"
                  ? "bg-amber-500/10 text-amber-700"
                  : ""
            }`}
          >
            {status}
          </Badge>
        </div>

        {/* Status Update */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Update Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleStatusUpdate}>Update Status</Button>
              {showConfirm && <p className="text-sm text-emerald-600">Status updated successfully!</p>}
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
                <p className="font-medium">{applicationData.personal.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{applicationData.personal.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{applicationData.personal.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                <p className="font-medium">{applicationData.personal.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">BVN</p>
                <p className="font-medium">{applicationData.personal.bvn}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{applicationData.personal.address}</p>
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
                <p className="font-medium">{applicationData.employment.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Company Name</p>
                <p className="font-medium">{applicationData.employment.company}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Income</p>
                <p className="font-medium">{applicationData.employment.monthlyIncome}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Years Employed</p>
                <p className="font-medium">{applicationData.employment.yearsEmployed}</p>
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
                <p className="text-sm text-muted-foreground">Loan Type</p>
                <p className="font-medium">{applicationData.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amount Requested</p>
                <p className="font-medium text-lg">{applicationData.loan.amount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tenure</p>
                <p className="font-medium">{applicationData.loan.tenure}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interest Rate</p>
                <p className="font-medium">{applicationData.loan.interestRate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Repayment</p>
                <p className="font-medium">{applicationData.loan.monthlyRepayment}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Repayable</p>
                <p className="font-medium text-lg">{applicationData.loan.totalRepayable}</p>
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
                <p className="font-medium">{applicationData.property.address}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Landlord Name</p>
                <p className="font-medium">{applicationData.property.landlordName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Landlord Phone</p>
                <p className="font-medium">{applicationData.property.landlordPhone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Disbursement Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CreditCard className="h-5 w-5" />
                Disbursement Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Bank Name</p>
                <p className="font-medium">{applicationData.disbursement.bankName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Account Number</p>
                <p className="font-medium">{applicationData.disbursement.accountNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Account Name</p>
                <p className="font-medium">{applicationData.disbursement.accountName}</p>
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" />
                Uploaded Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {applicationData.documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <span className="font-medium text-sm">{doc.name}</span>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
