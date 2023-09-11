'use client'
//Authentication
import SignInButton from "@/components/authentication/SignInButton"
import { useSession } from 'next-auth/react'
import Image from "next/image"
import { FaUser } from "react-icons/fa"

function MobileUserNav() {
    const { data: session } = useSession()
    const currentUser = session?.user || 'User'

    return (
        <div className="block mg:hidden my-4">
            {session ?
                <>
                    {currentUser?.picture ? <Image
                        className="inline rounded-full mx-auto mr-2"
                        src={currentUser?.picture}
                        width={40}
                        height={40}
                        alt={currentUser?.name ?? "Profile Pic"}
                        priority={true}
                    /> : <FaUser size={40} className='ml-2 p-1 inline rounded-full border border-gray-100' />}
                    {currentUser.name || currentUser.email || 'Profile'}

                </>
                :
                null
            }
        </div>
    )
}

export default MobileUserNav