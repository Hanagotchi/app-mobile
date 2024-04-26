import { useContext } from "react";
import { OpenWeatherApi } from "../services/openWeatherApi";
import { OpenWeatherApiContext } from "../contexts/OpenWeatherServiceContext";

export const useOpenWeatherApi = (): OpenWeatherApi => {
    const openWeatherContextValue = useContext(OpenWeatherApiContext);
    if (!openWeatherContextValue) {
      throw new Error("useOpenWeatherApi must be used inside OpenWeatherApiProvider");
    }
    return openWeatherContextValue;
  };