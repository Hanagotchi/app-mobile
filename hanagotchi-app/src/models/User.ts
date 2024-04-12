import { z } from "zod";
import { LocationScheme } from "./LocationUser";

export const UpdateUserSchema = z.object({
    name: z.string().nullable(),
    gender: z.string().nullable(),
    photo: z.string().nullable(),
    birthdate: z.coerce.date().nullable(),
    location: LocationScheme.nullable(),
    nickname: z.string().nullable(),
    biography: z.string().nullable(),
})

export type UpdateUser = z.infer<typeof UpdateUserSchema>;

export const UserSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    name: z.string().nullable(),
    gender: z.string().nullable(),
    photo: z.string().nullable(),
    birthdate: z.coerce.date().nullable(),
    location: LocationScheme.nullable(),
    nickname: z.string().nullable(),
    biography: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>;
