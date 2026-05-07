'use client';

import type { IconType } from 'react-icons';
import {
  FaBook,
  FaBullhorn,
  FaCoffee,
  FaHandsHelping,
  FaMoneyBillWave,
  FaMusic,
  FaPrayingHands,
  FaTools,
  FaUsers,
} from 'react-icons/fa';

/** Slugs stored in the API and used by the public site */
export const DIVISION_THEME_OPTIONS = [
  { value: 'worship', label: 'Worship & prayer' },
  { value: 'outreach', label: 'Community & outreach' },
  { value: 'music', label: 'Music & arts' },
  { value: 'education', label: 'Education' },
  { value: 'youth', label: 'Youth' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'finance', label: 'Finance & resources' },
  { value: 'media', label: 'Media & communications' },
  { value: 'facilities', label: 'Facilities' },
] as const;

export type DivisionThemeId = (typeof DIVISION_THEME_OPTIONS)[number]['value'];

export const DEFAULT_DIVISION_THEME: DivisionThemeId = 'worship';

export const VALID_DIVISION_THEME_IDS = new Set<string>(
  DIVISION_THEME_OPTIONS.map((o) => o.value),
);

export const divisionIconMap: Record<string, IconType> = {
  worship: FaPrayingHands,
  outreach: FaHandsHelping,
  music: FaMusic,
  education: FaBook,
  youth: FaUsers,
  hospitality: FaCoffee,
  finance: FaMoneyBillWave,
  media: FaBullhorn,
  facilities: FaTools,
};

/** Header strip background/text classes per theme (home + divisions pages) */
export const divisionColorClassMap: Record<string, string> = {
  worship: 'bg-primary-100 text-primary-700',
  outreach: 'bg-pink-100 text-rose-800',
  music: 'bg-secondary-100 text-secondary-700',
  education: 'bg-sky-100 text-sky-700',
  youth: 'bg-violet-100 text-violet-800',
  hospitality: 'bg-amber-100 text-amber-900',
  finance: 'bg-emerald-100 text-emerald-800',
  media: 'bg-cyan-100 text-cyan-800',
  facilities: 'bg-orange-100 text-orange-900',
  default: 'bg-primary-100 text-primary-700',
};

export function normalizeDivisionThemeId(raw: string | undefined | null): DivisionThemeId {
  if (raw && VALID_DIVISION_THEME_IDS.has(raw)) {
    return raw as DivisionThemeId;
  }
  return DEFAULT_DIVISION_THEME;
}
