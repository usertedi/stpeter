import { Metadata } from 'next';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import Map from '@/components/contact/Map';

export const metadata: Metadata = {
  title: 'Contact Us | St. Peter Orthodox Church',
  description: 'Get in touch with St. Peter Orthodox Church. Find our location, service times, and contact information.'
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
        <Map />
      </div>
    </main>
  );
}