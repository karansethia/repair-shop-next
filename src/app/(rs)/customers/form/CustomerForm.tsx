"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { InsertCustomerSchemaType, SelectCustomerSchemaType, insertCustomerSchema } from "@/zod-schemas/customer"
import InputWithLabel from "@/components/inputs/InputWithLabel"
import TextareaWithLabel from "@/components/inputs/TextareaWithLabel"
import SelectWithLabel from "@/components/inputs/SelectWithLabel"
import { StatesArray } from "@/constants/StatesArray"

import { useAction } from "next-safe-action/hooks"
import { saveCustomerAction } from "@/app/actions/saveCustomerAction"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import CheckboxWithLabel from "@/components/inputs/CheckboxWithLabel"

type Props = {
  customer?: SelectCustomerSchemaType
}

const CustomerForm = ({ customer }: Props) => {

  const { getPermission, isLoading } = useKindeBrowserClient()

  const isManager = !isLoading && getPermission('manager')?.isGranted;

  const defaultValues: InsertCustomerSchemaType = {
    id: customer?.id || 0,
    firstName: customer?.firstName ?? "",
    lastName: customer?.lastName ?? "",
    address1: customer?.address1 ?? "",
    address2: customer?.address2 ?? "",
    city: customer?.city ?? "",
    state: customer?.state ?? "",
    zip: customer?.zip ?? "",
    phone: customer?.phone ?? "",
    email: customer?.email ?? "",
    notes: customer?.notes ?? "",
    active: customer?.active ?? true,
  }

  const form = useForm<InsertCustomerSchemaType>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues
  })

  const {
    execute: saveCustomerDetails, result, isExecuting, reset
  } = useAction(saveCustomerAction, {
    onSuccess({ data }) {
      toast.success("Customer Saved")
    },
    onError({ error }) {
      toast.error("Something went wrong")
    }
  })

  const submitHandler = async (data: InsertCustomerSchemaType) => {
    saveCustomerDetails(data)
  }
  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={result} />
      <div>
        <h2 className="text-2xl font-bold">
          {customer?.id ? "Edit " : "New "} Customer {customer?.id ? `#${customer.id}` : "Form"}
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="flex flex-col md:flex-row gap-4 sm:gap-8">
          <div className="flex flex-col gap-3 w-1/3">
            <InputWithLabel<InsertCustomerSchemaType> fieldTitle="First Name" nameInSchema="firstName" />
            <InputWithLabel<InsertCustomerSchemaType> fieldTitle="Last Name" nameInSchema="lastName" />
            <InputWithLabel<InsertCustomerSchemaType> fieldTitle="Address Line 1" nameInSchema="address1" />
            <InputWithLabel<InsertCustomerSchemaType> fieldTitle="Address Line 2" nameInSchema="address2" />
            <InputWithLabel<InsertCustomerSchemaType> fieldTitle="City" nameInSchema="city" />
          </div>
          <div className="flex flex-col gap-3 w-1/3">
            <SelectWithLabel<InsertCustomerSchemaType> fieldTitle="State" nameInSchema="state" data={StatesArray} />
            <InputWithLabel<InsertCustomerSchemaType> fieldTitle="Zip Code" nameInSchema="zip" />
            <InputWithLabel<InsertCustomerSchemaType> fieldTitle="E-mail" nameInSchema="email" />
            <InputWithLabel<InsertCustomerSchemaType> fieldTitle="Phone" nameInSchema="phone" />
            <TextareaWithLabel<InsertCustomerSchemaType> fieldTitle="Notes" nameInSchema="notes" className="resize-none h-40" />
            {isLoading ? <p>Loading...</p> : isManager && customer?.id ?
              <CheckboxWithLabel<InsertCustomerSchemaType> fieldTitle="Customer Active Status" nameInSchema="active" message="status" />
              : null}
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
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CustomerForm;
