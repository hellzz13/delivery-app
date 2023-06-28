"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { Grid, Icon } from "@mui/material";
import api, { remove, update } from "@/services/api";
import { useRouter } from "next/navigation";
import { style } from "./style";
import { useCallback } from "react";
import { toast } from "react-toastify";
import ToastNotification from "@/components/ToastNotification";

interface IDoneDelivery {
  name: string;
  id: string;
}

export default function DoneDelivery({ id, name }: IDoneDelivery) {
  const [open, setOpen] = React.useState(false);
  const { back } = useRouter();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdate = useCallback(async () => {
    const values = {
      id: id,
      fimDeslocamento: new Date().toISOString(),
      kmFinal: 2000000000,
    };

    await api.put(`Deslocamento/${id}/EncerrarDeslocamento`, values);
    await toast.success("Concluido com sucesso!");
    await back();
  }, [back, id]);
  return (
    <span>
      <Button
        variant="contained"
        color="success"
        onClick={handleOpen}
        sx={{ marginTop: "10px" }}
        fullWidth
      >
        <Icon>check</Icon>
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
            Tem certeza que concluir este deslocamento?
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
                  onClick={handleUpdate}
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
