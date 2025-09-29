import Form from "next/form"
import { Input } from "@/components/ui/input";
import SearchButton from "@/components/SearchButton";

/*
 * We use the nextjs form component premarily to set up search params and not some server action
 * Form from nextjs makes it easy to handle and add earch params
 * */

const CustomerSearch = () => {
  return (
    <Form action="/customers"
      className="flex gap-2 items-center"
    >
      <Input name="searchText" placeholder="Search Customers" type="text" className="w-full" />
      <SearchButton />
    </Form>
  )
}

export default CustomerSearch;
