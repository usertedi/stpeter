import type { Division, Event, GalleryImage } from '@/lib/content-types';

// Content changes infrequently; refresh at most once per day.
const REVALIDATE_SECONDS = 86_400;

const getServerApiBaseUrl = () => {
  const apiUrl = (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL)?.trim().replace(/\/+$/, '');

  if (!apiUrl) {
    return null;
  }

  return apiUrl;
};

const serverApiPath = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return normalizedPath.startsWith('/api/') ? normalizedPath : `/api${normalizedPath}`;
};

async function serverApiJson<T>(path: string): Promise<T | null> {
  const baseUrl = getServerApiBaseUrl();

  if (!baseUrl) {
    return null;
  }

  try {
    const response = await fetch(`${baseUrl}${serverApiPath(path)}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data ?? data;
  } catch {
    return null;
  }
}

type FetchOptions = {
  limit?: number;
};

const withLimit = (path: string, options?: FetchOptions) => {
  if (!options?.limit) {
    return path;
  }

  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}limit=${options.limit}`;
};

export async function getDivisions(options?: FetchOptions): Promise<Division[]> {
  return (await serverApiJson<Division[]>(withLimit('/divisions', options))) ?? [];
}

export async function getEvents(options?: FetchOptions): Promise<Event[]> {
  return (await serverApiJson<Event[]>(withLimit('/events', options))) ?? [];
}

export async function getGalleryImages(options?: FetchOptions): Promise<GalleryImage[]> {
  return (await serverApiJson<GalleryImage[]>(withLimit('/gallery', options))) ?? [];
}
