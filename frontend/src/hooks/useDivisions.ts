import { useState, useEffect } from 'react';

export interface Division {
  _id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useDivisions = () => {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDivisions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/divisions`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch divisions');
      }
      
      const data = await response.json();
      setDivisions(data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching divisions:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch divisions');
      // Fallback to empty array on error
      setDivisions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  return { divisions, loading, error, refresh: fetchDivisions };
};
