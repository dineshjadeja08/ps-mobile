import { Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold, useFonts } from '@expo-google-fonts/manrope';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '@/providers/app-provider';
import { useLanguage } from '@/i18n';
import { useAuth } from '@/stores/auth';
import { colors, typography } from '@/theme/tokens';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const restore = useAuth((state) => state.restore); const ready = useAuth((state) => state.ready);
  const hydrateLanguage = useLanguage((state) => state.hydrate); const languageReady = useLanguage((state) => state.ready);
  const [fontsLoaded] = useFonts({ Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold });
  useEffect(() => { void restore(); }, [restore]);
  useEffect(() => { void hydrateLanguage(); }, [hydrateLanguage]);
  useEffect(() => { if (fontsLoaded && ready && languageReady) void SplashScreen.hideAsync(); }, [fontsLoaded, ready, languageReady]);
  if (!fontsLoaded || !ready || !languageReady) return null;
  return <AppProvider><StatusBar style="dark" /><Stack screenOptions={{ headerTintColor: colors.heading, headerTitleStyle: { fontFamily: typography.bold }, headerShadowVisible: false, headerBackButtonDisplayMode: 'minimal', animation: 'slide_from_right', gestureEnabled: true, contentStyle: { backgroundColor: colors.background } }}>
    <Stack.Screen name="index" options={{ headerShown: false }} /><Stack.Screen name="onboarding" options={{ headerShown: false }} /><Stack.Screen name="login" options={{ title: 'Sign in' }} /><Stack.Screen name="register" options={{ headerShown: false }} /><Stack.Screen name="verify-otp" options={{ headerShown: false }} />
    <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} /><Stack.Screen name="service/[slug]" options={{ title: 'Service details' }} /><Stack.Screen name="book/address" options={{ title: 'Choose address' }} />
    <Stack.Screen name="book/slot" options={{ title: 'Choose a time' }} /><Stack.Screen name="book/review" options={{ title: 'Review booking' }} /><Stack.Screen name="book/pay/[bookingId]" options={{ title: 'Secure payment' }} />
    <Stack.Screen name="booking/[id]" options={{ title: 'Booking details' }} /><Stack.Screen name="booking-success/[bookingId]" options={{ headerShown: false, animation: 'fade', gestureEnabled: false }} /><Stack.Screen name="support" options={{ title: 'Help & support' }} />
    <Stack.Screen name="booking/reschedule/[id]" options={{ title: 'Reschedule' }} /><Stack.Screen name="profile/edit" options={{ title: 'Edit profile' }} /><Stack.Screen name="help/faqs" options={{ title: 'FAQs' }} />
    <Stack.Screen name="cart" options={{ title: 'Your cart' }} /><Stack.Screen name="addresses" options={{ title: 'Saved addresses' }} /><Stack.Screen name="location-search" options={{ headerShown: false }} /><Stack.Screen name="service-availability" options={{ headerShown: false }} />
  </Stack></AppProvider>;
}
