'use client';

import { useState, useEffect } from 'react';
import { TrashIcon, EnvelopeOpenIcon, EnvelopeIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';

// Mock data for contact messages
const initialMessages = [
	{
		id: '1',
		name: 'John Smith',
		email: 'john.smith@example.com',
		subject: 'Question about service times',
		message: 'Hello, I was wondering what time the Sunday Divine Liturgy starts? Also, do you have any weekday services? Thank you!',
		date: '2023-05-25T14:30:00',
		read: true,
	},
	{
		id: '2',
		name: 'Maria Johnson',
		email: 'maria.j@example.com',
		subject: 'Interested in joining the choir',
		message: 'I have been attending your church for a few months now and I am interested in joining the choir. I have previous experience singing in choirs. Could you please let me know who I should speak with about this opportunity?',
		date: '2023-05-27T09:15:00',
		read: false,
	},
	{
		id: '3',
		name: 'David Williams',
		email: 'david.w@example.com',
		subject: 'Donation inquiry',
		message: 'I would like to make a donation to the church. Could you please provide information on how to do this? Is there a specific fund or project that needs support at the moment?',
		date: '2023-05-26T16:45:00',
		read: false,
	},
	{
		id: '4',
		name: 'Sarah Thompson',
		email: 'sarah.t@example.com',
		subject: 'Baptism information',
		message: 'My husband and I recently had a baby and we would like to have her baptized at your church. Could you please provide information about the baptism process, requirements, and available dates?',
		date: '2023-05-24T11:20:00',
		read: true,
	},
];

// Define types for our data
type Message = {
	id: string;
	name: string;
	email: string;
	subject: string;
	message: string;
	date: string;
	read: boolean;
};

export default function ContactManager() {
	const [messages, setMessages] = useState<Message[]>(initialMessages);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
	const [isReplyModalOpen, setIsReplyModalOpen] = useState<boolean>(false);
	const [replyText, setReplyText] = useState('');
	const [filter, setFilter] = useState('all'); // 'all', 'read', 'unread'

	useEffect(() => {
		// Simulate API call to get messages
		const fetchMessages = async () => {
			try {
				// In a real app, this would be an API call
				setTimeout(() => {
					setMessages(initialMessages);
					setIsLoading(false);
				}, 1000);
			} catch (error) {
				console.error('Error fetching messages:', error);
				setIsLoading(false);
			}
		};

		fetchMessages();
	}, []);

	const handleSelectMessage = (message: Message) => {
		setSelectedMessage(message);

		// Mark as read if it wasn't already
		if (!message.read) {
			const updatedMessages = messages.map((msg) =>
				msg.id === message.id ? { ...msg, read: true } : msg
			);
			setMessages(updatedMessages);
		}
	};

	const handleDelete = (id: string) => {
		// In a real app, this would be an API call
		const updatedMessages = messages.filter((msg) => msg.id !== id);
		setMessages(updatedMessages);

		if (selectedMessage && selectedMessage.id === id) {
			setSelectedMessage(null);
		}
	};

	const handleOpenReplyModal = () => {
		setIsReplyModalOpen(true);
		if (selectedMessage) {
			setReplyText(
				`Dear ${selectedMessage.name},\n\nThank you for your message. \n\nBest regards,\nSt. Peter Orthodox Church`
			);
		} else {
			setReplyText('');
		}
	};

	const handleCloseReplyModal = () => {
		setIsReplyModalOpen(false);
		setReplyText('');
	};

	const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// In a real app, this would send an email via API
		console.log('Sending reply to:', selectedMessage.email);
		console.log('Reply content:', replyText);

		// Close the modal
		handleCloseReplyModal();

		// Show success message (in a real app)
		alert('Reply sent successfully!');
	};

	const filteredMessages = messages.filter((msg) => {
		if (filter === 'all') return true;
		if (filter === 'read') return msg.read;
		if (filter === 'unread') return !msg.read;
		return true;
	});

	// Format date for display
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		<div className="h-full">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-gray-800">Contact Messages</h2>
				<div className="flex space-x-2">
					<button
						onClick={() => setFilter('all')}
						className={`px-3 py-1 text-sm rounded-md ${
							filter === 'all'
								? 'bg-primary-600 text-white'
								: 'bg-gray-200 text-gray-700'
						}`}
					>
						All
					</button>
					<button
						onClick={() => setFilter('unread')}
						className={`px-3 py-1 text-sm rounded-md ${
							filter === 'unread'
								? 'bg-primary-600 text-white'
								: 'bg-gray-200 text-gray-700'
						}`}
					>
						Unread
					</button>
					<button
						onClick={() => setFilter('read')}
						className={`px-3 py-1 text-sm rounded-md ${
							filter === 'read'
								? 'bg-primary-600 text-white'
								: 'bg-gray-200 text-gray-700'
						}`}
					>
						Read
					</button>
				</div>
			</div>

			{isLoading ? (
				<div className="grid grid-cols-1 gap-4">
					{[...Array(4)].map((_, i) => (
						<div
							key={i}
							className="bg-gray-200 animate-pulse h-24 rounded-lg"
						></div>
					))}
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
					<div className="md:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
						<div className="divide-y divide-gray-200 max-h-[calc(100vh-250px)] overflow-y-auto">
							{filteredMessages.length === 0 ? (
								<div className="p-4 text-center text-gray-500">
									No messages found
								</div>
							) : (
								filteredMessages.map((message) => (
									<div
										key={message.id}
										onClick={() => handleSelectMessage(message)}
										className={`p-4 cursor-pointer hover:bg-gray-50 ${
											selectedMessage?.id === message.id ? 'bg-gray-100' : ''
										} ${!message.read ? 'border-l-4 border-primary-600' : ''}`}
									>
										<div className="flex justify-between items-start">
											<div className="flex items-center">
												{message.read ? (
													<EnvelopeOpenIcon className="h-5 w-5 text-gray-400 mr-2" />
												) : (
													<EnvelopeIcon className="h-5 w-5 text-primary-600 mr-2" />
												)}
												<span
													className={`font-medium ${
														!message.read ? 'text-gray-900' : 'text-gray-700'
													}`}
												>
													{message.name}
												</span>
											</div>
											<span className="text-xs text-gray-500">
												{new Date(message.date).toLocaleDateString()}
											</span>
										</div>
										<h3
											className={`mt-1 text-sm ${
												!message.read ? 'font-semibold' : 'font-normal'
											}`}
										>
											{message.subject}
										</h3>
										<p className="mt-1 text-sm text-gray-600 truncate">
											{message.message.substring(0, 60)}...
										</p>
									</div>
								))
							)}
						</div>
					</div>

					<div className="md:col-span-2">
						{selectedMessage ? (
							<div className="bg-white rounded-lg shadow-md p-6 h-full">
								<div className="flex justify-between items-start mb-4">
									<div>
										<h2 className="text-xl font-semibold text-gray-900">
											{selectedMessage.subject}
										</h2>
										<p className="text-sm text-gray-600 mt-1">
											From: {selectedMessage.name} &lt;{selectedMessage.email}&gt;
										</p>
										<p className="text-sm text-gray-500 mt-1">
											{formatDate(selectedMessage.date)}
										</p>
									</div>
									<div className="flex space-x-2">
										<button
											onClick={handleOpenReplyModal}
											className="flex items-center px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
										>
											<ArrowUturnLeftIcon className="h-4 w-4 mr-1" />
											Reply
										</button>
										<button
											onClick={() => handleDelete(selectedMessage.id)}
											className="flex items-center px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
										>
											<TrashIcon className="h-4 w-4 mr-1" />
											Delete
										</button>
									</div>
								</div>
								<div className="border-t border-gray-200 pt-4 mt-4">
									<div className="prose max-w-none">
										<p className="whitespace-pre-line">
											{selectedMessage.message}
										</p>
									</div>
								</div>
							</div>
						) : (
							<div className="bg-white rounded-lg shadow-md p-6 h-full flex items-center justify-center">
								<div className="text-center">
									<EnvelopeIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
									<h3 className="text-lg font-medium text-gray-900">
										Select a message
									</h3>
									<p className="mt-1 text-sm text-gray-500">
										Choose a message from the list to view its contents
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			)}

			{/* Reply Modal */}
			{isReplyModalOpen && selectedMessage && (
				<div className="fixed inset-0 z-50 overflow-y-auto">
					<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div className="fixed inset-0 transition-opacity" aria-hidden="true">
							<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
						</div>

						<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							<form onSubmit={handleReplySubmit}>
								<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
									<h3 className="text-lg font-medium text-gray-900 mb-4">
										Reply to {selectedMessage.name}
									</h3>
									<div className="space-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-700">
												To: {selectedMessage.name} &lt;{selectedMessage.email}&gt;
											</label>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700">
											.Subject: Re: {selectedMessage.subject}
											</label>
										</div>
										<div>
											<label
												htmlFor="reply"
												className="block text-sm font-medium text-gray-700"
											>
												Message
											</label>
											<textarea
												name="reply"
												id="reply"
												value={replyText}
												onChange={(e) => setReplyText(e.target.value)}
												rows={8}
												className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
												required
											></textarea>
										</div>
									</div>
								</div>
								<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
									<button
										type="submit"
										className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
									>
										Send Reply
									</button>
									<button
										type="button"
										onClick={handleCloseReplyModal}
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