"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { ItemDataType } from "../../products.types";
import { getItemsData } from "../../products.service";

import { TableProps } from "@/constants/types";
import CommonTable, { ColumnType } from "@/components/CommonTable";
import { BiEdit, BiPlus } from "react-icons/bi";


const ItemsTable: React.FC<TableProps> = ({ reload }) => {
    const [items, setItems] = useState<ItemDataType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async (paramPage?: number) => {
        setIsLoading(true);

        try {
            const currentPage = paramPage || page;

            const response = await getItemsData(
                currentPage,
                limit
            );

            if (response.success) {
                setItems(response.items);
                setTotalRows(response.totalItems);
                setTotalPages(response.totalPages);
                setPage(currentPage);
            } else {
                setItems([]);
            }
        } catch {
            setItems([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [reload, page]);

    const columns: ColumnType<ItemDataType>[] = [
        {
            header: "Image",
            accessor: "mainImagePath",
            render: (item) => (
                <div className="relative w-14 h-14 overflow-hidden rounded-lg border border-gray-200">
                    <Image
                        src={item.mainImagePath}
                        alt={item.name}
                        fill
                        className="object-cover"
                    />
                </div>
            ),
        },

        {
            header: "Name",
            accessor: "name",
            render: (item) => (
                <div className="max-w-[250px]">
                    <p className="line-clamp-2">
                        {item.name}
                    </p>
                </div>
            ),
        },

        {
            header: "Price",
            accessor: "price",
            render: (item) => (
                <div>
                    {item.newPrice > 0 ? (
                        <>
                            <p className="text-sm font-bold text-secondary">
                                Rs. {item.newPrice}
                            </p>

                            <p className="text-sm text-gray-400 line-through">
                                Rs. {item.price}
                            </p>
                        </>
                    ) : (
                        <p className="text-sm font-bold text-secondary">
                            Rs. {item.price}
                        </p>
                    )}
                </div>
            ),
        },

        {
            header: "",
            accessor: "",
            render: (item) => (
                <div>
                    <button
                        onClick={() => {
                            // Handle edit action
                        }}
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-xs p-1 rounded border-solid border-primary border"
                    >
                        <BiPlus className="h-4 w-4" />
                        Add images
                    </button>
                </div>
            ),
        },

        {
            header: "",
            accessor: "",
            render: (item) => (
                <div>
                    <button
                        onClick={() => {
                            // Handle edit action
                        }}
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-xs p-1 rounded border-solid border-primary border"
                    >
                        <BiPlus className="h-4 w-4" />
                        Add colors
                    </button>
                </div>
            ),
        },

        {
            header: "",
            accessor: "",
            render: (item) => (
                <div>
                    <button
                        onClick={() => {
                            // Handle edit action
                        }}
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-xs"
                    >
                        <BiEdit className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <CommonTable
            columns={columns}
            data={items}
            isLoading={isLoading}
            expandable
            page={page}
            limit={limit}
            totalPages={totalPages}
            totalRows={totalRows}
            onPageChange={(newPage) => {
                setPage(newPage);
            }}
            renderExpandedRow={(item) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 mb-2">
                            Description
                        </h3>

                        <p className="text-sm text-gray-600">
                            {item.description}
                        </p>
                        <p className="text-sm text-gray-600 mt-3">
                            {item.categoryInfo.name} <span className="text-muted-foreground">/</span> {item.subCategoryInfo.name} <span className="text-muted-foreground">/</span> {item.mainCategoryInfo.name}
                        </p>
                    </div>

                    <div className="space-y-2">
                        {item.model && <div>
                            <span className="font-medium">
                                Model:
                            </span>{" "}
                            {item.model}
                        </div>}

                        {item.rating > 0 && <div>
                            <span className="font-medium">
                                Rating:
                            </span>{" "}
                            ⭐ {item.rating}
                        </div>}

                        {item.reviews > 0 && <div>
                            <span className="font-medium">
                                Reviews:
                            </span>{" "}
                            {item.reviews}
                        </div>}

                        {item.colors.length > 0 && <div>
                            <span className="font-medium">
                                Colors:
                            </span>{" "}
                            {item.colors
                                .map((color) => color.name)
                                .join(", ")}
                        </div>}
                    </div>
                </div>
            )}
        />
    );
};

export default ItemsTable;