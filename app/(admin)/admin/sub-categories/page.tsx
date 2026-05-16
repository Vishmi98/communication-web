"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import SubCategories from "@/modules/admin/subCategories/SubCategories"
import { getCookieUser } from "@/utils/cookie.util";


const SubCategoriesPage = () => {
    const user = getCookieUser()
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/sign_in');
        }
    }, [user, router]);

    return (
        <SubCategories />
    )
}

export default SubCategoriesPage