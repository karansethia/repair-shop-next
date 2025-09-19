import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { tickets } from "@/db/schema"
import { z } from "zod/v4"

export const insertTicketSchema = createInsertSchema(tickets, {
  id: z.union([z.number(), z.literal("(New)")]),
  title: (schema) => schema.min(1, "Title is required"),
  description: (schema) => schema.min(1, "Description is required"),
  tech: () => z.email("Invalid email address"),
})

export const selectTicketSchema = createSelectSchema(tickets)

export type InsertTicketSchemaType = z.infer<typeof insertTicketSchema>

export type SelectTicketSchemaType = z.infer<typeof selectTicketSchema>
