'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Mock data for events
const initialEvents = [
  {
    id: '1',
    title: 'Sunday Divine Liturgy',
    description: 'Weekly Divine Liturgy service',
    date: '2023-05-28',
    time: '10:00 AM - 12:00 PM',
    location: 'Main Church',
    featured: true,
  },
  {
    id: '2',
    title: 'Bible Study Group',
    description: 'Weekly Bible study and discussion',
    date: '2023-05-31',
    time: '7:00 PM - 8:30 PM',
    location: 'Church Hall',
    featured: false,
  },
  {
    id: '3',
    title: 'Youth Group Meeting',
    description: 'Weekly gathering for youth activities and fellowship',
    date: '2023-06-02',
    time: '6:30 PM - 8:00 PM',
    location: 'Youth Center',
    featured: false,
  },
  {
    id: '4',
    title: 'Church Feast Day Celebration',
    description: 'Annual celebration of our church patron saint',
    date: '2023-06-29',
    time: '9:00 AM - 2:00 PM',
    location: 'Church Grounds',
    featured: true,
  },
];

// Define types for our data
type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  featured: boolean;
};

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    featured: false,
  });

  useEffect(() => {
    // Simulate API call to get events
    const fetchEvents = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setEvents(initialEvents);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching events:', error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleOpenModal = (event?: Event | null) => {
    if (event) {
      setCurrentEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        featured: event.featured,
      });
    } else {
      setCurrentEvent(null);
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real app, this would be an API call
    if (currentEvent) {
      // Update existing event
      const updatedEvents = events.map((evt) =>
        evt.id === currentEvent.id ? { ...evt, ...formData } : evt
      );
      setEvents(updatedEvents);
    } else {
      // Add new event
      const newEvent = {
        id: Date.now().toString(),
        ...formData,
      };
      setEvents([...events, newEvent]);
    }
    
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    // In a real app, this would be an API call
    const updatedEvents = events.filter((evt) => evt.id !== id);
    setEvents(updatedEvents);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Events</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Event
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse h-24 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Featured
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{event.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{event.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(event.date)}</div>
                    <div className="text-sm text-gray-500">{event.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{event.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${event.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {event.featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleOpenModal(event)}
                      className="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for adding/editing events */}
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
                    {currentEvent ? 'Edit Event' : 'Add New Event'}
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
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                        Time
                      </label>
                      <input
                        type="text"
                        name="time"
                        id="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        placeholder="e.g. 10:00 AM - 12:00 PM"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
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
                        Featured Event
                      </label>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {currentEvent ? 'Update' : 'Add'}
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