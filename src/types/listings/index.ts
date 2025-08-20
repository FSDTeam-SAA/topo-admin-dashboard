export interface Location {
  _id: string
  addressLine: string
  postalCode: string
}

export interface RentalPrice {
  _id: string
  fourDays: number
  eightDays: number
}

export type PickupOption = 'Pickup' | 'Local' | 'Delivery'

export type DressStatus = 'pending' | 'active' | 'paused' | 'booked'

export interface Dress {
  lenderId: string
  dressId: string
  dressName: string
  brand: string
  size: string
  colour: string
  condition: string
  category: string
  locations: Location[]
  media: string[]
  description: string
  rentalPrice: RentalPrice
  material: string
  careInstructions: string
  occasion: string[]
  status?: 'pending' | 'active' | 'paused' // optional now
  insurance: boolean
  pickupOption: PickupOption
  approvalStatus?: 'pending' | 'approved' | 'rejected' // optional now
  reasonsForRejection?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  id: string
}

export interface Pagination {
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export interface ListingsGetResponse {
  status: boolean
  message: string
  data: Dress[]
  pagination: Pagination
}
