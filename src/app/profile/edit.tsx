import { zodResolver } from '@hookform/resolvers/zod';
import { Redirect, router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Text } from 'react-native';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Screen } from '@/components/ui/screen';
import { useAuth } from '@/stores/auth';
import { colors, typography } from '@/theme/tokens';

const schema = z.object({ display_name: z.string().min(2, 'Enter at least 2 characters').max(255), first_name: z.string().max(150), last_name: z.string().max(150), email: z.string().email('Enter a valid email').or(z.literal('')), alternate_phone: z.string().regex(/^$|^\+?[0-9]{10,13}$/, 'Enter a valid phone number') });
type Form = z.infer<typeof schema>;

export default function EditProfileScreen() {
  const user = useAuth((state) => state.user); const updateProfile = useAuth((state) => state.updateProfile);
  const { control, handleSubmit, formState, setError } = useForm<Form>({ resolver: zodResolver(schema), defaultValues: { display_name: user?.customer_profile?.display_name ?? '', first_name: user?.first_name ?? '', last_name: user?.last_name ?? '', email: user?.email ?? '', alternate_phone: user?.customer_profile?.alternate_phone ?? '' } });
  if (!user) return <Redirect href="/login" />;
  const submit = handleSubmit(async (values) => { try { await updateProfile(values); router.back(); } catch (error) { setError('root', { message: error instanceof Error ? error.message : 'Could not update profile.' }); } });
  return <Screen title="Edit profile" subtitle="Keep your service contact information up to date." bottom={<Button loading={formState.isSubmitting} onPress={() => void submit()}>Save changes</Button>}>
    <Controller control={control} name="display_name" render={({ field, fieldState }) => <Field label="Display name" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />} />
    <Controller control={control} name="first_name" render={({ field, fieldState }) => <Field label="First name" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />} />
    <Controller control={control} name="last_name" render={({ field, fieldState }) => <Field label="Last name" value={field.value} onChangeText={field.onChange} error={fieldState.error?.message} />} />
    <Controller control={control} name="email" render={({ field, fieldState }) => <Field label="Email" value={field.value} onChangeText={field.onChange} autoCapitalize="none" keyboardType="email-address" error={fieldState.error?.message} />} />
    <Controller control={control} name="alternate_phone" render={({ field, fieldState }) => <Field label="Alternate phone" value={field.value} onChangeText={field.onChange} keyboardType="phone-pad" error={fieldState.error?.message} />} />
    {formState.errors.root?.message ? <Text style={{ color: colors.danger, fontFamily: typography.semibold }}>{formState.errors.root.message}</Text> : null}
  </Screen>;
}

