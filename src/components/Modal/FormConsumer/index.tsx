"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress, Grid, TextField } from "@mui/material";

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

export default function FormConsumers() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const CreateConsumerSchema = z.object({
    nome: z.string().nonempty("Campo obrigatório"),
    numeroDocumento: z.string().nonempty("Campo obrigatório"),
    tipoDocumento: z.string().nonempty("Campo obrigatório"),
    logradouro: z.string().nonempty("Campo obrigatório"),
    numero: z.string().nonempty("Campo obrigatório"),
    bairro: z.string().nonempty("Campo obrigatório"),
    cidade: z.string().nonempty("Campo obrigatório"),
    uf: z.string().nonempty("Campo obrigatório"),
  });

  type CreateConsumerFormData = z.infer<typeof CreateConsumerSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<CreateConsumerFormData>({
    resolver: zodResolver(CreateConsumerSchema),
  });

  const createConsumer = async (
    consumerData: CreateConsumerFormData
  ): Promise<CreateConsumerFormData> => {
    const { data } = await api.post("Cliente", consumerData);
    await handleClose();
    reset({});
    return data;
  };

  const { onSubmit, isLoading } = useRequest<CreateConsumerFormData>(
    createConsumer,
    "consumers"
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
            Novo cliente
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <Grid
              container
              paddingTop={2}
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item sm={12} md={12}>
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
                {errors.nome && (
                  <span className="text-red-error text-sm">
                    {errors.nome.message}
                  </span>
                )}
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  {...register("numeroDocumento")}
                  margin="normal"
                  required
                  fullWidth
                  name="numeroDocumento"
                  label="Documento"
                  id="numeroDocumento"
                  variant="filled"
                />
                {errors.numeroDocumento && (
                  <span className="text-red-error text-sm">
                    {errors.numeroDocumento.message}
                  </span>
                )}
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  {...register("tipoDocumento")}
                  margin="normal"
                  required
                  fullWidth
                  name="tipoDocumento"
                  label="Tipo de documentos"
                  id="tipoDocumento"
                  variant="filled"
                />
                {errors.tipoDocumento && (
                  <span className="text-red-error text-sm">
                    {errors.tipoDocumento.message}
                  </span>
                )}
              </Grid>
              <Grid item sm={12} md={8}>
                <TextField
                  {...register("logradouro")}
                  margin="normal"
                  required
                  fullWidth
                  name="logradouro"
                  label="Rua"
                  id="logradouro"
                  variant="filled"
                />
                {errors.logradouro && (
                  <span className="text-red-error text-sm">
                    {errors.logradouro.message}
                  </span>
                )}
              </Grid>
              <Grid item sm={12} md={4}>
                <TextField
                  {...register("numero")}
                  margin="normal"
                  required
                  fullWidth
                  name="numero"
                  label="Numero"
                  id="numero"
                  type="number"
                  variant="filled"
                />
                {errors.numero && (
                  <span className="text-red-error text-sm">
                    {errors.numero.message}
                  </span>
                )}
              </Grid>
              <Grid item sm={12} md={4}>
                <TextField
                  {...register("bairro")}
                  margin="normal"
                  required
                  fullWidth
                  name="bairro"
                  label="Bairro"
                  id="bairro"
                  variant="filled"
                />
                {errors.bairro && (
                  <span className="text-red-error text-sm">
                    {errors.bairro.message}
                  </span>
                )}
              </Grid>
              <Grid item sm={12} md={4}>
                <TextField
                  {...register("cidade")}
                  margin="normal"
                  required
                  fullWidth
                  name="cidade"
                  label="Cidade"
                  id="cidade"
                  variant="filled"
                />
                {errors.cidade && (
                  <span className="text-red-error text-sm">
                    {errors.cidade.message}
                  </span>
                )}
              </Grid>
              <Grid item sm={12} md={4}>
                <TextField
                  {...register("uf")}
                  margin="normal"
                  required
                  fullWidth
                  name="uf"
                  label="UF"
                  id="uf"
                  variant="filled"
                />
                {errors.uf && (
                  <span className="text-red-error text-sm">
                    {errors.uf.message}
                  </span>
                )}
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoading ? <CircularProgress /> : "Cadastrar"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
