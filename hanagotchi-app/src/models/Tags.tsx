import {z} from "zod";

export const TagSchema = z.string();
export type Tag = z.infer<typeof TagSchema>;