import { EnvelopeIcon } from '@heroicons/react/24/outline';
import MessagePreviewRow from './MessagePreviewRow';
import type { ContactMessage } from './types';

type MessagePreviewListProps = {
  messages: ContactMessage[];
  onSelect: (message: ContactMessage) => void;
};

export default function MessagePreviewList({ messages, onSelect }: MessagePreviewListProps) {
  if (messages.length === 0) {
    return (
      <div className="overflow-hidden rounded-lg bg-white p-8 text-center shadow">
        <EnvelopeIcon className="mx-auto h-10 w-10 text-gray-300" />
        <p className="mt-3 text-gray-500">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <ul className="divide-y divide-gray-100">
        {messages.map((message) => (
          <MessagePreviewRow key={message._id} message={message} onSelect={onSelect} />
        ))}
      </ul>
    </div>
  );
}
