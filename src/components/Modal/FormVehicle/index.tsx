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
    setValue,
    reset,
    formState: { errors, isDirty },
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

  const { onSubmit } = useRequest<CreateVehicleFormData>(
    createVehicle,
    "vehicles"
  );

  console.log(errors);

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
            <TextField
              {...register("placa")}
              margin="normal"
              required
              fullWidth
              id="placa"
              label="Placa"
              name="placa"
              autoComplete="placa"
              variant="filled"
              autoFocus
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

            <TextField
              {...register("anoFabricacao")}
              margin="normal"
              required
              fullWidth
              name="anoFabricacao"
              label="Ano de fabricação"
              id="anoFabricacao"
              variant="filled"
              type="number"
            />
            {errors.anoFabricacao && (
              <span className="text-red-error text-sm">
                {errors.anoFabricacao.message}
              </span>
            )}
            <TextField
              {...register("kmAtual")}
              margin="normal"
              required
              fullWidth
              name="kmAtual"
              label="Km Atual"
              id="kmAtual"
              variant="filled"
              type="number"
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
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
