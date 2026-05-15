'use client';

import { useState } from "react";
import { BiPlus } from "react-icons/bi";

import ItemsTable from "./ItemsTable";
import AddItemModal from "./AddItemModal";


const Items = () => {
    const [open, setOpen] = useState(false);
    const [reloadTable, setReloadTable] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleReload = () => setReloadTable((prev) => !prev);

    return (
        <>
            <div className="overflow-y-auto w-full h-full scrollbar-hide">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-semibold text-lg">Items</h2>
                    <div className="flex justify-end">
                        <button
                            onClick={handleClickOpen}
                            className="flex items-center gap-2 bg-primary hover:bg-primary/90 cursor-pointer text-white text-sm px-3 py-1 rounded-md shadow"
                        >
                            <BiPlus className="w-5 h-5" />
                            Add Item
                        </button>
                        <AddItemModal
                            isOpen={open}
                            onClose={handleClose}
                            handleReload={handleReload}
                        />
                    </div>
                </div>
                <ItemsTable reload={reloadTable} />
            </div>
        </>
    );
};

export default Items;
