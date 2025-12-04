"use client"

import { useState } from "react"
import { Upload, X, FileText } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  maxSize?: number // in MB
  acceptedTypes?: string[]
}

export function FileUpload({ onFileSelect, maxSize = 5, acceptedTypes = [".pdf", ".jpg", ".jpeg", ".png"] }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string>("")

  const handleFileChange = (file: File) => {
    setError("")
    
    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      return
    }
    
    // Validate file type
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!acceptedTypes.includes(fileExt)) {
      setError(`Please upload a valid file type: ${acceptedTypes.join(', ')}`)
      return
    }
    
    setSelectedFile(file)
    onFileSelect(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file) handleFileChange(file)
  }

  const handleRemove = () => {
    setSelectedFile(null)
    setError("")
  }

  return (
    <div className="space-y-2">
      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
          } ${error ? 'border-red-500' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium">Drop files here or click to browse</p>
          <p className="text-xs text-muted-foreground mt-1">
            {acceptedTypes.join(', ')} up to {maxSize}MB
          </p>
          <input
            id="file-input"
            type="file"
            className="hidden"
            accept={acceptedTypes.join(',')}
            onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={handleRemove}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  )
}
