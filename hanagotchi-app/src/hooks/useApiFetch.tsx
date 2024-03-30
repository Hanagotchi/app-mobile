import { useEffect, useState } from "react";

export function useApiFetch<ResponseDataType>(fetchFn: () => Promise<ResponseDataType>, initialValue: ResponseDataType) {
  const [error, setError] = useState<Error | null>(null);
  const [fetchedData, setFetchedData] = useState<ResponseDataType>(initialValue);
  const [isFetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (e) {
        setError(e as Error);
      } finally {
        setFetching(false);
      }
    }

    fetchData();
  }, []);

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  };
}
