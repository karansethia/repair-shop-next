"use client"

import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  FormField
} from '../ui/form'
import { Input } from "../ui/input"
import { InputHTMLAttributes } from "react"

type Props<S> = {
  fieldTitle: string,
  nameInSchema: keyof S & string,
  className?: string,
} & InputHTMLAttributes<HTMLInputElement>

import React from 'react'
import { cn } from "@/lib/utils"

const InputWithLabel = <S,>({
  fieldTitle, nameInSchema, className, ...props
}: Props<S>) => {

  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-base" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>
          <FormControl>
            <Input
              id={nameInSchema}
              className={cn("w-full disabled:text-blue-500 dark:disabled:text-yellow-500 disabled:opacity-75", className)}
              {...props}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputWithLabel
