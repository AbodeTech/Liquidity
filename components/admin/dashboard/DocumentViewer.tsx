import { AlertCircle, Loader2 } from "lucide-react"
import { useState } from "react"

export default function DocumentViewer({ url }: { url: string }) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Robust Regex to check for image extensions
  const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-muted/10">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="flex flex-col items-center justify-center text-muted-foreground p-4">
          <AlertCircle className="h-8 w-8 mb-2 text-destructive" />
          <p className="text-sm">Failed to preview document.</p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 text-primary underline text-sm"
          >
            Download to view
          </a>
        </div>
      )}

      {/* Content Renderer */}
      {!hasError && (
        isImage ? (
          <img
            src={url}
            alt="Document Viewer"
            className={`w-full h-full object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsLoading(false)}
            onError={() => { setIsLoading(false); setHasError(true); }}
          />
        ) : (
          <iframe
            src={url}
            className={`w-full h-full ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            title="Document Viewer"
            onLoad={() => setIsLoading(false)}
          />
        )
      )}
    </div>
  )
}