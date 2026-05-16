"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BiPlus, BiCheck, BiX, BiEditAlt } from "react-icons/bi";

import { addTrackingNumber, getOrders, updateOrderStatus } from "../admin.service";

import { TableProps } from "@/constants/types";
import CommonTable, { ColumnType } from "@/components/CommonTable";
import { OrderDataType } from "@/modules/cart/cart.types";
import { ConfirmModal } from "@/components/ConfirmModal";


const OrdersTable: React.FC<TableProps> = ({ reload }) => {
    const [orders, setOrders] = useState<OrderDataType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalRows, setTotalRows] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    // Modal state controllers
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<"STATUS" | "PAYMENT" | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<{ id: number; status?: string; isPaid?: boolean } | null>(null);

    // Inline Tracking Number States
    const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
    const [trackingInputValue, setTrackingInputValue] = useState<string>("");
    const [isTrackingSubmitting, setIsTrackingSubmitting] = useState<boolean>(false);

    const statusPriority = ["Pending", "Accepted", "Out for Delivery", "Delivered"];
    const allStatuses = ["Pending", "Accepted", "Out for Delivery", "Delivered", "Cancelled"];

    const fetchData = async (paramPage?: number) => {
        setIsLoading(true);
        try {
            const currentPage = paramPage || page;
            const response = await getOrders(currentPage, limit);

            if (response.success) {
                setOrders(response.orders);
                setTotalRows(response.totalOrders);
                setTotalPages(response.totalPages);
                setPage(currentPage);
            } else {
                setOrders([]);
                toast.error(response.message);
            }
        } catch {
            setOrders([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [reload, page]);

    // Triggers when status selection changes
    const handleStatusSelectChange = (orderId: number, nextStatus: string) => {
        setSelectedOrder({ id: orderId, status: nextStatus });
        setModalType("STATUS");
        setModalOpen(true);
    };

    // Triggers when payment badge is clicked
    const handlePaymentToggleClick = (orderId: number, currentPaidStatus: boolean) => {
        if (currentPaidStatus) {
            toast.info("Order is already marked as Paid.");
            return;
        }
        setSelectedOrder({ id: orderId, isPaid: true });
        setModalType("PAYMENT");
        setModalOpen(true);
    };

    // Unified dispatch handler for status/payment confirmations
    const handleConfirmUpdate = async () => {
        if (!selectedOrder) return;

        try {
            const response = await updateOrderStatus(
                selectedOrder.id,
                selectedOrder.status,
                selectedOrder.isPaid
            );

            if (response.success) {
                toast.success(response.message || "Order updated successfully!");
                await fetchData(page);
            } else {
                toast.error(response.message || "Failed to process update");
            }
        } catch (error) {
            console.error("Error updating order:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setModalOpen(false);
            setModalType(null);
            setSelectedOrder(null);
        }
    };

    // Initializes the inline input interaction field
    const startEditingTracking = (orderId: number, initialValue: string | null) => {
        setEditingOrderId(orderId);
        setTrackingInputValue(initialValue || "");
    };

    // Cleans up tracking interactive fields
    const cancelEditingTracking = () => {
        setEditingOrderId(null);
        setTrackingInputValue("");
    };

    // Saves the tracking number directly via API
    const handleSaveTracking = async (orderId: number) => {
        if (!trackingInputValue.trim()) {
            toast.error("Tracking number cannot be empty.");
            return;
        }

        setIsTrackingSubmitting(true);
        try {
            const response = await addTrackingNumber(orderId, trackingInputValue.trim());
            if (response.success) {
                toast.success(response.message);
                cancelEditingTracking();
                await fetchData(page); // Refresh list data to reflect variations
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Tracking update failed:", error);
            toast.error("An unexpected server error occurred");
        } finally {
            setIsTrackingSubmitting(false);
        }
    };

    // Columns structure
    const columns: ColumnType<OrderDataType>[] = [
        {
            header: "Order ID",
            accessor: "id",
            render: (item) => <span className="font-medium">#{item.id}</span>,
        },
        {
            header: "Customer",
            accessor: "customer.name",
            render: (item) => (
                <div>
                    <p className="font-medium text-gray-800">{item.customer?.name}</p>
                </div>
            ),
        },
        {
            header: "Payment",
            accessor: "isPaid",
            render: (item) => (
                <div className="flex flex-col gap-0.5">
                    <span
                        onClick={() => handlePaymentToggleClick(item.id, item.isPaid)}
                        className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 text-xs font-medium cursor-pointer transition-all hover:scale-105 ${item.isPaid
                            ? "bg-green-50 text-green-700 border border-green-200 cursor-not-allowed"
                            : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                            }`}
                        title={item.isPaid ? "Payment Complete" : "Click to mark as paid"}
                    >
                        {item.isPaid ? "Paid" : "Pending"}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1">
                        {item.paymentMethod}
                    </span>
                </div>
            ),
        },
        {
            header: "Status",
            accessor: "status",
            render: (item) => {
                const currentIdx = statusPriority.indexOf(item.status);
                const isTerminalState = item.status === "Delivered" || item.status === "Cancelled";

                if (isTerminalState) {
                    return (
                        <span className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium capitalize ${item.status === "Delivered" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
                            }`}>
                            {item.status}
                        </span>
                    );
                }

                return (
                    <select
                        value={item.status}
                        onChange={(e) => handleStatusSelectChange(item.id, e.target.value)}
                        className={`text-xs font-medium rounded-md border px-2 py-1 outline-none cursor-pointer capitalize shadow-sm ${item.status === "Accepted" || item.status === "Out for Delivery"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200 focus:ring-yellow-200"
                            : "bg-gray-50 text-gray-700 border-gray-200 focus:ring-gray-200"
                            }`}
                    >
                        {allStatuses.map((statusOption) => {
                            const optionIdx = statusPriority.indexOf(statusOption);
                            const isBackwardStep = statusOption !== "Cancelled" && optionIdx < currentIdx;

                            return (
                                <option
                                    key={statusOption}
                                    value={statusOption}
                                    disabled={isBackwardStep}
                                    className="text-gray-800 bg-white disabled:text-gray-300"
                                >
                                    {statusOption}
                                </option>
                            );
                        })}
                    </select>
                );
            },
        },
        {
            header: "Total Amount(Rs.)",
            accessor: "totalAmount",
            className: "text-right font-semibold",
            render: (item) => (
                <span>
                    {(item.totalAmount + item.deliveryFee).toFixed(2)}
                </span>
            ),
        },
        {
            header: "Tracking Number",
            accessor: "trackingNumber",
            render: (item) => {
                const isEditing = editingOrderId === item.id;
                const isOrderLocked = item.status === "Cancelled" || item.status === "Pending";

                // If currently editing this row's tracking number
                if (isEditing) {
                    return (
                        <div className="flex items-center gap-1 min-w-[140px]">
                            <input
                                type="text"
                                value={trackingInputValue}
                                onChange={(e) => setTrackingInputValue(e.target.value)}
                                disabled={isTrackingSubmitting}
                                className="w-full text-xs px-2 py-1 border border-primary rounded outline-none focus:ring-1 focus:ring-primary/30"
                                placeholder="Enter info..."
                                autoFocus
                            />
                            <button
                                onClick={() => handleSaveTracking(item.id)}
                                disabled={isTrackingSubmitting}
                                className="p-1 bg-green-50 border border-green-200 rounded text-green-600 hover:bg-green-100 disabled:opacity-50"
                                title="Save Tracking"
                            >
                                <BiCheck className="h-4 w-4" />
                            </button>
                            <button
                                onClick={cancelEditingTracking}
                                disabled={isTrackingSubmitting}
                                className="p-1 bg-gray-50 border border-gray-200 rounded text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                                title="Cancel"
                            >
                                <BiX className="h-4 w-4" />
                            </button>
                        </div>
                    );
                }

                // Default display layout state
                return (
                    <div className="flex items-center gap-2 group min-h-[28px]">
                        {item.trackingNumber ? (
                            <>
                                <span className="text-xs font-mono font-medium text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">
                                    {item.trackingNumber}
                                </span>
                                {!isOrderLocked && (
                                    <button
                                        onClick={() => startEditingTracking(item.id, item.trackingNumber)}
                                        className="text-gray-400 hover:text-primary p-0.5 rounded transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                        title="Edit Tracking Number"
                                    >
                                        <BiEditAlt className="h-4 w-4" />
                                    </button>
                                )}
                            </>
                        ) : (
                            <button
                                onClick={() => startEditingTracking(item.id, item.trackingNumber)}
                                disabled={isOrderLocked}
                                className={`flex items-center gap-1.5 text-xs p-1 px-2.5 rounded border border-solid transition-colors ${isOrderLocked
                                    ? "text-gray-300 border-gray-200 bg-gray-50 cursor-not-allowed"
                                    : "text-primary border-primary hover:bg-primary/5 bg-white"
                                    }`}
                                title={isOrderLocked ? `Cannot track orders marked as ${item.status}` : "Add tracking number"}
                            >
                                <BiPlus className="h-3.5 w-3.5" />
                                <span>Add</span>
                            </button>
                        )}
                    </div>
                );
            },
        },
    ];

    const renderExpandedRow = (order: OrderDataType) => {
        return (
            <div>
                <div className="mb-3 flex flex-col sm:flex-row justify-between gap-2 border-b border-gray-200 pb-2">
                    <div>
                        <h4 className="text-sm font-semibold">Shipping Address</h4>
                        <p className="text-xs mt-0.5">{order.customer?.address}</p>
                        <p className="text-xs">Tel: {order.customer?.phone}</p>
                    </div>
                    {order.note && (
                        <div className="max-w-xs">
                            <h4 className="text-sm font-semibold">Order Notes</h4>
                            <p className="text-xs italic mt-0.5">"{order.note}"</p>
                        </div>
                    )}
                </div>

                <h4 className="text-xs font-bold uppercase tracking-wider mb-2">Items Ordered</h4>
                <div className="divide-y divide-gray-100 rounded-md border border-gray-200 bg-white overflow-hidden">
                    {order.items?.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                                {item.mainImagePath ? (
                                    <img
                                        src={item.mainImagePath}
                                        alt={item.name}
                                        className="h-10 w-10 rounded-md border border-gray-200 object-cover bg-gray-50"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "https://placehold.co/40x40?text=Item";
                                        }}
                                    />
                                ) : (
                                    <div className="h-10 w-10 rounded-md border border-gray-200 bg-gray-100 flex items-center justify-center text-xs">
                                        No Image
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-medium">{item.name}</p>
                                    {item.color && (
                                        <p className="text-xs">
                                            Color: <span className="font-medium text-gray-700">{item.color}</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="text-right text-xs">
                                <p className="font-medium">
                                    {item.quantity} x Rs.{item.price.toFixed(2)}
                                </p>
                                <p className="mt-0.5">
                                    Rs.{(item.quantity * item.price).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-3 flex justify-end">
                    <div className="w-full max-w-[240px] space-y-1.5 text-xs pt-2">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span className="font-medium">Rs.{order.totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery Fee:</span>
                            <span className="font-medium">Rs.{order.deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold pt-1 border-t border-gray-200">
                            <span>Total:</span>
                            <span>Rs.{(order.totalAmount + order.deliveryFee).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <CommonTable
                columns={columns}
                data={orders}
                isLoading={isLoading}
                expandable={true}
                renderExpandedRow={renderExpandedRow}
                page={page}
                limit={limit}
                totalPages={totalPages}
                totalRows={totalRows}
                onPageChange={(newPage) => setPage(newPage)}
            />

            <ConfirmModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setModalType(null);
                    setSelectedOrder(null);
                }}
                onConfirm={handleConfirmUpdate}
                message={
                    modalType === "STATUS"
                        ? `Are you sure you want to update the status of Order #${selectedOrder?.id} to "${selectedOrder?.status}"?`
                        : `Are you sure you want to update the payment status of Order #${selectedOrder?.id} to "Paid"?`
                }
            />
        </>
    );
};

export default OrdersTable;