import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ServiceCard } from '@/components/service-card';
import { Screen } from '@/components/ui/screen';
import { LoadingState, MessageState } from '@/components/ui/states';
import { api } from '@/lib/api';
import { useT } from '@/i18n';
import { useAuth } from '@/stores/auth';
import { colors, radius, spacing, typography } from '@/theme/tokens';

const iconNames = ['sparkles-outline', 'construct-outline', 'hardware-chip-outline', 'water-outline', 'shield-checkmark-outline', 'car-outline', 'color-palette-outline', 'home-outline', 'ellipsis-horizontal'] as const;

export default function HomeScreen() {
  const t = useT();
  const params = useLocalSearchParams<{ pincode?: string; address?: string }>();
  const user = useAuth((state) => state.user);
  const [search, setSearch] = useState('');
  const postalCode = params.pincode ?? '';
  const locationMessage = params.address ?? '';
  const categories = useQuery({ queryKey: ['categories'], queryFn: api.catalogue.categories });
  const services = useQuery({ queryKey: ['services', 'home'], queryFn: () => api.catalogue.services({ page_size: 12 }) });
  const area = useQuery({ queryKey: ['service-area', postalCode], queryFn: () => api.serviceArea(postalCode), enabled: postalCode.length === 6, retry: false });
  const cart = useQuery({ queryKey: ['cart'], queryFn: api.cart.get, enabled: Boolean(user) });
  const visibleServices = useMemo(() => {
    const items = services.data?.results ?? [];
    const term = search.trim().toLowerCase();
    return term ? items.filter((item) => `${item.name} ${item.category.name} ${item.short_description}`.toLowerCase().includes(term)) : items.filter((item) => item.is_popular || item.is_featured).slice(0, 6).length ? items.filter((item) => item.is_popular || item.is_featured).slice(0, 6) : items.slice(0, 6);
  }, [search, services.data]);

  const categoryItems = categories.data?.slice(0, 8) ?? [];
  return <Screen refreshing={categories.isRefetching || services.isRefetching} onRefresh={() => void Promise.all([categories.refetch(), services.refetch()])}>
    <View style={styles.topbar}>
      <Image source={require('../../../assets/brand/logo.png')} contentFit="contain" style={styles.logo} />
      <View style={styles.locationBlock}>
        <View style={styles.locationLine}><Ionicons name="location" size={18} color={colors.primary} /><Text style={styles.locationLabel}>{t('serviceLocation').toUpperCase()}</Text></View>
        <Pressable onPress={() => router.push('/location-search')} style={styles.addressButton}><Text numberOfLines={1} style={styles.address}>{locationMessage || (postalCode ? `Pincode ${postalCode}` : t('chooseLocation'))}</Text><Ionicons name="chevron-down" size={16} color={colors.heading} /></Pressable>
      </View>
      <Pressable accessibilityLabel="Open cart" onPress={() => router.push(user ? '/cart' : { pathname: '/login', params: { returnTo: '/cart' } })} style={styles.cartButton}><Ionicons name="bag-handle-outline" size={22} color={colors.heading} />{cart.data?.count ? <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>{cart.data.count > 9 ? '9+' : cart.data.count}</Text></View> : null}</Pressable>
    </View>

    {area.data ? <Text style={[styles.areaMessage, { color: area.data.is_supported ? colors.success : colors.danger }]}>{area.data.is_supported ? `${t('availableIn')} ${area.data.service_area?.name ?? postalCode}` : t('unavailableArea')}</Text> : null}

    <View style={styles.hero}>
      <Image source={require('../../../assets/images/welcome-hero.png')} contentFit="cover" contentPosition="center" style={styles.heroImage} />
      <View style={styles.heroShade} />
      <View style={styles.heroCopy}>
        <Text style={styles.heroEyebrow}>PURPLE SQUAD HOME CARE</Text>
        <Text style={styles.heroTitle}>Expert service,{`\n`}right at your doorstep.</Text>
        <View style={styles.heroTrust}><Ionicons name="shield-checkmark" size={15} color={colors.white} /><Text style={styles.heroTrustText}>Verified professionals · Clear pricing</Text></View>
      </View>
    </View>

    <View style={styles.searchBox}><Ionicons name="search" size={21} color={colors.muted} /><TextInput value={search} onChangeText={setSearch} placeholder={t('searchPlaceholder')} placeholderTextColor={colors.muted} style={styles.searchInput} /><Ionicons name="options-outline" size={20} color={colors.primary} /></View>

    {search ? <>
      <SectionTitle title={t('searchResults')} action={t('clear')} onPress={() => setSearch('')} />
      {services.isLoading ? <LoadingState /> : visibleServices.length ? visibleServices.map((service) => <ServiceCard key={service.id} service={service} />) : <MessageState title={t('noMatches')} message={t('tryAnother')} />}
    </> : <>
      <SectionTitle title="Our Services" action={t('seeAll')} onPress={() => router.push('/(tabs)/categories')} />
      {categories.isLoading ? <LoadingState /> : categories.isError ? <MessageState title="Couldn’t load services" message={categories.error.message} actionLabel="Retry" onAction={() => void categories.refetch()} /> : <View style={styles.categoryGrid}>
        {categoryItems.map((category, index) => <Pressable key={category.id} onPress={() => router.push({ pathname: '/(tabs)/categories', params: { category: category.slug } })} style={styles.category}>
          <View style={styles.categoryArt}>{category.image_url ? <Image source={category.image_url} style={styles.categoryImage} contentFit="contain" /> : <Ionicons name={iconNames[index % iconNames.length]} size={30} color={colors.primary} />}</View>
          <Text numberOfLines={2} style={styles.categoryName}>{category.name}</Text>
        </Pressable>)}
        <Pressable onPress={() => router.push('/(tabs)/categories')} style={styles.category}><View style={styles.categoryArt}><Ionicons name="grid-outline" size={29} color={colors.primary} /></View><Text style={styles.categoryName}>{t('viewAll')}</Text></Pressable>
      </View>}

      <View style={styles.assurance}><Assurance icon="shield-checkmark-outline" label={t('verifiedPros')} /><Assurance icon="pricetag-outline" label={t('upfrontPrice')} /><Assurance icon="calendar-outline" label={t('easyBooking')} /></View>
      <SectionTitle title="Trending Near You" action={t('seeAll')} onPress={() => router.push('/(tabs)/categories')} />
      {services.isLoading ? <LoadingState /> : services.isError ? <MessageState title="Couldn’t load services" message={services.error.message} actionLabel="Retry" onAction={() => void services.refetch()} /> : visibleServices.map((service) => <ServiceCard key={service.id} service={service} />)}
    </>}
  </Screen>;
}

function SectionTitle({ title, action, onPress }: { title: string; action?: string; onPress?: () => void }) {
  return <View style={styles.sectionTitle}><Text style={styles.sectionText}>{title}</Text>{action ? <Pressable onPress={onPress}><Text style={styles.action}>{action}</Text></Pressable> : null}</View>;
}
function Assurance({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return <View style={styles.assuranceItem}><Ionicons name={icon} size={21} color={colors.primary} /><Text style={styles.assuranceText}>{label}</Text></View>;
}

const styles = StyleSheet.create({
  topbar: { minHeight: 56, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  logo: { width: 44, height: 44, borderRadius: 12 },
  locationBlock: { flex: 1, minWidth: 0 },
  locationLine: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationLabel: { color: colors.primary, fontFamily: typography.extrabold, fontSize: 9, letterSpacing: 1 },
  addressButton: { maxWidth: '92%', flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  address: { maxWidth: '90%', color: colors.heading, fontFamily: typography.bold, fontSize: 15 },
  cartButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 14, backgroundColor: colors.white, shadowColor: '#251436', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  cartBadge: { position: 'absolute', top: -3, right: -2, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4, borderRadius: 9, backgroundColor: colors.accent, borderWidth: 2, borderColor: colors.background },
  cartBadgeText: { color: colors.white, fontFamily: typography.extrabold, fontSize: 8 },
  areaMessage: { marginTop: -10, fontFamily: typography.semibold, fontSize: 11 },
  hero: { position: 'relative', height: 176, overflow: 'hidden', borderRadius: 22, backgroundColor: '#261432' },
  heroImage: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  heroShade: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(24,10,35,0.48)' },
  heroCopy: { flex: 1, justifyContent: 'center', paddingHorizontal: 20, paddingBottom: 12 },
  heroEyebrow: { color: '#E5D1FF', fontFamily: typography.extrabold, fontSize: 9, letterSpacing: 1.2 },
  heroTitle: { marginTop: 7, color: colors.white, fontFamily: typography.extrabold, fontSize: 23, lineHeight: 29, letterSpacing: -0.4 },
  heroTrust: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
  heroTrustText: { color: colors.white, fontFamily: typography.semibold, fontSize: 10 },
  searchBox: { minHeight: 56, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: -42, marginHorizontal: spacing.md, paddingHorizontal: spacing.md, borderRadius: radius.pill, backgroundColor: colors.white, borderWidth: 1, borderColor: '#E1DFE7', shadowColor: '#21112E', shadowOpacity: 0.13, shadowRadius: 12, shadowOffset: { width: 0, height: 5 }, elevation: 5 },
  searchInput: { flex: 1, color: colors.heading, fontFamily: typography.regular, fontSize: 14 },
  sectionTitle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.xs },
  sectionText: { color: colors.heading, fontFamily: typography.extrabold, fontSize: 20, letterSpacing: -0.3 },
  action: { color: colors.primary, fontFamily: typography.bold, fontSize: 12 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingVertical: spacing.sm, borderRadius: radius.card, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border },
  category: { width: '25%', alignItems: 'center', gap: 6, paddingHorizontal: 3, paddingVertical: 9 },
  categoryArt: { width: 62, height: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: colors.primarySoft },
  categoryImage: { width: 54, height: 48 },
  categoryName: { minHeight: 28, color: colors.heading, fontFamily: typography.semibold, fontSize: 10, lineHeight: 14, textAlign: 'center' },
  assurance: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.md, paddingHorizontal: spacing.sm, borderRadius: 16, backgroundColor: colors.primarySoft },
  assuranceItem: { flex: 1, alignItems: 'center', gap: 5 },
  assuranceText: { color: colors.heading, fontFamily: typography.semibold, fontSize: 10 },
});
