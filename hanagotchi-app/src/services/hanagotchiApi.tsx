import { AxiosInstance } from "axios";
import { LoginResponse, LoginResponseSchema, GetLogsByUserResponseSchema, GetLogsByUserResponse } from "../models/hanagotchiApi";

export interface HanagotchiApi {
    logIn: (authCode: string) => Promise<LoginResponse>;
    getLogsByUser: (userId: number, params: {year: number, month?: number}) => Promise<GetLogsByUserResponse>
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

    async getLogsByUser(userId: number, params: {year: number, month?: number} ): Promise<GetLogsByUserResponse> {
        console.log(userId, params)
        const { data } = await this.axiosInstance.get(`/logs/user/${userId}`, {params});
        return GetLogsByUserResponseSchema.parse(data);
    }
}