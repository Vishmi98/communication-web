"use client";

import React, { useEffect, useState } from "react";

import { CategoryDataType } from "../../products.types";
import { getCategoriesData } from "../../products.service";

import { TableProps } from "@/constants/types";
import CommonTable, { ColumnType } from "@/components/CommonTable";


const CategoriesTable: React.FC<TableProps> = ({ reload }) => {
    const [categories, setCategories] = useState<CategoryDataType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async (paramPage?: number) => {
        setIsLoading(true);

        try {
            const currentPage = paramPage || page;

            const response = await getCategoriesData(
                currentPage,
                limit
            );

            if (response.success) {
                setCategories(response.categories);
                setTotalRows(response.totalCategories);
                setTotalPages(response.totalPages);
                setPage(currentPage);
            } else {
                setCategories([]);
            }
        } catch {
            setCategories([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [reload, page]);

    const columns: ColumnType<CategoryDataType>[] = [
        {
            header: "Id",
            accessor: "id",
            render: (item) => (
                <div className="max-w-[250px]">
                    <p className="line-clamp-2">
                        {item.id}
                    </p>
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
    ];

    return (
        <CommonTable
            columns={columns}
            data={categories}
            isLoading={isLoading}
            expandable={false}
            page={page}
            limit={limit}
            totalPages={totalPages}
            totalRows={totalRows}
            onPageChange={(newPage) => {
                setPage(newPage);
            }}
        />
    );
};

export default CategoriesTable;