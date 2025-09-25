"use server"

import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"
import { redirect } from "next/navigation"

import { db } from "@/db"
import { tickets } from "@/db/schema"
import { actionClient } from "@/lib/safe-action"
import { insertTicketSchema, type InsertTicketSchemaType } from "@/zod-schemas/ticket"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export const saveTicketAction = actionClient
  .metadata({ actionName: "saveTicketAction" })
  .inputSchema(insertTicketSchema, {
    handleValidationErrorsShape: async (e) => flattenValidationErrors(e).fieldErrors
  })
  .action(async ({ parsedInput: ticketData }: { parsedInput: InsertTicketSchemaType }) => {

    const { isAuthenticated } = getKindeServerSession()
    const isAuth = await isAuthenticated()

    if (!isAuth) return redirect('/login')

    if (ticketData.id === '(New)') {
      // new ticket insert
      const result = await db.insert(tickets).values({
        title: ticketData.title,
        description: ticketData.description,
        customerId: ticketData.customerId,
        tech: ticketData.tech,
      }).returning({ insertedId: tickets.id })

      return { message: `Ticket ID ${result[0].insertedId} created` }
    }

    // Existing Ticket 
    const result = await db.update(tickets).set({
      title: ticketData.title,
      description: ticketData.description,
      customerId: ticketData.customerId,
      tech: ticketData.tech,
      completed: ticketData.completed
    }).where(eq(tickets.id, ticketData.id!))
      .returning({ updatedId: tickets.id })

    return { message: `Ticket ID ${result[0].updatedId} mutated` }
  })
