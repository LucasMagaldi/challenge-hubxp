import { Box, Button, Typography } from "@mui/material";
import { PlusCircle } from "lucide-react";
import { DataTable } from "../components/data-table";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../hooks/api-categories";


  
const columns = [
    { key: "name", label: "Category name" },
];

export function Categories() {

    const { data: getOrdersFn } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories(),
    })

    console.log(getOrdersFn)

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
                Order List
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

            <DataTable columns={columns} data={getOrdersFn}/>
        </Box>
    )
}