'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { apiFetch, getApiErrorMessage } from '@/lib/api';
import { formatDateTime } from '@/lib/dates';

type User = {
  id: string;
  _id?: string;
  name: string;
  email: string;
  lastLoginAt?: string | null;
  createdAt: string;
};

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const getUserId = (user: User) => user.id || user._id || '';

const mapApiUser = (raw: Record<string, unknown>): User => ({
  id: String(raw.id || raw._id || ''),
  name: String(raw.name || ''),
  email: String(raw.email || ''),
  lastLoginAt: (raw.lastLoginAt as string | null) ?? null,
  createdAt: String(raw.createdAt || ''),
});

export default function UsersManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const getAuthHeaders = (withJson = false) => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };
    if (withJson) headers['Content-Type'] = 'application/json';
    return headers;
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const headers = getAuthHeaders();
      if (!headers) {
        setError('You must be logged in as an admin to manage users.');
        setUsers([]);
        return;
      }

      const response = await apiFetch('/auth/users', { headers });

      if (!response.ok) {
        throw new Error(await getApiErrorMessage(response, 'Failed to load users'));
      }

      const data = await response.json();
      setUsers((data.data || []).map(mapApiUser));
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err instanceof Error ? err.message : 'Failed to load users');
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenModal = (user?: User | null) => {
    if (user) {
      setCurrentUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        confirmPassword: '',
      });
    } else {
      setCurrentUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleOpenPasswordModal = (user: User) => {
    setCurrentUser(user);
    setFormData((prev) => ({
      ...prev,
      password: '',
      confirmPassword: '',
    }));
    setIsPasswordModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const headers = getAuthHeaders(true);
    if (!headers) {
      alert('You must be logged in to make changes');
      return;
    }

    try {
      if (currentUser) {
        const userId = getUserId(currentUser);
        const response = await apiFetch(`/auth/users/${userId}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
          }),
        });

        if (!response.ok) {
          throw new Error(await getApiErrorMessage(response, 'Failed to update user'));
        }

        const data = await response.json();
        setUsers(users.map((usr) => (getUserId(usr) === userId ? mapApiUser(data.data) : usr)));
      } else {
        const response = await apiFetch('/auth/users', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        if (!response.ok) {
          throw new Error(await getApiErrorMessage(response, 'Failed to create user'));
        }

        const data = await response.json();
        setUsers([...users, mapApiUser(data.data)]);
      }

      handleCloseModal();
    } catch (err) {
      console.error('Error saving user:', err);
      alert(err instanceof Error ? err.message : 'Failed to save user');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!currentUser) return;

    const headers = getAuthHeaders(true);
    if (!headers) {
      alert('You must be logged in to make changes');
      return;
    }

    try {
      const userId = getUserId(currentUser);
      const response = await apiFetch(`/auth/users/${userId}/password`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ password: formData.password }),
      });

      if (!response.ok) {
        throw new Error(await getApiErrorMessage(response, 'Failed to update password'));
      }

      alert('Password updated successfully!');
      handleClosePasswordModal();
    } catch (err) {
      console.error('Error updating password:', err);
      alert(err instanceof Error ? err.message : 'Failed to update password');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }

    const headers = getAuthHeaders();
    if (!headers) {
      alert('You must be logged in to make changes');
      return;
    }

    try {
      const response = await apiFetch(`/auth/users/${id}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new Error(await getApiErrorMessage(response, 'Failed to delete user'));
      }

      setUsers(users.filter((usr) => getUserId(usr) !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
      alert(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Manage Admins</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex w-full items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:w-auto"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Admin
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse h-24 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <div className="overflow-x-auto">
          <table className="min-w-[800px] divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={getUserId(user)}>
                  <td className="min-w-0 px-6 py-4">
                    <div className="break-words text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="min-w-0 px-6 py-4">
                    <div className="break-all text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="min-w-0 px-6 py-4">
                    <div className="break-words text-sm text-gray-500">{formatDateTime(user.lastLoginAt)}</div>
                  </td>
                  <td className="min-w-0 px-6 py-4">
                    <div className="break-words text-sm text-gray-500">{formatDateTime(user.createdAt)}</div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button onClick={() => handleOpenPasswordModal(user)} className="text-gray-600 hover:text-gray-900 mr-4" title="Change Password">
                      <LockClosedIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleOpenModal(user)} className="text-primary-600 hover:text-primary-900 mr-4" title="Edit User">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDelete(getUserId(user))} className="text-red-600 hover:text-red-900" title="Delete User">
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
                    {currentUser ? 'Edit Admin' : 'Add New Admin'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                      <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
                    </div>
                    {!currentUser && (
                      <>
                        <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                          <input type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                          <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm">
                    {currentUser ? 'Update' : 'Add'}
                  </button>
                  <button type="button" onClick={handleCloseModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isPasswordModalOpen && currentUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handlePasswordSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password for {currentUser.name}</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                      <input type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                      <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500" required />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Update Password
                  </button>
                  <button type="button" onClick={handleClosePasswordModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
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
