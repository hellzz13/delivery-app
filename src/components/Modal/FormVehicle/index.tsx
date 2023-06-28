"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress, TextField } from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import AddButton from "../../Button/AddButton";
import api from "@/services/api";
import { useRequest } from "@/hooks/useRequest.hook";
import ReactInputMask from "react-input-mask";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 400,
  bgcolor: "#19212C",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FormVehicles() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const CreateVehicleSchema = z.object({
    placa: z.string().nonempty("Campo obrigatório"),
    marcaModelo: z.string().nonempty("Campo obrigatório"),
    anoFabricacao: z
      .string()
      .nonempty("Campo obrigatório")
      .transform((str) => Number(str)),
    kmAtual: z
      .string()
      .nonempty("Campo obrigatório")
      .transform((str) => Number(str)),
  });

  type CreateVehicleFormData = z.infer<typeof CreateVehicleSchema>;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateVehicleFormData>({
    resolver: zodResolver(CreateVehicleSchema),
  });

  const createVehicle = async (
    vehicleData: CreateVehicleFormData
  ): Promise<CreateVehicleFormData> => {
    const { data } = await api.post("Veiculo", vehicleData);
    await handleClose();
    reset({});
    return data;
  };

  const { onSubmit, isLoading } = useRequest<CreateVehicleFormData>(
    createVehicle,
    "vehicles"
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
            Novo veículo
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <Controller
              name="placa"
              control={control}
              render={({ field }) => (
                <ReactInputMask mask="aaa-9*99" {...field} disabled={false}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="placa"
                    label="Placa"
                    name="placa"
                    autoComplete="placa"
                    variant="filled"
                  />
                </ReactInputMask>
              )}
            />

            {errors.placa && (
              <span className="text-red-error text-sm">
                {errors.placa.message}
              </span>
            )}
            <TextField
              {...register("marcaModelo")}
              margin="normal"
              required
              fullWidth
              name="marcaModelo"
              label="Modelo"
              id="marcaModelo"
              variant="filled"
            />
            {errors.marcaModelo && (
              <span className="text-red-error text-sm">
                {errors.marcaModelo.message}
              </span>
            )}

            <Controller
              name="anoFabricacao"
              control={control}
              render={({ field }) => (
                <ReactInputMask mask="9999" {...field} disabled={false}>
                  <TextField
                    required
                    fullWidth
                    name="anoFabricacao"
                    label="Ano de fabricação"
                    id="anoFabricacao"
                    variant="filled"
                  />
                </ReactInputMask>
              )}
            />
            {errors.anoFabricacao && (
              <span className="text-red-error text-sm">
                {errors.anoFabricacao.message}
              </span>
            )}

            <Controller
              name="kmAtual"
              control={control}
              render={({ field }) => (
                <ReactInputMask mask="99999999" {...field} disabled={false}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="kmAtual"
                    label="Km Atual"
                    id="kmAtual"
                    variant="filled"
                  />
                </ReactInputMask>
              )}
            />

            {errors.kmAtual && (
              <span className="text-red-error text-sm">
                {errors.kmAtual.message}
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
