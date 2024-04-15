import {AxiosInstance} from "axios";
import {
    GetDevicePlantsResponse,
    GetDevicePlantsResponseSchema,
    GetLogByIdResponse,
    GetLogByIdResponseSchema,
    GetLogsByUserResponse,
    GetLogsByUserResponseSchema,
    GetPlantsResponse,
    GetPlantsResponseSchema,
    LoginResponse,
    LoginResponseSchema
} from "../models/hanagotchiApi";
import {UpdateUserSchema, User, UserSchema} from "../models/User";


export interface HanagotchiApi {
    logIn: (authCode: string) => Promise<LoginResponse>;
    getUser: (userId: number) => Promise<User>;
    patchUser: (user: User) => Promise<void>;
    getPlants: (userId: number) => Promise<GetPlantsResponse>;
    getDevicePlants: () => Promise<GetDevicePlantsResponse>
    deleteDevice: (plantId: number) => Promise<void>
    getLogsByUser: (userId: number, params: {year: number, month?: number}) => Promise<GetLogsByUserResponse>
    addSensor: (deviceId: string, plantId: number) => Promise<void>
    getLogById: (log_id: number) => Promise<GetLogByIdResponse>
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

    async getPlants(userId: number): Promise<GetPlantsResponse> {
        const { data } = await this.axiosInstance.get(`/plants?id_user=${userId}`);
        return GetPlantsResponseSchema.parse(data);
    }

    async getDevicePlants(): Promise<GetDevicePlantsResponse> {
        const { data } = await this.axiosInstance.get(`/measurements/device-plant`);
        return GetDevicePlantsResponseSchema.parse(data);
    }

    async deleteDevice(plantId: number): Promise<void> {
        await this.axiosInstance.delete(`/measurements/device-plant/${plantId}?type_id=id_plant`);
    }

    async getUser(userId: number): Promise<User> {
        const { data } = await this.axiosInstance.get(`/users/${userId}`);
        return UserSchema.parse(data?.message);
    }

    async patchUser(user: User): Promise<void> {
        const updateUser = UpdateUserSchema.parse(user);
        await this.axiosInstance.patch(`/users/${user.id}`, updateUser);
    }

    async addSensor(deviceId: string, plantId: number): Promise<void> {
        await this.axiosInstance.post(`/measurements/device-plant`, {id_device: deviceId, id_plant: plantId});
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