'use client'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { PiSignOut } from 'react-icons/pi';

const SignOutButton = () => {
  const { data: session } = useSession();

  if (!session) {
    return null; // Render nothing if user is not signed in
  }

  return (
    <Link className="dark:text-white" href="#" onClick={() => signOut()}>
      <PiSignOut size={24} className="inline" />
    </Link>

  );
};

export default SignOutButton;