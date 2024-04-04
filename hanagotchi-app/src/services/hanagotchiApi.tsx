import { AxiosInstance } from "axios";
import { LoginResponse, LoginResponseSchema } from "../models/hanagotchiApi";
import { UpdateUserSchema, User, UserSchema } from "../models/User";

export interface HanagotchiApi {
    logIn: (authCode: string) => Promise<LoginResponse>;
    getUser: (userId: number) => Promise<User>;
    patchUser: (user: User) => Promise<void>;
}

export class HanagotchiApiImpl implements HanagotchiApi {

    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    async logIn(authCode: string): Promise<LoginResponse> {
        const { data } = await this.axiosInstance.post("/login", { auth_code: authCode });
        data.message.birthdate = new Date(data.message.birthdate);
        return LoginResponseSchema.parse(data);
    }

    async getUser(userId: number): Promise<User> {
        const { data } = await this.axiosInstance.get(`/users/${userId}`);
        return UserSchema.parse(data?.message);
    }

    async patchUser(user: User): Promise<void> {
        const updateUser = UpdateUserSchema.parse(user);
        await this.axiosInstance.patch(`/users/${user.id}`, updateUser);
    }
}