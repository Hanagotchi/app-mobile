import { z } from "zod";
import { UserProfileSchema, UserSchema } from "./User";
import { LogSchema } from "./Log";
import {DevicePlantSchema} from "./DevicePlant";
import {PlantSchema} from "./Plant";
import {PlantTypeSchema} from "./PlantType";
import { ReducedPost, ReducedPostSchema } from "./Post";
import { ReminderSchema } from "./Reminder";
import { TagSchema } from "./Tags";

export const LoginResponseSchema = z.object({
    data: z.object({
        status: z.number(),
        message: UserSchema,
    }),
    headers: z.object({
        "x-access-token": z.string()
    }),
});


export const GetUserSchema = z.object({
    status: z.number(),
    message: UserSchema,
});
export type GetUserResponse = z.infer<typeof GetUserSchema>;

export const GetDevicePlantsResponseSchema = z.array(DevicePlantSchema).or(DevicePlantSchema);
export type GetDevicePlantsResponse = z.infer<typeof GetDevicePlantsResponseSchema>;

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const GetLogsByUserResponseSchema = z.array(LogSchema);
export type GetLogsByUserResponse = z.infer<typeof GetLogsByUserResponseSchema>;

export const GetLogByIdResponseSchema = LogSchema;
export type GetLogByIdResponse = z.infer<typeof GetLogByIdResponseSchema>;

export const GetPlantResponseSchema = PlantSchema;
export type GetPlantResponse = z.infer<typeof GetPlantResponseSchema>;

export const GetPlantTypeResponseSchema = PlantTypeSchema
export type GetPlantTypeResponse = z.infer<typeof GetPlantTypeResponseSchema>;

export const GetPlantTypesResponseSchema = z.array(PlantTypeSchema);
export type GetPlantTypesResponse = z.infer<typeof GetPlantTypesResponseSchema>;

export const GetPlantsResponseSchema = z.array(PlantSchema);
export type GetPlantsResponse = z.infer<typeof GetPlantsResponseSchema>;

export const GetUsersProfileResponseSchema = z.object({
    status: z.number(),
    message: z.array(UserProfileSchema),
});
export const GetReminders = z.object({
    status: z.number(),
    message: z.array(ReminderSchema),
});

export type GetUsersProfileResponse = z.infer<typeof GetUsersProfileResponseSchema>;

export const GetMyFeedResponseSchema = z.array(ReducedPostSchema);
export type GetMyFeedResponse = z.infer<typeof GetMyFeedResponseSchema>;

export const GetSuscribedTagsSchema = z.array(TagSchema);
export type GetSuscribedTags = z.infer<typeof GetSuscribedTagsSchema>;
