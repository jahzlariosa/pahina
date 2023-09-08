import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    jwt?: string | null | undefined

    user: {
      id: string
      jwt?: string | null | undefined

    } & DefaultSession["user"]
  }
    // Define the User type with the jwt property
    interface User {
      id: string
      jwt?: string | null | undefined
      // Other user properties
    }
  
    // Define the AdapterUser type with the jwt property
    interface AdapterUser {
      id: string
      jwt?: string | null | undefined
      // Other adapter user properties
    }
}

