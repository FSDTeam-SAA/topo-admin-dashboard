'use client'

import { useEdgeStore } from '@/lib/edgestore'
import { cn } from '@/lib/utils'
import { CloudUpload, Upload, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

interface UploadedFile {
  id: string
  file: File | null
  name: string
  type: 'image' | 'video'
  url: string
  progress: number
  uploading: boolean
  preview?: string
}

interface FileUploaderProps {
  values?: string[]
  onChange: (urls: string[]) => void
  onUploadStateChange?: (isUploading: boolean) => void
  id?: string
  maxFiles?: number
  disabled?: boolean
}

export function FileUploader({
  values = [],
  onChange,
  onUploadStateChange,
  id,
  maxFiles = 10,
  disabled = false,
}: FileUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const { edgestore } = useEdgeStore()
  const previewUrlsRef = useRef(new Set<string>())

  // Check if EdgeStore is initialized
  useEffect(() => {
    if (!edgestore) {
      console.error(
        '❌ EdgeStore not initialized! Check your EdgeStoreProvider setup.'
      )
    }
  }, [edgestore])

  // Notify parent when any upload is in progress
  useEffect(() => {
    const isUploading = files.some((f) => f.uploading)
    onUploadStateChange?.(isUploading)
  }, [files, onUploadStateChange])

  // Merge incoming `values` (URLs) with any local/uploading files
  useEffect(() => {
    setFiles((prev) => {
      const uploadingOrLocal = prev.filter(
        (f) => f.file !== null || f.uploading
      )
      const existingUrlEntries = prev.filter(
        (f) => f.url && values.includes(f.url)
      )

      const existingUrls = new Set(existingUrlEntries.map((f) => f.url))
      const newUrlFiles = (values || [])
        .filter((url) => !existingUrls.has(url))
        .map((url) => {
          const name = url.split('/').pop() || url
          const type = url.toLowerCase().endsWith('.mp4') ? 'video' : 'image'
          return {
            id: `url-${url}`,
            file: null,
            name,
            type,
            url,
            progress: 100,
            uploading: false,
          } as UploadedFile
        })

      return [...uploadingOrLocal, ...existingUrlEntries, ...newUrlFiles]
    })
  }, [values])

  const handleUpload = useCallback(
    async (selectedFile: File) => {
      // Check EdgeStore availability
      if (!edgestore) {
        toast.error('Upload service not available')
        console.error('EdgeStore not initialized')
        return
      }

      // Check max files limit
      if (files.length >= maxFiles) {
        toast.error(`Maximum ${maxFiles} files allowed`)
        return
      }

      // Generate unique ID
      const id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`

      // Create preview URL
      const preview = URL.createObjectURL(selectedFile)
      previewUrlsRef.current.add(preview)

      const tempFile: UploadedFile = {
        id,
        file: selectedFile,
        name: selectedFile.name,
        type: selectedFile.type.startsWith('video') ? 'video' : 'image',
        url: '',
        progress: 0,
        uploading: true,
        preview,
      }

      setFiles((prev) => [...prev, tempFile])

      try {
        const res = await edgestore.publicFiles.upload({
          file: selectedFile,
          onProgressChange: (progress) => {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === id ? { ...f, progress, uploading: progress < 100 } : f
              )
            )
          },
        })

        // Upload successful
        setFiles((prev) => {
          const updated = prev.map((f) => {
            if (f.id === id) {
              // Cleanup preview URL
              if (f.preview) {
                try {
                  URL.revokeObjectURL(f.preview)
                  previewUrlsRef.current.delete(f.preview)
                } catch (e) {
                  console.error('Error revoking URL:', e)
                }
              }

              return {
                ...f,
                url: res.url,
                uploading: false,
                progress: 100,
                file: null,
                preview: undefined,
              }
            }
            return f
          })

          // Update parent with new URLs
          const urls = updated.map((f) => f.url).filter(Boolean)
          onChange(urls)

          return updated
        })

        toast.success('File uploaded successfully')
      } catch (err) {
        console.error('Upload failed:', err)
        toast.error(
          `Upload failed: ${
            err instanceof Error ? err.message : 'Unknown error'
          }`
        )

        // Remove failed upload
        setFiles((prev) => {
          const toRemove = prev.find((f) => f.id === id)
          if (toRemove?.preview) {
            try {
              URL.revokeObjectURL(toRemove.preview)
              previewUrlsRef.current.delete(toRemove.preview)
            } catch (e) {
              console.error('Error revoking URL:', e)
            }
          }
          return prev.filter((f) => f.id !== id)
        })
      }
    },
    [edgestore, onChange, files.length, maxFiles]
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (disabled) return

      // Check if adding these files would exceed max limit
      const remainingSlots = maxFiles - files.length
      if (acceptedFiles.length > remainingSlots) {
        toast.warning(`Only ${remainingSlots} more file(s) can be uploaded`)
        acceptedFiles = acceptedFiles.slice(0, remainingSlots)
      }

      acceptedFiles.forEach((file) => handleUpload(file))
    },
    [handleUpload, disabled, files.length, maxFiles]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    disabled: disabled || files.some((f) => f.uploading),
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'video/mp4': ['.mp4'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((rejection) => {
        const errors = rejection.errors.map((e) => e.message).join(', ')
        toast.error(`${rejection.file.name}: ${errors}`)
      })
    },
  })

  const removeFile = useCallback(
    (fileId: string) => {
      if (disabled) return

      setFiles((prev) => {
        const toRemove = prev.find((f) => f.id === fileId)

        // Cleanup preview URL
        if (toRemove?.preview) {
          try {
            URL.revokeObjectURL(toRemove.preview)
            previewUrlsRef.current.delete(toRemove.preview)
          } catch (e) {
            console.error('Error revoking URL:', e)
          }
        }

        const updated = prev.filter((f) => f.id !== fileId)

        // Update parent with remaining URLs
        const urls = updated.map((f) => f.url).filter(Boolean)
        onChange(urls)

        return updated
      })

      toast.success('File removed')
    },
    [onChange, disabled]
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const previews = Array.from(previewUrlsRef.current)
      previews.forEach((preview) => {
        try {
          URL.revokeObjectURL(preview)
        } catch (e) {
          console.error('Error revoking URL:', e)
        }
      })
      previewUrlsRef.current.clear()
    }
  }, [])

  const isUploadDisabled =
    disabled || files.some((f) => f.uploading) || files.length >= maxFiles

  return (
    <div className="w-full space-y-4">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={cn(
          'flex flex-col items-center justify-center gap-2 w-full rounded-md border-2 border-dashed border-input bg-background px-3 py-6 md:py-10 text-sm ring-offset-background transition-all duration-200',
          isDragActive && 'border-primary bg-primary/10 scale-[1.02]',
          isUploadDisabled &&
            'pointer-events-none opacity-50 cursor-not-allowed',
          !isUploadDisabled && 'cursor-pointer hover:border-primary/50'
        )}
      >
        <input {...getInputProps()} id={id ?? 'file-upload'} />
        <div className="flex flex-col items-center text-muted-foreground gap-1">
          {isDragActive ? (
            <Upload className="h-8 w-8 text-primary animate-bounce" />
          ) : (
            <CloudUpload className="h-8 w-8" />
          )}
          <p className="text-xs text-center">
            {isDragActive
              ? 'Drop files here'
              : 'Drag & drop or click to upload'}
          </p>
          <p className="text-[10px] text-muted-foreground/70 mt-1">
            Images & Videos (Max {maxFiles} files, 50MB each)
          </p>
          {files.length > 0 && (
            <p className="text-[10px] text-primary mt-1">
              {files.length} / {maxFiles} uploaded
            </p>
          )}
        </div>
      </div>

      {/* File Previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((f) => (
            <div
              key={f.id}
              className="relative flex flex-col items-center gap-2 border rounded-lg p-3 shadow-sm bg-muted/10 hover:shadow-md transition-shadow"
            >
              {/* Preview */}
              <div className="w-full aspect-square relative overflow-hidden rounded-md bg-muted/20">
                {f.type === 'video' ? (
                  <video
                    src={f.url || f.preview}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={f.url || f.preview!}
                    alt={f.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                )}
              </div>

              {/* File Name */}
              <span className="text-xs truncate max-w-full px-1 text-center">
                {f.name}
              </span>

              {/* Progress Bar */}
              {f.uploading && (
                <div className="w-full space-y-1">
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${f.progress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-center text-muted-foreground">
                    {f.progress}%
                  </p>
                </div>
              )}

              {/* Remove Button */}
              <button
                onClick={() => removeFile(f.id)}
                className="absolute -top-2 -right-2 rounded-full bg-white shadow-md p-1.5 text-red-500 hover:bg-red-50 hover:scale-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-red-200"
                type="button"
                disabled={f.uploading}
                aria-label="Remove file"
              >
                <X className="h-3.5 w-3.5" />
              </button>

              {/* Upload Success Indicator */}
              {!f.uploading && f.url && (
                <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full p-1">
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
