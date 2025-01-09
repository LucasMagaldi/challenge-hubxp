import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography, CircularProgress, Grid, TextField, Button } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format, subDays } from "date-fns";
import { getSalesMetrics } from "../hooks/api-dashboard";
import { CardWrapper } from "../components/card-wrapper";

export function Home() {
    const [startDate, setStartDate] = useState(format(subDays(new Date(), 7), "yyyy-MM-dd"));
    const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));

    const { data: salesMetrics, isLoading, isError, refetch } = useQuery({
        queryKey: ["salesMetrics", { startDate, endDate }],
        queryFn: () => getSalesMetrics({ startDate, endDate }),
        keepPreviousData: true,
    });

    const handleApplyFilter = () => {
        refetch();
    };

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError || !salesMetrics) {
        return (
            <Box sx={{ textAlign: "center", marginTop: 4 }}>
                <Typography variant="h6" color="white">
                    No data available
                </Typography>
            </Box>
        );
    }
    console.log(salesMetrics)
    const salesData = salesMetrics.ordersByDate.map((entry) => ({
        date: entry._id,
        orders: entry.ordersPerDate,
    }));

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom color="white">
                KPIs Dashboard
            </Typography>

            <Box sx={{ display: "flex", gap: 2, marginBottom: 4, alignItems: "center" }}>
                <TextField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#ffffff" },
                            "&:hover fieldset": { borderColor: "#ffffff" },
                        },
                        "& .MuiInputBase-input": { color: "#ffffff" },
                        "& .MuiFormLabel-root": { color: "#ffffff" },
                    }}
                />
                <TextField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "#ffffff" },
                            "&:hover fieldset": { borderColor: "#ffffff" },
                        },
                        "& .MuiInputBase-input": { color: "#ffffff" },
                        "& .MuiFormLabel-root": { color: "#ffffff" },
                    }}
                />
                <Button variant="contained" onClick={handleApplyFilter}>
                    Apply
                </Button>
            </Box>
            <Grid container spacing={4} sx={{ marginBottom: 4 }}>
                <CardWrapper title="Total Orders" value={salesMetrics.totalOrders} />
                <CardWrapper title="Total Revenue" value={salesMetrics.totalRevenue.toFixed(2)} type="currency" />
                <CardWrapper title="Avg. Order Value" value={salesMetrics.averageOrderValue.toFixed(2)} type="currency" />
            </Grid>

            <Typography variant="h6" gutterBottom color="white">
                Orders Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                    <XAxis dataKey="date" stroke="#ffffff" tick={{ fill: "#ffffff" }} />
                    <YAxis stroke="#ffffff" tick={{ fill: "#ffffff" }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#1f1f1f",
                            color: "#ffffff",
                            border: "1px solid #8884d8",
                        }}
                        labelStyle={{ color: "#ffffff" }}
                    />
                    <Line type="monotone" dataKey="orders" stroke="#800080" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}
