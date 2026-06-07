import type { Metadata } from 'next'

import Hero from '@/components/home/Hero'
import MissionStatement from '@/components/home/MissionStatement'
import FeaturedDivisions from '@/components/home/FeaturedDivisions'
import UpcomingEvents from '@/components/home/UpcomingEvents'
import CallToAction from '@/components/home/CallToAction'
import { getDivisions, getEvents } from '@/lib/server-api'
import { originalMeta, siteConfig, siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  description: originalMeta.homeDescription,
  keywords: [...siteConfig.keywords],
  alternates: { canonical: siteUrl },
}

export default async function Home() {
  const [divisions, events] = await Promise.all([
    getDivisions({ limit: 10 }),
    getEvents({ limit: 20 }),
  ])

  return (
    <div className="min-h-screen">
      <h1 className="sr-only">
        {siteConfig.name} — {siteConfig.nameEnglish}
      </h1>

      <Hero />
      <MissionStatement />
      <FeaturedDivisions divisions={divisions} />
      <UpcomingEvents events={events} />
      <CallToAction />
    </div>
  )
}
