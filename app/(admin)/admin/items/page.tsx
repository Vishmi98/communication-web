"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Items from "@/modules/admin/items/Items"
import { getCookieUser } from "@/utils/cookie.util";


const ItemsPage = () => {
    const user = getCookieUser()
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/sign_in');
        }
    }, [user, router]);

    return (
        <Items />
    )
}

export default ItemsPage