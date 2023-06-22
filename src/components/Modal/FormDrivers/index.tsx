"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import AddButton from "../../Button/AddButton";
import api from "@/services/api";
import { useRequest } from "@/hooks/useRequest.hook";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 600,
  bgcolor: "#19212C",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FormDrivers() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const CreateDriverSchema = z.object({
    nome: z.string().nonempty("Campo obrigatório"),
    numeroHabilitacao: z.string().nonempty("Campo obrigatório"),
    categoriaHabilitacao: z.string().nonempty("Campo obrigatório"),
    vencimentoHabilitacao: z
      .string()
      .transform((str) => new Date(str).toISOString()),
  });

  type CreateDriverFormData = z.infer<typeof CreateDriverSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<CreateDriverFormData>({
    resolver: zodResolver(CreateDriverSchema),
  });

  const createDriver = async (
    driverData: CreateDriverFormData
  ): Promise<CreateDriverFormData> => {
    const { data } = await api.post("Condutor", driverData);
    await handleClose();
    return data;
  };

  const { onSubmit } = useRequest<CreateDriverFormData>(
    createDriver,
    "drivers"
  );

  return (
    <div>
      <AddButton onClick={handleOpen} />
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
            Novo condutor
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              {...register("nome")}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="nome"
              autoComplete="nome"
              variant="filled"
              autoFocus
            />
            <TextField
              {...register("numeroHabilitacao")}
              margin="normal"
              required
              fullWidth
              name="numeroHabilitacao"
              label="Habilitação"
              id="numeroHabilitacao"
              variant="filled"
              type="number"
            />
            <TextField
              {...register("categoriaHabilitacao")}
              margin="normal"
              required
              fullWidth
              name="categoriaHabilitacao"
              label="Categoria"
              id="categoriaHabilitacao"
              variant="filled"
            />
            <TextField
              {...register("vencimentoHabilitacao")}
              margin="normal"
              required
              fullWidth
              name="vencimentoHabilitacao"
              id="vencimentoHabilitacao"
              type="date"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
