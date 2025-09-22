"use client"

import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  FormField
} from '../ui/form'
import { Textarea } from "../ui/textarea"
import { TextareaHTMLAttributes } from "react"

type Props<S> = {
  fieldTitle: string,
  nameInSchema: keyof S & string,
  className?: string,
} & TextareaHTMLAttributes<HTMLTextAreaElement>

import React from 'react'
import { cn } from "@/lib/utils"

const TextareaWithLabel = <S,>({ fieldTitle, nameInSchema, className, ...props }: Props<S>) => {

  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base mb-2" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>
          <FormControl>
            <Textarea
              id={nameInSchema}
              className={cn("disabled:text-blue-500 dark:disabled:text-yellow-500 disabled:opacity-75", className)}
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

export default TextareaWithLabel;
