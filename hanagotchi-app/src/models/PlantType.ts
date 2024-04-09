import {z} from "zod";

export const PlantTypeSchema = z.object({
    id: z.number(),
    botanical_name: z.string(),
    common_name: z.string(),
    description: z.string(),
})

export type PlantType = z.infer<typeof PlantTypeSchema>;