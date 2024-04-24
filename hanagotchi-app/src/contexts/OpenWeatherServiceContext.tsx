import axios, { InternalAxiosRequestConfig } from "axios";
import env from "../environment/loader";
import { OpenWeatherApi, OpenWeatherApiImpl } from "../services/openWeatherApi";
import { PropsWithChildren, createContext } from "react";

const axiosInstance = axios.create({
    baseURL: env.openWeatherApiUrl
  });
  
const api: OpenWeatherApi = new OpenWeatherApiImpl(axiosInstance, env.openWeatherAppId);
export const OpenWeatherApiContext = createContext<OpenWeatherApi | undefined>(api);

export const OpenWeatherApiProvider: React.FC<PropsWithChildren> = ({ children }) => {
  
    // Add a request interceptor
    axiosInstance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
      // Do something before request is sent

      return request;
    });
  
    // Add a response interceptor
    axiosInstance.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // console.log("Response", response);
  
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
  
        console.log("Error", error);
        return Promise.reject(error);
      },
    );
  
    return <OpenWeatherApiContext.Provider value={api}>{children}</OpenWeatherApiContext.Provider>;
  };
  