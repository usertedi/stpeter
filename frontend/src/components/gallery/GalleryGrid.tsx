'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { GalleryImage } from '@/hooks/useGallery';

// Fallback data in case API fails
const fallbackImages = [
  {
    _id: '1',
    title: 'Sunday Divine Liturgy',
    album: 'services',
    imageUrl: '/images/gallery/service-1.jpg',
    description: 'Sunday Divine Liturgy celebration',
    cloudinaryId: '',
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Easter Celebration',
    album: 'holidays',
    imageUrl: '/images/gallery/holiday-1.jpg',
    description: 'Easter celebration with the community',
    cloudinaryId: '',
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    title: 'Youth Group Meeting',
    album: 'youth',
    imageUrl: '/images/gallery/youth-1.jpg',
    description: 'Weekly youth group gathering',
    cloudinaryId: '',
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '4',
    title: 'Food Drive',
    album: 'community',
    imageUrl: '/images/gallery/community-1.jpg',
    description: 'Annual food drive for the local community',
    cloudinaryId: '',
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '5',
    title: 'Christmas Service',
    album: 'holidays',
    imageUrl: '/images/gallery/holiday-2.jpg',
    description: 'Christmas Eve service',
    cloudinaryId: '',
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: '6',
    title: 'Bible Study',
    album: 'events',
    imageUrl: '/images/gallery/event-1.jpg',
    description: 'Weekly Bible study session',
    cloudinaryId: '',
    featured: false,
    createdAt: new Date().toISOString(),
  }
];

interface GalleryGridProps {
  activeAlbum?: string;
  images: GalleryImage[];
  loading: boolean;
}

export default function GalleryGrid({ activeAlbum = 'all', images, loading }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Use API data if available, otherwise fallback to static data
  const allImages = images.length > 0 ? images : fallbackImages;
  
  // Filter images by album
  const galleryImages = activeAlbum === 'all' 
    ? allImages 
    : allImages.filter(image => image.album === activeAlbum);

  const openLightbox = (id: string) => {
    setSelectedImage(id);
  };

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const selectedGalleryImage = useMemo(
    () => galleryImages.find(img => img._id === selectedImage),
    [galleryImages, selectedImage]
  );

  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeLightbox, selectedImage]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-200 animate-pulse h-64 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {galleryImages.map((image) => (
          <motion.button
            type="button"
            key={image._id} 
            className="overflow-hidden rounded-lg shadow-md cursor-pointer group text-left focus:outline-none focus:ring-4 focus:ring-primary-300"
            variants={item}
            onClick={() => openLightbox(image._id)}
            aria-label={`Open image: ${image.title}`}
          >
            <div className="relative h-64 w-full">
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                <span className="text-white font-medium">{image.title}</span>
              </div>
              <div className="h-full w-full relative">
                <Image 
                  src={image.imageUrl} 
                  alt={image.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-title"
          aria-describedby="gallery-lightbox-description"
          onClick={closeLightbox}
        >
          <button 
            ref={closeButtonRef}
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-4xl focus:outline-none focus:ring-4 focus:ring-white/60 rounded"
            aria-label="Close gallery image"
          >
            &times;
          </button>
          
          {selectedGalleryImage && (
            <div className="max-w-4xl w-full" onClick={(event) => event.stopPropagation()}>
              <div className="relative h-[70vh] w-full">
                <Image 
                  src={selectedGalleryImage.imageUrl} 
                  alt={selectedGalleryImage.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              <div className="text-white mt-4">
                <h3 id="gallery-lightbox-title" className="text-xl font-bold">
                  {selectedGalleryImage.title}
                </h3>
                <p id="gallery-lightbox-description" className="text-gray-300">
                  {selectedGalleryImage.description}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}