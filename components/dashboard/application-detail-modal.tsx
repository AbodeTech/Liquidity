"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Download, AlertCircle, FileText, CreditCard, User, Home, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ApplicationDetailModalProps {
  isOpen: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  application: any // TODO: Define proper type
  onClose: () => void
}

const statusConfig = {
  pending: { label: "Pending", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  "in-review": { label: "In Review", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  approved: { label: "Approved", className: "bg-green-500/10 text-green-600 border-green-500/20" },
  "payment-confirmed": { label: "Payment Confirmed", className: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
  "funds-disbursed": { label: "Funds Disbursed", className: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20" },
  active: { label: "Active", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  rejected: { label: "Rejected", className: "bg-red-500/10 text-red-600 border-red-500/20" },
}

export function ApplicationDetailModal({ application, onClose }: ApplicationDetailModalProps) {
  const router = useRouter()

  const handlePayment = () => {
    // Navigate to payment page or show payment modal
    router.push(`/dashboard/payments/process?app=${application._id}`)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">{application._id}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{application.loanPurpose}</p>
            </div>
            <Badge variant="outline" className={statusConfig[application.status as keyof typeof statusConfig]?.className}>
              {statusConfig[application.status as keyof typeof statusConfig]?.label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status-specific messages */}
          {application.status === "approved" && (
            <Card className="border-green-500/20 bg-green-500/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-900 dark:text-green-100">Congratulations! Your loan is approved</h3>
                    <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                      Complete your payment to proceed with disbursement. Payment must be completed within 7 days.
                    </p>
                    <div className="mt-4 p-4 bg-background rounded-lg border space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Processing Fee:</span>
                        <span className="font-medium">₦5,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">20% Deposit:</span>
                        <span className="font-medium">₦{(application.loanDetails?.loanAmount * 0.2).toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="font-semibold">Total Due:</span>
                        <span className="font-bold text-lg">₦{(5000 + application.loanDetails?.loanAmount * 0.2).toLocaleString()}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" onClick={handlePayment}>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Proceed to Payment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {application.status === "payment-confirmed" && (
            <Card className="border-purple-500/20 bg-purple-500/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-purple-900 dark:text-purple-100">Payment Confirmed</h3>
                    <p className="text-sm text-purple-800 dark:text-purple-200 mt-1">
                      Your payment has been verified. We are processing the disbursement to {application.rentDetails?.landlordName || application.landDetails?.developerName}.
                    </p>
                    <p className="text-sm text-purple-800 dark:text-purple-200 mt-2">
                      Estimated disbursement: Within 2-3 business days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {application.status === "funds-disbursed" && application.disbursementDetails && (
            <Card className="border-indigo-500/20 bg-indigo-500/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-indigo-900 dark:text-indigo-100">Funds Disbursed Successfully</h3>
                    <p className="text-sm text-indigo-800 dark:text-indigo-200 mt-1">
                      The loan amount has been transferred to {application.disbursementDetails.recipientName}.
                    </p>
                    <div className="mt-4 space-y-3">
                      <Card className="bg-background">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium">Disbursement Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Amount Disbursed:</span>
                            <span className="font-semibold">₦{application.disbursementDetails.amountDisbursed.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Recipient:</span>
                            <span className="font-medium">{application.disbursementDetails.recipientName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Account:</span>
                            <span className="font-mono">{application.disbursementDetails.recipientAccount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date:</span>
                            <span>{new Date(application.disbursementDetails.disbursementDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Transaction Ref:</span>
                            <span className="font-mono text-xs">{application.disbursementDetails.transactionRef}</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download Disbursement Receipt
                      </Button>
                    </div>
                    <p className="text-sm text-indigo-800 dark:text-indigo-200 mt-4">
                      Awaiting landlord/developer confirmation. Your loan will become active once confirmed.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {application.status === "active" && (
            <Card className="border-emerald-500/20 bg-emerald-500/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">Loan Active</h3>
                    <p className="text-sm text-emerald-800 dark:text-emerald-200 mt-1">
                      Your loan is now active. Make your monthly payments on time to maintain a good repayment record.
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <Card className="bg-background">
                        <CardContent className="p-4">
                          <p className="text-sm text-muted-foreground">Next Payment</p>
                          <p className="text-lg font-bold mt-1">₦{application.monthlyPayment?.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground mt-1">Due {new Date(application.nextPaymentDue).toLocaleDateString()}</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-background">
                        <CardContent className="p-4">
                          <p className="text-sm text-muted-foreground">Remaining Balance</p>
                          <p className="text-lg font-bold mt-1">₦{application.remainingBalance?.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground mt-1">{application.tenure} months tenure</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {application.status === "rejected" && (
            <Card className="border-red-500/20 bg-red-500/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-900 dark:text-red-100">Application Rejected</h3>
                    <p className="text-sm text-red-800 dark:text-red-200 mt-1">
                      {application.rejectionReason || "Unfortunately, your application did not meet our current lending criteria."}
                    </p>
                    <Button variant="outline" className="mt-4">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Loan Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Loan Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground">Loan Type</p>
                  <p className="font-medium mt-1">{application.loanPurpose === "rent" ? "Rent Loan" : application.loanPurpose === "land" ? "Land Loan" : "Loan"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Amount Requested</p>
                  <p className="font-medium mt-1">₦{(application.rentLoanDetails?.desiredLoanAmount || application.landLoanDetails?.desiredLoanAmount || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Application Date</p>
                  <p className="font-medium mt-1">{new Date(application.date || application.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tenure</p>
                  <p className="font-medium mt-1">{application.rentLoanDetails?.rentDuration || application.landLoanDetails?.repaymentPeriod || 0} months</p>
                </div>
                {application.monthlyPayment && (
                  <div>
                    <p className="text-muted-foreground">Monthly Payment</p>
                    <p className="font-medium mt-1">₦{application.monthlyPayment.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground">Full Name</p>
                  <p className="font-medium mt-1">{application.personalInfo.fullName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium mt-1">{application.personalInfo.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone Number</p>
                  <p className="font-medium mt-1">{application.personalInfo.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Employment Status</p>
                  <p className="font-medium mt-1">{application.employment?.employmentStatus}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Monthly Income</p>
                  <p className="font-medium mt-1">₦{application.employment?.monthlyIncome?.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rent/Land Specific Details */}
          {(application.loanPurpose === "rent" || application.rentLoanDetails) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Rent Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Property Address</p>
                  <p className="font-medium mt-1">{application.rentLoanDetails?.propertyAddress}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground">Landlord Name</p>
                    <p className="font-medium mt-1">{application.rentLoanDetails?.landlordInfo?.landlordFullName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Landlord Contact</p>
                    <p className="font-medium mt-1">{application.rentLoanDetails?.landlordInfo?.landlordPhoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Monthly Rent</p>
                    <p className="font-medium mt-1">₦{(application.rentLoanDetails?.annualRentAmount / 12)?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Rent Duration</p>
                    <p className="font-medium mt-1">{application.rentLoanDetails?.rentDuration} months</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {(application.loanPurpose === "land" || application.landLoanDetails) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Land Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground">Land Location</p>
                    <p className="font-medium mt-1">{application.landLoanDetails?.landLocation}</p>
                  </div>
                  {application.landLoanDetails?.developerSellerInfo?.developerSellerName && (
                    <div>
                      <p className="text-muted-foreground">Developer/Seller Name</p>
                      <p className="font-medium mt-1">{application.landLoanDetails.developerSellerInfo.developerSellerName}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-muted-foreground">Total Land Cost</p>
                    <p className="font-medium mt-1">₦{application.landLoanDetails?.totalLandCost?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Land Size</p>
                    <p className="font-medium mt-1">{application.landLoanDetails?.landSize} sqm</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Details (if exists) */}
          {application.paymentDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground">Processing Fee</p>
                    <p className="font-medium mt-1">₦{application.paymentDetails.processingFee.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">20% Deposit</p>
                    <p className="font-medium mt-1">₦{application.paymentDetails.deposit.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Paid</p>
                    <p className="font-medium mt-1">₦{application.paymentDetails.totalPaid.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Payment Date</p>
                    <p className="font-medium mt-1">{new Date(application.paymentDetails.paidDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {application.documents.map((doc: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{doc.documentType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={
                        doc.status === "verified" ? "bg-green-500/10 text-green-600" :
                          doc.status === "under-review" ? "bg-blue-500/10 text-blue-600" :
                            doc.status === "rejected" ? "bg-red-500/10 text-red-600" :
                              "bg-amber-500/10 text-amber-600"
                      }>
                        {doc.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download Application
            </Button>
            {application.status === "pending" && (
              <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700">
                Cancel Application
              </Button>
            )}
            <Button variant="outline" className="flex-1">
              Contact Support
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
