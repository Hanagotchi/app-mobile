import {z} from "zod";

export const DevicePlantSchema = z.object({
    id_plant: z.number(),
    id_device: z.string(),
    id_user: z.number(),
    plant_type: z.string(),
})

export type DevicePlant = z.infer<typeof DevicePlantSchema>;