'use client'
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

export const GoogleLogin = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSignIn = (provider: string) => {
    signIn(provider, { callbackUrl });
  };

  const styles = {
    GoogleButton: `dark:bg-zinc-800 dark:text-white dark:hover:bg-black  mx-auto w-full text-center rounded-md flex items-center justify-center border border-gray-300 rounded-lg text-sm font-medium text-gray-800 p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-4`,
  };

  return (
    <>
      <div className="mb-4">
        <button className={styles.GoogleButton} onClick={() => handleSignIn("google")}>
          <FcGoogle size={36} className="mr-4" />
          Continue with Google
        </button>
      </div>
    </>
  );
};
