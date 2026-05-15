"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { MainCategoryDataType } from "../../products.types";
import { getMainCategoriesData } from "../../products.service";

import { TableProps } from "@/constants/types";
import CommonTable, { ColumnType } from "@/components/CommonTable";


const MainCategoriesTable: React.FC<TableProps> = ({ reload }) => {
    const [mainCategories, setMainCategories] = useState<MainCategoryDataType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async (paramPage?: number) => {
        setIsLoading(true);

        try {
            const currentPage = paramPage || page;

            const response = await getMainCategoriesData(
                currentPage,
                limit
            );

            if (response.success) {
                setMainCategories(response.mainCategories);
                setTotalRows(response.totalMainCategories);
                setTotalPages(response.totalPages);
                setPage(currentPage);
            } else {
                setMainCategories([]);
            }
        } catch {
            setMainCategories([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [reload, page]);

    const columns: ColumnType<MainCategoryDataType>[] = [
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
            header: "Category Name",
            accessor: "categoryInfo.name",
            render: (item) => (
                <div className="max-w-[250px]">
                    <p className="line-clamp-2">
                        {item.categoryInfo?.name}
                    </p>
                </div>
            ),
        },

        {
            header: "Main Category Name",
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
            header: "Image",
            accessor: "imagePath",
            render: (item) => (
                <div className="relative w-14 h-14 overflow-hidden rounded-lg border border-gray-200">
                    <Image
                        src={item.imagePath}
                        alt={item.name}
                        fill
                        className="object-cover"
                    />
                </div>
            ),
        },
    ];

    return (
        <CommonTable
            columns={columns}
            data={mainCategories}
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

export default MainCategoriesTable;