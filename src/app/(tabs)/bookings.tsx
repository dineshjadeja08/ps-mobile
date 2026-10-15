import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { LoadingState, MessageState } from '@/components/ui/states';
import { api, money } from '@/lib/api';
import { useAuth } from '@/stores/auth';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function BookingsScreen() {
  const user = useAuth((state) => state.user);
  const bookings = useQuery({ queryKey: ['bookings'], queryFn: api.bookings.list, enabled: Boolean(user) });
  if (!user) return <Screen title="Your bookings" subtitle="Sign in to see upcoming visits, status updates and receipts."><Button onPress={() => router.push({ pathname: '/login', params: { returnTo: '/(tabs)/bookings' } })}>Sign in</Button></Screen>;
  return <Screen title="Your bookings" subtitle="Server-confirmed status and payment information." refreshing={bookings.isRefetching} onRefresh={() => void bookings.refetch()}>
    {bookings.isLoading ? <LoadingState /> : bookings.isError ? <MessageState title="Couldn’t load bookings" message={bookings.error.message} actionLabel="Retry" onAction={() => void bookings.refetch()} /> : bookings.data?.results.length ? bookings.data.results.map((booking) => <Pressable key={booking.id} onPress={() => router.push({ pathname: '/booking/[id]', params: { id: booking.id } })} style={styles.card}><View style={styles.top}><View style={{ flex: 1 }}><Text style={styles.service}>{booking.service.name}</Text><Text style={styles.number}>{booking.booking_number}</Text></View><Status value={booking.booking_status} /></View><Text style={styles.date}>{booking.service_date} · {booking.time_slot.start_time.slice(0, 5)}–{booking.time_slot.end_time.slice(0, 5)}</Text><View style={styles.total}><Text style={styles.meta}>Total</Text><Text style={styles.price}>{money(booking.total_amount)}</Text></View></Pressable>) : <MessageState title="No bookings yet" message="Choose a service and your preferred time to create your first booking." actionLabel="Browse services" onAction={() => router.push('/(tabs)/categories')} />}
  </Screen>;
}
function Status({ value }: { value: string }) { return <Text style={styles.status}>{value.replaceAll('_', ' ')}</Text>; }
const styles = StyleSheet.create({ card: { gap: spacing.md, padding: spacing.lg, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card }, top: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' }, service: { color: colors.heading, fontFamily: typography.bold, fontSize: 17 }, number: { marginTop: 3, color: colors.body, fontFamily: typography.medium, fontSize: 12 }, status: { maxWidth: 130, paddingHorizontal: 9, paddingVertical: 6, borderRadius: radius.pill, overflow: 'hidden', backgroundColor: colors.primarySoft, color: colors.primary, fontFamily: typography.bold, fontSize: 9 }, date: { color: colors.body, fontFamily: typography.medium, fontSize: 13 }, total: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: spacing.md, borderTopWidth: 1, borderColor: colors.border }, meta: { color: colors.body, fontFamily: typography.medium, fontSize: 12 }, price: { color: colors.heading, fontFamily: typography.extrabold, fontSize: 18 } });
