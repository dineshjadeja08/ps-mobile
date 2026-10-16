import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { colors } from '@/theme/tokens';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

// Checked in order; the first keyword found in the category slug or name wins.
const photos: [string[], number][] = [
  [['washing', 'washer', 'laundry'], require('../../assets/services/washing-machine.png')],
  [['dishwasher'], require('../../assets/services/dishwasher.png')],
  [['fridge', 'refrigerator'], require('../../assets/services/refrigerator.png')],
  [['purifier', ' ro', 'ro-'], require('../../assets/services/water-purifier.png')],
  [['tank'], require('../../assets/services/water-tank.png')],
  [['geyser', 'heater'], require('../../assets/services/geyser.png')],
  [['microwave', 'oven'], require('../../assets/services/microwave.png')],
  [['cctv', 'camera', 'security'], require('../../assets/services/cctv.png')],
  [['mosquito', 'net', 'mesh'], require('../../assets/services/mosquito-net.png')],
  [['sofa', 'upholster', 'furniture'], require('../../assets/services/sofa-repair.png')],
  [['tv', 'television'], require('../../assets/services/tv.png')],
  [['ac', 'air-con', 'air con', 'cooling'], require('../../assets/services/ac.png')],
];
const icons: [string[], IconName][] = [
  [['clean', 'housekeep', 'maid'], 'broom'],
  [['plumb', 'pipe', 'tap', 'leak'], 'pipe-wrench'],
  [['electric', 'wiring', 'switch', 'fan'], 'flash-outline'],
  [['paint'], 'format-paint'],
  [['pest', 'termite', 'cockroach'], 'bug-outline'],
  [['carpent', 'wood', 'door'], 'hammer-screwdriver'],
  [['car', 'vehicle', 'bike'], 'car-wash'],
  [['chimney', 'kitchen'], 'stove'],
  [['salon', 'beauty', 'spa'], 'face-woman-shimmer-outline'],
  [['garden', 'plant'], 'flower-outline'],
  [['appliance', 'repair'], 'tools'],
];

function matches(text: string, keywords: string[]) {
  return keywords.some((keyword) => keyword.trim().length <= 3
    ? new RegExp(`(^|[^a-z])${keyword.trim()}([^a-z]|$)`).test(text)
    : text.includes(keyword.trim()));
}

/** Picture for a service category: backend image, then a bundled photo, then a matching icon. */
export function CategoryArt({ category, size, style }: { category: { slug: string; name: string; image_url?: string }; size: number; style?: StyleProp<ViewStyle> }) {
  const text = `${category.slug} ${category.name}`.toLowerCase();
  if (category.image_url) return <View style={[styles.box, style]}><Image source={category.image_url} contentFit="contain" transition={150} style={StyleSheet.absoluteFill} /></View>;
  const photo = photos.find(([keywords]) => matches(text, keywords))?.[1];
  if (photo) return <View style={[styles.box, styles.photoBox, style]}><Image source={photo} contentFit="cover" transition={150} style={StyleSheet.absoluteFill} /></View>;
  const icon = icons.find(([keywords]) => matches(text, keywords))?.[1] ?? 'tools';
  return <View style={[styles.box, style]}><MaterialCommunityIcons name={icon} size={size} color={colors.primary} /></View>;
}

const styles = StyleSheet.create({
  box: { overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primarySoft },
  photoBox: { backgroundColor: '#F4F4F4' },
});
