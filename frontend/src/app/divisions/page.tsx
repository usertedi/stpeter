import type { Metadata } from 'next'

import DivisionsHero from '@/components/divisions/DivisionsHero'
import DivisionsList from '@/components/divisions/DivisionsList'
import { getDivisions } from '@/lib/server-api'
import { originalMeta, siteConfig, siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: originalMeta.divisions.title },
  description: originalMeta.divisions.description,
  keywords: [...siteConfig.keywords],
  alternates: { canonical: `${siteUrl}/divisions` },
  openGraph: {
    title: originalMeta.divisions.title,
    description: originalMeta.divisions.description,
    url: `${siteUrl}/divisions`,
  },
  twitter: {
    title: originalMeta.divisions.title,
    description: originalMeta.divisions.description,
  },
}

export default async function DivisionsPage() {
  const divisions = await getDivisions()

  return (
    <div className="min-h-screen">
      <DivisionsHero />
      <DivisionsList divisions={divisions} />
    </div>
  )
}
