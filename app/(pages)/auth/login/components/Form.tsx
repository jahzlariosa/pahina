'use client'
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const forValidation = searchParams.get("for_validation");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (provider: string) => {
    signIn(provider, { callbackUrl });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signInPromise = async () => {
      try {
        const result = await signIn('credentials', {
          redirect: false,
          email: e.currentTarget.email.value,
          password: e.currentTarget.password.value,
        });
        if (result?.error) {
          throw new Error(`Invalid Credentials`);
        }
      } catch (error) {
        console.log(`Error: Invalid credentials or unverified Account`);
        throw error;
      }
    };

    toast.promise(
      signInPromise(),
      {
        pending: {
          theme: 'dark',
          render() {
            return 'Logging in...';
          },
          icon: '🟠',
        },
        success: {
          theme: 'dark',
          render() {
            return 'Welcome back!';
          },
          icon: '🟢',
          autoClose: 1000,
          onClose: () => {
            window.location.href = '/';
          },
        },
        error: {
          theme: 'dark',
          render(err: any) {
            return err.data.message;
          },
          icon: '🔴',
        },
      }
    );
  };

  const styles = {
    InputClass: `border border-gray-300 rounded-lg w-full px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`,
    GoogleButton: `mx-auto w-full text-center rounded-md flex items-center justify-center border border-gray-300 rounded-lg text-sm font-medium text-gray-800 p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-4`,
    SubmitButton: `rounded-xl w-full mt-5 bg-black hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-all ease-in-out duration-200`
  };


  const ValidationPromp = () => {
    if (forValidation !== null && parseInt(forValidation) == 1) {
      return (
        <div className="bg-orange-100 border-t border-b border-orange-500 text-orange-700 px-4 py-3 mb-4" role="alert">
          <p className="font-bold">Email Validation required</p>
          <p className="text-sm">Please check your email for the verification link and to activate your account</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <ToastContainer />
      <div className="mb-4">
        <button className={styles.GoogleButton} onClick={() => handleSignIn("google")}>
          <FcGoogle size={36} className="mr-4" />
          Continue with Google
        </button>
      </div>

      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="mx-2 text-gray-400">or continue with</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <form className="mt-4" onSubmit={onSubmit}>
        <ValidationPromp />
        <div className="space-y-2">
          <label htmlFor="email" className="block">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email@example.com"
            className={styles.InputClass}
          />

          <label htmlFor="password" className="block">Password</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder='************'
              className={styles.InputClass}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </button>
          </div>
        </div>

        <button className={styles.SubmitButton}>
          Sign In
        </button>
      </form>
    </>
  );
};
