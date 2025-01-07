import { Box, Stack, Typography } from "@mui/material";

export function Header() {
    return (
        <Box
            sx={{
                width: "100%",
                height: "64px",
                backgroundColor: "#1e293b",
                color: "white",
                display: "flex",
                alignItems: "center",
                position: "fixed",
                top: 0,
                paddingX: 4
            }}
        >
            <Stack direction="row" spacing={2} alignItems="center" width="100%">
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Minha Aplicação
                </Typography>
            </Stack>
        </Box>
    )
}