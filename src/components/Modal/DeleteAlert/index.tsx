"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { Grid } from "@mui/material";
import { remove } from "@/services/api";
import { useRouter } from "next/navigation";
import { style } from "./style";

interface IDeleteAlert {
  name: string;
  id: string;
  remove: (id: string, urlRoute: string) => Promise<void>;
  urlRoute: string;
}

export default function DeleteAlert({
  id,
  remove,
  name,
  urlRoute,
}: IDeleteAlert) {
  const [open, setOpen] = React.useState(false);
  const { back } = useRouter();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function handleRemoveItem(): Promise<void> {
    await remove(id, urlRoute);
    back();
  }

  return (
    <span>
      <Button
        variant="contained"
        color="error"
        onClick={handleOpen}
        sx={{ marginTop: "10px" }}
        fullWidth
      >
        {name}
      </Button>

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
            Tem certeza que deseja excluir?
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
                  onClick={handleRemoveItem}
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
    </span>
  );
}
