import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Sidebar } from "../components/sidebar";
import { Header } from "../components/header";


export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Box 
        display="flex"
        sx={{
            background: "linear-gradient(to bottom right, #1f2937, #3958a2)",
        }}
    >
      <Sidebar isSidebarOpen={isSidebarOpen} handleOpenSidebar={setIsSidebarOpen} />
      <Box
            sx={{
            flex: 1,
            transition: "margin-left 0.3s ease",
            display: "flex",
            flexDirection: "row",
            overflow: "auto", 
            alignContent: "center"
            }}
        >
            <Header />
            <Box sx={{ padding: 3, flex: 1, marginTop: "60px", marginRight: "auto" }}>
                <Outlet />
            </Box>
        </Box>
    </Box>
  );
}
