import { Employment, LoanDetails, PersonalInfo } from "../admin/application";




export interface ApplicationRequestType {
  draftId?: string
  personalInfo: PersonalInfo
  employment: Employment
  loanDetails: LoanDetails
  documents: Document[]
}

export interface ApplicationUploadDocumentRequestType {
  file: File
  documentType: string
}


export interface ApplicationUploadDocumentDeleteRequestType {
  documentUrl: string
}


export interface ApplicationSaveDraftRequestType {
  currentStep: string
  personalInfo?: PersonalInfo
  employment?: Employment
  loanDetails?: LoanDetails
  documents?: Document[]
}

export interface GetAplicationsFilterParams {
  status?: string
}