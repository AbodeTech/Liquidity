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
  nin: string
  bvn: string
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



export interface Document {
  documentId: string
  documentType: string
  documentUrl: string
  uploadedAt: string
}

export interface LandlordInfo {
  landlordFullName: string
  landlordPhoneNumber: string
  landlordEmail: string
}

export interface LandlordBankDetails {
  landlordBankAccountNumber: string
  landlordBankName: string
  landlordAccountName: string
}

export interface RentLoanDetails {
  desiredLoanAmount: number
  annualRentAmount: number
  rentDuration: number
  preferredRepaymentStartDate: string
  propertyAddress: string
  landlordInfo: LandlordInfo
  landlordBankDetails: LandlordBankDetails
}

export interface DeveloperSellerInfo {
  developerSellerName: string
  developerSellerPhone: string
  developerSellerEmail: string
}

export interface DeveloperSellerBankDetails {
  developerSellerAccountNumber: string
  developerSellerBankName: string
  developerSellerAccountName: string
}

export interface LandLoanDetails {
  desiredLoanAmount: number
  totalLandCost: number
  landSize: string
  purchaseTimeline: string
  preferredRepaymentStartDate: string
  landLocation: string
  developerSellerInfo: DeveloperSellerInfo
  developerSellerBankDetails: DeveloperSellerBankDetails
}


export type ApplicationStatus = "draft" | "submitted" | "under_review" | "approved" | "rejected"

export interface Application {
  _id: string
  userId: string
  status: ApplicationStatus
  personalInfo: PersonalInfo
  employment: Employment
  loanPurpose: "rent" | "land"
  rentLoanDetails?: RentLoanDetails
  landLoanDetails?: LandLoanDetails
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