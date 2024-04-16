import { z } from "zod";

export const PlantSchema = z.object({
    id: z.number(),
    id_user: z.number(),
    name: z.string(),
    scientific_name: z.string(),
});

export type Plant = z.infer<typeof PlantSchema>;