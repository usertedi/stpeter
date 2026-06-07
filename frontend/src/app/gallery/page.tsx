import GalleryPageClient from '@/components/gallery/GalleryPageClient';
import { getGalleryImages } from '@/lib/server-api';

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return <GalleryPageClient images={images} />;
}
