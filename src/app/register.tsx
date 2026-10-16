import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ImageBackground, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { requestFirebaseOtp } from '@/lib/firebase-phone-auth';
import { colors, spacing, typography } from '@/theme/tokens';

const schema = z.object({ name: z.string().trim().min(2, 'Enter your name'), phone: z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit mobile number') });
type Form = z.infer<typeof schema>;
export default function RegisterScreen() {
  const { control, handleSubmit, setError } = useForm<Form>({ resolver: zodResolver(schema), defaultValues: { name: '', phone: '' } });
  const send = useMutation({ mutationFn: (values: Form) => requestFirebaseOtp(`+91${values.phone}`), onSuccess: (_, values) => router.push({ pathname: '/verify-otp', params: { phone: values.phone, name: values.name, mode: 'register' } }), onError: (error: Error) => setError('phone', { message: error.message }) });
  return <ImageBackground source={require('../../assets/images/welcome-hero.png')} resizeMode="cover" style={styles.background}><View style={styles.scrim} /><SafeAreaView style={styles.safe}><KeyboardAvoidingView behavior="padding" style={styles.flex}><ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled"><View style={styles.sheet}><Image source={require('../../assets/brand/logo.png')} contentFit="contain" style={styles.logo} /><Text style={styles.title}>Get Started now</Text><Text style={styles.subtitle}>Open your Purple Squad account</Text><Controller control={control} name="name" render={({ field, fieldState }) => <Field label="Name*" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} placeholder="Enter your name" />} /><Controller control={control} name="phone" render={({ field, fieldState }) => <Field label="Contact Number*" value={field.value} onChangeText={(value) => field.onChange(value.replace(/\D/g, '').slice(0, 10))} error={fieldState.error?.message} keyboardType="phone-pad" placeholder="+91  Contact number" />} /><Button loading={send.isPending} onPress={handleSubmit((values) => send.mutate(values))}>SIGN UP</Button><Text onPress={() => router.replace('/login')} style={styles.switch}>Have an account? <Text style={styles.switchAction}>SIGN IN</Text></Text></View></ScrollView></KeyboardAvoidingView></SafeAreaView></ImageBackground>;
}
const styles = StyleSheet.create({ background: { flex: 1, backgroundColor: '#21172B' }, scrim: { position: 'absolute', inset: 0, backgroundColor: 'rgba(17,9,25,0.18)' }, safe: { flex: 1 }, flex: { flex: 1 }, scroll: { flexGrow: 1, justifyContent: 'flex-end', padding: spacing.md }, sheet: { gap: spacing.lg, padding: spacing.xl, paddingTop: 48, borderRadius: 30, backgroundColor: colors.white }, logo: { position: 'absolute', top: -31, left: '50%', marginLeft: -31, width: 62, height: 62, borderRadius: 31, backgroundColor: colors.white }, title: { color: colors.primary, fontFamily: typography.extrabold, fontSize: 29, textAlign: 'center' }, subtitle: { marginTop: -12, color: colors.body, fontFamily: typography.regular, fontSize: 15, textAlign: 'center' }, gapNote: { marginTop: -6, color: colors.muted, fontFamily: typography.regular, fontSize: 10, lineHeight: 15 }, switch: { color: colors.body, fontFamily: typography.regular, fontSize: 14, textAlign: 'center' }, switchAction: { color: colors.primary, fontFamily: typography.bold } });
