import { z } from "zod";
import { UserSchema } from "./User";
import { LogSchema } from "./Log";

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
