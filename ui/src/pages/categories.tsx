import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, getCategories, IGetCategories, removeCategory, updateCategory, UpdateCategoryProps } from "../hooks/api-categories";
import { BaseList } from "../components/base-list";

const columns = [
    { key: "name", label: "Category name" },
    { key: "edit", label: "Edit", isAction: true },
    { key: "remove", label: "Remove", isAction: true },
];

export function Categories() {
    const queryClient = useQueryClient()
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
    })

    const { mutateAsync: updateCategoryFn } = useMutation({
        mutationFn: updateCategory,
        onSuccess: () => {
        queryClient.invalidateQueries(['categories']);
        },
    });

    const { mutateAsync: removeCategoryFn } = useMutation({
        mutationFn: removeCategory,
        onError: (error) => {
            console.error('Error removing category:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
        },
    });

    const { mutateAsync: createCategoryFn} = useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
        }
    })

    return (
        <BaseList<IGetCategories>
            title="Categories list"
            columns={columns}
            fetchData={categories}
            editMutation={updateCategoryFn}
            removeMutation={removeCategoryFn}
            addMutation={createCategoryFn}
        />
    )
}