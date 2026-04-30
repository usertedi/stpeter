import useSWR from 'swr';
import { apiJsonFetcher } from '@/lib/api';

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  featured: boolean;
  isRecurring: boolean;
  recurringPattern?: string;
  createdAt: string;
  updatedAt: string;
}

export const useEvents = () => {
  const { data, error, isLoading, mutate } = useSWR<Event[]>('/events', apiJsonFetcher, {
    keepPreviousData: true,
  });

  return {
    events: data ?? [],
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: mutate,
  };
};
