'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, PhotoIcon } from '@heroicons/react/24/outline';

// Mock data for gallery images
const initialGalleryItems = [
  {
    id: '1',
    title: 'Sunday Divine Liturgy',
    description: 'Photos from our weekly Divine Liturgy service',
    imageUrl: '/images/placeholder-1.jpg',
    category: 'Services',
    featured: true,
    uploadDate: '2023-05-15',
  },
  {
    id: '2',
    title: 'Church Building',
    description: 'Photos of our beautiful church building and grounds',
    imageUrl: '/images/placeholder-2.jpg',
    category: 'Facilities',
    featured: true,
    uploadDate: '2023-04-20',
  },
  {
    id: '3',
    title: 'Youth Group Activities',
    description: 'Our youth group during various activities and events',
    imageUrl: '/images/placeholder-3.jpg',
    category: 'Youth',
    featured: false,
    uploadDate: '2023-05-10',
  },
  {
    id: '4',
    title: 'Easter Celebration',
    description: 'Photos from our Easter celebration and services',
    imageUrl: '/images/placeholder-4.jpg',
    category: 'Holidays',
    featured: true,
    uploadDate: '2023-04-16',
  },
];

// Categories for gallery items
const categories = ['Services', 'Facilities', 'Youth', 'Holidays', 'Community', 'Other'];

// Define types for our data
type GalleryItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  featured: boolean;
  uploadDate: string;
};

export default function GalleryManager() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGalleryItems);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    featured: boolean;
    imageFile: File | null;
    imageUrl: string;
    uploadDate: string;
  }>({
    title: '',
    description: '',
    imageUrl: '',
    category: 'Services',
    featured: false,
    uploadDate: '',
    imageFile: null,
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    // Simulate API call to get gallery items
    const fetchGalleryItems = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setGalleryItems(initialGalleryItems);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching gallery items:', error);
        setIsLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  const handleOpenModal = (item?: GalleryItem | null) => {
    if (item) {
      setCurrentItem(item);
      setFormData({
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        category: item.category,
        featured: item.featured,
        uploadDate: item.uploadDate,
        imageFile: null,
      });
      setImagePreview(item.imageUrl);
    } else {
      setCurrentItem(null);
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        category: 'Services',
        featured: false,
        uploadDate: new Date().toISOString().split('T')[0],
        imageFile: null,
      });
      setImagePreview('');
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setImagePreview('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const type = (e.target as HTMLInputElement).type;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const file = files[0];
    if (file) {
      // In a real app, this would upload to Cloudinary or similar service
      // For now, we'll just create a local URL for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        // Type guard to ensure we only use string results
        if (typeof reader.result === 'string') {
          setImagePreview(reader.result);
          setFormData({
            ...formData,
            imageUrl: reader.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real app, this would be an API call
    if (currentItem) {
      // Update existing item
      const updatedItems = galleryItems.map((item) =>
        item.id === currentItem.id ? { ...item, ...formData } : item
      );
      setGalleryItems(updatedItems);
    } else {
      // Add new item
      const newItem = {
        id: Date.now().toString(),
        ...formData,
      };
      setGalleryItems([...galleryItems, newItem]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    // In a real app, this would be an API call
    const updatedItems = galleryItems.filter((item) => item.id !== id);
    setGalleryItems(updatedItems);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Gallery</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Image
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse h-48 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 bg-gray-200">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <PhotoIcon className="h-16 w-16 text-gray-400" />
                  </div>
                )}
                {item.featured && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-primary-600 text-white text-xs rounded-md">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{formatDate(item.uploadDate)}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for adding/editing gallery items */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {currentItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        name="category"
                        id="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        required
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image
                      </label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                      />
                      {imagePreview && (
                        <div className="mt-2">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-32 w-auto object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="featured"
                        id="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                        Featured Image
                      </label>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {currentItem ? 'Update' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}