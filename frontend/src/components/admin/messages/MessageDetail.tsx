import { ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import MessageStatusBadge from './MessageStatusBadge';
import type { ContactMessage, ContactMessageStatus } from './types';

type MessageDetailProps = {
  message: ContactMessage;
  onBack: () => void;
  onUpdateStatus: (message: ContactMessage, status: ContactMessageStatus) => void;
  onDelete: (message: ContactMessage) => void;
};

export default function MessageDetail({
  message,
  onBack,
  onUpdateStatus,
  onDelete,
}: MessageDetailProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="border-b border-gray-100 px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          <ChevronLeftIcon className="h-4 w-4" aria-hidden />
          Back to Messages
        </button>
      </div>

      <div className="p-4 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <MessageStatusBadge status={message.status} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{message.subject}</h2>
            <p className="mt-1 text-sm text-gray-500">
              {new Date(message.createdAt).toLocaleString()}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onDelete(message)}
            className="rounded-md p-2 text-red-600 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            aria-label="Delete message"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>

        <dl className="mb-6 space-y-2 text-sm">
          <div>
            <dt className="font-medium text-gray-700">From</dt>
            <dd className="text-gray-600">{message.name}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-700">Email</dt>
            <dd>
              <a
                className="break-all text-primary-600 hover:underline"
                href={`mailto:${message.email}`}
              >
                {message.email}
              </a>
            </dd>
          </div>
          {message.phone && (
            <div>
              <dt className="font-medium text-gray-700">Phone</dt>
              <dd className="text-gray-600">{message.phone}</dd>
            </div>
          )}
        </dl>

        <p className="whitespace-pre-wrap rounded-md bg-gray-50 p-4 text-gray-700">
          {message.message}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" className="btn-secondary" onClick={() => onUpdateStatus(message, 'read')}>
            Mark read
          </button>
          <button type="button" className="btn-secondary" onClick={() => onUpdateStatus(message, 'responded')}>
            Mark responded
          </button>
          <a
            className="btn-primary"
            href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`}
          >
            Reply
          </a>
        </div>
      </div>
    </div>
  );
}
