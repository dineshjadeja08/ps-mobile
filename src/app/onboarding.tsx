import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { onboardingStorage } from '@/lib/session';
import { colors, radius, spacing, typography } from '@/theme/tokens';

const services = [
  ['construct-outline', 'Appliances'], ['sparkles-outline', 'Beauty'], ['cut-outline', 'Hair care'], ['hammer-outline', 'Carpenter'],
  ['bug-outline', 'Pest control'], ['water-outline', 'Cleaning'], ['build-outline', 'Plumbing'], ['flash-outline', 'Electrician'],
] as const;

export default function OnboardingScreen() {
  const open = async (route: '/register' | '/login') => { await onboardingStorage.complete(); router.push(route); };
  return <ImageBackground source={require('../../assets/images/welcome-hero.png')} resizeMode="cover" style={styles.background}>
    <View style={styles.scrim} />
    <SafeAreaView style={styles.safe}>
      <View style={styles.heroCopy}><Image source={require('../../assets/brand/logo.png')} contentFit="contain" style={styles.logo} /><Text style={styles.heroTitle}>Premium care for{`\n`}your <Text style={styles.heroAccent}>home.</Text></Text><View style={styles.rule} /><Text style={styles.heroBody}>Book trusted Purple Squad professionals{`\n`}when you need them.</Text></View>
      <View style={styles.sheet}><View style={styles.grid}>{services.map(([icon, label]) => <View key={label} style={styles.service}><View style={styles.serviceIcon}><Ionicons name={icon} size={25} color={colors.primary} /></View><Text numberOfLines={1} style={styles.serviceLabel}>{label}</Text></View>)}</View>
        <View style={styles.trust}><Trust icon="shield-checkmark" label="Verified professionals" /><Trust icon="time" label="On-time service" /><Trust icon="star-outline" label="Trusted care" /></View>
        <Pressable onPress={() => void open('/register')} style={styles.primary}><Text style={styles.primaryText}>Register</Text></Pressable>
        <Pressable onPress={() => void open('/login')} style={styles.secondary}><Text style={styles.secondaryText}>Log In</Text></Pressable>
      </View>
    </SafeAreaView>
  </ImageBackground>;
}
function Trust({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) { return <View style={styles.trustItem}><Ionicons name={icon} size={21} color={colors.primary} /><Text style={styles.trustLabel}>{label}</Text></View>; }
const styles = StyleSheet.create({ background: { flex: 1, backgroundColor: '#21172B' }, scrim: { position: 'absolute', inset: 0, backgroundColor: 'rgba(17,9,25,0.25)' }, safe: { flex: 1, justifyContent: 'space-between' }, heroCopy: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg }, logo: { width: 58, height: 58, borderRadius: radius.button }, heroTitle: { marginTop: spacing.md, color: colors.white, fontFamily: typography.bold, fontSize: 28, lineHeight: 36 }, heroAccent: { color: '#C7A6F2' }, rule: { width: 42, height: 3, marginVertical: spacing.md, borderRadius: 2, backgroundColor: colors.white }, heroBody: { color: colors.white, fontFamily: typography.regular, fontSize: 14, lineHeight: 21 }, sheet: { gap: spacing.md, margin: spacing.md, padding: spacing.lg, borderRadius: 30, backgroundColor: colors.white, shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 8 }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 8, borderRadius: 20, borderWidth: 1, borderColor: colors.border, backgroundColor: '#FCFCFD' }, service: { width: '22.8%', alignItems: 'center', gap: 5, paddingVertical: 7, borderRadius: radius.button, backgroundColor: colors.white }, serviceIcon: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22, backgroundColor: colors.primarySoft }, serviceLabel: { width: '100%', color: colors.heading, fontFamily: typography.semibold, fontSize: 9, textAlign: 'center' }, trust: { flexDirection: 'row', paddingVertical: spacing.md, borderRadius: radius.card, backgroundColor: colors.primarySoft }, trustItem: { flex: 1, alignItems: 'center', gap: 4, paddingHorizontal: 3 }, trustLabel: { color: colors.heading, fontFamily: typography.medium, fontSize: 9, textAlign: 'center' }, primary: { minHeight: 54, alignItems: 'center', justifyContent: 'center', borderRadius: radius.pill, backgroundColor: colors.primary }, primaryText: { color: colors.white, fontFamily: typography.semibold, fontSize: 17 }, secondary: { minHeight: 54, alignItems: 'center', justifyContent: 'center', borderRadius: radius.pill, borderWidth: 1.5, borderColor: colors.primary, backgroundColor: colors.white }, secondaryText: { color: colors.primary, fontFamily: typography.semibold, fontSize: 17 } });
