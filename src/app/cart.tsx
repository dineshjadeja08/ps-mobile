import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Redirect, router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { LoadingState, MessageState } from '@/components/ui/states';
import { api, money } from '@/lib/api';
import { useAuth } from '@/stores/auth';
import { useBookingDraft } from '@/stores/booking';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import type { Cart } from '@/types/api';

export default function CartScreen() {
  const user = useAuth((state) => state.user); const setService = useBookingDraft((state) => state.setService); const client = useQueryClient();
  const cart = useQuery({ queryKey: ['cart'], queryFn: api.cart.get, enabled: Boolean(user) });
  const sync = (data: Cart) => client.setQueryData(['cart'], data);
  const quantity = useMutation({ mutationFn: ({ id, value }: { id: string; value: number }) => api.cart.quantity(id, value), onSuccess: sync });
  const remove = useMutation({ mutationFn: api.cart.remove, onSuccess: sync });
  const choose = useMutation({ mutationFn: api.catalogue.service, onSuccess: (service) => { setService(service); router.push('/book/address'); } });
  if (!user) return <Redirect href={{ pathname: '/login', params: { returnTo: '/cart' } }} />;
  const data = cart.data;
  return <Screen title="My Cart" subtitle="Review your services and choose an address and time." refreshing={cart.isRefetching} onRefresh={() => void cart.refetch()}>
    {cart.isLoading ? <LoadingState label="Loading your cart…" /> : cart.isError ? <MessageState title="Couldn’t load your cart" message={cart.error.message} actionLabel="Retry" onAction={() => void cart.refetch()} /> : !data?.items.length ? <MessageState title="Your cart is empty" message="Save a service here and return when you are ready to schedule it." actionLabel="Browse services" onAction={() => router.replace('/(tabs)/categories')} /> : <>
      {data.items.map((item) => <View key={item.id} style={styles.item}>
        <View style={styles.itemTop}><View style={styles.serviceIcon}><Ionicons name="construct-outline" size={22} color={colors.primary} /></View><View style={styles.itemCopy}><Text style={styles.itemName}>{item.name}</Text><Text style={styles.itemPrice}>{money(item.price)} · Advance {money(item.advance)}</Text>{!item.available ? <Text style={styles.unavailable}>Currently unavailable</Text> : null}</View><Pressable accessibilityLabel={`Remove ${item.name}`} onPress={() => remove.mutate(item.id)} hitSlop={10}><Ionicons name="trash-outline" size={20} color={colors.danger} /></Pressable></View>
        <View style={styles.itemBottom}><View style={styles.stepper}><Pressable disabled={item.quantity <= 1 || quantity.isPending} onPress={() => quantity.mutate({ id: item.id, value: item.quantity - 1 })} style={styles.step}><Ionicons name="remove" size={18} color={colors.primary} /></Pressable><Text style={styles.quantity}>{item.quantity}</Text><Pressable disabled={item.quantity >= 20 || quantity.isPending} onPress={() => quantity.mutate({ id: item.id, value: item.quantity + 1 })} style={styles.step}><Ionicons name="add" size={18} color={colors.primary} /></Pressable></View><Pressable disabled={!item.available || choose.isPending} onPress={() => choose.mutate(item.slug)} style={styles.schedule}><Text style={styles.scheduleText}>Choose address & time</Text><Ionicons name="chevron-forward" size={15} color={colors.white} /></Pressable></View>
      </View>)}
      <View style={styles.total}><Row label="Service total" value={money(data.total)} /><Row label="Advance due at booking" value={money(data.advance_total)} strong /></View>
      <Text style={styles.note}>Each service needs its own live time slot. Select an item above to complete its booking safely.</Text>
      <Button variant="secondary" onPress={() => router.push('/(tabs)/categories')}>Add another service</Button>
    </>}
  </Screen>;
}
function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) { return <View style={styles.row}><Text style={[styles.rowLabel, strong && styles.strong]}>{label}</Text><Text style={[styles.rowValue, strong && styles.strong]}>{value}</Text></View>; }
const styles = StyleSheet.create({ item: { gap: spacing.md, padding: spacing.lg, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white, shadowColor: '#241535', shadowOpacity: 0.07, shadowRadius: 10, shadowOffset: { width: 0, height: 5 }, elevation: 2 }, itemTop: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md }, serviceIcon: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: colors.primarySoft }, itemCopy: { flex: 1 }, itemName: { color: colors.heading, fontFamily: typography.bold, fontSize: 15 }, itemPrice: { marginTop: 3, color: colors.body, fontFamily: typography.medium, fontSize: 11 }, unavailable: { marginTop: 4, color: colors.danger, fontFamily: typography.bold, fontSize: 11 }, itemBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md }, stepper: { flexDirection: 'row', alignItems: 'center', overflow: 'hidden', borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border }, step: { width: 38, height: 36, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primarySoft }, quantity: { minWidth: 36, color: colors.heading, fontFamily: typography.bold, textAlign: 'center' }, schedule: { minHeight: 40, flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: spacing.md, borderRadius: radius.pill, backgroundColor: colors.primary }, scheduleText: { color: colors.white, fontFamily: typography.bold, fontSize: 11 }, total: { gap: spacing.sm, padding: spacing.lg, borderRadius: radius.card, backgroundColor: colors.primarySoft }, row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.lg }, rowLabel: { color: colors.body, fontFamily: typography.medium, fontSize: 13 }, rowValue: { color: colors.heading, fontFamily: typography.bold, fontSize: 13 }, strong: { color: colors.primary, fontFamily: typography.extrabold, fontSize: 15 }, note: { color: colors.body, fontFamily: typography.regular, fontSize: 12, lineHeight: 18 } });
