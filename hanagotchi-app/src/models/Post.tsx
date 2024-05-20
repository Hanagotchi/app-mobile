import {z} from "zod";

export const PostDataSchema = z.object({
    author_user_id: z.number().min(1),
    content: z.string().min(1, "Post content can't be empty"),
    photo_links: z.array(z.string().url()).max(4),
});

export type PostData = z.infer<typeof PostDataSchema>;
export type PostDataWithoutAuthorId = Omit<PostData, "author_user_id">;

export const AuthorSchema = z.object({
    id: z.number(),
    name: z.string().nullable(),
    photo: z.string().url().nullable(),
    nickname: z.string().nullable()
});

export const PostAuthorSchema = AuthorSchema;
export type PostAuthor = z.infer<typeof PostAuthorSchema>;

export const CommentAuthorSchema = AuthorSchema;
export type CommentAuthor = z.infer<typeof CommentAuthorSchema>;

export const CommentSchema = z.object({
    id: z.string(),
    author: CommentAuthorSchema,
    content: z.string(),
    created_at: z.coerce.date(),
})

export type Comment = z.infer<typeof CommentSchema>;

export const PostSchema = z.object({
    id: z.string(),
    author: PostAuthorSchema,
    content: z.string(),
    likes_count: z.number(),
    comments_count: z.number().nullish(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    photo_links: z.array(z.string().url()),
    comments: z.array(CommentSchema).nullish(),
})

export type Post = z.infer<typeof PostSchema>;

export const ReducedPostSchema = z.object({
    id: z.string(),
    author: PostAuthorSchema,
    content: z.string(),
    likes_count: z.number(),
    comments_count: z.number().nullish(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    main_photo_link: z.string().url().nullable(),
})

export type ReducedPost = z.infer<typeof ReducedPostSchema>;