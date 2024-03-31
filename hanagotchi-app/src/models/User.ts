import {z} from "zod";
import { LocationScheme } from "./LocationUser";

export const UserSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    name: z.string().nullable(),
    gender: z.string().nullable(),
    photo: z.string().nullable(),
    // location: LocationScheme.nullable(),
})

export type User = z.infer<typeof UserSchema>;