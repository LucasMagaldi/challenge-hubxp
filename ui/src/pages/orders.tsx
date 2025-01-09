import { format, parseISO } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BaseList } from "../components/base-list";
import { createOrder, getOrders, IGetOrders, removeOrder, updateOrder } from "../hooks/api-orders";
import { z } from "zod";

const columns = [
    { key: "total", label: "Total" },
    { key: "products", label: "Products" },
    { key: "date", label: "Order Date" },
    { key: "edit", label: "Edit", isAction: true },
    { key: "remove", label: "Remove", isAction: true },
];

const orderSchema = z.object({
    total: z.coerce.number().min(0, "Total must be a positive number"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

export function Orders() {
    const queryClient = useQueryClient();

    const { data: orders } = useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
    });

    const processedOrders = (orders || []).map((order) => ({
        ...order,
        products: Array.isArray(order.products)
            ? order.products.map((product) => product.name).join(", ")
            : order.products,
        date: format(parseISO(order.date), "yyyy-MM-dd"), // Format date
    }));

    const { mutateAsync: createOrderFn } = useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
        },
    });

    const { mutateAsync: updateOrderFn } = useMutation({
        mutationFn: updateOrder,
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
        },
    });

    const { mutateAsync: removeOrderFn } = useMutation({
        mutationFn: removeOrder,
        onError: (error) => {
            console.error("Error removing order:", error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
        },
    });

    return (
        <BaseList<IGetOrders>
            title="Order List"
            columns={columns}
            fetchData={processedOrders}
            validationSchema={orderSchema}
            removeMutation={removeOrderFn}
            editMutation={updateOrderFn}
            addMutation={createOrderFn}
        />
    );
}
