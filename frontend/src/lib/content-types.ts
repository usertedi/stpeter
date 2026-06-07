export interface Division {
  _id: string;
  name?: string;
  title?: string;
  description: string;
  icon: string;
  color: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  featured: boolean;
  isRecurring: boolean;
  recurringPattern?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryImage {
  _id: string;
  title: string;
  description: string;
  album: string;
  imageUrl: string;
  cloudinaryId: string;
  featured: boolean;
  createdAt: string;
}
