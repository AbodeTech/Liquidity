"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, HardDrive, Upload, Eye, Download, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'
import { UploadDocumentModal } from "@/components/dashboard/upload-document-modal"
import { DocumentViewerModal } from "@/components/dashboard/document-viewer-modal"

// Mock KYC documents data
const kycDocuments = [
  {
    id: "1",
    name: "Valid ID Card",
    fileName: "Drivers_License.pdf",
    fileSize: "2.4 MB",
    uploadDate: "2024-01-15",
    status: "verified" as const,
  },
  {
    id: "2",
    name: "Proof of Address",
    fileName: "Utility_Bill.pdf",
    fileSize: "1.8 MB",
    uploadDate: "2024-01-15",
    status: "verified" as const,
  },
  {
    id: "3",
    name: "Bank Statement",
    fileName: "Bank_Statement_6months.pdf",
    fileSize: "4.2 MB",
    uploadDate: "2024-01-16",
    status: "pending" as const,
  },
  {
    id: "4",
    name: "Employment Letter",
    fileName: "Employment_Letter.pdf",
    fileSize: "1.1 MB",
    uploadDate: "2024-01-16",
    status: "pending" as const,
  },
  {
    id: "5",
    name: "Passport Photograph",
    fileName: "Passport_Photo.jpg",
    fileSize: "856 KB",
    uploadDate: "2024-01-16",
    status: "verified" as const,
  },
]

// Required documents that haven't been uploaded
const requiredNotUploaded = [
  { id: "6", name: "Business Registration", required: false },
  { id: "7", name: "Tax Identification Number", required: false },
]

// Mock loan documents (dynamic based on applications)


const statusConfig = {
  verified: { label: "Verified", icon: CheckCircle, className: "bg-green-500/10 text-green-600 border-green-500/20" },
  pending: { label: "Pending Verification", icon: Clock, className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  rejected: { label: "Rejected", icon: XCircle, className: "bg-red-500/10 text-red-600 border-red-500/20" },
  "not-uploaded": { label: "Not Uploaded", icon: AlertCircle, className: "bg-gray-500/10 text-gray-600 border-gray-500/20" },
}



export default function DocumentsPage() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [viewerModalOpen, setViewerModalOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedDocument, setSelectedDocument] = useState<any>(null)

  const verifiedCount = kycDocuments.filter(d => d.status === "verified").length
  const totalKYC = kycDocuments.length + requiredNotUploaded.filter(d => d.required).length
  const completionPercentage = Math.round((verifiedCount / totalKYC) * 100)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewDocument = (doc: any) => {
    setSelectedDocument(doc)
    setViewerModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Documents</h1>
          <p className="text-sm text-muted-foreground">Upload and manage your documents</p>
        </div>
        <Button onClick={() => setUploadModalOpen(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold">{verifiedCount} of {totalKYC}</p>
                <p className="text-sm text-muted-foreground">KYC Documents</p>
                <Progress value={completionPercentage} className="h-2 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <HardDrive className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold">12.5 MB</p>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-xs text-muted-foreground mt-1">of 100 MB available</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KYC Documents */}
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Uploaded Documents */}
          {kycDocuments.map((doc) => {
            const StatusIcon = statusConfig[doc.status].icon
            return (
              <Card key={doc.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold">{doc.name}</h3>
                      <p className="text-sm text-muted-foreground">{doc.fileName}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {doc.fileSize} • Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                    <StatusIcon className={`w-5 h-5 ${doc.status === 'verified' ? 'text-green-600' : doc.status === 'pending' ? 'text-amber-600' : 'text-red-600'}`} />
                  </div>
                  <Badge variant="outline" className={statusConfig[doc.status].className}>
                    {statusConfig[doc.status].label}
                  </Badge>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => handleViewDocument(doc)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>

                  </div>
                </CardContent>
              </Card>
            )
          })}

          {/* Not Uploaded Documents */}
          {requiredNotUploaded.map((doc) => (
            <Card key={doc.id} className="border-dashed">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground">Not uploaded yet</p>
                  </div>
                  <AlertCircle className="w-5 h-5 text-gray-600" />
                </div>
                <Badge variant="outline" className={statusConfig["not-uploaded"].className}>
                  Not Uploaded
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4"
                  onClick={() => setUploadModalOpen(true)}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Upload Modal */}
      <UploadDocumentModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        isOpen={viewerModalOpen}
        document={selectedDocument}
        onClose={() => setViewerModalOpen(false)}
      />
    </div>
  )
}
