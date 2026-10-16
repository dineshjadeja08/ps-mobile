import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography } from '@/theme/tokens';
import { useT } from '@/i18n';

const icons = { trending: ['trending-up', 'trending-up-outline'], index: ['home', 'home-outline'], categories: ['grid', 'grid-outline'], bookings: ['bag-check', 'bag-check-outline'], account: ['person', 'person-outline'] } as const;
export default function TabsLayout() {
  const t = useT();
  const insets = useSafeAreaInsets();
  return <Tabs screenListeners={{ tabPress: () => void Haptics.selectionAsync() }} screenOptions={({ route }) => ({ headerShown: false, animation: 'shift', sceneStyle: { paddingTop: insets.top, backgroundColor: colors.background }, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.muted, tabBarHideOnKeyboard: true, tabBarLabelStyle: { fontFamily: typography.semibold, fontSize: 10, marginTop: 2 }, tabBarItemStyle: { paddingTop: 5 }, tabBarStyle: { height: 78 + insets.bottom, paddingTop: 7, paddingBottom: 9 + insets.bottom, borderTopWidth: 0, backgroundColor: colors.white, shadowColor: '#21112E', shadowOpacity: 0.12, shadowRadius: 16, shadowOffset: { width: 0, height: -5 }, elevation: 12 }, tabBarIcon: ({ color, focused, size }) => { const pair = icons[route.name as keyof typeof icons] ?? icons.index; if (route.name === 'index') return <View style={{ width: 62, height: 62, marginTop: -24, alignItems: 'center', justifyContent: 'center', borderRadius: 31, borderWidth: 5, borderColor: colors.white, backgroundColor: colors.primary, shadowColor: colors.primaryPressed, shadowOpacity: 0.28, shadowRadius: 10, shadowOffset: { width: 0, height: 5 }, elevation: 8 }}><Ionicons name="home" size={28} color={colors.white} /></View>; return <Ionicons name={pair[focused ? 0 : 1]} size={focused ? size + 1 : size} color={color} />; } })}>
    <Tabs.Screen name="trending" options={{ title: t('trending') }} /><Tabs.Screen name="categories" options={{ title: t('services') }} /><Tabs.Screen name="index" options={{ title: t('home') }} /><Tabs.Screen name="bookings" options={{ title: t('orders') }} /><Tabs.Screen name="account" options={{ title: t('profile') }} />
  </Tabs>;
}
