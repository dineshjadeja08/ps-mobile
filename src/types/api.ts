export type UUID = string;
export type ApiErrorBody = { error?: { code?: string; message?: string; details?: Record<string, unknown> }; detail?: string; [key: string]: unknown };
export type Paginated<T> = { count: number; next: string | null; previous: string | null; results: T[] };
export type Tokens = { access: string; refresh: string; token_type?: string };
export type User = { id: UUID; phone_number: string; email?: string | null; first_name: string; last_name: string; role: 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN' | 'SUPER_ADMIN'; is_verified: boolean; customer_profile?: { id: UUID; display_name: string; alternate_phone: string } | null };
export type AuthResponse = { user: User; tokens: Tokens; created: boolean };
export type OtpSendResponse = { message?: string; expires_in_seconds?: number; resend_after_seconds?: number };
export type ServiceCategory = { id: UUID; name: string; slug: string; description: string; image_url?: string; display_order: number };
export type Service = {
  id: UUID; category: ServiceCategory; name: string; slug: string; short_description: string;
  description?: string; whats_included: string; whats_excluded?: string; important_notes?: string;
  base_price: string; selling_price: string | null; effective_price: string;
  advance_payment_type: 'FIXED' | 'PERCENTAGE'; advance_payment_value: string; advance_amount: string;
  training_fee: string; training_fee_per_unit: boolean; estimated_duration_minutes: number;
  cover_image?: string | null; landing_thumbnail?: string | null; popup_cover_image?: string | null;
  popup_content_image?: string | null; list_image?: string | null; is_featured: boolean; is_popular: boolean;
};
export type Address = {
  id: UUID; label: string; recipient_name: string; phone: string; address_line_1: string; address_line_2: string;
  landmark: string; locality: string; city: string; state: string; postal_code: string; country: string;
  latitude: string | null; longitude: string | null; is_default: boolean;
};
export type AddressInput = Omit<Address, 'id' | 'latitude' | 'longitude'> & { latitude?: number | null; longitude?: number | null };
export type ServiceAreaCheck = { postal_code: string; is_supported: boolean; service_area: { id: UUID; name: string; city: string; state: string; postal_code: string } | null };
export type NormalizedLocation = { formatted_address: string; house_number?: string; street?: string; locality?: string; city: string; state: string; pincode: string; country: string; latitude: number | null; longitude: number | null; supported_city: boolean; serviceable: boolean };
export type AddressSuggestion = NormalizedLocation & { id: string; description: string; main_text: string; secondary_text: string };
export type PublicServiceArea = { id: UUID; name: string; city: string; state: string; country: string; postal_code: string };
export type TimeSlot = { id: UUID; service_area: UUID; date: string; start_time: string; end_time: string; capacity: number; available_capacity: number };
export type BookingStatus = 'PENDING_PAYMENT' | 'PAYMENT_FAILED' | 'CONFIRMED' | 'TECHNICIAN_ASSIGNED' | 'TECHNICIAN_EN_ROUTE' | 'IN_PROGRESS' | 'COMPLETED' | 'CLOSED' | 'CANCELLED' | 'REFUND_PENDING' | 'REFUNDED';
export type PaymentStatus = 'UNPAID' | 'PARTIALLY_PAID' | 'PAID' | 'FAILED' | 'REFUNDED';
export type Booking = {
  id: UUID; booking_number: string; service: { id: UUID; name: string; slug: string }; address_snapshot: Record<string, string>;
  service_date: string; time_slot: { id: UUID; start_time: string; end_time: string }; problem_description: string;
  contact_phone: string; quantity: number; subtotal: string; discount_amount: string; training_fee: string; tax_amount: string;
  total_amount: string; advance_required: string; advance_paid: string; balance_due: string; balance_collected: string;
  payment_status: PaymentStatus; booking_status: BookingStatus; customer_notes: string; confirmed_at: string | null;
  completed_at: string | null; cancelled_at: string | null; created_at: string;
  status_history: { id: UUID; from_status: string; to_status: string; notes: string; created_at: string }[];
};
export type PaymentOrder = { payment_id: UUID; booking_id: UUID; provider_order_id: string; amount: string; amount_paise: number; currency: string; key_id: string };
export type ProfileUpdate = { first_name?: string; last_name?: string; email?: string; display_name?: string; alternate_phone?: string };
export type FAQ = { id: UUID; question: string; answer: string; display_order: number; category: UUID | null; service: UUID | null };
export type CartItem = {
  id: UUID; slug: string; name: string; price: string; advance: string; available: boolean;
  basePrice: string; trainingFee: string; quantity: number; bookingId: UUID | null;
};
export type Cart = { items: CartItem[]; count: number; total: string; advance_total: string; unavailable_service_ids?: UUID[] };
