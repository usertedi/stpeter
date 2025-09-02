'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Mock data for gallery images
const galleryImages = [
  {
    id: 1,
    title: 'Sunday Divine Liturgy',
    album: 'services',
    imageUrl: '/images/gallery/service-1.jpg',
    description: 'Sunday Divine Liturgy celebration'
  },
  {
    id: 2,
    title: 'Easter Celebration',
    album: 'holidays',
    imageUrl: '/images/gallery/holiday-1.jpg',
    description: 'Easter celebration with the community'
  },
  {
    id: 3,
    title: 'Youth Group Meeting',
    album: 'youth',
    imageUrl: '/images/gallery/youth-1.jpg',
    description: 'Weekly youth group gathering'
  },
  {
    id: 4,
    title: 'Food Drive',
    album: 'community',
    imageUrl: '/images/gallery/community-1.jpg',
    description: 'Annual food drive for the local community'
  },
  {
    id: 5,
    title: 'Christmas Service',
    album: 'holidays',
    imageUrl: '/images/gallery/holiday-2.jpg',
    description: 'Christmas Eve service'
  },
  {
    id: 6,
    title: 'Bible Study',
    album: 'events',
    imageUrl: '/images/gallery/event-1.jpg',
    description: 'Weekly Bible study session'
  },
  {
    id: 7,
    title: 'Church Choir',
    album: 'services',
    imageUrl: '/images/gallery/service-2.jpg',
    description: 'Church choir performance'
  },
  {
    id: 8,
    title: 'Summer Camp',
    album: 'youth',
    imageUrl: '/images/gallery/youth-2.jpg',
    description: 'Annual summer camp for youth'
  },
  {
    id: 9,
    title: 'Parish Picnic',
    album: 'events',
    imageUrl: '/images/gallery/event-2.jpg',
    description: 'Annual parish picnic'
  },
  {
    id: 10,
    title: 'Homeless Outreach',
    album: 'community',
    imageUrl: '/images/gallery/community-2.jpg',
    description: 'Homeless outreach program'
  },
  {
    id: 11,
    title: 'Palm Sunday',
    album: 'holidays',
    imageUrl: '/images/gallery/holiday-3.jpg',
    description: 'Palm Sunday celebration'
  },
  {
    id: 12,
    title: 'Baptism Ceremony',
    album: 'services',
    imageUrl: '/images/gallery/service-3.jpg',
    description: 'Baptism ceremony'
  }
];

export default function GalleryGrid() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (id: number) => {
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
            key={image.id} 
            className="overflow-hidden rounded-lg shadow-md cursor-pointer group"
            variants={item}
            onClick={() => openLightbox(image.id)}
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
          
          {galleryImages.find(img => img.id === selectedImage) && (
            <div className="max-w-4xl w-full">
              <div className="relative h-[70vh] w-full">
                <Image 
                  src={galleryImages.find(img => img.id === selectedImage)?.imageUrl || ''} 
                  alt={galleryImages.find(img => img.id === selectedImage)?.title || ''}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-white mt-4">
                <h3 className="text-xl font-bold">
                  {galleryImages.find(img => img.id === selectedImage)?.title}
                </h3>
                <p className="text-gray-300">
                  {galleryImages.find(img => img.id === selectedImage)?.description}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}