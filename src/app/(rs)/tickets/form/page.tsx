import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTickets";
import BackButton from "@/components/BackButton";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Users, init as kindeInit } from "@kinde/management-api-js"

import React from 'react'
import TicketForm from "./TicketForm";

async function TicketFormPage({
  searchParams
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  try {

    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) {
      return <>
        <h2 className="text-2xl mb-2">Ticket or Customer ID is required</h2>
        <BackButton title="Go Back" variant="default" />
      </>
    }

    const { getPermission, getUser } = getKindeServerSession()

    const [managerPermission, user] = await Promise.all([
      getPermission('manager'),
      getUser()
    ])

    const isManager = managerPermission?.isGranted;

    // New ticket form
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId))

      if (!customer) {
        return <>
          <h2 className="text-2xl mb-2">Customer ID {customerId} not found</h2>
          <BackButton title="Go Back" variant="default" />
        </>
      }

      if (!customer.active) {
        return <>
          <h2 className="text-2xl mb-2">Selected customer is not active</h2>
          <BackButton title="Go Back" variant="default" />
        </>
      }

      // return ticket form
      if (isManager) {
        kindeInit()
        const { users } = await Users.getUsers()

        const techs = users ? users.map(user => ({ id: user.email!, description: user.email! })) : []
        return <TicketForm customer={customer} techs={techs} />
      } else {
        return <TicketForm customer={customer} />
      }
    }

    // edit ticket form
    if (ticketId) {

      const ticket = await getTicket(parseInt(ticketId))

      if (!ticket) {
        return <>
          <h2 className="text-2xl mb-2">Ticket ID {ticketId} not found</h2>
          <BackButton title="Go Back" variant="default" />
        </>
      }

      const customer = await getCustomer(ticket.customerId);

      // return ticket form
      if (isManager) {
        kindeInit()
        const { users } = await Users.getUsers()

        const techs = users ? users.map(user => ({ id: user.email!, description: user.email! })) : []
        return <TicketForm customer={customer} ticket={ticket} techs={techs} />
      } else {

        const isEditable = user!.email === ticket.tech;

        return <TicketForm ticket={ticket} customer={customer} isEditable={isEditable} />
      }


    }

  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
  }

  return (
    <div>TicketFormPage</div>
  )
}

export default TicketFormPage
