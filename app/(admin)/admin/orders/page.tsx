"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getCookieUser } from "@/utils/cookie.util";
import Orders from "@/modules/admin/orders/Orders";


const OrdersPage = () => {
    const user = getCookieUser()
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/sign_in');
        }
    }, [user, router]);

    return (
        <Orders />
    )
}

export default OrdersPage