export type PublicContentSection = 'gallery' | 'events' | 'divisions';

const SECTION_PATHS: Record<PublicContentSection, string[]> = {
  gallery: ['/', '/gallery'],
  events: ['/', '/events'],
  divisions: ['/', '/divisions'],
};

export async function refreshPublicContent(section: PublicContentSection): Promise<boolean> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (!token) {
    return false;
  }

  try {
    const response = await fetch('/api/revalidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paths: SECTION_PATHS[section] }),
    });

    return response.ok;
  } catch {
    return false;
  }
}
