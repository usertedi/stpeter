import useSWR from 'swr';
import { apiJsonFetcher } from '@/lib/api';

export interface GalleryImage {
  _id: string;
  title: string;
  description: string;
  album: string;
  imageUrl: string; // This will be the Cloudinary URL
  cloudinaryId: string;
  featured: boolean;
  createdAt: string;
}

export const useGallery = () => {
  const { data, error, isLoading, mutate } = useSWR<GalleryImage[]>('/gallery', apiJsonFetcher, {
    keepPreviousData: true,
  });

  return {
    images: data ?? [],
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: mutate,
  };
};
