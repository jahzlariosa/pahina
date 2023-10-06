import { siteConfig } from "@/config/site";
import { MainNav } from "./navigation/main-nav";
import { MobileNav } from "./navigation/mobile-nav";
import UserNavButton from "@/components/user/nav-button";

export async function SiteHeader() {
  return (
    <header className="bg-white dark:bg-zinc-900 dark:text-white sticky top-0 z-40 w-full border-b transition-all duration-300">
      <div className="px-4 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav items={siteConfig.mobileNav} />
        <UserNavButton/>
      </div>
    </header>
  )
}
