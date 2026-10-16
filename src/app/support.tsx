import { Ionicons } from '@expo/vector-icons';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function SupportScreen() {
  return <Screen title="How can we help?" subtitle="Support before and after your service."><View style={styles.card}><Ionicons name="call-outline" size={30} color={colors.primary} /><Text style={styles.title}>Call Purple Squad</Text><Text style={styles.body}>Speak with our support team at +91 76760 76361.</Text><Button onPress={() => void Linking.openURL('tel:+917676076361')}>Call now</Button></View><View style={styles.card}><Ionicons name="logo-whatsapp" size={30} color={colors.success} /><Text style={styles.title}>WhatsApp support</Text><Text style={styles.body}>Share your booking number for faster help. Avoid sending OTPs or payment credentials.</Text><Button variant="secondary" onPress={() => void Linking.openURL('https://wa.me/917676076361')}>Open WhatsApp</Button></View><View style={styles.note}><Text style={styles.noteTitle}>Tip</Text><Text style={styles.body}>Keep your booking number handy so we can help you faster.</Text></View></Screen>;
}
const styles = StyleSheet.create({ card: { gap: spacing.md, padding: spacing.xl, borderRadius: radius.card, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border }, title: { color: colors.heading, fontFamily: typography.bold, fontSize: 18 }, body: { color: colors.body, fontFamily: typography.regular, fontSize: 14, lineHeight: 21 }, note: { gap: spacing.sm, padding: spacing.lg, borderRadius: radius.card, backgroundColor: colors.primarySoft }, noteTitle: { color: colors.heading, fontFamily: typography.bold, fontSize: 15 } });
