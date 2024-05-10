import {z} from "zod";

export const ReminderSchema = z.object({
    id: z.number(),
    content: z.string(),
    date_time: z.coerce.date(),
})

export type Reminder = z.infer<typeof ReminderSchema>;
