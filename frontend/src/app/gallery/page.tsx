import { Metadata } from 'next';
import GalleryHero from '@/components/gallery/GalleryHero';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import AlbumFilter from '@/components/gallery/AlbumFilter';

export const metadata: Metadata = {
  title: 'Gallery | St. Peter Orthodox Church',
  description: 'Browse photos from our church services, events, and community activities.'
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <GalleryHero />
      <div className="container-custom py-12">
        <AlbumFilter />
        <GalleryGrid />
      </div>
    </main>
  );
}