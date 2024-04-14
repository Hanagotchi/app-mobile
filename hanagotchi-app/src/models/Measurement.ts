import {z} from "zod";

export const DeviationSchema = z.object({
    temperature: z.string().nullable(),
    humidity: z.string().nullable(),
    light: z.string().nullable(),
    watering: z.string().nullable(),
})

export const MeasurementSchema = z.object({
    id: z.number(),
    id_plant: z.number(),
    temperature: z.number(),
    humidity: z.number(),
    light: z.number(),
    watering: z.number(),
    time_stamp: z.string(),
    deviations: DeviationSchema,
})

export type Measurement = z.infer<typeof MeasurementSchema>;
