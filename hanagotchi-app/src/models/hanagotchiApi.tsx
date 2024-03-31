import { z } from "zod";
import { UserSchema } from "./User";
import {PlantSchema} from "./Plant";

export const LoginResponseSchema = z.object({
    status: z.number(),
    message: UserSchema,
})

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const GetPlantResponseSchema = z.array(PlantSchema)

export type GetPlantResponse = z.infer<typeof GetPlantResponseSchema>;