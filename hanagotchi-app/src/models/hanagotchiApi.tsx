import { z } from "zod";
import { UserSchema } from "./User";

export const LoginResponseSchema = z.object({
    status: z.number(),
    message: UserSchema,
})

export type LoginResponse = z.infer<typeof LoginResponseSchema>;