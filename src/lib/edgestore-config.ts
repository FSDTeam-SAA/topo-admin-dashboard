// lib/edgestore-config.ts
import { initEdgeStore } from '@edgestore/server'
import { initEdgeStoreClient } from '@edgestore/server/core'

/**
 * Initialize EdgeStore with your credentials
 */
export const backendClient = initEdgeStoreClient({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  router: {} as any, // Will be set properly in API route
})

const es = initEdgeStore.create()

/**
 * This is the main router for the EdgeStore buckets.
 */
export const edgeStoreRouter = es.router({
  publicFiles: es
    .fileBucket({
      maxSize: 1024 * 1024 * 50, // 50MB max file size
    })
    .beforeUpload(() => {
      // You can add authentication here
      // For example: check if user is logged in
      // const session = await getServerSession()
      // if (!session) return false

      return true // Allow all uploads for now
    })
    .beforeDelete(() => {
      return true // Allow all deletes for now
    }),
})

export type EdgeStoreRouter = typeof edgeStoreRouter
