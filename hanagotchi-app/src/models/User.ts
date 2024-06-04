import { z } from "zod";
import { LocationScheme } from "./LocationUser";
import { ARG_TIMEZONE_OFFSET } from "../components/DatePicker";

const adjustBirthdateFormat = (value: string | Date) => {
    let date = new Date(value);
    // date.setTime(date.getTime() + date.getTimezoneOffset() * ARG_TIMEZONE_OFFSET);
    return date;
};

export const UpdateUserSchema = z.object({
    name: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    photo: z.string().nullable().optional(),
    birthdate: z.coerce.date().nullable().optional(),
    location: LocationScheme.nullable().optional(),
    nickname: z.string().nullable().optional(),
    biography: z.string().nullable().optional(),
    device_token: z.string().nullable().optional(),
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
    device_token: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>;

export const UserProfileSchema = z.object({
    _id: z.number(),
    name: z.string().nullable(),
    photo: z.string().nullable(),
    nickname: z.string().nullable(),
    biography: z.string().nullable().optional(),
    followers: z.array(z.number()),
    following: z.array(z.number()),
    tags: z.array(z.string()),
});

export type UserProfile = z.infer< typeof UserProfileSchema>;

export const ReducedUserProfileSchema = z.union([
    z.object({
        id: z.number(),
        name: z.string().nullable(),
        photo: z.string().nullable(),
        nickname: z.string().nullable(),
    }),
    z.object({
        _id: z.number(),
        name: z.string().nullable(),
        photo: z.string().nullable(),
        nickname: z.string().nullable(),
    })
]).transform(data => {
    if ('_id' in data) {
      const { _id, ...rest } = data;
      return { id: _id, ...rest };
    }

    return data;
  });

export type ReducedUserProfile = z.infer< typeof ReducedUserProfileSchema>;