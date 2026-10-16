import { useQuery } from '@tanstack/react-query';
import { ServiceCard } from '@/components/service-card';
import { Screen } from '@/components/ui/screen';
import { MessageState } from '@/components/ui/states';
import { ServiceCardSkeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';

export default function TrendingScreen() {
  const query = useQuery({ queryKey: ['services', 'trending'], queryFn: () => api.catalogue.services({ is_popular: true, page_size: 40 }) });
  return <Screen title="Trending near you" subtitle="The services your neighbours book the most." refreshing={query.isRefetching} onRefresh={() => void query.refetch()}>{query.isLoading ? <ServiceCardSkeleton count={3} /> : query.isError ? <MessageState title="Couldn’t load trending services" message={query.error.message} actionLabel="Retry" onAction={() => void query.refetch()} /> : query.data?.results.length ? query.data.results.map((service) => <ServiceCard key={service.id} service={service} />) : <MessageState title="Nothing trending yet" message="Check back soon for the most popular services in your area." />}</Screen>;
}
