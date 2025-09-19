"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { InsertTicketSchemaType, SelectTicketSchemaType, insertTicketSchema } from "@/zod-schemas/ticket"
import { SelectCustomerSchemaType } from "@/zod-schemas/customer"

type Props = {
  ticket?: SelectTicketSchemaType,
  customer: SelectCustomerSchemaType
}

const TicketForm = ({ customer, ticket }: Props) => {

  const defaultValues: InsertTicketSchemaType = {
    id: ticket?.id ?? "(New)",
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title ?? '',
    description: ticket?.description ?? '',
    completed: ticket?.completed ?? false,
    tech: ticket?.tech ?? 'new-ticket@example.com',
  }

  const form = useForm<InsertTicketSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertTicketSchema),
    defaultValues
  })

  const submitHandler = async (data: InsertTicketSchemaType) => {
    console.log(data)
  }
  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {ticket?.id ? "Edit " : "New "} Ticket Form
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <p>{JSON.stringify(form.getValues())}</p>
        </form>
      </Form>
    </div>
  )
}

export default TicketForm;
