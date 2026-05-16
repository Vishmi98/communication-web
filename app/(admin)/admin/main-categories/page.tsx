"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import MainCategories from "@/modules/admin/mainCategories/MainCategories"
import { getCookieUser } from "@/utils/cookie.util";


const MainCategoriesPage = () => {
    const user = getCookieUser()
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/sign_in');
        }
    }, [user, router]);

    return (
        <MainCategories />
    )
}

export default MainCategoriesPage