"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Save, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { FormProgress } from "@/components/dashboard/form-progress"
import { FileUpload } from "@/components/dashboard/file-upload"
import { toast } from "sonner"

const requiredDocuments = [
  { key: "driversLicense", label: "Driver's License" },
  { key: "utilityBill", label: "Utility Bill (within 3 months)" },
  { key: "passportPhoto", label: "Passport Photograph" },
  { key: "employmentLetter", label: "Employment Letter / Business Registration" },
  { key: "bankStatement", label: "Statement of Account (Last 6 months)" },
]

export default function RentLoanPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    dependents: "",

    // Step 2: Employment Information
    employmentStatus: "",
    employerName: "",
    jobTitle: "",
    monthlyIncome: "",
    yearsEmployed: "",
    workAddress: "",
    officePhone: "",

    // Step 3: Loan Details
    loanAmount: "",
    rentAmount: "",
    propertyAddress: "",
    landlordName: "",
    landlordPhone: "",
    landlordEmail: "",
    landlordAccountNumber: "",
    landlordBankName: "",
    landlordAccountName: "",
    rentDuration: "",
    repaymentStartDate: "",

    // Step 4: KYC Documents
    bvn: "",
    nin: "",
    documents: {} as Record<string, File | null>,

    // Step 5: Review
    termsAccepted: false,
    declarationAccepted: false,
  })

  // Load draft from localStorage
  useEffect(() => {
    const draft = localStorage.getItem("rentLoanDraft")
    if (draft) {
      setFormData(JSON.parse(draft))
      toast.info("Draft Loaded", {
        description: "Your saved application has been restored.",
      })
    }
  }, [])

  // Auto-save draft
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("rentLoanDraft", JSON.stringify(formData))
    }, 2000)
    return () => clearTimeout(timer)
  }, [formData])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveDraft = () => {
    localStorage.setItem("rentLoanDraft", JSON.stringify(formData))
    toast.success("Draft Saved", {
      description: "Your application has been saved.",
    })
  }

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Mock submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    localStorage.removeItem("rentLoanDraft")
    toast.success("Application Submitted Successfully!", {
      description: "We'll review your rent loan application and get back to you within 24 hours.",
    })
    router.push("/")
  }

  const steps = ["Personal Info", "Employment", "Loan Details", "Documents", "Review & Submit"]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-foreground">
            Liquidity
          </a>
          <Button variant="outline" onClick={() => router.push("/apply")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Loan Types
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold">Rent Loan Application</h1>
            <p className="text-sm text-muted-foreground">Complete all steps to submit your application</p>
          </div>

          {/* Progress Indicator */}
          <FormProgress steps={steps} currentStep={currentStep} />

          {/* Form Content */}
          <Card>
            <CardContent className="p-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+234 XXX XXX XXXX"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender *</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maritalStatus">Marital Status *</Label>
                      <Select
                        value={formData.maritalStatus}
                        onValueChange={(value) => handleInputChange("maritalStatus", value)}
                      >
                        <SelectTrigger id="maritalStatus">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="married">Married</SelectItem>
                          <SelectItem value="divorced">Divorced</SelectItem>
                          <SelectItem value="widowed">Widowed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dependents">Number of Dependents</Label>
                      <Input
                        id="dependents"
                        type="number"
                        min="0"
                        value={formData.dependents}
                        onChange={(e) => handleInputChange("dependents", e.target.value)}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Employment Information</h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employmentStatus">Employment Status *</Label>
                      <Select
                        value={formData.employmentStatus}
                        onValueChange={(value) => handleInputChange("employmentStatus", value)}
                      >
                        <SelectTrigger id="employmentStatus">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="self-employed">Self-Employed</SelectItem>
                          <SelectItem value="business-owner">Business Owner</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="employerName">Employer/Business Name *</Label>
                      <Input
                        id="employerName"
                        value={formData.employerName}
                        onChange={(e) => handleInputChange("employerName", e.target.value)}
                        placeholder="Enter employer or business name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title/Business Type *</Label>
                      <Input
                        id="jobTitle"
                        value={formData.jobTitle}
                        onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                        placeholder="Enter job title or business type"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="monthlyIncome">Monthly Income *</Label>
                      <Select
                        value={formData.monthlyIncome}
                        onValueChange={(value) => handleInputChange("monthlyIncome", value)}
                      >
                        <SelectTrigger id="monthlyIncome">
                          <SelectValue placeholder="Select income range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100000-250000">₦100,000 - ₦250,000</SelectItem>
                          <SelectItem value="250000-500000">₦250,000 - ₦500,000</SelectItem>
                          <SelectItem value="500000-1000000">₦500,000 - ₦1,000,000</SelectItem>
                          <SelectItem value="1000000+">₦1,000,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="yearsEmployed">Years of Employment/Business *</Label>
                      <Input
                        id="yearsEmployed"
                        type="number"
                        min="0"
                        step="0.5"
                        value={formData.yearsEmployed}
                        onChange={(e) => handleInputChange("yearsEmployed", e.target.value)}
                        placeholder="e.g., 2.5"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="officePhone">Office Phone Number</Label>
                      <Input
                        id="officePhone"
                        type="tel"
                        value={formData.officePhone}
                        onChange={(e) => handleInputChange("officePhone", e.target.value)}
                        placeholder="+234 XXX XXX XXXX"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="workAddress">Work Address *</Label>
                    <Textarea
                      id="workAddress"
                      value={formData.workAddress}
                      onChange={(e) => handleInputChange("workAddress", e.target.value)}
                      placeholder="Enter your work address"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Loan Details</h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="loanAmount">Desired Loan Amount *</Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        value={formData.loanAmount}
                        onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                        placeholder="₦0"
                      />
                      <p className="text-xs text-muted-foreground">Maximum: ₦5,000,000</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rentAmount">Annual Rent Amount *</Label>
                      <Input
                        id="rentAmount"
                        type="number"
                        value={formData.rentAmount}
                        onChange={(e) => handleInputChange("rentAmount", e.target.value)}
                        placeholder="₦0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rentDuration">Rent Duration *</Label>
                      <Select
                        value={formData.rentDuration}
                        onValueChange={(value) => handleInputChange("rentDuration", value)}
                      >
                        <SelectTrigger id="rentDuration">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12">12 months</SelectItem>
                          <SelectItem value="24">24 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="repaymentStartDate">Preferred Repayment Start Date *</Label>
                      <Input
                        id="repaymentStartDate"
                        type="date"
                        value={formData.repaymentStartDate}
                        onChange={(e) => handleInputChange("repaymentStartDate", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyAddress">Property Address *</Label>
                    <Textarea
                      id="propertyAddress"
                      value={formData.propertyAddress}
                      onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                      placeholder="Enter the full property address"
                      rows={3}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-4">Landlord Information</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="landlordName">Landlord Full Name *</Label>
                        <Input
                          id="landlordName"
                          value={formData.landlordName}
                          onChange={(e) => handleInputChange("landlordName", e.target.value)}
                          placeholder="Enter landlord's full name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="landlordPhone">Landlord Phone Number *</Label>
                        <Input
                          id="landlordPhone"
                          type="tel"
                          value={formData.landlordPhone}
                          onChange={(e) => handleInputChange("landlordPhone", e.target.value)}
                          placeholder="+234 XXX XXX XXXX"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="landlordEmail">Landlord Email (Optional)</Label>
                        <Input
                          id="landlordEmail"
                          type="email"
                          value={formData.landlordEmail}
                          onChange={(e) => handleInputChange("landlordEmail", e.target.value)}
                          placeholder="landlord@example.com"
                        />
                      </div>
                    </div>

                    <h4 className="font-medium mt-6 mb-4">Landlord Bank Details</h4>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="landlordAccountNumber">Account Number *</Label>
                        <Input
                          id="landlordAccountNumber"
                          value={formData.landlordAccountNumber}
                          onChange={(e) => handleInputChange("landlordAccountNumber", e.target.value)}
                          placeholder="0123456789"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="landlordBankName">Bank Name *</Label>
                        <Input
                          id="landlordBankName"
                          value={formData.landlordBankName}
                          onChange={(e) => handleInputChange("landlordBankName", e.target.value)}
                          placeholder="Enter bank name"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="landlordAccountName">Account Name *</Label>
                        <Input
                          id="landlordAccountName"
                          value={formData.landlordAccountName}
                          onChange={(e) => handleInputChange("landlordAccountName", e.target.value)}
                          placeholder="Enter account name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">KYC Documents</h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bvn">BVN (Bank Verification Number) *</Label>
                      <Input
                        id="bvn"
                        value={formData.bvn}
                        onChange={(e) => handleInputChange("bvn", e.target.value)}
                        placeholder="Enter 11-digit BVN"
                        maxLength={11}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nin">NIN (National Identity Number) *</Label>
                      <Input
                        id="nin"
                        value={formData.nin}
                        onChange={(e) => handleInputChange("nin", e.target.value)}
                        placeholder="Enter 11-digit NIN"
                        maxLength={11}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Upload required documents. Accepted formats: PDF, JPG, PNG (Max 5MB each)
                    </p>

                    {requiredDocuments.map((doc) => (
                      <div key={doc.key} className="space-y-2">
                        <Label>{doc.label} *</Label>
                        <FileUpload
                          onFileSelect={(file) => {
                            handleInputChange("documents", {
                              ...formData.documents,
                              [doc.key]: file,
                            })
                          }}
                          maxSize={5}
                          acceptedTypes={[".pdf", ".jpg", ".jpeg", ".png"]}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-4">Review & Submit</h2>

                  <div className="space-y-4">
                    {/* Personal Information Summary */}
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-3">Personal Information</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Full Name</p>
                            <p className="font-medium">{formData.fullName}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Email</p>
                            <p className="font-medium">{formData.email}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Phone</p>
                            <p className="font-medium">{formData.phone}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Date of Birth</p>
                            <p className="font-medium">{formData.dateOfBirth}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Loan Details Summary */}
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-3">Loan Details</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Loan Amount</p>
                            <p className="font-medium">₦{Number(formData.loanAmount).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Rent Amount</p>
                            <p className="font-medium">₦{Number(formData.rentAmount).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Property Address</p>
                            <p className="font-medium">{formData.propertyAddress}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Landlord Name</p>
                            <p className="font-medium">{formData.landlordName}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Documents Summary */}
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-3">Documents</h3>
                        <div className="space-y-2">
                          {requiredDocuments.map((doc) => {
                            const uploaded = formData.documents[doc.key]

                            return (
                              <div key={doc.key} className="flex items-center justify-between text-sm">
                                <span>{doc.label}</span>
                                {uploaded ? (
                                  <div className="flex items-center gap-2 text-green-600">
                                    <CheckCircle className="w-4 h-4" />
                                    Uploaded
                                  </div>
                                ) : (
                                  <span className="text-amber-600">Not uploaded</span>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Terms and Declaration */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="terms"
                          checked={formData.termsAccepted}
                          onCheckedChange={(checked) => handleInputChange("termsAccepted", checked)}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="terms" className="cursor-pointer">
                            I accept the Terms & Conditions *
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            By checking this box, you agree to our terms of service and privacy policy
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="declaration"
                          checked={formData.declarationAccepted}
                          onCheckedChange={(checked) => handleInputChange("declarationAccepted", checked)}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="declaration" className="cursor-pointer">
                            I declare that all information provided is true and accurate *
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            False information may result in application rejection
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button variant="outline" onClick={handleSaveDraft}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
            </div>

            {currentStep < 5 ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData.termsAccepted || !formData.declarationAccepted || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
