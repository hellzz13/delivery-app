"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import {
  Grid,
  Icon,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { style } from "./style";

interface ILogOutAlert {
  name: string;
  action: () => void;
}

export default function LogOutAlert({ action, name }: ILogOutAlert) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function handleLogOut(): Promise<void> {
    await action();
  }

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          sx={{ color: "#fff", ":hover": { backgroundColor: "#1e2535" } }}
          onClick={handleOpen}
        >
          <ListItemIcon>
            <Icon color="primary">{name}</Icon>
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="white"
          >
            Tem certeza que sair?
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Grid
              container
              paddingTop={2}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              justifyContent="flex-end"
            >
              <Grid item xs={2} sm={4} md={4}>
                <Button
                  color="error"
                  variant="contained"
                  onClick={handleClose}
                  sx={{ marginTop: "10px" }}
                  fullWidth
                >
                  Não
                </Button>
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <Button
                  color="success"
                  variant="contained"
                  onClick={handleLogOut}
                  sx={{ marginTop: "10px" }}
                  fullWidth
                >
                  Sim
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
