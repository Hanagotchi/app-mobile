import { z } from "zod";
import { UserSchema } from "./User";
import { LogSchema } from "./Log";

export const LoginResponseSchema = z.object({
    status: z.number(),
    message: UserSchema,
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const GetLogsByUserResponseSchema = z.array(LogSchema);