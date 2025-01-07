import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Sidebar } from "../components/sidebar";


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
        <Outlet />
    </Box>
  );
}
