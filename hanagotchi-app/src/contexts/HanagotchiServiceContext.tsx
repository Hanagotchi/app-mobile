import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";
import { PropsWithChildren, createContext } from "react";
import env from "../environment/loader";
import { HanagotchiApi, HanagotchiApiImpl } from "../services/hanagotchiApi";
import { useSession } from "../hooks/useSession";

interface HanagotchiAxiosRequestHeaders extends AxiosRequestHeaders {
  "x-access-token": string;
}

const axiosInstance = axios.create({
  baseURL: env.hanagotchiGatewayUrl,
  //baseURL: env.hanagotchiUserServiceURL,
});

const api: HanagotchiApi = new HanagotchiApiImpl(axiosInstance);
export const HanagotchiApiContext = createContext<HanagotchiApi | undefined>(api);

export const HanagotchiApiProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const accessToken = useSession((state) => state.session?.accessToken);
  // TODO: ver si es necesario realmente un token (y como pasarlo);


  const updateHeader = (request: InternalAxiosRequestConfig) => {
    if (accessToken) {
      request.headers = {
        ...request.headers,
        "x-access-token": accessToken,
      } as HanagotchiAxiosRequestHeaders;
    }

    request.headers = {
      ...request.headers,
      "Content-Type": "application/json",
    } as AxiosRequestHeaders;

    return request;
  };

  // Add a request interceptor
  axiosInstance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    // Do something before request is sent
    //  console.log("Request", request);
    const req = updateHeader(request)
    return req;
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

  return <HanagotchiApiContext.Provider value={api}>{children}</HanagotchiApiContext.Provider>;
};
