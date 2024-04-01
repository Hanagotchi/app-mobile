import { AxiosInstance } from "axios";
import { LoginResponse, LoginResponseSchema } from "../models/hanagotchiApi";
import { User } from "../models/User";

export interface HanagotchiApi {
    logIn: (authCode: string) => Promise<LoginResponse>;
    getUser: (user_id: number) => Promise<LoginResponse>; // xD?
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

    async getUser(user_id: number): Promise<LoginResponse> { // xD?
        const { data } = await this.axiosInstance.get(`/users/${user_id}`);
        return data;
    }
}