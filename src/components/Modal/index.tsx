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

import AddButton from "../Button/AddButton";

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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const CreateConsumerSchema = z.object({
    nome: z.string().nonempty("Campo obrigatório"),
    numeroHabilitacao: z.string().nonempty("Campo obrigatório"),
    categoriaHabilitacao: z.string().nonempty("Campo obrigatório"),
    vencimentoHabilitacao: z
      .string()
      .transform((str) => new Date(str).toISOString()),
  });

  type CreateConsumerFormData = z.infer<typeof CreateConsumerSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<CreateConsumerFormData>({
    resolver: zodResolver(CreateConsumerSchema),
  });

  async function createConsumer(data: CreateConsumerFormData) {
    console.log(data);
  }

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
            Novo
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(createConsumer)}
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
              id="categoriaHabilitacao"
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
