import { AxiosInstance } from "axios";
import { GetCurrentWeatherResponse, GetCurrentWeatherResponseSchema } from "../models/openWeatherApi";

export interface OpenWeatherApi {
    getCurrentWeather(lat: number, lon: number): Promise<GetCurrentWeatherResponse>
}

export class OpenWeatherApiImpl {
    private axiosInstance: AxiosInstance;
    private appId: string;

    constructor(axiosInstance: AxiosInstance, appId: string) {
        this.axiosInstance = axiosInstance;
        this.appId = appId
    }

    async getCurrentWeather(lat: number, lon: number ): Promise<GetCurrentWeatherResponse> {
        const {data} = await  this.axiosInstance.get("/data/2.5/weather", {params: {
            lat,
            lon,
            appId: this.appId
        }})
        return GetCurrentWeatherResponseSchema.parse(data);
    }
}