import type { Metadata } from 'next';
import CustomerSearch from "./CustomerSearch"
import { getCustomerSearchResults } from '@/lib/queries/getCustomersSearchResults';
import CustomerTable from './CustomerTable';

export const metadata: Metadata = {
  title: "Customer Search"
};

const Customers = async ({
  searchParams
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {

  const { searchText } = await searchParams

  if (!searchText) return <CustomerSearch />

  // query database
  const results = await getCustomerSearchResults(searchText)
  //  return result
  return (
    <>
      <CustomerSearch />
      {results.length > 0
        ? <CustomerTable data={results} />
        : <p className='mt-4'>No Result Found</p>
      }
    </>
  )
}

export default Customers
