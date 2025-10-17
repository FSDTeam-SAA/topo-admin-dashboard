/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { InfoCard } from '@/components/cards/stat-card'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { Download, AlertTriangle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { Skeleton } from '@/components/ui/custom/skeleton'

const fetchChatRooms = async (accessToken: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/message/chatrooms/admin/all`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch chat rooms')
  }

  const data = await res.json()
  return data?.data?.data || []
}

export default function HeaderCards() {
  const { data: session } = useSession()
  const accessToken = session?.user?.accessToken || ''

  const {
    data: chatRooms = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['chatRooms', accessToken],
    queryFn: () => fetchChatRooms(accessToken),
    enabled: !!accessToken,
  })

  // ✅ Calculate stats
  const activeConversations = chatRooms.filter(
    (room: any) => room.status?.toLowerCase() === 'active'
  ).length

  const flaggedConversations = chatRooms.filter(
    (room: any) => room.flagged?.status === true
  ).length

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-[32px] font-light tracking-[0.2em]">
          Chats
        </h1>
        <Button disabled={isLoading}>
          Download Report <Download className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="mt-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="p-4 rounded-2xl border shadow-sm">
              <Skeleton className="h-6 w-2/3 mb-3" />
              <Skeleton className="h-8 w-1/3" />
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="flex items-center gap-2 text-red-500 mt-3">
          <AlertTriangle className="h-5 w-5" />
          <span>Failed to load chat data. Please try again.</span>
        </div>
      )}

      {/* Stats Cards */}
      {!isLoading && !isError && (
        <div className="mt-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-lg font-sans">
          <InfoCard title="Active Conversations" value={activeConversations} />
          <InfoCard
            title="Flagged Conversations"
            value={flaggedConversations}
          />
        </div>
      )}
    </div>
  )
}
