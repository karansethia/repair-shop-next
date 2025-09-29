import type { Metadata } from 'next';
import TicketSearch from "./TicketSearch"
import { getTicketsSearchResult } from '@/lib/queries/getTicketsSearchResults';
import { getOpenTicket } from '@/lib/queries/getOpenTickets';
import TicketTable from './TicketsTable';

export const metadata: Metadata = {
  title: "Ticket Search"
};

const Tickets = async ({
  searchParams
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {

  const { searchText } = await searchParams

  if (!searchText) {
    const resultOpen = await getOpenTicket()
    return (
      <>
        <TicketSearch />
        {resultOpen.length > 0 ?
          <TicketTable data={resultOpen} />
        : <p>No Results found</p> }
      </>
    )
  }

  // query database
  const results = await getTicketsSearchResult(searchText)
  //  return result
  return (
    <>
      <TicketSearch />
      {results.length > 0 ?
        <TicketTable data={results} />
      : <p>No Open tickets </p> }
    </>
  )
}

export default Tickets
