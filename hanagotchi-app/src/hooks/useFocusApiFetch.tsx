import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useToggle } from "./useToggle";

export function useFocusApiFetch<ResponseDataType>(
    apiCall: () => Promise<ResponseDataType>, 
    initialValue: ResponseDataType, 
    deps?: React.DependencyList
  ) {
  const [error, setError] = useState<Error | null>(null);
  const [fetchedData, setFetchedData] = useState<ResponseDataType>(initialValue);
  const [isFetching, setFetching] = useState<boolean>(true);
  const [fetchSignal, toggleFetchSignal] = useToggle(false);

  useEffect(() => {
    async function fetchData() {
      setFetching(true);
      try {
        const data = await apiCall();
        setFetchedData(data);
      } catch (e) {
        setError(e as Error);
      } finally {
        setFetching(false);
      }
    }

    fetchData();
  }, deps ? [...deps, fetchSignal] : [fetchSignal]);

  useFocusEffect(
    useCallback(() => toggleFetchSignal(), [])
    )   

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  };
}
