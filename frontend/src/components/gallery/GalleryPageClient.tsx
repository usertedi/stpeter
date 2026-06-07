'use client';

import { useEffect, useState } from 'react';
import GalleryHero from '@/components/gallery/GalleryHero';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import AlbumFilter from '@/components/gallery/AlbumFilter';
import type { GalleryImage } from '@/lib/content-types';

type GalleryPageClientProps = {
  images?: GalleryImage[];
};

export default function GalleryPageClient({ images = [] }: GalleryPageClientProps) {
  const [activeAlbum, setActiveAlbum] = useState('all');

  const hasFeaturedImages = images.some((image) => image.featured);

  useEffect(() => {
    if (activeAlbum.trim().toLowerCase() === 'youth') {
      setActiveAlbum('all');
    }
    if (activeAlbum === 'featured' && !hasFeaturedImages) {
      setActiveAlbum('all');
    }
  }, [activeAlbum, hasFeaturedImages]);

  const availableAlbums =
    images.length > 0
      ? Array.from(new Set(images.map((img) => img.album).filter(Boolean))).filter(
          (album) => String(album).trim().toLowerCase() !== 'youth'
        )
      : [];

  return (
    <main className="min-h-screen">
      <section className="bg-secondary-900 text-white overflow-hidden">
        <div className="container-custom relative z-10 pt-8 pb-6 md:pt-10 md:pb-8">
          <GalleryHero />
          <AlbumFilter
            variant="hero"
            activeAlbum={activeAlbum}
            onAlbumChange={setActiveAlbum}
            availableAlbums={availableAlbums}
            showFeaturedFilter={hasFeaturedImages}
          />
        </div>
      </section>
      <div className="container-custom py-8 md:py-10">
        <GalleryGrid activeAlbum={activeAlbum} images={images} />
      </div>
    </main>
  );
}
