import { Home, File, UsersRound, LogOut } from "lucide-react";
import Link from "next/link";
import NavButton from "./NavButton";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { NavButtonMenu } from "./NavButtonMenu";

const Header = () => {
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">

      <div className="flex flex-row h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton label="Home" href="/home" icon={Home} />
          <Link href="/home" className="flex justify-center items-center gap-2 ml-0" title="home">
            <h1 className="hidden sm:block text-xl font-bold m-0">Fixmate - Your Neighbouthood repair shop</h1>
          </Link>
        </div>
        <div className="flex items-center">
          <NavButton label="Tickets" href="/tickets" icon={File} />
          <NavButtonMenu icon={UsersRound} label="Customer Menu" choices={[
            { title: "Search Customers", href: "/customers" },
            { title: "New", href: "/customers/form" },
          ]} />
          <ModeToggle />
          <Button asChild className="rounded-full" variant="ghost" size="icon">
            <LogoutLink><LogOut /></LogoutLink>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header;
