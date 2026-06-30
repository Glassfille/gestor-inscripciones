import { useCallback, useEffect, useState } from 'react';

export function useAsync(task, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const execute = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const result = await task();
      setData(result);
    } catch (err) {
      setError(err.response?.data?.message ?? 'No se pudo completar la operacion');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refresh: execute };
}
