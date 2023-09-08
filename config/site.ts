export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Next.js",
  description:
    "Next Starter",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  mobileNav: [
    {
      title: "Home",
      href: "/",
      cname: ""
    },
  ],
  links: {
    twitter: "",
    github: "",
    docs: "",
  },
}