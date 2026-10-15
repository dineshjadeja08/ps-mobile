import { useQuery } from '@tanstack/react-query';
import { ServiceCard } from '@/components/service-card';
import { Screen } from '@/components/ui/screen';
import { LoadingState, MessageState } from '@/components/ui/states';
import { api } from '@/lib/api';

export default function TrendingScreen() {
  const query = useQuery({ queryKey: ['services', 'trending'], queryFn: () => api.catalogue.services({ is_popular: true, page_size: 40 }) });
  return <Screen title="Trending near you" subtitle="Popular Purple Squad services, using live catalogue data." refreshing={query.isRefetching} onRefresh={() => void query.refetch()}>{query.isLoading ? <LoadingState /> : query.isError ? <MessageState title="Couldn’t load trending services" message={query.error.message} actionLabel="Retry" onAction={() => void query.refetch()} /> : query.data?.results.length ? query.data.results.map((service) => <ServiceCard key={service.id} service={service} />) : <MessageState title="Nothing trending yet" message="Popular services will appear here when they are marked in the catalogue." />}</Screen>;
}
