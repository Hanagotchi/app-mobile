import {AxiosInstance} from "axios";
import {
    GetLogByIdResponse,
    GetLogByIdResponseSchema,
    GetLogsByUserResponse,
    GetLogsByUserResponseSchema,
    GetPlantResponse,
    GetPlantResponseSchema, GetPlantsResponse, GetPlantsResponseSchema,
    GetPlantTypeResponse,
    GetPlantTypeResponseSchema,
    LoginResponse,
    LoginResponseSchema
} from "../models/hanagotchiApi";
import {UpdateUserSchema, User, UserSchema} from "../models/User";

export interface HanagotchiApi {
    logIn: (authCode: string) => Promise<LoginResponse>;
    getPlant: (id: string) => Promise<GetPlantResponse>;
    getPlants: (userId: number) => Promise<GetPlantsResponse>;
    getPlantType: (name: string) => Promise<GetPlantTypeResponse>;
    getUser: (userId: number) => Promise<User>;
    patchUser: (user: User) => Promise<void>;
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
        data.message.birthdate = new Date(data.message.birthdate);
        return LoginResponseSchema.parse(data);
    }

    async getPlant(id: string): Promise<GetPlantResponse> {
        const { data } = await this.axiosInstance.get(`/plants/${id}`);
        return GetPlantResponseSchema.parse(data);
    }

    async getPlants(userId: string): Promise<GetPlantsResponse> {
        const { data } = await this.axiosInstance.get(`/plants?id_user=${userId}`);
        return GetPlantsResponseSchema.parse(data);
    }
    async getPlantType(name: string): Promise<GetPlantTypeResponse> {
        const encodedName = encodeURIComponent(name);
        const { data } = await this.axiosInstance.get(`/plant-type/${encodedName}`);
        return GetPlantTypeResponseSchema.parse(data);
    }

    async getUser(userId: number): Promise<User> {
        const { data } = await this.axiosInstance.get(`/users/${userId}`);
        return UserSchema.parse(data?.message);
    }

    async patchUser(user: User): Promise<void> {
        const updateUser = UpdateUserSchema.parse(user);
        await this.axiosInstance.patch(`/users/${user.id}`, updateUser);

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