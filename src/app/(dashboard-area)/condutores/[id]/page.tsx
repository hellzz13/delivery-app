"use client";

import DeleteAlert from "@/components/Modal/DeleteAlert";
import { useDetails } from "@/hooks/useDetails.hook";
import { Drivers } from "@/models/Drivers";
import { get, remove, update } from "@/services/api";
import {
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TruckAnimation from "@/components/TruckLoading";
import { useMutation } from "react-query";

export default function Page({ params }: { params: { id: string } }) {
  const { back, push } = useRouter();
  const { data } = useDetails<Drivers>(
    get.getDriversById,
    params.id,
    "drivers"
  );

  const [isEditable, setIsEditable] = useState(false);

  const UpdateDriverSchema = z.object({
    categoriaHabilitacao: z.string().nonempty("Campo obrigatório"),
    vencimentoHabilitacao: z.string().transform((str) => {
      return str && new Date(str).toISOString();
    }),
  });

  type UpdateDriverFormData = z.infer<typeof UpdateDriverSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateDriverFormData>({
    resolver: zodResolver(UpdateDriverSchema),
  });

  useEffect(() => {
    data?.catergoriaHabilitacao &&
      setValue("categoriaHabilitacao", data.catergoriaHabilitacao);
    data?.vencimentoHabilitacao &&
      setValue(
        "vencimentoHabilitacao",
        dayjs(data.vencimentoHabilitacao).format("YYYY-MM-DD")
      );
  }, [data, setValue]);

  const handleUpdateDrivers = useCallback(
    (values: UpdateDriverFormData) => {
      const { data }: any = update.changeData<Partial<Drivers>>(
        values,
        params.id,
        "Condutor"
      );
      setIsEditable(false);
      push("/condutores");
      return data;
    },
    [params.id, push]
  );

  const { mutate } = useMutation(handleUpdateDrivers);

  const onsubmit = (data: UpdateDriverFormData) => {
    mutate(data);
  };

  return (
    <Container style={{ marginTop: "110px" }}>
      {data ? (
        <div>
          <Paper
            sx={{ paddingX: "20px", paddingY: "30px" }}
            component="form"
            onSubmit={handleSubmit(onsubmit)}
          >
            <div className="flex justify-between items-center">
              <Typography variant="h1" fontSize={25} paddingY={2}>
                Condutor: {data.id}
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
                  <span>
                    <label className="font-bold">Nome </label>
                    <div className="h-12 w-full flex items-center">
                      <Typography>{data.nome}</Typography>
                    </div>
                  </span>
                ) : (
                  <div>
                    {" "}
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      margin="normal"
                      name="nome"
                      label="Nome"
                      id="nome"
                      variant="filled"
                      fullWidth
                      disabled
                      value={data.nome}
                    />
                  </div>
                )}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                {!isEditable ? (
                  <span>
                    <label className="font-bold">CNH </label>
                    <div className="h-12 w-full flex items-center">
                      <Typography>{data.nome}</Typography>
                    </div>
                  </span>
                ) : (
                  <div>
                    {" "}
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      margin="normal"
                      name="numeroHabilitacao"
                      label="CNH"
                      id="numeroHabilitacao"
                      variant="filled"
                      fullWidth
                      disabled
                      value={data.numeroHabilitacao}
                    />
                  </div>
                )}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                {!isEditable ? (
                  <span>
                    <label className="font-bold">Nome </label>
                    <div className="h-12 w-full flex items-center">
                      <Typography>
                        {dayjs(data.vencimentoHabilitacao).format("DD/MM/YYYY")}
                      </Typography>
                    </div>
                  </span>
                ) : (
                  <div>
                    {" "}
                    <TextField
                      {...register("vencimentoHabilitacao")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      margin="normal"
                      name="vencimentoHabilitacao"
                      label="Velidade da Habilitação"
                      id="vencimentoHabilitacao"
                      variant="filled"
                      fullWidth
                      autoFocus
                      type="date"
                      error={!!errors.vencimentoHabilitacao}
                      helperText={
                        errors.vencimentoHabilitacao &&
                        errors.vencimentoHabilitacao.message
                      }
                    />
                  </div>
                )}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                {!isEditable ? (
                  <span>
                    <label className="font-bold">
                      Categoria da Habilitação{" "}
                    </label>
                    <div className="h-12 w-full flex items-center">
                      <Typography>{data.catergoriaHabilitacao}</Typography>
                    </div>
                  </span>
                ) : (
                  <div>
                    {" "}
                    <TextField
                      {...register("categoriaHabilitacao")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      margin="normal"
                      name="categoriaHabilitacao"
                      label="Categoria da Habilitação"
                      id="categoriaHabilitacao"
                      variant="filled"
                      fullWidth
                      error={!!errors.categoriaHabilitacao}
                      helperText={
                        errors.categoriaHabilitacao &&
                        errors.categoriaHabilitacao.message
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
                urlRoute="Condutor"
                remove={remove.deleteData}
              />
            </Grid>
          </Grid>
        </div>
      ) : (
        <TruckAnimation />
      )}
    </Container>
  );
}
