'use client';

import { useState, useEffect, FC } from 'react';
import { 
  UserGroupIcon, 
  CalendarIcon, 
  PhotoIcon, 
  EnvelopeIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// Define types for our data
type StatItem = {
  count: number;
  label: string;
};

type Stats = {
  divisions: StatItem;
  events: StatItem;
  gallery: StatItem;
  messages: StatItem;
};

type ActivityItem = {
  id: number;
  action: string;
  time: string;
};

// Mock data for dashboard stats
const initialStats: Stats = {
  divisions: { count: 0, label: 'Divisions' },
  events: { count: 0, label: 'Events' },
  gallery: { count: 0, label: 'Gallery Items' },
  messages: { count: 0, label: 'Unread Messages' },
};

// Mock data for recent activity
const recentActivity: ActivityItem[] = [
  { id: 1, action: 'New contact message received', time: '5 minutes ago' },
  { id: 2, action: 'Event "Sunday Divine Liturgy" updated', time: '2 hours ago' },
  { id: 3, action: 'New gallery image uploaded', time: '1 day ago' },
  { id: 4, action: 'Division "Youth Ministry" updated', time: '2 days ago' },
];

type StatCardProps = {
  icon: FC<any>;
  count: number;
  label: string;
  bgColor: string;
};

const StatCard: FC<StatCardProps> = ({ icon: Icon, count, label, bgColor }) => (
  <div className={`${bgColor} rounded-lg shadow-md p-6`}>
    <div className="flex items-center">
      <div className="flex-shrink-0 bg-white p-3 rounded-md">
        <Icon className="h-6 w-6 text-gray-700" />
      </div>
      <div className="ml-4">
        <div className="text-2xl font-bold">{count}</div>
        <div className="text-gray-700">{label}</div>
      </div>
    </div>
  </div>
);

export default function DashboardHome() {
  const [stats, setStats] = useState<Stats>(initialStats);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API call to get dashboard stats
    const fetchStats = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setStats({
            divisions: { count: 4, label: 'Divisions' },
            events: { count: 12, label: 'Events' },
            gallery: { count: 24, label: 'Gallery Items' },
            messages: { count: 5, label: 'Unread Messages' },
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
        <p className="text-gray-600 mb-6">Welcome to the admin dashboard. Here's an overview of your website content.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse h-32 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={UserGroupIcon} 
            count={stats.divisions.count} 
            label={stats.divisions.label} 
            bgColor="bg-primary-600" 
          />
          <StatCard 
            icon={CalendarIcon} 
            count={stats.events.count} 
            label={stats.events.label} 
            bgColor="bg-secondary-600" 
          />
          <StatCard 
            icon={PhotoIcon} 
            count={stats.gallery.count} 
            label={stats.gallery.label} 
            bgColor="bg-accent-600" 
          />
          <StatCard 
            icon={EnvelopeIcon} 
            count={stats.messages.count} 
            label={stats.messages.label} 
            bgColor="bg-primary-700" 
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
            <ClockIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div className="flex-shrink-0 h-4 w-4 mt-1 rounded-full bg-primary-500"></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
            <ChartBarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center justify-center p-4 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors">
              <CalendarIcon className="h-5 w-5 mr-2" />
              <span>Add New Event</span>
            </button>
            <button className="flex items-center justify-center p-4 bg-secondary-50 text-secondary-700 rounded-lg hover:bg-secondary-100 transition-colors">
              <PhotoIcon className="h-5 w-5 mr-2" />
              <span>Upload Photos</span>
            </button>
            <button className="flex items-center justify-center p-4 bg-accent-50 text-accent-700 rounded-lg hover:bg-accent-100 transition-colors">
              <UserGroupIcon className="h-5 w-5 mr-2" />
              <span>Edit Divisions</span>
            </button>
            <button className="flex items-center justify-center p-4 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors">
              <EnvelopeIcon className="h-5 w-5 mr-2" />
              <span>View Messages</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}