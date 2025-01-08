import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from "@mui/material";

interface DataTableProps<T extends Record<string, React.ReactNode>> {
    columns: Array<{ key: keyof T; label: string; isAction?: boolean }>;
    data: T[];
    onEdit?: (row: T) => void;
    onRemove?: (row: T) => void;
}

export function DataTable<T extends Record<string, React.ReactNode>>({
    columns,
    data,
    onEdit,
    onRemove,
}: DataTableProps<T>) {
    return (
        <TableContainer component={Paper} sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={String(column.key)}
                                sx={{ color: "white", fontWeight: "bold" }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((column) => (
                                <TableCell
                                    key={String(column.key)}
                                    sx={{ color: "white" }}
                                >
                                    {column.isAction ? (
                                        column.key === "edit" ? (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={() => onEdit && onEdit(row)}
                                            >
                                                Edit
                                            </Button>
                                        ) : column.key === "remove" ? (
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                onClick={() => onRemove && onRemove(row)}
                                            >
                                                Remove
                                            </Button>
                                        ) : null
                                    ) : (
                                        row[column.key]
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
