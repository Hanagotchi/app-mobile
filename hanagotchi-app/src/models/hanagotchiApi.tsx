import { z } from "zod";
import { UserSchema } from "./User";
import { LogSchema } from "./Log";
import {PlantSchema} from "./Plant";
import {PlantTypeSchema} from "./PlantType";

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

export const GetLogsByUserResponseSchema = z.array(LogSchema);
export type GetLogsByUserResponse = z.infer<typeof GetLogsByUserResponseSchema>;

export const GetLogByIdResponseSchema = LogSchema;
export type GetLogByIdResponse = z.infer<typeof GetLogByIdResponseSchema>;


export const GetPlantResponseSchema = PlantSchema
export type GetPlantResponse = z.infer<typeof GetPlantResponseSchema>;

export const GetPlantTypeResponseSchema = PlantTypeSchema
export type GetPlantTypeResponse = z.infer<typeof GetPlantTypeResponseSchema>;