// app/api/edgestore/[...edgestore]/route.ts
import { initEdgeStore } from '@edgestore/server'
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app'

const es = initEdgeStore.create()

/**
 * This is the main router for the EdgeStore buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es
    .fileBucket({
      maxSize: 1024 * 1024 * 50, // 50MB
    })
    .beforeUpload(() => {
      // Add authentication logic here if needed
      // For now, allow all uploads
      return true
    })
    .beforeDelete(() => {
      // Add authentication logic here if needed
      return true
    }),
})

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
})

export { handler as GET, handler as POST }

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter
