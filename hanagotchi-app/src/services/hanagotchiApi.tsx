import { AxiosInstance } from "axios";
import {
    GetPlantResponse,
    GetPlantResponseSchema,
    GetPlantTypeResponse, GetPlantTypeResponseSchema,
    LoginResponse,
    LoginResponseSchema
} from "../models/hanagotchiApi";

export interface HanagotchiApi {
    logIn: (authCode: string) => Promise<LoginResponse>;
    getPlant: (id: string) => Promise<GetPlantResponse>;
    getPlantType: (name: string) => Promise<GetPlantTypeResponse>;
}

export class HanagotchiApiImpl implements HanagotchiApi {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
      this.axiosInstance = axiosInstance;
    }

    async logIn(authCode: string): Promise<LoginResponse> {
        const { data } = await this.axiosInstance.post("/login", {auth_code: authCode});
        return LoginResponseSchema.parse(data);
    }

    async getPlant(id: string): Promise<GetPlantResponse> {
        const { data } = await this.axiosInstance.get(`/plants/${id}`);
        return GetPlantResponseSchema.parse(data);
    }
    async getPlantType(name: string): Promise<GetPlantTypeResponse> {
        const encodedName = encodeURIComponent(name);
        const { data } = await this.axiosInstance.get(`/plant-type/${encodedName}`);
        return GetPlantTypeResponseSchema.parse(data);
    }
}