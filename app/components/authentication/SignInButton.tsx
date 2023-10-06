import Link from 'next/link';
import { TbLogin } from 'react-icons/tb';

const SignInButton = () => {

    return (
        <Link className="dark:text-white" href="/auth/login">
            <TbLogin size={24} className="inline" /> Login
        </Link>
    );
};

export default SignInButton;