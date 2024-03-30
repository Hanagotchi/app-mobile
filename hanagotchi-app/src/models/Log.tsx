import {z} from "zod";

export const LogPhotoSchema = z.object({
    id: z.number(),
    log_id: z.number(),
    photo_link: z.string().url(),
});

export type LogPhoto = z.infer<typeof LogPhotoSchema>;

export const LogSchema = z.object({
    id: z.number(),
    plant_id: z.number(),
    title: z.string(),
    content: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    photos: z.array(LogPhotoSchema),
});

export type Log = z.infer<typeof LogSchema>;
