"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";

import AddImagesModal from "./AddImagesModal";
import EditItemModal from "./EditItemModal";
import AddColorsModal from "./AddColorsModal";
import { ItemDataType } from "../../products/products.types";
import { deleteColor, deleteImage, getItemsData, publishItem } from "../../products/products.service";

import { TableProps } from "@/constants/types";
import CommonTable, { ColumnType } from "@/components/CommonTable";
import { ConfirmModal } from "@/components/ConfirmModal";


const ItemsTable: React.FC<TableProps> = ({ reload }) => {
    const [items, setItems] = useState<ItemDataType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ItemDataType | null>(null);
    const [colorModalOpen, setColorModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const [deleteColorTarget, setDeleteColorTarget] = useState<{ itemId: number; colorId: number } | null>(null);
    const [deleteImageTarget, setDeleteImageTarget] = useState<{ itemId: number; imagePath: string } | null>(null);
    const [publishingItemIds, setPublishingItemIds] = useState<number[]>([]);

    // State for managing the confirmation modal parameters of a publish action
    const [publishTarget, setPublishTarget] = useState<{ id: number; nextState: boolean } | null>(null);

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

    // Step 1: Open the modal instead of changing the status immediately
    const handleToggleClick = (id: number, currentPublishState: boolean) => {
        setPublishTarget({
            id,
            nextState: !currentPublishState
        });
    };

    // Step 2: Execute the API call once the user clicks confirm on the modal
    const handleConfirmPublishToggle = async () => {
        if (!publishTarget) return;

        const { id, nextState } = publishTarget;

        // Close confirmation modal instantly
        setPublishTarget(null);

        // Track loading state for this specific row item
        setPublishingItemIds((prev) => [...prev, id]);

        // Optimistically update UI locally
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, isPublished: nextState } : item
            )
        );

        try {
            const res = await publishItem(id, nextState);

            if (res.success) {
                toast.success(res.message || `Item successfully ${nextState ? "published" : "unpublished"}.`);
            } else {
                toast.error(res.message || "Failed to update item visibility status.");
                // Revert state change locally on failure
                setItems((prevItems) =>
                    prevItems.map((item) =>
                        item.id === id ? { ...item, isPublished: !nextState } : item
                    )
                );
            }
        } catch (error) {
            toast.error("Network communication failure changing item status.");
            // Revert state change locally on exception
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === id ? { ...item, isPublished: !nextState } : item
                )
            );
        } finally {
            // Free processing locks
            setPublishingItemIds((prev) => prev.filter((itemId) => itemId !== id));
        }
    };

    const handleDeleteColorConfirm = async () => {
        if (!deleteColorTarget) return;

        try {
            const formData = new FormData();
            formData.append("itemId", String(deleteColorTarget.itemId));
            formData.append("colorId", String(deleteColorTarget.colorId));

            const data = await deleteColor(formData);

            if (data.success) {
                toast.success(data.message);
                await fetchData(page);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.error("Deletion Handler Processing Exception Error:", err);
            toast.error("Internal processing fault across communication runtime channels.");
        } finally {
            setDeleteColorTarget(null);
        }
    };

    const handleDeleteImageConfirm = async () => {
        if (!deleteImageTarget) return;

        try {
            const formData = new FormData();
            formData.append("itemId", String(deleteImageTarget.itemId));
            formData.append("imagePath", deleteImageTarget.imagePath);

            const data = await deleteImage(formData);

            if (data.success) {
                toast.success(data.message);
                await fetchData(page);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.error("Image Deletion Runtime Error:", err);
            toast.error("Pipeline failure while connecting to image disposal channel.");
        } finally {
            setDeleteImageTarget(null);
        }
    };

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
                <div className="max-w-[200px]">
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
            header: "Add Images",
            accessor: "",
            render: (item) => {
                const isMaxImagesReached = item.imagePaths.length >= 3;
                return (
                    <div>
                        <button
                            disabled={isMaxImagesReached}
                            onClick={() => {
                                setSelectedItem(item);
                                setImageModalOpen(true);
                            }}
                            className={`flex items-center gap-2 text-xs p-1 rounded border border-solid transition-colors ${isMaxImagesReached
                                ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                                : "border-primary text-primary hover:bg-primary/5 hover:text-primary/80"
                                }`}
                            title={isMaxImagesReached ? "Maximum gallery images (3) reached" : "Add images"}
                        >
                            <BiPlus className="h-4 w-4" />
                            <span>Add ({item.imagePaths.length}/3)</span>
                        </button>
                    </div>
                );
            },
        },
        {
            header: "Add Colors",
            accessor: "",
            render: (item) => (
                <div>
                    <button
                        onClick={() => {
                            setSelectedItem(item);
                            setColorModalOpen(true);
                        }}
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-xs p-1 rounded border-solid border-primary border"
                    >
                        <BiPlus className="h-4 w-4" />
                        Add
                    </button>
                </div>
            ),
        },
        {
            header: "Publish/Unpublish",
            accessor: "",
            render: (item) => {
                const isSwitchProcessing = publishingItemIds.includes(item.id);
                return (
                    <div className="flex items-center justify-start">
                        <label className="relative inline-flex items-center cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={!!item.isPublished}
                                disabled={isSwitchProcessing}
                                // Trigger intermediate tracking layout step instead of direct submission
                                onChange={() => handleToggleClick(item.id, !!item.isPublished)}
                                className="sr-only peer"
                            />
                            <div className={`w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500 ${isSwitchProcessing ? "opacity-50 pointer-events-none" : ""
                                }`} />
                        </label>
                    </div>
                );
            },
        },
        {
            header: "",
            accessor: "",
            render: (item) => (
                <div>
                    <button
                        onClick={() => {
                            setSelectedItem(item);
                            setEditModalOpen(true);
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
        <>
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
                            <h3 className="text-sm font-semibold mb-2">
                                Description
                            </h3>
                            <p className="text-sm">
                                {item.description}
                            </p>
                            <p className="text-sm mt-3">
                                {item.categoryInfo.name} <span className="text-muted-foreground">/</span> {item.subCategoryInfo.name} <span className="text-muted-foreground">/</span> {item.mainCategoryInfo.name}
                            </p>
                        </div>

                        <div className="space-y-2 text-sm">
                            {item.model && <div>
                                <span className="font-semibold">
                                    Model:
                                </span>{" "}
                                {item.model}
                            </div>}

                            {item.rating > 0 && <div>
                                <span className="font-semibold">
                                    Rating:
                                </span>{" "}
                                ⭐ {item.rating}
                            </div>}

                            {item.reviews > 0 && <div>
                                <span className="font-semibold">
                                    Reviews:
                                </span>{" "}
                                {item.reviews}
                            </div>}
                        </div>

                        {/* COLORS */}
                        {item.colors.length > 0 && (
                            <div className="flex flex-wrap gap-3">
                                {item.colors.length > 0 && (
                                    <div className="md:col-span-2">
                                        <h3 className="text-sm font-semibold mb-3">Colors</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {item.colors.map((color, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-2 border rounded-lg p-2 bg-white transition-all"
                                                >
                                                    <div
                                                        className="w-5 h-5 rounded-full border flex-shrink-0"
                                                        style={{ backgroundColor: color.hexCode }}
                                                    />
                                                    <span className="text-sm text-gray-700">{color.name}</span>
                                                    {color.imagePath && (
                                                        <div className="relative w-14 h-14 rounded-md overflow-hidden border ml-1">
                                                            <Image
                                                                src={color.imagePath}
                                                                alt={`color-image-${color.id}`}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    )}

                                                    <button
                                                        type="button"
                                                        onClick={() => setDeleteColorTarget({ itemId: item.id, colorId: color.id })}
                                                        className="text-gray-400 text-red-500 p-1 rounded-md bg-red-50 cursor-pointer"
                                                        title="Delete color variant"
                                                    >
                                                        <BiTrash className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* IMAGES */}
                        {item.imagePaths.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold mb-3">
                                    Item Images
                                </h3>

                                <div className="flex flex-wrap gap-3">
                                    {item.imagePaths.map((image, index) => (
                                        <div
                                            key={index}
                                            className="group relative w-24 h-24 rounded-lg overflow-hidden border bg-gray-50"
                                        >
                                            <Image
                                                src={image}
                                                alt={`product-image-${index}`}
                                                fill
                                                className="object-cover"
                                            />

                                            <div className="absolute top-1 right-1">
                                                <button
                                                    type="button"
                                                    onClick={() => setDeleteImageTarget({ itemId: item.id, imagePath: image })}
                                                    className="text-gray-400 text-red-500 p-1 rounded-md bg-red-50 cursor-pointer"
                                                    title="Delete this image"
                                                >
                                                    <BiTrash className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            />
            {imageModalOpen && selectedItem && (
                <AddImagesModal
                    isOpen={imageModalOpen}
                    onClose={() => {
                        setImageModalOpen(false);
                        setSelectedItem(null);
                    }}
                    item={selectedItem}
                    handleReload={fetchData}
                />
            )}
            {colorModalOpen && selectedItem && (
                <AddColorsModal
                    isOpen={colorModalOpen}
                    onClose={() => {
                        setColorModalOpen(false);
                        setSelectedItem(null);
                    }}
                    item={selectedItem}
                    handleReload={fetchData}
                />
            )}
            {editModalOpen && selectedItem && (
                <EditItemModal
                    isOpen={editModalOpen}
                    onClose={() => {
                        setEditModalOpen(false);
                        setSelectedItem(null);
                    }}
                    initialValues={selectedItem}
                    handleReload={fetchData}
                />
            )}
            <ConfirmModal
                isOpen={!!deleteColorTarget}
                onClose={() => setDeleteColorTarget(null)}
                onConfirm={handleDeleteColorConfirm}
                message="Are you sure you want to remove this color?"
            />
            <ConfirmModal
                isOpen={!!deleteImageTarget}
                onClose={() => setDeleteImageTarget(null)}
                onConfirm={handleDeleteImageConfirm}
                message="Are you sure you want to delete this gallery image?"
            />

            {/* New ConfirmModal instance handling the state toggle validation */}
            <ConfirmModal
                isOpen={!!publishTarget}
                onClose={() => setPublishTarget(null)}
                onConfirm={handleConfirmPublishToggle}
                message={
                    publishTarget?.nextState
                        ? "Are you sure you want to publish this item live to production?"
                        : "Are you sure you want to unpublish this item and revert it to a draft status?"
                }
            />
        </>
    );
};

export default ItemsTable;