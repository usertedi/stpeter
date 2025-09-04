'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useGallery } from '@/hooks/useGallery';

// Fallback data in case API fails
const fallbackImages = [
  {
    _id: '1',
    title: 'Sunday Divine Liturgy',
    album: 'services',
    imageUrl: '/images/gallery/service-1.jpg',
    description: 'Sunday Divine Liturgy celebration',
    cloudinaryPublicId: '',
    uploadedBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Easter Celebration',
    album: 'holidays',
    imageUrl: '/images/gallery/holiday-1.jpg',
    description: 'Easter celebration with the community',
    cloudinaryPublicId: '',
    uploadedBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '3',
    title: 'Youth Group Meeting',
    album: 'youth',
    imageUrl: '/images/gallery/youth-1.jpg',
    description: 'Weekly youth group gathering',
    cloudinaryPublicId: '',
    uploadedBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '4',
    title: 'Food Drive',
    album: 'community',
    imageUrl: '/images/gallery/community-1.jpg',
    description: 'Annual food drive for the local community',
    cloudinaryPublicId: '',
    uploadedBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '5',
    title: 'Christmas Service',
    album: 'holidays',
    imageUrl: '/images/gallery/holiday-2.jpg',
    description: 'Christmas Eve service',
    cloudinaryPublicId: '',
    uploadedBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: '6',
    title: 'Bible Study',
    album: 'events',
    imageUrl: '/images/gallery/event-1.jpg',
    description: 'Weekly Bible study session',
    cloudinaryPublicId: '',
    uploadedBy: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

interface GalleryGridProps {
  activeAlbum?: string;
}

export default function GalleryGrid({ activeAlbum = 'all' }: GalleryGridProps) {
  const { images, loading, error } = useGallery();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Use API data if available, otherwise fallback to static data
  const allImages = images.length > 0 ? images : fallbackImages;
  
  // Filter images by album
  const galleryImages = activeAlbum === 'all' 
    ? allImages 
    : allImages.filter(image => image.album === activeAlbum);

  const openLightbox = (id: string) => {
    setSelectedImage(id);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

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

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error loading gallery images: {error}</p>
        <p className="text-gray-600">Using fallback images...</p>
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
          <motion.div 
            key={image._id} 
            className="overflow-hidden rounded-lg shadow-md cursor-pointer group"
            variants={item}
            onClick={() => openLightbox(image._id)}
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
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-4xl"
          >
            &times;
          </button>
          
          {galleryImages.find(img => img._id === selectedImage) && (
            <div className="max-w-4xl w-full">
              <div className="relative h-[70vh] w-full">
                <Image 
                  src={galleryImages.find(img => img._id === selectedImage)?.imageUrl || ''} 
                  alt={galleryImages.find(img => img._id === selectedImage)?.title || ''}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-white mt-4">
                <h3 className="text-xl font-bold">
                  {galleryImages.find(img => img._id === selectedImage)?.title}
                </h3>
                <p className="text-gray-300">
                  {galleryImages.find(img => img._id === selectedImage)?.description}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}