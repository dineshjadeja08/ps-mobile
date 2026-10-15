import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { LoadingState, MessageState } from '@/components/ui/states';
import { api } from '@/lib/api';
import { colors, radius, spacing, typography } from '@/theme/tokens';

function localDate(offset: number) { const value = new Date(); value.setDate(value.getDate() + offset); return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`; }

export default function RescheduleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>(); const client = useQueryClient(); const dates = useMemo(() => Array.from({ length: 7 }, (_, index) => localDate(index)), []); const [date, setDate] = useState(dates[0]); const [slotId, setSlotId] = useState('');
  const booking = useQuery({ queryKey: ['booking', id], queryFn: () => api.bookings.get(id!), enabled: Boolean(id) });
  const postalCode = booking.data?.address_snapshot.postal_code ?? '';
  const slots = useQuery({ queryKey: ['reschedule-slots', booking.data?.service.id, postalCode, date], queryFn: () => api.slots(booking.data!.service.id, postalCode, date), enabled: Boolean(booking.data && postalCode) });
  const mutation = useMutation({ mutationFn: () => api.bookings.reschedule(id!, slotId), onSuccess: async (value) => { client.setQueryData(['booking', id], value); await client.invalidateQueries({ queryKey: ['bookings'] }); router.back(); } });
  if (booking.isLoading) return <Screen><LoadingState /></Screen>;
  if (booking.isError || !booking.data) return <Screen><MessageState title="Couldn’t load booking" message={booking.error?.message ?? 'Booking not found.'} /></Screen>;
  return <Screen title="Reschedule booking" subtitle="Choose a new live slot. The backend will enforce the rescheduling policy." bottom={<Button disabled={!slotId} loading={mutation.isPending} onPress={() => mutation.mutate()}>Confirm new time</Button>}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dates}>{dates.map((value) => <Pressable key={value} onPress={() => { setDate(value); setSlotId(''); }} style={[styles.date, date === value && styles.activeDate]}><Text style={[styles.dateText, date === value && styles.activeText]}>{new Date(`${value}T12:00:00`).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</Text></Pressable>)}</ScrollView>
    {slots.isLoading ? <LoadingState label="Checking available slots…" /> : slots.isError ? <MessageState title="Couldn’t load slots" message={slots.error.message} actionLabel="Retry" onAction={() => void slots.refetch()} /> : slots.data?.length ? <View style={styles.grid}>{slots.data.map((slot) => { const disabled = slot.available_capacity < 1; const active = slotId === slot.id; return <Pressable key={slot.id} disabled={disabled} onPress={() => setSlotId(slot.id)} style={[styles.slot, active && styles.activeSlot, disabled && styles.disabled]}><Text style={[styles.slotTime, active && styles.activeSlotText]}>{slot.start_time.slice(0, 5)}–{slot.end_time.slice(0, 5)}</Text><Text style={styles.capacity}>{disabled ? 'Full' : `${slot.available_capacity} available`}</Text></Pressable>; })}</View> : <MessageState title="No slots available" message="Try another date." />}
    {mutation.error ? <Text style={styles.error}>{mutation.error.message}</Text> : null}
  </Screen>;
}
const styles = StyleSheet.create({ dates: { gap: spacing.sm }, date: { minHeight: 48, justifyContent: 'center', paddingHorizontal: spacing.md, borderRadius: radius.button, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white }, activeDate: { borderColor: colors.primary, backgroundColor: colors.primary }, dateText: { color: colors.heading, fontFamily: typography.semibold, fontSize: 12 }, activeText: { color: colors.white }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }, slot: { width: '48.5%', minHeight: 66, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: radius.button, backgroundColor: colors.white }, activeSlot: { borderWidth: 2, borderColor: colors.primary, backgroundColor: colors.primarySoft }, disabled: { opacity: 0.4 }, slotTime: { color: colors.heading, fontFamily: typography.bold, fontSize: 13 }, activeSlotText: { color: colors.primary }, capacity: { marginTop: 3, color: colors.body, fontFamily: typography.medium, fontSize: 10 }, error: { color: colors.danger, fontFamily: typography.semibold, fontSize: 13 } });
