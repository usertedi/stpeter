'use client';

import { useEffect, useState } from 'react';
import { EnvelopeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { apiFetch, getApiErrorMessage } from '@/lib/api';

type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  createdAt: string;
};

const getToken = () => (typeof window === 'undefined' ? null : localStorage.getItem('token'));

export default function ContactManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    const token = getToken();
    if (!token) {
      setError('You must be signed in to view messages.');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiFetch('/contact?limit=100', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(await getApiErrorMessage(response, 'Failed to load messages'));
      }

      const data = await response.json();
      setMessages(data.data || []);
      setSelectedMessage((current) => {
        if (!current) return null;
        return (data.data || []).find((message: ContactMessage) => message._id === current._id) || null;
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const updateStatus = async (message: ContactMessage, status: ContactMessage['status']) => {
    const token = getToken();
    if (!token) return;

    const previousMessages = messages;
    const previousSelected = selectedMessage;
    const nextMessage = { ...message, status };

    setMessages((current) => current.map((item) => (item._id === message._id ? nextMessage : item)));
    setSelectedMessage(nextMessage);

    try {
      const response = await apiFetch(`/contact/${message._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(await getApiErrorMessage(response, 'Failed to update message'));
      }
    } catch (err) {
      setMessages(previousMessages);
      setSelectedMessage(previousSelected);
      setError(err instanceof Error ? err.message : 'Failed to update message');
    }
  };

  const deleteMessage = async (message: ContactMessage) => {
    if (!window.confirm('Delete this message permanently?')) return;

    const token = getToken();
    if (!token) return;

    const previousMessages = messages;
    setMessages((current) => current.filter((item) => item._id !== message._id));
    if (selectedMessage?._id === message._id) setSelectedMessage(null);

    try {
      const response = await apiFetch(`/contact/${message._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(await getApiErrorMessage(response, 'Failed to delete message'));
      }
    } catch (err) {
      setMessages(previousMessages);
      setSelectedMessage(message);
      setError(err instanceof Error ? err.message : 'Failed to delete message');
    }
  };

  const openMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (message.status === 'new') {
      updateStatus(message, 'read');
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-lg bg-white p-8 text-center shadow">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary-100 border-t-primary-600" />
        <p className="mt-4 text-gray-600">Loading messages...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-sm text-gray-500">Review public contact form submissions.</p>
        </div>
        <button type="button" onClick={fetchMessages} className="btn-secondary">
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <EnvelopeIcon className="mx-auto h-10 w-10 text-gray-300" />
              <p className="mt-3">No messages yet.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {messages.map((message) => (
                <li key={message._id}>
                  <button
                    type="button"
                    onClick={() => openMessage(message)}
                    className={`block w-full p-4 text-left hover:bg-gray-50 ${selectedMessage?._id === message._id ? 'bg-primary-50' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-gray-900">{message.subject}</p>
                        <p className="text-sm text-gray-600">{message.name} • {message.email}</p>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${message.status === 'new' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {message.status}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">{message.message}</p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="rounded-lg bg-white p-6 shadow">
          {selectedMessage ? (
            <div>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedMessage.subject}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => deleteMessage(selectedMessage)}
                  className="rounded-md p-2 text-red-600 hover:bg-red-50"
                  aria-label="Delete message"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>

              <dl className="mb-6 space-y-2 text-sm">
                <div>
                  <dt className="font-medium text-gray-700">From</dt>
                  <dd className="text-gray-600">{selectedMessage.name}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-700">Email</dt>
                  <dd>
                    <a className="text-primary-600 hover:underline" href={`mailto:${selectedMessage.email}`}>
                      {selectedMessage.email}
                    </a>
                  </dd>
                </div>
                {selectedMessage.phone && (
                  <div>
                    <dt className="font-medium text-gray-700">Phone</dt>
                    <dd className="text-gray-600">{selectedMessage.phone}</dd>
                  </div>
                )}
              </dl>

              <p className="whitespace-pre-wrap rounded-md bg-gray-50 p-4 text-gray-700">
                {selectedMessage.message}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <button type="button" className="btn-secondary" onClick={() => updateStatus(selectedMessage, 'read')}>
                  Mark read
                </button>
                <button type="button" className="btn-secondary" onClick={() => updateStatus(selectedMessage, 'responded')}>
                  Mark responded
                </button>
                <a className="btn-primary" href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}>
                  Reply
                </a>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500">
              <EnvelopeIcon className="mx-auto h-10 w-10 text-gray-300" />
              <p className="mt-3">Select a message to review.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
