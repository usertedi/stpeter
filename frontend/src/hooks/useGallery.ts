import { useState, useEffect } from 'react';

export interface GalleryImage {
  _id: string;
  title: string;
  description: string;
  album: string;
  imageUrl: string; // This will be the Cloudinary URL
  cloudinaryPublicId: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export const useGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch gallery images');
        }
        
        const data = await response.json();
        setImages(data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching gallery images:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch gallery images');
        // Fallback to empty array on error
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return { images, loading, error };
};
