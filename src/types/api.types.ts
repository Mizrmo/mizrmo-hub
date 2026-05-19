// Auth
export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roles: string[];
  isActive: boolean;
  isPhoneVerified: boolean;
  profilePicture: string | null;
  createdAt: string;
}

export interface AuthResponse {
  user: AdminUser;
  accessToken: string;
  message: string;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
  };
}

// Dashboard
export interface DashboardStats {
  totalUsers: number;
  totalActiveUsers: number;
  totalDrivers: number;
  totalApprovedDrivers: number;
  totalPendingDriverApplications: number;
  totalVehiclesPendingVerification: number;
  activeTripsCount: number;
  scheduledTripsCount: number;
  totalOpenSupportTickets: number;
  totalUrgentSupportTickets: number;
  totalUnassignedTickets: number;
  totalPendingPayouts: number;
  totalPendingPayoutAmount: number;
  revenueToday: number;
  revenueThisWeek: number;
  revenueThisMonth: number;
  totalMilesInCirculation: number;
  totalActivePromotions: number;
  pendingReviewReports: number;
  newUsersToday: number;
  newUsersThisWeek: number;
}

// Users
export interface UserSummary {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roles: string[];
  isActive: boolean;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  authProvider: string;
  profilePicture: string | null;
  createdAt: string;
  _count?: {
    totalBookings: number;
    totalSupportTickets: number;
  };
}

export interface RatingDisplay {
  display: string;
  count: number;
  average: number | null;
}

export interface BookingSummary {
  id: string;
  bookingReference: string;
  tripId: string;
  riderId: string;
  seatsBooked: number;
  totalFare: number;
  status: string;
  createdAt: string;
}

export interface SupportTicketSummary {
  id: string;
  subject: string;
  status: string;
  priority: string;
  createdAt: string;
}

export interface UserDetail extends UserSummary {
  driverProfile: DriverProfileSummary | null;
  recentBookings: BookingSummary[];
  recentTickets: SupportTicketSummary[];
  mizMilesBalance: number;
  ratings: {
    asRider: RatingDisplay;
    asDriver: RatingDisplay;
  };
  lastSeenAt: string | null;
}

// Drivers
export interface DriverDocument {
  id: string;
  documentType: string;
  storageUrl: string;
  uploadedAt: string;
}

export interface VehicleSummary {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  capacity: number;
  isVerified: boolean;
  roadworthinessExpiry: string;
  insuranceExpiry: string;
}

export interface DriverProfileSummary {
  id: string;
  userId: string;
  licenseNumber: string;
  licenseExpiryDate: string;
  ghanaCardNumber: string;
  approvalStatus: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  approvalNote: string | null;
  submittedAt: string;
  reviewedAt: string | null;
  vehicle: VehicleSummary | null;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profilePicture: string | null;
  };
  documents: DriverDocument[];
}

// Trips
export interface TripSummary {
  id: string;
  originCity: string;
  originAddress: string;
  destinationCity: string;
  destinationAddress: string;
  departureDate: string;
  totalSeats: number;
  availableSeats: number;
  pricePerSeat: number;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  distanceKm: number;
  driver: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
  vehicle: {
    make: string;
    model: string;
    color: string;
    licensePlate: string;
  };
  confirmedBookingCount: number;
}

// Finance
export interface RevenueData {
  period: string;
  commissionEarned: number;
  transactionVolume: number;
  bookingCount: number;
}

export interface PlatformBalance {
  ledger: {
    totalPaymentsReceived: number;
    totalCommissionEarned: number;
    totalDriverEarningsAccrued: number;
    totalPayoutsSent: number;
    totalRefundsIssued: number;
    netCommissionRetained: number;
    bookingCount: number;
  };
  paystack: {
    available: number;
    pending: number;
  };
}

export interface PayoutRequest {
  id: string;
  driverProfileId: string;
  weekIdentifier: string;
  totalAmount: number;
  earningsCount: number;
  status: string;
  payoutMethod: string | null;
  externalReference: string | null;
  momoNumber: string | null;
  processedAt: string | null;
  driver: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
}

// Support Tickets
export interface SupportTicket {
  id: string;
  userId: string;
  category: string;
  subject: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assignedTo: string | null;
  resolution: string | null;
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  messageCount?: number;
  isOverdue?: boolean;
}

export interface SupportTicketMessage {
  id: string;
  senderId: string;
  message: string;
  isAdminMessage: boolean;
  attachmentUrls: string[];
  createdAt: string;
}

// Miz Miles
export interface MizMilesOverview {
  totalMilesInCirculation: number;
  totalMilesEverAwarded: number;
  totalMilesRedeemed: number;
  totalMilesExpired: number;
  totalActiveVouchers: number;
  totalActivePromotions: number;
  totalReferralsCompleted: number;
  gHSValueInCirculation: number;
  usersWithBalance: number;
  usersWithZeroBalance: number;
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  type: string;
  multiplier: number | null;
  flatBonus: number | null;
  targetAudience: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  usageCount: number;
}

// System Config
export interface SystemConfig {
  id: string;
  key: string;
  value: string;
  description: string;
  category: string;
  isPublic: boolean;
  updatedAt: string;
}

// Email Templates
export interface EmailTemplate {
  id: string;
  key: string;
  name: string;
  description: string;
  category: string;
  variables: string[];
  isActive: boolean;
  lastTestedAt: string | null;
}
