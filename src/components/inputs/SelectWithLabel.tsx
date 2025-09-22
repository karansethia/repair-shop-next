"use client"

import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  FormField
} from '../ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


type DataObj = {
  id: string,
  description: string,
}

type Props<S> = {
  fieldTitle: string,
  nameInSchema: keyof S & string,
  data: DataObj[]
  className?: string,
}

import React from 'react'
import { cn } from "@/lib/utils"

const SelectWithLabel = <S,>({
  fieldTitle, nameInSchema, data, className
}: Props<S>) => {

  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>
          <Select {...field}
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger id={nameInSchema} className={cn("w-full", className)}>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
            </FormControl>
              <SelectContent>
                {data.map(item => (
                  <SelectItem key={`${nameInSchema}_${item.id}`} value={item.id}>
                    {item.description}
                  </SelectItem>
                ))}
              </SelectContent>
            <FormMessage />
          </Select>
        </FormItem>
      )}
    />
  )
}

export default SelectWithLabel
