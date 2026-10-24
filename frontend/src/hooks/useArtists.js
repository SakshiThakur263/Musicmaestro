import { useState, useEffect, useCallback } from 'react';
import { getArtists } from '../services/api';

export const useArtists = (initialParams = {}) => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, pages: 1 });
  const [params, setParams] = useState(initialParams);

  const fetchArtists = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getArtists(params);
      setArtists(response.data || []);
      if (response.pagination) {
        setPagination(response.pagination);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load artists');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  const updateParams = (newParams) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  return {
    artists,
    loading,
    error,
    pagination,
    params,
    updateParams,
    refetch: fetchArtists,
  };
};

export default useArtists;
