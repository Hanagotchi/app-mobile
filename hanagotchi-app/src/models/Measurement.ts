import {z} from "zod";

export const MeasurementSchema = z.object({
    id: z.number(),
    id_plant: z.number(),
    temperature: z.number(),
    humidity: z.number(),
    light: z.number(),
    watering: z.number(),
    time_stamp: z.string(),
})

export type Measurement = z.infer<typeof MeasurementSchema>;
