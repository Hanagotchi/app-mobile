import {z} from "zod";
import {UserSchema} from "./User";
import {LogSchema} from "./Log";
import {PlantTypeSchema} from "./PlantType"
import {PlantSchema} from "./Plant";

export const LoginResponseSchema = z.object({
    status: z.number(),
    message: UserSchema,
});


export const GetUserSchema = z.object({
    status: z.number(),
    message: UserSchema,
});

export type GetUserResponse = z.infer<typeof GetUserSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const GetPlantsResponseSchema = z.array(PlantSchema);
export type GetPlantsResponse = z.infer<typeof GetPlantsResponseSchema>;

export const GetLogsByUserResponseSchema = z.array(LogSchema);
export type GetLogsByUserResponse = z.infer<typeof GetLogsByUserResponseSchema>;

export const GetLogByIdResponseSchema = LogSchema;
export type GetLogByIdResponse = z.infer<typeof GetLogByIdResponseSchema>;

export const GetPlantTypesResponseSchema = z.array(PlantTypeSchema);
export type GetPlantTypesResponse = z.infer<typeof GetPlantTypesResponseSchema>;