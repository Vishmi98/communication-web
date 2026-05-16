'use client';

import { useState } from "react";

import OrdersTable from "./OrdersTable";


const Orders = () => {
    const [open, setOpen] = useState(false);
    const [reloadTable, setReloadTable] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleReload = () => setReloadTable((prev) => !prev);

    return (
        <>
            <div className="overflow-y-auto w-full h-full scrollbar-hide">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-semibold text-lg">Orders</h2>
                </div>
                <OrdersTable reload={reloadTable} />
            </div>
        </>
    );
};

export default Orders;
