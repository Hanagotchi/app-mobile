import { z } from "zod";
import { LocationScheme } from "./LocationUser";
import { ARG_TIMEZONE_OFFSET } from "../components/DatePicker";

const adjustBirthdateFormat = (value: string | Date) => {
    let date = new Date(value);
    // date.setTime(date.getTime() + date.getTimezoneOffset() * ARG_TIMEZONE_OFFSET);
    return date;
};

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

export const UserProfileSchema = z.object({
    id: z.number(),
    name: z.string().nullable(),
    photo: z.string().nullable(),
    nickname: z.string().nullable(),
    biography: z.string().nullable().optional(),
});

export type UserProfile = z.infer< typeof UserProfileSchema>;