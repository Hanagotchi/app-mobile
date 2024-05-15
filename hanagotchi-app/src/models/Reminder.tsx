import {z} from "zod";

export const ReminderSchema = z.object({
    id: z.number(),
    content: z.string(),
    date_time: z.coerce.date(),
})

export type Reminder = z.infer<typeof ReminderSchema>;

export const ReminderDataSchema = z.object({
    content: z.string().min(1, "Log content can't be empty").max(128, "Log content can't be longer than 128 characters"),
    date_time: z.coerce.date(),
})

export type ReminderData = z.infer<typeof ReminderDataSchema>;