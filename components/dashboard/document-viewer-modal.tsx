"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, X } from 'lucide-react'

interface DocumentViewerModalProps {
  isOpen: boolean
  onClose: () => void
  document: {
    name: string
    fileName: string
    url: string
    type: string
  } | null
}

export function DocumentViewerModal({ isOpen, document, onClose }: DocumentViewerModalProps) {
  if (!document) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>{document.name}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{document.fileName}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Document Preview */}
        <div className="flex-1 bg-muted rounded-lg flex items-center justify-center p-8">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Document Preview</p>
            <p className="text-sm text-muted-foreground">
              {document.fileName}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Full document viewer would be implemented here
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
