import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useEffect, useState } from 'react';
import { onboardingStorage } from '@/lib/session';
import { colors } from '@/theme/tokens';

export default function Index() {
  const [done, setDone] = useState<boolean | null>(null);
  useEffect(() => { void onboardingStorage.get().then(setDone); }, []);
  if (done === null) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color={colors.primary} /></View>;
  return <Redirect href={done ? '/(tabs)' : '/onboarding'} />;
}
