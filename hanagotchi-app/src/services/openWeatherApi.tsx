import { AxiosInstance } from "axios";
import { GetCurrentWeatherResponse, GetCurrentWeatherResponseSchema } from "../models/openWeatherApi";

export interface OpenWeatherApi {
    getCurrentWeather(lat: number, lon: number): Promise<GetCurrentWeatherResponse>
}

const FIVE_MINUTES = 300000;

export class OpenWeatherApiImpl {
    private axiosInstance: AxiosInstance;
    private appId: string;
    private weatherCache: {
        lastResponse: GetCurrentWeatherResponse,
        epoch: number,
        lat: number,
        lon: number,
    } | null;

    constructor(axiosInstance: AxiosInstance, appId: string) {
        this.axiosInstance = axiosInstance;
        this.appId = appId
        this.weatherCache = null;
    }

    async getCurrentWeather(lat: number, lon: number): Promise<GetCurrentWeatherResponse> {
        const timeSinceLastRequest = (new Date()).getTime() - (this.weatherCache?.epoch ?? (new Date()).getTime());

        if (
            this.weatherCache && 
            timeSinceLastRequest < FIVE_MINUTES &&
            this.weatherCache?.lat === lat &&
            this.weatherCache?.lon === lon
        ) {
            return this.weatherCache.lastResponse;
        }

        const {data} = await  this.axiosInstance.get("/data/2.5/weather", {params: {
            lat,
            lon,
            appId: this.appId
        }});
        const weatherData = GetCurrentWeatherResponseSchema.parse(data);
        this.weatherCache = {
            lastResponse: weatherData,
            epoch: (new Date()).getTime(),
            lat,
            lon,
        }
        return weatherData;
    }
}