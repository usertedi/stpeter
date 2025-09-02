import DivisionsHero from '@/components/divisions/DivisionsHero'
import DivisionsList from '@/components/divisions/DivisionsList'

export const metadata = {
  title: 'Our Divisions | St. Peter Orthodox Church',
  description: 'Explore the various ministries and service divisions of St. Peter Orthodox Church.',
}

export default function DivisionsPage() {
  return (
    <div className="min-h-screen">
      <DivisionsHero />
      <DivisionsList />
    </div>
  )
}