import MessageStatusBadge from './MessageStatusBadge';
import type { ContactMessage } from './types';

type MessagePreviewRowProps = {
  message: ContactMessage;
  onSelect: (message: ContactMessage) => void;
};

export default function MessagePreviewRow({ message, onSelect }: MessagePreviewRowProps) {
  const isUnread = message.status === 'new';

  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(message)}
        className="block w-full px-4 py-3 text-left transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
      >
        <div className="flex flex-wrap items-start gap-3">
          <span
            className={`mt-2 h-2 w-2 shrink-0 rounded-full ${isUnread ? 'bg-primary-500' : 'bg-transparent'}`}
            aria-hidden
          />
          <div className="min-w-0 flex-1 basis-0">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
              <p className={`break-words text-sm ${isUnread ? 'font-semibold text-gray-900' : 'font-medium text-gray-800'}`}>
                {message.name}
              </p>
              <time className="shrink-0 text-xs text-gray-500" dateTime={message.createdAt}>
                {new Date(message.createdAt).toLocaleString()}
              </time>
            </div>
            <p className={`mt-0.5 break-words text-sm ${isUnread ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
              {message.subject}
            </p>
            <p className="mt-1 break-words text-xs text-gray-500">{message.email}</p>
          </div>
          <MessageStatusBadge status={message.status} />
        </div>
      </button>
    </li>
  );
}
