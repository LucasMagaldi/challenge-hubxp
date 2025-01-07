import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
import {
  Menu,
  BarChart2,
  ShoppingBag,
  Users,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  { name: "Dashboard", icon: BarChart2, color: "#6366f1", href: "/" },
  { name: "Products", icon: ShoppingBag, color: "#8B5CF6", href: "/products" },
  { name: "Categories", icon: Users, color: "#EC4899", href: "/users" },
  { name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },

];

interface IProps {
  handleOpenSidebar: (open: boolean) => void;
  isSidebarOpen: boolean;
}

export function Sidebar({ isSidebarOpen, handleOpenSidebar }: IProps) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: isSidebarOpen ? 256 : 80,
        backgroundColor: "#1e293b",
        borderRight: "1px solid #334155",
        color: "white",
        overflow: "hidden",
        transition: "width 0.3s ease",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isSidebarOpen ? "space-between" : "center",
          padding: "16px",
          borderBottom: "1px solid #334155",
        }}
      >
        {isSidebarOpen && <Typography fontWeight={700}>HUBXP-CHALLENGE</Typography>}
        <IconButton
          onClick={() => handleOpenSidebar(!isSidebarOpen)}
          sx={{
            color: "white",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
          }}
        >
          <Menu size={24} />
        </IconButton>
      </Box>

      <List sx={{ padding: 0 }}>
        {SIDEBAR_ITEMS.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                transition: "background-color 0.2s ease",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
              {isSidebarOpen && (
                <Typography
                  sx={{
                    marginLeft: "16px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name}
                </Typography>
              )}
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
}
