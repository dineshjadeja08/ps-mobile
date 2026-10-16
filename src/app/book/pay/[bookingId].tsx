import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { LoadingState, MessageState } from '@/components/ui/states';
import { api, makeIdempotencyKey, money } from '@/lib/api';
import { useAuth } from '@/stores/auth';
import { bookingStatusLabel, paymentStatusLabel } from '@/lib/format';
import { colors, radius, spacing, typography } from '@/theme/tokens';

type PaymentUi = 'idle' | 'creating' | 'checkout' | 'verifying' | 'pending' | 'cancelled' | 'failed';
export default function PaymentScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>(); const user = useAuth((state) => state.user); const client = useQueryClient(); const [state, setState] = useState<PaymentUi>('idle'); const [message, setMessage] = useState(''); const [paymentKey] = useState(() => makeIdempotencyKey('payment'));
  const booking = useQuery({ queryKey: ['booking', bookingId], queryFn: () => api.bookings.get(bookingId!), enabled: Boolean(bookingId), refetchInterval: state === 'pending' ? 4000 : false });
  useEffect(() => {
    if (booking.data && ['CONFIRMED','TECHNICIAN_ASSIGNED','TECHNICIAN_EN_ROUTE','IN_PROGRESS','COMPLETED','CLOSED'].includes(booking.data.booking_status) && state === 'pending') {
      router.replace({ pathname: '/booking-success/[bookingId]', params: { bookingId: booking.data.id } });
    }
  }, [booking.data, state]);
  const pay = useMutation({ mutationFn: async () => {
    setState('creating'); const order = await api.payments.order(bookingId!, paymentKey); const key = order.key_id || process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID;
    if (!key) throw new Error('Payment checkout is not configured. Please contact support.'); if (Platform.OS === 'web') throw new Error('Payments are only available in the Purple Squad mobile app.');
    setState('checkout'); const RazorpayCheckout = (await import('react-native-razorpay')).default;
    const result = await RazorpayCheckout.open({ key, amount: order.amount_paise, currency: order.currency, order_id: order.provider_order_id, name: 'Purple Squad', description: `Advance for ${booking.data?.booking_number ?? 'booking'}`, prefill: { contact: user?.phone_number }, theme: { color: colors.primary } });
    setState('verifying'); await api.payments.verify(result); return api.bookings.get(bookingId!);
  }, onSuccess: async (fresh) => { client.setQueryData(['booking', bookingId], fresh); if (fresh.payment_status === 'PARTIALLY_PAID' || fresh.payment_status === 'PAID' || fresh.booking_status === 'CONFIRMED') router.replace({ pathname: '/booking-success/[bookingId]', params: { bookingId: fresh.id } }); else { setState('pending'); setMessage('Confirming your payment with the bank. This usually takes a few seconds.'); } }, onError: async (error: Error & { code?: string }) => { const fresh = await booking.refetch(); if (fresh.data && (fresh.data.payment_status === 'PARTIALLY_PAID' || fresh.data.payment_status === 'PAID')) { router.replace({ pathname: '/booking-success/[bookingId]', params: { bookingId: fresh.data.id } }); return; } const cancelled = /cancel/i.test(error.message) || error.code === '0'; setState(cancelled ? 'cancelled' : 'pending'); setMessage(cancelled ? 'Payment was cancelled. Your booking remains unpaid.' : 'We couldn’t confirm your payment yet. If money was deducted, please don’t pay again — check My Bookings in a minute.'); } });
  if (booking.isLoading) return <Screen><LoadingState label="Loading secure payment…" /></Screen>;
  if (booking.isError || !booking.data) return <Screen><MessageState title="Couldn’t load booking" message={booking.error?.message ?? 'Booking not found.'} actionLabel="Retry" onAction={() => void booking.refetch()} /></Screen>;
  const item = booking.data; const payable = item.booking_status === 'PENDING_PAYMENT' && item.payment_status === 'UNPAID';
  return <Screen title="Pay booking advance" subtitle="Pay the advance to confirm your booking slot." bottom={payable ? <Button loading={pay.isPending} disabled={state === 'pending'} onPress={() => pay.mutate()}>Pay {money(item.advance_required)}</Button> : undefined}>
    <View style={styles.secure}><Ionicons name="shield-checkmark" size={35} color={colors.success} /><View style={{ flex: 1 }}><Text style={styles.secureTitle}>100% secure payment</Text><Text style={styles.secureBody}>Powered by Razorpay · UPI, cards, net banking and wallets</Text></View></View>
    <View style={styles.card}><Row label="Booking" value={item.booking_number} /><Row label="Service" value={item.service.name} /><Row label="Total" value={money(item.total_amount)} /><Row label="Advance due now" value={money(item.advance_required)} strong /><Row label="Balance after advance" value={money(Math.max(0, Number(item.total_amount) - Number(item.advance_required)))} /></View>
    {message ? <View style={[styles.message, state === 'cancelled' ? styles.cancelled : null]}><Text style={styles.messageText}>{message}</Text>{state === 'pending' ? <Text style={styles.hint}>Check My Bookings before trying again.</Text> : null}</View> : null}
    {!payable ? <MessageState title="Nothing to pay right now" message={`Booking: ${bookingStatusLabel(item.booking_status)} · Payment: ${paymentStatusLabel(item.payment_status)}`} actionLabel="View booking" onAction={() => router.replace({ pathname: '/booking/[id]', params: { id: item.id } })} /> : null}
  </Screen>;
}
function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) { return <View style={styles.row}><Text style={styles.rowLabel}>{label}</Text><Text style={[styles.rowValue, strong && styles.strong]}>{value}</Text></View>; }
const styles = StyleSheet.create({ secure: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg, backgroundColor: colors.successSoft, borderRadius: radius.card }, secureTitle: { color: colors.success, fontFamily: typography.bold, fontSize: 15 }, secureBody: { marginTop: 3, color: colors.body, fontFamily: typography.regular, fontSize: 12, lineHeight: 18 }, card: { padding: spacing.lg, gap: spacing.lg, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white }, row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.lg }, rowLabel: { flex: 1, color: colors.body, fontFamily: typography.medium, fontSize: 13 }, rowValue: { maxWidth: '56%', color: colors.heading, fontFamily: typography.semibold, fontSize: 13, textAlign: 'right' }, strong: { color: colors.primary, fontFamily: typography.extrabold, fontSize: 17 }, message: { padding: spacing.lg, backgroundColor: colors.warningSoft, borderRadius: radius.card }, cancelled: { backgroundColor: colors.dangerSoft }, messageText: { color: colors.heading, fontFamily: typography.semibold, fontSize: 13, lineHeight: 20 }, hint: { marginTop: spacing.sm, color: colors.body, fontFamily: typography.regular, fontSize: 12 } });
