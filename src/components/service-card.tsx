import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { money } from '@/lib/api';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import type { Service } from '@/types/api';
import { useT } from '@/i18n';

const fallbacks: Record<string, number> = {
  ac: require('../../assets/services/ac.png'),
  'washing-machine': require('../../assets/services/washing-machine.png'),
  refrigerator: require('../../assets/services/refrigerator.png'),
  'water-purifier': require('../../assets/services/water-purifier.png'),
  tv: require('../../assets/services/tv.png'),
  geyser: require('../../assets/services/geyser.png'),
  microwave: require('../../assets/services/microwave.png'),
  dishwasher: require('../../assets/services/dishwasher.png'),
  chimney: require('../../assets/services/ac.png'),
  'water-tank': require('../../assets/services/water-tank.png'),
  'sofa-repair': require('../../assets/services/sofa-repair.png'),
  'mosquito-net': require('../../assets/services/mosquito-net.png'),
};

export function ServiceCard({ service }: { service: Service }) {
  const t = useT();
  const image = service.list_image || service.landing_thumbnail || service.cover_image || fallbacks[service.category.slug] || fallbacks[service.slug.split('-')[0]] || fallbacks.ac;
  return <Pressable accessibilityRole="button" onPress={() => router.push({ pathname: '/service/[slug]', params: { slug: service.slug } })} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
    <View style={styles.imageFrame}><Image source={image} contentFit="cover" style={styles.image} transition={150} /><View style={styles.duration}><Ionicons name="time-outline" size={15} color={colors.primary} /><Text style={styles.durationText}>{service.estimated_duration_minutes} min</Text></View></View>
    <View style={styles.content}>
      <Text numberOfLines={2} style={styles.name}>{service.name}</Text>
      <Text numberOfLines={2} style={styles.description}>{service.short_description}</Text>
      <View style={styles.meta}><View style={styles.metaItem}><Ionicons name="shield-checkmark-outline" size={14} color={colors.success} /><Text style={styles.metaText}>{t('verified')}</Text></View><View style={styles.metaItem}><Ionicons name="checkmark-circle-outline" size={14} color={colors.primary} /><Text style={styles.metaText}>Quality assured</Text></View></View>
      <View style={styles.bottom}><View><Text style={styles.from}>{t('startsAt')}</Text><Text style={styles.price}>{money(service.effective_price)}</Text></View><View style={styles.addButton}><Text style={styles.addText}>Book service</Text><Ionicons name="arrow-forward" size={15} color={colors.white} /></View></View>
    </View>
  </Pressable>;
}

const styles = StyleSheet.create({
  card: { overflow: 'hidden', backgroundColor: colors.white, borderRadius: 22, borderWidth: 1, borderColor: colors.border, shadowColor: '#241535', shadowOpacity: 0.08, shadowRadius: 13, shadowOffset: { width: 0, height: 6 }, elevation: 3 },
  pressed: { opacity: 0.78 },
  imageFrame: { position: 'relative' },
  image: { width: '100%', aspectRatio: 1.52, backgroundColor: colors.primarySoft },
  duration: { position: 'absolute', right: spacing.md, bottom: spacing.md, flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.pill, backgroundColor: colors.white },
  durationText: { color: colors.primary, fontFamily: typography.bold, fontSize: 12 },
  content: { minWidth: 0, padding: 18 },
  name: { color: colors.heading, fontFamily: typography.extrabold, fontSize: 20, lineHeight: 26 },
  description: { marginTop: 4, color: colors.body, fontFamily: typography.regular, fontSize: 13, lineHeight: 19 },
  meta: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.sm },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: colors.body, fontFamily: typography.medium, fontSize: 10 },
  bottom: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderColor: colors.border },
  from: { color: colors.muted, fontFamily: typography.medium, fontSize: 9 },
  price: { color: colors.heading, fontFamily: typography.extrabold, fontSize: 17 },
  addButton: { minHeight: 42, minWidth: 122, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingHorizontal: spacing.md, borderRadius: radius.pill, backgroundColor: colors.primary },
  addText: { color: colors.white, fontFamily: typography.bold, fontSize: 12 },
});
