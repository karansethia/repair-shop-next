import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { customers } from "@/db/schema"
import { z } from "zod/v4"

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) => schema.min(1, "First Name is required"),
  lastName: (schema) => schema.min(1, "Last Name is required"),
  address1: (schema) => schema.min(1, "Address is required"),
  city: (schema) => schema.min(1, "City is required"),
  state: (schema) => schema.length(2, "State must be exactly 2 characters"),
  email: () => z.email("Invalid email address"),
  zip: (schema) => schema.min(1, "Valid zip code is required"),
  phone: (schema) => schema.regex(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number format. Use XXX-XXX-XXXX"),
})

export const selectCustomerSchema = createSelectSchema(customers);

export type InsertCustomerSchemaType = z.infer<typeof insertCustomerSchema>;

export type SelectCustomerSchemaType = z.infer<typeof selectCustomerSchema>;
