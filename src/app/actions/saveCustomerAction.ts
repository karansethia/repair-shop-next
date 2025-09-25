"use server"

import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"
import { redirect } from "next/navigation"

import { db } from "@/db"
import { customers } from "@/db/schema"
import { actionClient } from "@/lib/safe-action"
import { insertCustomerSchema, type InsertCustomerSchemaType } from "@/zod-schemas/customer"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export const saveCustomerAction = actionClient
  .metadata({ actionName: "saveCustomerAction" })
  .inputSchema(insertCustomerSchema, {
    handleValidationErrorsShape: async (e) => flattenValidationErrors(e).fieldErrors
  })
  .action(async ({ parsedInput: customerData }: { parsedInput: InsertCustomerSchemaType }) => {

    const { isAuthenticated } = getKindeServerSession()
    const isAuth = await isAuthenticated()

    if (!isAuth) return redirect('/login')

    if (customerData.id === 0) {
      // new customer insert
      const result = await db.insert(customers).values({
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        email: customerData.email,
        phone: customerData.phone,
        city: customerData.city,
        state: customerData.state,
        zip: customerData.zip,
        active: customerData.active,
        address1: customerData.address1,
        ...(customerData.address2?.trim() ? { address2: customerData.address2 } : {}),
        ...(customerData.notes?.trim() ? { notes: customerData.notes } : {}),
      }).returning({ insertedId: customers.id })

      return { message: `Customer ID ${result[0].insertedId} created` }
    }

    // Existing Customer 
    //
    const result = await db.update(customers).set({
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      email: customerData.email,
      phone: customerData.phone,
      city: customerData.city,
      state: customerData.state,
      zip: customerData.zip,
      active: customerData.active,
      address1: customerData.address1,
      address2: customerData.address2?.trim() ?? null,
      notes: customerData.notes?.trim() ?? null
    }).where(eq(customers.id, customerData.id!))
      .returning({ updatedId: customers.id })

        return { message: `Customer ID ${result[0].updatedId} mutated` }
  })
