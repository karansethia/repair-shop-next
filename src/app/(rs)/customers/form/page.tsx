import BackButton from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";
import CustomerForm from "./CustomerForm";
import { Metadata } from "next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function generateMetadata({
  searchParams
}: { searchParams: Promise<{ [key: string]: string | undefined }> }): Promise<Metadata> {
  const { customerId } = await searchParams

  if (!customerId) return { title: "New Customer" }

  return { title: `Edit Customer #${customerId}` }
}

export default async function CustomerFormPage({
  searchParams
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  try {

const { getPermission } = getKindeServerSession()

    const managerPermission = await getPermission("manager")

    const isManager = managerPermission?.isGranted; 

    const { customerId } = await searchParams;

    // Edit a customer form;
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId))

      if (!customer) {
        return <>
          <h2 className="text-2xl mb-2 text-white">Customer ID {customerId} not found</h2>
          <BackButton title="Go Back" variant="default" />
        </>
      }

      // customer found and put customer form for editing
      return <CustomerForm key={customerId} customer={customer} isManager={isManager} />
    } else {
      // new customer form component;
      return <CustomerForm key="new" isManager={isManager} />
    }

  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
}
