"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Image from "next/image";
import { Icon } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { Context } from "@/context/AuthContexts";
import { useContext, useEffect } from "react";
import TruckAnimation from "../TruckLoading";
import LogOutAlert from "../Modal/LogoutAlert";

const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
  window?: () => Window;
}

export default function Sidebar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { handleLogOut, authenticated } = useContext(Context);

  const router = useRouter();
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarItems = [
    {
      name: "Deslocamentos",
      icon: "route",
      href: "/deslocamentos",
      current: pathname.startsWith("/deslocamento") && true,
    },
    {
      name: "Condutores",
      icon: "person",
      href: "/condutores",
      current: pathname.startsWith("/condutor") && true,
    },
    {
      name: "Clientes",
      icon: "folder_shared",
      href: "/clientes",
      current: pathname.startsWith("/cliente") && true,
    },
    {
      name: "Veiculos",
      icon: "local_shipping",
      href: "/veiculos",
      current: pathname.startsWith("/veiculo") && true,
    },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Image
          src="/logo.png"
          className="mx-auto"
          width={140}
          height={98}
          alt="Logo sistema Intruck"
        />
      </Toolbar>
      <Divider />
      <List>
        {sidebarItems.map((item) => {
          return (
            <ListItem
              key={item.name}
              disablePadding
              onClick={() => router.push(item.href)}
            >
              <ListItemButton
                sx={{
                  color: "#fff",
                  ":hover": { backgroundColor: "#1e2535" },
                  backgroundColor: item.current ? "#1e2535" : "transparent",
                }}
              >
                <ListItemIcon>
                  <Icon color="primary">{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />

      <LogOutAlert name="logout" action={handleLogOut} />

      {/* <ListItem disablePadding>
        <ListItemButton
          sx={{ color: "#fff", ":hover": { backgroundColor: "#1e2535" } }}
          onClick={() => handleLogOut()}
        >
          <ListItemIcon>
            <Icon color="primary">logout</Icon>
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar className="bg-dark h-24">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Painel de Controle
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#19212C",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#19212C",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {props.children}
    </Box>
  );
}
