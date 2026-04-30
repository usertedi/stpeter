import useSWR from 'swr';
import { apiJsonFetcher } from '@/lib/api';

export interface Division {
  _id: string;
  name?: string;
  title?: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useDivisions = () => {
  const { data, error, isLoading, mutate } = useSWR<Division[]>('/divisions', apiJsonFetcher, {
    keepPreviousData: true,
  });

  return {
    divisions: data ?? [],
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: mutate,
  };
};
