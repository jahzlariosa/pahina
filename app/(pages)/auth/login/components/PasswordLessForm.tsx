'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSpinner } from 'react-icons/fa';

export const PasswordLessForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const errorCallback = searchParams.get("error");
    const [sentCode, setSentCode] = useState(false);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const handleSignIn = (provider: string) => {
        signIn(provider, { callbackUrl });
    };

    const displayErrorToast = (errorMessage: string) => {
        toast.error(errorMessage, {
            theme: 'dark',
            icon: '🔴',
        });
    };

    const displaySuccessToast = (successMessage: string) => {
        toast.error(successMessage, {
            theme: 'dark',
            icon: '🟢',
        });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsLoading(true)
            const emailVerify = await fetch(`https://${process.env.strapi_domain}/api/passwordless/send-link`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                }),
            });

            if (!emailVerify.ok) {
                displayErrorToast('Something went wrong...');
                throw new Error('Something went wrong...');
            }

            const res = await emailVerify.json();
            if (res.sent === true) {
                displaySuccessToast(`Email verification code sent! `)
                setSentCode(true);
                setIsLoading(false)
            }

        } catch (error) {
            console.error(error);
            displayErrorToast('Something went wrong...');
        }
    };

    const onSubmitVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            await signIn('credentials', {
                code: e.currentTarget.code.value,
            });
            if (errorCallback) {
                displayErrorToast('Code is invalid');
            }
        } catch (error) {
            console.error(error);
            displayErrorToast('Error: An unexpected error occurred');
        }
        setIsLoading(false)
    };

    const styles = {
        InputClass: `dark:text-white border border-gray-300 rounded-lg w-full px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`,
        GoogleButton: `mx-auto w-full text-center rounded-md flex items-center justify-center border border-gray-300 rounded-lg text-sm font-medium text-gray-800 p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-4`,
        SubmitButton: `rounded-xl w-full mt-5 bg-black hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-all ease-in-out duration-200`,
        label: `dark:text-white`
    };

    const commonInputProps = {
        className: styles.InputClass,
    };

    return (
        <>
            <div className="flex items-center mt-4">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="mx-2 text-gray-400">or continue with passwordless login</span>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <form className={`mt-4 ${sentCode === false ? `block` : `hidden`}`} onSubmit={onSubmit}>
                <div className="space-y-2">
                    <label htmlFor="email" className={styles.label}>
                        Email
                    </label>
                    <input required id="email" name="email" type="email" placeholder="email@example.com" {...commonInputProps} value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <button className={styles.SubmitButton}>
                    {isLoading ? <div className="flex justify-center items-center"><FaSpinner className='inline mx-auto animate-spin' /></div>
                        : `Verify email`}</button>
            </form>

            <form className={`mt-4 ${sentCode === true ? `block` : `hidden`}`} onSubmit={onSubmitVerify}>
                <div className="space-y-2">
                    <label htmlFor="VerificationCode" className={styles.label + ` font-medium`}>
                        Verification Code
                    </label>
                    <p className='text-sm'>A one time verification code has been sent to your email</p>
                    <input id="code" name="code" type="text" placeholder="Enter the verification code" {...commonInputProps} />
                </div>
                <button className={styles.SubmitButton}>{isLoading ? <div className="flex justify-center items-center"><FaSpinner className='inline mx-auto animate-spin' /></div>
                        : `Validate code`}</button>
            </form>

            {/* ToastContainer to display toasts */}
            <ToastContainer />
        </>
    );
};
