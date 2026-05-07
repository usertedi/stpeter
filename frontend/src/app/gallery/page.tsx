'use client';

import { useEffect, useState } from 'react';
import GalleryHero from '@/components/gallery/GalleryHero';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import AlbumFilter from '@/components/gallery/AlbumFilter';
import { useGallery } from '@/hooks/useGallery';

export default function GalleryPage() {
  const { images, loading } = useGallery();
  const [activeAlbum, setActiveAlbum] = useState('all');

  useEffect(() => {
    if (activeAlbum.trim().toLowerCase() === 'youth') {
      setActiveAlbum('all');
    }
  }, [activeAlbum]);

  // Get unique albums from the images
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
          />
        </div>
      </section>
      <div className="container-custom py-8 md:py-10">
        <GalleryGrid activeAlbum={activeAlbum} images={images} loading={loading} />
      </div>
    </main>
  );
}