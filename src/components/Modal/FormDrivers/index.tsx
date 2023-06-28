"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  TextField,
  TextFieldProps,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import AddButton from "../../Button/AddButton";
import api from "@/services/api";
import { useRequest } from "@/hooks/useRequest.hook";
import { useCallback } from "react";

import ReactInputMask from "react-input-mask";

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
    vencimentoHabilitacao: z.string().transform((str) => {
      return str && new Date(str).toISOString();
    }),
  });

  type CreateDriverFormData = z.infer<typeof CreateDriverSchema>;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateDriverFormData>({
    resolver: zodResolver(CreateDriverSchema),
  });

  const createDriver = useCallback(
    async (driverData: CreateDriverFormData): Promise<CreateDriverFormData> => {
      const { data } = await api.post("Condutor", driverData);
      await handleClose();
      reset({});
      return data;
    },
    [reset]
  );

  const { onSubmit, isLoading } = useRequest<CreateDriverFormData>(
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
        sx={{ overflow: "auto" }}
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
            <Controller
              name="nome"
              control={control}
              render={({ field }) => (
                <ReactInputMask mask="" {...field} disabled={false}>
                  <TextField
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
                </ReactInputMask>
              )}
            />
            {errors.nome && (
              <span className="text-red-error text-sm">
                {errors.nome.message}
              </span>
            )}

            <Controller
              name="numeroHabilitacao"
              control={control}
              render={({ field }) => (
                <ReactInputMask mask="99999999999" {...field} disabled={false}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="numeroHabilitacao"
                    label="Habilicação"
                    name="numeroHabilitacao"
                    autoComplete="numeroHabilitacao"
                    variant="filled"
                  />
                </ReactInputMask>
              )}
            />
            {errors.nome && (
              <span className="text-red-error text-sm">
                {errors.nome.message}
              </span>
            )}
            {errors.numeroHabilitacao && (
              <span className="text-red-error text-sm">
                {errors.numeroHabilitacao.message}
              </span>
            )}
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
            {errors.categoriaHabilitacao && (
              <span className="text-red-error text-sm">
                {errors.categoriaHabilitacao.message}
              </span>
            )}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Inicio deslocamento
              </InputLabel>

              <TextField
                {...register("vencimentoHabilitacao")}
                margin="normal"
                required
                fullWidth
                name="vencimentoHabilitacao"
                id="vencimentoHabilitacao"
                type="date"
                variant="filled"
              />
            </FormControl>
            {errors.vencimentoHabilitacao && (
              <span className="text-red-error text-sm">
                {errors.vencimentoHabilitacao.message}
              </span>
            )}

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
