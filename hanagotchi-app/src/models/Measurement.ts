import {z} from "zod";

export const DeviationEnumSchema = z.union([z.literal("lower"), z.literal("higher")]).nullable();
export type DeviationEnum = z.infer<typeof DeviationEnumSchema>

export const DeviationSchema = z.object({
    temperature: DeviationEnumSchema,
    humidity: DeviationEnumSchema,
    light: DeviationEnumSchema,
    watering: DeviationEnumSchema,
})

export type Deviation = z.infer<typeof DeviationSchema>;

export const MeasurementSchema = z.object({
    id: z.number(),
    id_plant: z.number(),
    temperature: z.number(),
    humidity: z.number().nullable(),
    light: z.number(),
    watering: z.number(),
    time_stamp: z.date(),
    deviations: DeviationSchema.optional(),
})

export type Measurement = z.infer<typeof MeasurementSchema>;
