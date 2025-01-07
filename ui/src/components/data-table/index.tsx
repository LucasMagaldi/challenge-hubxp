import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
  
  interface IPros<T extends Record<string, React.ReactNode>> {
    columns: Array<{ key: keyof T; label: string }>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
  }
  
  export function DataTable<T extends Record<string, React.ReactNode>>({ columns, data }: IPros<T>) {
    return (
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
                      {row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </TableContainer>
    );
  }