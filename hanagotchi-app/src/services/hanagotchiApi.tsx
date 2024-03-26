import { AxiosInstance } from "axios";
import { LoginResponse, LoginResponseSchema } from "../models/hanagotchiApi";
import { User } from "../models/User";

export interface HanagotchiApi {
    logIn: (authCode: string) => Promise<LoginResponse>;
}

const DUMMY_USER: User = {
    id: 0,
    email: "alumno@fi.uba.ar",
    name: "John Doe",
    gender: null,
    photo: null,
}

const MOCK_LOGIN_RESPONSE: LoginResponse = {
    status: 200,
    message: DUMMY_USER,
}

export class HanagotchiApiImpl implements HanagotchiApi {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
      this.axiosInstance = axiosInstance;
    }

    // TODO
    async logIn(authCode: string): Promise<LoginResponse> {
        const { data } = await this.axiosInstance.post("/login", {auth_code: authCode});
        return LoginResponseSchema.parse(data);
    }
}