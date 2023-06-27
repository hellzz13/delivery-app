"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import AddButton from "../../Button/AddButton";
import api, { get } from "@/services/api";
import { useRequest } from "@/hooks/useRequest.hook";
import { Consumer } from "@/models/Consumer";
import { Vehicle } from "@/models/Vehicle";
import { Drivers } from "@/models/Drivers";
import { useCallback } from "react";

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

export default function FormDelivery() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [consumers, setConsumers] = React.useState<Consumer[] | null>(null);
  const [vehicles, setVehicles] = React.useState<Vehicle[] | null>(null);
  const [drivers, setDrivers] = React.useState<Drivers[] | null>(null);

  const [idCondutor, setIdCondutor] = React.useState("");
  const [idVeiculo, setIdVeiculo] = React.useState("");
  const [idCliente, setIdCliente] = React.useState("");

  const CreateDeliverySchema = z.object({
    kmInicial: z.number({
      required_error: "Campo obrigatório",
      invalid_type_error: "Digite um valor",
    }),
    inicioDeslocamento: z.string().transform((str) => {
      return str && new Date(str).toISOString();
    }),
    checkList: z.string().nonempty("Campo obrigatório"),
    motivo: z.string().nonempty("Campo obrigatório"),
    observacao: z.string().nonempty("Campo obrigatório"),
    idCondutor: z
      .string()
      .nonempty("Campo obrigatório")
      .transform((str) => Number(str)),
    idVeiculo: z
      .string()
      .nonempty("Campo obrigatório")
      .transform((str) => Number(str)),
    idCliente: z
      .string()
      .nonempty("Campo obrigatório")
      .transform((str) => Number(str)),
  });

  type CreateDeliveryFormData = z.infer<typeof CreateDeliverySchema>;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateDeliveryFormData>({
    resolver: zodResolver(CreateDeliverySchema),
  });

  const createDelivery = useCallback(
    async (
      deliveryData: CreateDeliveryFormData
    ): Promise<CreateDeliveryFormData> => {
      const { data } = await api.post(
        "Deslocamento/IniciarDeslocamento/",
        deliveryData
      );
      await handleClose();
      reset({});
      return data;
    },
    [reset]
  );

  const { onSubmit, isLoading } = useRequest<CreateDeliveryFormData>(
    createDelivery,
    "delivery"
  );

  React.useEffect(() => {
    setValue("inicioDeslocamento", Date());
    get.getConsumers().then((res) => setConsumers(res));
    get.getVehicle().then((res) => setVehicles(res));
    get.getDrivers().then((res) => setDrivers(res));
  }, [setValue]);

  console.log(errors);
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
            Novo deslocamento
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
              <Grid item xs={2} sm={4} md={6}>
                <TextField
                  {...register("kmInicial", { valueAsNumber: true })}
                  margin="normal"
                  required
                  fullWidth
                  id="kmInicial"
                  label="Kilometragem inicial"
                  name="kmInicial"
                  autoComplete="kmInicial"
                  variant="filled"
                  autoFocus
                  type="number"
                  error={!!errors.kmInicial}
                />
                {errors.kmInicial && (
                  <span className="text-red-error text-sm">
                    {errors.kmInicial.message}
                  </span>
                )}
              </Grid>

              {/* <Grid item xs={2} sm={4} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Inicio deslocamento
                  </InputLabel>
                  <TextField
                    {...register("inicioDeslocamento")}
                    id="inicioDeslocamento"
                    name="inicioDeslocamento"
                    variant="filled"
                    type="date"
                    margin="normal"
                    fullWidth
                    error={!!errors.inicioDeslocamento}
                  />
                </FormControl>
                {errors.inicioDeslocamento && (
                  <span className="text-red-error text-sm">
                    {errors.inicioDeslocamento.message}
                  </span>
                )}
              </Grid> */}
              <Grid item xs={2} sm={4} md={6}>
                <TextField
                  {...register("checkList")}
                  margin="normal"
                  required
                  fullWidth
                  id="checkList"
                  label="Status"
                  name="checkList"
                  autoComplete="checkList"
                  variant="filled"
                  error={!!errors.checkList}
                />

                {errors.checkList && (
                  <span className="text-red-error text-sm">
                    {errors.checkList.message}
                  </span>
                )}
              </Grid>

              <Grid item xs={2} sm={4} md={6}>
                <TextField
                  {...register("motivo")}
                  margin="normal"
                  required
                  fullWidth
                  id="motivo"
                  label="Motivo"
                  name="motivo"
                  autoComplete="motivo"
                  variant="filled"
                  error={!!errors.motivo}
                />
                {errors.motivo && (
                  <span className="text-red-error text-sm">
                    {errors.motivo.message}
                  </span>
                )}
              </Grid>
              <Grid item xs={2} sm={4} md={6}>
                <TextField
                  {...register("observacao")}
                  margin="normal"
                  required
                  fullWidth
                  id="observacao"
                  label="Observação"
                  name="observacao"
                  autoComplete="observacao"
                  variant="filled"
                  error={!!errors.observacao}
                />
                {errors.observacao && (
                  <span className="text-red-error text-sm">
                    {errors.observacao.message}
                  </span>
                )}
              </Grid>
            </Grid>
            {/* bloco 2 */}
            <Grid
              container
              paddingTop={2}
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={2} sm={4} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
                  <Select
                    {...register("idCliente")}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={idCliente}
                    label="Cliente"
                    onChange={(event: SelectChangeEvent) => {
                      const id = event.target.value;
                      setIdCliente(id);
                    }}
                    sx={{ color: "white" }}
                    error={!!errors.idCliente}
                  >
                    {consumers &&
                      consumers.map((item) => (
                        <MenuItem value={item.id.toString()} key={item.id}>
                          {item.nome}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {errors.idCliente && (
                  <span className="text-red-error text-sm">
                    {errors.idCliente.message}
                  </span>
                )}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Condutor
                  </InputLabel>
                  <Select
                    {...register("idCondutor")}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={idCondutor}
                    label="Condutor"
                    onChange={(event: SelectChangeEvent) => {
                      setIdCondutor(event.target.value);
                    }}
                    sx={{ color: "white" }}
                    error={!!errors.idCondutor}
                  >
                    {drivers &&
                      drivers.map((item) => (
                        <MenuItem value={item.id.toString()} key={item.id}>
                          {item.nome}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {errors.idCondutor && (
                  <span className="text-red-error text-sm">
                    {errors.idCondutor.message}
                  </span>
                )}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Veículo</InputLabel>
                  <Select
                    {...register("idVeiculo")}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={idVeiculo}
                    label="Veículo"
                    onChange={(event: SelectChangeEvent) => {
                      setIdVeiculo(event.target.value);
                    }}
                    sx={{ color: "white" }}
                    error={!!errors.idVeiculo}
                  >
                    {vehicles &&
                      vehicles.map((item) => (
                        <MenuItem value={item.id.toString()} key={item.id}>
                          {item.marcaModelo}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                {errors.idVeiculo && (
                  <span className="text-red-error text-sm">
                    {errors.idVeiculo.message}
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
