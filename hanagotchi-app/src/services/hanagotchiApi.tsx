import {
    GetDevicePlantsResponse,
    GetDevicePlantsResponseSchema,
    GetLogByIdResponse,
    GetLogByIdResponseSchema,
    GetLogsByUserResponse,
    GetLogsByUserResponseSchema,
    GetPlantResponse,
    GetPlantResponseSchema,
    GetPlantsResponse,
    GetPlantsResponseSchema,
    GetPlantTypeResponse,
    GetPlantTypeResponseSchema,
    GetPlantTypesResponse,
    GetPlantTypesResponseSchema,
    LoginResponse,
    LoginResponseSchema,
    GetMyFeedResponseSchema,
    GetReminders,
} from "../models/hanagotchiApi";

import { UpdateUserSchema, User, UserProfile, UserSchema, UpdateUser, UserProfileSchema } from "../models/User";
import { CreateLog, Log, LogSchema, PartialUpdateLog } from "../models/Log";
import { ReducedPost, PostData, ReducedPostSchema, PostSchema, Post } from "../models/Post";
import {Plant, PlantSchema } from "../models/Plant";
import {Measurement, MeasurementSchema} from "../models/Measurement";
import {AxiosInstance} from "axios";
import { Reminder } from "../models/Reminder";

export interface HanagotchiApi {
    logIn: (authCode: string) => Promise<LoginResponse>;
    getPlant: (id: string) => Promise<GetPlantResponse>;
    getPlantType: (name: string) => Promise<GetPlantTypeResponse>;
    getUser: (userId: number) => Promise<User>;
    getLastMeasurement: (plantId: number) => Promise<Measurement | null>;
    patchUser: (user: UpdateUser) => Promise<void>;
    getPlantTypes: () => Promise<GetPlantTypesResponse>;
    createPlant: (id_user: number, name: string, scientific_name: string) => Promise<Plant>;
    deletePlant: (plantId: number) => Promise<void>;
    getLogsByUser: (userId: number, params: { year: number, month?: number }) => Promise<GetLogsByUserResponse>;
    getLogById: (logId: number) => Promise<GetLogByIdResponse>;
    getPlants: (params: { id_user?: number, limit?: number }) => Promise<GetPlantsResponse>;
    createLog: (log: CreateLog) => Promise<Log>;
    editLog: (logId: number, updateSet: PartialUpdateLog) => Promise<Log>;
    addPhotoToLog: (logId: number, body: { photo_link: string }) => Promise<Log>;
    deletePhotoFromLog: (logId: number, photoId: number) => Promise<void>;
    createPost: (post: PostData) => Promise<Post>;
    deletePost: (postId: string) => Promise<void>;
    getDevicePlants: (params?: {id_plant?: number, limit?: number}) => Promise<GetDevicePlantsResponse | null>
    getMyFeed: (page: number, size: number) => Promise<ReducedPost[]>;
    getAllPostsOfUser: (userId: number, page: number, size: number) => Promise<ReducedPost[]>;
    deleteDevice: (plantId: number) => Promise<void>
    addSensor: (deviceId: string, plantId: number) => Promise<void>
    getFollowing: (params: {user_id?: number, query?: string}) => Promise<UserProfile[]>;
    createReminder: (date_time: Date, content: string) => Promise<void>;
    getReminders: () => Promise<Reminder[]>;
    deleteReminder: (reminderId: number) => Promise<void>;
    editReminder: (reminderId: number, date_time: Date, content: string) => Promise<void>;
    getUserProfile: (userId: number) => Promise<UserProfile>;
    followUser: (userId: number) => Promise<void>;
    unfollowUser: (userId: number) => Promise<void>;
}

export class HanagotchiApiImpl implements HanagotchiApi {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance;
    }

    async logIn(authCode: string): Promise<LoginResponse> {
        const { data, headers } = await this.axiosInstance.post("/login", { auth_code: authCode });
        return LoginResponseSchema.parse({ data, headers });
    }

    async deletePlant(plantId: number): Promise<void> {
        await this.axiosInstance.delete(`/plants/${plantId}`)
    }

    async getPlants(params: { id_user?: number, limit?: number }): Promise<GetPlantsResponse> {
        const { data } = await this.axiosInstance.get(`/plants`, { params });
        return GetPlantsResponseSchema.parse(data)
    }

    async getDevicePlants(params?: {id_plant?: number, limit?: number}): Promise<GetDevicePlantsResponse | null> {
        const { data, status } = await this.axiosInstance.get(`/measurements/device-plant`, {params});
        if (status == 204) return null
        return GetDevicePlantsResponseSchema.parse(data);
    }

    async deleteDevice(plantId: number): Promise<void> {
        await this.axiosInstance.delete(`/measurements/device-plant/${plantId}?type_id=id_plant`);
    }

    async getPlant(id: string): Promise<GetPlantResponse> {
        const { data } = await this.axiosInstance.get(`/plants/${id}`);
        return GetPlantResponseSchema.parse(data);
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

    async createPlant(id_user: number, name: string, scientific_name: string): Promise<Plant> {
        const { data } = await this.axiosInstance.post(`/plants`, { id_user, name, scientific_name });
        return PlantSchema.parse(data);
    }

    async patchUser(user: UpdateUser): Promise<void> {
        const updateUser = UpdateUserSchema.parse(user);
        await this.axiosInstance.patch(`/users/me`, updateUser);
    }

    async addSensor(deviceId: string, plantId: number): Promise<void> {
        await this.axiosInstance.post(`/measurements/device-plant`, { id_device: deviceId, id_plant: plantId });
    }

    async getLogsByUser(userId: number, params: { year: number, month?: number }): Promise<GetLogsByUserResponse> {
        const { data } = await this.axiosInstance.get(`/logs/user/${userId}`, { params });
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

    async addPhotoToLog(logId: number, body: { photo_link: string }): Promise<Log> {
        const { data } = await this.axiosInstance.post(`/logs/${logId}/photos`, body);
        return LogSchema.parse(data);
    }

    async deletePhotoFromLog(logId: number, photoId: number) {
        await this.axiosInstance.delete(`/logs/${logId}/photos/${photoId}`);
    }

    async createPost(body: PostData) {
        const { data } = await this.axiosInstance.post(`/social/posts`, body);
        const parsedData = PostSchema.parse(data);

        return parsedData;
    }

    async deletePost(postId: string) {
        await this.axiosInstance.delete(`/social/posts/${postId}`);
    }

    async getMyFeed(page: number, size: number) {
        const { data } = await this.axiosInstance.get(`/social/users/me/feed?page=${page}&per_page=${size}`);
        const result = GetMyFeedResponseSchema.parse(data);
        return result;
    }

    async getAllPostsOfUser(userId: number, page: number, size: number) {
        const { data } = await this.axiosInstance.get(`/social/posts?page=${page}&per_page=${size}&author=${userId}`);
        const result = GetMyFeedResponseSchema.parse(data);
        return result;
    }

    async getPlantTypes(): Promise<GetPlantTypesResponse> {
        const { data } = await this.axiosInstance.get(`/plant-type`);
        return GetPlantTypesResponseSchema.parse(data);
    }

    async getFollowing(params: { user_id?: number, query?: string }): Promise<UserProfile[]> {
        // TODO: new endpoint or fix endpooitn to get following users?
        let user = await this.getUserProfile(params.user_id!);
        return Promise.all(user.following.map(async (id) => await this.getUserProfile(id)));
    }


    async getUserProfile(userId: number): Promise<UserProfile> {
        // TODO: add biography to the social user endpoint!!!!
        let user = await this.getUser(userId);
        let { data } = await this.axiosInstance.get(`/social/users/${userId}`);
        data.biography = user.biography;
        return UserProfileSchema.parse(data);
    }


    async createReminder(date_time: Date, content: String): Promise<void> {
        await this.axiosInstance.post(`/users/me/notification/`, {date_time, content});
    }

    async getReminders(): Promise<Reminder[]> {
        const { data } = await this.axiosInstance.get(`/users/me/notifications`);
        return GetReminders.parse(data).message;
    }

    async deleteReminder(reminderId: number): Promise<void> {
        await this.axiosInstance.delete(`/users/me/notifications/${reminderId}`);
    }
    
    async editReminder(reminderId: number, date_time: Date, content: string): Promise<void>{
        await this.axiosInstance.patch(`/users/me/notifications/${reminderId}`, {date_time, content});
    }

    async followUser(userId: number): Promise<void> {
        await this.axiosInstance.post(`/social/users/follow`, { user_id: userId });
    }

    async unfollowUser(userId: number): Promise<void> {
        await this.axiosInstance.post(`/social/users/unfollow`, { user_id: userId });
    }
}