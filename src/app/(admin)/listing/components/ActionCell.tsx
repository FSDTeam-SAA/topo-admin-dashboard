'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import ListingForm, { ListingFormData } from './ListingForm'

interface ActionCellProps {
  listing: ListingFormData
}

export default function ActionCell({ listing }: ActionCellProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        View
      </Button>
      <ListingForm listing={listing} open={open} onOpenChange={setOpen} />
    </>
  )
}
