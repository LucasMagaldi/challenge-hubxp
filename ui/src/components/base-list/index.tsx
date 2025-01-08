import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { PlusCircle } from "lucide-react";
import { DataTable } from "../data-table";
import { PopUp } from "../popup";

interface BaseListProps<T> {
    title: string;
    columns: Array<{ key: keyof T; label: string; isAction?: boolean }>;
    fetchData: T[];
    addMutation?: (item: T) => Promise<void>;
    editMutation?: (item: T) => Promise<void>;
    removeMutation?: (id: string) => Promise<void>;
}

export function BaseList<T>({
    title,
    columns,
    fetchData,
    addMutation,
    editMutation,
    removeMutation,
}: BaseListProps<T>) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"add" | "edit">("add");
    const [selectedRow, setSelectedRow] = useState<Partial<T> | null>(null);
    const [fields, setFields] = useState<any[]>([]);

    const handleOpenModal = (type: "add" | "edit", row?: T) => {
        setModalType(type);

        const initialRow = type === "add"
            ? columns.reduce((acc, col) => ({ ...acc, [col.key]: "" }), {})
            : row || null;

        setSelectedRow(initialRow);

        const dynamicFields = columns
            .filter((col) => !col.isAction)
            .map((col) => ({
                name: String(col.key),
                label: col.label,
                value: initialRow ? initialRow[col.key] : "",
                onChange: (value: any) => {
                    console.log(value)
                    setSelectedRow((prev) => (prev ? { ...prev, [col.key]: value } : prev));
                },
            }));

        setFields(dynamicFields);
        setModalOpen(true);
    };

    const handleSave = async () => {
        if (!selectedRow) return;

        try {
            if (modalType === "edit") {
                await editMutation?.(selectedRow as T);
            } else {
                await addMutation?.(selectedRow as T);
            }
        } catch (error) {
            console.error("Error saving item:", error);
        }

        setModalOpen(false);
    };

    const handleRemove = async (id: string) => {
        try {
            await removeMutation?.(id);
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

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
                    {title}
                </Typography>
                <Button
                    sx={{
                        backgroundColor: "#036316",
                        color: "white",
                        paddingX: 2,
                        display: "flex",
                        gap: 1,
                    }}
                    onClick={() => handleOpenModal("add")}
                >
                    Create
                    <PlusCircle />
                </Button>
            </Box>

            <DataTable
                columns={columns}
                data={fetchData}
                onEdit={(row) => handleOpenModal("edit", row)}
                onRemove={(row) => handleRemove((row as any)._id)}
            />

            {isModalOpen && (
                <PopUp
                    open={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    fields={fields}
                    onSave={handleSave}
                    title={modalType === "edit" ? `Edit ${title}` : `Add ${title}`}
                />
            )}
        </Box>
    );
}
