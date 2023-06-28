"use client";

import DeleteAlert from "@/components/Modal/DeleteAlert";
import { useDetails } from "@/hooks/useDetails.hook";
import { Consumer } from "@/models/Consumer";
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
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TruckAnimation from "@/components/TruckLoading";

export default function Page({ params }: { params: { id: string } }) {
  const { back, push } = useRouter();
  const { data } = useDetails<Consumer>(
    get.getConsumerById,
    params.id,
    "consumers"
  );
  const [isEditable, setIsEditable] = useState(false);

  const UpdateCosumerSchema = z.object({
    nome: z.string().nonempty("Campo obrigatório"),
    numeroDocumento: z.string(),
    tipoDocumento: z.string(),
    logradouro: z.string().nonempty("Campo obrigatório"),
    numero: z.string().nonempty("Campo obrigatório"),
    bairro: z.string().nonempty("Campo obrigatório"),
    cidade: z.string().nonempty("Campo obrigatório"),
    uf: z.string().nonempty("Campo obrigatório"),
  });

  type UpdateConsumerFormData = z.infer<typeof UpdateCosumerSchema>;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateConsumerFormData>({
    resolver: zodResolver(UpdateCosumerSchema),
  });

  const handleUpdateConsumers = useCallback(
    (values: UpdateConsumerFormData) => {
      update.changeData<Partial<Consumer>>(values, params.id, "Cliente");
      setIsEditable(false);
      push("/clientes");
    },
    [params.id, push]
  );

  useEffect(() => {
    data?.nome && setValue("nome", data.nome);
    data?.numeroDocumento && setValue("numeroDocumento", data.numeroDocumento);
    data?.tipoDocumento && setValue("tipoDocumento", data.tipoDocumento);
    data?.logradouro && setValue("logradouro", data.logradouro);
    data?.numero && setValue("numero", data.numero);
    data?.bairro && setValue("bairro", data.bairro);
    data?.cidade && setValue("cidade", data.cidade);
    data?.uf && setValue("uf", data.uf);
  }, [data, setValue]);

  return (
    <Container style={{ marginTop: "110px" }}>
      {data ? (
        <span>
          <Paper
            sx={{ paddingX: "20px", paddingY: "30px" }}
            component="form"
            onSubmit={handleSubmit(handleUpdateConsumers)}
          >
            <div className="flex justify-between items-center">
              <Typography variant="h1" fontSize={25} paddingY={2}>
                Cliente: {data.id}
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
                      {...register("nome")}
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
                      autoFocus
                      error={!!errors.nome}
                      helperText={errors.nome && errors.nome.message}
                    />
                  </div>
                )}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                {!isEditable ? (
                  <span>
                    <label className="font-bold">Documento </label>
                    <div className="h-12 w-full flex items-center">
                      <Typography>{data.numeroDocumento}</Typography>
                    </div>
                  </span>
                ) : (
                  <div>
                    {" "}
                    <TextField
                      {...register("numeroDocumento")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      margin="normal"
                      name="numeroDocumento"
                      label="Documento"
                      id="numeroDocumento"
                      variant="filled"
                      fullWidth
                      type="number"
                      disabled
                    />
                  </div>
                )}
              </Grid>

              <Grid item xs={2} sm={4} md={4}>
                {!isEditable ? (
                  <span>
                    <label className="font-bold">Tipo de documento </label>
                    <div className="h-12 w-full flex items-center">
                      <Typography>{data.tipoDocumento}</Typography>
                    </div>
                  </span>
                ) : (
                  <div>
                    {" "}
                    <TextField
                      {...register("tipoDocumento")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      margin="normal"
                      name="tipoDocumento"
                      label="Tipo de documento"
                      id="tipoDocumento"
                      variant="filled"
                      fullWidth
                      disabled
                    />
                  </div>
                )}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                {!isEditable ? (
                  <span>
                    <label className="font-bold">Rua </label>
                    <div className="h-12 w-full flex items-center">
                      <Typography>{data.logradouro}</Typography>
                    </div>
                  </span>
                ) : (
                  <div>
                    {" "}
                    <TextField
                      {...register("logradouro")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      margin="normal"
                      name="logradouro"
                      label="Rua"
                      id="logradouro"
                      variant="filled"
                      fullWidth
                      error={!!errors.logradouro}
                      helperText={
                        errors.logradouro && errors.logradouro.message
                      }
                    />
                  </div>
                )}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                {!isEditable ? (
                  <span>
                    <label className="font-bold">Número </label>
                    <div className="h-12 w-full flex items-center">
                      <Typography>{data.numero}</Typography>
                    </div>
                  </span>
                ) : (
                  <div>
                    {" "}
                    <TextField
                      {...register("numero")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      margin="normal"
                      name="numero"
                      label="Número"
                      id="numero"
                      variant="filled"
                      fullWidth
                      type="number"
                      error={!!errors.numero}
                      helperText={errors.numero && errors.numero.message}
                    />
                  </div>
                )}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                {!isEditable ? (
                  <span>
                    <label className="font-bold">Bairro </label>
                    <div className="h-12 w-full flex items-center">
                      <Typography>{data.bairro}</Typography>
                    </div>
                  </span>
                ) : (
                  <div>
                    {" "}
                    <TextField
                      {...register("bairro")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      margin="normal"
                      name="bairro"
                      label="Bairro"
                      id="bairro"
                      variant="filled"
                      fullWidth
                      error={!!errors.bairro}
                      helperText={errors.bairro && errors.bairro.message}
                    />
                  </div>
                )}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                {!isEditable ? (
                  <span>
                    <label className="font-bold">Cidade </label>
                    <div className="h-12 w-full flex items-center">
                      <Typography>{data.cidade}</Typography>
                    </div>
                  </span>
                ) : (
                  <div>
                    {" "}
                    <TextField
                      {...register("cidade")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      margin="normal"
                      name="cidade"
                      label="Cidade"
                      id="cidade"
                      variant="filled"
                      fullWidth
                      error={!!errors.cidade}
                      helperText={errors.cidade && errors.cidade.message}
                    />
                  </div>
                )}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                {!isEditable ? (
                  <span>
                    <label className="font-bold">UF </label>
                    <div className="h-12 w-full flex items-center">
                      <Typography>{data.uf}</Typography>
                    </div>
                  </span>
                ) : (
                  <div>
                    {" "}
                    <TextField
                      {...register("uf")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      margin="normal"
                      name="uf"
                      label="UF"
                      id="uf"
                      variant="filled"
                      fullWidth
                      error={!!errors.uf}
                      helperText={errors.uf && errors.uf.message}
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
                urlRoute="Cliente"
                remove={remove.deleteData}
              />
            </Grid>
          </Grid>
        </span>
      ) : (
        <TruckAnimation />
      )}
    </Container>
  );
}
