'use client';

import { useEffect, useState } from 'react';
import { apiFetch, getApiErrorMessage } from '@/lib/api';
import MessageDetail from './MessageDetail';
import MessagePreviewList from './MessagePreviewList';
import type { ContactMessage, ContactMessageStatus } from './types';

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

  const updateStatus = async (message: ContactMessage, status: ContactMessageStatus) => {
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

  const resetMainScroll = () => {
    const main = document.querySelector('main');
    if (main instanceof HTMLElement) {
      main.scrollTop = 0;
    }
  };

  const openMessage = (message: ContactMessage) => {
    resetMainScroll();
    setSelectedMessage(message);
    if (message.status === 'new') {
      updateStatus(message, 'read');
    }
  };

  const handleBack = () => {
    setSelectedMessage(null);
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
        {!selectedMessage && (
          <button type="button" onClick={fetchMessages} className="btn-secondary">
            Refresh
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {selectedMessage ? (
        <MessageDetail
          message={selectedMessage}
          onBack={handleBack}
          onUpdateStatus={updateStatus}
          onDelete={deleteMessage}
        />
      ) : (
        <MessagePreviewList messages={messages} onSelect={openMessage} />
      )}
    </div>
  );
}
