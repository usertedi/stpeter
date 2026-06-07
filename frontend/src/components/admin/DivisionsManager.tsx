'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { apiFetch, getApiErrorMessage } from '@/lib/api';
import { refreshPublicContent } from '@/lib/revalidate-public';
import {
  DEFAULT_DIVISION_THEME,
  DIVISION_THEME_OPTIONS,
  normalizeDivisionThemeId,
} from '@/lib/divisionDisplay';

// Mock data for divisions (icon/color slugs match the public site)
const initialDivisions = [
  {
    _id: '1',
    title: 'Worship & Prayer',
    description: 'Join us for Divine Liturgy, prayer services, and spiritual guidance.',
    icon: 'worship',
    color: 'worship',
  },
  {
    _id: '2',
    title: 'Community Outreach',
    description: 'Serving our community through charity work and social programs.',
    icon: 'outreach',
    color: 'outreach',
  },
  {
    _id: '3',
    title: 'Choir & Music',
    description: 'Experience the beauty of Orthodox hymns and musical traditions.',
    icon: 'music',
    color: 'music',
  },
  {
    _id: '4',
    title: 'Education',
    description: 'Learn about Orthodox faith through classes, study groups, and resources.',
    icon: 'education',
    color: 'education',
  },
];

// Define types for our data
type Division = {
  _id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
};

type FormData = {
  title: string;
  description: string;
  icon: string;
  color: string;
};

export default function DivisionsManager() {
  const [divisions, setDivisions] = useState<Division[]>(initialDivisions);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentDivision, setCurrentDivision] = useState<Division | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    icon: DEFAULT_DIVISION_THEME,
    color: DEFAULT_DIVISION_THEME,
  });

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setDivisions(initialDivisions);
          setIsLoading(false);
          return;
        }

        const response = await apiFetch('/divisions', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDivisions(data.data || []);
        } else {
          // Fallback to static data if API fails
          setDivisions(initialDivisions);
        }
      } catch (error) {
        console.error('Error fetching divisions:', error);
        // Fallback to static data on error
        setDivisions(initialDivisions);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDivisions();
  }, []);

  const handleOpenModal = (division?: Division | null) => {
    if (division) {
      setCurrentDivision(division);
      setFormData({
        title: division.title,
        description: division.description,
        icon: normalizeDivisionThemeId(division.icon),
        color: normalizeDivisionThemeId(division.color),
      });
    } else {
      setCurrentDivision(null);
      setFormData({
        title: '',
        description: '',
        icon: DEFAULT_DIVISION_THEME,
        color: DEFAULT_DIVISION_THEME,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentDivision(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to make changes');
        return;
      }

      if (currentDivision) {
        // Update existing division
        const response = await apiFetch(`/divisions/${currentDivision._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(await getApiErrorMessage(response, 'Failed to update division'));
        }

        const updatedDivision = await response.json();
        const updatedDivisions = divisions.map((div) =>
          div._id === currentDivision._id ? { ...div, ...updatedDivision.data } : div
        );
        setDivisions(updatedDivisions);
      } else {
        // Add new division
        const response = await apiFetch('/divisions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(await getApiErrorMessage(response, 'Failed to create division'));
        }

        const newDivision = await response.json();
        setDivisions([...divisions, newDivision.data]);
      }

      await refreshPublicContent('divisions');
      handleCloseModal();
    } catch (error) {
      console.error('Error saving division:', error);
      alert(`Failed to save division. ${error instanceof Error ? error.message : ''}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this division?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to make changes');
        return;
      }

      const response = await apiFetch(`/divisions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(await getApiErrorMessage(response, 'Failed to delete division'));
      }

      const updatedDivisions = divisions.filter((div) => div._id !== id);
      setDivisions(updatedDivisions);
      await refreshPublicContent('divisions');
    } catch (error) {
      console.error('Error deleting division:', error);
      alert('Failed to delete division. Please try again.');
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Manage Divisions</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex w-full items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:w-auto"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Division
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse h-24 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <div className="overflow-x-auto">
          <table className="min-w-[760px] divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Icon
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {divisions.map((division) => (
                <tr key={division._id}>
                  <td className="min-w-0 px-6 py-4">
                    <div className="break-words text-sm font-medium text-gray-900">{division.title}</div>
                  </td>
                  <td className="min-w-0 px-6 py-4">
                    <div className="break-words text-sm text-gray-500">{division.description}</div>
                  </td>
                  <td className="min-w-0 px-6 py-4">
                    <div className="break-words text-sm text-gray-500">
                      {DIVISION_THEME_OPTIONS.find((o) => o.value === normalizeDivisionThemeId(division.icon))
                        ?.label ?? normalizeDivisionThemeId(division.icon)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleOpenModal(division)}
                      className="text-primary-600 hover:text-primary-900 mr-4"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(division._id)}
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
        </div>
      )}

      {/* Modal for adding/editing divisions */}
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
                    {currentDivision ? 'Edit Division' : 'Add New Division'}
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
                        Description <span className="font-normal text-gray-500">(optional)</span>
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Optional blurb for this division"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                        Icon
                      </label>
                      <select
                        name="icon"
                        id="icon"
                        value={formData.icon}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        required
                      >
                        {DIVISION_THEME_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <p className="mt-1 text-xs text-gray-500">
                        Shown on the homepage grid and divisions page cards.
                      </p>
                    </div>
                    <div>
                      <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                        Card color
                      </label>
                      <select
                        name="color"
                        id="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        required
                      >
                        {DIVISION_THEME_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <p className="mt-1 text-xs text-gray-500">
                        Header tint on the homepage “Our Divisions” cards. The full divisions page uses a
                        fixed pastel rotation for readability; icon choice still applies there.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {currentDivision ? 'Update' : 'Add'}
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