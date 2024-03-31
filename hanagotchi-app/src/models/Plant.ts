import {z} from "zod";

export const PlantSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    name: z.string(),
    scientific_name: z.string(),
})

export type Plant = z.infer<typeof PlantSchema>;