import { z } from "zod";
import { UserSchema } from "./User";
import { LogSchema } from "./Log";
import { PlantSchema } from "./Plant";

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

export const GetPlantsResponseSchema = z.array(PlantSchema);
export type GetPlantsResponse = z.infer<typeof GetPlantsResponseSchema>;
