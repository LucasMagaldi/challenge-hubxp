import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
} from "@mui/material";
import { PopUp } from "../popup";

interface IPros<T extends Record<string, React.ReactNode>> {
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
}: IPros<T>) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<T | null>(null);

    const handleEditClick = (row: T) => {
        setSelectedRow(row);
        setModalOpen(true);
    };

    const handleSave = (updatedData: Record<string, any>) => {
        if (onEdit && selectedRow) {
            onEdit({ ...selectedRow, ...updatedData }); // Atualiza os dados com o que foi enviado
        }
        setModalOpen(false);
    };

    if (!data || !data.length) {
        return (
            <Typography sx={{ color: "#E5E7EB", textAlign: "center", marginTop: 2 }}>
                No data available
            </Typography>
        );
    }

    const generateFields = (row: T) => {
        return columns
            .filter((column) => !column.isAction)
            .map((column) => ({
                name: String(column.key),
                label: column.label,
                value: row[column.key] || "", // inicializa os valor
            }));
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={String(column.key)} sx={{ color: "#9CA3AF", fontWeight: "bold" }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {columns.map((column) => (
                                    <TableCell key={String(column.key)} sx={{ color: "#E5E7EB" }}>
                                        {column.isAction ? (
                                            column.key === "edit" ? (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handleEditClick(row)}
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
            {selectedRow && (
                <PopUp
                    open={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    title="Edit Row"
                    fields={generateFields(selectedRow)}
                    onSave={handleSave}
                />
            )}
        </>
    );
}
