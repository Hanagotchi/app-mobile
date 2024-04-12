import {z} from "zod";

export const PostDataSchema = z.object({
    author_user_id: z.number().min(1),
    content: z.string().min(1, "Post content can't be empty"),
    photo_links: z.array(z.string().url()).max(4),
});

export type PostData = z.infer<typeof PostDataSchema>;
export type PostDataWithoutAuthorId = Omit<PostData, "author_user_id">;