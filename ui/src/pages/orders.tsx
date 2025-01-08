import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BaseList } from "../components/base-list";
import { createOrder, getOrders, IGetOrders, removeOrder } from "../hooks/api-orders";

const columns = [
    { key: "total", label: "Total" },
    { key: "products", label: "Products" },
    { key: "Date", label: "Order Date" },
    { key: "edit", label: "Edit", isAction: true },
    { key: "remove", label: "Remove", isAction: true },
];

export function Orders() {
    const queryClient = useQueryClient();
    const { data: orders } = useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
    });

    const processedOrders = (orders || []).map((order) => ({
        ...order,
        products: Array.isArray(order.products)
            ? order.products.map((product) => product.name).join(", ") // string
            : order.products,
    }));


    const { mutateAsync: createOrderFn } = useMutation({
        mutationFn: createOrder,
        onError: (error) => {
            console.error('Error removing order:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['orders']);
        },
    });

    const { mutateAsync: removeOrderFn } = useMutation({
        mutationFn: removeOrder,
        onError: (error) => {
            console.error('Error removing order:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['orders']);
        },
    });


    return (
        <BaseList<IGetOrders>
            title="Order list"
            columns={columns}
            fetchData={processedOrders}
            removeMutation={removeOrderFn}
            addMutation={createOrderFn}
        />
    );
}
