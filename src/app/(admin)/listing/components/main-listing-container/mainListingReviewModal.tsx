'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { FileUploader } from '@/components/fileUploader'
import { useSession } from 'next-auth/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Props {
  open: boolean
  onClose: () => void
  dressId: string | null
}

interface MasterDressData {
  _id: string
  masterDressId: string
  dressName: string
  lenderIds?: string[]
  listingIds?: string[]
  brand?: string
  sizes?: string[]
  colors?: string[]
  occasions?: string[]
  basePrice?: number
  insuranceFee?: number
  rrpPrice?: number
  thumbnail?: string
  media?: string[]
  shippingDetails?: {
    isLocalPickup?: boolean
    isShippingAvailable?: boolean
  }
  isActive?: boolean
  slug?: string
  createdAt?: string
  updatedAt?: string
}

// ------------------------ COMPONENT ------------------------
export default function MainListingReviewModal({
  open,
  onClose,
  dressId,
}: Props) {
  const { data: session } = useSession()
  const accessToken = session?.user?.accessToken || ''
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<MasterDressData | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // ---------------- FETCH DATA (React Query v5 style) ----------------
  const {
    data: masterData,
    isLoading,
    isError,
  } = useQuery<MasterDressData>({
    queryKey: ['master-dress', dressId],
    enabled: !!dressId && open,
    queryFn: async (): Promise<MasterDressData> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/master-dress/${dressId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      if (!res.ok) throw new Error('Failed to fetch master dress data')
      const json = await res.json()
      return json.data as MasterDressData
    },
    retry: false,
  })

  // keep local state in sync with query data
  useEffect(() => {
    if (masterData) {
      setFormData(masterData)
    }
  }, [masterData])

  // ---------------- PATCH MUTATION (React Query) ----------------
  const updateMutation = useMutation({
    mutationFn: async (updatedData: Partial<MasterDressData>) => {
      if (!updatedData.masterDressId) {
        throw new Error('masterDressId missing')
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/master/${updatedData.masterDressId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedData),
        }
      )
      if (!res.ok) throw new Error('Failed to update master dress')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['master-dress', dressId] })
      toast.success('Master Dress updated successfully')
      onClose()
    },
    onError: () => {
      toast.error('Update failed')
    },
  })

  // ---------------- FIELD CHANGE HANDLER ----------------
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: keyof MasterDressData, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  // ---------------- Colors input helper ----------------
  // store the colors as array in formData.colors but bind the input to a comma-separated string
  const colorsInputValue = formData?.colors?.join(', ') ?? ''

  const handleColorsInputChange = (raw: string) => {
    const arr = raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    handleChange('colors', arr)
  }

  // ---------------- SAVE HANDLER ----------------
  const handleSave = () => {
    if (!formData) return

    const patchBody: Partial<MasterDressData> = {
      masterDressId: formData.masterDressId,
      dressName: formData.dressName,
      brand: formData.brand,
      sizes: formData.sizes,
      colors: formData.colors,
      basePrice: formData.basePrice,
      insuranceFee: formData.insuranceFee,
      rrpPrice: formData.rrpPrice,
      thumbnail: formData.thumbnail,
      media: formData.media,
      shippingDetails: formData.shippingDetails,
      isActive: formData.isActive,
    }

    updateMutation.mutate(patchBody)
  }

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full h-[90vh] py-6 overflow-hidden ">
        <ScrollArea className="h-[90vh] px-6 py-6 space-y-6 pb-20">
          <DialogHeader>
            <div className="flex justify-center my-6">
              <Image src="/logo.png" alt="logo" width={60} height={60} />
            </div>
            <DialogTitle className="text-2xl font-light text-start mb-4">
              Master Dress Review
            </DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <p className="text-gray-600">Loading...</p>
          ) : isError ? (
            <p className="text-red-500">Failed to load data.</p>
          ) : formData ? (
            <div className="space-y-8">
              {/* --- Read-only Fields --- */}
              {/* Status Toggle */}
              <div className="flex items-center justify-between  py-5">
                <span className="font-medium text-base">Active Status</span>
                <Switch
                  checked={!!formData.isActive}
                  onCheckedChange={(checked) =>
                    handleChange('isActive', Boolean(checked))
                  }
                />
              </div>

              <div className="grid grid-cols-1 gap-4 border-b pb-3">
                <div>
                  <label className="font-medium">Master Dress ID</label>
                  <Input value={formData.masterDressId} disabled />
                </div>
                <div>
                  <label className="font-medium">Slug</label>
                  <Input value={formData.slug || ''} disabled />
                </div>
                <div>
                  <label className="font-medium">Listing IDs</label>
                  <Input
                    value={formData.listingIds?.join(', ') || ''}
                    disabled
                  />
                </div>
                <div>
                  <label className="font-medium">Lender IDs</label>
                  <select
                    className="border rounded-md w-full p-2 bg-gray-100"
                    disabled
                    value={formData.lenderIds?.[0] ?? ''}
                  >
                    {formData.lenderIds?.map((id) => (
                      <option key={id} value={id}>
                        {id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* --- Editable Fields --- */}

              {/* Dress Name */}
              <div>
                <label className="font-medium">Dress Name</label>
                <Input
                  value={formData.dressName || ''}
                  onChange={(e) => handleChange('dressName', e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Brand */}
              {/* Occasions (read-only) */}
              <div>
                <label className="font-medium">Occasions</label>
                <Input
                  value={formData.occasions?.join(', ') || ''}
                  disabled
                  className="mt-1 bg-gray-100"
                />
              </div>

              {/* Sizes */}
              <div>
                <label className="font-medium">Sizes (comma separated)</label>
                <Input
                  value={formData.sizes?.join(', ') || ''}
                  onChange={(e) =>
                    handleChange(
                      'sizes',
                      e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean)
                    )
                  }
                  className="mt-1"
                />
              </div>

              {/* ---------------- Colors (comma separated) ---------------- */}
              <div>
                <label className="font-medium">
                  Colors (hex values, comma separated)
                </label>
                <Input
                  value={colorsInputValue}
                  onChange={(e) => handleColorsInputChange(e.target.value)}
                  className="mt-1"
                  placeholder="#FFFFFF, #000000"
                />
                <div className="flex gap-2 mt-2 flex-wrap">
                  {formData.colors?.map((clr, i) => (
                    <span
                      key={i}
                      className="w-8 h-8 rounded-full border"
                      style={{ backgroundColor: clr }}
                      title={clr}
                    />
                  ))}
                </div>
              </div>

              {/* Prices */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-medium">Base Price</label>
                  <Input
                    type="number"
                    value={formData.basePrice ?? ''}
                    onChange={(e) =>
                      handleChange('basePrice', parseFloat(e.target.value) || 0)
                    }
                  />
                </div>
                <div>
                  <label className="font-medium">Insurance Fee</label>
                  <Input
                    type="number"
                    value={formData.insuranceFee ?? ''}
                    onChange={(e) =>
                      handleChange(
                        'insuranceFee',
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </div>
                <div>
                  <label className="font-medium">RRP Price</label>
                  <Input
                    type="number"
                    value={formData.rrpPrice ?? ''}
                    onChange={(e) =>
                      handleChange('rrpPrice', parseFloat(e.target.value) || 0)
                    }
                  />
                </div>
              </div>

              {/* Thumbnail */}
              <div>
                <label className="font-medium">Thumbnail</label>
                <FileUploader
                  values={formData.thumbnail ? [formData.thumbnail] : []}
                  onChange={(urls) =>
                    handleChange('thumbnail', urls.length ? urls[0] : '')
                  }
                  onUploadStateChange={setIsUploading}
                />
              </div>

              {/* Media */}
              <div>
                <label className="font-medium">Media</label>
                <FileUploader
                  values={formData.media || []}
                  onChange={(urls) => handleChange('media', urls)}
                  onUploadStateChange={setIsUploading}
                />
              </div>

              {/* Shipping Details */}
              <div className="flex flex-col gap-6 mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.shippingDetails?.isLocalPickup || false}
                    onChange={(e) =>
                      handleChange('shippingDetails', {
                        ...formData.shippingDetails,
                        isLocalPickup: e.target.checked,
                      })
                    }
                  />
                  Local Pickup
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={
                      formData.shippingDetails?.isShippingAvailable || false
                    }
                    onChange={(e) =>
                      handleChange('shippingDetails', {
                        ...formData.shippingDetails,
                        isShippingAvailable: e.target.checked,
                      })
                    }
                  />
                  Shipping Available
                </label>
              </div>

              {/* Save Button */}
              <div className="flex justify-start gap-5 mt-8 mb-5">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={updateMutation.isPending || isUploading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={updateMutation.isPending || isUploading}
                >
                  {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          ) : (
            <p>No data found.</p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
