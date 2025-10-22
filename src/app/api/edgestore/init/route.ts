import { initEdgeStore } from '@edgestore/server'
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app'

// initialize EdgeStore (same as before)
const es = initEdgeStore.create()

const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket(),
})

// Create handler for /api/edgestore/init
export const GET = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
})
export const POST = GET
