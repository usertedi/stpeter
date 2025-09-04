'use client';

import { useState } from 'react';
import GalleryHero from '@/components/gallery/GalleryHero';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import AlbumFilter from '@/components/gallery/AlbumFilter';
import { useGallery } from '@/hooks/useGallery';

export default function GalleryPage() {
  const { images } = useGallery();
  const [activeAlbum, setActiveAlbum] = useState('all');

  // Get unique albums from the images
  const availableAlbums = images.length > 0 
    ? Array.from(new Set(images.map(img => img.album)))
    : [];

  return (
    <main className="min-h-screen">
      <GalleryHero />
      <div className="container-custom py-12">
        <AlbumFilter 
          activeAlbum={activeAlbum}
          onAlbumChange={setActiveAlbum}
          availableAlbums={availableAlbums}
        />
        <GalleryGrid activeAlbum={activeAlbum} />
      </div>
    </main>
  );
}