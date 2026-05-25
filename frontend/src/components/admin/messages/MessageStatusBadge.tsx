import type { ContactMessageStatus } from './types';

const statusConfig: Record<ContactMessageStatus, { label: string; className: string }> = {
  new: { label: 'Unread', className: 'bg-green-100 text-green-700' },
  read: { label: 'Read', className: 'bg-gray-100 text-gray-600' },
  responded: { label: 'Responded', className: 'bg-blue-100 text-blue-700' },
};

type MessageStatusBadgeProps = {
  status: ContactMessageStatus;
};

export default function MessageStatusBadge({ status }: MessageStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
