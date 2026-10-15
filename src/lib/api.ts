import { sessionStorage } from '@/lib/session';
import type { Address, AddressInput, AddressSuggestion, ApiErrorBody, AuthResponse, Booking, Cart, FAQ, NormalizedLocation, OtpSendResponse, Paginated, PaymentOrder, ProfileUpdate, PublicServiceArea, Service, ServiceAreaCheck, ServiceCategory, TimeSlot, User } from '@/types/api';

const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:8000').replace(/\/$/, '');
export class ApiError extends Error { constructor(public status: number, message: string, public code?: string, public details?: unknown) { super(message); } }
let refreshPromise: Promise<string | null> | null = null;
function buildUrl(path: string, query?: Record<string, string | number | boolean | undefined>) { const value = new URL(`${API_URL}${path}`); Object.entries(query ?? {}).forEach(([key, item]) => item !== undefined && value.searchParams.set(key, String(item))); return value.toString(); }
async function refreshAccess() {
  if (!refreshPromise) refreshPromise = (async () => {
    const session = await sessionStorage.get(); if (!session?.tokens.refresh) return null;
    const response = await fetch(buildUrl('/api/v1/auth/refresh/'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refresh: session.tokens.refresh }) });
    if (!response.ok) { await sessionStorage.clear(); return null; }
    const body = await response.json() as { access: string; refresh?: string };
    await sessionStorage.set({ ...session, tokens: { ...session.tokens, access: body.access, refresh: body.refresh ?? session.tokens.refresh } }); return body.access;
  })().finally(() => { refreshPromise = null; });
  return refreshPromise;
}
type RequestOptions = RequestInit & { auth?: boolean; query?: Record<string, string | number | boolean | undefined>; retryAuth?: boolean };
export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { auth, query, retryAuth = true, ...init } = options; const session = auth ? await sessionStorage.get() : null; const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json'); if (init.body && !(init.body instanceof FormData)) headers.set('Content-Type', 'application/json'); if (session?.tokens.access) headers.set('Authorization', `Bearer ${session.tokens.access}`);
  const response = await fetch(buildUrl(path, query), { ...init, headers });
  if (response.status === 401 && auth && retryAuth && await refreshAccess()) return apiRequest<T>(path, { ...options, retryAuth: false });
  if (!response.ok) { let body: ApiErrorBody = {}; try { body = await response.json() as ApiErrorBody; } catch {} const fallback = response.status >= 500 ? 'Purple Squad is temporarily unavailable. Please try again.' : 'Please check the details and try again.'; throw new ApiError(response.status, body.error?.message ?? body.detail ?? fallback, body.error?.code, body.error?.details ?? body); }
  if (response.status === 204) return undefined as T; return response.json() as Promise<T>;
}
export const api = {
  auth: {
    firebase: (id_token: string) => apiRequest<AuthResponse>('/api/v1/auth/firebase/', { method: 'POST', body: JSON.stringify({ id_token }) }),
    sendOtp: (phone_number: string, channel: 'SMS' | 'WHATSAPP' = 'SMS') => apiRequest<OtpSendResponse>('/api/v1/auth/otp/send/', { method: 'POST', body: JSON.stringify({ phone_number, channel, captcha_token: '' }) }),
    verifyOtp: (phone_number: string, otp: string) => apiRequest<AuthResponse>('/api/v1/auth/otp/verify/', { method: 'POST', body: JSON.stringify({ phone_number, otp }) }),
    me: () => apiRequest<User>('/api/v1/auth/me/', { auth: true }), updateMe: (body: ProfileUpdate) => apiRequest<User>('/api/v1/auth/me/', { method: 'PATCH', auth: true, body: JSON.stringify(body) }), logout: (refresh: string) => apiRequest<void>('/api/v1/auth/logout/', { method: 'POST', auth: true, body: JSON.stringify({ refresh }) }),
  },
  catalogue: { categories: () => apiRequest<ServiceCategory[]>('/api/v1/service-categories/'), services: (query?: Record<string, string | number | boolean | undefined>) => apiRequest<Paginated<Service>>('/api/v1/services/', { query }), service: (slug: string) => apiRequest<Service>(`/api/v1/services/${encodeURIComponent(slug)}/`) },
  serviceArea: (postal_code: string) => apiRequest<ServiceAreaCheck>('/api/v1/service-areas/check/', { query: { postal_code } }),
  location: { reverse: (lat: number, lng: number) => apiRequest<NormalizedLocation>('/api/v1/location/reverse-geocode/', { query: { lat, lng } }), autocomplete: (input: string) => apiRequest<{ suggestions: AddressSuggestion[] }>('/api/v1/location/autocomplete/', { query: { input } }) },
  serviceAreas: () => apiRequest<PublicServiceArea[]>('/api/v1/service-areas/'),
  addresses: { list: () => apiRequest<Paginated<Address>>('/api/v1/addresses/', { auth: true }), create: (body: AddressInput) => apiRequest<Address>('/api/v1/addresses/', { method: 'POST', auth: true, body: JSON.stringify(body) }), update: (id: string, body: Partial<AddressInput>) => apiRequest<Address>(`/api/v1/addresses/${id}/`, { method: 'PATCH', auth: true, body: JSON.stringify(body) }), remove: (id: string) => apiRequest<void>(`/api/v1/addresses/${id}/`, { method: 'DELETE', auth: true }) },
  cart: {
    get: () => apiRequest<Cart>('/api/v1/cart/', { auth: true }),
    add: (serviceId: string) => apiRequest<Cart>('/api/v1/cart/', { method: 'POST', auth: true, body: JSON.stringify({ service_ids: [serviceId] }) }),
    quantity: (serviceId: string, quantity: number) => apiRequest<Cart>(`/api/v1/cart/items/${serviceId}/`, { method: 'PATCH', auth: true, body: JSON.stringify({ quantity }) }),
    remove: (serviceId: string) => apiRequest<Cart>(`/api/v1/cart/items/${serviceId}/`, { method: 'DELETE', auth: true }),
  },
  slots: (service_id: string, postal_code: string, date: string) => apiRequest<TimeSlot[]>('/api/v1/slots/', { query: { service_id, postal_code, date } }),
  bookings: {
    list: () => apiRequest<Paginated<Booking>>('/api/v1/bookings/', { auth: true }), get: (id: string) => apiRequest<Booking>(`/api/v1/bookings/${id}/`, { auth: true }),
    create: (body: Record<string, unknown>, key: string) => apiRequest<Booking>('/api/v1/bookings/', { method: 'POST', auth: true, headers: { 'Idempotency-Key': key }, body: JSON.stringify(body) }),
    cancel: (id: string, notes = '') => apiRequest<Booking>(`/api/v1/bookings/${id}/cancel/`, { method: 'POST', auth: true, body: JSON.stringify({ notes }) }),
    reschedule: (id: string, slot_id: string) => apiRequest<Booking>(`/api/v1/bookings/${id}/reschedule/`, { method: 'POST', auth: true, body: JSON.stringify({ slot_id }) }),
  },
  payments: {
    order: (bookingId: string, key: string) => apiRequest<PaymentOrder>(`/api/v1/bookings/${bookingId}/payments/order/`, { method: 'POST', auth: true, headers: { 'Idempotency-Key': key } }),
    verify: (body: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => apiRequest<{ booking_id: string; payment_status: string; booking_status: string }>('/api/v1/payments/verify/', { method: 'POST', auth: true, body: JSON.stringify(body) }),
  },
  reviews: { create: (bookingId: string, rating: number, comment: string) => apiRequest(`/api/v1/bookings/${bookingId}/review/`, { method: 'POST', auth: true, body: JSON.stringify({ rating, comment }) }) },
  faqs: () => apiRequest<FAQ[]>('/api/v1/faqs/'),
};
export const money = (value: string | number) => `₹${Number(value).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
export const makeIdempotencyKey = (scope: string) => `${scope}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
