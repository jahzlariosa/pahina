'use client'
import { siteConfig } from "@/config/site";
import { MainNav } from "./navigation/main-nav";
import { MobileNav } from "./navigation/mobile-nav";

//Authentication
import SignInButton from "./authentication/SignInButton"
import SignOutButton from "./authentication/SignOutButton"
import { ModeToggle } from "./darkmode/mode-toggle";
import { useSession } from "next-auth/react";

//Theming
import { useTheme } from "next-themes";

export function SiteHeader() {
  const session = useSession();
  const { theme } = useTheme();

  return (
    <header className={`${theme === 'light' ? 'bg-white' : 'bg-black'} transition-all transition duration-300 light:bg-white dark:bg-zinc-800 dark:text-white sticky top-0 z-40 w-full border-b`}>
      <div className="px-4 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 dark:bg-black light:bg-light">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav items={siteConfig.mobileNav}/>
        {!session ? <SignInButton/> : <SignOutButton/>}
        <ModeToggle />
      </div>
    </header>
  )
}
