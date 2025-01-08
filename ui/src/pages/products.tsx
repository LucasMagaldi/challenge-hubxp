import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, getProducts, IGetProducts, removeProduct } from "../hooks/api-products";
import { BaseList } from "../components/base-list";

const columns = [
    { key: "name", label: "Product name" },
    { key: "description", label: "Product Description" },
    { key: "price", label: "Price" },
    { key: "categories", label: "Categories" },
    { key: "edit", label: "Edit", isAction: true },
    { key: "remove", label: "Remove", isAction: true },
];

export function Products() {
    const queryClient = useQueryClient();
    const { data: products } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    const { mutateAsync: createProductFn } = useMutation({
        mutationFn: createProduct,
        onError: (error) => {
            console.error('Error removing product:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
    });

    const { mutateAsync: removeProductFn } = useMutation({
        mutationFn: removeProduct,
        onError: (error) => {
            console.error('Error removing product:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
    });


    return (
        <BaseList<IGetProducts>
            title="Product list"
            columns={columns}
            fetchData={products}
            removeMutation={removeProductFn}
            addMutation={createProductFn}
        />
    );
}
