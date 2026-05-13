"use client";

import { useRouter } from 'next/navigation'

import { getCookieUser } from '@/utils/cookie.util'
import LoginForm from '@/modules/auth/ui/LoginForm';


const LogInPage = () => {
    const user = getCookieUser()
    const router = useRouter();

    if (user) {
        router.push('/')
    }

    return (
        <div className="h-[90vh] md:h-screen flex items-center justify-center px-4 md:px-0 bg-white">
            <div className="flex w-[90%] md:w-[70%] mx-auto items-center justify-center">
                {/* Form Section */}
                <div className="w-full md:w-1/2 flex items-start justify-start">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default LogInPage