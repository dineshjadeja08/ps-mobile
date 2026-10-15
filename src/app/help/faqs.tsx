import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/ui/screen';
import { LoadingState, MessageState } from '@/components/ui/states';
import { api } from '@/lib/api';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function FaqScreen() {
  const query = useQuery({ queryKey: ['faqs'], queryFn: api.faqs }); const [open, setOpen] = useState<string | null>(null);
  return <Screen title="Frequently asked questions" subtitle="Answers managed by Purple Squad support." refreshing={query.isRefetching} onRefresh={() => void query.refetch()}>
    {query.isLoading ? <LoadingState /> : query.isError ? <MessageState title="Couldn’t load FAQs" message={query.error.message} actionLabel="Retry" onAction={() => void query.refetch()} /> : query.data?.length ? query.data.map((item) => <Pressable key={item.id} onPress={() => setOpen(open === item.id ? null : item.id)} style={styles.card}><View style={styles.row}><Text style={styles.question}>{item.question}</Text><Ionicons name={open === item.id ? 'remove' : 'add'} size={21} color={colors.primary} /></View>{open === item.id ? <Text style={styles.answer}>{item.answer}</Text> : null}</Pressable>) : <MessageState title="No FAQs published" message="Contact support and we’ll help you directly." />}
  </Screen>;
}
const styles = StyleSheet.create({ card: { padding: spacing.lg, gap: spacing.md, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, backgroundColor: colors.white }, row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md }, question: { flex: 1, color: colors.heading, fontFamily: typography.bold, fontSize: 14, lineHeight: 20 }, answer: { color: colors.body, fontFamily: typography.regular, fontSize: 13, lineHeight: 21 } });

