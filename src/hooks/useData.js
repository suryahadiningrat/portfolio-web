import { useState, useEffect } from 'react';

const useData = (filename) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await import(`../data/${filename}.json`);
        setData(response.default);
        setError(null);
      } catch (err) {
        setError(`Failed to load ${filename}.json`);
        console.error(`Error loading ${filename}.json:`, err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filename]);

  return { data, loading, error };
};

export default useData;
