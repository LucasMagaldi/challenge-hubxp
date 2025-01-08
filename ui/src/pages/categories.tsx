import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BaseList } from "../components/base-list";
import { createCategory, getCategories, IGetCategories, removeCategory, updateCategory } from "../hooks/api-categories";
import { z } from "zod";

const columns = [
    { key: "name", label: "Category Name" },
    { key: "edit", label: "Edit", isAction: true },
    { key: "remove", label: "Remove", isAction: true },
];

const categorySchema = z.object({
    name: z.string().min(1, "Category name is required"),
});

export function Categories() {
    const queryClient = useQueryClient();

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const { mutateAsync: updateCategoryFn } = useMutation({
        mutationFn: updateCategory,
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"]);
        },
    });

    const { mutateAsync: removeCategoryFn } = useMutation({
        mutationFn: removeCategory,
        onError: (error) => {
            console.error("Error removing category:", error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"]);
        },
    });

    const { mutateAsync: createCategoryFn } = useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"]);
        },
    });

    return (
        <BaseList<IGetCategories>
            title="Category List"
            columns={columns}
            fetchData={categories || []}
            validationSchema={categorySchema}
            editMutation={updateCategoryFn}
            removeMutation={removeCategoryFn}
            addMutation={createCategoryFn}
        />
    );
}
