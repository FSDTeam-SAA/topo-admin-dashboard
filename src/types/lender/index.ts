type ReviewStockMethod = {
  website: boolean;
  instagram: boolean;
  keyBrands: boolean;
};

export type Pagination = {
  total: number;
  page: number;
  totalPages: number;
};

export interface LenderProfile {
  reviewStockMethod: ReviewStockMethod;
  deactivationReason: string;
  deactivationFeedback: string;
  deactivated: boolean;
  businessName: string;
  abnNumber: string;
  fullName: string;
  phoneNumber: string;
  businessAddress: string;
  instagramHandle: string;
  businessWebsite: string;
  businessEmail: string;
  numberOfDresses: string;
  allowTryOn: boolean;
  allowLocalPickup: boolean;
  shipAustraliaWide: boolean;
  agreedTerms: boolean;
  agreedCurationPolicy: boolean;
  status: "pending" | "approved" | "rejected"; // assuming possible statuses
  notes: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  id: string;
}

export type LendersGetResponse = {
  status: string;
  message: string;
  data: {
    data: LenderProfile[];
    pagination: Pagination;
  };
};
