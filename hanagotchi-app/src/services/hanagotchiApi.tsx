import { AxiosInstance } from "axios";
import { LoginResponse, LoginResponseSchema } from "../models/hanagotchiApi";

export interface HanagotchiApi {
    logIn: (authCode: string) => Promise<LoginResponse>;
}

export class HanagotchiApiImpl implements HanagotchiApi {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
      this.axiosInstance = axiosInstance;
    }

    async logIn(authCode: string): Promise<LoginResponse> {
        const { data } = await this.axiosInstance.post("/login", {auth_code: authCode});
        console.log(data);
        return LoginResponseSchema.parse(data);
    }
}