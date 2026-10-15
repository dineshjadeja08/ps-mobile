import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { LoadingState, MessageState } from '@/components/ui/states';
import { api, money } from '@/lib/api';
import { useAuth } from '@/stores/auth';
import { useBookingDraft } from '@/stores/booking';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function ServiceDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>(); const user = useAuth((state) => state.user); const setService = useBookingDraft((state) => state.setService);
  const client = useQueryClient();
  const query = useQuery({ queryKey: ['service', slug], queryFn: () => api.catalogue.service(slug!), enabled: Boolean(slug) });
  const addToCart = useMutation({ mutationFn: () => { if (!query.data) throw new Error('Service is still loading.'); return api.cart.add(query.data.id); }, onSuccess: (cart) => client.setQueryData(['cart'], cart) });
  if (query.isLoading) return <Screen><LoadingState label="Loading service…" /></Screen>;
  if (query.isError || !query.data) return <Screen><MessageState title="Service unavailable" message={query.error?.message ?? 'This service could not be found.'} actionLabel="Try again" onAction={() => void query.refetch()} /></Screen>;
  const service = query.data; const image = service.cover_image || service.popup_cover_image || service.list_image;
  const startBooking = () => { setService(service); if (!user) router.push({ pathname: '/login', params: { returnTo: '/book/address' } }); else router.push('/book/address'); };
  const saveToCart = () => { if (!user) { router.push({ pathname: '/login', params: { returnTo: `/service/${service.slug}` } }); return; } addToCart.mutate(); };
  return <Screen bottom={<View style={styles.actions}><Button variant="secondary" loading={addToCart.isPending} onPress={saveToCart}>{addToCart.isSuccess ? 'Added to cart' : 'Add to cart'}</Button><Button onPress={startBooking}>Book for {money(service.effective_price)}</Button></View>}>
    {image ? <Image source={image} contentFit="cover" style={styles.image} transition={200} /> : <View style={styles.placeholder}><Ionicons name="construct-outline" size={64} color={colors.primary} /></View>}
    <View style={styles.priceStrip}><View><Text style={styles.price}>{money(service.effective_price)}</Text><Text style={styles.meta}>Purple Squad service price</Text></View>{Number(service.base_price) > Number(service.effective_price) ? <View style={styles.saving}><Text style={styles.oldPrice}>{money(service.base_price)}</Text><Text style={styles.savingText}>You save {money(Number(service.base_price) - Number(service.effective_price))}</Text></View> : null}</View>
    <View><Text style={styles.category}>{service.category.name}</Text><Text accessibilityRole="header" style={styles.title}>{service.name}</Text><Text style={styles.description}>{service.short_description}</Text></View>
    <View style={styles.metrics}><Metric icon="time-outline" value={`${service.estimated_duration_minutes} min`} /><Metric icon="shield-checkmark-outline" value="Verified pro" /><Metric icon="receipt-outline" value="Clear price" /></View>
    <View style={styles.priceCard}><View><Text style={styles.meta}>Advance due now</Text><Text style={styles.advance}>{money(service.advance_amount)}</Text></View><View style={styles.trust}><Ionicons name="shield-checkmark" size={18} color={colors.success} /><Text style={styles.trustText}>Secure booking</Text></View></View>
    {addToCart.error ? <Text style={styles.error}>{addToCart.error.message}</Text> : null}
    <Copy title="About this service" body={service.description || service.short_description} /><Copy title="What’s included" body={service.whats_included} />{service.whats_excluded ? <Copy title="What’s not included" body={service.whats_excluded} /> : null}{service.important_notes ? <Copy title="Important notes" body={service.important_notes} /> : null}
  </Screen>;
}
function Metric({ icon, value }: { icon: keyof typeof Ionicons.glyphMap; value: string }) { return <View style={styles.metric}><Ionicons name={icon} size={20} color={colors.primary} /><Text style={styles.metricText}>{value}</Text></View>; }
function Copy({ title, body }: { title: string; body: string }) { return <View style={styles.copy}><Text style={styles.copyTitle}>{title}</Text><Text style={styles.copyBody}>{body}</Text></View>; }
const styles = StyleSheet.create({ image: { width: '100%', aspectRatio: 1.55, borderRadius: radius.card, backgroundColor: colors.primarySoft }, placeholder: { width: '100%', aspectRatio: 1.55, borderRadius: radius.card, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }, priceStrip: { marginTop: -30, marginHorizontal: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white }, saving: { alignItems: 'flex-end' }, oldPrice: { color: colors.muted, fontFamily: typography.medium, fontSize: 11, textDecorationLine: 'line-through' }, savingText: { color: colors.success, fontFamily: typography.bold, fontSize: 10 }, category: { color: colors.primary, fontFamily: typography.extrabold, fontSize: 11, letterSpacing: 1 }, title: { marginTop: 5, color: colors.heading, fontFamily: typography.extrabold, fontSize: 27, lineHeight: 33 }, description: { marginTop: spacing.sm, color: colors.body, fontFamily: typography.regular, fontSize: 15, lineHeight: 23 }, metrics: { flexDirection: 'row', gap: spacing.sm }, metric: { flex: 1, minHeight: 76, alignItems: 'center', justifyContent: 'center', gap: 6, padding: 6, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: radius.button }, metricText: { color: colors.heading, fontFamily: typography.semibold, fontSize: 10, textAlign: 'center' }, priceCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.lg, borderRadius: radius.card, backgroundColor: colors.primarySoft }, meta: { color: colors.body, fontFamily: typography.medium, fontSize: 11 }, price: { color: colors.heading, fontFamily: typography.extrabold, fontSize: 24 }, advance: { marginTop: 3, color: colors.primary, fontFamily: typography.extrabold, fontSize: 20 }, trust: { flexDirection: 'row', alignItems: 'center', gap: 5 }, trustText: { color: colors.success, fontFamily: typography.bold, fontSize: 11 }, actions: { gap: spacing.sm }, error: { color: colors.danger, fontFamily: typography.semibold, fontSize: 13 }, copy: { gap: spacing.sm, paddingTop: spacing.sm }, copyTitle: { color: colors.heading, fontFamily: typography.bold, fontSize: 18 }, copyBody: { color: colors.body, fontFamily: typography.regular, fontSize: 14, lineHeight: 23 } });
