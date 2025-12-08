export interface FilterParams {
  search?: string
  location?: string
  status?: string
  type?: string
  page?: number
  limit?: number
}

export interface PersonalInfo {
  fullName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  gender: string
  maritalStatus: string
  numberOfDependents: number
}

export interface Employment {
  employmentStatus: string
  employer: string
  jobTitle: string
  monthlyIncome: number
  yearsEmployed: number
  officeAddress: string
  employerPhone: string
}

export interface LoanDetails {
  loanAmount: number
  loanPurpose: string
  propertyAddress: string

  // Rent Loan Fields
  landlordName?: string
  landlordPhone?: string
  landlordEmail?: string
  monthlyRent?: number
  landlordAccountName?: string
  landlordBankName?: string
  landlordAccountNumber?: string

  // Land Loan Fields
  landCost?: number
  landSize?: number
  purchaseTimeline?: string
  developerName?: string
  developerPhone?: string
  developerEmail?: string
  developerAccountName?: string
  developerBankName?: string
  developerAccountNumber?: string

  repaymentPeriod: number
  preferredRepaymentDate: string
}

export interface Document {
  documentId: string
  documentType: string
  documentUrl: string
  uploadedAt: string
}

export type ApplicationStatus = "draft" | "submitted" | "under_review" | "approved" | "rejected"

export interface Application {
  _id: string
  userId: string
  status: ApplicationStatus
  personalInfo: PersonalInfo
  employment: Employment
  loanDetails: LoanDetails
  documents: Document[]
  submittedAt: string
  createdAt: string
  updatedAt: string
}

export interface ApplicationResponse {
  data: Application[]
  meta?: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}