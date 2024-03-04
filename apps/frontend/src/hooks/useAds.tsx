/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
});

const useApi = <T,>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response: AxiosResponse<T> = await instance(url, options);
        setData(response.data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [options?.params]);

  return { data, isLoading, isError };
};

export default useApi;
