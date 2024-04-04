import { z } from "zod";

export const LocationScheme = z.object({
  lat: z.number().nullable(),
  long: z.number().nullable()
})

export type LocationUser = z.infer<typeof LocationScheme>;
