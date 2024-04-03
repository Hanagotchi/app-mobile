import { AxiosInstance } from "axios";
import { LoginResponse, LoginResponseSchema, GetUserResponse} from "../models/hanagotchiApi";

export interface HanagotchiApi {
    logIn: (authCode: string) => Promise<LoginResponse>;
    getUser: (userId: number) => Promise<GetUserResponse>; // xD?
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

    async getUser(userId: number): Promise<GetUserResponse> { // xD?
        const { data } = await this.axiosInstance.get(`/users/${userId}`);
        return data;
    }
}