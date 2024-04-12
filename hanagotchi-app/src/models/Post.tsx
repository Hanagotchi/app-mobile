import {z} from "zod";

export const PostDataSchema = z.object({
    authorId: z.number().min(1),
    content: z.string().min(1, "Post content can't be empty"),
    photos: z.array(z.string().url()).max(4),
});

export type LogData = z.infer<typeof PostDataSchema>;