import {z} from "zod";

export const DeviationSchema = z.object({
    temperature: z.string().optional(),
    humidity: z.string().optional(),
    light: z.string().optional(),
    watering: z.string().optional(),
})

export const MeasurementSchema = z.object({
    id: z.number(),
    id_plant: z.number(),
    temperature: z.number(),
    humidity: z.number(),
    light: z.number(),
    watering: z.number(),
    time_stamp: z.coerce.date(),
    deviations: DeviationSchema.optional(),
})

export type Measurement = z.infer<typeof MeasurementSchema>;
