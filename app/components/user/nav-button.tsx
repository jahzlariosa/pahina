import Image from 'next/image'

import { FaUser } from 'react-icons/fa'
import { ModeToggle } from '../switcher/toggler'
import MenuDropdown from '../ui/Menu/MenuDropdown'
import MenuItem from '../ui/Menu/MenuItem'
import MenuSubItem from '../ui/Menu/MenuSubItem'

//Authentication
import { getServerSession } from "next-auth"
import SignInButton from "@/app/components/authentication/SignInButton"
import SignOutButton from "@/app/components/authentication/SignOutButton"
import { options } from "@/app/api/auth/[...nextauth]/options"

async function UserNavButton() {
    const session = await getServerSession(options)
    console.log(session?.user)
    const currentUser = session?.user || 'User'

    return (
        <><div className="hidden md:block">
            {session ?
                <MenuDropdown icon={currentUser?.picture ? <Image
                    className="inline rounded-full mx-auto p-2 ml-2 "
                    src={currentUser?.picture}
                    width={50}
                    height={50}
                    alt={currentUser?.name ?? "Profile Pic"}
                    priority={true}
                /> : <FaUser size={40} className='ml-2 p-1 inline rounded-full border border-gray-100'/>}>
                    {currentUser.name || currentUser.email || 'Profile'}
                    <MenuItem><ModeToggle /></MenuItem>
                    <MenuItem><SignOutButton /></MenuItem>
                </MenuDropdown>
                : 
            <SignInButton/>
            }
            </div>
        </>
    )
}

export default UserNavButton