"use client";

import DeleteAlert from "@/components/Modal/DeleteAlert";
import { useDetails } from "@/hooks/useDetails.hook";
import { Consumer } from "@/models/Consumer";
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
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Page({ params }: { params: { id: string } }) {
  const { back } = useRouter();
  const { data } = useDetails<Consumer>(get.getConsumerById, params.id);

  const [isEditable, setIsEditable] = useState(false);

  const UpdateCosumerSchema = z.object({
    nome: z.string().nonempty("Campo obrigatório"),
    numeroDocumento: z.string().nonempty("Campo obrigatório"),
    tipoDocumento: z.string().nonempty("Campo obrigatório"),
    // logradouro: z.string().nonempty("Campo obrigatório"),
    // numero: z.string().nonempty("Campo obrigatório"),
    // bairro: z.string().nonempty("Campo obrigatório"),
    // cidade: z.string().nonempty("Campo obrigatório"),
    // uf: z.string().nonempty("Campo obrigatório"),
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
    defaultValues: {
      nome: data && data.nome,
    },
  });

  function handleUpdate(values: UpdateConsumerFormData) {
    update.changeData<Partial<Consumer>>(values, params.id, "Cliente");

    setIsEditable(true);
  }

  useEffect(() => {
    data?.nome && setValue("nome", data.nome);
  }, [data, setValue]);

  return (
    <Container style={{ marginTop: "110px" }}>
      {data ? (
        <>
          <Paper
            sx={{ paddingX: "20px", paddingY: "30px" }}
            component="form"
            onSubmit={handleSubmit(handleUpdate)}
          >
            <div className="flex justify-between items-center">
              <Typography variant="h1" fontSize={25} paddingY={2}>
                Cliente: {data.id}
              </Typography>
              <div>
                {!isEditable && (
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
                {isEditable ? (
                  <>
                    <label className="font-bold">Nome </label>
                    <div className="h-12 w-full flex items-center">
                      <Typography>{data.nome}</Typography>
                    </div>
                  </>
                ) : (
                  <div>
                    {" "}
                    <TextField
                      {...register("nome")}
                      size="small"
                      margin="normal"
                      name="nome"
                      label="Nome"
                      id="nome"
                      variant="filled"
                      fullWidth
                      autoFocus
                    />
                    {errors.nome && (
                      <span className="text-red-error text-sm">
                        {errors.nome.message}
                      </span>
                    )}
                  </div>
                )}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                {isEditable ? (
                  <>
                    <label className="font-bold">Documento </label>
                    <div className="h-12 w-full flex items-center">
                      <Typography>{data.numeroDocumento}</Typography>
                    </div>
                  </>
                ) : (
                  <div>
                    {" "}
                    <TextField
                      {...register("numeroDocumento")}
                      size="small"
                      margin="normal"
                      name="numeroDocumento"
                      label="Documento"
                      id="numeroDocumento"
                      variant="filled"
                      fullWidth
                      value={data.numeroDocumento}
                      type="number"
                    />
                    {errors.numeroDocumento && (
                      <span className="text-red-error text-sm">
                        {errors.numeroDocumento.message}
                      </span>
                    )}
                  </div>
                )}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                {isEditable ? (
                  <>
                    <label className="font-bold">Tipo de documento </label>
                    <div className="h-12 w-full flex items-center">
                      <Typography>{data.tipoDocumento}</Typography>
                    </div>
                  </>
                ) : (
                  <div>
                    {" "}
                    <TextField
                      {...register("tipoDocumento")}
                      size="small"
                      margin="normal"
                      name="tipoDocumento"
                      label="Tipo de documento"
                      id="tipoDocumento"
                      variant="filled"
                      fullWidth
                      value={data.tipoDocumento}
                    />
                    {errors.tipoDocumento && (
                      <span className="text-red-error text-sm">
                        {errors.tipoDocumento.message}
                      </span>
                    )}
                  </div>
                )}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <label className="font-bold">Rua:</label> {data.logradouro}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <label className="font-bold">Número: </label>
                {data.numero}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <label className="font-bold">Bairro:</label> {data.bairro}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <label className="font-bold">Cidade:</label> {data.cidade}
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <label className="font-bold">UF:</label> {data.uf}
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
        </>
      ) : (
        <div className="py-16 w-full flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </Container>
  );
}
