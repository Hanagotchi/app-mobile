import {z} from "zod";

export const PostDataSchema = z.object({
    author_user_id: z.number().min(1),
    content: z.string().min(1, "Post content can't be empty"),
    photo_links: z.array(z.string().url()).max(4),
});

export type PostData = z.infer<typeof PostDataSchema>;
export type PostDataWithoutAuthorId = Omit<PostData, "author_user_id">;

export const PostAuthorSchema = z.object({
    id: z.number(),
    name: z.string().nullable(),
    photo: z.string().url().nullable(),
    nickname: z.string().nullable()
});

export type PostAuthor = z.infer<typeof PostAuthorSchema>;

export const PostSchema = z.object({
    id: z.string(),
    author: PostAuthorSchema,
    content: z.string(),
    likes_count: z.number(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    photo_links: z.array(z.string().url()),
})

export type Post = z.infer<typeof PostSchema>;

export const ReducedPostSchema = z.object({
    id: z.string(),
    author: PostAuthorSchema,
    content: z.string(),
    likes_count: z.number(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    main_photo: z.string().url().optional(),
})

export type ReducedPost = z.infer<typeof ReducedPostSchema>;