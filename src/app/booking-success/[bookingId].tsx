import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/button';
import { LoadingState, MessageState } from '@/components/ui/states';
import { api, money } from '@/lib/api';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function BookingSuccessScreen() {
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>(); const query = useQuery({ queryKey: ['booking', bookingId], queryFn: () => api.bookings.get(bookingId!), enabled: Boolean(bookingId) });
  if (query.isLoading) return <SafeAreaView style={styles.safe}><LoadingState /></SafeAreaView>;
  if (query.isError || !query.data) return <SafeAreaView style={styles.safe}><MessageState title="Couldn’t confirm booking" message={query.error?.message ?? 'Please check My Bookings.'} actionLabel="Open bookings" onAction={() => router.replace('/(tabs)/bookings')} /></SafeAreaView>;
  const booking = query.data; return <SafeAreaView style={styles.safe}><View style={styles.content}><View style={styles.icon}><Ionicons name="checkmark" size={62} color={colors.white} /></View><Text style={styles.title}>Booking confirmed</Text><Text style={styles.body}>Your verified payment has been recorded by Purple Squad.</Text><View style={styles.card}><Text style={styles.number}>{booking.booking_number}</Text><Text style={styles.service}>{booking.service.name}</Text><Text style={styles.detail}>{booking.service_date} · {booking.time_slot.start_time.slice(0,5)}–{booking.time_slot.end_time.slice(0,5)}</Text><Text style={styles.advance}>Advance paid: {money(booking.advance_paid)}</Text></View></View><View style={styles.actions}><Button onPress={() => router.replace({ pathname: '/booking/[id]', params: { id: booking.id } })}>View booking</Button><Button variant="secondary" onPress={() => router.replace('/(tabs)')}>Back to home</Button></View></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1, padding: spacing.lg, backgroundColor: colors.background }, content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md }, icon: { width: 112, height: 112, borderRadius: 56, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.success }, title: { color: colors.heading, fontFamily: typography.extrabold, fontSize: 30, textAlign: 'center' }, body: { color: colors.body, fontFamily: typography.regular, fontSize: 15, textAlign: 'center', lineHeight: 22 }, card: { alignSelf: 'stretch', alignItems: 'center', gap: spacing.sm, padding: spacing.xl, marginTop: spacing.lg, backgroundColor: colors.white, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border }, number: { color: colors.primary, fontFamily: typography.extrabold, fontSize: 12 }, service: { color: colors.heading, fontFamily: typography.bold, fontSize: 19, textAlign: 'center' }, detail: { color: colors.body, fontFamily: typography.medium, fontSize: 13 }, advance: { color: colors.success, fontFamily: typography.bold, fontSize: 14 }, actions: { gap: spacing.sm } });
