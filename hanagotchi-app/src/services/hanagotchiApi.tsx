import { AxiosInstance } from "axios";
import { LoginResponse, LoginResponseSchema, GetLogsByUserResponseSchema, GetLogsByUserResponse, GetLogByIdResponse, GetLogByIdResponseSchema } from "../models/hanagotchiApi";

export interface HanagotchiApi {
    logIn: (authCode: string) => Promise<LoginResponse>;
    getLogsByUser: (userId: number, params: {year: number, month?: number}) => Promise<GetLogsByUserResponse>
    getLogById: (log_id: number) => Promise<GetLogByIdResponse>
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
        const { data } = await this.axiosInstance.get(`/logs/user/${userId}`, {params});
        return GetLogsByUserResponseSchema.parse(data);
    }

    async getLogById(log_id: number): Promise<GetLogByIdResponse> {
        const { data } = await this.axiosInstance.get(`/logs/${log_id}`);
        return GetLogByIdResponseSchema.parse(data);
    }
}