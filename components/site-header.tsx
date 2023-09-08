import { siteConfig } from "@/config/site";
import { MainNav } from "./navigation/main-nav";
import { MobileNav } from "./navigation/mobile-nav";

export async function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="px-4 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav items={siteConfig.mobileNav}/>
      </div>
    </header>
  )
}
