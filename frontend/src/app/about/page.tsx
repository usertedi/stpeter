import AboutHero from '@/components/about/AboutHero'
import OurStory from '@/components/about/OurStory'
import Timeline from '@/components/about/Timeline'
import Leadership from '@/components/about/Leadership'
import Beliefs from '@/components/about/Beliefs'

export const metadata = {
  title: 'About Us | St. Peter Orthodox Church',
  description: 'Learn about the history, mission, and leadership of St. Peter Orthodox Church.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <OurStory />
      <Timeline />
      <Leadership />
      <Beliefs />
    </div>
  )
}