"use client";

import DeleteAlert from "@/components/Modal/DeleteAlert";
import { useDetails } from "@/hooks/useDetails.hook";
import { Vehicle } from "@/models/Vehicle";
import { get, remove, update } from "@/services/api";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Icon,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Page({ params }: { params: { id: string } }) {
  const { back } = useRouter();
  const { data } = useDetails<Vehicle>(get.getVehicleById, params.id);
  const [isEditable, setIsEditable] = useState(false);

  const UpdateVehicleSchema = z.object({
    placa: z.string().nonempty("Campo obrigatório"),
    marcaModelo: z.string().nonempty("Campo obrigatório"),
    anoFabricacao: z.number({
      required_error: "Campo obrigatório",
      invalid_type_error: "Digite um valor",
    }),
    kmAtual: z.number({
      required_error: "Campo obrigatório",
      invalid_type_error: "Digite um valor",
    }),
  });

  type UpdateVehicleFormData = z.infer<typeof UpdateVehicleSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateVehicleFormData>({
    resolver: zodResolver(UpdateVehicleSchema),
  });

  useEffect(() => {
    data?.placa && setValue("placa", data.placa);
    data?.marcaModelo && setValue("marcaModelo", data.marcaModelo);
    data?.anoFabricacao &&
      setValue("anoFabricacao", Number(data.anoFabricacao));
    data?.kmAtual && setValue("kmAtual", Number(data.kmAtual));
  }, [data, setValue]);

  const handleUpdateVehicle = useCallback(
    (values: UpdateVehicleFormData) => {
      update.changeData<Partial<Vehicle>>(values, params.id, "Veiculo");
      setIsEditable(false);
    },
    [params.id]
  );

  return (
    <Container style={{ marginTop: "110px" }}>
      {data ? (
        <>
          <Paper
            sx={{ paddingX: "20px", paddingY: "30px" }}
            component="form"
            onSubmit={handleSubmit(handleUpdateVehicle)}
          >
            <div className="flex justify-between items-center">
              <Typography variant="h1" fontSize={25} paddingY={2}>
                Veiculo: {data.id}
              </Typography>
              <div>
                {isEditable && (
                  <IconButton
                    size="medium"
                    type="submit"
                    aria-description="botão salvar"
                  >
                    <Icon>save</Icon>
                  </IconButton>
                )}
                <IconButton
                  size="medium"
                  onClick={() => setIsEditable(!isEditable)}
                  aria-description="botão habilita edição"
                >
                  <Icon>edit</Icon>
                </IconButton>
              </div>
            </div>
            <Divider />

            <Grid
              container
              paddingTop={2}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={2} sm={4} md={4}>
                {!isEditable ? (
                  <>
                    <label className="font-bold">Placa </label>
                    <div className="h-12 w-full flex items-center">
                      <Typography>{data.placa}</Typography>
                    </div>
                  </>
                ) : (
                  <div>
                    <TextField
                      {...register("placa")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      margin="normal"
                      name="placa"
                      label="Placa"
                      id="placa"
                      variant="filled"
                      autoFocus
                      fullWidth
                      error={!!errors.placa}
                      helperText={errors.placa && errors.placa.message}
                    />
                  </div>
                )}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                {!isEditable ? (
                  <>
                    <label className="font-bold">Modelo </label>
                    <div className="h-12 w-full flex items-center">
                      <Typography>{data.marcaModelo}</Typography>
                    </div>
                  </>
                ) : (
                  <div>
                    <TextField
                      {...register("marcaModelo")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      margin="normal"
                      name="marcaModelo"
                      label="Modelo"
                      id="marcaModelo"
                      variant="filled"
                      fullWidth
                      error={!!errors.marcaModelo}
                      helperText={
                        errors.marcaModelo && errors.marcaModelo.message
                      }
                    />
                  </div>
                )}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                {!isEditable ? (
                  <>
                    <label className="font-bold">Kilometragem </label>
                    <div className="h-12 w-full flex items-center">
                      <Typography>{data.kmAtual}</Typography>
                    </div>
                  </>
                ) : (
                  <div>
                    <TextField
                      {...register("kmAtual", { valueAsNumber: true })}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      margin="normal"
                      name="kmAtual"
                      label="Kilometragem"
                      id="kmAtual"
                      variant="filled"
                      fullWidth
                      type="number"
                      error={!!errors.kmAtual}
                      helperText={errors.kmAtual && errors.kmAtual.message}
                    />
                  </div>
                )}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                {!isEditable ? (
                  <>
                    <label className="font-bold">Ano </label>
                    <div className="h-12 w-full flex items-center">
                      <Typography>{data.anoFabricacao}</Typography>
                    </div>
                  </>
                ) : (
                  <div>
                    <TextField
                      {...register("anoFabricacao", { valueAsNumber: true })}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      margin="normal"
                      name="anoFabricacao"
                      label="Ano"
                      id="anoFabricacao"
                      variant="filled"
                      fullWidth
                      type="number"
                      error={!!errors.anoFabricacao}
                      helperText={
                        errors.anoFabricacao && errors.anoFabricacao.message
                      }
                    />
                  </div>
                )}
              </Grid>
            </Grid>
          </Paper>

          <Grid
            container
            paddingTop={2}
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent="flex-end"
          >
            <Grid item xs={2} sm={4} md={4}>
              <Button
                variant="contained"
                onClick={() => back()}
                sx={{ marginTop: "10px" }}
                fullWidth
              >
                Voltar
              </Button>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <DeleteAlert
                name="Excluir"
                id={params.id}
                urlRoute="Veiculo"
                remove={remove.deleteData}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <div className="py-16 w-full flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </Container>
  );
}
