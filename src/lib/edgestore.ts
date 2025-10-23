// lib/edgestore.ts
'use client'

import { createEdgeStoreProvider } from '@edgestore/react'
import type { EdgeStoreRouter } from './edgestore-config'

const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>({
    maxConcurrentUploads: 5,
  })

export { EdgeStoreProvider, useEdgeStore }
