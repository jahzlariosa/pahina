import { siteConfig } from "@/config/site";
import { MainNav } from "./navigation/main-nav";
import { MobileNav } from "./navigation/mobile-nav";

//Authentication
import { getServerSession } from "next-auth"
import SignInButton from "./authentication/SignInButton"
import SignOutButton from "./authentication/SignOutButton"
import { options } from "@/app/api/auth/[...nextauth]/options"
import { ModeToggle } from "./darkmode/mode-toggle";


export async function SiteHeader() {
  const session = await getServerSession(options)
  return (
    <header className="light:bg-white dark:bg-zinc-800 dark:text-white sticky top-0 z-40 w-full border-b">
      <div className="px-4 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav items={siteConfig.mobileNav}/>
        {!session ? <SignInButton/> : <SignOutButton/>}
        <ModeToggle />
      </div>
    </header>
  )
}
