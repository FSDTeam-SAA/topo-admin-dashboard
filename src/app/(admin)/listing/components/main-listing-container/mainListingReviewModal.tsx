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
import { FileUploader } from '@/components/fileUploader' // ✅ reuse your existing uploader
import { useSession } from 'next-auth/react'

interface Props {
  open: boolean
  onClose: () => void
  dressId: string | null
}

interface MasterDressData {
  _id: string
  masterDressId: string
  dressName: string
  brand?: string
  sizes?: string[]
  colors?: string[]
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
}

export default function MainListingReviewModal({
  open,
  onClose,
  dressId,
}: Props) {
  const { data: session } = useSession()
  const accessToken = session?.user?.accessToken || ''

  const [formData, setFormData] = useState<MasterDressData | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // --- Fetch Data ---
  useEffect(() => {
    if (!dressId || !open) return

    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/master-dress/${dressId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        if (!res.ok) throw new Error('Failed to load dress data')
        const json = await res.json()
        setFormData(json.data)
      } catch (err) {
        console.error(err)
        toast.error('Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dressId, open, accessToken])

  // --- Handle Field Change ---
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: keyof MasterDressData, value: any) => {
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev))
  }

  // --- Handle Save (PATCH) ---
  const handleSave = async () => {
    if (!formData) return
    setSaving(true)
    try {
      const patchBody: Partial<MasterDressData> = {
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

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/master/${formData.masterDressId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(patchBody),
        }
      )
      if (!res.ok) throw new Error('Failed to update master dress')
      toast.success('Master Dress updated successfully')
      onClose()
    } catch (err) {
      console.error(err)
      toast.error('Update failed')
    } finally {
      setSaving(false)
    }
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
            <DialogTitle className="text-2xl font-light text-center mb-6">
              Master Dress Review
            </DialogTitle>
          </DialogHeader>

          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : formData ? (
            <>
              {/* Status Toggle */}
              <div className="flex items-center justify-between border-b pb-3">
                <span className="font-medium text-base">Active Status</span>
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    handleChange('isActive', checked)
                  }
                />
              </div>

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
              <div>
                <label className="font-medium">Brand</label>
                <Input
                  value={formData.brand || ''}
                  onChange={(e) => handleChange('brand', e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Sizes */}
              <div>
                <label className="font-medium">Sizes</label>
                <Input
                  value={formData.sizes?.join(', ') || ''}
                  onChange={(e) =>
                    handleChange(
                      'sizes',
                      e.target.value.split(',').map((s) => s.trim())
                    )
                  }
                  className="mt-1"
                />
              </div>

              {/* Colors */}
              <div>
                <label className="font-medium">Colors (hex values)</label>
                <Input
                  value={formData.colors?.join(', ') || ''}
                  onChange={(e) =>
                    handleChange(
                      'colors',
                      e.target.value.split(',').map((c) => c.trim())
                    )
                  }
                  className="mt-1"
                />
                <div className="flex gap-2 mt-2">
                  {formData.colors?.map((clr, i) => (
                    <span
                      key={i}
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: clr }}
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
                    value={formData.basePrice || ''}
                    onChange={(e) =>
                      handleChange('basePrice', parseFloat(e.target.value) || 0)
                    }
                  />
                </div>
                <div>
                  <label className="font-medium">Insurance Fee</label>
                  <Input
                    type="number"
                    value={formData.insuranceFee || ''}
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
                    value={formData.rrpPrice || ''}
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
              <div className="flex gap-6 mt-4">
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
                  disabled={saving || isUploading}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving || isUploading}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </>
          ) : (
            <p>No data found.</p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
