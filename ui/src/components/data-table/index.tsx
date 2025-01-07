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

interface IPros<T extends Record<string, React.ReactNode>> {
    columns: Array<{ key: keyof T; label: string; isAction?: boolean }>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
    onEdit?: (row: T) => void
    onRemove?: (row: T) => void
}

export function DataTable<T extends Record<string, React.ReactNode>>({
    columns,
    data,
    onEdit,
    onRemove,
}: IPros<T>) {

    if (!data || !data.length) {
        return (
            <Typography sx={{ color: "#E5E7EB", textAlign: "center", marginTop: 2 }}>
                No data available
            </Typography>
        );
    }
    return (
        <TableContainer component={Paper} sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={String(column.key)}
                                sx={{ color: "#9CA3AF", fontWeight: "bold" }}
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
                                <TableCell key={String(column.key)} sx={{ color: "#E5E7EB" }}>
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
