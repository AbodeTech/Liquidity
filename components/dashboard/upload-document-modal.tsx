"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileUpload } from "@/components/dashboard/file-upload"
import { toast } from "sonner"
import { CheckCircle } from 'lucide-react'

interface UploadDocumentModalProps {
  open: boolean
  onClose: () => void
}

const documentTypes = [
  "Valid ID Card",
  "Proof of Address",
  "Bank Statement",
  "Employment Letter",
  "Business Registration",
  "Passport Photograph",
  "Tax Identification Number",
]

export function UploadDocumentModal({ open, onClose }: UploadDocumentModalProps) {
  const [documentType, setDocumentType] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const handleUpload = async () => {
    if (!documentType || !selectedFile) return

    setIsUploading(true)
    // Mock upload delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsUploading(false)
    setUploadSuccess(true)

    toast.success("Document Uploaded", {
      description: "Your document has been uploaded successfully and is pending verification.",
    })

    // Reset after showing success
    setTimeout(() => {
      setUploadSuccess(false)
      setDocumentType("")
      setSelectedFile(null)
      onClose()
    }, 1500)
  }

  const handleClose = () => {
    if (!isUploading) {
      setDocumentType("")
      setSelectedFile(null)
      setUploadSuccess(false)
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Select document type and upload your file. Maximum file size is 5MB.
          </DialogDescription>
        </DialogHeader>

        {uploadSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload Successful!</h3>
            <p className="text-sm text-muted-foreground text-center">
              Your document is now pending verification
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="documentType">Document Type *</Label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger id="documentType">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Upload File *</Label>
              <FileUpload
                onFileSelect={setSelectedFile}
                maxSize={5}
                acceptedTypes={[".pdf", ".jpg", ".jpeg", ".png"]}
              />
              <p className="text-xs text-muted-foreground">
                Accepted formats: PDF, JPG, PNG • Maximum size: 5MB
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleClose} className="flex-1" disabled={isUploading}>
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                className="flex-1"
                disabled={!documentType || !selectedFile || isUploading}
              >
                {isUploading ? "Uploading..." : "Upload Document"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
