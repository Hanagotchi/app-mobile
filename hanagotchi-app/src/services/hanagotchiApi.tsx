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
import {Measurement, MeasurementSchema} from "../models/Measurement";

export interface HanagotchiApi {
    logIn: (authCode: string) => Promise<LoginResponse>;
    getPlant: (id: string) => Promise<GetPlantResponse>;
    getPlants: (userId: number) => Promise<GetPlantsResponse>;
    getPlantType: (name: string) => Promise<GetPlantTypeResponse>;
    getUser: (userId: number) => Promise<User>;
    getLastMeasurement: (plantId: number) => Promise<Measurement | null>;
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

    async getPlants(userId: number): Promise<GetPlantsResponse> {
        const { data } = await this.axiosInstance.get(`/plants?id_user=${userId}`);
        return GetPlantsResponseSchema.parse(data);
    }
    async getPlantType(name: string): Promise<GetPlantTypeResponse> {
        const encodedName = encodeURIComponent(name);
        const { data, status } = await this.axiosInstance.get(`/plant-type/${encodedName}`);

        return GetPlantTypeResponseSchema.parse(data);
    }

    async getUser(userId: number): Promise<User> {
        const { data } = await this.axiosInstance.get(`/users/${userId}`);
        return UserSchema.parse(data?.message);
    }
    async getLastMeasurement(plantId: number): Promise<Measurement | null> {
        const { data, status } = await this.axiosInstance.get(`/measurements/${plantId}/last`);
        data.time_stamp = new Date(data.time_stamp);
        if (status == 204) return null
        return MeasurementSchema.parse(data);
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
