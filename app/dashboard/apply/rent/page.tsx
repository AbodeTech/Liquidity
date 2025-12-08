"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormProgress } from "@/components/dashboard/form-progress"
import { FileUpload } from "@/components/dashboard/file-upload"
import { toast } from "sonner"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { applicationService } from "@/lib/services/user/applicationService"
import { ApplicationSaveDraftRequestType } from "@/lib/types/user/application"


const requiredDocuments = [
  { key: "validId", label: "Valid ID Card (Driver's License, Int'l Passport, or Voter's Card)" },
  { key: "proofOfAddress", label: "Proof of Address (Utility bill within 3 months)" },
  { key: "bankStatement", label: "Bank Statement (Last 6 months)" },
  { key: "employmentLetter", label: "Employment Letter / Business Registration" },
  { key: "passport", label: "Passport Photograph" },
]

export default function RentLoanPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const draftId = searchParams.get("draftId") || searchParams.get("draft")
  const queryClient = useQueryClient()

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingDocs, setUploadingDocs] = useState<Record<string, boolean>>({})

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    documents: {} as Record<string, any>,

    // Step 5: Review
    termsAccepted: false,
    declarationAccepted: false,
  })



  console.log(formData)
  // Fetch Draft Data
  const { data: draftData, isLoading: isLoadingDraft } = useQuery({
    queryKey: ['draft', draftId],
    queryFn: () => applicationService.getDraft(draftId!),
    enabled: !!draftId,
  })

  // Populate form with draft data
  useEffect(() => {
    if (draftData?.data) {
      const draft = draftData.data
      setFormData(prev => ({
        ...prev,
        ...draft.personalInfo,
        ...draft.employment,
        ...draft.loanDetails,
        currentStep: parseInt(draft.currentStep || "1"),
        documents: draft.documents?.reduce((acc: Record<string, any>, doc: any) => ({
          ...acc,
          [doc.documentType]: doc
        }), {}) || {},
      }))
      setCurrentStep(parseInt(draft.currentStep || "1"))
      toast.info("Draft Loaded", { description: "Your saved application has been restored." })
    }
  }, [draftData])

  // Get Payload Helper
  const getPayloadFromData = (data: typeof formData): ApplicationSaveDraftRequestType => {
    const documentsArray = Object.values(data.documents)
    console.log(documentsArray)
    return {
      currentStep: currentStep.toString(),
      personalInfo: {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phone,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        maritalStatus: data.maritalStatus,
        numberOfDependents: Number(data.dependents || 0),
      },
      employment: {
        employmentStatus: data.employmentStatus,
        employer: data.employerName,
        jobTitle: data.jobTitle,
        monthlyIncome: data.monthlyIncome ? Number(data.monthlyIncome) : 0,
        yearsEmployed: Number(data.yearsEmployed || 0),
        officeAddress: data.workAddress,
        employerPhone: data.officePhone,
      },
      loanDetails: {
        loanAmount: Number(data.loanAmount || 0),
        loanPurpose: "Rent Loan",
        propertyAddress: data.propertyAddress,
        landlordName: data.landlordName,
        landlordPhone: data.landlordPhone,
        // landlordEmail, landlordAccountName, landlordAccountNumber, landlordBankName omitted as per API requirements
        monthlyRent: Number(data.rentAmount || 0),
        repaymentPeriod: Number(data.rentDuration || 12),
        preferredRepaymentDate: data.repaymentStartDate,
      },
      documents: documentsArray
    }
  }

  // Mutations
  const saveDraftMutation = useMutation({
    mutationFn: (data: ApplicationSaveDraftRequestType) => {
      if (draftId) {
        return applicationService.updateDraft(draftId, data)
      } else {
        return applicationService.saveDraft(data)
      }
    },
    onSuccess: (response) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const savedDraftId = (response.data as any)?.id || (response.data as any)?._id || draftId
      if (savedDraftId && savedDraftId !== draftId) {
        router.push(`/dashboard/apply/rent?draftId=${savedDraftId}`)
      }
      queryClient.invalidateQueries({ queryKey: ['drafts'] })
    },
    onError: () => {
      // toast.error("Failed to save draft")
    }
  })

  const uploadDocumentMutation = useMutation({
    mutationFn: applicationService.uploadDocument,
    onSuccess: (response, variables) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const docData = response.data as any
      console.log(docData)

      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [variables.documentType]: {
            documentId: docData?.documentId,
            documentType: variables?.documentType,
            documentUrl: docData?.documentUrl,
            uploadedAt: docData?.uploadedAt,
          }
        }
      }))

      setUploadingDocs(prev => ({ ...prev, [variables.documentType]: false }))
      toast.success(`${variables.documentType} uploaded successfully`)
    },
    onError: (error, variables) => {
      console.error("Upload error:", error)
      setUploadingDocs(prev => ({ ...prev, [variables.documentType]: false }))
      toast.error(`Failed to upload ${variables.documentType}`)
    }
  })

  const submitApplicationMutation = useMutation({
    mutationFn: applicationService.submitApplication,
    onSuccess: () => {
      toast.success("Application Submitted", { description: "Your rent loan application has been submitted successfully." })
      router.push("/dashboard/applications")
    },
    onError: (error) => {
      console.error("Submission error:", error)
      toast.error("Failed to submit application. Please try again.")
    }
  })



  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveDraft = () => {
    saveDraftMutation.mutate(getPayloadFromData(formData))
    toast.success("Draft Saved")
  }

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Create base payload from current data
    const basePayload = getPayloadFromData(formData)

    // Create submission payload without currentStep
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currentStep, ...submissionPayload } = basePayload

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload = {
      ...submissionPayload,
      draftId: draftId || undefined
    } as any

    submitApplicationMutation.mutate(payload)
    // Don't set isSubmitting false immediately, wait for redirect
  }

  const handleFileUpload = (file: File, key: string) => {
    setUploadingDocs(prev => ({ ...prev, [key]: true }))
    uploadDocumentMutation.mutate({
      file,
      documentType: key
    })
  }

  const steps = [
    "Personal Info",
    "Employment",
    "Loan Details",
    "Documents",
    "Review & Submit"
  ]

  if (isLoadingDraft) {
    return <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard/apply")}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Rent Loan Application</h1>
          <p className="text-sm text-muted-foreground">Complete all steps to submit your application</p>
        </div>
      </div>

      {/* Progress Indicator */}
      <FormProgress steps={steps} currentStep={currentStep} />

      {/* Form Content */}
      <Card>
        <CardContent className="p-6">
          {/* Step 1: Personal Information */}
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
                  <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange("maritalStatus", value)}>
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

          {/* Step 2: Employment Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Employment Information</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employmentStatus">Employment Status *</Label>
                  <Select value={formData.employmentStatus} onValueChange={(value) => handleInputChange("employmentStatus", value)}>
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
                  <Input
                    id="monthlyIncome"
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                    placeholder="Enter monthly income"
                  />
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

          {/* Step 3: Loan Details */}
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
                  <Select value={formData.rentDuration} onValueChange={(value) => handleInputChange("rentDuration", value)}>
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

          {/* Step 4: KYC Documents */}
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
                  Upload required documents. Documents already uploaded in your profile are marked with a checkmark.
                </p>

                {requiredDocuments.map((doc) => {
                  const uploadedDoc = formData.documents[doc.key]

                  return (
                    <div key={doc.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>{doc.label} *</Label>
                        {uploadedDoc && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            Uploaded
                          </div>
                        )}
                      </div>

                      {uploadedDoc ? (
                        <Card className="border-green-500/20 bg-green-500/5">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{doc.label}</p>
                                <p className="text-xs text-muted-foreground">
                                  Uploaded on {new Date(uploadedDoc.uploadedAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => {
                                  const newDocs = { ...formData.documents }
                                  delete newDocs[doc.key]
                                  setFormData(prev => ({ ...prev, documents: newDocs }))
                                }}>Replace</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        <div className="relative">
                          {uploadingDocs[doc.key] ? (
                            <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg">
                              <Loader2 className="w-6 h-6 animate-spin text-primary" />
                              <span className="ml-2 text-sm text-muted-foreground">Uploading...</span>
                            </div>
                          ) : (
                            <FileUpload
                              onFileSelect={(file) => handleFileUpload(file, doc.key)}
                              maxSize={5}
                              acceptedTypes={[".pdf", ".jpg", ".jpeg", ".png"]}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 5: Review & Submit */}
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
          <Button variant="outline" onClick={handleSaveDraft} disabled={saveDraftMutation.isPending}>
            {saveDraftMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
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
            disabled={!formData.termsAccepted || !formData.declarationAccepted || isSubmitting || submitApplicationMutation.isPending}
          >
            {(isSubmitting || submitApplicationMutation.isPending) ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
              </>
            ) : "Submit Application"}
          </Button>
        )}
      </div>
    </div>
  )
}
