'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import DressMediaCarousel from './_components/DressMediaCarousel'
import RejectModal from './_components/RejectModal'
import { Dress } from '@/types/listings'
import { useSession } from 'next-auth/react'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import DressDetailSkeleton from './_components/DressDetailSkeleton'
import ErrorPage from '@/components/error/ErrorPage'

interface PageProps {
  params: { dressId: string }
}

interface ApiResponse {
  success: boolean
  message: string
  data: Dress
}

export default function DressDetailPage({ params }: PageProps) {
  const { dressId } = params
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const accessToken = session?.user?.accessToken

  // fetch dress details
  const { data, isLoading, isError } = useQuery<ApiResponse, Error>({
    queryKey: ['dress', dressId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lender/listings/${dressId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          cache: 'no-store',
        }
      )
      if (!res.ok) throw new Error('Failed to fetch dress')
      return res.json()
    },
  })

  const dress = data?.data

  // mutation for approve/reject
  const mutation = useMutation({
    mutationFn: async (payload: Partial<Dress>) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/${dress?._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      )
      if (!res.ok) throw new Error('Failed to update dress')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dress', dressId] })
      toast.success('Dress Status updated successfully!')
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast.error(err.message || 'Something went wrong')
    },
  })

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  const handleApprove = () => {
    mutation.mutate({
      approvalStatus: 'approved',
      isActive: true,
    })
  }

  const handleReject = (reason: string) => {
    mutation.mutate({
      approvalStatus: 'rejected',
      isActive: false,
      reasonsForRejection: reason,
    })
    setModalOpen(false)
  }

  if (isLoading)
    return (
      <div>
        <DressDetailSkeleton />
      </div>
    )

  if (isError || !dress)
    return (
      <ErrorPage errorMessage="We were unable to load the dress details. Please try again later or contact support if the issue persists." />
    )

  const statusColor =
    dress.approvalStatus === 'approved'
      ? 'bg-green-100 text-green-800'
      : dress.approvalStatus === 'pending'
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-red-100 text-red-800'

  return (
    <div className="bg-white shadow rounded-lg max-w-full mx-auto overflow-hidden">
      {/* Top banner */}
      <div className="bg-[#1e1e1e] text-white px-6 py-3 text-sm font-medium flex justify-between items-center">
        <span>
          New listing request #{dress.dressId.slice(-6)} created on{' '}
          {formatDate(dress.createdAt)}
        </span>

        {/* Back Button */}
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      {/* Main content */}
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start relative">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {dress.dressName}
            </h1>
            <p className="text-gray-500 font-light">{dress.brand}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
          >
            {dress.approvalStatus?.toUpperCase()}
          </span>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-light">
          {/* Left: Images + specs */}
          <div className="space-y-4">
            <DressMediaCarousel images={dress.media} />

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2 text-sm">
              <p>
                <span className="font-medium">Category:</span> {dress.category}
              </p>
              <p>
                <span className="font-medium">Material:</span> {dress.material}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Colour:</span>
                <span
                  className="inline-block w-4 h-4 rounded-full border"
                  style={{ backgroundColor: dress.colour }}
                />
                {dress.colour}
              </p>
              <p>
                <span className="font-medium">Condition:</span>{' '}
                {dress.condition}
              </p>
              <p>
                <span className="font-medium">Size:</span> {dress.size}
              </p>
              <p>
                <span className="font-medium">Care:</span>{' '}
                {dress.careInstructions}
              </p>
              <p>
                <span className="font-medium">Insurance:</span>{' '}
                {dress.insurance ? 'Yes' : 'No'}
              </p>
              <p>
                <span className="font-medium">Pickup:</span>{' '}
                {dress.pickupOption}
              </p>
              <p>
                <span className="font-medium">Status:</span>{' '}
                {dress.isActive ? 'Active' : 'Inactive'}
              </p>
              <p>
                <span className="font-medium">Created At:</span>{' '}
                {formatDate(dress.createdAt)}
              </p>
              <p>
                <span className="font-medium">Updated At:</span>{' '}
                {formatDate(dress.updatedAt)}
              </p>
            </div>
          </div>

          {/* Right: Description + Pricing + Actions */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Description</h3>
              <p className="text-gray-700 text-sm">{dress.description}</p>

              {dress.rentalPrice && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-800">Rental Price</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm">
                    {dress.rentalPrice.fourDays && (
                      <li>4 Days: ${dress.rentalPrice.fourDays}</li>
                    )}
                    {dress.rentalPrice.eightDays && (
                      <li>8 Days: ${dress.rentalPrice.eightDays}</li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 lg:gap-6 mt-6">
              <Button onClick={handleApprove} disabled={mutation.isPending}>
                {mutation.isPending ? 'Processing...' : 'Approve'}
              </Button>
              <Button
                variant="destructive"
                onClick={() => setModalOpen(true)}
                disabled={mutation.isPending}
              >
                Reject
              </Button>
            </div>
          </div>
        </div>
      </div>

      <RejectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleReject}
      />
    </div>
  )
}
