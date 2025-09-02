import EventsHero from '@/components/events/EventsHero'
import WeeklySchedule from '@/components/events/WeeklySchedule'
import SpecialEvents from '@/components/events/SpecialEvents'

export const metadata = {
  title: 'Events | St. Peter Orthodox Church',
  description: 'Weekly schedule and special events at St. Peter Orthodox Church.',
}

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      <EventsHero />
      <WeeklySchedule />
      <SpecialEvents />
    </div>
  )
}