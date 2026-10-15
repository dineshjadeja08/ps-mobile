import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Redirect } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/ui/screen';
import { LoadingState, MessageState } from '@/components/ui/states';
import { api } from '@/lib/api';
import { useAuth } from '@/stores/auth';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function AddressesScreen() {
  const user = useAuth((state) => state.user); const client = useQueryClient();
  const list = useQuery({ queryKey: ['addresses'], queryFn: api.addresses.list, enabled: Boolean(user) });
  const remove = useMutation({ mutationFn: api.addresses.remove, onSuccess: () => client.invalidateQueries({ queryKey: ['addresses'] }) });
  if (!user) return <Redirect href={{ pathname: '/login', params: { returnTo: '/addresses' } }} />;
  return <Screen subtitle="Addresses are also selectable when you book a service." refreshing={list.isRefetching} onRefresh={() => void list.refetch()}>
    {list.isLoading ? <LoadingState /> : list.isError ? <MessageState title="Couldn’t load addresses" message={list.error.message} actionLabel="Retry" onAction={() => void list.refetch()} /> : list.data?.results.length ? list.data.results.map((address) => <View key={address.id} style={styles.card}><View style={styles.top}><View style={styles.icon}><Ionicons name={address.label.toLowerCase().includes('work') ? 'business-outline' : 'home-outline'} size={21} color={colors.primary} /></View><View style={styles.copy}><View style={styles.labelLine}><Text style={styles.label}>{address.label}</Text>{address.is_default ? <Text style={styles.default}>DEFAULT</Text> : null}</View><Text style={styles.address}>{address.recipient_name}{'\n'}{address.address_line_1}{address.address_line_2 ? `, ${address.address_line_2}` : ''}{'\n'}{address.locality ? `${address.locality}, ` : ''}{address.city} — {address.postal_code}</Text><Text style={styles.phone}>{address.phone}</Text></View><Pressable accessibilityLabel={`Delete ${address.label}`} hitSlop={10} onPress={() => Alert.alert('Delete this address?', 'This does not affect existing bookings.', [{ text: 'Keep address', style: 'cancel' }, { text: 'Delete', style: 'destructive', onPress: () => remove.mutate(address.id) }])}><Ionicons name="trash-outline" size={20} color={colors.danger} /></Pressable></View></View>) : <MessageState title="No saved addresses" message="Choose a service to add and validate your first service address." />}
    {remove.error ? <Text style={styles.error}>{remove.error.message}</Text> : null}
  </Screen>;
}
const styles = StyleSheet.create({ card: { padding: spacing.lg, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, backgroundColor: colors.white }, top: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md }, icon: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 21, backgroundColor: colors.primarySoft }, copy: { flex: 1 }, labelLine: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm }, label: { color: colors.heading, fontFamily: typography.bold, fontSize: 16 }, default: { paddingHorizontal: 7, paddingVertical: 3, overflow: 'hidden', borderRadius: radius.pill, backgroundColor: colors.primarySoft, color: colors.primary, fontFamily: typography.extrabold, fontSize: 8 }, address: { marginTop: spacing.sm, color: colors.body, fontFamily: typography.regular, fontSize: 13, lineHeight: 20 }, phone: { marginTop: spacing.sm, color: colors.heading, fontFamily: typography.semibold, fontSize: 12 }, error: { color: colors.danger, fontFamily: typography.semibold, fontSize: 13 } });
