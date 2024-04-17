import {AxiosInstance} from "axios";
import {
    GetDevicePlantsResponse,
    GetDevicePlantsResponseSchema,
    GetLogByIdResponse,
    GetLogByIdResponseSchema,
    GetLogsByUserResponse,
    GetLogsByUserResponseSchema,
    GetPlantTypesResponseSchema,
    GetPlantTypesResponse,GetPlantsResponse,
    GetPlantsResponseSchema,
    LoginResponse,
    LoginResponseSchema,
} from "../models/hanagotchiApi";
import {UpdateUserSchema, User, UserSchema} from "../models/User";
import {Plant, PlantSchema } from "../models/Plant";
import {CreateLog, Log, LogSchema, PartialUpdateLog} from "../models/Log";


export interface HanagotchiApi {
    logIn: (authCode: string) => Promise<LoginResponse>;
    getUser: (userId: number) => Promise<User>;
    patchUser: (user: User) => Promise<void>;
    getPlantTypes: () => Promise<GetPlantTypesResponse>;
    createPlant: (id_user: number, name: string, scientific_name: string) => Promise<Plant>;
    deletePlant: (plantId: number) => Promise<void>;
    getLogsByUser: (userId: number, params: {year: number, month?: number}) => Promise<GetLogsByUserResponse>;
    getLogById: (logId: number) => Promise<GetLogByIdResponse>;
    getPlants: (params: {id_user?: number, limit?: number}) => Promise<GetPlantsResponse>;
    createLog: (log: CreateLog) => Promise<Log>;
    editLog: (logId: number, updateSet: PartialUpdateLog) => Promise<Log>;
    addPhotoToLog: (logId: number, body: {photo_link: string}) => Promise<Log>;
    deletePhotoFromLog: (logId: number, photoId: number) => Promise<void>;
    getDevicePlants: () => Promise<GetDevicePlantsResponse>
    deleteDevice: (plantId: number) => Promise<void>
    addSensor: (deviceId: string, plantId: number) => Promise<void>
}

export class HanagotchiApiImpl implements HanagotchiApi {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    async logIn(authCode: string): Promise<LoginResponse> {
        const { data, headers } = await this.axiosInstance.post("/login", { auth_code: authCode });
        return LoginResponseSchema.parse({data, headers});
    }

    async deletePlant(plantId: number): Promise<void> {
        await this.axiosInstance.delete(`/plants/${plantId}`)
    }

    async getPlants(params: {id_user?: number, limit?: number}): Promise<GetPlantsResponse> {
        const { data } = await this.axiosInstance.get(`/plants`, {params});
        return GetPlantsResponseSchema.parse(data)
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

    async createPlant(id_user: number, name: string, scientific_name: string): Promise<Plant> {
        const { data } = await this.axiosInstance.post(`/plants`, { id_user, name, scientific_name });
        return PlantSchema.parse(data);
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

    async getLogById(logId: number): Promise<GetLogByIdResponse> {
        const { data } = await this.axiosInstance.get(`/logs/${logId}`);
        return GetLogByIdResponseSchema.parse(data);
    }

    async createLog(body: CreateLog): Promise<Log> {
        const { data } = await this.axiosInstance.post("/logs", body);
        return LogSchema.parse(data);
    }

    async editLog(logId: number, updateSet: PartialUpdateLog): Promise<Log> {
        const { data } = await this.axiosInstance.patch(`/logs/${logId}`, updateSet);
        return LogSchema.parse(data);
    }

    async addPhotoToLog(logId: number, body: {photo_link: string}): Promise<Log> {
        const { data } = await this.axiosInstance.post(`/logs/${logId}/photos`, body);
        return LogSchema.parse(data);
    }

    async deletePhotoFromLog(logId: number, photoId: number) {
        await this.axiosInstance.delete(`/logs/${logId}/photos/${photoId}`);
    }

    async getPlantTypes(): Promise<GetPlantTypesResponse>{
        const { data } = await this.axiosInstance.get(`/plant-type`);
        return GetPlantTypesResponseSchema.parse(data);
    }
}