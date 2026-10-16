import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Screen } from '@/components/ui/screen';
import { requestFirebaseOtp } from '@/lib/firebase-phone-auth';
import { colors, radius, spacing, typography } from '@/theme/tokens';

const schema = z.object({ phone: z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit mobile number') });
type Form = z.infer<typeof schema>;
export default function LoginScreen() {
  const params = useLocalSearchParams<{ returnTo?: string }>();
  const { control, handleSubmit, setError } = useForm<Form>({ resolver: zodResolver(schema), defaultValues: { phone: '' } });
  const send = useMutation({ mutationFn: (phone: string) => requestFirebaseOtp(`+91${phone}`), onSuccess: (_, phone) => router.push({ pathname: '/verify-otp', params: { phone, returnTo: params.returnTo || '/(tabs)' } }), onError: (error: Error) => setError('phone', { message: error.message }) });
  return <Screen><View style={styles.card}><Text accessibilityRole="header" style={styles.title}>Sign In</Text><Text style={styles.subtitle}>Welcome back! Sign in to access Purple Squad home services and manage your orders.</Text><Controller control={control} name="phone" render={({ field, fieldState }) => <Field label="Phone Number" value={field.value} onChangeText={(value) => field.onChange(value.replace(/\D/g, '').slice(0, 10))} keyboardType="phone-pad" editable={!send.isSuccess} error={fieldState.error?.message} placeholder="+91  Contact Number" />} />
    <Button loading={send.isPending} onPress={handleSubmit((values) => send.mutate(values.phone))}>Sign In</Button><Text onPress={() => router.push('/register')} style={styles.register}>Don’t have an account? <Text style={styles.registerAction}>Register</Text></Text>
    <View style={styles.notice}><Text style={styles.noticeTitle}>Secure sign in</Text><Text style={styles.noticeText}>We’ll send a one-time code by SMS to verify your number.</Text></View></View>
  </Screen>;
}
const styles = StyleSheet.create({ card: { gap: spacing.lg, marginTop: spacing.xl, padding: spacing.xl, borderRadius: 16, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.white, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 16, shadowOffset: { width: 0, height: 6 }, elevation: 3 }, title: { color: colors.heading, fontFamily: typography.extrabold, fontSize: 28 }, subtitle: { marginTop: -8, color: colors.body, fontFamily: typography.regular, fontSize: 13, lineHeight: 20 }, notice: { padding: spacing.md, gap: spacing.xs, backgroundColor: colors.primarySoft, borderRadius: radius.card }, noticeTitle: { color: colors.primary, fontFamily: typography.bold, fontSize: 13 }, noticeText: { color: colors.body, fontFamily: typography.regular, fontSize: 11, lineHeight: 17 }, register: { color: colors.body, fontFamily: typography.regular, fontSize: 13, textAlign: 'center' }, registerAction: { color: colors.primary, fontFamily: typography.bold } });
