import { z } from "zod";

export const GetCurrentWeatherResponseSchema = z.object({
    coord: z.object({
        lon: z.number(),
        lat: z.number(),
    }),
    dt: z.number(),
    main: z.object({
        temp: z.number(),
        feels_like: z.number(),
        temp_min: z.number(),
        temp_max: z.number(),
        pressure: z.number(),
        humidity: z.number(),
    }),
    cod: z.number(),
});

export type GetCurrentWeatherResponse = z.infer<typeof GetCurrentWeatherResponseSchema>;