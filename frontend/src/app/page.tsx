import Hero from '@/components/home/Hero'
import MissionStatement from '@/components/home/MissionStatement'
import FeaturedDivisions from '@/components/home/FeaturedDivisions'
import UpcomingEvents from '@/components/home/UpcomingEvents'
import CallToAction from '@/components/home/CallToAction'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <MissionStatement />
      <FeaturedDivisions />
      <UpcomingEvents />
      <CallToAction />
    </div>
  )
}