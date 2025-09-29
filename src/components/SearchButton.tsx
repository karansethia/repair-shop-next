"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

export default function SearchButton() {

  const status = useFormStatus()

  return (
    <Button type="submit" disabled={status.pending} className="w-20">
      {status.pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        "Search"
      )}
    </Button>
  )

}
