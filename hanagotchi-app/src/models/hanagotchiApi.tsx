import { z } from "zod";
import { UserSchema } from "./User";
import {PlantSchema} from "./Plant";
import {PlantTypeSchema} from "./PlantType";

export const LoginResponseSchema = z.object({
    status: z.number(),
    message: UserSchema,
})
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const GetPlantResponseSchema = PlantSchema
export type GetPlantResponse = z.infer<typeof GetPlantResponseSchema>;

export const GetPlantTypeResponseSchema = PlantTypeSchema
export type GetPlantTypeResponse = z.infer<typeof GetPlantTypeResponseSchema>;