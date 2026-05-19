/**
 * Formats event dates for display. ISO date strings become readable dates;
 * recurring labels like "Every Sunday" are returned unchanged.
 */
export function formatEventDate(dateString: string | undefined | null): string {
  if (!dateString?.trim()) return '';

  const isoDate = /^\d{4}-\d{2}-\d{2}/.test(dateString) || dateString.includes('T');
  if (!isoDate) return dateString;

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formats timestamps for admin tables (created, last login, etc.).
 */
export function formatDateTime(dateString: string | null | undefined): string {
  if (!dateString) return 'Never';

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '—';

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
