import type { BookingStatus, PaymentStatus } from '@/types/api';

const bookingLabels: Record<BookingStatus, string> = {
  PENDING_PAYMENT: 'Awaiting payment', PAYMENT_FAILED: 'Payment failed', CONFIRMED: 'Confirmed',
  TECHNICIAN_ASSIGNED: 'Technician assigned', TECHNICIAN_EN_ROUTE: 'Technician on the way', IN_PROGRESS: 'In progress',
  COMPLETED: 'Completed', CLOSED: 'Closed', CANCELLED: 'Cancelled', REFUND_PENDING: 'Refund in progress', REFUNDED: 'Refunded',
};
const paymentLabels: Record<PaymentStatus, string> = { UNPAID: 'Not paid', PARTIALLY_PAID: 'Advance paid', PAID: 'Fully paid', FAILED: 'Payment failed', REFUNDED: 'Refunded' };

export const bookingStatusLabel = (status: string) => bookingLabels[status as BookingStatus] ?? status.replaceAll('_', ' ').toLowerCase();
export const paymentStatusLabel = (status: string) => paymentLabels[status as PaymentStatus] ?? status.replaceAll('_', ' ').toLowerCase();

/** "2026-10-16" → "Fri, 16 Oct 2026" */
export function formatDate(isoDate: string) {
  const date = new Date(`${isoDate}T12:00:00`);
  return Number.isNaN(date.getTime()) ? isoDate : date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

/** "14:30:00" → "2:30 PM" */
export function formatTime(time: string) {
  const [h, m] = time.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return time;
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
}

export const formatSlot = (start: string, end: string) => `${formatTime(start)} – ${formatTime(end)}`;
