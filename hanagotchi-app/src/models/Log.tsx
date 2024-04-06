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
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    photos: z.array(LogPhotoSchema),
});

export type Log = z.infer<typeof LogSchema>;

export const LogDataSchema = z.object({
    title: z.string().min(1, "Log title can't be empty"),
    content: z.string().min(1, "Log content can't be empty"),
    photos: z.array(z.string().url()).max(4),
})

export type LogData = z.infer<typeof LogDataSchema>;