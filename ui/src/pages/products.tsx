import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { BaseList } from "../components/base-list";
import { getProducts, createProduct, removeProduct, IGetProducts, updateProduct } from "../hooks/api-products";
const columns=[
    { key: "name", label: "Product Name" },
    { key: "description", label: "Description" },
    { key: "price", label: "Price" },
    { key: "categories", label: "Categories" },
    { key: "edit", label: "Edit", isAction: true },
    { key: "remove", label: "Remove", isAction: true },
]

const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(5, "Description should have at least 5 characters"),
    price: z.coerce.number().min(0, "Price must be a positive number"),
    categories: z.string().optional(),
});

export function Products() {
    const queryClient = useQueryClient();
    const { data: products } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    const processedProducts = (products || []).map((product) => ({
        ...product,
        categories: Array.isArray(product.categories)
            ? product.categories.map((cat) => cat.name).join(", ") // Transforma em string
            : product.categories,
    }));


    const { mutateAsync: createProductFn } = useMutation({
        mutationFn: createProduct,
        onError: (error) => {
            console.error('Error removing product:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
    });

    const { mutateAsync: updateProductFn } = useMutation({
        mutationFn: updateProduct,
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
            fetchData={processedProducts}
            addMutation={createProductFn}
            editMutation={updateProductFn}
            removeMutation={removeProductFn}
            validationSchema={productSchema}
        />
    );
}
