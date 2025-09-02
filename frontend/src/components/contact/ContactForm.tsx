'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would be an API call
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-6 md:p-8"
    >
      <h2 className="heading-2 mb-6">Send Us a Message</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
          <input
            id="name"
            type="text"
            className={`w-full p-3 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Your name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            className={`w-full p-3 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Your email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-gray-700 mb-1">Phone (Optional)</label>
          <input
            id="phone"
            type="tel"
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Your phone number"
            {...register('phone')}
          />
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-gray-700 mb-1">Subject</label>
          <input
            id="subject"
            type="text"
            className={`w-full p-3 border rounded-md ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Message subject"
            {...register('subject', { required: 'Subject is required' })}
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
        </div>
        
        <div>
          <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
          <textarea
            id="message"
            rows={5}
            className={`w-full p-3 border rounded-md ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Your message"
            {...register('message', { 
              required: 'Message is required',
              minLength: {
                value: 10,
                message: 'Message must be at least 10 characters'
              }
            })}
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full py-3 flex justify-center items-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : 'Send Message'}
        </button>
      </form>
      
      <Toaster position="bottom-right" />
    </motion.div>
  );
}