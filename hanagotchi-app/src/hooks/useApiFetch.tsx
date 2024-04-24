import { useEffect, useState } from "react";

export function useApiFetch<ResponseDataType>(
    apiCall: () => Promise<ResponseDataType>,
    initialValue: ResponseDataType,
    deps?: React.DependencyList
  ) {
  const [error, setError] = useState<Error | null>(null);
  const [fetchedData, setFetchedData] = useState<ResponseDataType>(initialValue);
  const [isFetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setFetching(true);
      try {
        const data = await apiCall();
        setFetchedData(data);
        setError(null);
      } catch (e) {
        setError(e as Error);
        setFetchedData(initialValue);
      } finally {
        setFetching(false);
      }
    }

    fetchData();
  }, deps ?? []);

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  };
}
