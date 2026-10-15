import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Redirect, router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Screen } from '@/components/ui/screen';
import { LoadingState, MessageState } from '@/components/ui/states';
import { api } from '@/lib/api';
import { useAuth } from '@/stores/auth';
import { useBookingDraft } from '@/stores/booking';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import type { AddressInput } from '@/types/api';

const schema = z.object({ label: z.string().min(1), recipient_name: z.string().min(2), phone: z.string().regex(/^\+?[0-9]{10,13}$/, 'Enter a valid phone number'), address_line_1: z.string().min(5), address_line_2: z.string(), landmark: z.string(), locality: z.string(), city: z.string().min(2), state: z.string().min(2), postal_code: z.string().regex(/^\d{6}$/, 'Enter a 6-digit pincode'), country: z.string(), is_default: z.boolean() });
type Form = z.infer<typeof schema>;
export default function AddressScreen() {
  const user = useAuth((state) => state.user); const service = useBookingDraft((state) => state.service); const selected = useBookingDraft((state) => state.address); const setAddress = useBookingDraft((state) => state.setAddress); const client = useQueryClient();
  const list = useQuery({ queryKey: ['addresses'], queryFn: api.addresses.list, enabled: Boolean(user) });
  const { control, handleSubmit, reset } = useForm<Form>({ resolver: zodResolver(schema), defaultValues: { label: 'Home', recipient_name: user?.customer_profile?.display_name ?? '', phone: user?.phone_number ?? '+91', address_line_1: '', address_line_2: '', landmark: '', locality: '', city: 'Chennai', state: 'Tamil Nadu', postal_code: '', country: 'India', is_default: false } });
  const create = useMutation({ mutationFn: async (values: Form) => { const area = await api.serviceArea(values.postal_code); if (!area.is_supported) throw new Error('Purple Squad does not currently serve this pincode.'); return api.addresses.create(values as AddressInput); }, onSuccess: async (address) => { await client.invalidateQueries({ queryKey: ['addresses'] }); setAddress(address); reset(); }, onError: () => {} });
  if (!user) return <Redirect href={{ pathname: '/login', params: { returnTo: '/book/address' } }} />;
  if (!service) return <Redirect href="/(tabs)/categories" />;
  return <Screen title="Where should we visit?" subtitle={`Select or add a serviceable address for ${service.name}.`} bottom={<Button disabled={!selected} onPress={() => router.push('/book/slot')}>Continue to time slot</Button>}>
    {list.isLoading ? <LoadingState /> : list.isError ? <MessageState title="Couldn’t load addresses" message={list.error.message} actionLabel="Retry" onAction={() => void list.refetch()} /> : list.data?.results.map((address) => <Pressable key={address.id} onPress={() => setAddress(address)} style={[styles.address, selected?.id === address.id && styles.addressSelected]}><View style={styles.addressTop}><Text style={styles.addressLabel}>{address.label}</Text>{selected?.id === address.id ? <Text style={styles.selected}>SELECTED</Text> : null}</View><Text style={styles.addressBody}>{address.recipient_name}{'\n'}{address.address_line_1}{address.address_line_2 ? `, ${address.address_line_2}` : ''}{'\n'}{address.city} — {address.postal_code}</Text></Pressable>)}
    <View style={styles.divider}><View style={styles.line} /><Text style={styles.dividerText}>ADD A NEW ADDRESS</Text><View style={styles.line} /></View>
    {(['label','recipient_name','phone','address_line_1','address_line_2','landmark','locality','city','state','postal_code'] as const).map((name) => <Controller key={name} control={control} name={name} render={({ field, fieldState }) => <Field label={labels[name]} value={String(field.value)} onChangeText={field.onChange} keyboardType={name === 'postal_code' || name === 'phone' ? 'phone-pad' : 'default'} error={fieldState.error?.message} />} />)}
    {create.error ? <Text style={styles.error}>{create.error.message}</Text> : null}<Button variant="secondary" loading={create.isPending} onPress={handleSubmit((values) => create.mutate(values))}>Save and select address</Button>
  </Screen>;
}
const labels: Record<string, string> = { label: 'Label (Home, Work)', recipient_name: 'Recipient name', phone: 'Contact phone', address_line_1: 'House / flat and street', address_line_2: 'Address line 2 (optional)', landmark: 'Landmark (optional)', locality: 'Locality', city: 'City', state: 'State', postal_code: 'Pincode' };
const styles = StyleSheet.create({ address: { padding: spacing.lg, gap: spacing.sm, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white }, addressSelected: { borderWidth: 2, borderColor: colors.primary, backgroundColor: colors.primarySoft }, addressTop: { flexDirection: 'row', justifyContent: 'space-between' }, addressLabel: { color: colors.heading, fontFamily: typography.bold, fontSize: 16 }, selected: { color: colors.primary, fontFamily: typography.extrabold, fontSize: 9 }, addressBody: { color: colors.body, fontFamily: typography.regular, fontSize: 13, lineHeight: 20 }, divider: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm }, line: { flex: 1, height: 1, backgroundColor: colors.border }, dividerText: { color: colors.body, fontFamily: typography.bold, fontSize: 10 }, error: { color: colors.danger, fontFamily: typography.medium, fontSize: 13 } });
