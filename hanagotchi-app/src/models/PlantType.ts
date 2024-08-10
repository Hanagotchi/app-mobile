import {z} from "zod";

export const PlantTypeSchema = z.object({
    id: z.number(),
    botanical_name: z.string(),
    common_name: z.string(),
    description: z.string(),
    cares: z.string(),
    photo_link: z.string(),
})

export type PlantType = z.infer<typeof PlantTypeSchema>;