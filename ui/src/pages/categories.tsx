import { Box, Button, Typography } from "@mui/material";
import { PlusCircle } from "lucide-react";
import { DataTable } from "../components/data-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories, removeCategory, updateCategory } from "../hooks/api-categories";

const columns = [
    { key: "name", label: "Category name" },
    { key: "edit", label: "Edit", isAction: true },
    { key: "remove", label: "Remove", isAction: true },
];

export function Categories() {
    const queryClient = useQueryClient()
    const { data: orders } = useQuery({
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

    const handleEdit = (row: any) => {
        updateCategoryFn(row);
    };

    const handleRemove = (row: any) => {
        removeCategoryFn(row._id);
    }
    return (
        <Box
            sx={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                backdropFilter: "blur(10px)",
                borderRadius: 2,
                boxShadow: 3,
                padding: 3,
                border: "1px solid #334155",
            }}
            >
            <Box
                sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 3,
                }}
            >
                <Typography variant="h6" color="white">
                Categories List
                </Typography>
                <Box sx={{ position: "relative" }}>
                    <Button 
                        sx={{
                            backgroundColor:"#036316",
                            color:"white",
                            paddingX: 2,
                            display:"flex",
                            gap: 1
                        }}
                    > 
                        Create 
                        <PlusCircle />
                    </Button>
                </Box>
            </Box>

            <DataTable columns={columns} data={orders} onEdit={handleEdit} onRemove={handleRemove}/>
        </Box>
    )
}