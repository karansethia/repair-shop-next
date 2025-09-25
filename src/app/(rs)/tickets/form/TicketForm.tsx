"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { InsertTicketSchemaType, SelectTicketSchemaType, insertTicketSchema } from "@/zod-schemas/ticket"
import { SelectCustomerSchemaType } from "@/zod-schemas/customer"
import InputWithLabel from "@/components/inputs/InputWithLabel"
import TextareaWithLabel from "@/components/inputs/TextareaWithLabel"
import CheckboxWithLabel from "@/components/inputs/CheckboxWithLabel"

import { useAction } from "next-safe-action/hooks"
import { saveTicketAction } from "@/app/actions/saveTicketAction"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse"
import SelectWithLabel from "@/components/inputs/SelectWithLabel"

type Props = {
  techs?: { id: string, description: string }[],
  isEditable?: boolean,
  ticket?: SelectTicketSchemaType,
  customer: SelectCustomerSchemaType
}

const TicketForm = ({ customer, ticket, techs, isEditable = true }: Props) => {

  const isManager = Array.isArray(techs);

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

  const {
    execute: saveTicketDetails, result, isExecuting, reset
  } = useAction(saveTicketAction, {
    onSuccess() {
      toast.success("Ticket Saved")
    },
    onError() {
      toast.error("Something went wrong")
    }
  })

  const submitHandler = async (data: InsertTicketSchemaType) => {
    saveTicketDetails(data)
  }
  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={result} />
      <div>
        <h2 className="text-2xl font-bold">
          {ticket?.id && isEditable ? "Edit " : ticket?.id ? `View ` : "New "} Ticket Form
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="flex flex-col sm:flex-row gap-4 sm:gap-8">
          <div className="flex flex-col gap-3 w-1/3">
            <InputWithLabel<InsertTicketSchemaType> fieldTitle="Title" nameInSchema="title" disabled={!isEditable} />
            {isManager ?
              <SelectWithLabel<InsertTicketSchemaType> fieldTitle="Technician" nameInSchema="tech" data={[
                { id: 'new-ticket@example.com', description: 'new-ticket@example.com' },
                ...techs
              ]} />
              : <InputWithLabel<InsertTicketSchemaType> fieldTitle="Technician" nameInSchema="tech" disabled={true} />
            }
            {ticket?.id
              ? (<CheckboxWithLabel<InsertTicketSchemaType> fieldTitle="Completed" nameInSchema="completed" message="Yes" disabled={!isEditable} />
              ) : null
            }
            <div className="mt-4 space-y-4">
              <h3 className="text-xl">Customer Info</h3>
              <hr className="w-4/5" />
              <p>{customer.firstName} {customer.lastName}</p>
              <p>{customer.address1}</p>
              {customer.address2 ? <p>{customer.address2}</p> : null}
              <p>{customer.city} - {customer.state} - {customer.zip}</p>
              <hr className="w-4/5" />
              <p>{customer.email} - {customer.phone}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-1/3">
            <TextareaWithLabel<InsertTicketSchemaType> fieldTitle="Description" nameInSchema="description" className="h-80" disabled={!isEditable} />
            {isEditable &&
              <div className="flex gap-2">
                <Button type="submit" className="w-3/4" variant="default" title="Save" disabled={isExecuting}>
                  {isExecuting ? <Loader2 className="animate-spin" /> : "Save"}
                </Button>
                <Button type="button" className="" variant="destructive"
                  onClick={() => {
                    form.reset(defaultValues)
                    reset()
                  }}>Reset</Button>
              </div>
            }
          </div>
        </form>
      </Form>
    </div>
  )
}

export default TicketForm;
