import {z} from "zod";

export const LocationScheme = z.object({
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  geoName: z.string().nullable(),
})

export type LocationUser = z.infer<typeof LocationScheme>;
