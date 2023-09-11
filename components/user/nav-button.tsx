import Image from 'next/image'

import { FaUser } from 'react-icons/fa'
import { ModeToggle } from '../switcher/toggler'
import MenuDropdown from '../ui/Menu/MenuDropdown'
import MenuItem from '../ui/Menu/MenuItem'
import MenuSubItem from '../ui/Menu/MenuSubItem'

//Authentication
import { getServerSession } from "next-auth"
import SignInButton from "@/components/authentication/SignInButton"
import SignOutButton from "@/components/authentication/SignOutButton"
import { options } from "@/app/api/auth/[...nextauth]/options"

async function UserNavButton() {
    const session = await getServerSession(options)
    console.log(session?.user)
    const currentUser = session?.user || 'User'

    return (
        <>
            {session ?
                <MenuDropdown icon={currentUser?.picture ? <Image
                    className="inline rounded-full mx-auto p-2"
                    src={currentUser?.picture}
                    width={50}
                    height={50}
                    alt={currentUser?.name ?? "Profile Pic"}
                    priority={true}
                /> : <FaUser size={24} className='inline'/>}>
                    {currentUser.name || currentUser.email || 'Profile'}
                    <MenuItem><ModeToggle /></MenuItem>
                    <MenuItem><SignOutButton /></MenuItem>
                </MenuDropdown>
                : 
            <SignInButton/>
            }
        </>
    )
}

export default UserNavButton