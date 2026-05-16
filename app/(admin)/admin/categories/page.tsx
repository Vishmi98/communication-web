"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Categories from "@/modules/admin/categories/Categories"
import { getCookieUser } from "@/utils/cookie.util";


const CategoriesPage = () => {
    const user = getCookieUser()
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/sign_in');
        }
    }, [user, router]);

    return (
        <Categories />
    )
}

export default CategoriesPage